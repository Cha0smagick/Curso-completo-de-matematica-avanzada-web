// modules/review/index.js
export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    const stats = store.getReviewStats();
    container.innerHTML = `
      <div class="container">
        <h1 class="text-3xl font-extrabold mb-6">Repaso Espaciado (SM-2)</h1>
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="card p-4 text-center">
            <div class="text-3xl font-bold" style="color: var(--brand-primary);">${stats.due}</div>
            <div class="text-sm text-muted">Pendientes hoy</div>
          </div>
          <div class="card p-4 text-center">
            <div class="text-3xl font-bold" style="color: var(--brand-success);">${stats.total}</div>
            <div class="text-sm text-muted">Total tarjetas</div>
          </div>
        </div>
        ${stats.due > 0 ? `
          <a href="#review/session" class="btn btn-primary">Iniciar repaso (${stats.due} tarjetas)</a>
        ` : `
          <div class="card p-6 text-center">
            <div class="text-4xl mb-2">🎉</div>
            <p class="text-muted">¡No hay tarjetas pendientes! Vuelve mañana.</p>
          </div>
        `}
        <a href="#dashboard" class="btn btn-secondary mt-4">Volver al dashboard</a>
      </div>
    `;
  }
};