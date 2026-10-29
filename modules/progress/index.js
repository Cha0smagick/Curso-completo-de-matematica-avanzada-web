// modules/progress/index.js
export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    const courseProgress = store.getCourseProgress();
    container.innerHTML = `
      <div class="container">
        <h1 class="text-3xl font-extrabold mb-6">Tu Progreso</h1>
        <div class="card p-6 mb-6">
          <h2 class="text-xl font-bold mb-4">Progreso Global</h2>
          <progress-ring value="${courseProgress.percentage / 100}" max="1" stroke-width="8" show-percentage size="120"></progress-ring>
          <p class="mt-4 text-muted">${courseProgress.completed} de ${courseProgress.total} módulos completados</p>
        </div>
        <a href="#dashboard" class="btn btn-secondary">Volver al dashboard</a>
      </div>
    `;
  }
};