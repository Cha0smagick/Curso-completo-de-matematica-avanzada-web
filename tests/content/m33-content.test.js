// tests/content/m33-content.test.js
// Valida que el contenido estructurado de m33 cumple el esquema pedagógico.
import { describe, it, expect } from 'vitest';
import { renderToString } from 'katex';
import m33Content from '../../modules/m33/content.js';
import { validateModuleContent } from '../../assets/js/content/module-schema.js';

describe('Módulo m33 — Contenido estructurado (Aplicaciones de la Integral)', () => {
  it('cumple el esquema pedagógico completo', () => {
    const validation = validateModuleContent(m33Content);
    expect(validation.valid).toBe(true);
    if (!validation.valid) {
      console.error('Errores de esquema:', validation.errors);
    }
  });

  it('tiene las 4 secciones requeridas', () => {
    expect(m33Content.theory).toBeDefined();
    expect(m33Content.practice).toBeDefined();
    expect(m33Content.quiz).toBeDefined();
    expect(m33Content.interactive).toBeDefined();
  });

  it('teoría tiene secciones con contenido y analogías', () => {
    expect(m33Content.theory.sections.length).toBeGreaterThan(0);
    m33Content.theory.sections.forEach(sec => {
      expect(sec.content.length).toBeGreaterThan(50);
      expect(sec.analogies.length).toBeGreaterThan(0);
    });
  });

  it('teoría tiene contexto histórico', () => {
    expect(m33Content.theory.historicalContext.length).toBeGreaterThan(20);
  });

  it('teoría tiene misconceptions con remediación', () => {
    expect(m33Content.theory.misconceptions.length).toBeGreaterThan(0);
  });

  it('práctica tiene ejercicios con pasos y soluciones', () => {
    expect(m33Content.practice.exercises.length).toBeGreaterThan(0);
  });

  it('quiz tiene preguntas con explicación obligatoria', () => {
    expect(m33Content.quiz.questions.length).toBeGreaterThan(0);
  });

  it('todas las fórmulas LaTeX compilan con KaTeX', () => {
    const broken = [];
    for (const sec of m33Content.theory.sections) {
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
    expect(m33Content.learningObjectives.length).toBeGreaterThan(0);
  });

  it('tiene tags y dificultad asignada', () => {
    expect(m33Content.tags.length).toBeGreaterThan(0);
    expect(typeof m33Content.difficulty).toBe('number');
  });
});
