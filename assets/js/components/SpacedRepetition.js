/* ==========================================================================
   SPACED REPETITION ENGINE - Matemáticas Avanzadas
   Motor SM-2 integrado con IndexedDB, notificaciones, estadísticas
   ========================================================================== */

import { eventBus, EventTypes } from '../core/events.js';
import { store } from '../core/store.js';

/* ==========================================================================
   SPACED REPETITION ENGINE (no web component, módulo)
   ========================================================================== */

// Configuración SM-2 adaptada para matemáticas
export const SM2_CONFIG = {
  initialInterval: 1,        // 1 día
  initialEaseFactor: 2.5,
  minEaseFactor: 1.3,
  maxInterval: 365,          // Máximo 1 año
  intervalModifier: {
    again: 0,                // Reiniciar
    hard: 1.2,               // Intervalo * 1.2
    good: 1.0,               // Intervalo * easeFactor
    easy: 1.3                // Intervalo * easeFactor * 1.3
  },
  // Factores de dificultad por tema matemático
  topicDifficulty: {
    'arithmetic': 0.8,
    'algebra': 1.0,
    'trigonometry': 1.1,
    'calculus': 1.3,
    'linear-algebra': 1.2,
    'advanced': 1.4,
    'geometry': 1.0,
    'statistics': 1.1
  },
  // Grados SM-2
  grades: {
    again: 0,    // Respuesta incorrecta total
    hard: 3,     // Correcta con dificultad
    good: 4,     // Correcta normal
    easy: 5      // Correcta fácil
  }
};

/**
 * Calcular próximo intervalo según SM-2
 */
export function calculateNextInterval(item, grade) {
  const q = SM2_CONFIG.grades[grade] || 0;
  
  let { easeFactor, interval, repetitions } = item;
  
  if (q < 3) {
    // Respuesta incorrecta - reiniciar
    repetitions = 0;
    interval = 1;
  } else {
    // Respuesta correcta
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions++;
  }
  
  // Ajustar ease factor
  easeFactor = Math.max(
    SM2_CONFIG.minEaseFactor,
    easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  );
  
  // Aplicar modificador de dificultad del tema
  const topicDiff = SM2_CONFIG.topicDifficulty[item.topic] || 1.0;
  interval = Math.round(interval * topicDiff);
  
  // Aplicar modificador de grado
  const gradeMod = SM2_CONFIG.intervalModifier[grade] || 1;
  if (grade !== 'again') {
    interval = Math.round(interval * gradeMod);
  }
  
  // Limitar intervalo máximo
  interval = Math.min(interval, SM2_CONFIG.maxInterval);
  
  // Calcular próxima fecha
  const dueDate = Date.now() + interval * 24 * 60 * 60 * 1000;
  
  return {
    easeFactor,
    interval,
    repetitions,
    dueDate
  };
}

/**
 * Crear nueva tarjeta de repaso
 */
export function createReviewCard(questionData) {
  return {
    id: questionData.id || `review-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    moduleId: questionData.moduleId,
    questionId: questionData.questionId,
    topic: questionData.topic || 'algebra',
    easeFactor: SM2_CONFIG.initialEaseFactor,
    interval: SM2_CONFIG.initialInterval,
    repetitions: 0,
    dueDate: Date.now() + 24 * 60 * 60 * 1000, // 1 día
    lastReviewed: null,
    history: [],
    metadata: {
      question: questionData.question,
      answer: questionData.answer,
      type: questionData.type,
      difficulty: questionData.difficulty || 1
    }
  };
}

/**
 * Obtener tarjetas vencidas
 */
export function getDueReviews(reviewQueue = []) {
  const now = Date.now();
  return reviewQueue
    .filter(item => item.dueDate <= now)
    .sort((a, b) => a.dueDate - b.dueDate);
}

/**
 * Obtener tarjetas por vencer (próximos 7 días)
 */
export function getUpcomingReviews(reviewQueue = [], days = 7) {
  const now = Date.now();
  const future = now + days * 24 * 60 * 60 * 1000;
  return reviewQueue
    .filter(item => item.dueDate > now && item.dueDate <= future)
    .sort((a, b) => a.dueDate - b.dueDate);
}

/**
 * Obtener estadísticas de repaso
 */
export function getReviewStats(reviewQueue = []) {
  const now = Date.now();
  const due = reviewQueue.filter(r => r.dueDate <= now).length;
  const overdue = reviewQueue.filter(r => r.dueDate < now - 24 * 60 * 60 * 1000).length;
  const upcoming = reviewQueue.filter(r => r.dueDate > now && r.dueDate <= now + 7 * 24 * 60 * 60 * 1000).length;
  const total = reviewQueue.length;
  
  // Calcular retención promedio
  let totalReviews = 0;
  let correctReviews = 0;
  
  reviewQueue.forEach(item => {
    item.history.forEach(h => {
      totalReviews++;
      if (h.grade !== 'again') correctReviews++;
    });
  });
  
  const retentionRate = totalReviews > 0 ? (correctReviews / totalReviews) * 100 : 0;
  
  // Tarjetas por dificultad
  const byDifficulty = {};
  reviewQueue.forEach(item => {
    const diff = item.metadata?.difficulty || 1;
    byDifficulty[diff] = (byDifficulty[diff] || 0) + 1;
  });
  
  return {
    total,
    due,
    overdue,
    upcoming,
    retentionRate: Math.round(retentionRate * 10) / 10,
    byDifficulty,
    averageEaseFactor: reviewQueue.length > 0 
      ? reviewQueue.reduce((sum, r) => sum + r.easeFactor, 0) / reviewQueue.length 
      : SM2_CONFIG.initialEaseFactor,
    averageInterval: reviewQueue.length > 0
      ? reviewQueue.reduce((sum, r) => sum + r.interval, 0) / reviewQueue.length
      : 0
  };
}

/**
 * Filtrar tarjetas por módulo
 */
export function getReviewsByModule(reviewQueue = [], moduleId) {
  return reviewQueue.filter(r => r.moduleId === moduleId);
}

/**
 * Filtrar tarjetas por tema
 */
export function getReviewsByTopic(reviewQueue = [], topic) {
  return reviewQueue.filter(r => r.topic === topic);
}

/**
 * Obtener próxima sesión de repaso optimizada
 */
export function getNextReviewSession(reviewQueue = [], maxCards = 20) {
  const due = getDueReviews(reviewQueue);
  const upcoming = getUpcomingReviews(reviewQueue, 1); // Mañana
  
  // Priorizar: vencidas -> por vencer mañana -> nuevas
  let session = [...due];
  
  // Añadir algunas por vencer si hay espacio
  if (session.length < maxCards) {
    const needed = maxCards - session.length;
    session = [...session, ...upcoming.slice(0, needed)];
  }
  
  // Limitar
  return session.slice(0, maxCards);
}

/**
 * Calcular carga de trabajo estimada (minutos)
 */
export function estimateWorkload(reviewQueue = []) {
  const due = getDueReviews(reviewQueue);
  // ~30 segundos por tarjeta en promedio
  return Math.ceil(due.length * 0.5);
}

/**
 * Exportar cola de repaso (backup)
 */
export function exportReviewQueue(reviewQueue = []) {
  return {
    version: 1,
    exportedAt: Date.now(),
    config: SM2_CONFIG,
    queue: reviewQueue
  };
}

/**
 * Importar cola de repaso
 */
export function importReviewQueue(data) {
  if (!data || !data.queue || !Array.isArray(data.queue)) {
    throw new Error('Formato de cola de repaso inválido');
  }
  
  // Validar estructura
  const validQueue = data.queue.filter(item => 
    item.id && item.moduleId && item.questionId && 
    typeof item.easeFactor === 'number' &&
    typeof item.interval === 'number' &&
    typeof item.repetitions === 'number' &&
    typeof item.dueDate === 'number'
  );
  
  return validQueue;
}

/* ==========================================================================
   SPACED REPETITION WEB COMPONENT (UI)
   ========================================================================== */
export class SpacedRepetition extends HTMLElement {
  static get observedAttributes() {
    return ['max-cards', 'auto-start', 'show-stats'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.maxCards = 20;
    this.autoStart = false;
    this.showStats = true;
    this.currentSession = [];
    this.currentIndex = 0;
    this.sessionResults = [];
  }
  
  connectedCallback() {
    this.render();
    this.parseAttributes();
    this.loadSession();
  }
  
  disconnectedCallback() {
    // Cleanup
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'max-cards':
        this.maxCards = parseInt(newValue) || 20;
        break;
      case 'auto-start':
        this.autoStart = newValue !== 'false';
        break;
      case 'show-stats':
        this.showStats = newValue !== 'false';
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
        }
        
        .review-container {
          background: var(--color-surface, #1e293b);
          border: 1px solid var(--color-border, #334155);
          border-radius: var(--radius-xl, 0.75rem);
          overflow: hidden;
        }
        
        .review-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4, 1rem) var(--space-6, 1.5rem);
          border-bottom: 1px solid var(--color-border, #334155);
          flex-wrap: wrap;
          gap: var(--space-3, 0.75rem);
        }
        
        .review-title {
          font-size: var(--text-lg, 1.1rem);
          font-weight: 600;
          margin: 0;
        }
        
        .review-progress {
          display: flex;
          align-items: center;
          gap: var(--space-3, 0.75rem);
        }
        
        .review-progress-bar {
          flex: 1;
          min-width: 200px;
          height: 6px;
          background: var(--color-border, #334155);
          border-radius: var(--radius-full, 9999px);
          overflow: hidden;
        }
        
        .review-progress-fill {
          height: 100%;
          background: var(--gradient-primary, linear-gradient(135deg, #22d3ee 0%, #a855f7 100%));
          border-radius: var(--radius-full, 9999px);
          transition: width var(--transition-slow, 350ms);
        }
        
        .review-progress-text {
          font-size: var(--text-sm, 0.875rem);
          color: var(--color-text-muted, #94a3b8);
          white-space: nowrap;
        }
        
        .review-due-count {
          font-size: var(--text-lg, 1.1rem);
          font-weight: 700;
          color: var(--brand-primary, #22d3ee);
        }
        
        .review-card {
          padding: var(--space-6, 1.5rem);
        }
        
        .review-card-question {
          font-size: var(--text-lg, 1.1rem);
          margin-bottom: var(--space-6, 1.5rem);
          line-height: var(--leading-relaxed, 1.625);
        }
        
        .review-card-answer {
          margin-bottom: var(--space-6, 1.5rem);
        }
        
        .review-card-input {
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
        
        .review-card-input:focus {
          outline: none;
          border-color: var(--brand-primary, #22d3ee);
          box-shadow: var(--shadow-focus, 0 0 0 3px rgba(34, 211, 238, 0.4));
        }
        
        .review-card-actions {
          display: flex;
          gap: var(--space-3, 0.75rem);
        }
        
        .review-grade-buttons {
          display: flex;
          gap: var(--space-2, 0.5rem);
          flex-wrap: wrap;
        }
        
        .review-grade-btn {
          flex: 1;
          min-width: 80px;
          padding: var(--space-3, 0.75rem) var(--space-4, 1rem);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 600;
          border-radius: var(--radius-lg, 0.5rem);
          transition: all var(--transition-fast, 150ms);
        }
        
        .review-grade-btn.again {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: var(--brand-error, #ef4444);
        }
        
        .review-grade-btn.again:hover {
          background: var(--brand-error, #ef4444);
          color: white;
        }
        
        .review-grade-btn.hard {
          background: rgba(249, 115, 22, 0.1);
          border: 1px solid rgba(249, 115, 22, 0.3);
          color: var(--brand-warning, #f97316);
        }
        
        .review-grade-btn.hard:hover {
          background: var(--brand-warning, #f97316);
          color: white;
        }
        
        .review-grade-btn.good {
          background: rgba(34, 211, 238, 0.1);
          border: 1px solid rgba(34, 211, 238, 0.3);
          color: var(--brand-primary, #22d3ee);
        }
        
        .review-grade-btn.good:hover {
          background: var(--brand-primary, #22d3ee);
          color: white;
        }
        
        .review-grade-btn.easy {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--brand-success, #10b981);
        }
        
        .review-grade-btn.easy:hover {
          background: var(--brand-success, #10b981);
          color: white;
        }
        
        /* Answer revealed */
        .review-answer-revealed {
          margin-top: var(--space-4, 1rem);
          padding: var(--space-4, 1rem);
          background: rgba(34, 211, 238, 0.05);
          border: 1px solid rgba(34, 211, 238, 0.2);
          border-radius: var(--radius-lg, 0.5rem);
          animation: fadeIn var(--transition-base, 250ms);
        }
        
        .review-answer-label {
          font-size: var(--text-sm, 0.875rem);
          font-weight: 600;
          color: var(--brand-primary, #22d3ee);
          margin-bottom: var(--space-2, 0.5rem);
        }
        
        .review-answer-value {
          font-family: var(--font-mono, monospace);
          font-size: var(--text-lg, 1.1rem);
        }
        
        /* Session complete */
        .review-complete {
          text-align: center;
          padding: var(--space-10, 2.5rem) var(--space-6, 1.5rem);
        }
        
        .review-complete-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--gradient-success, linear-gradient(135deg, #10b981 0%, #059669 100%));
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--space-6, 1.5rem);
          font-size: var(--text-3xl, 2rem);
          color: white;
        }
        
        .review-complete-title {
          font-size: var(--text-2xl, 1.6rem);
          margin-bottom: var(--space-2, 0.5rem);
        }
        
        .review-complete-stats {
          display: flex;
          justify-content: center;
          gap: var(--space-6, 1.5rem);
          margin: var(--space-8, 2rem) 0;
          flex-wrap: wrap;
        }
        
        .review-complete-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-1, 0.25rem);
        }
        
        .review-complete-stat-value {
          font-size: var(--text-2xl, 1.6rem);
          font-weight: 700;
          color: var(--brand-primary, #22d3ee);
        }
        
        .review-complete-stat-label {
          font-size: var(--text-xs, 0.7rem);
          color: var(--color-text-subtle, #64748b);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .review-complete-actions {
          display: flex;
          justify-content: center;
          gap: var(--space-3, 0.75rem);
          flex-wrap: wrap;
        }
        
        /* Stats panel */
        .review-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: var(--space-3, 0.75rem);
          padding: var(--space-4, 1rem) var(--space-6, 1.5rem);
          background: var(--color-bg, #0a0f1a);
          border-top: 1px solid var(--color-border, #334155);
        }
        
        .review-stat {
          text-align: center;
        }
        
        .review-stat-value {
          font-size: var(--text-xl, 1.3rem);
          font-weight: 700;
          color: var(--brand-primary, #22d3ee);
        }
        
        .review-stat-label {
          font-size: var(--text-xs, 0.7rem);
          color: var(--color-text-subtle, #64748b);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        /* Empty state */
        .review-empty {
          text-align: center;
          padding: var(--space-12, 3rem) var(--space-6, 1.5rem);
          color: var(--color-text-muted, #94a3b8);
        }
        
        .review-empty-icon {
          font-size: var(--text-4xl, 2.5rem);
          margin-bottom: var(--space-4, 1rem);
          opacity: 0.5;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @media (max-width: 639px) {
          .review-grade-buttons {
            flex-direction: column;
          }
          
          .review-grade-btn {
            width: 100%;
          }
        }
      </style>
      
      <div class="review-container" id="container">
        <!-- Contenido dinámico -->
      </div>
    `;
  }
  
  parseAttributes() {
    this.maxCards = parseInt(this.getAttribute('max-cards')) || 20;
    this.autoStart = this.getAttribute('auto-start') !== 'false';
    this.showStats = this.getAttribute('show-stats') !== 'false';
  }
  
  loadSession() {
    const reviewQueue = store.get('reviewQueue') || [];
    this.currentSession = getNextReviewSession(reviewQueue, this.maxCards);
    this.currentIndex = 0;
    this.sessionResults = [];
    
    if (this.currentSession.length === 0) {
      this.renderEmpty();
    } else {
      this.renderCard();
      if (this.showStats) this.renderStats(reviewQueue);
    }
  }
  
  renderEmpty() {
    const container = this.shadowRoot.querySelector('#container');
    container.innerHTML = `
      <div class="review-container">
        <div class="review-header">
          <h2 class="review-title">🎉 Repaso completado</h2>
        </div>
        <div class="review-empty">
          <div class="review-empty-icon">✨</div>
          <h3 style="margin-bottom: var(--space-2);">¡No hay tarjetas pendientes!</h3>
          <p>Todas tus tarjetas de repaso están al día. Vuelve mañana para nuevas revisiones.</p>
          <div style="margin-top: var(--space-6); display: flex; gap: var(--space-3); justify-content: center;">
            <button class="btn btn-primary" id="btn-new-cards">Generar nuevas tarjetas</button>
            <button class="btn btn-secondary" id="btn-view-stats">Ver estadísticas</button>
          </div>
        </div>
      </div>
    `;
    
    container.querySelector('#btn-new-cards')?.addEventListener('click', () => this.generateNewCards());
    container.querySelector('#btn-view-stats')?.addEventListener('click', () => this.showFullStats());
  }
  
  renderCard() {
    const container = this.shadowRoot.querySelector('#container');
    if (!container || this.currentIndex >= this.currentSession.length) {
      this.renderComplete();
      return;
    }
    
    const card = this.currentSession[this.currentIndex];
    const progress = (this.currentIndex + 1) / this.currentSession.length;
    
    container.innerHTML = `
      <div class="review-container">
        <div class="review-header">
          <h2 class="review-title">Repaso ${this.currentIndex + 1} de ${this.currentSession.length}</h2>
          <div class="review-progress">
            <div class="review-progress-bar">
              <div class="review-progress-fill" style="width: ${progress * 100}%"></div>
            </div>
            <span class="review-progress-text">${this.currentIndex + 1} / ${this.currentSession.length}</span>
          </div>
        </div>
        
        <div class="review-card">
          <div class="review-card-question">${this.formatMath(card.metadata?.question || 'Pregunta no disponible')}</div>
          
          <div class="review-card-answer">
            <input 
              type="text" 
              class="review-card-input" 
              id="review-input"
              placeholder="Escribe tu respuesta..."
              autocomplete="off"
              aria-label="Tu respuesta"
            >
          </div>
          
          <div class="review-card-actions">
            <div class="review-grade-buttons">
              <button class="review-grade-btn again" data-grade="again">De nuevo</button>
              <button class="review-grade-btn hard" data-grade="hard">Difícil</button>
              <button class="review-grade-btn good" data-grade="good">Bien</button>
              <button class="review-grade-btn easy" data-grade="easy">Fácil</button>
            </div>
          </div>
        </div>
        
        ${this.showStats ? this.renderStatsHTML(store.get('reviewQueue') || []) : ''}
      </div>
    `;
    
    // Focus input
    setTimeout(() => {
      const input = container.querySelector('#review-input');
      input?.focus();
    }, 50);
    
    // Event listeners
    container.querySelectorAll('.review-grade-btn').forEach(btn => {
      btn.addEventListener('click', () => this.gradeCard(btn.dataset.grade));
    });
    
    container.querySelector('#review-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.showAnswer();
    });
  }
  
  renderStatsHTML(reviewQueue) {
    const stats = getReviewStats(reviewQueue);
    return `
      <div class="review-stats">
        <div class="review-stat">
          <div class="review-stat-value">${stats.total}</div>
          <div class="review-stat-label">Total tarjetas</div>
        </div>
        <div class="review-stat">
          <div class="review-stat-value">${stats.due}</div>
          <div class="review-stat-label">Pendientes hoy</div>
        </div>
        <div class="review-stat">
          <div class="review-stat-value">${stats.retentionRate}%</div>
          <div class="review-stat-label">Retención</div>
        </div>
        <div class="review-stat">
          <div class="review-stat-value">${stats.averageInterval}d</div>
          <div class="review-stat-label">Intervalo medio</div>
        </div>
      </div>
    `;
  }
  
  renderStats(reviewQueue) {
    // Stats ya se renderizan en renderCard
  }
  
  showAnswer() {
    const container = this.shadowRoot.querySelector('#container');
    const input = container.querySelector('#review-input');
    const card = this.currentSession[this.currentIndex];
    
    if (!input.value.trim()) {
      input.focus();
      return;
    }
    
    const answer = card.metadata?.answer || 'Respuesta no disponible';
    
    // Insertar respuesta revelada
    const actions = container.querySelector('.review-card-actions');
    actions.insertAdjacentHTML('beforebegin', `
      <div class="review-answer-revealed">
        <div class="review-answer-label">Respuesta correcta:</div>
        <div class="review-answer-value">${this.formatMath(answer)}</div>
      </div>
    `);
    
    // Deshabilitar input
    input.disabled = true;
    input.style.opacity = '0.7';
  }
  
  gradeCard(grade) {
    const card = this.currentSession[this.currentIndex];
    const input = this.shadowRoot.querySelector('#review-input');
    const userAnswer = input?.value.trim() || '';
    
    // Calcular nuevo intervalo
    const updated = calculateNextInterval(card, grade);
    
    // Actualizar tarjeta
    Object.assign(card, updated);
    card.lastReviewed = Date.now();
    card.history.push({
      grade,
      timestamp: Date.now(),
      easeFactor: updated.easeFactor,
      interval: updated.interval,
      userAnswer
    });
    
    // Guardar en store
    const reviewQueue = store.get('reviewQueue') || [];
    const index = reviewQueue.findIndex(r => r.id === card.id);
    if (index >= 0) {
      reviewQueue[index] = card;
      store.set('reviewQueue', reviewQueue);
    }
    
    // Registrar resultado
    this.sessionResults.push({
      cardId: card.id,
      grade,
      userAnswer,
      correct: grade !== 'again',
      timeSpent: Date.now() - (this.cardStartTime || Date.now())
    });
    
    // Emitir evento
    eventBus.emit(EventTypes.REVIEW_GRADE, { card, grade, userAnswer });
    
    // Avanzar
    this.currentIndex++;
    this.cardStartTime = Date.now();
    
    if (this.currentIndex >= this.currentSession.length) {
      this.renderComplete();
    } else {
      this.renderCard();
    }
  }
  
  renderComplete() {
    const container = this.shadowRoot.querySelector('#container');
    const correct = this.sessionResults.filter(r => r.correct).length;
    const total = this.sessionResults.length;
    const retention = total > 0 ? Math.round((correct / total) * 100) : 0;
    const avgTime = total > 0 ? Math.round(this.sessionResults.reduce((sum, r) => sum + r.timeSpent, 0) / total / 1000) : 0;
    
    container.innerHTML = `
      <div class="review-container">
        <div class="review-header">
          <h2 class="review-title">Sesión completada</h2>
        </div>
        
        <div class="review-complete">
          <div class="review-complete-icon">✓</div>
          <h2 class="review-complete-title">¡Repaso completado!</h2>
          
          <div class="review-complete-stats">
            <div class="review-complete-stat">
              <span class="review-complete-stat-value">${correct}/${total}</span>
              <span class="review-complete-stat-label">Correctas</span>
            </div>
            <div class="review-complete-stat">
              <span class="review-complete-stat-value">${retention}%</span>
              <span class="review-complete-stat-label">Retención</span>
            </div>
            <div class="review-complete-stat">
              <span class="review-complete-stat-value">${avgTime}s</span>
              <span class="review-complete-stat-label">Tiempo medio</span>
            </div>
          </div>
          
          <div class="review-complete-actions">
            <button class="btn btn-primary" id="btn-continue">Continuar aprendiendo</button>
            <button class="btn btn-secondary" id="btn-stats">Ver estadísticas completas</button>
          </div>
        </div>
      </div>
    `;
    
    container.querySelector('#btn-continue')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('review:continue', { bubbles: true, composed: true }));
    });
    
    container.querySelector('#btn-stats')?.addEventListener('click', () => this.showFullStats());
  }
  
  generateNewCards() {
    // Generar tarjetas desde módulos completados
    this.dispatchEvent(new CustomEvent('review:generate', { bubbles: true, composed: true }));
  }
  
  showFullStats() {
    this.dispatchEvent(new CustomEvent('review:stats', { bubbles: true, composed: true }));
  }
  
  formatMath(text) {
    if (!text) return '';
    return text
      .replace(/\$\$(.+?)\$\$/g, '<math-formula latex="$1" display></math-formula>')
      .replace(/\$(.+?)\$/g, '<math-formula latex="$1"></math-formula>');
  }
  
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Registrar componente
if (!customElements.get('spaced-repetition')) {
  customElements.define('spaced-repetition', SpacedRepetition);
}

export default {
  SM2_CONFIG,
  calculateNextInterval,
  createReviewCard,
  getDueReviews,
  getUpcomingReviews,
  getReviewStats,
  getReviewsByModule,
  getReviewsByTopic,
  getNextReviewSession,
  estimateWorkload,
  exportReviewQueue,
  importReviewQueue
};