/* ==========================================================================
   CORE EVENT BUS - Matemáticas Avanzadas
   Sistema de eventos tipado para comunicación desacoplada
   ========================================================================== */

// Tipos de eventos del sistema
export const EventTypes = {
  // Navegación
  ROUTE_CHANGE: 'route:change',
  ROUTE_BEFORE_CHANGE: 'route:beforeChange',
  
  // Usuario/Progreso
  USER_LOGIN: 'user:login',
  USER_LOGOUT: 'user:logout',
  USER_PROGRESS_UPDATE: 'user:progressUpdate',
  USER_STREAK_UPDATE: 'user:streakUpdate',
  USER_XP_GAIN: 'user:xpGain',
  USER_LEVEL_UP: 'user:levelUp',
  
  // Módulos/Lecciones
  MODULE_START: 'module:start',
  MODULE_COMPLETE: 'module:complete',
  MODULE_MASTERY: 'module:mastery',
  PHASE_COMPLETE: 'phase:complete',
  COURSE_COMPLETE: 'course:complete',
  
  // Quiz/Práctica
  QUIZ_START: 'quiz:start',
  QUIZ_ANSWER: 'quiz:answer',
  QUIZ_COMPLETE: 'quiz:complete',
  QUIZ_HINT_USED: 'quiz:hintUsed',
  PRACTICE_COMPLETE: 'practice:complete',
  
  // Repaso espaciado
  REVIEW_DUE: 'review:due',
  REVIEW_COMPLETE: 'review:complete',
  REVIEW_GRADE: 'review:grade',
  
  // Certificados
  CERTIFICATE_EARNED: 'certificate:earned',
  CERTIFICATE_VERIFY: 'certificate:verify',
  
  // UI
  TOAST_SHOW: 'toast:show',
  MODAL_OPEN: 'modal:open',
  MODAL_CLOSE: 'modal:close',
  SIDEBAR_TOGGLE: 'sidebar:toggle',
  THEME_CHANGE: 'theme:change',
  SEARCH_QUERY: 'search:query',
  
  // Datos
  DATA_LOAD: 'data:load',
  DATA_SAVE: 'data:save',
  DATA_EXPORT: 'data:export',
  DATA_IMPORT: 'data:import',
  
  // Errores
  ERROR: 'error',
  WARNING: 'warning'
};

/**
 * EventBus - Sistema de eventos tipado con suscripción/desuscripción
 * Permite comunicación desacoplada entre componentes
 */
export class EventBus {
  constructor() {
    this.listeners = new Map();
    this.onceListeners = new Map();
    this.debug = false;
  }
  
  /**
   * Suscribirse a un evento
   * @param {string} event - Tipo de evento
   * @param {Function} callback - Función a ejecutar
   * @param {Object} options - Opciones (once: boolean)
   * @returns {Function} Función para desuscribirse
   */
  on(event, callback, options = {}) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    const listener = { callback, once: options.once === true };
    this.listeners.get(event).add(listener);
    
    if (this.debug) {
      console.log(`[EventBus] Subscribed to "${event}"`, callback.name || 'anonymous');
    }
    
    // Retornar función de limpieza
    return () => this.off(event, callback);
  }
  
  /**
   * Suscribirse una sola vez
   */
  once(event, callback) {
    return this.on(event, callback, { once: true });
  }
  
  /**
   * Desuscribirse de un evento
   */
  off(event, callback) {
    if (!this.listeners.has(event)) return false;
    
    const listeners = this.listeners.get(event);
    for (const listener of listeners) {
      if (listener.callback === callback) {
        listeners.delete(listener);
        if (this.debug) {
          console.log(`[EventBus] Unsubscribed from "${event}"`, callback.name || 'anonymous');
        }
        return true;
      }
    }
    return false;
  }
  
  /**
   * Emitir evento
   * @param {string} event - Tipo de evento
   * @param {*} data - Datos a pasar a los listeners
   * @returns {Promise<void>} Promesa que se resuelve cuando todos los listeners terminan
   */
  async emit(event, data) {
    if (!this.listeners.has(event)) return;
    
    const listeners = [...this.listeners.get(event)];
    const promises = [];
    
    for (const listener of listeners) {
      try {
        const result = listener.callback(data);
        if (result instanceof Promise) {
          promises.push(result);
        }
        
        // Si es listener "once", remover después de ejecutar
        if (listener.once) {
          this.off(event, listener.callback);
        }
      } catch (error) {
        console.error(`[EventBus] Error in listener for "${event}":`, error);
        this.emit(EventTypes.ERROR, { source: event, error, data });
      }
    }
    
    if (promises.length > 0) {
      await Promise.allSettled(promises);
    }
    
    if (this.debug) {
      console.log(`[EventBus] Emitted "${event}"`, data);
    }
  }
  
  /**
   * Emitir evento síncrono (no espera promises)
   */
  emitSync(event, data) {
    if (!this.listeners.has(event)) return;
    
    const listeners = [...this.listeners.get(event)];
    
    for (const listener of listeners) {
      try {
        listener.callback(data);
        if (listener.once) {
          this.off(event, listener.callback);
        }
      } catch (error) {
        console.error(`[EventBus] Error in listener for "${event}":`, error);
        this.emit(EventTypes.ERROR, { source: event, error, data });
      }
    }
  }
  
  /**
   * Limpiar todos los listeners de un evento
   */
  clear(event) {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
  
  /**
   * Obtener cantidad de listeners para un evento
   */
  listenerCount(event) {
    return this.listeners.has(event) ? this.listeners.get(event).size : 0;
  }
  
  /**
   * Habilitar/deshabilitar debug
   */
  setDebug(enabled) {
    this.debug = enabled;
  }
}

// Instancia global del event bus
export const eventBus = new EventBus();

// Helper para crear eventos tipados
export function createEvent(type, data) {
  return { type, data, timestamp: Date.now() };
}

// Middleware para logging (opcional)
export function withLogging(eventBus) {
  const originalEmit = eventBus.emit.bind(eventBus);
  const originalEmitSync = eventBus.emitSync.bind(eventBus);
  
  eventBus.emit = async (event, data) => {
    console.group(`[Event] ${event}`);
    console.log('Data:', data);
    console.groupEnd();
    return originalEmit(event, data);
  };
  
  eventBus.emitSync = (event, data) => {
    console.group(`[Event Sync] ${event}`);
    console.log('Data:', data);
    console.groupEnd();
    return originalEmitSync(event, data);
  };
  
  return eventBus;
}

export default eventBus;