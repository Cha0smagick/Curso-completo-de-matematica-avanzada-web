// modules/module/index.js
// Module view - shows module content with tabs

export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    const { moduleId, section = 'overview' } = params;
    
    // Find module in curriculum
    let moduleData = null;
    let phaseData = null;
    for (const phase of curriculum.phases) {
      const mod = phase.modules.find(m => m.id === moduleId);
      if (mod) {
        moduleData = mod;
        phaseData = phase;
        break;
      }
    }
    
    if (!moduleData) {
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="text-6xl mb-4">😕</div>
          <h2 class="text-2xl font-bold mb-2">Módulo no encontrado</h2>
          <p class="text-muted mb-6">El módulo "${moduleId}" no existe.</p>
          <a href="#dashboard" class="btn btn-primary">Volver al dashboard</a>
        </div>
      `;
      return;
    }
    
    // Start module if not started
    const progress = store.getModuleProgress(moduleId);
    if (progress.status === 'available' || progress.status === 'locked') {
      store.startModule(moduleId);
    }
    
    const sections = moduleData.sections || ['theory', 'practice', 'quiz', 'interactive'];
    const sectionLabels = {
      overview: 'Resumen',
      theory: 'Teoría',
      practice: 'Práctica',
      quiz: 'Quiz',
      interactive: 'Interactivo',
      summary: 'Resumen'
    };
    
    container.innerHTML = `
      <div class="container">
        <!-- Module Header -->
        <header class="mb-8">
          <div class="flex items-center gap-3 mb-4 flex-wrap">
            <span class="badge badge-primary">Fase ${phaseData.id}</span>
            <span class="badge badge-neutral">${phaseData.title}</span>
            <span class="badge badge-success">${moduleData.estimatedMinutes} min</span>
            <span class="badge badge-warning">Dificultad ${moduleData.difficulty}/7</span>
          </div>
          <h1 class="text-3xl font-extrabold mb-2">${moduleData.title}</h1>
          <p class="text-muted text-lg">${moduleData.description}</p>
          
          ${moduleData.learningObjectives ? `
            <div class="card p-4 mt-4" style="background: var(--color-bg);">
              <h3 class="text-sm font-semibold mb-2" style="color: var(--brand-primary);">Objetivos de aprendizaje</h3>
              <ul class="text-sm text-muted space-y-1">
                ${moduleData.learningObjectives.map(obj => `<li>✓ ${obj}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </header>
        
        <!-- Tabs -->
        <div class="tabs mb-6" role="tablist">
          ${sections.map(s => `
            <button class="tab ${s === section ? 'active' : ''}" role="tab" data-section="${s}" aria-selected="${s === section}">
              ${sectionLabels[s] || s}
            </button>
          `).join('')}
        </div>
        
        <!-- Content Area -->
        <div id="module-content" class="tab-panel active">
          ${section === 'overview' ? this.renderOverview(moduleData, progress) : ''}
          ${section === 'theory' ? this.renderTheoryPlaceholder(moduleData) : ''}
          ${section === 'practice' ? this.renderPracticePlaceholder(moduleData) : ''}
          ${section === 'quiz' ? this.renderQuizPlaceholder(moduleData) : ''}
          ${section === 'interactive' ? this.renderInteractivePlaceholder(moduleData) : ''}
        </div>
        
        <!-- Module Navigation -->
        <nav class="mt-10 flex justify-between" aria-label="Navegación entre módulos">
          <a href="#dashboard" class="btn btn-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Dashboard
          </a>
          <a href="#module/${this.getNextModule(moduleId, curriculum)}" class="btn btn-primary">
            Siguiente módulo
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </nav>
      </div>
    `;
    
    // Bind tab clicks
    container.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const targetSection = tab.dataset.section;
        router.navigate(`/module/${moduleId}/${targetSection}`, { replace: true });
      });
    });
    
    // Track view
    store.trackModuleView(moduleId);
  },
  
  renderOverview(moduleData, progress) {
    return `
      <div class="theory-section">
        <div class="card p-6 mb-6">
          <h2 class="text-xl font-bold mb-4">Bienvenido a ${moduleData.title}</h2>
          <p class="text-muted mb-4">${moduleData.description}</p>
          <div class="grid grid-cols-2 gap-4">
            <div class="card p-4" style="background: var(--color-bg);">
              <span class="text-sm text-muted">Tiempo estimado</span>
              <div class="text-2xl font-bold" style="color: var(--brand-primary);">${moduleData.estimatedMinutes} min</div>
            </div>
            <div class="card p-4" style="background: var(--color-bg);">
              <span class="text-sm text-muted">Dificultad</span>
              <div class="text-2xl font-bold" style="color: var(--brand-warning);">${moduleData.difficulty}/7</div>
            </div>
          </div>
        </div>
        
        <div class="card p-6">
          <h3 class="text-lg font-semibold mb-4">Tu progreso en este módulo</h3>
          <div class="flex items-center gap-4 mb-4">
            <progress-ring value="${progress.quizScore / 100 || 0}" max="1" stroke-width="6" show-percentage size="80"></progress-ring>
            <div>
              <p class="text-sm text-muted">Estado: <strong style="color: var(--brand-primary);">${progress.status}</strong></p>
              <p class="text-sm text-muted">Intentos de quiz: ${progress.quizAttempts}</p>
              <p class="text-sm text-muted">Mejor puntuación: ${progress.bestScore}%</p>
            </div>
          </div>
          <div class="flex gap-3 flex-wrap">
            <a href="#module/${moduleData.id}/theory" class="btn btn-primary">Comenzar teoría</a>
            <a href="#module/${moduleData.id}/practice" class="btn btn-secondary">Práctica</a>
            <a href="#module/${moduleData.id}/quiz" class="btn btn-secondary">Quiz</a>
          </div>
        </div>
      </div>
    `;
  },
  
  renderTheoryPlaceholder(moduleData) {
    return `
      <div class="theory-section">
        <div class="card p-8 text-center">
          <div class="text-5xl mb-4">📖</div>
          <h2 class="text-2xl font-bold mb-2">Teoría: ${moduleData.title}</h2>
          <p class="text-muted mb-6">El contenido teórico completo de este módulo estará disponible pronto.</p>
          <p class="text-sm text-muted">Mientras tanto, puedes explorar el módulo 1 que ya tiene contenido completo:</p>
          <a href="#module/m01" class="btn btn-primary mt-4">Ir al Módulo 1</a>
        </div>
      </div>
    `;
  },
  
  renderPracticePlaceholder(moduleData) {
    return `
      <div class="theory-section">
        <div class="card p-8 text-center">
          <div class="text-5xl mb-4">✏️</div>
          <h2 class="text-2xl font-bold mb-2">Práctica: ${moduleData.title}</h2>
          <p class="text-muted mb-6">Los ejercicios guiados de este módulo estarán disponibles pronto.</p>
          <a href="#module/m01" class="btn btn-primary mt-4">Ir al Módulo 1</a>
        </div>
      </div>
    `;
  },
  
  renderQuizPlaceholder(moduleData) {
    return `
      <div class="theory-section">
        <div class="card p-8 text-center">
          <div class="text-5xl mb-4">📝</div>
          <h2 class="text-2xl font-bold mb-2">Quiz: ${moduleData.title}</h2>
          <p class="text-muted mb-6">El quiz adaptativo de este módulo estará disponible pronto.</p>
          <a href="#module/m01" class="btn btn-primary mt-4">Ir al Módulo 1</a>
        </div>
      </div>
    `;
  },
  
  renderInteractivePlaceholder(moduleData) {
    return `
      <div class="theory-section">
        <div class="card p-8 text-center">
          <div class="text-5xl mb-4">🎮</div>
          <h2 class="text-2xl font-bold mb-2">Interactivo: ${moduleData.title}</h2>
          <p class="text-muted mb-6">Las gráficas interactivas de este módulo estarán disponibles pronto.</p>
          <a href="#module/m01" class="btn btn-primary mt-4">Ir al Módulo 1</a>
        </div>
      </div>
    `;
  },
  
  getNextModule(currentId, curriculum) {
    let found = false;
    for (const phase of curriculum.phases) {
      for (const module of phase.modules) {
        if (found) return module.id;
        if (module.id === currentId) found = true;
      }
    }
    return 'm01';
  }
};