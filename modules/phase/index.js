// modules/phase/index.js
// Phase view - shows modules in a phase

export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    const phaseId = parseInt(params.phaseId);
    const phase = curriculum.phases.find(p => p.id === phaseId);
    
    if (!phase) {
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="text-6xl mb-4">😕</div>
          <h2 class="text-2xl font-bold mb-2">Fase no encontrada</h2>
          <a href="#dashboard" class="btn btn-primary">Volver al dashboard</a>
        </div>
      `;
      return;
    }
    
    container.innerHTML = `
      <div class="container">
        <header class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <span class="badge badge-primary">Fase ${phase.id}</span>
            <span class="badge badge-neutral">${phase.estimatedHours}h estimadas</span>
          </div>
          <h1 class="text-3xl font-extrabold mb-2">${phase.icon} ${phase.title}</h1>
          <p class="text-muted text-lg">${phase.description}</p>
        </header>
        
        <div class="module-grid">
          ${phase.modules.map((mod, i) => {
            const progress = store.getModuleProgress(mod.id);
            const status = progress.status;
            const statusLabels = {
              'locked': '🔒 Bloqueado',
              'available': '📖 Disponible',
              'in-progress': '⏳ En progreso',
              'completed': '✅ Completado',
              'mastery': '⭐ Maestría'
            };
            return `
              <a href="#module/${mod.id}" class="module-card card ${status === 'locked' ? 'locked' : ''}">
                <div class="card-body">
                  <div class="module-card-header">
                    <div class="module-card-icon">${i + 1}</div>
                    <span class="badge badge-${status === 'completed' || status === 'mastery' ? 'success' : status === 'in-progress' ? 'primary' : 'neutral'}">${statusLabels[status] || status}</span>
                  </div>
                  <h3 class="module-card-title">${mod.title}</h3>
                  <p class="module-card-desc">${mod.description}</p>
                  <div class="module-card-meta">
                    <span class="module-card-meta-item">⏱ ${mod.estimatedMinutes} min</span>
                    <span class="module-card-meta-item">📊 Nivel ${mod.difficulty}/7</span>
                  </div>
                  ${progress.quizScore > 0 ? `
                    <div class="module-card-progress">
                      <div class="module-card-progress-bar" style="width: ${progress.quizScore}%"></div>
                    </div>
                  ` : ''}
                </div>
              </a>
            `;
          }).join('')}
        </div>
        
        <nav class="mt-10">
          <a href="#dashboard" class="btn btn-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Volver al dashboard
          </a>
        </nav>
      </div>
    `;
  }
};