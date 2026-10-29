// modules/review-session/index.js
export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    container.innerHTML = `
      <div class="container">
        <h1 class="text-3xl font-extrabold mb-6">Sesión de Repaso</h1>
        <div class="card p-8 text-center">
          <div class="text-5xl mb-4">🔄</div>
          <p class="text-muted mb-4">Las tarjetas de repaso se cargarán aquí.</p>
          <a href="#review" class="btn btn-secondary">Volver</a>
        </div>
      </div>
    `;
  }
};