/* ==========================================================================
   PROGRESS RING WEB COMPONENT - Matemáticas Avanzadas
   Anillo de progreso SVG animado con segmentos por fase
   ========================================================================== */

export class ProgressRing extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'max', 'stroke-width', 'show-percentage', 'animate', 'segments', 'size'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.value = 0;
    this.max = 1;
    this.strokeWidth = 6;
    this.showPercentage = true;
    this.animate = true;
    this.segments = null;
    this.size = 80;
    this.hasAnimated = false;
  }
  
  connectedCallback() {
    this.render();
    this.parseAttributes();
    this.setupAnimation();
  }
  
  disconnectedCallback() {
    // Cleanup
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'value':
        this.value = parseFloat(newValue) || 0;
        this.updateRing();
        break;
      case 'max':
        this.max = parseFloat(newValue) || 1;
        this.updateRing();
        break;
      case 'stroke-width':
        this.strokeWidth = parseInt(newValue) || 6;
        this.render();
        break;
      case 'show-percentage':
        this.showPercentage = newValue !== 'false';
        this.render();
        break;
      case 'animate':
        this.animate = newValue !== 'false';
        break;
      case 'segments':
        try { this.segments = JSON.parse(newValue); } catch {}
        this.render();
        break;
      case 'size':
        this.size = parseInt(newValue) || 80;
        this.render();
        break;
    }
  }
  
  render() {
    const radius = (this.size - this.strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.max(0, Math.min(1, this.value / this.max));
    const offset = circumference * (1 - progress);
    
    // Generar gradiente SVG si hay segmentos
    let gradientDef = '';
    let stroke = `var(--brand-primary, #22d3ee)`;
    
    if (this.segments && this.segments.length > 0) {
      const stops = this.segments.map((seg, i) => {
        const startPercent = (seg.from / this.max) * 100;
        const endPercent = (seg.to / this.max) * 100;
        return `<stop offset="${startPercent}%" stop-color="${seg.color}"/><stop offset="${endPercent}%" stop-color="${seg.color}"/>`;
      }).join('');
      
      gradientDef = `
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            ${stops}
          </linearGradient>
        </defs>
      `;
      stroke = 'url(#progress-gradient)';
    }
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: ${this.size}px;
          height: ${this.size}px;
        }
        
        .progress-ring {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        
        .progress-ring-bg {
          fill: none;
          stroke: var(--color-border, #334155);
          stroke-width: ${this.strokeWidth};
        }
        
        .progress-ring-fg {
          fill: none;
          stroke: ${stroke};
          stroke-width: ${this.strokeWidth};
          stroke-linecap: round;
          stroke-dasharray: ${circumference};
          stroke-dashoffset: ${this.animate && !this.hasAnimated ? circumference : offset};
          transition: stroke-dashoffset ${this.animate ? '1.5s' : '0s'} cubic-bezier(0.4, 0, 0.2, 1), stroke var(--transition-base, 250ms);
        }
        
        .progress-ring-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${this.size * 0.35}px;
          font-weight: 700;
          color: var(--color-text, #f1f5f9);
          font-family: var(--font-mono, monospace);
          pointer-events: none;
        }
        
        .progress-ring-text .decimal {
          font-size: 0.7em;
          font-weight: 400;
          color: var(--color-text-muted, #94a3b8);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .progress-ring-fg {
            transition: none;
            stroke-dashoffset: ${offset};
          }
        }
      </style>
      
      <div class="progress-ring-wrapper" style="position: relative; width: ${this.size}px; height: ${this.size}px;">
        <svg class="progress-ring" viewBox="0 0 ${this.size} ${this.size}" aria-hidden="true">
          ${gradientDef}
          <circle 
            class="progress-ring-bg" 
            cx="${this.size / 2}" 
            cy="${this.size / 2}" 
            r="${radius}"
          />
          <circle 
            class="progress-ring-fg" 
            cx="${this.size / 2}" 
            cy="${this.size / 2}" 
            r="${radius}"
          />
        </svg>
        ${this.showPercentage ? `
          <div class="progress-ring-text" aria-label="Progreso: ${Math.round(progress * 100)}%">
            ${Math.round(progress * 100)}<span class="decimal">%</span>
          </div>
        ` : ''}
      </div>
    `;
  }
  
  parseAttributes() {
    this.value = parseFloat(this.getAttribute('value')) || 0;
    this.max = parseFloat(this.getAttribute('max')) || 1;
    this.strokeWidth = parseInt(this.getAttribute('stroke-width')) || 6;
    this.showPercentage = this.getAttribute('show-percentage') !== 'false';
    this.animate = this.getAttribute('animate') !== 'false';
    
    try {
      this.segments = JSON.parse(this.getAttribute('segments') || 'null');
    } catch {
      this.segments = null;
    }
    
    this.size = parseInt(this.getAttribute('size')) || 80;
  }
  
  setupAnimation() {
    if (!this.animate || this.hasAnimated) return;
    
    // Animar al aparecer en viewport
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.hasAnimated = true;
            this.updateRing(true);
            observer.disconnect();
          }
        });
      }, { threshold: 0.1, rootMargin: '50px' });
      
      observer.observe(this);
    } else {
      // Fallback: animar inmediatamente
      this.hasAnimated = true;
      requestAnimationFrame(() => this.updateRing(true));
    }
  }
  
  updateRing(forceAnimate = false) {
    const radius = (this.size - this.strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.max(0, Math.min(1, this.value / this.max));
    const offset = circumference * (1 - progress);
    
    const fg = this.shadowRoot.querySelector('.progress-ring-fg');
    const text = this.shadowRoot.querySelector('.progress-ring-text');
    
    if (fg) {
      if (forceAnimate || this.hasAnimated) {
        fg.style.strokeDashoffset = offset;
      } else {
        fg.style.strokeDashoffset = circumference;
      }
    }
    
    if (text && this.showPercentage) {
      text.innerHTML = `${Math.round(progress * 100)}<span class="decimal">%</span>`;
    }
  }
  
  // Método público para actualizar valor
  setValue(value, max) {
    this.value = value;
    if (max !== undefined) this.max = max;
    this.updateRing();
  }
}

// Registrar componente
if (!customElements.get('progress-ring')) {
  customElements.define('progress-ring', ProgressRing);
}

export default ProgressRing;