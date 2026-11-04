// modules/search/index.js
// Página de búsqueda: filtra el currículo en memoria (antes era un stub sin listeners).
export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    container.innerHTML = `
      <div class="container">
        <h1 class="text-3xl font-extrabold mb-6">Búsqueda</h1>
        <div class="card p-6 mb-6">
          <input type="search" class="form-input" id="search-input" placeholder="Buscar conceptos, módulos, temas..." aria-label="Buscar en el curso" autofocus>
        </div>
        <div id="search-results-page" aria-live="polite">
          <p class="text-muted">Escribe al menos 2 caracteres para buscar en las 7 fases y 46 módulos.</p>
        </div>
        <a href="#dashboard" class="btn btn-secondary mt-6">Volver al dashboard</a>
      </div>
    `;

    const input = container.querySelector('#search-input');
    const results = container.querySelector('#search-results-page');

    const doSearch = () => {
      const q = (input.value || '').trim().toLowerCase();
      if (q.length < 2) {
        results.innerHTML = '<p class="text-muted">Escribe al menos 2 caracteres para buscar.</p>';
        return;
      }
      const hits = [];
      for (const phase of curriculum.phases) {
        for (const m of phase.modules) {
          const haystack = `${m.title} ${m.description} ${(m.tags || []).join(' ')}`.toLowerCase();
          if (haystack.includes(q)) {
            hits.push({ m, phase });
          }
        }
      }
      if (!hits.length) {
        results.innerHTML = '<p class="text-muted">Sin resultados. Prueba con otro término.</p>';
        return;
      }
      results.innerHTML = `
        <p class="text-sm text-muted mb-4">${hits.length} resultado(s)</p>
        ${hits.map(({ m, phase }) => `
          <a href="#module/${m.id}" class="search-result-item" style="display:block;padding:0.75rem;border-radius:0.5rem;text-decoration:none;">
            <div class="search-result-title">${m.title}</div>
            <div class="search-result-meta">
              <span class="badge badge-primary">Fase ${phase.id} · ${phase.title}</span>
              <span class="text-sm text-muted"> ${m.description}</span>
            </div>
          </a>
        `).join('')}
      `;
    };

    input.addEventListener('input', doSearch);
  }
};
