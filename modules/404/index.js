// modules/404/index.js
export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    container.innerHTML = `
      <div class="text-center py-12">
        <div class="text-6xl mb-4">😕</div>
        <h2 class="text-2xl font-bold mb-2">Página no encontrada</h2>
        <p class="text-muted mb-6">La página que buscas no existe.</p>
        <a href="#dashboard" class="btn btn-primary">Ir al dashboard</a>
      </div>
    `;
  }
};