// tests/content/m25-content.test.js
// Valida que el contenido estructurado de m25 cumple el esquema pedagógico
// y que todas sus fórmulas LaTeX compilan con KaTeX.
import { describe, it, expect } from 'vitest';
import { renderToString } from 'katex';
import m25Content from '../../modules/m25/content.js';
import { validateModuleContent } from '../../assets/js/content/module-schema.js';

describe('Módulo m25 — Contenido estructurado (Cónicas)', () => {
  it('cumple el esquema pedagógico completo', () => {
    const validation = validateModuleContent(m25Content);
    expect(validation.valid).toBe(true);
    if (!validation.valid) {
      console.error('Errores de esquema:', validation.errors);
    }
  });

  it('tiene las 4 secciones requeridas: teoría, práctica, quiz, interactivo', () => {
    expect(m25Content.theory).toBeDefined();
    expect(m25Content.practice).toBeDefined();
    expect(m25Content.quiz).toBeDefined();
    expect(m25Content.interactive).toBeDefined();
  });

  it('teoría tiene al menos una sección con contenido y analogías', () => {
    expect(m25Content.theory.sections.length).toBeGreaterThan(0);
    m25Content.theory.sections.forEach(sec => {
      expect(sec.content.length).toBeGreaterThan(50);
      expect(sec.analogies.length).toBeGreaterThan(0);
    });
  });

  it('teoría tiene contexto histórico', () => {
    expect(m25Content.theory.historicalContext.length).toBeGreaterThan(20);
  });

  it('teoría tiene misconceptions con remediación', () => {
    expect(m25Content.theory.misconceptions.length).toBeGreaterThan(0);
    m25Content.theory.misconceptions.forEach(m => {
      expect(m.name).toBeDefined();
      expect(m.description).toBeDefined();
      expect(m.remediation).toBeDefined();
    });
  });

  it('práctica tiene ejercicios con pasos y soluciones', () => {
    expect(m25Content.practice.exercises.length).toBeGreaterThan(0);
    m25Content.practice.exercises.forEach(ex => {
      expect(ex.question).toBeDefined();
      expect(ex.solution).toBeDefined();
      expect(ex.steps.length).toBeGreaterThan(0);
    });
  });

  it('quiz tiene preguntas con explicación obligatoria', () => {
    expect(m25Content.quiz.questions.length).toBeGreaterThan(0);
    m25Content.quiz.questions.forEach(q => {
      expect(q.question).toBeDefined();
      expect(q.explanation).toBeDefined();
      if (q.type === 'multiple-choice') {
        expect(q.options.length).toBeGreaterThanOrEqual(2);
        expect(q.correct).toBeGreaterThanOrEqual(0);
        expect(q.correct).toBeLessThan(q.options.length);
      }
    });
  });

  it('todas las fórmulas LaTeX de teoría compilan con KaTeX', () => {
    const broken = [];
    for (const sec of m25Content.theory.sections) {
      for (const latex of sec.formulas || []) {
        try {
          renderToString(latex, { throwOnError: true, displayMode: true, strict: false, trust: true });
        } catch (e) {
          broken.push({ latex, error: e.message });
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it('tiene objetivos de aprendizaje definidos', () => {
    expect(m25Content.learningObjectives.length).toBeGreaterThan(0);
  });

  it('tiene tags y dificultad asignada', () => {
    expect(Array.isArray(m25Content.tags)).toBe(true);
    expect(m25Content.tags.length).toBeGreaterThan(0);
    expect(typeof m25Content.difficulty).toBe('number');
  });
});
