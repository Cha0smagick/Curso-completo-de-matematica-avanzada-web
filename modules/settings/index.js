// modules/settings/index.js
export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    const tab = params.tab || 'general';
    container.innerHTML = `
      <div class="container">
        <h1 class="text-3xl font-extrabold mb-6">Configuración</h1>
        <div class="settings-section">
          <h2 class="settings-section-title">Preferencias</h2>
          <div class="setting-item">
            <label class="setting-label">Tema</label>
            <select class="form-select" id="theme-select">
              <option value="auto">Automático</option>
              <option value="dark">Oscuro</option>
              <option value="light">Claro</option>
            </select>
          </div>
          <div class="setting-item mt-4">
            <label class="setting-label">Animaciones</label>
            <label class="form-switch">
              <input type="checkbox" class="form-switch-input" id="animations-toggle" checked>
            </label>
          </div>
        </div>
        <div class="settings-section mt-6">
          <h2 class="settings-section-title">Datos</h2>
          <button class="btn btn-secondary" id="btn-export">Exportar datos</button>
          <button class="btn btn-error ml-3" id="btn-reset">Borrar todo</button>
        </div>
        <a href="#dashboard" class="btn btn-secondary mt-6">Volver al dashboard</a>
      </div>
    `;
    
    container.querySelector('#theme-select')?.addEventListener('change', (e) => {
      store.setSetting('theme', e.target.value);
    });
    
    container.querySelector('#btn-export')?.addEventListener('click', () => {
      const data = store.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mateavanzada-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
    
    container.querySelector('#btn-reset')?.addEventListener('click', async () => {
      if (confirm('¿Seguro que quieres borrar todo tu progreso?')) {
        await store.clearAll();
        router.navigate('/onboarding', { replace: true });
      }
    });
  }
};