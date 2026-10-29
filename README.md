# 🧮 Matemáticas Avanzadas - Curso Completo

> **Curso profesional completo de matemáticas desde cero hasta nivel universitario avanzado.**
> Diseñado para quien "odia" las matemáticas o tiene cero experiencia. 100% interactivo, didáctico y gratuito.

[![Deploy to GitHub Pages](https://github.com/tuusuario/Curso-completo-de-matematica-avanzada/actions/workflows/deploy.yml/badge.svg)](https://github.com/tuusuario/Curso-completo-de-matematica-avanzada/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue.svg)](https://web.dev/progressive-web-apps/)
[![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AA-green.svg)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## ✨ Características Principales

### 📚 **Currículo Completo (7 Fases, 46 Módulos)**
| Fase | Tema | Módulos | Horas Est. |
|------|------|---------|------------|
| **0** | Fundamentos Pre-Matemáticos | 5 | 3h |
| **1** | Aritmética y Pre-Álgebra | 8 | 10h |
| **2** | Funciones y Álgebra Avanzada | 9 | 15h |
| **3** | Geometría y Trigonometría Analítica | 5 | 12h |
| **4** | Cálculo Diferencial e Integral | 8 | 25h |
| **5** | Álgebra Lineal y Matemáticas Discretas | 5 | 15h |
| **6** | Temas Avanzados y Aplicaciones STEM | 6 | 20h |
| **Total** | | **46** | **~120h** |

Basado en pensums de **MIT, Harvard, Stanford, Oxford, ETH Zurich, Cambridge, IIT, UNAM, UBA**.

### 🎯 **Pedagogía de Vanguardia**
- **Andamiaje progresivo** (Zona de Desarrollo Próximo - Vygotsky)
- **Carga cognitiva gestionada** (Teoría de Sweller)
- **Aprendizaje activo** - cada pantalla requiere interacción
- **Retroalimentación inmediata** con explicaciones *antes* de continuar
- **Repaso espaciado SM-2** adaptado por dificultad matemática
- **Detección de misconceptions** con remediación automática
- **Dual Coding** (Paivio) - texto + visual + interactivo simultáneo

### 🌈 **Experiencia Visual Inmersiva**
- **Design System** accesible (WCAG 2.1 AA) - modo oscuro/claro/auto
- **150+ gráficas interactivas** (Chart.js 2D + Three.js 3D)
- **Fórmulas LaTeX con KaTeX** - tooltips por símbolo, copia, animación de escritura
- **Hover-tooltips ricos** en todos los términos técnicos
- **Animaciones suaves** respetando `prefers-reduced-motion`
- **Partículas de fondo** sutiles y performantes

### 🏆 **Gamificación Significativa**
- **XP y niveles** basados en logros reales
- **Rachas diarias** con streak freeze
- **50+ logros** desbloqueables
- **Certificados verificables** (módulo, fase, curso, maestría)
- **Hash SHA-256 + QR** para verificación pública
- **PDF vectorial** listo para imprimir (A4)

### 🔧 **Tecnología Moderna**
- **Vanilla JS ES2024** - sin frameworks, 0 dependencias runtime
- **Web Components** nativos reutilizables
- **IndexedDB** (idb) - offline-first, datos locales
- **Service Worker** - cache inteligente, background sync
- **PWA instalable** - funciona como app nativa
- **GitHub Actions** - deploy automático a GitHub Pages
- **Bundle <200KB gzip** (core) - carga instantánea

---

## 🚀 Inicio Rápido

### Opción 1: Usar en GitHub Pages (Recomendado)
1. **Fork** este repositorio
2. Ve a **Settings → Pages**
3. Source: **GitHub Actions**
4. El workflow se ejecuta automáticamente en cada push a `main`
5. Tu curso estará en: `https://tuusuario.github.io/Curso-completo-de-matematica-avanzada/`

### Opción 2: Desarrollo Local
```bash
# Clonar
git clone https://github.com/tuusuario/Curso-completo-de-matematica-avanzada.git
cd Curso-completo-de-matematica-avanzada

# Instalar dependencias
npm install

# Servidor de desarrollo (con HMR)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Tests
npm run test
npm run test:e2e

# Linting & Formato
npm run lint
npm run format
```

---

## 📁 Estructura del Proyecto

```
Curso-completo-de-matematica-avanzada/
├── index.html                    # Entry point + App Shell
├── manifest.json                 # PWA Manifest
├── sw.js                         # Service Worker
├── vite.config.js                # Build config (Vite + PWA)
├── package.json                  # Dependencies & scripts
├── PLAN_MAESTRO.md               # Documentación completa del plan
├── README.md                     # Este archivo
├── .github/workflows/deploy.yml  # GitHub Actions deploy
│
├── assets/
│   ├── css/
│   │   ├── variables.css         # Design tokens (colores, spacing, typography)
│   │   ├── reset.css             # Normalize + baseline
│   │   ├── layout.css            # Grid/Flex layouts, app structure
│   │   ├── components.css        # UI components (buttons, cards, modals...)
│   │   ├── course.css            # Estilos específicos del curso
│   │   ├── animations.css        # Keyframes, micro-interactions
│   │   └── print.css             # Estilos para impresión/PDF
│   │
│   ├── js/
│   │   ├── core/
│   │   │   ├── app.js            # Inicialización, coordinación global
│   │   │   ├── store.js          # Estado reactivo + IndexedDB sync
│   │   │   ├── router.js         # Hash-based router con guards
│   │   │   └── events.js         # Event bus tipado
│   │   │
│   │   ├── components/
│   │   │   ├── MathFormula.js    # <math-formula> - LaTeX con KaTeX
│   │   │   ├── HoverTooltip.js   # <hover-tooltip> - Tooltips ricos
│   │   │   ├── InteractiveGraph.js # <interactive-graph> - Chart.js/D3
│   │   │   ├── QuizCard.js       # <quiz-card> - 7 tipos de pregunta
│   │   │   ├── ProgressRing.js   # <progress-ring> - SVG animado
│   │   │   ├── CertificateView.js # <certificate-view> - Diplomas
│   │   │   └── SpacedRepetition.js # Motor SM-2 integrado
│   │   │
│   │   ├── modules/              # Vistas por página (lazy loaded)
│   │   └── utils/
│   │       ├── katex-helper.js   # Utilidades LaTeX
│   │       ├── storage.js        # Wrapper IndexedDB
│   │       └── export-pdf.js     # Generación PDF (jsPDF + html2canvas)
│   │
│   └── data/
│       └── curriculum.json       # Árbol curricular completo
│
├── phases/                       # Entry points por fase
│   ├── phase0.html ... phase6.html
│
├── modules/                      # Módulos individuales
│   ├── m01/ ... m46/            # Cada módulo = carpeta autónoma
│   │   ├── index.html           # Vista principal con tabs
│   │   ├── theory.html          # Teoría narrativa
│   │   ├── practice.html        # Práctica guiada
│   │   ├── quiz.html            # Quiz adaptativo
│   │   ├── interactive.html     # Gráficas/laboratorio
│   │   └── data.json            # Metadatos + preguntas
│   │
│   └── shared/                   # Partials reutilizables
│
└── docs/
    ├── ARCHITECTURE.md
    ├── CONTENT_GUIDE.md
    └── DEPLOYMENT.md
```

---

## 🧩 Web Components Disponibles

| Componente | Tag | Descripción |
|------------|-----|-------------|
| **MathFormula** | `<math-formula>` | Render LaTeX con KaTeX, tooltips por símbolo, copia, animación |
| **HoverTooltip** | `<hover-tooltip>` | Tooltips ricos con Floating UI, contenido HTML+LaTeX |
| **InteractiveGraph** | `<interactive-graph>` | Gráficas 2D/3D con sliders, tangentes, derivadas, integrales |
| **QuizCard** | `<quiz-card>` | 7 tipos pregunta, hints progresivos, SM-2, XP |
| **ProgressRing** | `<progress-ring>` | Anillo SVG animado con segmentos por fase |
| **CertificateView** | `<certificate-view>` | Diplomas con templates, PDF, QR, verificación |
| **SpacedRepetition** | `<spaced-repetition>` | Motor SM-2 completo con UI |

### Ejemplo de uso:

```html
<!-- Fórmula con explicación al hover -->
<math-formula 
  latex="\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}"
  display
  hover-explain
  click-to-copy
  animate-on-scroll>
</math-formula>

<!-- Gráfica interactiva con sliders -->
<interactive-graph
  type="function"
  data='{"functions":[{"expr":"a*sin(b*x)","color":"var(--brand-primary)","label":"a·sen(bx)"}],"range":[-2*PI,2*PI]}'
  sliders='[{"var":"a","min":0.5,"max":3,"step":0.1,"default":1},{"var":"b","min":0.5,"max":5,"step":0.1,"default":1}]'
  tangent
  derivative
  integral
  export="png|svg">
</interactive-graph>

<!-- Quiz adaptativo -->
<quiz-card
  mode="learning"
  question-id="m14-q5"
  difficulty="adaptive"
  hints="progressive"
  explanation="required"
  xp="15">
</quiz-card>

<!-- Certificado verificable -->
<certificate-view
  type="module"
  certificate-id="module-m14"
  student-name="Juan Pérez"
  template="elegant"
  download-pdf
  shareable>
</certificate-view>
```

---

## 📖 Guía de Contenido

### Crear un nuevo módulo:

1. **Carpeta**: `modules/mXX/` (XX = número secuencial)
2. **data.json** con metadatos:
```json
{
  "id": "m14",
  "title": "Concepto de Función",
  "phaseId": 2,
  "estimatedMinutes": 90,
  "difficulty": 4,
  "tags": ["función", "dominio", "biyectiva"],
  "learningObjectives": [
    "Definir función y distinguir de correspondencia",
    "Determinar dominio, codominio e imagen"
  ],
  "sections": ["theory", "practice", "quiz", "interactive"]
}
```
3. **index.html** con tabs para cada sección
4. **Preguntas** en `assets/data/questions/mXX.json` (formato estándar)
5. **Registrar** en `curriculum.json` bajo la fase correspondiente

### Formato de preguntas (7 tipos soportados):

```json
{
  "type": "multiple-choice|multi-select|numeric-input|latex-input|ordering|matching|graph-sketch",
  "question": "Si $f(x) = 2x^2 - 3x + 1$, ¿cuál es $f'(2)$?",
  "options": [
    {"id": "a", "text": "5", "correct": true},
    {"id": "b", "text": "1", "correct": false}
  ],
  "hints": [
    "Recuerda la regla de la potencia: $(x^n)' = n x^{n-1}$",
    "Deriva término a término: $(2x^2)' - (3x)' + (1)'$"
  ],
  "explanation": "Aplicamos la regla de la potencia...\n$f'(x) = 4x - 3$\nEvaluando en x=2: $f'(2) = 4(2) - 3 = 5$",
  "difficulty": 1.0,
  "topic": "calculus"
}
```

---

## 🔒 Privacidad y Seguridad

- **Zero tracking externo** - Sin Google Analytics, Meta Pixel, etc.
- **Datos 100% locales** - IndexedDB en tu navegador (exportable JSON)
- **Certificados verificables** - Hash SHA-256 + timestamp + QR
- **CSP estricta** - `script-src 'self'; style-src 'self' 'unsafe-inline'`
- **Sin cookies** - Solo localStorage/IndexedDB
- **PWA offline-first** - Funciona sin conexión tras primera carga

---

## 📊 Métricas de Éxito (KPIs)

| Métrica | Objetivo |
|---------|----------|
| Tasa completitud módulo | >65% |
| Tasa completitud fase | >40% |
| Tasa completitud curso | >15% |
| Retención D7 | >35% |
| Retención D30 | >20% |
| Promedio sesiones/semana | >3 |
| Tiempo hasta primer certificado | <45 min |
| NPS (encuesta integrada) | >50 |
| Puntuación accesibilidad (Lighthouse) | 100/100 |
| Performance (LCP) | <2.5s |

---

## 🛠 Scripts Disponibles

```bash
npm run dev              # Servidor desarrollo con HMR
npm run build            # Build producción optimizado
npm run preview          # Preview del build
npm run lint             # ESLint
npm run format           # Prettier
npm run validate:content # Validar estructura curricular
npm run test             # Unit tests (Vitest)
npm run test:ui          # UI para tests
npm run test:e2e         # E2E tests (Playwright)
npm run generate:sitemap # Generar sitemap.xml
npm run generate:og-images # Generar Open Graph images
npm run deploy           # Build + deploy a GitHub Pages (gh-pages)
```

---

## 🌐 Despliegue

### GitHub Pages (Automático)
El workflow `.github/workflows/deploy.yml`:
1. Checkout + Setup Node 22
2. `npm ci` + validación + tests
3. `npm run build` (output en `dist/`)
4. Genera `sitemap.xml`
5. Deploy a GitHub Pages via `actions/deploy-pages`

### Netlify / Vercel / Cloudflare Pages
Conecta el repo, build command: `npm run build`, output: `dist/`

### Servidor propio (Nginx/Apache)
```nginx
# Configuración recomendada
location / {
  try_files $uri $uri/ /index.html;
}

# Cacheo agresivo para assets versionados
location /assets/ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# Service Worker sin cache
location /sw.js {
  add_header Cache-Control "no-cache";
}
```

---

## 📝 Licencia

**MIT License** - Libre para usar, modificar, distribuir, comercialmente.

```text
Copyright (c) 2026 Adeptus Vinictus II

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🤝 Contribuir

1. Fork el repositorio
2. Crea rama: `git checkout -b feature/nueva-caracteristica`
3. Commit: `git commit -m 'feat: agregar nueva característica'`
4. Push: `git push origin feature/nueva-caracteristica`
5. Abre Pull Request

### Ideas para contribuir:
- 🌍 **Traducciones** (inglés, francés, portugués, etc.)
- 📝 **Más preguntas** para el banco (objetivo: 3,500+)
- 🎨 **Nuevos templates** de certificados
- 🧪 **Tests** unitarios y E2E
- ♿ **Mejoras de accesibilidad**
- 📱 **Optimizaciones móviles**

---

## 🙏 Agradecimientos

- **KaTeX** - Renderizado LaTeX ultrarrápido
- **Chart.js** - Gráficas 2D hermosas
- **D3.js** - Visualizaciones de datos potentes
- **Floating UI** - Posicionamiento inteligente de tooltips
- **idb** - IndexedDB wrapper limpio
- **Workbox** - Inspiración para Service Worker
- **Inter / JetBrains Mono** - Tipografías legibles y técnicas
- **Comunidad educativa** - Por inspirar mejores formas de enseñar matemáticas

---

## 📞 Contacto

- **Issues**: [GitHub Issues](https://github.com/tuusuario/Curso-completo-de-matematica-avanzada/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/tuusuario/Curso-completo-de-matematica-avanzada/discussions)
- **Email**: matematicas-avanzada@ejemplo.com

---

<div align="center">

**Hecho con ❤️ para que cualquiera pueda aprender matemáticas avanzadas desde cero.**

[⭐ Dale una estrella si te gusta el proyecto](https://github.com/tuusuario/Curso-completo-de-matematica-avanzada/stargazers)

</div>