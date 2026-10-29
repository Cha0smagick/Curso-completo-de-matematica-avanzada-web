// modules/dashboard/index.js
// Dashboard view - shows course progress and next module

export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    const user = store.get('user');
    const courseProgress = store.getCourseProgress();
    
    container.innerHTML = `
      <div class="dashboard">
        <div class="dashboard-hero">
          <div class="dashboard-hero-content">
            <h1 class="dashboard-greeting">¡Hola, ${user.name || 'Estudiante'}! 👋</h1>
            <p class="dashboard-subtitle">Continúa tu camino hacia la maestría en matemáticas</p>
            <div class="dashboard-stats">
              <div class="dashboard-stat">
                <span class="dashboard-stat-value">${courseProgress.percentage}%</span>
                <span class="dashboard-stat-label">Completado</span>
              </div>
              <div class="dashboard-stat">
                <span class="dashboard-stat-value">${user.streak || 0}</span>
                <span class="dashboard-stat-label">Racha (días)</span>
              </div>
              <div class="dashboard-stat">
                <span class="dashboard-stat-value">${user.totalXP || 0}</span>
                <span class="dashboard-stat-label">XP Total</span>
              </div>
              <div class="dashboard-stat">
                <span class="dashboard-stat-value">${user.level || 1}</span>
                <span class="dashboard-stat-label">Nivel</span>
              </div>
            </div>
            <div class="dashboard-continue">
              <a href="#module/m01" class="dashboard-next-module">
                <div class="dashboard-next-module-icon">📚</div>
                <div class="dashboard-next-module-info">
                  <span class="dashboard-next-module-label">Continuar aprendiendo</span>
                  <span class="dashboard-next-module-name">Módulo 1: ¿Qué es un número?</span>
                  <span class="dashboard-next-module-progress">Fase 0 · Fundamentos</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div class="dashboard-sections">
          <div>
            <div class="dashboard-section-title">
              <h2>Fases del Curso</h2>
            </div>
            <div class="dashboard-phases">
              ${curriculum.phases.map(phase => {
                const progress = store.getPhaseProgress(phase.id);
                const status = progress.percentage === 100 ? 'completed' : progress.percentage > 0 ? 'in-progress' : 'locked';
                return `
                  <a href="#phase/${phase.id}/overview" class="dashboard-phase-card ${status}">
                    <div class="dashboard-phase-icon">${phase.icon}</div>
                    <div class="dashboard-phase-info">
                      <div class="dashboard-phase-name">${phase.title}</div>
                      <div class="dashboard-phase-progress">
                        <div class="dashboard-phase-progress-bar">
                          <div class="dashboard-phase-progress-fill" style="width: ${progress.percentage}%"></div>
                        </div>
                        <span class="dashboard-phase-progress-text">${progress.completed}/${progress.total} módulos (${progress.percentage}%)</span>
                      </div>
                    </div>
                  </a>
                `;
              }).join('')}
            </div>
          </div>
          
          <div>
            <div class="dashboard-section-title">
              <h2>Logros</h2>
            </div>
            <div class="dashboard-achievements">
              ${[
                { icon: '🎯', name: 'Primer paso', earned: true },
                { icon: '🔥', name: 'Racha 3 días', earned: user.streak >= 3 },
                { icon: '⭐', name: 'Primer módulo', earned: courseProgress.completed > 0 },
                { icon: '🏆', name: 'Primera fase', earned: false },
                { icon: '🎓', name: 'Curso completo', earned: false },
                { icon: '💎', name: 'Maestro', earned: false }
              ].map(a => `
                <div class="achievement-card ${a.earned ? 'earned' : 'locked'}">
                  <span class="achievement-icon">${a.icon}</span>
                  <span class="achievement-name">${a.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }
};