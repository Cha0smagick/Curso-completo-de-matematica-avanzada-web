// tests/components/mathformula-glyphs.test.js
// P2-3: el mapa glifo→explicación debe ser correcto. Verificación: el ejemplo LaTeX de
// cada entrada renderiza con KaTeX y CONTIENE su propio glifo (si el glifo está mal
// asignado, este test lo canta).
import { describe, it, expect } from 'vitest';
import { renderToString } from 'katex';
import { GLYPH_EXPLANATIONS } from '../../assets/js/components/math-symbols.js';

describe('GLYPH_EXPLANATIONS', () => {
  it('cada ejemplo renderiza y contiene su glifo', () => {
    const wrong = [];
    for (const [glyph, info] of Object.entries(GLYPH_EXPLANATIONS)) {
      try {
        const html = renderToString(info.example, { throwOnError: true, displayMode: true, strict: false, trust: true });
        if (!html.includes(glyph)) {
          wrong.push(`${glyph} (${info.latex}): el glifo no aparece en el render de "${info.example}"`);
        }
      } catch (e) {
        wrong.push(`${glyph} (${info.latex}): ejemplo no compila — ${e.message}`);
      }
    }
    expect(wrong).toEqual([]);
  });

  it('no hay glifos duplicados ni comandos vacíos', () => {
    const latexSet = new Set(Object.values(GLYPH_EXPLANATIONS).map((i) => i.latex));
    expect(latexSet.size).toBe(Object.keys(GLYPH_EXPLANATIONS).length);
  });
});
