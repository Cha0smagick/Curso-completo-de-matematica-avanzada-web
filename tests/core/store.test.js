// tests/core/store.test.js
// Lógica de negocio real del store: progreso, desbloqueo, SM-2, certificados, logout.
import { describe, it, expect, beforeEach } from 'vitest';
import { store } from '../../assets/js/core/store.js';
import { readFileSync } from 'fs';
import { join } from 'path';

beforeEach(() => {
  store.state = JSON.parse(JSON.stringify({
    ...store.state,
    progress: {},
    quizAttempts: [],
    reviewQueue: [],
    certificates: []
  }));
  store.courseTotal = 0;
});

describe('Curriculum', () => {
  it('carga 7 fases y 46 módulos', () => {
    const curriculum = JSON.parse(readFileSync(join(__dirname, '..', '..', 'assets', 'data', 'curriculum.json'), 'utf-8'));
    expect(curriculum.phases.length).toBe(7);
    expect(curriculum.metadata.totalModules).toBe(46);
  });
});

describe('progreso de curso', () => {
  it('usa el total inyectado del currículo, no solo los módulos con registro', () => {
    store.setCourseTotal(46);
    store.state.progress['m01'] = { status: 'completed' };
    const p = store.getCourseProgress();
    expect(p.total).toBe(46);
    expect(p.completed).toBe(1);
    expect(p.percentage).toBe(2); // 1/46 ≈ 2%
  });

  it('completar un módulo desbloquea el siguiente', () => {
    store.state.progress['m01'] = { status: 'in-progress', quizScore: 0, bestScore: 0 };
    store.completeModule('m01', 90);
    expect(store.getModuleProgress('m01').status).toBe('completed');
    expect(store.getModuleProgress('m02').status).toBe('available');
  });
});

describe('repaso espaciado SM-2', () => {
  it('"again" reinicia el intervalo', () => {
    const item = store.addToReviewQueue({ id: 'q1', moduleId: 'm01', questionId: 'm01-q1' });
    item.interval = 10;
    item.repetitions = 3;
    store.gradeReviewItem('q1', 'again');
    expect(item.interval).toBe(1);
    expect(item.repetitions).toBe(0);
  });

  it('"good" progresión 1 → 6 → 15 con easeFactor 2.5', () => {
    const item = store.addToReviewQueue({ id: 'q2', moduleId: 'm01', questionId: 'm01-q2' });
    store.gradeReviewItem('q2', 'good');
    expect(item.interval).toBe(1);
    store.gradeReviewItem('q2', 'good');
    expect(item.interval).toBe(6);
    store.gradeReviewItem('q2', 'good');
    expect(item.interval).toBe(15); // round(6 * 2.5)
    expect(item.repetitions).toBe(3);
  });
});

describe('certificados', () => {
  it('genera hash con forma sha256 de 64 hex', async () => {
    const cert = await store.earnCertificate({ type: 'module', moduleId: 'm01', studentName: 'Test' });
    expect(cert.verificationHash).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(store.verifyCertificate(cert.verificationHash).valid).toBe(true);
  });
});

describe('logout', () => {
  it('conserva el progreso y limpia la identidad', async () => {
    store.state.user.id = 'u1';
    store.state.user.name = 'Ana';
    store.state.progress['m01'] = { status: 'completed' };
    await store.logoutUser();
    expect(store.get('user.id')).toBeNull();
    expect(store.get('user.name')).toBe('Estudiante');
    expect(store.getModuleProgress('m01').status).toBe('completed');
  });
});
