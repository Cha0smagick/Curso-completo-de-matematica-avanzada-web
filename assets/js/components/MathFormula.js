/* ==========================================================================
   MATH FORMULA WEB COMPONENT - Matemáticas Avanzadas
   Renderizado LaTeX con KaTeX, tooltips por símbolo, copia, animación
   ========================================================================== */

import { renderToString } from 'katex';

/* ==========================================================================
   KATEX RENDERER CON CACHE
   ========================================================================== */
const katexCache = new Map();
const katexOptions = {
  throwOnError: false,
  displayMode: false,
  strict: false,
  trust: true,
  output: 'html',
  macro: {
    '\\R': '\\mathbb{R}',
    '\\N': '\\mathbb{N}',
    '\\Z': '\\mathbb{Z}',
    '\\Q': '\\mathbb{Q}',
    '\\C': '\\mathbb{C}',
    '\\d': '\\,\\mathrm{d}',
    '\\pd': '\\frac{\\partial #1}{\\partial #2}',
    '\\abs': '\\left| #1 \\right|',
    '\\norm': '\\left\\| #1 \\right\\|'
  }
};

function renderLatex(latex, displayMode = false) {
  const cacheKey = `${latex}|${displayMode}`;
  
  if (katexCache.has(cacheKey)) {
    return katexCache.get(cacheKey);
  }
  
  try {
    const html = renderToString(latex, {
      ...katexOptions,
      displayMode
    });
    katexCache.set(cacheKey, html);
    return html;
  } catch (error) {
    console.warn('[MathFormula] KaTeX error:', error.message, latex);
    return `<span class="katex-error" title="${error.message}">${latex}</span>`;
  }
}

/* ==========================================================================
   SYMBOL EXPLANATIONS DATABASE
   ========================================================================== */
const SYMBOL_EXPLANATIONS = {
  '\\sum': { name: 'Sumatoria', desc: 'Suma de una sucesión de términos', example: '\\sum_{i=1}^n i = \\frac{n(n+1)}{2}' },
  '\\prod': { name: 'Productoria', desc: 'Producto de una sucesión de factores', example: '\\prod_{i=1}^n i = n!' },
  '\\int': { name: 'Integral', desc: 'Integral definida o indefinida', example: '\\int_a^b f(x)\\,dx' },
  '\\oint': { name: 'Integral de contorno', desc: 'Integral sobre una curva cerrada', example: '\\oint_C \\mathbf{F}\\cdot d\\mathbf{r}' },
  '\\partial': { name: 'Derivada parcial', desc: 'Derivada respecto a una variable manteniendo otras constantes', example: '\\frac{\\partial f}{\\partial x}' },
  '\\nabla': { name: 'Nabla/Gradiente', desc: 'Vector de derivadas parciales', example: '\\nabla f = (\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y})' },
  '\\lim': { name: 'Límite', desc: 'Valor al que tiende una función', example: '\\lim_{x\\to a} f(x)' },
  '\\infty': { name: 'Infinito', desc: 'Cantidad sin límite', example: '\\int_0^\\infty e^{-x}\\,dx = 1' },
  '\\alpha': { name: 'Alfa', desc: 'Ángulo, coeficiente, nivel de significancia', example: '\\alpha = 0.05' },
  '\\beta': { name: 'Beta', desc: 'Coeficiente, parámetro de distribución', example: '\\beta \\sim \\text{Beta}(2,3)' },
  '\\gamma': { name: 'Gamma', desc: 'Constante de Euler-Mascheroni, función gamma', example: '\\Gamma(n) = (n-1)!' },
  '\\delta': { name: 'Delta', desc: 'Cambio, diferencial, delta de Dirac', example: '\\delta x = x_2 - x_1' },
  '\\epsilon': { name: 'Épsilon', desc: 'Número positivo arbitrariamente pequeño', example: '\\forall \\epsilon > 0' },
  '\\theta': { name: 'Theta', desc: 'Ángulo, parámetro', example: '\\theta = \\frac{\\pi}{4}' },
  '\\lambda': { name: 'Lambda', desc: 'Valor propio, parámetro de tasa', example: 'A\\mathbf{v} = \\lambda\\mathbf{v}' },
  '\\mu': { name: 'Mu', desc: 'Media, parámetro de distribución', example: '\\mu = \\frac{1}{n}\\sum x_i' },
  '\\sigma': { name: 'Sigma', desc: 'Desviación estándar, sumatoria', example: '\\sigma = \\sqrt{\\frac{1}{n}\\sum(x_i-\\mu)^2}' },
  '\\pi': { name: 'Pi', desc: 'Constante 3.14159..., producto', example: '\\pi \\approx 3.14159' },
  '\\phi': { name: 'Phi', desc: 'Ángulo, función phi de Euler, número áureo', example: '\\phi = \\frac{1+\\sqrt{5}}{2}' },
  '\\omega': { name: 'Omega', desc: 'Frecuencia angular, espacio muestral', example: '\\omega = 2\\pi f' },
  '\\leq': { name: 'Menor o igual', desc: 'Relación de orden', example: 'x \\leq 5' },
  '\\geq': { name: 'Mayor o igual', desc: 'Relación de orden', example: 'x \\geq 0' },
  '\\neq': { name: 'Distinto', desc: 'Desigualdad', example: 'x \\neq 0' },
  '\\approx': { name: 'Aproximadamente igual', desc: 'Igualdad aproximada', example: '\\pi \\approx 3.14' },
  '\\equiv': { name: 'Equivalente/Idéntico', desc: 'Identidad, congruencia', example: 'a \\equiv b \\pmod{n}' },
  '\\propto': { name: 'Proporcional a', desc: 'Proporcionalidad directa', example: 'y \\propto x' },
  '\\in': { name: 'Pertenece a', desc: 'Pertenencia a conjunto', example: 'x \\in \\mathbb{R}' },
  '\\notin': { name: 'No pertenece a', desc: 'No pertenencia a conjunto', example: 'x \\notin \\mathbb{Z}' },
  '\\subset': { name: 'Subconjunto', desc: 'Subconjunto propio', example: 'A \\subset B' },
  '\\subseteq': { name: 'Subconjunto o igual', desc: 'Subconjunto (puede ser igual)', example: 'A \\subseteq B' },
  '\\cup': { name: 'Unión', desc: 'Unión de conjuntos', example: 'A \\cup B' },
  '\\cap': { name: 'Intersección', desc: 'Intersección de conjuntos', example: 'A \\cap B' },
  '\\emptyset': { name: 'Conjunto vacío', desc: 'Conjunto sin elementos', example: 'A \\cap B = \\emptyset' },
  '\\forall': { name: 'Para todo', desc: 'Cuantificador universal', example: '\\forall x \\in \\mathbb{R}' },
  '\\exists': { name: 'Existe', desc: 'Cuantificador existencial', example: '\\exists x : x^2 = 4' },
  '\\Rightarrow': { name: 'Implica', desc: 'Implicación lógica', example: 'P \\Rightarrow Q' },
  '\\Leftrightarrow': { name: 'Equivale', desc: 'Equivalencia lógica', example: 'P \\Leftrightarrow Q' },
  '\\to': { name: 'Tiende a', desc: 'Límite, aplicación', example: 'f: x \\to x^2' },
  '\\mapsto': { name: 'Mapea a', desc: 'Aplicación elemento a elemento', example: 'x \\mapsto x^2' },
  '\\cdot': { name: 'Producto punto', desc: 'Multiplicación, producto escalar', example: '\\mathbf{a} \\cdot \\mathbf{b}' },
  '\\times': { name: 'Producto cruz', desc: 'Producto vectorial, producto cartesiano', example: '\\mathbf{a} \\times \\mathbf{b}' },
  '\\circ': { name: 'Composición', desc: 'Composición de funciones', example: '(f \\circ g)(x) = f(g(x))' },
  '\\pm': { name: 'Más/menos', desc: 'Más o menos', example: 'x = \\pm 2' },
  '\\mp': { name: 'Menos/más', desc: 'Menos o más (opuesto a ±)', example: 'x \\mp 2' },
  '\\sqrt': { name: 'Raíz cuadrada', desc: 'Raíz cuadrada principal', example: '\\sqrt{2} \\approx 1.414' },
  '\\sqrt[n]': { name: 'Raíz enésima', desc: 'Raíz n-ésima', example: '\\sqrt[3]{8} = 2' },
  '\\frac': { name: 'Fracción', desc: 'Fracción', example: '\\frac{a}{b}' },
  '\\binom': { name: 'Coeficiente binomial', desc: 'Número combinatorio', example: '\\binom{n}{k} = \\frac{n!}{k!(n-k)!}' },
  '\\overbrace': { name: 'Llave superior', desc: 'Agrupación con etiqueta arriba', example: '\\overbrace{x+\\cdots+x}^{n\\text{ veces}}' },
  '\\underbrace': { name: 'Llave inferior', desc: 'Agrupación con etiqueta abajo', example: '\\underbrace{x+\\cdots+x}_{n\\text{ veces}}' },
  '\\overline': { name: 'Barra superior', desc: 'Promedio, complemento, conjugado', example: '\\overline{x} = \\frac{1}{n}\\sum x_i' },
  '\\underline': { name: 'Subrayado', desc: 'Subrayado matemático', example: '\\underline{x}' },
  '\\hat': { name: 'Sombrero', desc: 'Estimador, vector unitario', example: '\\hat{\\theta}, \\hat{\\mathbf{i}}' },
  '\\tilde': { name: 'Virgulilla', desc: 'Aproximación, transformada', example: '\\tilde{f}(\\omega)' },
  '\\vec': { name: 'Vector', desc: 'Vector', example: '\\vec{v}' },
  '\\mathbf': { name: 'Negrita', desc: 'Vector/matriz en negrita', example: '\\mathbf{A}' },
  '\\mathbb': { name: 'Doble golpe', desc: 'Conjuntos numéricos estándar', example: '\\mathbb{R}, \\mathbb{N}, \\mathbb{Z}' },
  '\\mathcal': { name: 'Caligráfico', desc: 'Espacios, familias', example: '\\mathcal{F}, \\mathcal{L}' },
  '\\mathfrak': { name: 'Gótico', desc: 'Ideales, álgebras de Lie', example: '\\mathfrak{g}, \\mathfrak{p}' },
  '\\mathrm': { name: 'Romano', desc: 'Operadores, funciones estándar', example: '\\mathrm{sin}, \\mathrm{det}' },
  '\\text': { name: 'Texto', desc: 'Texto normal en modo matemático', example: '\\text{si } x > 0' },
  '\\sin': { name: 'Seno', desc: 'Función trigonométrica seno', example: '\\sin x' },
  '\\cos': { name: 'Coseno', desc: 'Función trigonométrica coseno', example: '\\cos x' },
  '\\tan': { name: 'Tangente', desc: 'Función trigonométrica tangente', example: '\\tan x' },
  '\\cot': { name: 'Cotangente', desc: 'Función trigonométrica cotangente', example: '\\cot x' },
  '\\sec': { name: 'Secante', desc: 'Función trigonométrica secante', example: '\\sec x' },
  '\\csc': { name: 'Cosecante', desc: 'Función trigonométrica cosecante', example: '\\csc x' },
  '\\arcsin': { name: 'Arco seno', desc: 'Función inversa del seno', example: '\\arcsin x' },
  '\\arccos': { name: 'Arco coseno', desc: 'Función inversa del coseno', example: '\\arccos x' },
  '\\arctan': { name: 'Arco tangente', desc: 'Función inversa de la tangente', example: '\\arctan x' },
  '\\sinh': { name: 'Seno hiperbólico', desc: 'Función hiperbólica', example: '\\sinh x = \\frac{e^x - e^{-x}}{2}' },
  '\\cosh': { name: 'Coseno hiperbólico', desc: 'Función hiperbólica', example: '\\cosh x = \\frac{e^x + e^{-x}}{2}' },
  '\\log': { name: 'Logaritmo', desc: 'Logaritmo base 10 o natural', example: '\\log x' },
  '\\ln': { name: 'Logaritmo natural', desc: 'Logaritmo base e', example: '\\ln x' },
  '\\exp': { name: 'Exponencial', desc: 'Función exponencial', example: '\\exp(x) = e^x' },
  '\\limsup': { name: 'Límite superior', desc: 'Límite superior de una sucesión', example: '\\limsup a_n' },
  '\\liminf': { name: 'Límite inferior', desc: 'Límite inferior de una sucesión', example: '\\liminf a_n' },
  '\\max': { name: 'Máximo', desc: 'Valor máximo', example: '\\max_{x\\in A} f(x)' },
  '\\min': { name: 'Mínimo', desc: 'Valor mínimo', example: '\\min_{x\\in A} f(x)' },
  '\\sup': { name: 'Supremo', desc: 'Cota superior mínima', example: '\\sup A' },
  '\\inf': { name: 'Ínfimo', desc: 'Cota inferior máxima', example: '\\inf A' },
  '\\deg': { name: 'Grado', desc: 'Grado de polinomio, ángulo en grados', example: '\\deg P(x) = 3' },
  '\\det': { name: 'Determinante', desc: 'Determinante de matriz', example: '\\det(A)' },
  '\\ker': { name: 'Núcleo', desc: 'Núcleo de aplicación lineal', example: '\\ker(T)' },
  '\\dim': { name: 'Dimensión', desc: 'Dimensión de espacio vectorial', example: '\\dim V = n' },
  '\\rank': { name: 'Rango', desc: 'Rango de matriz', example: '\\rank(A)' },
  '\\tr': { name: 'Traza', desc: 'Traza de matriz', example: '\\tr(A)' },
  '\\Re': { name: 'Parte real', desc: 'Parte real de número complejo', example: '\\Re(z)' },
  '\\Im': { name: 'Parte imaginaria', desc: 'Parte imaginaria de número complejo', example: '\\Im(z)' },
  '\\arg': { name: 'Argumento', desc: 'Argumento de número complejo', example: '\\arg(z)' },
  '\\|': { name: 'Norma/Valor absoluto', desc: 'Norma de vector, valor absoluto', example: '\\|\\mathbf{v}\\|' },
  '\\langle': { name: 'Corchete angular izquierdo', desc: 'Producto interior', example: '\\langle u, v \\rangle' },
  '\\rangle': { name: 'Corchete angular derecho', desc: 'Producto interior', example: '\\langle u, v \\rangle' }
};

/* ==========================================================================
   MATH-FORMULA WEB COMPONENT
   ========================================================================== */
export class MathFormula extends HTMLElement {
  static get observedAttributes() {
    return ['latex', 'display', 'hover-explain', 'click-to-copy', 'animate-on-scroll', 'error-message'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.latex = '';
    this.displayMode = false;
    this.hoverExplain = true;
    this.clickToCopy = true;
    this.animateOnScroll = false;
    this.hasAnimated = false;
    this.observer = null;
  }
  
  connectedCallback() {
    this.render();
    this.setupInteractions();
    this.setupScrollAnimation();
  }
  
  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'latex':
        this.latex = newValue || '';
        this.render();
        break;
      case 'display':
        this.displayMode = newValue !== null && newValue !== 'false';
        this.render();
        break;
      case 'hover-explain':
        this.hoverExplain = newValue !== 'false';
        break;
      case 'click-to-copy':
        this.clickToCopy = newValue !== 'false';
        break;
      case 'animate-on-scroll':
        this.animateOnScroll = newValue !== 'false';
        this.setupScrollAnimation();
        break;
      case 'error-message':
        this.render();
        break;
    }
  }
  
  render() {
    const html = renderLatex(this.latex, this.displayMode);
    const isError = html.includes('katex-error');
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: ${this.displayMode ? 'block' : 'inline-block'};
          overflow-x: auto;
          overflow-y: hidden;
        }
        :host([display]) { display: block; }
        
        .math-formula {
          position: relative;
          font-size: var(--math-font-size, 1em);
          color: var(--math-color, var(--color-text));
        }
        
        .math-formula.katex-display {
          margin: var(--space-4, 1rem) 0;
          padding: var(--space-2, 0.5rem) 0;
        }
        
        .katex-error {
          color: var(--math-error-color, var(--brand-error));
          background: rgba(239, 68, 68, 0.1);
          padding: var(--space-1, 0.25rem) var(--space-2, 0.5rem);
          border-radius: var(--radius-sm, 0.25rem);
          font-family: var(--font-mono, monospace);
          font-size: 0.9em;
          border: 1px solid var(--brand-error);
        }
        
        .copy-btn {
          position: absolute;
          top: var(--space-1, 0.25rem);
          right: var(--space-1, 0.25rem);
          opacity: 0;
          padding: var(--space-1, 0.25rem);
          background: var(--color-surface, #1e293b);
          border: 1px solid var(--color-border, #334155);
          border-radius: var(--radius-sm, 0.25rem);
          color: var(--color-text-muted, #94a3b8);
          cursor: pointer;
          transition: all var(--transition-fast, 150ms);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        :host(:hover) .copy-btn,
        :host(:focus-within) .copy-btn {
          opacity: 1;
        }
        
        .copy-btn:hover {
          background: var(--color-hover, rgba(34, 211, 238, 0.1));
          color: var(--brand-primary, #22d3ee);
          border-color: var(--brand-primary, #22d3ee);
        }
        
        .copy-btn:focus-visible {
          outline: none;
          box-shadow: var(--shadow-focus, 0 0 0 3px rgba(34, 211, 238, 0.4));
        }
        
        .copy-btn.copied {
          color: var(--brand-success, #10b981);
        }
        
        .copy-btn svg {
          width: 16px;
          height: 16px;
        }
        
        .explain-hint {
          position: absolute;
          bottom: calc(100% + 4px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-bg-elevated, #111827);
          color: var(--color-text, #f1f5f9);
          padding: var(--space-1, 0.25rem) var(--space-2, 0.5rem);
          border-radius: var(--radius-sm, 0.25rem);
          font-size: var(--text-xs, 0.7rem);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--transition-fast, 150ms);
          border: 1px solid var(--color-border, #334155);
          z-index: var(--z-tooltip, 700);
        }
        
        :host(:hover) .explain-hint {
          opacity: 1;
        }
        
        .animate-write .katex {
          opacity: 0;
          animation: formulaWrite 1.5s ease-out forwards;
        }
        
        @keyframes formulaWrite {
          0% { opacity: 0; transform: translateX(-20px); filter: blur(8px); }
          50% { filter: blur(2px); }
          100% { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-write .katex {
            animation: none;
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
      </style>
      <div class="math-formula ${this.displayMode ? 'katex-display' : ''} ${this.animateOnScroll && !this.hasAnimated ? 'animate-write' : ''}" data-latex="${this.escapeHtml(this.latex)}">
        ${html}
        ${this.clickToCopy ? `
          <button class="copy-btn" aria-label="Copiar LaTeX" title="Copiar LaTeX">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        ` : ''}
        ${this.hoverExplain && this.hasExplainableSymbols() ? `
          <span class="explain-hint">Pasa el ratón por los símbolos para ver su significado</span>
        ` : ''}
      </div>
    `;
    
    if (this.animateOnScroll && !this.hasAnimated) {
      this.hasAnimated = true;
    }
  }
  
  hasExplainableSymbols() {
    return Object.keys(SYMBOL_EXPLANATIONS).some(sym => this.latex.includes(sym));
  }
  
  setupInteractions() {
    const formulaEl = this.shadowRoot.querySelector('.math-formula');
    const copyBtn = this.shadowRoot.querySelector('.copy-btn');
    
    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.copyLatex();
      });
    }
    
    // Tooltips por símbolo (hover)
    if (this.hoverExplain) {
      formulaEl?.addEventListener('mousemove', (e) => this.handleSymbolHover(e));
      formulaEl?.addEventListener('mouseleave', () => this.hideSymbolTooltip());
    }
  }
  
  handleSymbolHover(e) {
    // Encontrar elemento KaTeX bajo el cursor
    const target = e.target.closest('.katex');
    if (!target) return;
    
    // Buscar símbolos explicables en el HTML renderizado
    const katexHtml = target.innerHTML;
    
    for (const [symbol, info] of Object.entries(SYMBOL_EXPLANATIONS)) {
      // Buscar el símbolo en el HTML renderizado (simplificado)
      if (katexHtml.includes(symbol.replace('\\', '\\\\')) || 
          katexHtml.includes(symbol.replace('\\', ''))) {
        this.showSymbolTooltip(e, symbol, info);
        return;
      }
    }
    
    this.hideSymbolTooltip();
  }
  
  showSymbolTooltip(e, symbol, info) {
    let tooltip = this.shadowRoot.querySelector('.symbol-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'symbol-tooltip';
      tooltip.style.cssText = `
        position: fixed;
        background: var(--color-bg-elevated, #111827);
        border: 1px solid var(--color-border, #334155);
        border-radius: var(--radius-lg, 0.5rem);
        padding: var(--space-3, 0.75rem);
        max-width: 280px;
        z-index: var(--z-tooltip, 700);
        box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.4));
        font-family: var(--font-sans, system-ui);
        font-size: var(--text-sm, 0.875rem);
        line-height: var(--leading-relaxed, 1.625);
        pointer-events: none;
      `;
      document.body.appendChild(tooltip);
    }
    
    tooltip.innerHTML = `
      <div style="font-weight: 600; color: var(--brand-primary, #22d3ee); margin-bottom: var(--space-1, 0.25rem);">
        ${info.name} <code style="font-size: 0.9em; background: var(--color-surface); padding: 1px 4px; border-radius: 3px;">${this.escapeHtml(symbol)}</code>
      </div>
      <div style="color: var(--color-text-muted, #94a3b8); margin-bottom: var(--space-2, 0.5rem);">${info.desc}</div>
      ${info.example ? `<math-formula latex="${this.escapeHtml(info.example)}" display></math-formula>` : ''}
    `;
    
    // Posicionar cerca del cursor
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left}px`;
    tooltip.style.top = `${rect.bottom + 8}px`;
    
    // Ajustar si sale de pantalla
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.right > window.innerWidth - 16) {
      tooltip.style.left = `${window.innerWidth - tooltipRect.width - 16}px`;
    }
    if (tooltipRect.bottom > window.innerHeight - 16) {
      tooltip.style.top = `${rect.top - tooltipRect.height - 8}px`;
    }
  }
  
  hideSymbolTooltip() {
    const tooltip = document.querySelector('.symbol-tooltip');
    if (tooltip) tooltip.remove();
  }
  
  async copyLatex() {
    const copyBtn = this.shadowRoot.querySelector('.copy-btn');
    try {
      await navigator.clipboard.writeText(this.latex);
      if (copyBtn) {
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        copyBtn.setAttribute('aria-label', '¡Copiado!');
        
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          `;
          copyBtn.setAttribute('aria-label', 'Copiar LaTeX');
        }, 2000);
      }
    } catch (err) {
      console.error('[MathFormula] Copy failed:', err);
    }
  }
  
  setupScrollAnimation() {
    if (!this.animateOnScroll || this.hasAnimated) return;
    
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.hasAnimated = true;
            this.render();
            this.observer?.disconnect();
          }
        });
      }, { threshold: 0.1, rootMargin: '50px' });
      
      this.observer.observe(this);
    }
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Registrar componente
if (!customElements.get('math-formula')) {
  customElements.define('math-formula', MathFormula);
}

export default MathFormula;