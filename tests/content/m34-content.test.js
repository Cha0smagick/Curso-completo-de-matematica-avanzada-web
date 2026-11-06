// tests/content/m34-content.test.js
// Valida que el contenido estructurado de m34 cumple el esquema pedagógico.
import { describe, it, expect } from 'vitest';
import { renderToString } from 'katex';
import m34Content from '../../modules/m34/content.js';
import { validateModuleContent } from '../../assets/js/content/module-schema.js';

describe('Módulo m34 — Contenido estructurado (Ecuaciones Diferenciales)', () => {
  it('cumple el esquema pedagógico completo', () => {
    const validation = validateModuleContent(m34Content);
    expect(validation.valid).toBe(true);
    if (!validation.valid) {
      console.error('Errores de esquema:', validation.errors);
    }
  });

  it('tiene las 4 secciones requeridas', () => {
    expect(m34Content.theory).toBeDefined();
    expect(m34Content.practice).toBeDefined();
    expect(m34Content.quiz).toBeDefined();
    expect(m34Content.interactive).toBeDefined();
  });

  it('teoría tiene secciones con contenido y analogías', () => {
    expect(m34Content.theory.sections.length).toBeGreaterThan(0);
    m34Content.theory.sections.forEach(sec => {
      expect(sec.content.length).toBeGreaterThan(50);
      expect(sec.analogies.length).toBeGreaterThan(0);
    });
  });

  it('teoría tiene contexto histórico', () => {
    expect(m34Content.theory.historicalContext.length).toBeGreaterThan(20);
  });

  it('teoría tiene misconceptions con remediación', () => {
    expect(m34Content.theory.misconceptions.length).toBeGreaterThan(0);
  });

  it('práctica tiene ejercicios con pasos y soluciones', () => {
    expect(m34Content.practice.exercises.length).toBeGreaterThan(0);
  });

  it('quiz tiene preguntas con explicación obligatoria', () => {
    expect(m34Content.quiz.questions.length).toBeGreaterThan(0);
  });

  it('todas las fórmulas LaTeX compilan con KaTeX', () => {
    const broken = [];
    for (const sec of m34Content.theory.sections) {
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
    expect(m34Content.learningObjectives.length).toBeGreaterThan(0);
  });

  it('tiene tags y dificultad asignada', () => {
    expect(m34Content.tags.length).toBeGreaterThan(0);
    expect(typeof m34Content.difficulty).toBe('number');
  });
});
