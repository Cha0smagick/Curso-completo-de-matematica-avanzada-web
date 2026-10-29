/* ==========================================================================
   HOVER TOOLTIP WEB COMPONENT - Matemáticas Avanzadas
   Tooltip rico con posicionamiento inteligente (Floating UI), contenido HTML + LaTeX
   ========================================================================== */

import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';

/* ==========================================================================
   HOVER-TOOLTIP WEB COMPONENT
   ========================================================================== */
export class HoverTooltip extends HTMLElement {
  static get observedAttributes() {
    return ['target', 'position', 'delay', 'interactive', 'gap', 'max-width'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.targetSelector = 'math-formula, .concept-term, [data-tooltip]';
    this.position = 'auto';
    this.delay = 150;
    this.interactive = false;
    this.gap = 8;
    this.maxWidth = 280;
    this.currentTarget = null;
    this.tooltipEl = null;
    this.showTimeout = null;
    this.hideTimeout = null;
    this.cleanupFloating = null;
    this.isOpen = false;
  }
  
  connectedCallback() {
    this.render();
    this.setupDelegatedEvents();
  }
  
  disconnectedCallback() {
    this.clearTimeouts();
    if (this.cleanupFloating) this.cleanupFloating();
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'target':
        this.targetSelector = newValue || 'math-formula, .concept-term, [data-tooltip]';
        break;
      case 'position':
        this.position = newValue || 'auto';
        break;
      case 'delay':
        this.delay = parseInt(newValue) || 150;
        break;
      case 'interactive':
        this.interactive = newValue !== 'false';
        break;
      case 'gap':
        this.gap = parseInt(newValue) || 8;
        break;
      case 'max-width':
        this.maxWidth = parseInt(newValue) || 280;
        break;
    }
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: contents;
        }
      </style>
    `;
  }
  
  setupDelegatedEvents() {
    // Event delegation en el document para capturar targets dinámicos
    document.addEventListener('mouseover', this.handleMouseOver.bind(this), true);
    document.addEventListener('mouseout', this.handleMouseOut.bind(this), true);
    document.addEventListener('focusin', this.handleFocusIn.bind(this), true);
    document.addEventListener('focusout', this.handleFocusOut.bind(this), true);
    
    // Touch support
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
  }
  
  handleMouseOver(e) {
    const target = e.target.closest(this.targetSelector);
    if (!target) return;
    
    this.currentTarget = target;
    this.clearTimeouts();
    this.showTimeout = setTimeout(() => this.showTooltip(target), this.delay);
  }
  
  handleMouseOut(e) {
    const target = e.target.closest(this.targetSelector);
    if (!target || target !== this.currentTarget) return;
    
    // Verificar si el ratón se movió al tooltip (si es interactivo)
    if (this.interactive && this.tooltipEl) {
      const related = e.relatedTarget;
      if (related && (related === this.tooltipEl || this.tooltipEl.contains(related))) {
        return; // No ocultar, el ratón está sobre el tooltip
      }
    }
    
    this.clearTimeouts();
    this.hideTimeout = setTimeout(() => this.hideTooltip(), this.delay);
  }
  
  handleFocusIn(e) {
    const target = e.target.closest(this.targetSelector);
    if (!target) return;
    
    this.currentTarget = target;
    this.showTooltip(target);
  }
  
  handleFocusOut(e) {
    const target = e.target.closest(this.targetSelector);
    if (!target || target !== this.currentTarget) return;
    
    // Delay para permitir navegación por teclado
    this.hideTimeout = setTimeout(() => this.hideTooltip(), 200);
  }
  
  handleTouchStart(e) {
    const target = e.target.closest(this.targetSelector);
    if (!target) return;
    
    this.currentTarget = target;
    this.showTooltip(target);
    
    // Ocultar al tocar fuera
    const hideOnTouch = (te) => {
      if (!this.tooltipEl || this.tooltipEl.contains(te.target) || target.contains(te.target)) return;
      this.hideTooltip();
      document.removeEventListener('touchstart', hideOnTouch);
    };
    setTimeout(() => document.addEventListener('touchstart', hideOnTouch, { passive: true }), 100);
  }
  
  async showTooltip(target) {
    if (this.isOpen && this.currentTarget === target) return;
    
    const content = this.getContent(target);
    if (!content) return;
    
    this.isOpen = true;
    this.currentTarget = target;
    
    // Crear elemento tooltip
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.className = 'rich-tooltip';
    this.tooltipEl.setAttribute('role', 'tooltip');
    this.tooltipEl.style.cssText = `
      position: fixed;
      max-width: ${this.maxWidth}px;
      background: var(--color-bg-elevated, #111827);
      border: 1px solid var(--color-border, #334155);
      border-radius: var(--radius-xl, 0.75rem);
      box-shadow: var(--shadow-xl, 0 20px 25px -5px rgba(0,0,0,0.4));
      padding: var(--space-4, 1rem);
      z-index: var(--z-tooltip, 700);
      animation: scaleIn var(--transition-fast, 150ms);
      font-family: var(--font-sans, system-ui);
      font-size: var(--text-sm, 0.875rem);
      line-height: var(--leading-relaxed, 1.625);
      color: var(--color-text, #f1f5f9);
    `;
    this.tooltipEl.innerHTML = content;
    
    // Inicializar math-formulas dentro del tooltip
    this.tooltipEl.querySelectorAll('math-formula').forEach(el => {
      if (!el.shadowRoot) {
        // El componente se auto-inicializa al conectarse
      }
    });
    
    document.body.appendChild(this.tooltipEl);
    
    // Posicionar con Floating UI
    await this.positionTooltip(target);
    
    // Configurar autoUpdate para reposicionar si cambia el layout
    this.cleanupFloating = autoUpdate(target, this.tooltipEl, () => this.positionTooltip(target));
    
    // Si es interactivo, añadir event listeners para mantener abierto
    if (this.interactive) {
      this.tooltipEl.addEventListener('mouseenter', () => this.clearTimeouts());
      this.tooltipEl.addEventListener('mouseleave', () => {
        this.hideTimeout = setTimeout(() => this.hideTooltip(), this.delay);
      });
    }
  }
  
  async positionTooltip(target) {
    if (!this.tooltipEl || !target) return;
    
    const middleware = [
      offset(this.gap),
      flip(),
      shift({ padding: 8 })
    ];
    
    // Mapear position a Floating UI placement
    const placementMap = {
      'auto': 'auto',
      'top': 'top',
      'bottom': 'bottom',
      'left': 'left',
      'right': 'right',
      'top-start': 'top-start',
      'top-end': 'top-end',
      'bottom-start': 'bottom-start',
      'bottom-end': 'bottom-end',
      'left-start': 'left-start',
      'left-end': 'left-end',
      'right-start': 'right-start',
      'right-end': 'right-end'
    };
    
    const placement = placementMap[this.position] || 'top';
    
    const { x, y, middlewareData } = await computePosition(target, this.tooltipEl, {
      placement,
      middleware
    });
    
    Object.assign(this.tooltipEl.style, {
      left: `${x}px`,
      top: `${y}px`
    });
    
    // Añadir flecha si hay flip
    if (middlewareData.flip?.skipped) {
      this.addArrow(middlewareData.flip.placement);
    }
  }
  
  addArrow(placement) {
    if (this.tooltipEl.querySelector('.tooltip-arrow')) return;
    
    const arrow = document.createElement('div');
    arrow.className = 'tooltip-arrow';
    const side = placement.split('-')[0];
    
    const arrowStyles = {
      top: 'bottom: -6px; left: 50%; transform: translateX(-50%); border-top-color: var(--color-bg-elevated);',
      bottom: 'top: -6px; left: 50%; transform: translateX(-50%); border-bottom-color: var(--color-bg-elevated);',
      left: 'right: -6px; top: 50%; transform: translateY(-50%); border-left-color: var(--color-bg-elevated);',
      right: 'left: -6px; top: 50%; transform: translateY(-50%); border-right-color: var(--color-bg-elevated);'
    };
    
    arrow.style.cssText = `
      position: absolute;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      ${arrowStyles[side] || arrowStyles.top}
    `;
    
    this.tooltipEl.appendChild(arrow);
  }
  
  hideTooltip() {
    this.clearTimeouts();
    this.isOpen = false;
    
    if (this.cleanupFloating) {
      this.cleanupFloating();
      this.cleanupFloating = null;
    }
    
    if (this.tooltipEl) {
      this.tooltipEl.style.animation = 'fadeOut 150ms ease-in forwards';
      setTimeout(() => {
        if (this.tooltipEl?.parentNode) {
          this.tooltipEl.remove();
        }
        this.tooltipEl = null;
      }, 150);
    }
    
    this.currentTarget = null;
  }
  
  clearTimeouts() {
    if (this.showTimeout) clearTimeout(this.showTimeout);
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.showTimeout = null;
    this.hideTimeout = null;
  }
  
  getContent(target) {
    // 1. Contenido desde slots del componente
    const slotContent = this.querySelector('[slot="content"]');
    if (slotContent) {
      return slotContent.innerHTML;
    }
    
    // 2. Atributo data-tooltip en el target
    if (target.hasAttribute('data-tooltip')) {
      return this.formatSimpleTooltip(target.getAttribute('data-tooltip'));
    }
    
    // 3. Atributo data-definition (para concept-term)
    if (target.hasAttribute('data-definition')) {
      return this.formatDefinitionTooltip(target);
    }
    
    // 4. Título del elemento
    if (target.hasAttribute('title')) {
      return this.formatSimpleTooltip(target.getAttribute('title'));
    }
    
    // 5. Para math-formula, buscar símbolos explicables
    if (target.tagName.toLowerCase() === 'math-formula') {
      return this.getMathFormulaContent(target);
    }
    
    return null;
  }
  
  formatSimpleTooltip(text) {
    return `<div class="rich-tooltip-body">${this.escapeHtml(text)}</div>`;
  }
  
  formatDefinitionTooltip(target) {
    const term = target.textContent.trim();
    const definition = target.getAttribute('data-definition');
    const formula = target.getAttribute('data-formula');
    const link = target.getAttribute('data-link');
    
    return `
      <div class="rich-tooltip-header">
        <h4 class="rich-tooltip-title">${this.escapeHtml(term)}</h4>
      </div>
      <div class="rich-tooltip-body">${this.escapeHtml(definition)}</div>
      ${formula ? `<div class="rich-tooltip-formula"><math-formula latex="${this.escapeHtml(formula)}" display></math-formula></div>` : ''}
      ${link ? `<a class="rich-tooltip-link" href="${this.escapeHtml(link)}">Ver más →</a>` : ''}
    `;
  }
  
  getMathFormulaContent(target) {
    const latex = target.getAttribute('latex') || '';
    // Buscar símbolos explicables en la fórmula
    const explanations = [];
    
    for (const [symbol, info] of Object.entries(SYMBOL_EXPLANATIONS)) {
      if (latex.includes(symbol)) {
        explanations.push({ symbol, ...info });
      }
    }
    
    if (explanations.length === 0) return null;
    
    return `
      <div class="rich-tooltip-header">
        <h4 class="rich-tooltip-title">Símbolos en esta fórmula</h4>
      </div>
      <div class="rich-tooltip-body">
        ${explanations.slice(0, 5).map(e => `
          <div style="margin-bottom: var(--space-2);">
            <code style="background: var(--color-surface); padding: 1px 6px; border-radius: 3px; color: var(--brand-primary);">${this.escapeHtml(e.symbol)}</code>
            <span style="margin-left: var(--space-2); color: var(--color-text-muted);">${this.escapeHtml(e.name)}</span>
            <div style="font-size: 0.85em; color: var(--color-text-subtle); margin-top: 2px;">${this.escapeHtml(e.desc)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Registrar componente
if (!customElements.get('hover-tooltip')) {
  customElements.define('hover-tooltip', HoverTooltip);
}

export default HoverTooltip;