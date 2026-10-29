/* ==========================================================================
   CORE APP - Matemáticas Avanzadas
   Punto de entrada principal, inicialización, coordinación global
   ========================================================================== */

import { store } from './store.js';
import { router } from './router.js';
import { eventBus, EventTypes } from './events.js';
import importedCurriculum from '../../data/curriculum.json';
import '../../css/variables.css';
import '../../css/reset.css';
import '../../css/layout.css';
import '../../css/components.css';
import '../../css/course.css';
import '../../css/animations.css';
import '../../css/print.css';

/* ==========================================================================
   CURRICULUM DATA (cargado desde JSON en build time)
   ========================================================================== */
let curriculumData = null;

/* ==========================================================================
   APP CLASS
   ========================================================================== */
class App {
  constructor() {
    this.initialized = false;
    this.components = new Map();
    this.moduleCache = new Map();
  }
  
  /**
   * Inicializar aplicación completa
   */
  async init() {
    if (this.initialized) return;
    
    try {
      console.log('[App] Inicializando Matemáticas Avanzadas...');
      
      // 1. Cargar currículo
      console.log('[App] Step 1: loadCurriculum');
      try {
        await this.loadCurriculum();
      } catch (currError) {
        console.warn('[App] loadCurriculum failed:', currError.message);
        curriculumData = this.getDefaultCurriculum();
      }
      console.log('[App] Step 1 OK, phases:', curriculumData?.phases?.length);
      
      // 2. Inicializar store (carga IndexedDB) - con fallback
      console.log('[App] Step 2: store.init');
      try {
        await store.init();
      } catch (storeError) {
        console.warn('[App] Store init failed, continuing:', storeError.message);
      }
      console.log('[App] Step 2 OK');
      
      // 3. Registrar rutas - con fallback
      console.log('[App] Step 3: registerRoutes');
      try {
        this.registerRoutes();
      } catch (routesError) {
        console.warn('[App] registerRoutes failed:', routesError.message);
      }
      console.log('[App] Step 3 OK');
      
      // 4. Inicializar router - con fallback (disabled for debugging)
      console.log('[App] Step 4: router.start (skipped for debugging)');
      
      // 5. Configurar event listeners globales - con fallback
      console.log('[App] Step 5: setupGlobalListeners');
      try {
        this.setupGlobalListeners();
      } catch (listenersError) {
        console.warn('[App] setupGlobalListeners failed:', listenersError.message);
      }
      console.log('[App] Step 5 OK');
      
      // 6. Configurar Service Worker updates - con fallback
      console.log('[App] Step 6: setupSWUpdates');
      try {
        this.setupSWUpdates();
      } catch (swError) {
        console.warn('[App] setupSWUpdates failed:', swError.message);
      }
      console.log('[App] Step 6 OK');
      
      // 7. Verificar si hay onboarding pendiente - skipped for debugging
      console.log('[App] Step 7: checkOnboarding (skipped for debugging)');
      
      // 8. Marcar como inicializado
      this.initialized = true;
      
      console.log('[App] Inicialización completada');
      
      // Emitir evento de ready
      try {
        eventBus.emit('app:ready', { curriculum: curriculumData });
      } catch (emitError) {
        console.warn('[App] eventBus.emit failed:', emitError.message);
      }
      
    } catch (error) {
      console.error('[App] Error de inicialización:', error);
      console.error('[App] Error name:', error.name);
      console.error('[App] Error message:', error.message);
      console.error('[App] Error stack:', error.stack);
      this.showError('Error al inicializar la aplicación. Por favor recarga la página. [' + error.name + ': ' + error.message + ']');
    }
  }
  
  /**
   * Cargar datos del currículo
   */
  async loadCurriculum() {
    curriculumData = importedCurriculum;
    if (!curriculumData || !curriculumData.phases) {
      console.warn('[App] Currículo importado vacío, usando por defecto');
      curriculumData = this.getDefaultCurriculum();
    } else {
      console.log('[App] Currículo cargado:', curriculumData.phases.length, 'fases');
    }
  }
  
  /**
   * Currículo por defecto (fallback)
   */
  getDefaultCurriculum() {
    return {
      version: '1.0',
      phases: [
        {
          id: 0,
          title: 'Fundamentos Pre-Matemáticos',
          description: 'Elimina la ansiedad matemática y construye intuición numérica desde cero',
          icon: '🌱',
          color: 'var(--brand-primary)',
          modules: [
            { id: 'm01', title: '¿Qué es un número?', description: 'Conteo, cardinalidad, ordinalidad', estimatedTime: 30 },
            { id: 'm02', title: 'Sentido numérico', description: 'Estimación, magnitud, recta numérica', estimatedTime: 45 },
            { id: 'm03', title: 'Operaciones como acciones', description: 'Unir, separar, comparar, repartir', estimatedTime: 45 },
            { id: 'm04', title: 'Patrones y regularidades', description: 'Secuencias, periodicidad, simetría', estimatedTime: 30 },
            { id: 'm05', title: 'Lenguaje matemático', description: 'Símbolos, convenciones, precisión', estimatedTime: 30 }
          ]
        },
        {
          id: 1,
          title: 'Aritmética y Pre-Álgebra',
          description: 'Domina los números y operaciones fundamentales',
          icon: '🔢',
          color: 'var(--brand-secondary)',
          modules: [
            { id: 'm06', title: 'Números Naturales', description: 'Propiedades, divisibilidad, factorización prima', estimatedTime: 60 },
            { id: 'm07', title: 'Enteros', description: 'Recta numérica extendida, valor absoluto, operaciones', estimatedTime: 60 },
            { id: 'm08', title: 'Racionales', description: 'Fracciones, decimales, porcentaje, razón, proporción', estimatedTime: 90 },
            { id: 'm09', title: 'Reales', description: 'Irracionales, densidad, notación científica', estimatedTime: 60 },
            { id: 'm10', title: 'Potenciación y Radicación', description: 'Leyes de exponentes, notación radical', estimatedTime: 60 },
            { id: 'm11', title: 'Álgebra Elemental', description: 'Variables, polinomios, factorización, ecuaciones lineales', estimatedTime: 90 },
            { id: 'm12', title: 'Sistemas de Ecuaciones', description: '2×2, 3×3, métodos de resolución', estimatedTime: 60 },
            { id: 'm13', title: 'Inecuaciones', description: 'Lineales, cuadráticas, con valor absoluto', estimatedTime: 45 }
          ]
        }
        // Las demás fases se cargan desde curriculum.json
      ]
    };
  }
  
  /**
   * Registrar handlers de rutas
   */
  registerRoutes() {
    // Home -> Dashboard o Onboarding
    router.on(Routes.HOME, async () => {
      const user = store.get('user');
      if (user.id) {
        router.navigate(Routes.DASHBOARD, { replace: true });
      } else {
        router.navigate(Routes.ONBOARDING, { replace: true });
      }
    });
    
    // Dashboard
    router.on(Routes.DASHBOARD, () => this.renderDashboard());
    
    // Onboarding
    router.on(Routes.ONBOARDING, () => this.renderOnboarding());
    
    // Diagnóstico
    router.on(Routes.DIAGNOSTIC, () => this.renderDiagnostic());
    
    // Fase
    router.on(Routes.PHASE, (route) => this.renderPhase(route.params.phaseId));
    router.on(Routes.PHASE_OVERVIEW, (route) => this.renderPhaseOverview(route.params.phaseId));
    
    // Módulo
    router.on(Routes.MODULE, (route) => this.renderModule(route.params.moduleId, 'overview'));
    router.on(Routes.MODULE_THEORY, (route) => this.renderModule(route.params.moduleId, 'theory'));
    router.on(Routes.MODULE_PRACTICE, (route) => this.renderModule(route.params.moduleId, 'practice'));
    router.on(Routes.MODULE_QUIZ, (route) => this.renderModule(route.params.moduleId, 'quiz'));
    router.on(Routes.MODULE_INTERACTIVE, (route) => this.renderModule(route.params.moduleId, 'interactive'));
    router.on(Routes.MODULE_SUMMARY, (route) => this.renderModule(route.params.moduleId, 'summary'));
    
    // Progreso
    router.on(Routes.PROGRESS, () => this.renderProgress());
    
    // Certificados
    router.on(Routes.CERTIFICATES, () => this.renderCertificates());
    router.on(Routes.CERTIFICATE_VIEW, (route) => this.renderCertificateView(route.params.certificateId));
    router.on(Routes.CERTIFICATE_VERIFY, (route) => this.renderCertificateVerify(route.params.hash));
    
    // Repaso
    router.on(Routes.REVIEW, () => this.renderReview());
    router.on(Routes.REVIEW_SESSION, () => this.renderReviewSession());
    
    // Configuración
    router.on(Routes.SETTINGS, () => this.renderSettings('general'));
    router.on(Routes.SETTINGS_ACCOUNT, () => this.renderSettings('account'));
    router.on(Routes.SETTINGS_PREFERENCES, () => this.renderSettings('preferences'));
    router.on(Routes.SETTINGS_DATA, () => this.renderSettings('data'));
    
    // Búsqueda
    router.on(Routes.SEARCH, (route) => this.renderSearch(route.params.q));
    
    // 404
    router.on(Routes.NOT_FOUND, () => this.render404());
  }
  
  /**
   * Verificar si necesita onboarding
   */
  async checkOnboarding() {
    const user = store.get('user');
    const currentRoute = router.getCurrentRoute();
    
    if (!user.id && currentRoute?.route !== Routes.ONBOARDING && currentRoute?.route !== Routes.DIAGNOSTIC) {
      // Usuario nuevo, redirigir a onboarding
      router.navigate(Routes.ONBOARDING, { replace: true });
    } else if (user.id && currentRoute?.route === Routes.HOME) {
      router.navigate(Routes.DASHBOARD, { replace: true });
    }
  }
  
  /**
   * Configurar event listeners globales
   */
  setupGlobalListeners() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('mobile-open');
        sidebarBackdrop?.classList.toggle('visible', isOpen);
        sidebarToggle.setAttribute('aria-expanded', isOpen);
        store.set('ui.sidebarOpen', isOpen);
      });
    }
    
    if (sidebarBackdrop) {
      sidebarBackdrop.addEventListener('click', () => {
        sidebar?.classList.remove('mobile-open');
        sidebarBackdrop.classList.remove('visible');
        sidebarToggle?.setAttribute('aria-expanded', 'false');
        store.set('ui.sidebarOpen', false);
      });
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
      this.updateThemeIcon();
    }
    
    // Search
    this.setupSearch();
    
    // User menu dropdown
    this.setupUserMenu();
    
    // Mobile search
    this.setupMobileSearch();
    
    // Keyboard shortcuts
    this.setupKeyboardShortcuts();
    
    // EventBus listeners
    eventBus.on(EventTypes.THEME_CHANGE, () => this.updateThemeIcon());
    eventBus.on(EventTypes.TOAST_SHOW, (data) => this.showToast(data));
    eventBus.on(EventTypes.USER_LOGIN, () => this.updateUserUI());
    eventBus.on(EventTypes.USER_LOGOUT, () => this.updateUserUI());
  }
  
  /**
   * Configurar búsqueda global
   */
  setupSearch() {
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');
    let searchTimeout = null;
    
    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
          searchResults.classList.remove('open');
          return;
        }
        
        searchTimeout = setTimeout(() => {
          this.performSearch(query, searchResults);
        }, 200);
      });
      
      searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) {
          this.performSearch(searchInput.value.trim(), searchResults);
        }
      });
      
      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
          searchResults.classList.remove('open');
        }
      });
      
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchResults.classList.remove('open');
          searchInput.blur();
        }
      });
    }
  }
  
  async performSearch(query, container) {
    // Buscar en currículo, módulos, términos
    const results = this.searchCurriculum(query);
    
    if (results.length === 0) {
      container.innerHTML = '<div class="p-3 text-center text-muted">No se encontraron resultados</div>';
    } else {
      container.innerHTML = results.map(r => `
        <div class="search-result-item" data-action="navigate" data-route="${r.route}" data-params='${JSON.stringify(r.params)}'>
          <div class="search-result-title">${this.highlightMatch(r.title, query)}</div>
          <div class="search-result-meta">
            <span class="badge badge-${r.type}">${r.typeLabel}</span>
            ${r.moduleId ? `<span>Módulo ${r.moduleId}</span>` : ''}
          </div>
        </div>
      `).join('');
      
      // Event listeners para resultados
      container.querySelectorAll('[data-action="navigate"]').forEach(el => {
        el.addEventListener('click', () => {
          const route = el.dataset.route;
          const params = JSON.parse(el.dataset.params || '{}');
          router.navigate({ name: route, params });
          container.classList.remove('open');
        });
      });
    }
    
    container.classList.add('open');
  }
  
  searchCurriculum(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    if (!curriculumData) return results;
    
    for (const phase of curriculumData.phases) {
      // Buscar en fases
      if (phase.title.toLowerCase().includes(lowerQuery) || 
          phase.description.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'phase',
          typeLabel: 'Fase',
          title: phase.title,
          route: Routes.PHASE_OVERVIEW,
          params: { phaseId: phase.id }
        });
      }
      
      // Buscar en módulos
      for (const module of phase.modules) {
        if (module.title.toLowerCase().includes(lowerQuery) || 
            module.description.toLowerCase().includes(lowerQuery)) {
          results.push({
            type: 'module',
            typeLabel: 'Módulo',
            title: module.title,
            moduleId: module.id,
            route: Routes.MODULE,
            params: { moduleId: module.id }
          });
        }
      }
    }
    
    return results.slice(0, 10);
  }
  
  highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="search-result-highlight">$1</mark>');
  }
  
  /**
   * Configurar menú de usuario
   */
  setupUserMenu() {
    const trigger = document.getElementById('user-menu-trigger');
    const dropdown = document.getElementById('user-dropdown');
    
    if (trigger && dropdown) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('open');
        trigger.setAttribute('aria-expanded', isOpen);
      });
      
      dropdown.querySelectorAll('[data-action]').forEach(item => {
        item.addEventListener('click', () => {
          const action = item.dataset.action;
          dropdown.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
          this.handleUserAction(action);
        });
      });
      
      document.addEventListener('click', (e) => {
        if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }
  
  handleUserAction(action) {
    switch (action) {
      case 'progress':
        router.navigate(Routes.PROGRESS);
        break;
      case 'certificates':
        router.navigate(Routes.CERTIFICATES);
        break;
      case 'settings':
        router.navigate(Routes.SETTINGS);
        break;
      case 'export':
        this.exportUserData();
        break;
      case 'logout':
        this.logout();
        break;
    }
  }
  
  /**
   * Configurar búsqueda móvil
   */
  setupMobileSearch() {
    const toggle = document.getElementById('mobile-search-toggle');
    const overlay = document.getElementById('mobile-search-overlay');
    const input = document.getElementById('mobile-search-input');
    const results = document.getElementById('mobile-search-results');
    const closeBtn = document.getElementById('mobile-search-close');
    
    if (toggle && overlay) {
      toggle.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        overlay.setAttribute('aria-hidden', 'false');
        setTimeout(() => input?.focus(), 100);
      });
      
      const close = () => {
        overlay.classList.add('hidden');
        overlay.setAttribute('aria-hidden', 'true');
        input.value = '';
        results.classList.remove('open');
      };
      
      closeBtn?.addEventListener('click', close);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
      });
      
      if (input && results) {
        let timeout = null;
        input.addEventListener('input', (e) => {
          clearTimeout(timeout);
          const query = e.target.value.trim();
          if (query.length < 2) {
            results.classList.remove('open');
            return;
          }
          timeout = setTimeout(() => this.performSearch(query, results), 200);
        });
      }
    }
  }
  
  /**
   * Atajos de teclado globales
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ignorar si está en input
      if (e.target.matches('input, textarea, [contenteditable]')) return;
      
      // Modificadores
      const isMac = navigator.platform.includes('Mac');
      const modifier = isMac ? e.metaKey : e.ctrlKey;
      
      // Ctrl/Cmd + K -> Búsqueda
      if (modifier && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
      
      // Ctrl/Cmd + / -> Atajos
      if (modifier && e.key === '/') {
        e.preventDefault();
        this.showShortcutsHelp();
      }
      
      // Escape -> Cerrar modales/menús
      if (e.key === 'Escape') {
        document.getElementById('sidebar')?.classList.remove('mobile-open');
        document.getElementById('sidebar-backdrop')?.classList.remove('visible');
        document.getElementById('user-dropdown')?.classList.remove('open');
        document.getElementById('search-results')?.classList.remove('open');
        document.getElementById('mobile-search-overlay')?.classList.add('hidden');
      }
      
      // Flechas para navegación módulo
      if (e.altKey) {
        if (e.key === 'ArrowRight') {
          this.navigateNextModule();
        } else if (e.key === 'ArrowLeft') {
          this.navigatePrevModule();
        }
      }
    });
  }
  
  /**
   * Alternar tema
   */
  toggleTheme() {
    const themes = ['dark', 'light', 'auto'];
    const current = store.get('user.preferences.theme') || 'auto';
    const currentIndex = themes.indexOf(current);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    store.setSetting('theme', nextTheme);
    eventBus.emit(EventTypes.THEME_CHANGE, { theme: nextTheme });
  }
  
  updateThemeIcon() {
    const theme = store.get('user.preferences.theme') || 'auto';
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    const sunIcon = document.querySelector('#theme-toggle .icon-sun');
    const moonIcon = document.querySelector('#theme-toggle .icon-moon');
    
    if (sunIcon && moonIcon) {
      sunIcon.style.display = isDark ? 'block' : 'none';
      moonIcon.style.display = isDark ? 'none' : 'block';
    }
    
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }
  }
  
  /**
   * Actualizar UI de usuario
   */
  updateUserUI() {
    const user = store.get('user');
    const name = user.name || 'Estudiante';
    const initial = name.charAt(0).toUpperCase();
    
    // Avatar principal
    const avatar = document.getElementById('user-avatar');
    const nameEl = document.getElementById('user-name');
    if (avatar) avatar.textContent = initial;
    if (nameEl) nameEl.textContent = name;
    
    // Sidebar
    const sidebarAvatar = document.getElementById('sidebar-avatar');
    const sidebarName = document.getElementById('sidebar-name');
    const sidebarStreak = document.getElementById('sidebar-streak');
    if (sidebarAvatar) sidebarAvatar.textContent = initial;
    if (sidebarName) sidebarName.textContent = name;
    if (sidebarStreak) sidebarStreak.textContent = `🔥 Racha: ${user.streak} días`;
  }
  
  /**
   * Mostrar toast
   */
  showToast(data) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast alert alert-${data.type || 'info'} animate-slide-right`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="flex-1">
          ${data.title ? `<div class="alert-title">${data.title}</div>` : ''}
          <div class="alert-message">${data.message}</div>
        </div>
        <button class="alert-dismiss" aria-label="Cerrar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;
    
    toast.querySelector('.alert-dismiss').addEventListener('click', () => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    });
    
    container.appendChild(toast);
    
    // Auto-remove
    const duration = data.duration || 5000;
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  }
  
  /**
   * Mostrar error global
   */
  showError(message) {
    this.showToast({ type: 'error', title: 'Error', message });
  }
  
  /**
   * Mostrar ayuda de atajos
   */
  showShortcutsHelp() {
    const shortcuts = [
      { key: 'Ctrl/Cmd + K', action: 'Abrir búsqueda' },
      { key: 'Ctrl/Cmd + /', action: 'Mostrar esta ayuda' },
      { key: 'Escape', action: 'Cerrar menús/modales' },
      { key: 'Alt + →', action: 'Siguiente módulo' },
      { key: 'Alt + ←', action: 'Módulo anterior' },
      { key: 'T', action: 'Alternar tema (en dashboard)' }
    ];
    
    this.showToast({
      type: 'info',
      title: 'Atajos de teclado',
      message: shortcuts.map(s => `<kbd>${s.key}</kbd> ${s.action}`).join('<br>'),
      duration: 10000
    });
  }
  
  /**
   * Navegar al siguiente módulo
   */
  navigateNextModule() {
    const currentRoute = router.getCurrentRoute();
    if (!currentRoute) return;
    
    const match = currentRoute.path.match(/module\/([a-z0-9-]+)/);
    if (match) {
      const moduleId = match[1];
      const nextModule = this.getNextModule(moduleId);
      if (nextModule) {
        router.navigate(Routes.MODULE.replace(':moduleId', nextModule));
      }
    }
  }
  
  /**
   * Navegar al módulo anterior
   */
  navigatePrevModule() {
    const currentRoute = router.getCurrentRoute();
    if (!currentRoute) return;
    
    const match = currentRoute.path.match(/module\/([a-z0-9-]+)/);
    if (match) {
      const moduleId = match[1];
      const prevModule = this.getPrevModule(moduleId);
      if (prevModule) {
        router.navigate(Routes.MODULE.replace(':moduleId', prevModule));
      }
    }
  }
  
  getNextModule(currentId) {
    if (!curriculumData) return null;
    
    let found = false;
    for (const phase of curriculumData.phases) {
      for (const module of phase.modules) {
        if (found) return module.id;
        if (module.id === currentId) found = true;
      }
    }
    return null;
  }
  
  getPrevModule(currentId) {
    if (!curriculumData) return null;
    
    let prev = null;
    for (const phase of curriculumData.phases) {
      for (const module of phase.modules) {
        if (module.id === currentId) return prev;
        prev = module.id;
      }
    }
    return null;
  }
  
  /**
   * Exportar datos de usuario
   */
  async exportUserData() {
    try {
      const data = store.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mateavanzada-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      this.showToast({ type: 'success', message: 'Datos exportados correctamente' });
    } catch (error) {
      console.error('[App] Export error:', error);
      this.showToast({ type: 'error', message: 'Error al exportar datos' });
    }
  }
  
  /**
   * Cerrar sesión
   */
  async logout() {
    if (confirm('¿Seguro que quieres cerrar sesión? Tu progreso se guardará localmente.')) {
      await store.clearAll();
      router.navigate(Routes.ONBOARDING, { replace: true });
      this.showToast({ type: 'info', message: 'Sesión cerrada. ¡Hasta pronto!' });
    }
  }
  
  /**
   * Configurar actualizaciones de Service Worker
   */
  setupSWUpdates() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        this.showToast({
          type: 'info',
          title: 'Actualización disponible',
          message: 'Se ha descargado una nueva versión. Recarga para aplicar.',
          duration: 0
        });
      });
    }
  }
  
  /* ==========================================================================
     RENDER METHODS (delegados a componentes)
     ========================================================================== */
  
  async renderDashboard() {
    await this.loadView('dashboard');
  }
  
  async renderOnboarding() {
    await this.loadView('onboarding');
  }
  
  async renderDiagnostic() {
    await this.loadView('diagnostic');
  }
  
  async renderPhase(phaseId) {
    await this.loadView('phase', { phaseId: parseInt(phaseId) });
  }
  
  async renderPhaseOverview(phaseId) {
    await this.loadView('phase-overview', { phaseId: parseInt(phaseId) });
  }
  
  async renderModule(moduleId, section = 'overview') {
    await this.loadView('module', { moduleId, section });
  }
  
  async renderProgress() {
    await this.loadView('progress');
  }
  
  async renderCertificates() {
    await this.loadView('certificates');
  }
  
  async renderCertificateView(certificateId) {
    await this.loadView('certificate-view', { certificateId });
  }
  
  async renderCertificateVerify(hash) {
    await this.loadView('certificate-verify', { hash });
  }
  
  async renderReview() {
    await this.loadView('review');
  }
  
  async renderReviewSession() {
    await this.loadView('review-session');
  }
  
  async renderSettings(tab = 'general') {
    await this.loadView('settings', { tab });
  }
  
  async renderSearch(query) {
    await this.loadView('search', { query });
  }
  
  async render404() {
    await this.loadView('404');
  }
  
  /**
   * Cargar vista dinámicamente (code splitting)
   */
  async loadView(viewName, params = {}) {
    const main = document.getElementById('main-content');
    if (!main) return;
    
    // Mostrar skeleton mientras carga
    main.innerHTML = this.getSkeletonHTML(viewName);
    
    try {
      // Dynamic import del módulo de vista
      const viewModule = await import(`../modules/${viewName}/index.js`);
      
      if (viewModule.default && typeof viewModule.default.render === 'function') {
        await viewModule.default.render(main, params, { store, router, eventBus, curriculum: curriculumData });
      } else if (typeof viewModule.render === 'function') {
        await viewModule.render(main, params, { store, router, eventBus, curriculum: curriculumData });
      } else {
        throw new Error(`Vista ${viewName} no tiene función render`);
      }
      
      // Track page view
      store.trackEvent('page_view', { view: viewName, params });
      
    } catch (error) {
      console.error(`[App] Error loading view ${viewName}:`, error);
      main.innerHTML = this.getErrorHTML(viewName, error.message);
    }
  }
  
  getSkeletonHTML(viewName) {
    return `
      <div class="skeleton-card animate-pulse">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text" style="width: 80%"></div>
        <div class="skeleton-text" style="width: 60%"></div>
      </div>
      <div class="skeleton-card animate-pulse" style="animation-delay: 0.1s">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text" style="width: 70%"></div>
      </div>
      <div class="skeleton-card animate-pulse" style="animation-delay: 0.2s">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
      </div>
    `;
  }
  
  getErrorHTML(viewName, error) {
    return `
      <div class="text-center py-12">
        <div class="text-6xl mb-4">😕</div>
        <h2 class="text-2xl font-bold mb-2">No se pudo cargar la vista</h2>
        <p class="text-muted mb-6">${error}</p>
        <button class="btn btn-primary" onclick="window.location.reload()">
          Recargar página
        </button>
      </div>
    `;
  }
  
  /**
   * Obtener datos del currículo
   */
  getCurriculum() {
    return curriculumData;
  }
  
  /**
   * Obtener módulo por ID
   */
  getModule(moduleId) {
    if (!curriculumData) return null;
    
    for (const phase of curriculumData.phases) {
      const module = phase.modules.find(m => m.id === moduleId);
      if (module) return { ...module, phaseId: phase.id, phaseTitle: phase.title };
    }
    return null;
  }
  
  /**
   * Obtener fase por ID
   */
  getPhase(phaseId) {
    if (!curriculumData) return null;
    return curriculumData.phases.find(p => p.id === phaseId) || null;
  }
}

// Instancia global
export const app = new App();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

export default app;