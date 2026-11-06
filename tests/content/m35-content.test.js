// tests/content/m35-content.test.js
// Valida que el contenido estructurado de m35 cumple el esquema pedagógico.
import { describe, it, expect } from 'vitest';
import { renderToString } from 'katex';
import m35Content from '../../modules/m35/content.js';
import { validateModuleContent } from '../../assets/js/content/module-schema.js';

describe('Módulo m35 — Contenido estructurado (Cálculo Multivariable)', () => {
  it('cumple el esquema pedagógico completo', () => {
    const validation = validateModuleContent(m35Content);
    expect(validation.valid).toBe(true);
    if (!validation.valid) {
      console.error('Errores de esquema:', validation.errors);
    }
  });

  it('tiene las 4 secciones requeridas', () => {
    expect(m35Content.theory).toBeDefined();
    expect(m35Content.practice).toBeDefined();
    expect(m35Content.quiz).toBeDefined();
    expect(m35Content.interactive).toBeDefined();
  });

  it('teoría tiene secciones con contenido y analogías', () => {
    expect(m35Content.theory.sections.length).toBeGreaterThan(0);
    m35Content.theory.sections.forEach(sec => {
      expect(sec.content.length).toBeGreaterThan(50);
      expect(sec.analogies.length).toBeGreaterThan(0);
    });
  });

  it('teoría tiene contexto histórico', () => {
    expect(m35Content.theory.historicalContext.length).toBeGreaterThan(20);
  });

  it('teoría tiene misconceptions con remediación', () => {
    expect(m35Content.theory.misconceptions.length).toBeGreaterThan(0);
  });

  it('práctica tiene ejercicios con pasos y soluciones', () => {
    expect(m35Content.practice.exercises.length).toBeGreaterThan(0);
  });

  it('quiz tiene preguntas con explicación obligatoria', () => {
    expect(m35Content.quiz.questions.length).toBeGreaterThan(0);
  });

  it('todas las fórmulas LaTeX compilan con KaTeX', () => {
    const broken = [];
    for (const sec of m35Content.theory.sections) {
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
    expect(m35Content.learningObjectives.length).toBeGreaterThan(0);
  });

  it('tiene tags y dificultad asignada', () => {
    expect(m35Content.tags.length).toBeGreaterThan(0);
    expect(typeof m35Content.difficulty).toBe('number');
  });
});
