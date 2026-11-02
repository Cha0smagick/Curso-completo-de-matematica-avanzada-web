// modules/certificate-view/index.js
export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    container.innerHTML = `
      <div class="container">
        <h1 class="text-3xl font-extrabold mb-6">Certificado</h1>
        <div class="card p-8 text-center">
          <div class="text-5xl mb-4">📜</div>
          <p class="text-muted mb-4">Vista de certificado para: ${params.certificateId}</p>
          <a href="#certificates" class="btn btn-primary">Volver a certificados</a>
        </div>
      </div>
    `;
  }
};