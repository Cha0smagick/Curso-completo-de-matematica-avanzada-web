// modules/certificates/index.js
export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    const certs = store.getCertificatesByType('module').concat(store.getCertificatesByType('phase')).concat(store.getCertificatesByType('course'));
    container.innerHTML = `
      <div class="container">
        <h1 class="text-3xl font-extrabold mb-6">Mis Certificados</h1>
        ${certs.length === 0 ? `
          <div class="card p-8 text-center">
            <div class="text-5xl mb-4">📜</div>
            <h2 class="text-xl font-bold mb-2">Aún no tienes certificados</h2>
            <p class="text-muted mb-4">Completa módulos para ganar certificados verificables.</p>
            <a href="#dashboard" class="btn btn-primary">Comenzar a aprender</a>
          </div>
        ` : `
          <div class="grid grid-auto-fit gap-4">
            ${certs.map(c => `
              <div class="card p-4">
                <h3 class="font-semibold">${c.type === 'module' ? 'Módulo' : c.type === 'phase' ? 'Fase' : 'Curso'}</h3>
                <p class="text-sm text-muted">${new Date(c.earnedAt).toLocaleDateString('es-ES')}</p>
                <a href="#certificate/${c.id}" class="btn btn-primary btn-sm mt-3">Ver certificado</a>
              </div>
            `).join('')}
          </div>
        `}
        <a href="#dashboard" class="btn btn-secondary mt-6">Volver al dashboard</a>
      </div>
    `;
  }
};