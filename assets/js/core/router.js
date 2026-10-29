/* ==========================================================================
   CORE ROUTER - Matemáticas Avanzadas
   Router hash-based ligero con historial, guards y lazy loading
   ========================================================================== */

import { eventBus, EventTypes } from './events.js';
import { store } from './store.js';

/* ==========================================================================
   DEFINICIÓN DE RUTAS
   ========================================================================== */
export const Routes = {
  // Rutas principales
  HOME: '/',
  DASHBOARD: '/dashboard',
  DIAGNOSTIC: '/diagnostic',
  ONBOARDING: '/onboarding',
  
  // Fases
  PHASE: '/phase/:phaseId',
  PHASE_OVERVIEW: '/phase/:phaseId/overview',
  
  // Módulos
  MODULE: '/module/:moduleId',
  MODULE_THEORY: '/module/:moduleId/theory',
  MODULE_PRACTICE: '/module/:moduleId/practice',
  MODULE_QUIZ: '/module/:moduleId/quiz',
  MODULE_INTERACTIVE: '/module/:moduleId/interactive',
  MODULE_SUMMARY: '/module/:moduleId/summary',
  
  // Progreso y certificados
  PROGRESS: '/progress',
  CERTIFICATES: '/certificates',
  CERTIFICATE_VIEW: '/certificate/:certificateId',
  CERTIFICATE_VERIFY: '/verify/:hash',
  
  // Repaso espaciado
  REVIEW: '/review',
  REVIEW_SESSION: '/review/session',
  
  // Configuración
  SETTINGS: '/settings',
  SETTINGS_ACCOUNT: '/settings/account',
  SETTINGS_PREFERENCES: '/settings/preferences',
  SETTINGS_DATA: '/settings/data',
  
  // Búsqueda
  SEARCH: '/search',
  
  // 404
  NOT_FOUND: '/404'
};

/* ==========================================================================
   PATRONES DE RUTA
   ========================================================================== */
const routePatterns = new Map([
  [Routes.HOME, /^\/$/],
  [Routes.DASHBOARD, /^\/dashboard$/],
  [Routes.DIAGNOSTIC, /^\/diagnostic$/],
  [Routes.ONBOARDING, /^\/onboarding$/],
  [Routes.PHASE_OVERVIEW, /^\/phase\/(\d+)\/overview$/],
  [Routes.PHASE, /^\/phase\/(\d+)$/],
  [Routes.MODULE_THEORY, /^\/module\/([a-z0-9-]+)\/theory$/],
  [Routes.MODULE_PRACTICE, /^\/module\/([a-z0-9-]+)\/practice$/],
  [Routes.MODULE_QUIZ, /^\/module\/([a-z0-9-]+)\/quiz$/],
  [Routes.MODULE_INTERACTIVE, /^\/module\/([a-z0-9-]+)\/interactive$/],
  [Routes.MODULE_SUMMARY, /^\/module\/([a-z0-9-]+)\/summary$/],
  [Routes.MODULE, /^\/module\/([a-z0-9-]+)$/],
  [Routes.PROGRESS, /^\/progress$/],
  [Routes.CERTIFICATES, /^\/certificates$/],
  [Routes.CERTIFICATE_VIEW, /^\/certificate\/([a-z0-9-]+)$/],
  [Routes.CERTIFICATE_VERIFY, /^\/verify\/([a-z0-9:]+)$/],
  [Routes.REVIEW, /^\/review$/],
  [Routes.REVIEW_SESSION, /^\/review\/session$/],
  [Routes.SETTINGS, /^\/settings$/],
  [Routes.SETTINGS_ACCOUNT, /^\/settings\/account$/],
  [Routes.SETTINGS_PREFERENCES, /^\/settings\/preferences$/],
  [Routes.SETTINGS_DATA, /^\/settings\/data$/],
  [Routes.SEARCH, /^\/search$/]
]);

/* ==========================================================================
   ROUTE MATCHER
   ========================================================================== */
function matchRoute(pathname) {
  // Normalizar path
  const normalized = pathname.split('?')[0].split('#')[0] || '/';
  
  for (const [routeName, pattern] of routePatterns) {
    const match = normalized.match(pattern);
    if (match) {
      const params = {};
      // Extraer parámetros nombrados del pattern original
      const paramNames = routeName.match(/:([a-zA-Z]+)/g) || [];
      paramNames.forEach((param, index) => {
        const name = param.slice(1);
        params[name] = match[index + 1];
      });
      return { route: routeName, params, path: normalized };
    }
  }
  
  return { route: Routes.NOT_FOUND, params: {}, path: normalized };
}

/* ==========================================================================
   ROUTE GUARDS
   ========================================================================== */
const guards = [];

export function addGuard(guard) {
  guards.push(guard);
}

export function removeGuard(guard) {
  const index = guards.indexOf(guard);
  if (index > -1) guards.splice(index, 1);
}

async function runGuards(to, from) {
  for (const guard of guards) {
    const result = await guard(to, from);
    if (result === false) return false;
    if (typeof result === 'string') return result; // Redirect
  }
  return true;
}

/* ==========================================================================
   ROUTER CLASS
   ========================================================================== */
export class Router {
  constructor(options = {}) {
    this.base = options.base || '';
    this.routes = new Map();
    this.currentRoute = null;
    this.previousRoute = null;
    this.listeners = new Set();
    this.isNavigating = false;
    this.scrollPositions = new Map();
    
    // Registrar guards por defecto
    this.setupDefaultGuards();
  }
  
  setupDefaultGuards() {
    // Guard: Verificar autenticación para rutas protegidas
    addGuard(async (to) => {
      const protectedRoutes = [
        Routes.DASHBOARD, Routes.PROGRESS, Routes.CERTIFICATES,
        Routes.REVIEW, Routes.SETTINGS, Routes.MODULE, Routes.PHASE
      ];
      
      if (protectedRoutes.includes(to.route)) {
        const user = store.get('user');
        if (!user.id) {
          // Guardar ruta intentada para redirigir después
          sessionStorage.setItem('redirectAfterLogin', to.path);
          return Routes.ONBOARDING;
        }
      }
      return true;
    });
    
    // Guard: Verificar prerrequisitos de módulo
    addGuard(async (to) => {
      if (to.route === Routes.MODULE || 
          to.route === Routes.MODULE_THEORY ||
          to.route === Routes.MODULE_PRACTICE ||
          to.route === Routes.MODULE_QUIZ ||
          to.route === Routes.MODULE_INTERACTIVE) {
        
        const moduleId = to.params.moduleId;
        const progress = store.getModuleProgress(moduleId);
        
        if (progress.status === 'locked') {
          // Redirigir a vista previa o fase anterior
          return Routes.PHASE_OVERVIEW.replace(':phaseId', this.getModulePhase(moduleId));
        }
      }
      return true;
    });
  }
  
  getModulePhase(moduleId) {
    const match = moduleId.match(/m(\d+)/);
    if (!match) return 0;
    const num = parseInt(match[1]);
    if (num <= 5) return 0;
    if (num <= 13) return 1;
    if (num <= 22) return 2;
    if (num <= 27) return 3;
    if (num <= 35) return 4;
    if (num <= 40) return 5;
    return 6;
  }
  
  /**
   * Registrar handler para una ruta
   */
  on(routeName, handler) {
    this.routes.set(routeName, handler);
  }
  
  /**
   * Iniciar router
   */
  start() {
    window.addEventListener('hashchange', () => this.handleHashChange());
    window.addEventListener('popstate', () => this.handlePopState());
    
    // Manejar hash inicial
    this.handleHashChange();
  }
  
  /**
   * Navegar a una ruta
   */
  async navigate(to, options = {}) {
    if (this.isNavigating) return false;
    
    const from = this.currentRoute ? { ...this.currentRoute } : null;
    const targetPath = typeof to === 'string' ? to : this.buildPath(to);
    
    // Guardar scroll position
    if (from) {
      this.scrollPositions.set(from.path, window.scrollY);
    }
    
    this.isNavigating = true;
    
    try {
      // Ejecutar guards
      const toRoute = matchRoute(targetPath);
      const guardResult = await runGuards(toRoute, from);
      
      if (guardResult === false) {
        this.isNavigating = false;
        return false;
      }
      
      if (typeof guardResult === 'string') {
        // Redirect
        return this.navigate(guardResult, { replace: true });
      }
      
      // Actualizar hash
      const hash = this.base + targetPath;
      
      if (options.replace) {
        history.replaceState(null, '', hash);
      } else {
        history.pushState(null, '', hash);
      }
      
      // Procesar nueva ruta
      await this.processRoute(toRoute, from);
      
      return true;
    } catch (error) {
      console.error('[Router] Navigation error:', error);
      this.isNavigating = false;
      return false;
    }
  }
  
  /**
   * Construir path desde objeto ruta
   */
  buildPath(route) {
    if (typeof route === 'string') return route;
    
    let path = route.name || route.route;
    if (route.params) {
      for (const [key, value] of Object.entries(route.params)) {
        path = path.replace(`:${key}`, value);
      }
    }
    return path;
  }
  
  /**
   * Manejar cambio de hash
   */
  async handleHashChange() {
    const hash = window.location.hash.slice(1) || '/';
    const route = matchRoute(hash);
    await this.processRoute(route, this.currentRoute);
  }
  
  /**
   * Manejar popstate (botón atrás/adelante)
   */
  async handlePopState() {
    const hash = window.location.hash.slice(1) || '/';
    const route = matchRoute(hash);
    await this.processRoute(route, this.currentRoute, true);
  }
  
  /**
   * Procesar ruta y ejecutar handler
   */
  async processRoute(route, from, isPopState = false) {
    const previousRoute = this.currentRoute;
    this.currentRoute = route;
    this.previousRoute = previousRoute;
    
    // Actualizar store
    store.set('ui.currentRoute', route.path);
    store.set('ui.previousRoute', previousRoute?.path || null);
    
    // Restaurar scroll position si es popstate
    if (isPopState && previousRoute) {
      const scrollY = this.scrollPositions.get(route.path) || 0;
      requestAnimationFrame(() => window.scrollTo(0, scrollY));
    } else {
      window.scrollTo(0, 0);
    }
    
    // Ejecutar handler
    const handler = this.routes.get(route.route);
    if (handler) {
      try {
        await handler(route, from);
      } catch (error) {
        console.error(`[Router] Handler error for ${route.route}:`, error);
        this.navigate(Routes.NOT_FOUND);
        return;
      }
    } else {
      console.warn(`[Router] No handler for route: ${route.route}`);
    }
    
    // Emitir evento
    eventBus.emit(EventTypes.ROUTE_CHANGE, { route, from: previousRoute });
    
    // Notificar listeners
    this.listeners.forEach(cb => {
      try { cb(route, previousRoute); } catch (e) { console.error(e); }
    });
    
    this.isNavigating = false;
  }
  
  /**
   * Suscribirse a cambios de ruta
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
  
  /**
   * Obtener ruta actual
   */
  getCurrentRoute() {
    return this.currentRoute;
  }
  
  /**
   * Ir atrás en el historial
   */
  back() {
    history.back();
  }
  
  /**
   * Ir adelante en el historial
   */
  forward() {
    history.forward();
  }
  
  /**
   * Recargar ruta actual
   */
  reload() {
    if (this.currentRoute) {
      this.processRoute(this.currentRoute, this.previousRoute);
    }
  }
  
  /**
   * Generar URL completa para una ruta
   */
  getUrl(routeName, params = {}) {
    let path = routeName;
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, value);
    }
    return `${window.location.origin}${this.base}#${path}`;
  }
}

// Instancia global
export const router = new Router({ base: '/Curso-completo-de-matematica-avanzada/' });

export default router;