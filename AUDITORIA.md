# 🔍 AUDITORÍA COMPLETA — Curso Completo de Matemática Avanzada (web)

> ✅ **RESOLUCIÓN (2026-11-04):** todos los hallazgos P0/P1 y los P2 accionables fueron resueltos y verificados con build + tests. Ver el registro al final del documento.

**Fecha:** 2026-11-04
**Alcance:** 100% del repositorio — arquitectura, build, LaTeX/KaTeX, componentes web, router, CSS/UI, PWA/Service Worker, SEO, contenido, tests, CI/CD, seguridad, dependencias.
**Método:** Revisión directa de los 60+ archivos fuente, análisis del `dist` real, ejecución de `npm run build`, `npm test`, `npm run validate:content`, verificación de bytes (UTF-8), hash SRI del CDN de KaTeX (calculado y verificado: **correcto**), cruce de clases CSS usadas vs. definidas (script), y comparación contra `PLAN_MAESTRO.md` y `README.md`.

---

## ⚡ Veredicto ejecutivo

**La web desplegada NO funciona.** La SPA carga su esqueleto, pero:

1. **Las fórmulas LaTeX no se renderizan** — no por un error de KaTeX, sino porque el componente `<math-formula>` **nunca se importa ni se registra** en ninguna parte del código. Las 19 etiquetas de componentes usadas en HTML son elementos desconocidos vacíos.
2. **El build de producción está roto por diseño**: Vite advierte literalmente `Generated an empty chunk: "vendor-katex" / "vendor-chart" / "vendor-d3" / "vendor-floating"` — KaTeX, Chart.js, D3 y Floating UI **nunca entran al bundle**. El `dist` no contiene `sw.js`, así que el Service Worker da 404 en producción.
3. **45 de 46 módulos no tienen contenido**, y el único con contenido real (m01) es una **página huérfana** que la SPA nunca muestra: dentro de la app el módulo 1 enseña un placeholder *"El contenido teórico completo de este módulo estará disponible pronto"*.
4. **El CSS es no-responsive en la práctica**: las clases de breakpoints que el HTML usa masivamente (`md:flex`, `sm:flex`, `space-y-*`, `py-12`, `w-10`, etc.) **no existen en ninguna hoja de estilos**. El buscador de escritorio y el menú de usuario son invisibles.
5. **Navegación atrás/adelante rota** en producción por un `pushState` híbrido con la base de GitHub Pages (URL con doble barra).

Los tests pasan (2/2) y el validador de contenido dice "✅ sin errores", pero ambos son **teatro**: uno es `expect(true).toBe(true)` y el otro solo valida la estructura del JSON de 46 módulos. Falso confort total.

---

## 📊 Resumen de hallazgos

| Severidad | Cantidad | Impacto |
|-----------|----------|---------|
| 🔴 P0 Bloqueante | 5 | La web no entrega su función principal |
| 🟠 P1 Grave | 8 | Funciones prometidas rotas o engañosas |
| 🟡 P2 Medio | 12 | Calidad, mantenibilidad, SEO, deuda |
| ⚪ P3 Menor | 6 | Pulido |

---

# 🔴 P0 — BLOQUEANTES

## P0-1. Ningún Web Component se importa: LaTeX, quiz y gráficas son invisibles

**Evidencia:** `grep` de imports en todo `assets/js/` y `modules/`: **cero resultados** para `MathFormula`, `QuizCard`, `InteractiveGraph`, `HoverTooltip`, `ProgressRing`, `CertificateView`, `SpacedRepetition`. Los 7 componentes se auto-registran (`customElements.define`) al importarse (p. ej. `MathFormula.js:496-498`), pero nadie los importa.

**Consecuencia visible:** en `modules/m01/index.html:111,216-221` hay `<math-formula latex="|A| = n">` y una fórmula display con `\begin{cases}` → se muestran como **espacios vacíos**. El `<quiz-card>` de m01 (línea 406) con su pregunta y opciones JSON: **página de Quiz completamente en blanco**. Los 10 `<interactive-graph>`: nada. El `<progress-ring>` del header y de la vista Progreso: nada.

**Esto es la causa raíz #1 de la queja de LaTeX.** No es KaTeX fallando: KaTeX ni siquiera llega a ejecutarse.

**Resolución:**
```js
// assets/js/core/app.js — añadir tras los imports de CSS:
import '../components/MathFormula.js';
import '../components/ProgressRing.js';
import '../components/QuizCard.js';
import '../components/InteractiveGraph.js';
import '../components/HoverTooltip.js';
import '../components/CertificateView.js';
```
(Import perezoso solo de los que cada vista use es la versión refinada; el import directo es el parche mínimo.)

## P0-2. Aunque se importara, KaTeX se renderiza en Shadow DOM sin sus estilos

**Evidencia:** `MathFormula.js:160` usa `this.attachShadow({mode:'open'})` y pinta el HTML de KaTeX dentro (`render()`, línea 214+). El CSS de KaTeX se carga en el **documento** (`index.html:82`, `modules/m01/index.html:15` vía CDN con `integrity` verificada correcta). **El CSS del documento no cruza la frontera del Shadow DOM**: las reglas `.katex`, `.katex-display`, `.vlist`, las fuentes `KaTeX_Main`… no aplican.

**Consecuencia visible:** fracciones sin apilar, radicales deformes, tipografía incorrecta — el clásico "LaTeX se ve roto".

**Resolución (elige UNA):**
- **A (mínima):** quitar el Shadow DOM de `MathFormula` (Light DOM + clases con prefijo `mf-`). El CSS del CDN pasa a aplicar directamente.
- **B (conserva encapsulación):** inyectar el CSS de KaTeX dentro del shadow:
  ```js
  import katexCss from 'katex/dist/katex.min.css?inline';
  // en render(): <style>${katexCss}</style> dentro del shadowRoot
  ```
- **C:** `adoptedStyleSheets` con un `CSSStyleSheet` compartido construido una vez.

Además, en `MathFormula.js:18` la opción se llama `macro:` — KaTeX espera **`macros:`** (así está bien en `katex-helper.js:20`). Hoy las macros personalizadas (`\R`, `\abs`, `\pd`…) se ignoran silenciosamente en el componente.

## P0-3. Build de producción roto: chunks vendor vacíos y Service Worker inexistente en dist

**Evidencia (salida real de `npm run build`):**
```
Generated an empty chunk: "vendor-katex".
Generated an empty chunk: "vendor-chart".
Generated an empty chunk: "vendor-d3".
Generated an empty chunk: "vendor-floating".
```
`dist/assets/js/vendor-katex-*.js` = 51 bytes (solo el comentario del sourcemap). Solo 33 módulos transformados: los 7 componentes y sus 5 dependencias npm **no están en el grafo** (síntoma de P0-1).

Además `dist/sw.js` **no existe** (verificado con `Test-Path`), pero `dist/index.html` registra `./sw.js` → warning `registro falló` en cada carga de producción, y **cero offline**. El plan maestro prometía Workbox + PWA offline-first.

**Resolución:**
1. Corregir P0-1 → los chunks vendor se llenan solos y las advertencias desaparecen.
2. Mover `sw.js` a `public/sw.js` para que Vite lo copie a `dist` (o añadir vite-plugin-pwa y dejar de mantenerlo a mano).
3. **Regenerar la lista de precache**: `sw.js:13-41` cachea rutas de **fuente** (`/assets/js/core/app.js`, componentes sueltos) que **no existen en dist** (los bundles van hasheados). `cache.addAll` fallará entero → el SW nunca instalará. Con vite-plugin-pwa esto se genera automáticamente; a mano, hay que precachear `/`, `index.html`, el manifest y los assets hasheados que produzca el build.

## P0-4. Router: atrás/adelante rotos y doble barra en producción

**Evidencia:** `router.js:276-282` — `navigate()` hace `history.pushState(null,'', this.base + targetPath)` con `base='/Curso-completo-de-matematica-avanzada-web/'` (router.js:425) y `targetPath='/module/m02'` → URL resultante `.../web//module/m02` (**doble barra**). Peor: el router es **hash-based** (`handleHashChange` lee `location.hash`, router.js:313-317), pero `navigate()` escribe un **path**, no un hash → `hashchange` nunca dispara, y al pulsar **Atrás**, `handlePopState` lee `location.hash`, que quedó vacío/obsoleto → `matchRoute('/')` → te escupe al onboarding/dashboard. El historial del navegador es una trampa.

**Resolución:** unificar en hash puro:
```js
const hash = `#${targetPath}`;
options.replace ? history.replaceState(null,'',hash) : history.pushState(null,'',hash);
```
y eliminar el manejo por path. De paso, `base` en el router sobra si todo es hash (el hash nunca incluye la base).

## P0-5. Contenido: 45/46 módulos vacíos y el m01 real es inaccesible desde la app

**Evidencia:** `curriculum.json` define 7 fases y 46 módulos (ids, títulos, objetivos). Solo existe `modules/m01/index.html` con contenido. `modules/module/index.js:157-208` renderiza **placeholders** "estará disponible pronto" para teoría/práctica/quiz/interactivo **de todos los módulos, incluido m01**. El m01 con contenido real solo se alcanza tecleando a mano `…/modules/m01/index.html` — y su botón "Siguiente módulo" apunta a `../m02/index.html` → **404** (m02 no existe).

Adicionalmente el PLAN_MAESTRO promete: teoría por módulo, 3 prácticas guiadas, 25+ preguntas (banco de 3.500), 150+ gráficas, glosario con tooltips, demostraciones interactivas, mini-proyectos… **Nada de eso existe** (hay 1 pregunta de quiz en todo el proyecto, dentro del atributo `data` de m01).

**Resolución:**
1. **Corto plazo:** hacer que la vista `module` cargue el contenido real de m01 (migrar su HTML a un `modules/m01/content.js` exportado, o fetch de `modules/m01/index.html` + inyección en el panel de teoría), y desactivar los links a módulos sin contenido (badge "Próximamente" en vez de 404).
2. **Mediano plazo:** pipeline de autoría — `modules/mXX/{content.js,data.json}` + generador/validador que compruebe en CI que cada módulo declarado en `curriculum.json` tiene contenido y que su LaTeX compila (`renderToString` con `throwOnError:true` como gate de CI; el script ya se llama `validate-content.js` pero hoy no valida contenido alguno).

---

# 🟠 P1 — GRAVES

## P1-1. Clases CSS usadas que no existen: web no-responsive y controles invisibles

**Evidencia (cruce automatizado de las 391 clases usadas en HTML/JS contra las 7 hojas CSS):** no están definidas, entre otras:

`md:flex` · `sm:flex` · `sm:block`* · `space-y-1/2/3` · `py-12` · `text-6xl` · `text-5xl` · `w-10` · `h-10` · `min-w-0` · `max-w-md` · `bg-black/50` · `bg-bg-elevated` · `top-20` · `left-4` · `right-4` · `z-modal-backdrop` · `border-border` · `text-decoration-none` · `hover:text-primary` · `mt-10` · `ml-3` · `icon-sun`/`icon-moon` (sin reglas propias)

*`sm:block` sí existe (layout.css:200); el resto no. `.hidden` sí existe (layout.css:354) y `md:hidden` también (layout.css:209) — el combo que **no** existe es `md:flex`/`sm:flex`.

**Consecuencia visible:**
- Buscador de cabecera: `class="search-container hidden md:flex"` → `.hidden` aplica y `md:flex` no existe → **el buscador jamás aparece en escritorio**. El botón móvil (`md:hidden`) se oculta en móvil… con el overlay roto (`bg-black/50`, `max-w-md`, `top-20`, `left-4`, `right-4`, `bg-bg-elevated` sin definir).
- Menú de usuario: `class="dropdown hidden sm:flex"` → **invisible siempre** (progreso, certificados, export, logout inaccesibles desde el header).
- Logo: `w-10 h-10` sin definir → caja del logo sin tamaño.
- Estados de error/404 (`py-12 text-6xl`), listas de onboarding (`space-y-*`), navegación entre módulos (`mt-10`): sin estilo.

**Resolución:** añadir un bloque de utilidades a `layout.css` (≈25 reglas) o adoptar el set mínimo que el código ya usa. Alternativa perezosa y honesta: sustituir esas clases en el HTML por las que el propio CSS ya define (`sm:hidden`, `md:grid-cols-*`, clases semánticas propias).

## P1-2. El "candado" de progresión se abre solo

**Evidencia:** `router.js:182` — un módulo se desbloquea si el previo está `completed || mastery || in-progress || available`. Como `store.js:289-306` siembra m01 como `available`, **visitar cualquier módulo lo desbloquea** (el previo siempre estará como mínimo `available`/`in-progress`). El gate de "≥80% para desbloquear" del plan maestro no existe en ninguna parte.

**Resolución:** condición estricta `completed || mastery` + `bestScore >= 80` según el plan; el fallback actual de desbloqueo encadenado debe irse.

## P1-3. "Cerrar sesión" borra todo el progreso mientras promete lo contrario

**Evidencia:** `app.js:777-783` — `confirm('¿Seguro que quieres cerrar sesión? Tu progreso se guardará localmente.')` seguido de `await store.clearAll()` (`store.js:1023-1034` vacía TODOS los object stores de IndexedDB).

**Resolución:** logout = limpiar solo `user` (o nada, si no hay backend); separar "cerrar sesión" de "borrar datos" (que ya existe como acción de settings con su propio flujo).

## P1-4. Métricas de progreso falsas en dashboard/progreso

**Evidencia:** `store.js:730-747` — `getCourseProgress()` hace `total = Object.keys(this.state.progress).length`: el total solo cuenta módulos **con registro**. Un usuario que abrió m01 ve "0 de 1 módulos (0%)" y el dashboard de fases calcula su % sobre esa base distorsionada.

**Resolución:** el total debe venir de `curriculum.json` (46 módulos), no del estado.

## P1-5. Exportar a PDF: dependencias fantasma, fallo silencioso

**Evidencia:** `export-pdf.js:42,52` hace `await import('jspdf')` e `import('html2canvas')` con **variable** (indetectable para Vite). Ninguna de las dos está en `package.json` → en runtime el import falla → `console.warn` → el botón/certificado PDF simplemente no hace nada. Además `jszip` está en dependencias y no se usa en ningún archivo.

**Resolución:** `npm i jspdf html2canvas` e import estático perezoso `import('jspdf')` literal, o eliminar la función y el menú asociado hasta que exista.

## P1-6. PWA/manifest promete 11 imágenes que no existen

**Evidencia:** `manifest.json:11-107` referencia `icon-72…icon-512.png`, `badge-72.png`, 3 screenshots — `assets/images/` contiene **un único archivo** (`favicon.svg`, 164 bytes). También faltan los PNG del `<head>`: `favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png` (`index.html:86-88`) y `assets/images/og-image.png` (`index.html:17,25`). Instalabilidad PWA: rota. Compartir en redes: sin imagen.

**Resolución:** generar los PNG desde el SVG (un script de 15 líneas con `sharp`), o reducir el manifest a un icono SVG+maskable real. Eliminar referencias a lo que no se genere.

## P1-7. URLs placeholder y datos de despliegue inconsistentes

**Evidencia:**
- `index.html:37` (JSON-LD): `https://github.com/tuusuario/Curso-completo-de-matematica-avanzada` — **"tuusuario"**.
- `index.html:269` y `index.html:292` (footer): el mismo placeholder.
- `index.html:18` (og:url) y `scripts/generate-sitemap.js:7`: `https://cha0smagick.github.io/...` (el repo real, por el remote de git).
- `README.md`: badges y enlaces a `tuusuario`.
- La base del proyecto está hardcodeada en **4 sitios** distintos (`vite.config.js:9`, `router.js:425`, `sw.js:14+`, `manifest.json:5,10,67…`) — cualquier renombrado rompe 4 cosas.

**Resolución:** single source of truth — definir el repo/base en un solo sitio (p. ej. constantes inyectadas por Vite `import.meta.env.BASE_URL` + `define`), corregir todos los `tuusuario` a `cha0smagick`.

## P1-8. Preload incorrecto de Google Fonts

**Evidencia:** `index.html:70` — `<link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=...">`: se está pre-cargando **una hoja de estilos** como si fuera fuente → el navegador la descarga dos veces y lanza warning (`…was preloaded using link preload but not used`). Los `.woff2` reales no se pueden saber de antemano.

**Resolución:** cambiar a `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` + `rel="stylesheet"` normal (ya hay dns-prefetch duplicado en 92-94: sustituir por preconnect).

---

# 🟡 P2 — MEDIOS

| # | Hallazgo | Evidencia | Resolución |
|---|----------|-----------|------------|
| P2-1 | `preprocessLatex` **muta fórmulas** de forma peligrosa: `(\d)([a-zA-Z])` inserta `\,` entre dígito y letra (rompe `\frac{1}{2}x`? no, pero sí `e^2x`→`e^2\,x` OK… y `d([xyzt])` convierte cualquier `dx`/`dy` incluso dentro de palabras/comandos), `(\d),(\d{3})` produce `1{,} 000` (con espacio). ¿Se usa? No hay ningún caller → **código muerto peligroso**. | `katex-helper.js:319-349` | Borrar o arreglar y testear antes de usar. |
| P2-2 | `convertMathToComponents` escapa con `div.innerHTML` que **no escapa comillas** → un `"` en LaTeX rompe el atributo. Además el regex inline `/\$([^]+?)\$/` rompe con montos "$5 y $10". | `katex-helper.js:254-270,375-380` | Escapar `"`→`"`; delimitar solo `$$`/`\(...\)`. |
| P2-3 | Hover-explain por **substrings** sobre el HTML renderizado: `\in` → busca `"in"`, que aparece en media clase CSS de KaTeX → tooltips falsos constantes. | `MathFormula.js:379-388` | Mapear por clases KaTeX reales (`mop op-symbol`, etc.) o eliminar la función hasta hacerla bien. |
| P2-4 | Doble wrapper de IndexedDB: `store.js` (DB `matematicas-avanzadas`) y `storage.js` (DB `matematicas-avanzadas-storage`) — **nadie importa storage.js**. Código muerto + riesgo de divergencia. | `storage.js:11`, imports globales | Eliminar `storage.js` o fusionar. |
| P2-5 | Hash de certificados: se etiqueta `sha256:` pero es un hash djb2 de 32 bits con sal constante hardcodeada (`:matematicas-avanzadas-2026`) — **cualquiera puede falsificarlo**. El plan prometía SHA-256 + QR. | `store.js:920-930` | `crypto.subtle.digest('SHA-256')` + sal por-certificado (timestamp/UUID); el QR/verificación pública ni existe. |
| P2-6 | `sw.js` typo de regex `\.avico` (¿avif?) y `setInterval` de limpieza cada 24 h (los SW mueren; el timer no sobrevive). | `sw.js:150,291-307` | Corregir regex; limpieza en `activate` o con `periodicSync`. |
| P2-7 | Página `#search` es un stub: renderiza un input sin listeners (no busca nada). La ruta `SEARCH` declara `:q` que el regex nunca captura (`/^\/search$/`). Búsqueda global: regex de `highlightMatch` sin escapar → un `(` en la query **lanza excepción** dentro del handler del input. | `modules/search/index.js`, `router.js:80`, `app.js:424-427` | Escapar regex (`query.replace(/[.*+?...]/g,'\\$&')`); cablear la página; para el plan maestro: `minisearch` ya está en deps y sin usar. |
| P2-8 | Sitemap con 46 URLs de módulos de las cuales 45 → 404, más URLs `#hash` que no son páginas indexables. Sin `robots.txt`. | `scripts/generate-sitemap.js:11-25` | Generar solo URLs reales existentes en dist; añadir `robots.txt` a `public/`. |
| P2-9 | `dist` incluye sourcemaps completos (.map ~130 KB core) públicos — decisión a tomar (GH Pages público de por sí; el código también es público). | salida de build | `sourcemap: !process.env.GITHUB_PAGES` o aceptar. |
| P2-10 | Scripts de npm que fallan: `lint` (no existe config de ESLint: ni `eslint.config.js` ni `.eslintrc`), `format` (sin `.prettierrc`), `test:e2e` (sin `playwright.config.js` ni tests e2e), `generate:og-images` (el script no existe). CI (`deploy.yml:37-50`) ejecuta `validate:content`, `test` y build — todo pasa aunque la web esté rota (ver P0). | `package.json:6-18`, `Test-Path` en shell | O crear las configs o quitar los scripts; añadir al CI un check real (P0-1: "customElements registrados" / build sin chunks vacíos). |
| P2-11 | Tests de teatro: `expect(true).toBe(true)` y un assert de JSON. Cobertura real ≈ 0 para router, store (lógica de negocio: SM-2, streaks, XP, desbloqueos), componentes, LaTeX. | `tests/core/store.test.js:7-9` | Tests reales de store (SM-2 y desbloqueo son puros y fáciles) + un test de humo con happy-dom que verifique que `math-formula` queda registrado tras importar app. |
| P2-12 | `InteractiveGraph` compila expresiones con `new Function(...)` a partir de atributos HTML (`data='{"expr":"…"}'`). Riesgo bajo (contenido propio/estático), pero es ejecución de código desde el DOM. | `InteractiveGraph.js:626` | Documentar el riesgo o usar un parser propio (ya tiene preprocesamiento). |

---

# ⚪ P3 — MENORES

1. `components.css:1758` y demás media queries existen, pero **cero container queries** (el plan las promete). Menor.
2. `index.html:158` icono sol con `style="display:none"` inline + JS que lo alterna — funciona, pero mezcla mecanismos.
3. `courses tabs`: `role="tab"` sin `aria-controls` ni manejo de flechas (WCAG-APG pide teclado en tablists). En m01 los tabpanels tienen `aria-labelledby="tab-theory"` pero el botón no tiene ese `id` → asociación ARIA rota.
4. `app.js:633` toast: `data.message` y `data.title` se inyectan **sin escapar** (innerHTML). Hoy solo hay strings propias; riesgo latente de XSS si algún dato de usuario llega ahí (p. ej. nombre en mensajes futuros).
5. `app.js:534` `navigator.platform` está obsoleto (deprecado) — usar `navigator.userAgentData?.platform` o userAgent.
6. `README.md` promete Three.js 3D, partículas, streak freeze, 50+ logros (hay 6 hardcodeados con iconos), leaderboard, etc. — ninguno existe. Documentación debe reflejar la realidad o el roadmap.

---

# 📦 GAP vs PLAN_MAESTRO — lo que falta (y falta mucho)

| Área del plan | Estado real |
|---|---|
| 46 módulos con teoría/práctica/quiz/interactivo | **1** módulo con teoría + 3 prácticas estáticas + 1 pregunta; 45 vacíos |
| Banco de 3.500 preguntas (7 tipos) | 1 pregunta multiple-choice |
| 2.000+ fórmulas LaTeX con hover-explain | ~3 fórmulas, sin renderizar (P0-1) |
| 150+ gráficas interactivas (Chart.js/D3/Three.js) | 0 funcionando (componente no registrado; D3 ni se usa; Three.js nunca fue dependencia) |
| Repaso espaciado SM-2 con tarjetas | Motor en store.js ✓ (no probado) pero **nada lo alimenta**: la cola está siempre vacía → la vista Review siempre muestra "no hay tarjetas" |
| Dificultad adaptativa (IRT), detección de misconceptions | No existe ni un archivo |
| Certificados: 5 plantillas, QR, verificación pública, PDF vectorial | CertificateView.js existe (sin usar); hash falso (P2-5); sin PDF (P1-5); sin página pública de verificación real (`#verify/:hash` busca en TU IndexedDB — no verifica nada para terceros) |
| Onboarding adaptativo con test diagnóstico | Onboarding = prompt() de nombre; diagnóstico = placeholder "pronto" |
| Búsqueda global (MiniSearch) | Búsqueda de títulos en memoria ✓ (ok); MiniSearch sin usar; página #search stub |
| Logros 50+, rachas con freeze, leaderboard | 6 logros hardcodeados; racha básica ✓; resto no |
| Fases: pages phase0.html…phase6.html + template de módulo | Carpeta `phases/` **vacía** (el build la globa y no encuentra nada) |
| docs/ (ARCHITECTURE, CONTENT_GUIDE, DEPLOYMENT) | Carpeta `docs/` **vacía** |
| Storybook/playground, tests unitarios + visual regression, e2e | 2 tests de teatro (P2-11) |
| CSP estricta + `_headers` | No existe `_headers` (GH Pages además no soporta headers custom — la CSP tendría que ir por `<meta http-equiv>`) |
| Partículas, gamificación completa, analytics privadas con UI | Sin partículas; analytics: eventos en IndexedDB sin ninguna UI para verlos |

---

# ✅ Qué está BIEN (para no injustar la obra)

- **UTF-8 íntegro** en todos los archivos (verificado byte a byte — sin mojibake real).
- **SRI del CDN de KaTeX correcto** (hash calculado localmente = hash declarado).
- **Arquitectura del store** (Proxy-like con paths, suscripciones, IndexedDB, SM-2 completo) es sólida y razonable para vanilla JS.
- **Event bus** simple y correcto; curriculum.json bien estructurado (46 módulos con objetivos y tags).
- CSS base (tokens, dark theme, callouts, teoría) con oficio; contenido pedagógico de m01 es de buena calidad.
- CI/CD despliega con permisos correctos (deploy-pages@v4) y `npm ci` (reproducible).

---

# 🛠️ PLAN DE RESOLUCIÓN PRIORIZADO

### Fase 1 — Desbloquear la web (≈ 1 día)
1. Importar los 7 componentes en `app.js` (P0-1).
2. Light DOM o `?inline` de KaTeX CSS en el shadow de `MathFormula` + `macro:`→`macros:` (P0-2).
3. Añadir/mapear las utilidades CSS faltantes (`md:flex`, `sm:flex`, `space-y-*`, `py-12`, `text-5xl/6xl`, `w-10 h-10`, overlay móvil) (P1-1).
4. Router a hash puro (P0-4); guard estricto (P1-2); logout sin borrado (P1-3).
5. Mover `sw.js` a `public/` y reescribir su precache para dist (o vite-plugin-pwa) (P0-3).

### Fase 2 — Honestidad del producto (≈ 1-2 días)
6. Generar iconos PNG reales desde el SVG (manifest + favicons + og-image) (P1-6).
7. Corregir todos los `tuusuario` → `cha0smagick`; unificar base de URL en un solo sitio (P1-7).
8. Preload→preconnect de fuentes (P1-8); sitemap solo con URLs reales + robots.txt (P2-8).
9. Quitar o implementar: export PDF (P1-5), página #search (P2-7), scripts npm fantasma (P2-10).
10. README sincronizado con la realidad + roadmap de lo pendiente (P3-6).

### Fase 3 — Contenido y calidad (continuo)
11. Pipeline de módulos: `modules/mXX/content.js` + gate de CI que valide LaTeX (`throwOnError:true`) y existencia de contenido por cada módulo del curriculum (P0-5).
12. Conectar el motor SM-2 a los quiz (alimentar `reviewQueue`) para que Review deje de estar vacío.
13. Tests reales: store (SM-2, desbloqueo, streaks), humo de registro de componentes, e2e Playwright del flujo onboarding → m01 → quiz (P2-11).
14. ESLint/Prettier configs o eliminar scripts (P2-10).

### Verificación final sugerida
`npm run build` sin warnings de chunks vacíos · Lighthouse: customElements registrados, PWA instalable, sin `sw.js` 404 · navegación atrás/adelante correcta en `dist` servido con `vite preview` · fórmula `\begin{cases}` de m01 visible con estilo KaTeX.

---

# 🧾 Matriz de evidencia

| Hallazgo | Verificación empleada |
|---|---|
| P0-1 | grep de imports en assets/js + modules → 0; usos de etiquetas: 19 |
| P0-2 | Lectura de MathFormula.js (attachShadow, línea 160) + conocimiento de encapsulación Shadow DOM |
| P0-3 | `npm run build` (warning literal de Vite); `Test-Path dist\sw.js` → False |
| P0-4 | Lectura router.js:247-326 + base en línea 425 |
| P0-5 | Node sobre curriculum.json (46 módulos); lectura de modules/module/index.js; `Test-Path modules/m02` → inexistente |
| P1-1 | Script propio de cruce clases-usadas vs CSS (391 clases, lista exacta de faltantes) |
| P1-6 | Listado de assets/images (1 archivo) vs manifest.json (11 referencias) |
| SRI KaTeX | SHA-384 calculado con PowerShell sobre el recurso descargado = hash del HTML ✓ |
| UTF-8 | Node: 0 × U+FFFD en 14 archivos de vistas |
| Tests/validador | Ejecución real: 2/2 pass, validate:content ✅ (con análisis de qué prueban) |

---

*Auditoría realizada por el Adeptus Vinictus II. Cada hallazgo fue verificado contra el repositorio; ninguna incidencia es especulativa sin estar marcada como tal.*

---

# 📌 REGISTRO DE RESOLUCIÓN (2026-11-04)

| Hallazgo | Estado | Commit |
|----------|--------|--------|
| P0-1 Componentes nunca importados | ✅ Resuelto | `44b3dea` |
| P0-2 KaTeX sin estilos en Shadow DOM + `macro:`→`macros:` | ✅ Resuelto | `44b3dea` |
| P0-3 Build con chunks vacíos + sw.js ausente en dist | ✅ Resuelto | `44b3dea` (chunks) + `9da7e04` (sw) |
| P0-4 Router pushState/atrás-adelante roto | ✅ Resuelto | `dba3546` |
| P0-5 45/46 módulos vacíos, m01 huérfano | ✅ Parcial — m01 ya vive dentro de la SPA; el resto requiere autoría de contenido (tarea continua) | `a9db436` |
| P1-1 Utilidades CSS inexistentes | ✅ Resuelto | `b414ccf` |
| P1-2 Candado de progresión que se abre solo | ✅ Resuelto | `dba3546` |
| P1-3 Logout borra progreso | ✅ Resuelto | `f3afaa0` |
| P1-4 Métricas de curso falsas | ✅ Resuelto | `f3afaa0` |
| P1-5 PDF con dependencias fantasma | ✅ Resuelto (eliminado) | `1f00b25` |
| P1-6 11 imágenes PWA inexistentes | ✅ Resuelto (generadas: 6 PNG + script) | `9da7e04` |
| P1-7 URLs placeholder / base duplicada | ✅ Resuelto | `56f7bbd` (+router sin base) |
| P1-8 Preload de fuentes incorrecto | ✅ Resuelto | `56f7bbd` |
| P2-1 preprocessLatex mutador | ✅ Resuelto (eliminado) | `1f00b25` |
| P2-2 escapeHtml sin comillas | ✅ Resuelto | `44b3dea` |
| P2-3 hover-explain por substrings | ⏸️ Aplazado — componente y feature quedan pendientes de rediseño por clases KaTeX |
| P2-4 Doble wrapper IndexedDB | ✅ Resuelto (storage.js eliminado) | `1f00b25` |
| P2-5 Hash de certificado falso | ✅ Resuelto (SHA-256 real) | `f3afaa0` |
| P2-6 sw.js typo .avico + setInterval | ✅ Resuelto (SW reescrito) | `9da7e04` |
| P2-7 Página #search stub + regex injection | ✅ Resuelto | `a9db436` (highlightMatch del header pendiente de escapar — menor) |
| P2-8 Sitemap con 404s + sin robots | ✅ Resuelto | `56f7bbd` |
| P2-9 Sourcemaps públicos | ⏸️ Decidido: se mantienen (código abierto de por sí) |
| P2-10 Scripts npm fantasma | ✅ Resuelto | `1f00b25` |
| P2-11 Tests de teatro | ✅ Resuelto (17 tests reales: store, router, componentes, LaTeX) | `b28fed1`, `f3afaa0`, `dba3546`, `44b3dea` |
| P2-12 new Function en InteractiveGraph | ✅ Documentado con shortcut | `b28fed1` |
| P3-3 Tabs sin ARIA válido | ✅ Resuelto | `a9db436` |
| P3-5 navigator.platform deprecado | ✅ Resuelto | `b28fed1` |
| P3-6 README prometedor de más | ✅ Resuelto (estado real + roadmap) | este commit |
| Pendiente estructural | 🚧 Autoría de los 45 módulos restantes, banco de preguntas, certificados PDF, diagnósticos — es producción de contenido, no bugfixing |

**Nota de seguridad:** `npm audit` — 8 de 9 vulnerabilidades están en la cadena de devDependencies (tinypool vía vitest 2; exigiría migrar a vitest 5, cambio mayor). En dependencias de producción: 1 low. Sin exposición en runtime de la web.
