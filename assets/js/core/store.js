/* ==========================================================================
   CORE STORE - Matemáticas Avanzadas
   Estado global reactivo con persistencia IndexedDB y sincronización
   ========================================================================== */

import { eventBus, EventTypes } from './events.js';
import { openDB } from 'idb';

/* ==========================================================================
   ESQUEMA DE BASE DE DATOS
   ========================================================================== */
const DB_NAME = 'matematicas-avanzadas';
const DB_VERSION = 1;

const STORES = {
  USER: 'user',
  PROGRESS: 'progress',
  QUIZ_ATTEMPTS: 'quizAttempts',
  REVIEW_QUEUE: 'reviewQueue',
  CERTIFICATES: 'certificates',
  SETTINGS: 'settings',
  ANALYTICS: 'analytics'
};

/* ==========================================================================
   ESTADO INICIAL
   ========================================================================== */
const INITIAL_STATE = {
  // Usuario
  user: {
    id: null,
    name: 'Estudiante',
    email: null,
    avatar: null,
    createdAt: null,
    lastActiveAt: null,
    streak: 0,
    longestStreak: 0,
    totalXP: 0,
    level: 1,
    preferences: {
      theme: 'auto', // 'light', 'dark', 'auto'
      language: 'es',
      animations: true,
      sound: false,
      notifications: true,
      reducedMotion: false
    }
  },
  
  // Progreso por módulo
  progress: {},
  // Estructura: {
  //   'm01': {
  //     status: 'locked' | 'available' | 'in-progress' | 'completed' | 'mastery',
  //     startedAt: timestamp,
  //     completedAt: timestamp,
  //     masteryAt: timestamp,
  //     quizScore: 0,
  //     quizAttempts: 0,
  //     bestScore: 0,
  //     timeSpent: 0,
  //     sections: {
  //       theory: { completed: false, timeSpent: 0 },
  //       practice: { completed: false, timeSpent: 0 },
  //       quiz: { completed: false, score: 0, attempts: 0 }
  //     }
  //   }
  // }
  
  // Intentos de quiz
  quizAttempts: [],
  // Estructura: {
  //   id: uuid,
  //   moduleId: 'm01',
  //   quizId: 'm01-quiz',
  //   startedAt: timestamp,
  //   completedAt: timestamp,
  //   score: 85,
  //   totalQuestions: 25,
  //   correctAnswers: 21,
  //   answers: [{ questionId, selected, correct, timeSpent, hintsUsed }],
  //   xpEarned: 100
  // }
  
  // Cola de repaso espaciado (SM-2)
  reviewQueue: [],
  // Estructura: {
  //   id: 'm01-q14',
  //   moduleId: 'm01',
  //   questionId: 'm01-q14',
  //   easeFactor: 2.5,
  //   interval: 1,
  //   repetitions: 0,
  //   dueDate: timestamp,
  //   lastReviewed: timestamp,
  //   history: [{ grade: 'again'|'hard'|'good'|'easy', timestamp }]
  // }
  
  // Certificados ganados
  certificates: [],
  // Estructura: {
  //   id: 'module-m01',
  //   type: 'module' | 'phase' | 'course',
  //   moduleId: 'm01',
  //   phaseId: 1,
  //   earnedAt: timestamp,
  //   verificationHash: 'sha256:...',
  //   template: 'elegant',
  //   data: { studentName, score, date, ... }
  // }
  
  // Configuración
  settings: {
    theme: 'auto',
    language: 'es',
    animations: true,
    sound: false,
    notifications: true,
    reducedMotion: false,
    autoSave: true,
    syncEnabled: false
  },
  
  // Analytics locales (privadas)
  analytics: {
    sessions: [],
    moduleViews: {},
    quizStats: {},
    timeSpent: {},
    errors: []
  },
  
  // UI State (no persistente)
  ui: {
    currentRoute: '/',
    previousRoute: null,
    sidebarOpen: false,
    sidebarCollapsed: false,
    loading: false,
    toasts: [],
    modals: []
  }
};

/* ==========================================================================
   STORE CLASS
   ========================================================================== */
export class Store {
  constructor() {
    this.state = this.deepClone(INITIAL_STATE);
    this.db = null;
    this.subscribers = new Map();
    this.persistenceTimer = null;
    this.isInitialized = false;
    this.dirty = false;
  }
  
  /**
   * Inicializar store y cargar desde IndexedDB
   */
  async init() {
    if (this.isInitialized) return;
    
    try {
      this.db = await this.openDatabase();
      await this.loadFromDB();
      this.isInitialized = true;
      this.setupAutoSave();
      this.setupVisibilityHandling();
      
      eventBus.emit(EventTypes.DATA_LOAD, { state: this.state });
      console.log('[Store] Initialized successfully');
    } catch (error) {
      console.error('[Store] Initialization failed:', error);
      // Continuar con estado inicial si falla la BD
      this.isInitialized = true;
    }
  }
  
  /**
   * Abrir base de datos IndexedDB
   */
  async openDatabase() {
    return openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Store de usuario
        if (!db.objectStoreNames.contains(STORES.USER)) {
          db.createObjectStore(STORES.USER, { keyPath: 'id' });
        }
        
        // Store de progreso
        if (!db.objectStoreNames.contains(STORES.PROGRESS)) {
          const progressStore = db.createObjectStore(STORES.PROGRESS, { keyPath: 'moduleId' });
          progressStore.createIndex('status', 'status');
          progressStore.createIndex('phase', 'phaseId');
        }
        
        // Store de intentos de quiz
        if (!db.objectStoreNames.contains(STORES.QUIZ_ATTEMPTS)) {
          const quizStore = db.createObjectStore(STORES.QUIZ_ATTEMPTS, { keyPath: 'id' });
          quizStore.createIndex('moduleId', 'moduleId');
          quizStore.createIndex('completedAt', 'completedAt');
        }
        
        // Store de cola de repaso
        if (!db.objectStoreNames.contains(STORES.REVIEW_QUEUE)) {
          const reviewStore = db.createObjectStore(STORES.REVIEW_QUEUE, { keyPath: 'id' });
          reviewStore.createIndex('dueDate', 'dueDate');
          reviewStore.createIndex('moduleId', 'moduleId');
        }
        
        // Store de certificados
        if (!db.objectStoreNames.contains(STORES.CERTIFICATES)) {
          const certStore = db.createObjectStore(STORES.CERTIFICATES, { keyPath: 'id' });
          certStore.createIndex('type', 'type');
          certStore.createIndex('earnedAt', 'earnedAt');
        }
        
        // Store de configuración
        if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
          db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
        }
        
        // Store de analytics
        if (!db.objectStoreNames.contains(STORES.ANALYTICS)) {
          const analyticsStore = db.createObjectStore(STORES.ANALYTICS, { keyPath: 'id', autoIncrement: true });
          analyticsStore.createIndex('type', 'type');
          analyticsStore.createIndex('timestamp', 'timestamp');
        }
      }
    });
  }
  
  /**
   * Cargar estado desde IndexedDB
   */
  async loadFromDB() {
    if (!this.db) return;
    
    try {
      const tx = this.db.transaction(Object.values(STORES), 'readonly');
      
      // Cargar en paralelo
      const [
        user,
        progress,
        quizAttempts,
        reviewQueue,
        certificates,
        settings
      ] = await Promise.all([
        tx.objectStore(STORES.USER).get('current'),
        tx.objectStore(STORES.PROGRESS).getAll(),
        tx.objectStore(STORES.QUIZ_ATTEMPTS).getAll(),
        tx.objectStore(STORES.REVIEW_QUEUE).getAll(),
        tx.objectStore(STORES.CERTIFICATES).getAll(),
        tx.objectStore(STORES.SETTINGS).getAll()
      ]);
      
      await tx.done;
      
      // Merge con estado inicial
      if (user) {
        this.state.user = { ...this.state.user, ...user };
      }
      
      if (progress.length) {
        this.state.progress = progress.reduce((acc, p) => {
          acc[p.moduleId] = p;
          return acc;
        }, {});
      }
      
      this.state.quizAttempts = quizAttempts;
      this.state.reviewQueue = reviewQueue;
      this.state.certificates = certificates;
      
      if (settings.length) {
        const settingsObj = settings.reduce((acc, s) => {
          acc[s.key] = s.value;
          return acc;
        }, {});
        this.state.settings = { ...this.state.settings, ...settingsObj };
        this.state.user.preferences = { ...this.state.user.preferences, ...settingsObj };
      }
      
      // Seed first module as available if no progress exists
      if (!this.state.progress['m01']) {
        this.state.progress['m01'] = {
          status: 'available',
          startedAt: null,
          completedAt: null,
          masteryAt: null,
          quizScore: 0,
          quizAttempts: 0,
          bestScore: 0,
          timeSpent: 0,
          sections: {
            theory: { completed: false, timeSpent: 0 },
            practice: { completed: false, timeSpent: 0 },
            quiz: { completed: false, score: 0, attempts: 0 }
          }
        };
        this.dirty = true;
      }
      
      // Aplicar preferencias
      this.applyPreferences();
      
    } catch (error) {
      console.error('[Store] Failed to load from DB:', error);
    }
  }
  
  /**
   * Guardar estado en IndexedDB
   */
  async saveToDB(force = false) {
    if (!this.db || (!this.dirty && !force)) return;
    
    try {
      const tx = this.db.transaction(Object.values(STORES), 'readwrite');
      
      // Guardar usuario
      await tx.objectStore(STORES.USER).put({
        id: 'current',
        ...this.state.user,
        lastActiveAt: Date.now()
      });
      
      // Guardar progreso
      for (const [moduleId, progress] of Object.entries(this.state.progress)) {
        await tx.objectStore(STORES.PROGRESS).put({
          moduleId,
          ...progress
        });
      }
      
      // Guardar intentos de quiz (solo los nuevos)
      for (const attempt of this.state.quizAttempts) {
        await tx.objectStore(STORES.QUIZ_ATTEMPTS).put(attempt);
      }
      
      // Guardar cola de repaso
      for (const item of this.state.reviewQueue) {
        await tx.objectStore(STORES.REVIEW_QUEUE).put(item);
      }
      
      // Guardar certificados
      for (const cert of this.state.certificates) {
        await tx.objectStore(STORES.CERTIFICATES).put(cert);
      }
      
      // Guardar configuración
      for (const [key, value] of Object.entries(this.state.settings)) {
        await tx.objectStore(STORES.SETTINGS).put({ key, value });
      }
      
      await tx.done;
      this.dirty = false;
      
      if (this.debug) console.log('[Store] Saved to DB');
    } catch (error) {
      console.error('[Store] Failed to save to DB:', error);
    }
  }
  
  /**
   * Configurar auto-guardado periódico
   */
  setupAutoSave() {
    if (this.persistenceTimer) clearInterval(this.persistenceTimer);
    
    this.persistenceTimer = setInterval(() => {
      if (this.state.settings.autoSave) {
        this.saveToDB();
      }
    }, 30000); // Cada 30 segundos
    
    // Guardar al cerrar página
    window.addEventListener('beforeunload', () => this.saveToDB(true));
  }
  
  /**
   * Manejar visibilidad de la página
   */
  setupVisibilityHandling() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.saveToDB(true);
        this.state.user.lastActiveAt = Date.now();
      } else {
        // Verificar racha al volver
        this.checkStreak();
      }
    });
  }
  
  /**
   * Aplicar preferencias al documento
   */
  applyPreferences() {
    const prefs = this.state.user.preferences;
    
    // Tema
    document.documentElement.dataset.theme = prefs.theme;
    
    // Animaciones reducidas
    if (prefs.reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    // Notificaciones
    if (prefs.notifications && 'Notification' in window) {
      Notification.requestPermission();
    }
  }
  
  /* ==========================================================================
     MÉTODOS DE ACCESO AL ESTADO (Reactivo)
     ========================================================================== */
  
  /**
   * Obtener valor del estado (con path opcional)
   * @param {string} path - Path en notación punto (ej: 'user.name')
   */
  get(path) {
    if (!path) return this.state;
    
    return path.split('.').reduce((obj, key) => obj?.[key], this.state);
  }
  
  /**
   * Establecer valor en el estado (reactivo)
   * @param {string} path - Path en notación punto
   * @param {*} value - Nuevo valor
   */
  set(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => {
      if (!obj[key]) obj[key] = {};
      return obj[key];
    }, this.state);
    
    const oldValue = target[lastKey];
    if (oldValue === value) return false;
    
    target[lastKey] = value;
    this.dirty = true;
    this.notifySubscribers(path, value, oldValue);
    return true;
  }
  
  /**
   * Actualizar múltiples valores atómicamente
   */
  update(updates) {
    const changes = [];
    
    for (const [path, value] of Object.entries(updates)) {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const target = keys.reduce((obj, key) => {
        if (!obj[key]) obj[key] = {};
        return obj[key];
      }, this.state);
      
      const oldValue = target[lastKey];
      if (oldValue !== value) {
        target[lastKey] = value;
        this.dirty = true;
        changes.push({ path, value, oldValue });
      }
    }
    
    for (const change of changes) {
      this.notifySubscribers(change.path, change.value, change.oldValue);
    }
    
    return changes.length > 0;
  }
  
  /**
   * Suscribirse a cambios en un path
   * @param {string} path - Path a observar
   * @param {Function} callback - (newValue, oldValue) => void
   * @returns {Function} Unsubscribe function
   */
  subscribe(path, callback) {
    if (!this.subscribers.has(path)) {
      this.subscribers.set(path, new Set());
    }
    this.subscribers.get(path).add(callback);
    
    return () => {
      this.subscribers.get(path)?.delete(callback);
    };
  }
  
  /**
   * Notificar suscriptores
   */
  notifySubscribers(path, newValue, oldValue) {
    // Notificar suscriptores exactos
    this.subscribers.get(path)?.forEach(cb => {
      try { cb(newValue, oldValue); } catch (e) { console.error(e); }
    });
    
    // Notificar suscriptores padre (wildcard)
    const pathParts = path.split('.');
    for (let i = pathParts.length - 1; i > 0; i--) {
      const parentPath = pathParts.slice(0, i).join('.');
      this.subscribers.get(parentPath)?.forEach(cb => {
        try { cb(this.get(parentPath), oldValue); } catch (e) { console.error(e); }
      });
    }
    
    // Notificar suscriptores globales
    this.subscribers.get('*')?.forEach(cb => {
      try { cb(path, newValue, oldValue); } catch (e) { console.error(e); }
    });
  }
  
  /* ==========================================================================
   MÉTODOS DE DOMINIO (Lógica de negocio)
   ========================================================================== */
  
  // --- Usuario ---
  
  setUserName(name) {
    this.set('user.name', name);
    this.set('user.preferences.name', name);
  }
  
  addXP(amount, source = 'unknown') {
    const newXP = this.state.user.totalXP + amount;
    const newLevel = Math.floor(Math.sqrt(newXP / 100)) + 1;
    
    const updates = {
      'user.totalXP': newXP,
      'user.level': newLevel
    };
    
    if (newLevel > this.state.user.level) {
      updates['user.level'] = newLevel;
      eventBus.emit(EventTypes.USER_LEVEL_UP, { level: newLevel, xp: newXP });
    }
    
    this.update(updates);
    eventBus.emit(EventTypes.USER_XP_GAIN, { amount, source, totalXP: newXP });
  }
  
  checkStreak() {
    const now = Date.now();
    const lastActive = this.state.user.lastActiveAt;
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (!lastActive) {
      this.update({
        'user.streak': 1,
        'user.lastActiveAt': now
      });
      return;
    }
    
    const daysDiff = Math.floor((now - lastActive) / oneDay);
    
    if (daysDiff === 1) {
      // Día consecutivo
      const newStreak = this.state.user.streak + 1;
      this.update({
        'user.streak': newStreak,
        'user.lastActiveAt': now,
        'user.longestStreak': Math.max(newStreak, this.state.user.longestStreak)
      });
      eventBus.emit(EventTypes.USER_STREAK_UPDATE, { streak: newStreak });
    } else if (daysDiff > 1) {
      // Rachas rota
      this.update({
        'user.streak': 1,
        'user.lastActiveAt': now
      });
      eventBus.emit(EventTypes.USER_STREAK_UPDATE, { streak: 1, broken: true });
    }
    // daysDiff === 0: mismo día, no cambia
  }
  
  // --- Progreso ---
  
  getModuleProgress(moduleId) {
    return this.state.progress[moduleId] || {
      status: 'locked',
      startedAt: null,
      completedAt: null,
      masteryAt: null,
      quizScore: 0,
      quizAttempts: 0,
      bestScore: 0,
      timeSpent: 0,
      sections: {
        theory: { completed: false, timeSpent: 0 },
        practice: { completed: false, timeSpent: 0 },
        quiz: { completed: false, score: 0, attempts: 0 }
      }
    };
  }
  
  startModule(moduleId) {
    const progress = this.getModuleProgress(moduleId);
    if (progress.status !== 'locked' && progress.status !== 'available') return;
    
    this.set(`progress.${moduleId}`, {
      ...progress,
      status: 'in-progress',
      startedAt: progress.startedAt || Date.now()
    });
    
    eventBus.emit(EventTypes.MODULE_START, { moduleId });
  }
  
  completeModuleSection(moduleId, section) {
    const progress = this.getModuleProgress(moduleId);
    const sectionKey = `sections.${section}`;
    
    this.set(`progress.${moduleId}.${sectionKey}.completed`, true);
    
    // Verificar si el módulo está completo
    const updatedProgress = this.getModuleProgress(moduleId);
    const allSectionsDone = Object.values(updatedProgress.sections).every(s => s.completed);
    
    if (allSectionsDone && updatedProgress.status === 'in-progress') {
      this.completeModule(moduleId);
    }
  }
  
  completeModule(moduleId, score = 100) {
    const progress = this.getModuleProgress(moduleId);
    
    this.set(`progress.${moduleId}`, {
      ...progress,
      status: 'completed',
      completedAt: Date.now(),
      quizScore: Math.max(progress.quizScore, score),
      bestScore: Math.max(progress.bestScore, score)
    });
    
    // Desbloquear siguiente módulo
    this.unlockNextModule(moduleId);
    
    // XP por completar módulo
    this.addXP(100, `module-${moduleId}`);
    
    eventBus.emit(EventTypes.MODULE_COMPLETE, { moduleId, score });
  }
  
  achieveMastery(moduleId) {
    const progress = this.getModuleProgress(moduleId);
    if (progress.status !== 'completed') return;
    
    this.set(`progress.${moduleId}.status`, 'mastery');
    this.set(`progress.${moduleId}.masteryAt`, Date.now());
    
    this.addXP(50, `mastery-${moduleId}`);
    eventBus.emit(EventTypes.MODULE_MASTERY, { moduleId });
  }
  
  unlockNextModule(currentModuleId) {
    // Lógica simple: desbloquear módulo numérico siguiente
    const match = currentModuleId.match(/m(\d+)/);
    if (!match) return;
    
    const nextNum = parseInt(match[1]) + 1;
    const nextModuleId = `m${nextNum.toString().padStart(2, '0')}`;
    
    const nextProgress = this.getModuleProgress(nextModuleId);
    if (nextProgress.status === 'locked') {
      this.set(`progress.${nextModuleId}.status`, 'available');
    }
  }
  
  getPhaseProgress(phaseId) {
    // Calcular progreso de fase basado en módulos
    const phaseModules = this.getPhaseModules(phaseId);
    if (!phaseModules.length) return { completed: 0, total: 0, percentage: 0 };
    
    let completed = 0;
    for (const moduleId of phaseModules) {
      const progress = this.getModuleProgress(moduleId);
      if (progress.status === 'completed' || progress.status === 'mastery') {
        completed++;
      }
    }
    
    return {
      completed,
      total: phaseModules.length,
      percentage: Math.round((completed / phaseModules.length) * 100)
    };
  }
  
  getPhaseModules(phaseId) {
    // Mapeo fase -> módulos (simplificado)
    const phaseModuleMap = {
      0: ['m01', 'm02', 'm03', 'm04', 'm05'],
      1: ['m06', 'm07', 'm08', 'm09', 'm10', 'm11', 'm12', 'm13'],
      2: ['m14', 'm15', 'm16', 'm17', 'm18', 'm19', 'm20', 'm21', 'm22'],
      3: ['m23', 'm24', 'm25', 'm26', 'm27'],
      4: ['m28', 'm29', 'm30', 'm31', 'm32', 'm33', 'm34', 'm35'],
      5: ['m36', 'm37', 'm38', 'm39', 'm40'],
      6: ['m41', 'm42', 'm43', 'm44', 'm45', 'm46']
    };
    
    return phaseModuleMap[phaseId] || [];
  }
  
  checkPhaseComplete(phaseId) {
    const progress = this.getPhaseProgress(phaseId);
    if (progress.percentage === 100) {
      eventBus.emit(EventTypes.PHASE_COMPLETE, { phaseId });
      this.addXP(500, `phase-${phaseId}`);
      return true;
    }
    return false;
  }
  
  getCourseProgress() {
    const allModules = Object.keys(this.state.progress);
    if (!allModules.length) return { completed: 0, total: 0, percentage: 0 };
    
    let completed = 0;
    for (const moduleId of allModules) {
      const progress = this.state.progress[moduleId];
      if (progress.status === 'completed' || progress.status === 'mastery') {
        completed++;
      }
    }
    
    return {
      completed,
      total: allModules.length,
      percentage: Math.round((completed / allModules.length) * 100)
    };
  }
  
  // --- Quiz ---
  
  recordQuizAttempt(attempt) {
    const id = attempt.id || crypto.randomUUID();
    const fullAttempt = {
      id,
      ...attempt,
      startedAt: attempt.startedAt || Date.now(),
      completedAt: attempt.completedAt || Date.now()
    };
    
    this.state.quizAttempts.push(fullAttempt);
    this.dirty = true;
    
    // Actualizar progreso del módulo
    const progress = this.getModuleProgress(attempt.moduleId);
    this.set(`progress.${attempt.moduleId}.quizAttempts`, progress.quizAttempts + 1);
    this.set(`progress.${attempt.moduleId}.quizScore`, attempt.score);
    this.set(`progress.${attempt.moduleId}.bestScore`, Math.max(progress.bestScore, attempt.score));
    this.set(`progress.${attempt.moduleId}.sections.quiz.completed`, true);
    this.set(`progress.${attempt.moduleId}.sections.quiz.score`, attempt.score);
    this.set(`progress.${attempt.moduleId}.sections.quiz.attempts`, progress.quizAttempts + 1);
    
    // XP basado en score
    const xpEarned = Math.round(attempt.score * 2);
    this.addXP(xpEarned, `quiz-${attempt.moduleId}`);
    
    eventBus.emit(EventTypes.QUIZ_COMPLETE, fullAttempt);
    
    // Verificar completitud del módulo
    this.completeModuleSection(attempt.moduleId, 'quiz');
    
    return fullAttempt;
  }
  
  getQuizStats(moduleId) {
    const attempts = this.state.quizAttempts.filter(a => a.moduleId === moduleId);
    if (!attempts.length) return null;
    
    const scores = attempts.map(a => a.score);
    return {
      attempts: attempts.length,
      bestScore: Math.max(...scores),
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      lastScore: scores[scores.length - 1],
      lastAttempt: attempts[attempts.length - 1].completedAt
    };
  }
  
  // --- Repaso Espaciado (SM-2) ---
  
  addToReviewQueue(item) {
    const existing = this.state.reviewQueue.find(r => r.id === item.id);
    if (existing) return existing;
    
    const reviewItem = {
      id: item.id,
      moduleId: item.moduleId,
      questionId: item.questionId,
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
      dueDate: Date.now() + 24 * 60 * 60 * 1000, // 1 día
      lastReviewed: null,
      history: [],
      difficulty: item.difficulty || 1.0
    };
    
    this.state.reviewQueue.push(reviewItem);
    this.dirty = true;
    
    return reviewItem;
  }
  
  getDueReviews() {
    const now = Date.now();
    return this.state.reviewQueue
      .filter(item => item.dueDate <= now)
      .sort((a, b) => a.dueDate - b.dueDate);
  }
  
  gradeReviewItem(itemId, grade) {
    const item = this.state.reviewQueue.find(r => r.id === itemId);
    if (!item) return null;
    
    // Algoritmo SM-2 modificado
    const grades = { again: 0, hard: 3, good: 4, easy: 5 };
    const q = grades[grade] || 0;
    
    if (q < 3) {
      // Respuesta incorrecta - reiniciar
      item.repetitions = 0;
      item.interval = 1;
    } else {
      // Respuesta correcta
      if (item.repetitions === 0) {
        item.interval = 1;
      } else if (item.repetitions === 1) {
        item.interval = 6;
      } else {
        item.interval = Math.round(item.interval * item.easeFactor);
      }
      item.repetitions++;
    }
    
    // Ajustar ease factor
    item.easeFactor = Math.max(1.3, item.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    
    // Aplicar modificador de dificultad del tema
    const difficultyMod = item.difficulty || 1.0;
    item.interval = Math.round(item.interval * difficultyMod);
    
    // Próxima fecha
    item.dueDate = Date.now() + item.interval * 24 * 60 * 60 * 1000;
    item.lastReviewed = Date.now();
    item.history.push({ grade, timestamp: Date.now(), easeFactor: item.easeFactor, interval: item.interval });
    
    this.dirty = true;
    eventBus.emit(EventTypes.REVIEW_GRADE, { item, grade });
    
    return item;
  }
  
  getReviewStats() {
    const now = Date.now();
    const due = this.state.reviewQueue.filter(r => r.dueDate <= now).length;
    const upcoming = this.state.reviewQueue.filter(r => r.dueDate > now && r.dueDate <= now + 7 * 24 * 60 * 60 * 1000).length;
    
    return {
      total: this.state.reviewQueue.length,
      due,
      upcoming,
      overdue: this.state.reviewQueue.filter(r => r.dueDate < now - 24 * 60 * 60 * 1000).length
    };
  }
  
  // --- Certificados ---
  
  earnCertificate(certificate) {
    const id = certificate.id || `cert-${Date.now()}`;
    const verificationHash = this.generateVerificationHash(id, certificate);
    
    const fullCert = {
      id,
      ...certificate,
      earnedAt: Date.now(),
      verificationHash,
      template: certificate.template || 'elegant'
    };
    
    this.state.certificates.push(fullCert);
    this.dirty = true;
    
    eventBus.emit(EventTypes.CERTIFICATE_EARNED, fullCert);
    
    return fullCert;
  }
  
  getCertificate(id) {
    return this.state.certificates.find(c => c.id === id);
  }
  
  getCertificatesByType(type) {
    return this.state.certificates.filter(c => c.type === type);
  }
  
  verifyCertificate(hash) {
    const cert = this.state.certificates.find(c => c.verificationHash === hash);
    return cert ? { valid: true, certificate: cert } : { valid: false };
  }
  
  generateVerificationHash(id, data) {
    const str = `${id}:${data.type}:${data.moduleId || ''}:${data.earnedAt}:${data.studentName || ''}:matematicas-avanzadas-2026`;
    // En producción usar crypto.subtle.digest('SHA-256', ...)
    // Aquí versión simple para demo
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return `sha256:${Math.abs(hash).toString(16).padStart(16, '0')}`;
  }
  
  // --- Configuración ---
  
  setSetting(key, value) {
    this.set(`settings.${key}`, value);
    this.set(`user.preferences.${key}`, value);
    
    if (key === 'theme') {
      document.documentElement.dataset.theme = value;
    } else if (key === 'reducedMotion') {
      document.documentElement.classList.toggle('reduce-motion', value);
    }
  }
  
  getSetting(key) {
    return this.state.settings[key];
  }
  
  // --- Analytics ---
  
  trackEvent(type, data) {
    const event = {
      type,
      data,
      timestamp: Date.now(),
      route: this.state.ui.currentRoute,
      userAgent: navigator.userAgent
    };
    
    this.state.analytics.sessions.push(event);
    
    // Mantener solo últimos 1000 eventos
    if (this.state.analytics.sessions.length > 1000) {
      this.state.analytics.sessions = this.state.analytics.sessions.slice(-1000);
    }
    
    this.dirty = true;
  }
  
  trackModuleView(moduleId) {
    this.state.analytics.moduleViews[moduleId] = (this.state.analytics.moduleViews[moduleId] || 0) + 1;
    this.dirty = true;
  }
  
  trackTimeSpent(moduleId, milliseconds) {
    this.state.analytics.timeSpent[moduleId] = (this.state.analytics.timeSpent[moduleId] || 0) + milliseconds;
    this.dirty = true;
  }
  
  // --- Utilidades ---
  
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  
  // Exportar todos los datos (para backup)
  exportData() {
    return {
      version: DB_VERSION,
      exportedAt: Date.now(),
      user: this.state.user,
      progress: this.state.progress,
      quizAttempts: this.state.quizAttempts,
      reviewQueue: this.state.reviewQueue,
      certificates: this.state.certificates,
      settings: this.state.settings,
      analytics: this.state.analytics
    };
  }
  
  // Importar datos (desde backup)
  async importData(data) {
    if (!data || data.version !== DB_VERSION) {
      throw new Error('Versión de datos incompatible');
    }
    
    this.state.user = { ...this.state.user, ...data.user };
    this.state.progress = data.progress || {};
    this.state.quizAttempts = data.quizAttempts || [];
    this.state.reviewQueue = data.reviewQueue || [];
    this.state.certificates = data.certificates || [];
    this.state.settings = { ...this.state.settings, ...data.settings };
    this.state.analytics = data.analytics || this.state.analytics;
    
    this.dirty = true;
    await this.saveToDB(true);
    this.applyPreferences();
    
    eventBus.emit(EventTypes.DATA_IMPORT, { data });
  }
  
  // Limpiar todo (reset)
  async clearAll() {
    this.state = this.deepClone(INITIAL_STATE);
    this.dirty = true;
    
    if (this.db) {
      const tx = this.db.transaction(Object.values(STORES), 'readwrite');
      await Promise.all(Object.values(STORES).map(store => tx.objectStore(store).clear()));
      await tx.done;
    }
    
    eventBus.emit(EventTypes.USER_LOGOUT, {});
  }
  
  debug = false;
}

// Instancia global
export const store = new Store();

export default store;