// tests/content/latex.test.js
// Gate de contenido: TODO el LaTeX declarado en páginas de módulo debe compilar con KaTeX.
// Antes de este test, LaTeX roto llegaba a producción sin que nadie lo supiera.
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { renderToString } from 'katex';

const root = join(__dirname, '..', '..');

// Módulos con página de contenido (mismos que la vista SPA intenta hacer fetch)
const contentModules = ['m01'];

describe('LaTeX de contenido', () => {
  for (const moduleId of contentModules) {
    it(`${moduleId}: todas las fórmulas latex="..." compilan con KaTeX`, () => {
      const file = join(root, 'modules', moduleId, 'index.html');
      expect(existsSync(file)).toBe(true);
      const html = readFileSync(file, 'utf-8');

      const formulas = [...html.matchAll(/latex="([^"]+)"/g)].map((m) => m[1]);
      expect(formulas.length).toBeGreaterThan(0);

      const broken = [];
      for (const latex of formulas) {
        try {
          renderToString(latex, { throwOnError: true, displayMode: true, strict: false, trust: true });
        } catch (e) {
          broken.push({ latex, error: e.message });
        }
      }
      expect(broken).toEqual([]);
    });
  }

  it('curriculum.json: cada módulo tiene id, título, objetivos y tiempo', () => {
    const curriculum = JSON.parse(readFileSync(join(root, 'assets', 'data', 'curriculum.json'), 'utf-8'));
    const problems = [];
    for (const phase of curriculum.phases) {
      for (const m of phase.modules) {
        if (!m.id || !m.title) problems.push(`fase ${phase.id}: módulo sin id/título`);
        if (!Array.isArray(m.learningObjectives) || m.learningObjectives.length === 0) {
          problems.push(`${m.id}: sin learningObjectives`);
        }
        if (!m.estimatedMinutes) problems.push(`${m.id}: sin estimatedMinutes`);
      }
    }
    expect(problems).toEqual([]);
  });
});
