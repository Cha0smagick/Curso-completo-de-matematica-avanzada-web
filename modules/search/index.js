// modules/search/index.js
export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    const query = params.query || '';
    container.innerHTML = `
      <div class="container">
        <h1 class="text-3xl font-extrabold mb-6">Búsqueda</h1>
        <div class="card p-6 mb-6">
          <input type="search" class="form-input" id="search-input" placeholder="Buscar..." value="${query}">
        </div>
        <a href="#dashboard" class="btn btn-secondary">Volver al dashboard</a>
      </div>
    `;
  }
};