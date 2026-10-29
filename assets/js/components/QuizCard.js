/* ==========================================================================
   QUIZ CARD WEB COMPONENT - Matemáticas Avanzadas
   Motor de preguntas adaptativo con 7 tipos, hints progresivos, SM-2, XP
   ========================================================================== */

import { eventBus, EventTypes } from '../core/events.js';
import { store } from '../core/store.js';

/* ==========================================================================
   QUIZ-CARD WEB COMPONENT
   ========================================================================== */
export class QuizCard extends HTMLElement {
  static get observedAttributes() {
    return ['mode', 'question-id', 'difficulty', 'hints', 'explanation', 'xp', 'data'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.mode = 'learning';
    this.questionId = '';
    this.difficulty = 'adaptive';
    this.hintsEnabled = true;
    this.explanationRequired = true;
    this.xpReward = 10;
    this.questionData = null;
    this.currentState = 'question'; // question, answer, explanation, complete
    this.selectedAnswer = null;
    this.hintsUsed = 0;
    this.hintLevels = [];
    this.startTime = Date.now();
    this.answerTime = null;
  }
  
  connectedCallback() {
    this.render();
    this.parseAttributes();
    this.loadQuestion();
  }
  
  disconnectedCallback() {
    // Cleanup
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'mode':
        this.mode = newValue || 'learning';
        break;
      case 'question-id':
        this.questionId = newValue || '';
        this.loadQuestion();
        break;
      case 'difficulty':
        this.difficulty = newValue || 'adaptive';
        break;
      case 'hints':
        this.hintsEnabled = newValue !== 'false';
        break;
      case 'explanation':
        this.explanationRequired = newValue !== 'false';
        break;
      case 'xp':
        this.xpReward = parseInt(newValue) || 10;
        break;
      case 'data':
        try { this.questionData = JSON.parse(newValue); } catch {}
        this.renderQuestion();
        break;
    }
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 48rem;
          margin: 0 auto;
          background: var(--color-surface, #1e293b);
          border: 1px solid var(--color-border, #334155);
          border-radius: var(--radius-xl, 0.75rem);
          overflow: hidden;
          font-family: var(--font-sans, system-ui);
        }
        
        .quiz-card {
          padding: var(--space-6, 1.5rem);
        }
        
        .quiz-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-6, 1.5rem);
          padding-bottom: var(--space-4, 1rem);
          border-bottom: 1px solid var(--color-border, #334155);
          flex-wrap: wrap;
          gap: var(--space-3, 0.75rem);
        }
        
        .quiz-progress {
          display: flex;
          align-items: center;
          gap: var(--space-3, 0.75rem);
        }
        
        .quiz-progress-ring {
          width: 48px;
          height: 48px;
        }
        
        .quiz-progress-text {
          font-size: var(--text-sm, 0.875rem);
          color: var(--color-text-muted, #94a3b8);
        }
        
        .quiz-progress-text strong {
          color: var(--color-text, #f1f5f9);
        }
        
        .quiz-xp {
          display: flex;
          align-items: center;
          gap: var(--space-1, 0.25rem);
          font-size: var(--text-sm, 0.875rem);
          font-weight: var(--font-weight-bold, 700);
          color: var(--brand-accent, #f59e0b);
        }
        
        .quiz-question {
          margin-bottom: var(--space-8, 2rem);
        }
        
        .quiz-question-text {
          font-size: var(--text-lg, 1.1rem);
          line-height: var(--leading-relaxed, 1.625);
          color: var(--color-text, #f1f5f9);
          margin-bottom: var(--space-6, 1.5rem);
        }
        
        .quiz-question-text math-formula {
          font-size: inherit;
        }
        
        /* Options */
        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: var(--space-3, 0.75rem);
        }
        
        .quiz-option {
          position: relative;
        }
        
        .quiz-option-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }
        
        .quiz-option-label {
          display: flex;
          align-items: center;
          gap: var(--space-4, 1rem);
          padding: var(--space-4, 1rem) var(--space-5, 1.25rem);
          background: var(--color-bg, #0a0f1a);
          border: 2px solid var(--color-border, #334155);
          border-radius: var(--radius-xl, 0.75rem);
          cursor: pointer;
          transition: all var(--transition-fast, 150ms);
          font-size: var(--text-base, 1rem);
          line-height: var(--leading-relaxed, 1.625);
          color: var(--color-text, #f1f5f9);
        }
        
        .quiz-option-label:hover {
          border-color: var(--brand-primary, #22d3ee);
          background: var(--color-hover, rgba(34, 211, 238, 0.1));
        }
        
        .quiz-option-input:checked + .quiz-option-label {
          border-color: var(--brand-primary, #22d3ee);
          background: rgba(34, 211, 238, 0.1);
          box-shadow: var(--shadow-glow, 0 0 20px rgba(34, 211, 238, 0.3));
        }
        
        .quiz-option-input:focus-visible + .quiz-option-label {
          outline: none;
          box-shadow: var(--shadow-focus, 0 0 0 3px rgba(34, 211, 238, 0.4));
        }
        
        .quiz-option-marker {
          width: 24px;
          height: 24px;
          border: 2px solid var(--color-border, #334155);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all var(--transition-fast, 150ms);
        }
        
        .quiz-option-input:checked + .quiz-option-label .quiz-option-marker {
          border-color: var(--brand-primary, #22d3ee);
          background: var(--brand-primary, #22d3ee);
        }
        
        .quiz-option-input:checked + .quiz-option-label .quiz-option-marker::after {
          content: '';
          width: 8px;
          height: 8px;
          background: var(--color-text-inverse, #0a0f1a);
          border-radius: 50%;
        }
        
        .quiz-option-text {
          flex: 1;
        }
        
        /* Input type questions */
        .quiz-input-container {
          margin-top: var(--space-4, 1rem);
        }
        
        .quiz-input {
          width: 100%;
          padding: var(--space-4, 1rem);
          font-size: var(--text-xl, 1.25rem);
          font-family: var(--font-mono, monospace);
          text-align: center;
          background: var(--color-bg, #0a0f1a);
          border: 2px solid var(--color-border, #334155);
          border-radius: var(--radius-lg, 0.5rem);
          color: var(--color-text, #f1f5f9);
          transition: all var(--transition-fast, 150ms);
        }
        
        .quiz-input:focus {
          outline: none;
          border-color: var(--brand-primary, #22d3ee);
          box-shadow: var(--shadow-focus, 0 0 0 3px rgba(34, 211, 238, 0.4));
        }
        
        .quiz-input.correct {
          border-color: var(--brand-success, #10b981);
          background: rgba(16, 185, 129, 0.1);
        }
        
        .quiz-input.incorrect {
          border-color: var(--brand-error, #ef4444);
          background: rgba(239, 68, 68, 0.1);
        }
        
        /* Hints */
        .quiz-hints {
          display: flex;
          flex-direction: column;
          gap: var(--space-2, 0.5rem);
          margin-top: var(--space-4, 1rem);
        }
        
        .quiz-hint-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2, 0.5rem);
          padding: var(--space-2, 0.5rem) var(--space-4, 1rem);
          background: var(--color-surface, #1e293b);
          border: 1px solid var(--color-border, #334155);
          border-radius: var(--radius-lg, 0.5rem);
          font-size: var(--text-sm, 0.875rem);
          color: var(--color-text-muted, #94a3b8);
          cursor: pointer;
          transition: all var(--transition-fast, 150ms);
          align-self: flex-start;
        }
        
        .quiz-hint-btn:hover {
          border-color: var(--brand-primary, #22d3ee);
          color: var(--brand-primary, #22d3ee);
          background: var(--color-hover, rgba(34, 211, 238, 0.1));
        }
        
        .quiz-hint-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .quiz-hint-content {
          display: none;
          padding: var(--space-3, 0.75rem) var(--space-4, 1rem);
          background: rgba(34, 211, 238, 0.05);
          border: 1px solid rgba(34, 211, 238, 0.2);
          border-radius: var(--radius-lg, 0.5rem);
          font-size: var(--text-sm, 0.875rem);
          color: var(--color-text-muted, #94a3b8);
          line-height: var(--leading-relaxed, 1.625);
          animation: fadeIn var(--transition-fast, 150ms);
        }
        
        .quiz-hint-content.visible {
          display: block;
        }
        
        /* Feedback */
        .quiz-option-feedback {
          display: none;
          padding: var(--space-3, 0.75rem) var(--space-4, 1rem);
          margin-top: var(--space-2, 0.5rem);
          border-radius: var(--radius-lg, 0.5rem);
          font-size: var(--text-sm, 0.875rem);
          line-height: var(--leading-relaxed, 1.625);
          animation: slideDown var(--transition-fast, 150ms);
        }
        
        .quiz-option-feedback.correct {
          display: block;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--brand-success, #10b981);
        }
        
        .quiz-option-feedback.incorrect {
          display: block;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: var(--brand-error, #ef4444);
        }
        
        .quiz-option-explanation {
          margin-top: var(--space-3, 0.75rem);
          padding-top: var(--space-3, 0.75rem);
          border-top: 1px solid currentColor;
          opacity: 0.9;
        }
        
        /* Explanation Panel */
        .quiz-explanation {
          margin-top: var(--space-6, 1.5rem);
          padding: var(--space-5, 1.25rem);
          background: var(--color-bg, #0a0f1a);
          border: 1px solid var(--color-border, #334155);
          border-radius: var(--radius-xl, 0.75rem);
          animation: fadeIn var(--transition-base, 250ms);
        }
        
        .quiz-explanation-header {
          display: flex;
          align-items: center;
          gap: var(--space-2, 0.5rem);
          font-weight: var(--font-weight-semibold, 600);
          color: var(--brand-primary, #22d3ee);
          margin-bottom: var(--space-3, 0.75rem);
        }
        
        .quiz-explanation-content {
          line-height: var(--leading-relaxed, 1.625);
          color: var(--color-text, #f1f5f9);
        }
        
        .quiz-explanation-step {
          margin-bottom: var(--space-2, 0.5rem);
          padding-left: var(--space-3, 0.75rem);
          border-left: 2px solid var(--brand-primary, #22d3ee);
        }
        
        .quiz-explanation-step:last-child {
          margin-bottom: 0;
        }
        
        /* Result */
        .quiz-result {
          text-align: center;
          padding: var(--space-10, 2.5rem) var(--space-6, 1.5rem);
        }
        
        .quiz-result-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--space-6, 1.5rem);
          font-size: var(--text-3xl, 2rem);
          animation: scaleIn var(--transition-spring, 400ms);
        }
        
        .quiz-result-icon.passed {
          background: rgba(16, 185, 129, 0.15);
          color: var(--brand-success, #10b981);
        }
        
        .quiz-result-icon.failed {
          background: rgba(239, 68, 68, 0.15);
          color: var(--brand-error, #ef4444);
        }
        
        .quiz-result-title {
          font-size: var(--text-2xl, 1.6rem);
          margin-bottom: var(--space-2, 0.5rem);
        }
        
        .quiz-result-score {
          font-size: var(--text-4xl, 2.5rem);
          font-weight: var(--font-weight-extrabold, 800);
          background: var(--gradient-primary, linear-gradient(135deg, #22d3ee 0%, #a855f7 100%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: var(--space-2, 0.5rem);
        }
        
        .quiz-result-message {
          color: var(--color-text-muted, #94a3b8);
          margin-bottom: var(--space-8, 2rem);
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .quiz-result-breakdown {
          display: flex;
          justify-content: center;
          gap: var(--space-6, 1.5rem);
          margin-bottom: var(--space-8, 2rem);
          flex-wrap: wrap;
        }
        
        .quiz-result-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-1, 0.25rem);
        }
        
        .quiz-result-stat-value {
          font-size: var(--text-2xl, 1.6rem);
          font-weight: var(--font-weight-bold, 700);
        }
        
        .quiz-result-stat-label {
          font-size: var(--text-xs, 0.7rem);
          color: var(--color-text-subtle, #64748b);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        /* Actions */
        .quiz-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--space-3, 0.75rem);
          margin-top: var(--space-6, 1.5rem);
          padding-top: var(--space-4, 1rem);
          border-top: 1px solid var(--color-border, #334155);
        }
        
        .quiz-actions.center {
          justify-content: center;
        }
        
        /* Loading */
        .quiz-loading {
          text-align: center;
          padding: var(--space-10, 2.5rem);
          color: var(--color-text-muted, #94a3b8);
        }
        
        .quiz-loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--color-border, #334155);
          border-top-color: var(--brand-primary, #22d3ee);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto var(--space-4, 1rem);
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        /* Responsive */
        @media (max-width: 639px) {
          :host { max-width: 100%; }
          .quiz-card { padding: var(--space-4, 1rem); }
          .quiz-option-label { padding: var(--space-3, 0.75rem) var(--space-4, 1rem); font-size: var(--text-sm, 0.875rem); }
          .quiz-result-score { font-size: var(--text-3xl, 2rem); }
        }
      </style>
      
      <div class="quiz-card">
        <div id="quiz-content">
          <!-- Contenido dinámico -->
        </div>
      </div>
    `;
  }
  
  parseAttributes() {
    this.mode = this.getAttribute('mode') || 'learning';
    this.questionId = this.getAttribute('question-id') || '';
    this.difficulty = this.getAttribute('difficulty') || 'adaptive';
    this.hintsEnabled = this.getAttribute('hints') !== 'false';
    this.explanationRequired = this.getAttribute('explanation') !== 'false';
    this.xpReward = parseInt(this.getAttribute('xp')) || 10;
  }
  
  async loadQuestion() {
    if (this.questionData) {
      this.renderQuestion();
      return;
    }
    
    // Cargar desde banco de preguntas (simulado)
    this.showLoading();
    
    // Simular carga asíncrona
    setTimeout(() => {
      this.questionData = this.generateMockQuestion();
      this.renderQuestion();
    }, 300);
  }
  
  generateMockQuestion() {
    // Generar pregunta mock basada en questionId
    const types = ['multiple-choice', 'multi-select', 'numeric-input', 'latex-input', 'ordering', 'matching'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const questions = {
      'multiple-choice': {
        type: 'multiple-choice',
        question: 'Si $f(x) = 2x^2 - 3x + 1$, ¿cuál es $f\\\'(2)$?',
        options: [
          { id: 'a', text: '5', correct: true },
          { id: 'b', text: '1', correct: false },
          { id: 'c', text: '7', correct: false },
          { id: 'd', text: '9', correct: false }
        ],
        hints: [
          "Recuerda la regla de la potencia: $(x^n)' = n x^{n-1}$",
          "Deriva término a término: $(2x^2)' - (3x)' + (1)'$",
          "La derivada es $f'(x) = 4x - 3$. Evaluando en x=2: $4(2) - 3 = 5$"
        ],
        explanation: "Aplicamos la regla de la potencia a cada término:\\n$f'(x) = 2\\cdot2x^{2-1} - 3\\cdot1x^{1-1} + 0 = 4x - 3$\\nEvaluando en $x=2$: $f'(2) = 4(2) - 3 = 8 - 3 = 5$"
      },
      'numeric-input': {
        type: 'numeric-input',
        question: 'Calcula $\\\\int_0^1 x^2 \\\\, dx$',
        answer: 1/3,
        tolerance: 0.001,
        hints: [
          'La integral de $x^n$ es $\\\\frac{x^{n+1}}{n+1}$',
          'Aplica Barrow: $\\\\left[\\\\frac{x^3}{3}\\\\right]_0^1$'
        ],
        explanation: '$\\\\int_0^1 x^2 \\\\, dx = \\\\left[\\\\frac{x^3}{3}\\\\right]_0^1 = \\\\frac{1}{3} - 0 = \\\\frac{1}{3} \\\\approx 0.333$'
      }
    };
    
    return questions[type] || questions['multiple-choice'];
  }
  
  renderQuestion() {
    const container = this.shadowRoot.querySelector('#quiz-content');
    if (!container || !this.questionData) return;
    
    const q = this.questionData;
    this.startTime = Date.now();
    this.currentState = 'question';
    this.selectedAnswer = null;
    this.hintsUsed = 0;
    this.hintLevels = q.hints || [];
    
    let html = `
      <div class="quiz-header">
        <div class="quiz-progress">
          <progress-ring class="quiz-progress-ring" value="0" max="1" stroke-width="4" show-percentage></progress-ring>
          <span class="quiz-progress-text"><strong>${this.questionId}</strong></span>
        </div>
        <span class="quiz-xp">+${this.xpReward} XP</span>
      </div>
      
      <div class="quiz-question">
        <div class="quiz-question-text">${this.formatMath(q.question)}</div>
    `;
    
    // Render según tipo
    switch (q.type) {
      case 'multiple-choice':
      case 'multi-select':
        html += this.renderMultipleChoice(q);
        break;
      case 'numeric-input':
        html += this.renderNumericInput(q);
        break;
      case 'latex-input':
        html += this.renderLatexInput(q);
        break;
      case 'ordering':
        html += this.renderOrdering(q);
        break;
      case 'matching':
        html += this.renderMatching(q);
        break;
    }
    
    // Hints
    if (this.hintsEnabled && this.hintLevels.length > 0) {
      html += this.renderHints();
    }
    
    html += '</div>';
    
    // Actions
    html += this.renderActions(q.type);
    
    container.innerHTML = html;
    
    // Inicializar progress-ring
    const progressRing = container.querySelector('progress-ring');
    if (progressRing) {
      progressRing.setAttribute('value', '0');
      progressRing.setAttribute('max', '1');
    }
    
    // Event listeners
    this.bindEvents(container);
  }
  
  renderMultipleChoice(q) {
    const isMulti = q.type === 'multi-select';
    return `
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <div class="quiz-option">
            <input 
              type="${isMulti ? 'checkbox' : 'radio'}" 
              class="quiz-option-input" 
              id="opt-${opt.id}" 
              name="quiz-answer" 
              value="${opt.id}"
              data-index="${i}"
              ${opt.correct ? 'data-correct="true"' : ''}
            >
            <label class="quiz-option-label" for="opt-${opt.id}">
              <span class="quiz-option-marker"></span>
              <span class="quiz-option-text">${this.formatMath(opt.text)}</span>
            </label>
            <div class="quiz-option-feedback" id="feedback-${opt.id}"></div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  renderNumericInput(q) {
    return `
      <div class="quiz-input-container">
        <input 
          type="number" 
          class="quiz-input" 
          id="numeric-answer"
          placeholder="Escribe tu respuesta numérica..."
          step="any"
          autocomplete="off"
          aria-label="Respuesta numérica"
        >
        <div class="quiz-option-feedback" id="feedback-numeric"></div>
      </div>
    `;
  }
  
  renderLatexInput(q) {
    return `
      <div class="quiz-input-container">
        <math-formula latex="${this.escapeHtml(q.expectedLatex || '')}" display class="quiz-expected-preview" style="margin-bottom: var(--space-4); opacity: 0.5;"></math-formula>
        <input 
          type="text" 
          class="quiz-input" 
          id="latex-answer"
          placeholder="Escribe tu respuesta en LaTeX..."
          autocomplete="off"
          aria-label="Respuesta en LaTeX"
        >
        <div class="quiz-option-feedback" id="feedback-latex"></div>
      </div>
    `;
  }
  
  renderOrdering(q) {
    return `
      <div class="quiz-options">
        ${q.items.map((item, i) => `
          <div class="quiz-option" draggable="true" data-order-index="${i}">
            <input type="hidden" class="quiz-option-input" name="quiz-order" value="${item.id}">
            <label class="quiz-option-label" style="cursor: grab;">
              <span class="quiz-option-marker" style="border-radius: var(--radius-md); background: var(--color-border);">${i + 1}</span>
              <span class="quiz-option-text">${this.formatMath(item.text)}</span>
            </label>
          </div>
        `).join('')}
      </div>
      <div class="quiz-option-feedback" id="feedback-ordering"></div>
    `;
  }
  
  renderMatching(q) {
    return `
      <div class="quiz-options">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
          <div>
            <h4 style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-3);">Columna A</h4>
            <div style="display: flex; flex-direction: column; gap: var(--space-2);">
              ${q.left.map((item, i) => `
                <div class="quiz-option" draggable="true" data-match-left="${i}">
                  <label class="quiz-option-label" style="cursor: grab; justify-content: space-between;">
                    <span>${this.formatMath(item.text)}</span>
                    <span class="quiz-option-marker" id="match-left-${i}" style="background: var(--color-border);"></span>
                  </label>
                </div>
              `).join('')}
            </div>
          </div>
          <div>
            <h4 style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-3);">Columna B</h4>
            <div style="display: flex; flex-direction: column; gap: var(--space-2);">
              ${q.right.map((item, i) => `
                <div class="quiz-option" draggable="true" data-match-right="${i}">
                  <label class="quiz-option-label" style="cursor: grab; justify-content: space-between;">
                    <span class="quiz-option-marker" id="match-right-${i}" style="background: var(--color-border);"></span>
                    <span>${this.formatMath(item.text)}</span>
                  </label>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
      <div class="quiz-option-feedback" id="feedback-matching"></div>
    `;
  }
  
  renderHints() {
    return `
      <div class="quiz-hints">
        ${this.hintLevels.map((hint, i) => `
          <div>
            <button class="quiz-hint-btn" data-hint="${i}" ${i > this.hintsUsed ? 'disabled' : ''}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              Pista ${i + 1}
            </button>
            <div class="quiz-hint-content" id="hint-content-${i}">${this.formatMath(hint)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  renderActions(type) {
    const isInputType = ['numeric-input', 'latex-input'].includes(type);
    
    return `
      <div class="quiz-actions ${isInputType ? 'center' : ''}">
        ${this.mode === 'learning' ? `
          <button class="btn btn-secondary" id="btn-skip" type="button">Saltar</button>
          <button class="btn btn-primary" id="btn-check" type="button" ${isInputType ? '' : 'disabled'}>Comprobar</button>
        ` : `
          <button class="btn btn-primary" id="btn-next" type="button">Siguiente</button>
        `}
      </div>
    `;
  }
  
  bindEvents(container) {
    // Radio/Checkbox options
    container.querySelectorAll('.quiz-option-input[type="radio"]').forEach(input => {
      input.addEventListener('change', (e) => this.handleOptionSelect(e));
    });
    
    container.querySelectorAll('.quiz-option-input[type="checkbox"]').forEach(input => {
      input.addEventListener('change', (e) => this.handleMultiSelect(e));
    });
    
    // Numeric input
    const numericInput = container.querySelector('#numeric-answer');
    if (numericInput) {
      numericInput.addEventListener('input', () => {
        container.querySelector('#btn-check')?.removeAttribute('disabled');
      });
      numericInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.checkAnswer();
      });
    }
    
    // Latex input
    const latexInput = container.querySelector('#latex-answer');
    if (latexInput) {
      latexInput.addEventListener('input', () => {
        container.querySelector('#btn-check')?.removeAttribute('disabled');
      });
      latexInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.checkAnswer();
      });
    }
    
    // Hints
    container.querySelectorAll('.quiz-hint-btn').forEach(btn => {
      btn.addEventListener('click', () => this.showHint(parseInt(btn.dataset.hint)));
    });
    
    // Actions
    container.querySelector('#btn-check')?.addEventListener('click', () => this.checkAnswer());
    container.querySelector('#btn-skip')?.addEventListener('click', () => this.skipQuestion());
    container.querySelector('#btn-next')?.addEventListener('click', () => this.nextQuestion());
    
    // Ordering drag-drop
    this.bindDragDrop(container);
  }
  
  bindDragDrop(container) {
    const draggables = container.querySelectorAll('[draggable="true"]');
    draggables.forEach(el => {
      el.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      el.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
      });
    });
    
    const dropZones = container.querySelectorAll('[draggable="true"]');
    dropZones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const dragging = container.querySelector('.dragging');
        if (dragging && dragging !== zone) {
          // Swap
          const parent = dragging.parentNode;
          const draggingIndex = Array.from(parent.children).indexOf(dragging);
          const zoneIndex = Array.from(parent.children).indexOf(zone);
          if (draggingIndex < zoneIndex) {
            parent.insertBefore(dragging, zone.nextSibling);
          } else {
            parent.insertBefore(dragging, zone);
          }
          this.updateOrderNumbers(parent);
        }
      });
    });
  }
  
  updateOrderNumbers(container) {
    container.querySelectorAll('[data-order-index]').forEach((el, i) => {
      el.dataset.orderIndex = i;
      const marker = el.querySelector('.quiz-option-marker');
      if (marker) marker.textContent = i + 1;
    });
  }
  
  handleOptionSelect(e) {
    this.selectedAnswer = e.target.value;
    const container = this.shadowRoot.querySelector('#quiz-content');
    container.querySelector('#btn-check')?.removeAttribute('disabled');
  }
  
  handleMultiSelect(e) {
    const checkboxes = container.querySelectorAll('.quiz-option-input[type="checkbox"]:checked');
    this.selectedAnswer = Array.from(checkboxes).map(cb => cb.value);
    container.querySelector('#btn-check')?.removeAttribute('disabled');
  }
  
  showHint(index) {
    if (index > this.hintsUsed) return;
    
    const content = this.shadowRoot.querySelector(`#hint-content-${index}`);
    const btn = this.shadowRoot.querySelector(`[data-hint="${index}"]`);
    
    if (content) {
      content.classList.add('visible');
    }
    
    if (btn) btn.disabled = true;
    
    // Desbloquear siguiente pista
    if (index + 1 < this.hintLevels.length) {
      const nextBtn = this.shadowRoot.querySelector(`[data-hint="${index + 1}"]`);
      if (nextBtn) nextBtn.disabled = false;
    }
    
    this.hintsUsed = Math.max(this.hintsUsed, index + 1);
    
    // Track hint usage
    eventBus.emit(EventTypes.QUIZ_HINT_USED, { questionId: this.questionId, hintIndex: index });
  }
  
  checkAnswer() {
    if (!this.questionData) return;
    
    this.answerTime = Date.now();
    const timeSpent = this.answerTime - this.startTime;
    const q = this.questionData;
    let isCorrect = false;
    let userAnswer = null;
    
    const container = this.shadowRoot.querySelector('#quiz-content');
    
    switch (q.type) {
      case 'multiple-choice':
        const selected = container.querySelector('.quiz-option-input[type="radio"]:checked');
        if (selected) {
          userAnswer = selected.value;
          isCorrect = selected.dataset.correct === 'true';
          this.showOptionFeedback(container, selected, isCorrect, q);
        }
        break;
        
      case 'multi-select':
        const checked = container.querySelectorAll('.quiz-option-input[type="checkbox"]:checked');
        const selectedValues = Array.from(checked).map(cb => cb.value);
        const correctValues = q.options.filter(o => o.correct).map(o => o.id);
        isCorrect = selectedValues.length === correctValues.length && 
                    selectedValues.every(v => correctValues.includes(v));
        userAnswer = selectedValues;
        checked.forEach(cb => this.showOptionFeedback(container, cb, cb.dataset.correct === 'true', q));
        // Marcar las no seleccionadas que eran correctas
        container.querySelectorAll('.quiz-option-input[type="checkbox"]:not(:checked)').forEach(cb => {
          if (cb.dataset.correct === 'true') {
            this.showOptionFeedback(container, cb, true, q);
          }
        });
        break;
        
      case 'numeric-input':
        const numInput = container.querySelector('#numeric-answer');
        const userNum = parseFloat(numInput.value);
        const correctNum = q.answer;
        const tolerance = q.tolerance || 0.01;
        isCorrect = !isNaN(userNum) && Math.abs(userNum - correctNum) <= tolerance;
        userAnswer = userNum;
        numInput.classList.add(isCorrect ? 'correct' : 'incorrect');
        this.showFeedback(container, '#feedback-numeric', isCorrect, q, userNum, correctNum);
        break;
        
      case 'latex-input':
        const latexInput = container.querySelector('#latex-answer');
        const userLatex = latexInput.value.trim();
        const expectedLatex = q.expectedLatex || '';
        // Comparación simple (en producción usar normalización LaTeX)
        isCorrect = this.normalizeLatex(userLatex) === this.normalizeLatex(expectedLatex);
        userAnswer = userLatex;
        latexInput.classList.add(isCorrect ? 'correct' : 'incorrect');
        this.showFeedback(container, '#feedback-latex', isCorrect, q, userLatex, expectedLatex);
        break;
        
      case 'ordering':
        const orderItems = container.querySelectorAll('[data-order-index]');
        const userOrder = Array.from(orderItems).map(el => el.querySelector('input').value);
        const correctOrder = q.items.map(item => item.id);
        isCorrect = userOrder.length === correctOrder.length && 
                    userOrder.every((v, i) => v === correctOrder[i]);
        userAnswer = userOrder;
        this.showFeedback(container, '#feedback-ordering', isCorrect, q, userOrder.join(','), correctOrder.join(','));
        break;
        
      case 'matching':
        // Simplificado
        isCorrect = false;
        userAnswer = {};
        break;
    }
    
    if (this.currentState === 'question') {
      this.currentState = 'answer';
      this.showExplanation(container, isCorrect, q);
      this.updateProgressRing(isCorrect);
      
      // Emitir evento
      eventBus.emit(EventTypes.QUIZ_ANSWER, {
        questionId: this.questionId,
        correct: isCorrect,
        answer: userAnswer,
        timeSpent,
        hintsUsed: this.hintsUsed,
        mode: this.mode
      });
      
      // En modo learning, dar XP y registrar
      if (this.mode === 'learning' && isCorrect) {
        const xpEarned = Math.max(1, this.xpReward - this.hintsUsed * 2);
        store.addXP(xpEarned, `quiz-${this.questionId}`);
        store.recordQuizAttempt({
          moduleId: this.questionId.split('-')[0] || 'unknown',
          quizId: this.questionId,
          score: isCorrect ? 100 : 0,
          totalQuestions: 1,
          correctAnswers: isCorrect ? 1 : 0,
          xpEarned
        });
      }
    }
  }
  
  showOptionFeedback(container, input, isCorrect, q) {
    const feedbackId = `feedback-${input.value}`;
    const feedback = container.querySelector(`#${feedbackId}`);
    if (!feedback) return;
    
    feedback.className = `quiz-option-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = isCorrect 
      ? '✓ ¡Correcto!' 
      : `✗ Incorrecto. ${q.explanation ? 'Ver explicación abajo.' : ''}`;
    
    if (q.explanation && isCorrect) {
      feedback.innerHTML += `<div class="quiz-option-explanation">${this.formatMath(q.explanation)}</div>`;
    }
  }
  
  showFeedback(container, selector, isCorrect, q, userAns, correctAns) {
    const feedback = container.querySelector(selector);
    if (!feedback) return;
    
    feedback.className = `quiz-option-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = isCorrect 
      ? '✓ ¡Correcto!' 
      : `✗ Incorrecto. Tu respuesta: ${userAns}. Respuesta correcta: ${correctAns}. ${q.explanation ? 'Ver explicación abajo.' : ''}`;
    
    if (q.explanation && isCorrect) {
      feedback.innerHTML += `<div class="quiz-option-explanation">${this.formatMath(q.explanation)}</div>`;
    }
  }
  
  showExplanation(container, isCorrect, q) {
    if (!this.explanationRequired || !q.explanation) return;
    
    const actions = container.querySelector('.quiz-actions');
    if (actions) {
      actions.insertAdjacentHTML('beforebegin', `
        <div class="quiz-explanation">
          <div class="quiz-explanation-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            Explicación
          </div>
          <div class="quiz-explanation-content">${this.formatMath(q.explanation)}</div>
        </div>
      `);
    }
  }
  
  updateProgressRing(isCorrect) {
    const progressRing = this.shadowRoot.querySelector('progress-ring');
    if (progressRing) {
      progressRing.setAttribute('value', isCorrect ? '1' : '0');
    }
  }
  
  skipQuestion() {
    this.currentState = 'skipped';
    this.renderResult(false, true);
  }
  
  nextQuestion() {
    // Emitir evento para que el padre cargue la siguiente
    eventBus.emit('quiz:next', { currentId: this.questionId });
  }
  
  renderResult(isCorrect, skipped = false) {
    const container = this.shadowRoot.querySelector('#quiz-content');
    if (!container) return;
    
    const q = this.questionData;
    const timeSpent = ((this.answerTime || Date.now()) - this.startTime) / 1000;
    
    container.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-icon ${isCorrect ? 'passed' : 'failed'}">
          ${isCorrect ? '✓' : '✗'}
        </div>
        <h2 class="quiz-result-title">${skipped ? 'Pregunta saltada' : (isCorrect ? '¡Correcto!' : 'Incorrecto')}</h2>
        <div class="quiz-result-score">${isCorrect ? '100%' : '0%'}</div>
        <p class="quiz-result-message">
          ${skipped ? 'Puedes intentarlo de nuevo más tarde.' : (isCorrect ? '¡Bien hecho! Continúa así.' : 'Revisa la explicación e inténtalo de nuevo.')}
        </p>
        <div class="quiz-result-breakdown">
          <div class="quiz-result-stat">
            <span class="quiz-result-stat-value">${timeSpent.toFixed(1)}s</span>
            <span class="quiz-result-stat-label">Tiempo</span>
          </div>
          <div class="quiz-result-stat">
            <span class="quiz-result-stat-value">${this.hintsUsed}</span>
            <span class="quiz-result-stat-label">Pistas usadas</span>
          </div>
          <div class="quiz-result-stat">
            <span class="quiz-result-stat-value">+${isCorrect ? this.xpReward : 0} XP</span>
            <span class="quiz-result-stat-label">Experiencia</span>
          </div>
        </div>
        ${!skipped && q.explanation ? `
          <div class="quiz-explanation" style="margin-top: var(--space-6); text-align: left;">
            <div class="quiz-explanation-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              Explicación
            </div>
            <div class="quiz-explanation-content">${this.formatMath(q.explanation)}</div>
          </div>
        ` : ''}
        <div class="quiz-actions center">
          <button class="btn btn-primary" id="btn-next" type="button">${skipped || !isCorrect ? 'Reintentar' : 'Siguiente pregunta'}</button>
        </div>
      </div>
    `;
    
    container.querySelector('#btn-next')?.addEventListener('click', () => {
      if (skipped || !isCorrect) {
        this.loadQuestion(); // Recargar misma pregunta
      } else {
        this.nextQuestion();
      }
    });
  }
  
  showLoading() {
    const container = this.shadowRoot.querySelector('#quiz-content');
    if (container) {
      container.innerHTML = `
        <div class="quiz-loading">
          <div class="quiz-loading-spinner"></div>
          <span>Cargando pregunta...</span>
        </div>
      `;
    }
  }
  
  formatMath(text) {
    if (!text) return '';
    // Convertir $...$ y $$...$$ a math-formula
    return text
      .replace(/\$\$(.+?)\$\$/g, '<math-formula latex="$1" display></math-formula>')
      .replace(/\$(.+?)\$/g, '<math-formula latex="$1"></math-formula>');
  }
  
  normalizeLatex(latex) {
    return latex.replace(/\s+/g, '').toLowerCase();
  }
  
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Registrar componente
if (!customElements.get('quiz-card')) {
  customElements.define('quiz-card', QuizCard);
}

export default QuizCard;