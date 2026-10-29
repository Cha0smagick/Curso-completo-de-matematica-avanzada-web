// modules/onboarding/index.js
// Onboarding view - welcome screen for new users

export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    container.innerHTML = `
      <div class="onboarding">
        <div class="onboarding-step active" data-step="1">
          <h1 class="onboarding-title text-3xl font-extrabold mb-2">¡Bienvenido a Matemáticas Avanzadas! 🎉</h1>
          <p class="onboarding-subtitle">Un curso completo desde cero hasta nivel universitario. Sin ansiedad, sin memorización, con intuición.</p>
          
          <div class="card p-6 mb-6" style="background: var(--color-bg);">
            <h3 class="text-lg font-semibold mb-3">¿Qué vas a aprender?</h3>
            <ul class="space-y-2 text-muted">
              <li>🌱 <strong>Fundamentos</strong> - Números, operaciones, patrones</li>
              <li>🔢 <strong>Aritmética y Álgebra</strong> - Fracciones, ecuaciones, sistemas</li>
              <li>📈 <strong>Funciones</strong> - Trigonometría, exponenciales, complejos</li>
              <li>📐 <strong>Geometría</strong> - Analítica, cónicas, espacio 3D</li>
              <li>∫ <strong>Cálculo</strong> - Límites, derivadas, integrales, EDOs</li>
              <li>🔢 <strong>Álgebra Lineal</strong> - Matrices, vectores, transformaciones</li>
              <li>🚀 <strong>Avanzado</strong> - Análisis real/complejo, PDEs, ML, criptografía</li>
            </ul>
          </div>
          
          <div class="onboarding-options">
            <div class="onboarding-option selected" data-level="beginner">
              <div class="onboarding-option-icon">🌱</div>
              <div class="onboarding-option-title">Principiante</div>
              <p class="onboarding-option-desc">Empiezo desde cero. No sé nada de matemáticas.</p>
            </div>
            <div class="onboarding-option" data-level="intermediate">
              <div class="onboarding-option-icon">📈</div>
              <div class="onboarding-option-title">Intermedio</div>
              <p class="onboarding-option-desc">Sé aritmética y álgebra básica. Quiero ir más allá.</p>
            </div>
            <div class="onboarding-option" data-level="advanced">
              <div class="onboarding-option-icon">🚀</div>
              <div class="onboarding-option-title">Avanzado</div>
              <p class="onboarding-option-desc">Sé cálculo. Quiero temas avanzados y aplicaciones.</p>
            </div>
          </div>
          
          <div class="onboarding-actions">
            <button class="btn btn-ghost" disabled>Anterior</button>
            <button class="btn btn-primary" id="btn-start">Comenzar el curso →</button>
          </div>
        </div>
      </div>
    `;
    
    // Bind level selection
    container.querySelectorAll('.onboarding-option').forEach(opt => {
      opt.addEventListener('click', () => {
        container.querySelectorAll('.onboarding-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });
    
    // Bind start button
    container.querySelector('#btn-start')?.addEventListener('click', () => {
      const name = prompt('¿Cómo te llamas?') || 'Estudiante';
      store.setUserName(name);
      store.set('user.id', crypto.randomUUID());
      store.set('user.createdAt', Date.now());
      store.startModule('m01');
      router.navigate('/dashboard', { replace: true });
    });
  }
};