/* ==========================================================================
   STORAGE UTILITY - Matemáticas Avanzadas
   Wrapper IndexedDB (idb) con API simple y reactiva
   ========================================================================== */

import { openDB } from 'idb';

/* ==========================================================================
   CONFIGURACIÓN DE BASE DE DATOS
   ========================================================================== */
const DB_NAME = 'matematicas-avanzadas-storage';
const DB_VERSION = 1;

const STORE_CONFIGS = {
  userData: { keyPath: 'key' },
  progress: { keyPath: 'moduleId', indexes: ['status', 'phaseId'] },
  quizHistory: { keyPath: 'id', indexes: ['moduleId', 'timestamp'] },
  reviewQueue: { keyPath: 'id', indexes: ['dueDate', 'moduleId', 'topic'] },
  certificates: { keyPath: 'id', indexes: ['type', 'earnedAt'] },
  settings: { keyPath: 'key' },
  analytics: { keyPath: 'id', autoIncrement: true, indexes: ['type', 'timestamp'] },
  cache: { keyPath: 'key', indexes: ['expiresAt'] }
};

/* ==========================================================================
   CONEXIÓN A BD
   ========================================================================== */
let dbPromise = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        for (const [storeName, config] of Object.entries(STORE_CONFIGS)) {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, config);
            if (config.indexes) {
              config.indexes.forEach(indexName => {
                store.createIndex(indexName, indexName);
              });
            }
          }
        }
      }
    });
  }
  return dbPromise;
}

/* ==========================================================================
   API DE ALMACENAMIENTO
   ========================================================================== */

export const Storage = {
  /**
   * Obtener valor por clave
   */
  async get(storeName, key) {
    const db = await getDB();
    return db.get(storeName, key);
  },
  
  /**
   * Obtener todos los valores de un store
   */
  async getAll(storeName, indexName, query) {
    const db = await getDB();
    if (indexName) {
      return db.getAllFromIndex(storeName, indexName, query);
    }
    return db.getAll(storeName);
  },
  
  /**
   * Guardar valor
   */
  async set(storeName, value) {
    const db = await getDB();
    return db.put(storeName, value);
  },
  
  /**
   * Guardar múltiples valores
   */
  async setMany(storeName, values) {
    const db = await getDB();
    const tx = db.transaction(storeName, 'readwrite');
    await Promise.all(values.map(v => tx.store.put(v)));
    return tx.done;
  },
  
  /**
   * Eliminar valor
   */
  async delete(storeName, key) {
    const db = await getDB();
    return db.delete(storeName, key);
  },
  
  /**
   * Limpiar store completo
   */
  async clear(storeName) {
    const db = await getDB();
    return db.clear(storeName);
  },
  
  /**
   * Contar elementos
   */
  async count(storeName, indexName, query) {
    const db = await getDB();
    if (indexName) {
      return db.countFromIndex(storeName, indexName, query);
    }
    return db.count(storeName);
  },
  
  /**
   * Buscar con cursor (para consultas complejas)
   */
  async cursor(storeName, callback, options = {}) {
    const db = await getDB();
    const tx = db.transaction(storeName, options.write ? 'readwrite' : 'readonly');
    const store = options.index ? tx.store.index(options.index) : tx.store;
    const cursor = await store.openCursor(options.range, options.direction);
    
    while (cursor) {
      const result = callback(cursor.value, cursor);
      if (result === false) break;
      if (result && typeof result === 'object' && result.continue !== undefined) {
        if (result.continue) cursor.continue();
      } else {
        cursor.continue();
      }
    }
    
    return tx.done;
  },
  
  /* ==========================================================================
     MÉTODOS ESPECIALIZADOS
     ========================================================================== */
  
  // User Data
  async getUserData(key) {
    return this.get('userData', key);
  },
  
  async setUserData(key, value) {
    return this.set('userData', { key, value, updatedAt: Date.now() });
  },
  
  // Progress
  async getModuleProgress(moduleId) {
    return this.get('progress', moduleId);
  },
  
  async setModuleProgress(moduleId, progress) {
    return this.set('progress', { moduleId, ...progress, updatedAt: Date.now() });
  },
  
  async getAllProgress() {
    return this.getAll('progress');
  },
  
  async getProgressByStatus(status) {
    return this.getAll('progress', 'status', status);
  },
  
  async getProgressByPhase(phaseId) {
    return this.getAll('progress', 'phaseId', phaseId);
  },
  
  // Quiz History
  async addQuizAttempt(attempt) {
    return this.set('quizHistory', {
      id: attempt.id || crypto.randomUUID(),
      ...attempt,
      timestamp: attempt.timestamp || Date.now()
    });
  },
  
  async getQuizHistory(moduleId, limit = 50) {
    const db = await getDB();
    const tx = db.transaction('quizHistory', 'readonly');
    const index = tx.store.index('moduleId');
    const cursor = await index.openCursor(IDBKeyRange.only(moduleId), 'prev');
    
    const results = [];
    while (cursor && results.length < limit) {
      results.push(cursor.value);
      cursor.continue();
    }
    await tx.done;
    return results;
  },
  
  // Review Queue
  async addReviewItem(item) {
    return this.set('reviewQueue', {
      id: item.id || crypto.randomUUID(),
      ...item,
      createdAt: item.createdAt || Date.now()
    });
  },
  
  async updateReviewItem(item) {
    return this.set('reviewQueue', item);
  },
  
  async getDueReviews() {
    const now = Date.now();
    return this.getAll('reviewQueue', 'dueDate', IDBKeyRange.upperBound(now));
  },
  
  async getReviewQueue() {
    return this.getAll('reviewQueue');
  },
  
  async getReviewsByModule(moduleId) {
    return this.getAll('reviewQueue', 'moduleId', moduleId);
  },
  
  async getReviewsByTopic(topic) {
    return this.getAll('reviewQueue', 'topic', topic);
  },
  
  async deleteReviewItem(id) {
    return this.delete('reviewQueue', id);
  },
  
  // Certificates
  async addCertificate(cert) {
    return this.set('certificates', {
      id: cert.id || crypto.randomUUID(),
      ...cert,
      earnedAt: cert.earnedAt || Date.now()
    });
  },
  
  async getCertificate(id) {
    return this.get('certificates', id);
  },
  
  async getCertificatesByType(type) {
    return this.getAll('certificates', 'type', type);
  },
  
  async getAllCertificates() {
    return this.getAll('certificates');
  },
  
  async verifyCertificate(hash) {
    const certs = await this.getAll('certificates');
    return certs.find(c => c.verificationHash === hash) || null;
  },
  
  // Settings
  async getSetting(key) {
    const item = await this.get('settings', key);
    return item?.value;
  },
  
  async setSetting(key, value) {
    return this.set('settings', { key, value, updatedAt: Date.now() });
  },
  
  async getAllSettings() {
    const items = await this.getAll('settings');
    return items.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  },
  
  // Analytics
  async addAnalyticsEvent(event) {
    return this.set('analytics', {
      ...event,
      timestamp: event.timestamp || Date.now(),
      id: undefined // autoIncrement
    });
  },
  
  async getAnalyticsEvents(type, limit = 1000) {
    const db = await getDB();
    const tx = db.transaction('analytics', 'readonly');
    const index = tx.store.index('type');
    const cursor = await index.openCursor(IDBKeyRange.only(type), 'prev');
    
    const results = [];
    while (cursor && results.length < limit) {
      results.push(cursor.value);
      cursor.continue();
    }
    await tx.done;
    return results;
  },
  
  // Cache con expiración
  async setCache(key, value, ttlMs = 24 * 60 * 60 * 1000) {
    return this.set('cache', {
      key,
      value,
      createdAt: Date.now(),
      expiresAt: Date.now() + ttlMs
    });
  },
  
  async getCache(key) {
    const item = await this.get('cache', key);
    if (!item) return null;
    
    if (item.expiresAt < Date.now()) {
      await this.delete('cache', key);
      return null;
    }
    
    return item.value;
  },
  
  async clearExpiredCache() {
    const now = Date.now();
    return this.cursor('cache', (value, cursor) => {
      if (value.expiresAt < now) {
        cursor.delete();
      }
    }, { index: 'expiresAt', range: IDBKeyRange.upperBound(now), write: true });
  },
  
  /* ==========================================================================
     UTILIDADES
     ========================================================================== */
  
  async exportAllData() {
    const data = {};
    for (const storeName of Object.keys(STORE_CONFIGS)) {
      data[storeName] = await this.getAll(storeName);
    }
    return {
      version: DB_VERSION,
      exportedAt: Date.now(),
      data
    };
  },
  
  async importAllData(importData) {
    if (!importData || importData.version !== DB_VERSION) {
      throw new Error('Versión de datos incompatible');
    }
    
    const db = await getDB();
    const tx = db.transaction(Object.keys(STORE_CONFIGS), 'readwrite');
    
    for (const [storeName, items] of Object.entries(importData.data)) {
      if (Array.isArray(items)) {
        const store = tx.objectStore(storeName);
        await Promise.all(items.map(item => store.put(item)));
      }
    }
    
    return tx.done;
  },
  
  async close() {
    if (dbPromise) {
      const db = await dbPromise;
      db.close();
      dbPromise = null;
    }
  }
};

/* ==========================================================================
   REACTIVE STORAGE (Proxy para reactividad)
   ========================================================================== */

export function createReactiveStorage(initialData = {}) {
  const listeners = new Map();
  const data = { ...initialData };
  
  const proxy = new Proxy(data, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      const oldValue = target[prop];
      if (oldValue === value) return true;
      
      target[prop] = value;
      
      // Notificar listeners
      listeners.get(prop)?.forEach(cb => cb(value, oldValue));
      listeners.get('*')?.forEach(cb => cb(prop, value, oldValue));
      
      return true;
    }
  });
  
  proxy.subscribe = (key, callback) => {
    if (!listeners.has(key)) listeners.set(key, new Set());
    listeners.get(key).add(callback);
    return () => listeners.get(key)?.delete(callback);
  };
  
  proxy.unsubscribe = (key, callback) => {
    listeners.get(key)?.delete(callback);
  };
  
  return proxy;
}

export default Storage;