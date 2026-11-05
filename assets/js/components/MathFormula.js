/* ==========================================================================
   MATH FORMULA WEB COMPONENT - Matemáticas Avanzadas
   Renderizado LaTeX con KaTeX, tooltips por símbolo, copia, animación
   ========================================================================== */

import { renderToString } from 'katex';
// CSS de KaTeX: en Shadow DOM no aplica el CSS del documento, hay que inyectarlo dentro.
// `?inline` devuelve el CSS como string (Vite); en tests puede venir vacío y se tolera.
import katexCss from 'katex/dist/katex.min.css?inline';
import { GLYPH_EXPLANATIONS } from './math-symbols.js';

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
  macros: {
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
    const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&' + 'amp;', '<': '&' + 'lt;', '>': '&' + 'gt;', '"': '&' + 'quot;' }[ch]));
    return `<span class="katex-error" title="${esc(error.message)}">${esc(latex)}</span>`;
  }
}

/* Símbolos: importados del módulo compartido math-symbols.js */

;

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
    this.renderedHtml = html;
    const isError = html.includes('katex-error');
    
    this.shadowRoot.innerHTML = `
      <style>${katexCss || ''}</style>
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
    // Se basa en el HTML ya renderizado: los glifos solo aparecen si KaTeX los produjo
    return Object.keys(GLYPH_EXPLANATIONS).some(g => (this.renderedHtml || '').includes(g));
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
    // El glifo real es el texto del span bajo el cursor (KaTeX renderiza cada símbolo
    // como span con su carácter: ∑, π, ≤...). Sin búsqueda de substrings.
    const span = e.target.closest('span');
    const text = (span?.textContent || '').trim();
    
    if (text.length > 3) {
      this.hideSymbolTooltip();
      return;
    }
    
    const info = GLYPH_EXPLANATIONS[text];
    if (info) {
      this.showSymbolTooltip(e, text, info);
    } else {
      this.hideSymbolTooltip();
    }
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
        ${info.name} <code style="font-size: 0.9em; background: var(--color-surface); padding: 1px 4px; border-radius: 3px;">${this.escapeHtml(symbol)} = ${this.escapeHtml(info.latex)}</code>
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
    // Escapa también comillas: este resultado va dentro de atributos HTML
    const map = { '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": '#39' };
    return String(text ?? '').replace(/[&<>"']/g, (ch) => `&${map[ch]};`);
  }
}

// Registrar componente
if (!customElements.get('math-formula')) {
  customElements.define('math-formula', MathFormula);
}

export default MathFormula;