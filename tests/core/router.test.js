// tests/core/router.test.js
// Verifica la cadena estricta de desbloqueo y el redirect de módulos bloqueados.
import { describe, it, expect, beforeEach } from 'vitest';
import { router, Routes } from '../../assets/js/core/router.js';
import { store } from '../../assets/js/core/store.js';

function go(path) {
  return router.processRoute(
    { route: path, params: {}, path },
    null,
    false
  );
}

// helper para navegar una ruta con params como lo haría el matcher
async function goModule(moduleId) {
  const path = `/module/${moduleId}`;
  location.hash = `#${path}`;
  await router.processRoute(
    { route: Routes.MODULE, params: { moduleId }, path },
    null,
    false
  );
}

beforeEach(() => {
  // resetea progreso y usuario sin tocar IndexedDB (init nunca se llama en tests)
  store.state.progress = {};
  store.state.user.id = 'test-user';
});

describe('guard de prerrequisitos', () => {
  it('m01 siempre accesible', async () => {
    await goModule('m01');
    expect(location.hash).not.toBe('#/dashboard');
  });

  it('m02 bloqueado redirige a dashboard', async () => {
    await goModule('m02');
    expect(location.hash).toBe('#/dashboard');
  });

  it('m02 se desbloquea si m01 está completed', async () => {
    store.state.progress['m01'] = { status: 'completed', bestScore: 90 };
    await goModule('m02');
    expect(store.getModuleProgress('m02').status).toBe('available');
    expect(location.hash).not.toBe('#/dashboard');
  });

  it('m02 NO se desbloquea si m01 solo está in-progress (antes se abría solo)', async () => {
    store.state.progress['m01'] = { status: 'in-progress' };
    await goModule('m02');
    expect(location.hash).toBe('#/dashboard');
    expect(store.getModuleProgress('m02').status).toBe('locked');
  });
});
