// modules/diagnostic/index.js
export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    container.innerHTML = `
      <div class="container">
        <h1 class="text-3xl font-extrabold mb-6">Diagnóstico Inicial</h1>
        <div class="card p-8 text-center">
          <div class="text-5xl mb-4">🎯</div>
          <p class="text-muted mb-4">El diagnóstico inicial estará disponible pronto.</p>
          <a href="#dashboard" class="btn btn-primary">Ir al dashboard</a>
        </div>
      </div>
    `;
  }
};