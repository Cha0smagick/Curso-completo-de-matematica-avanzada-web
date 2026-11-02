// modules/phase-overview/index.js
// Redirect to phase view
export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    const phaseId = params.phaseId || 0;
    // Just render the phase view
    const phaseModule = await import('../phase/index.js');
    await phaseModule.default.render(container, { phaseId }, { store, router, eventBus, curriculum });
  }
};