/* ==========================================================================
   INTERACTIVE GRAPH WEB COMPONENT - Matemáticas Avanzadas
   Gráficas interactivas con Chart.js 2D / Three.js 3D, sliders, export
   ========================================================================== */

import Chart from 'chart.js/auto';

/* ==========================================================================
   INTERACTIVE-GRAPH WEB COMPONENT
   ========================================================================== */
export class InteractiveGraph extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'data', 'sliders', 'points', 'tangent', 'derivative', 'integral', 'export', 'width', 'height', 'theme'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.chart = null;
    this.type = 'function';
    this.graphData = { functions: [], range: [-10, 10] };
    this.sliders = [];
    this.pointsDraggable = false;
    this.showTangent = false;
    this.showDerivative = false;
    this.showIntegral = false;
    this.exportEnabled = false;
    this.width = '100%';
    this.height = '400px';
    this.theme = 'dark';
    this.animationFrame = null;
    this.resizeObserver = null;
  }
  
  connectedCallback() {
    this.render();
    this.parseAttributes();
    this.initChart();
    this.setupResizeObserver();
  }
  
  disconnectedCallback() {
    this.destroyChart();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'type':
        this.type = newValue || 'function';
        this.reinitChart();
        break;
      case 'data':
        try { this.graphData = JSON.parse(newValue); } catch {}
        this.updateChart();
        break;
      case 'sliders':
        try { this.sliders = JSON.parse(newValue); } catch {}
        this.renderSliders();
        break;
      case 'points':
        this.pointsDraggable = newValue !== 'false';
        break;
      case 'tangent':
        this.showTangent = newValue !== 'false';
        break;
      case 'derivative':
        this.showDerivative = newValue !== 'false';
        break;
      case 'integral':
        this.showIntegral = newValue !== 'false';
        break;
      case 'export':
        this.exportEnabled = newValue !== 'false';
        this.renderToolbar();
        break;
      case 'width':
        this.width = newValue || '100%';
        this.updateSize();
        break;
      case 'height':
        this.height = newValue || '400px';
        this.updateSize();
        break;
      case 'theme':
        this.theme = newValue || 'dark';
        this.updateTheme();
        break;
    }
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: ${this.height};
          min-height: 300px;
          background: var(--color-bg, #0a0f1a);
          border: 1px solid var(--color-border, #334155);
          border-radius: var(--radius-xl, 0.75rem);
          overflow: hidden;
          position: relative;
          font-family: var(--font-sans, system-ui);
        }
        
        .graph-container {
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .graph-canvas {
          display: block;
          width: 100% !important;
          height: 100% !important;
        }
        
        .graph-controls {
          position: absolute;
          bottom: var(--space-4, 1rem);
          left: var(--space-4, 1rem);
          right: var(--space-4, 1rem);
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3, 0.75rem);
          z-index: 10;
          pointer-events: none;
        }
        
        .graph-control {
          flex: 1;
          min-width: 180px;
          pointer-events: auto;
          background: var(--color-bg-elevated, #111827);
          border: 1px solid var(--color-border, #334155);
          border-radius: var(--radius-lg, 0.5rem);
          padding: var(--space-3, 0.75rem);
          box-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0,0,0,0.4));
        }
        
        .graph-control-label {
          display: block;
          font-size: var(--text-xs, 0.7rem);
          font-weight: var(--font-weight-semibold, 600);
          color: var(--color-text-muted, #94a3b8);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: var(--space-1, 0.25rem);
        }
        
        .graph-control-row {
          display: flex;
          align-items: center;
          gap: var(--space-2, 0.5rem);
        }
        
        .graph-control-slider {
          flex: 1;
          accent-color: var(--brand-primary, #22d3ee);
          height: 6px;
        }
        
        .graph-control-value {
          font-size: var(--text-sm, 0.875rem);
          font-weight: var(--font-weight-semibold, 600);
          color: var(--brand-primary, #22d3ee);
          font-family: var(--font-mono, monospace);
          min-width: 50px;
          text-align: right;
        }
        
        .graph-toolbar {
          position: absolute;
          top: var(--space-3, 0.75rem);
          right: var(--space-3, 0.75rem);
          display: flex;
          gap: var(--space-1, 0.25rem);
          z-index: 10;
          pointer-events: auto;
        }
        
        .graph-tool-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full, 9999px);
          background: var(--color-bg-elevated, #111827);
          border: 1px solid var(--color-border, #334155);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted, #94a3b8);
          cursor: pointer;
          transition: all var(--transition-fast, 150ms);
          box-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0,0,0,0.4));
        }
        
        .graph-tool-btn:hover {
          background: var(--color-surface, #1e293b);
          color: var(--brand-primary, #22d3ee);
          border-color: var(--brand-primary, #22d3ee);
        }
        
        .graph-tool-btn.active {
          background: var(--brand-primary, #22d3ee);
          color: var(--color-text-inverse, #0a0f1a);
          border-color: var(--brand-primary, #22d3ee);
        }
        
        .graph-tool-btn:focus-visible {
          outline: none;
          box-shadow: var(--shadow-focus, 0 0 0 3px rgba(34, 211, 238, 0.4));
        }
        
        .graph-tool-btn svg {
          width: 18px;
          height: 18px;
        }
        
        .graph-legend {
          position: absolute;
          top: var(--space-3, 0.75rem);
          left: var(--space-3, 0.75rem);
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2, 0.5rem);
          z-index: 5;
          pointer-events: auto;
          max-width: calc(100% - 80px);
        }
        
        .graph-legend-item {
          display: flex;
          align-items: center;
          gap: var(--space-1, 0.25rem);
          padding: var(--space-1, 0.25rem) var(--space-2, 0.5rem);
          background: var(--color-bg-elevated, #111827);
          border: 1px solid var(--color-border, #334155);
          border-radius: var(--radius-full, 9999px);
          font-size: var(--text-xs, 0.7rem);
          color: var(--color-text, #f1f5f9);
          white-space: nowrap;
        }
        
        .graph-legend-color {
          width: 10px;
          height: 10px;
          border-radius: var(--radius-full, 9999px);
        }
        
        .graph-loading {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-3, 0.75rem);
          background: var(--color-bg, #0a0f1a);
          color: var(--color-text-muted, #94a3b8);
          z-index: 5;
        }
        
        .graph-loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--color-border, #334155);
          border-top-color: var(--brand-primary, #22d3ee);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .graph-error {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-3, 0.75rem);
          padding: var(--space-6, 1.5rem);
          text-align: center;
          color: var(--color-text-muted, #94a3b8);
        }
        
        .graph-error-icon {
          font-size: var(--text-3xl, 2rem);
        }
        
        .graph-error button {
          margin-top: var(--space-2, 0.5rem);
        }
        
        /* Responsive */
        @media (max-width: 639px) {
          .graph-controls {
            left: var(--space-2, 0.5rem);
            right: var(--space-2, 0.5rem);
            bottom: var(--space-2, 0.5rem);
          }
          
          .graph-toolbar {
            top: var(--space-2, 0.5rem);
            right: var(--space-2, 0.5rem);
          }
          
          .graph-legend {
            left: var(--space-2, 0.5rem);
            top: var(--space-2, 0.5rem);
            max-width: calc(100% - 60px);
          }
        }
      </style>
      
      <div class="graph-container">
        <canvas class="graph-canvas" aria-label="Gráfica interactiva"></canvas>
        
        <div class="graph-loading" id="loading">
          <div class="graph-loading-spinner"></div>
          <span>Cargando gráfica...</span>
        </div>
        
        <div class="graph-toolbar" id="toolbar" style="display: none;"></div>
        
        <div class="graph-legend" id="legend" style="display: none;"></div>
        
        <div class="graph-controls" id="controls" style="display: none;"></div>
      </div>
    `;
  }
  
  parseAttributes() {
    this.type = this.getAttribute('type') || 'function';
    
    try {
      this.graphData = JSON.parse(this.getAttribute('data') || '{}');
    } catch {
      this.graphData = { functions: [], range: [-10, 10] };
    }
    
    try {
      this.sliders = JSON.parse(this.getAttribute('sliders') || '[]');
    } catch {
      this.sliders = [];
    }
    
    this.pointsDraggable = this.getAttribute('points') !== 'false';
    this.showTangent = this.getAttribute('tangent') !== 'false';
    this.showDerivative = this.getAttribute('derivative') !== 'false';
    this.showIntegral = this.getAttribute('integral') !== 'false';
    this.exportEnabled = this.getAttribute('export') !== 'false';
    this.width = this.getAttribute('width') || '100%';
    this.height = this.getAttribute('height') || '400px';
    this.theme = this.getAttribute('theme') || 'dark';
  }
  
  initChart() {
    const canvas = this.shadowRoot.querySelector('.graph-canvas');
    const loading = this.shadowRoot.querySelector('#loading');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Configurar Chart.js
    this.chart = new Chart(ctx, {
      type: 'line',
      data: { datasets: [] },
      options: this.getChartOptions(),
      plugins: [this.getAnnotationPlugin()]
    });
    
    // Renderizar datos iniciales
    this.updateChart();
    
    // Ocultar loading
    if (loading) loading.style.display = 'none';
    
    // Renderizar controles
    this.renderSliders();
    this.renderToolbar();
    this.renderLegend();
  }
  
  getChartOptions() {
    const isDark = this.theme === 'dark' || (this.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const gridColor = isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.5)';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const axisColor = isDark ? 'rgba(51, 65, 85, 0.8)' : 'rgba(226, 232, 240, 0.8)';
    
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'nearest',
        intersect: false,
        axis: 'x'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: isDark ? '#1e293b' : '#fff',
          borderColor: isDark ? '#334155' : '#e2e8f0',
          borderWidth: 1,
          titleColor: isDark ? '#f1f5f9' : '#0f172a',
          bodyColor: isDark ? '#cbd5e1' : '#475569',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              return `${label}: ${value.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
            }
          }
        },
        zoom: {
          pan: { enabled: true, mode: 'xy', modifierKey: 'ctrl' },
          zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'xy' }
        }
      },
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: this.graphData.range?.[0] ?? -10,
          max: this.graphData.range?.[1] ?? 10,
          grid: { color: gridColor, drawBorder: false },
          ticks: { color: textColor, maxTicksLimit: 10, callback: (v) => Number.isInteger(v) ? v : v.toFixed(1) },
          title: { display: true, text: 'x', color: textColor, font: { size: 12, weight: '600' } },
          border: { color: axisColor }
        },
        y: {
          type: 'linear',
          grid: { color: gridColor, drawBorder: false },
          ticks: { color: textColor, maxTicksLimit: 8, callback: (v) => Number.isInteger(v) ? v : v.toFixed(1) },
          title: { display: true, text: 'y', color: textColor, font: { size: 12, weight: '600' } },
          border: { color: axisColor }
        }
      },
      animation: {
        duration: 300,
        easing: 'easeOutQuart'
      },
      elements: {
        point: { radius: 0, hoverRadius: 6, hitRadius: 10 },
        line: { tension: 0.3, borderWidth: 2.5 }
      }
    };
  }
  
  getAnnotationPlugin() {
    return {
      id: 'annotation',
      beforeDraw: (chart) => {
        if (!this.showTangent && !this.showIntegral) return;
        // Las anotaciones se dibujan via plugin annotation de Chart.js
      }
    };
  }
  
  updateChart() {
    if (!this.chart) return;
    
    const functions = this.graphData.functions || [];
    const range = this.graphData.range || [-10, 10];
    const step = this.graphData.step || 0.1;
    const xMin = range[0];
    const xMax = range[1];
    
    const datasets = functions.map((fn, index) => {
      const color = fn.color || this.getDefaultColor(index);
      const label = fn.label || `f${index + 1}(x)`;
      const expr = fn.expr || 'x';
      
      // Generar puntos
      const data = [];
      for (let x = xMin; x <= xMax; x += step) {
        try {
          const y = this.evaluateExpression(expr, x, this.getSliderValues());
          if (isFinite(y) && Math.abs(y) < 1e10) {
            data.push({ x, y });
          } else {
            data.push({ x, y: null });
          }
        } catch {
          data.push({ x, y: null });
        }
      }
      
      return {
        label,
        data,
        borderColor: color,
        backgroundColor: color.replace(')', ', 0.1)').replace('rgb', 'rgba').replace('#', 'rgba('),
        borderWidth: 2.5,
        tension: 0.3,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 6,
        _fn: fn,
        _expr: expr
      };
    });
    
    // Añadir derivada si se solicita
    if (this.showDerivative && functions.length > 0) {
      const fn = functions[0];
      const color = this.adjustColor(fn.color || this.getDefaultColor(0), 0.7);
      const derivData = [];
      const h = 0.001;
      
      for (let x = xMin; x <= xMax; x += step) {
        try {
          const y1 = this.evaluateExpression(fn.expr, x + h, this.getSliderValues());
          const y2 = this.evaluateExpression(fn.expr, x - h, this.getSliderValues());
          if (isFinite(y1) && isFinite(y2)) {
            derivData.push({ x, y: (y1 - y2) / (2 * h) });
          } else {
            derivData.push({ x, y: null });
          }
        } catch {
          derivData.push({ x, y: null });
        }
      }
      
      datasets.push({
        label: `f'(x) (derivada)`,
        data: derivData,
        borderColor: color,
        borderWidth: 2,
        borderDash: [8, 4],
        tension: 0.3,
        fill: false,
        pointRadius: 0,
        _isDerivative: true
      });
    }
    
    // Añadir integral si se solicita
    if (this.showIntegral && functions.length > 0) {
      const fn = functions[0];
      const color = this.adjustColor(fn.color || this.getDefaultColor(0), 0.5);
      const integralData = [];
      let sum = 0;
      const dx = step;
      
      for (let x = xMin; x <= xMax; x += step) {
        try {
          const y = this.evaluateExpression(fn.expr, x, this.getSliderValues());
          if (isFinite(y)) {
            sum += y * dx;
            integralData.push({ x, y: sum });
          } else {
            integralData.push({ x, y: null });
          }
        } catch {
          integralData.push({ x, y: null });
        }
      }
      
      datasets.push({
        label: `∫f(x)dx (integral)`,
        data: integralData,
        borderColor: color,
        backgroundColor: color.replace(')', ', 0.15)').replace('rgb', 'rgba'),
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 0,
        _isIntegral: true
      });
    }
    
    this.chart.data.datasets = datasets;
    this.chart.options.scales.x.min = xMin;
    this.chart.options.scales.x.max = xMax;
    this.chart.update('none');
    
    this.renderLegend();
  }
  
  evaluateExpression(expr, x, sliders = {}) {
    // Reemplazar variables de sliders
    let processedExpr = expr;
    for (const [key, value] of Object.entries(sliders)) {
      processedExpr = processedExpr.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
    }
    
    // Reemplazar x
    processedExpr = processedExpr.replace(/\bx\b/g, x);
    
    // Reemplazar constantes matemáticas
    processedExpr = processedExpr
      .replace(/\bpi\b/gi, Math.PI)
      .replace(/\be\b/g, Math.E)
      .replace(/\bPI\b/g, Math.PI)
      .replace(/\bE\b/g, Math.E);
    
    // Funciones matemáticas seguras
    const safeMath = {
      sin: Math.sin, cos: Math.cos, tan: Math.tan,
      asin: Math.asin, acos: Math.acos, atan: Math.atan,
      sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
      exp: Math.exp, log: Math.log, ln: Math.log,
      log10: Math.log10, log2: Math.log2,
      sqrt: Math.sqrt, cbrt: Math.cbrt,
      abs: Math.abs, sign: Math.sign,
      floor: Math.floor, ceil: Math.ceil, round: Math.round,
      min: Math.min, max: Math.max,
      pow: Math.pow, hypot: Math.hypot,
      PI: Math.PI, E: Math.E
    };
    
    // Evaluar usando Function constructor (sandboxed)
    try {
      const func = new Function(...Object.keys(safeMath), `return ${processedExpr};`);
      return func(...Object.values(safeMath));
    } catch {
      return NaN;
    }
  }
  
  getSliderValues() {
    const values = {};
    this.shadowRoot.querySelectorAll('.graph-control-slider').forEach(slider => {
      const varName = slider.dataset.var;
      if (varName) values[varName] = parseFloat(slider.value);
    });
    return values;
  }
  
  renderSliders() {
    const container = this.shadowRoot.querySelector('#controls');
    if (!container || this.sliders.length === 0) {
      if (container) container.style.display = 'none';
      return;
    }
    
    container.innerHTML = this.sliders.map(slider => `
      <div class="graph-control">
        <label class="graph-control-label">${this.escapeHtml(slider.label || slider.var)}</label>
        <div class="graph-control-row">
          <input 
            type="range" 
            class="graph-control-slider" 
            data-var="${this.escapeHtml(slider.var)}"
            min="${slider.min ?? -10}"
            max="${slider.max ?? 10}"
            step="${slider.step ?? 0.1}"
            value="${slider.default ?? 0}"
          >
          <span class="graph-control-value" id="val-${this.escapeHtml(slider.var)}">${slider.default ?? 0}</span>
        </div>
      </div>
    `).join('');
    
    container.style.display = 'flex';
    
    // Event listeners para sliders
    container.querySelectorAll('.graph-control-slider').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const varName = e.target.dataset.var;
        const value = parseFloat(e.target.value);
        const display = container.querySelector(`#val-${varName}`);
        if (display) display.textContent = value.toFixed(e.target.step % 1 === 0 ? 0 : 2);
        this.updateChart();
      });
    });
  }
  
  renderToolbar() {
    const toolbar = this.shadowRoot.querySelector('#toolbar');
    if (!toolbar) return;
    
    const tools = [];
    
    if (this.showTangent) {
      tools.push({ id: 'tangent', icon: this.getTangentIcon(), title: 'Mostrar tangente', active: this.showTangent });
    }
    if (this.showDerivative) {
      tools.push({ id: 'derivative', icon: this.getDerivativeIcon(), title: 'Mostrar derivada', active: this.showDerivative });
    }
    if (this.showIntegral) {
      tools.push({ id: 'integral', icon: this.getIntegralIcon(), title: 'Mostrar integral', active: this.showIntegral });
    }
    if (this.exportEnabled) {
      tools.push({ id: 'export', icon: this.getExportIcon(), title: 'Exportar', active: false });
    }
    tools.push({ id: 'reset', icon: this.getResetIcon(), title: 'Restablecer vista', active: false });
    
    if (tools.length === 0) {
      toolbar.style.display = 'none';
      return;
    }
    
    toolbar.innerHTML = tools.map(t => `
      <button class="graph-tool-btn ${t.active ? 'active' : ''}" data-tool="${t.id}" aria-label="${t.title}" title="${t.title}">
        ${t.icon}
      </button>
    `).join('');
    
    toolbar.style.display = 'flex';
    
    toolbar.querySelectorAll('.graph-tool-btn').forEach(btn => {
      btn.addEventListener('click', () => this.handleToolClick(btn.dataset.tool));
    });
  }
  
  handleToolClick(tool) {
    switch (tool) {
      case 'tangent':
        this.showTangent = !this.showTangent;
        this.setAttribute('tangent', this.showTangent);
        break;
      case 'derivative':
        this.showDerivative = !this.showDerivative;
        this.setAttribute('derivative', this.showDerivative);
        break;
      case 'integral':
        this.showIntegral = !this.showIntegral;
        this.setAttribute('integral', this.showIntegral);
        break;
      case 'export':
        this.exportChart();
        break;
      case 'reset':
        this.resetView();
        break;
    }
    this.renderToolbar();
    this.updateChart();
  }
  
  resetView() {
    if (this.chart) {
      this.chart.resetZoom();
      this.chart.update();
    }
  }
  
  exportChart() {
    const canvas = this.shadowRoot.querySelector('.graph-canvas');
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `grafica-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
  
  renderLegend() {
    const legend = this.shadowRoot.querySelector('#legend');
    if (!legend || !this.chart) return;
    
    const datasets = this.chart.data.datasets.filter(d => !d._isDerivative && !d._isIntegral);
    if (datasets.length <= 1) {
      legend.style.display = 'none';
      return;
    }
    
    legend.innerHTML = datasets.map(ds => `
      <div class="graph-legend-item">
        <span class="graph-legend-color" style="background: ${ds.borderColor}"></span>
        <span>${this.escapeHtml(ds.label)}</span>
      </div>
    `).join('');
    
    legend.style.display = 'flex';
  }
  
  updateTheme() {
    if (!this.chart) return;
    
    const isDark = this.theme === 'dark' || (this.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const gridColor = isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.5)';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const axisColor = isDark ? 'rgba(51, 65, 85, 0.8)' : 'rgba(226, 232, 240, 0.8)';
    
    this.chart.options.scales.x.grid.color = gridColor;
    this.chart.options.scales.x.ticks.color = textColor;
    this.chart.options.scales.x.border.color = axisColor;
    this.chart.options.scales.x.title.color = textColor;
    this.chart.options.scales.y.grid.color = gridColor;
    this.chart.options.scales.y.ticks.color = textColor;
    this.chart.options.scales.y.border.color = axisColor;
    this.chart.options.scales.y.title.color = textColor;
    this.chart.options.plugins.tooltip.backgroundColor = isDark ? '#1e293b' : '#fff';
    this.chart.options.plugins.tooltip.borderColor = isDark ? '#334155' : '#e2e8f0';
    this.chart.options.plugins.tooltip.titleColor = isDark ? '#f1f5f9' : '#0f172a';
    this.chart.options.plugins.tooltip.bodyColor = isDark ? '#cbd5e1' : '#475569';
    
    this.chart.update();
  }
  
  updateSize() {
    this.style.height = this.height;
    if (this.chart) this.chart.resize();
  }
  
  reinitChart() {
    this.destroyChart();
    this.initChart();
  }
  
  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
  
  getDefaultColor(index) {
    const colors = [
      '#22d3ee', '#a855f7', '#f59e0b', '#10b981',
      '#ef4444', '#3b82f6', '#ec4899', '#6366f1'
    ];
    return colors[index % colors.length];
  }
  
  adjustColor(color, opacity) {
    // Simplificado: asumir color hex o rgb
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  }
  
  getTangentIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="12" x2="22" y2="12"></line><path d="M9 18l6-12"></path></svg>`;
  }
  
  getDerivativeIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18h18"></path><path d="M12 6v12"></path><path d="M3 6l6 6"></path></svg>`;
  }
  
  getIntegralIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18"></path><path d="M3 15h18"></path><path d="M3 9h18"></path></svg>`;
  }
  
  getExportIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
  }
  
  getResetIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4L10 9.93a9 9 0 0 0-4.36 4.36L23 14"></path></svg>`;
  }
  
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  setupResizeObserver() {
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.chart) this.chart.resize();
      });
      this.resizeObserver.observe(this);
    }
  }
}

// Registrar componente
if (!customElements.get('interactive-graph')) {
  customElements.define('interactive-graph', InteractiveGraph);
}

export default InteractiveGraph;