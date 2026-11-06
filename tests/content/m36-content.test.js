// tests/content/m36-content.test.js
import { describe, it, expect } from 'vitest';
import { renderToString } from 'katex';
import m36Content from '../../modules/m36/content.js';
import { validateModuleContent } from '../../assets/js/content/module-schema.js';

describe('Módulo m36 — Contenido estructurado (Matrices y Determinantes)', () => {
  it('cumple el esquema pedagógico completo', () => {
    const validation = validateModuleContent(m36Content);
    expect(validation.valid).toBe(true);
    if (!validation.valid) {
      console.error('Errores de esquema:', validation.errors);
    }
  });

  it('tiene las 4 secciones requeridas', () => {
    expect(m36Content.theory).toBeDefined();
    expect(m36Content.practice).toBeDefined();
    expect(m36Content.quiz).toBeDefined();
    expect(m36Content.interactive).toBeDefined();
  });

  it('teoría tiene secciones con contenido y analogías', () => {
    expect(m36Content.theory.sections.length).toBeGreaterThan(0);
    m36Content.theory.sections.forEach(sec => {
      expect(sec.content.length).toBeGreaterThan(50);
      expect(sec.analogies.length).toBeGreaterThan(0);
    });
  });

  it('teoría tiene contexto histórico', () => {
    expect(m36Content.theory.historicalContext.length).toBeGreaterThan(20);
  });

  it('teoría tiene misconceptions con remediación', () => {
    expect(m36Content.theory.misconceptions.length).toBeGreaterThan(0);
  });

  it('práctica tiene ejercicios con pasos y soluciones', () => {
    expect(m36Content.practice.exercises.length).toBeGreaterThan(0);
  });

  it('quiz tiene preguntas con explicación obligatoria', () => {
    expect(m36Content.quiz.questions.length).toBeGreaterThan(0);
  });

  it('todas las fórmulas LaTeX compilan con KaTeX', () => {
    const broken = [];
    for (const sec of m36Content.theory.sections) {
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
    expect(m36Content.learningObjectives.length).toBeGreaterThan(0);
  });

  it('tiene tags y dificultad asignada', () => {
    expect(m36Content.tags.length).toBeGreaterThan(0);
    expect(typeof m36Content.difficulty).toBe('number');
  });
});
