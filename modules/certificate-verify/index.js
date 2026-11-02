// modules/certificate-verify/index.js
export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    const hash = params.hash;
    const result = store.verifyCertificate(hash);
    container.innerHTML = `
      <div class="container">
        <h1 class="text-3xl font-extrabold mb-6">Verificación de Certificado</h1>
        ${result.valid ? `
          <div class="card p-8 text-center">
            <div class="text-5xl mb-4">✅</div>
            <h2 class="text-2xl font-bold mb-2" style="color: var(--brand-success);">Certificado Válido</h2>
            <p class="text-muted">Otorgado a: ${result.certificate.studentName}</p>
            <p class="text-muted">Fecha: ${new Date(result.certificate.earnedAt).toLocaleDateString('es-ES')}</p>
            <a href="#dashboard" class="btn btn-primary mt-4">Ir al dashboard</a>
          </div>
        ` : `
          <div class="card p-8 text-center">
            <div class="text-5xl mb-4">❌</div>
            <h2 class="text-2xl font-bold mb-2" style="color: var(--brand-error);">Certificado No Válido</h2>
            <p class="text-muted">El hash proporcionado no corresponde a ningún certificado.</p>
            <a href="#dashboard" class="btn btn-primary mt-4">Ir al dashboard</a>
          </div>
        `}
      </div>
    `;
  }
};