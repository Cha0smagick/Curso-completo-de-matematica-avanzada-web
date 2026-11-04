// tests/components/mathformula.test.js
// Humo: el Web Component <math-formula> se registra y renderiza KaTeX en su shadow DOM.
import { describe, it, expect, beforeAll } from 'vitest';

let MathFormula;

beforeAll(async () => {
  // jsdom no implementa fetch de CSS; el import ?inline llega vacío pero el registro funciona
  const mod = await import('../../assets/js/components/MathFormula.js');
  MathFormula = mod.MathFormula;
});

describe('math-formula', () => {
  it('se registra como custom element', () => {
    expect(customElements.get('math-formula')).toBe(MathFormula);
  });

  it('renderiza HTML de KaTeX dentro del shadow root', () => {
    const el = document.createElement('math-formula');
    el.setAttribute('latex', '\\frac{a}{b}');
    document.body.appendChild(el);
    expect(el.shadowRoot.innerHTML).toContain('katex');
    expect(el.shadowRoot.querySelector('.katex')).toBeTruthy();
    el.remove();
  });

  it('modo display aplica clase katex-display', () => {
    const el = document.createElement('math-formula');
    el.setAttribute('latex', 'x + 1');
    el.setAttribute('display', '');
    document.body.appendChild(el);
    expect(el.shadowRoot.innerHTML).toContain('katex-display');
    el.remove();
  });

  it('LaTeX inválido produce un katex-error visible, no una excepción', () => {
    const el = document.createElement('math-formula');
    el.setAttribute('latex', '\\frac{');
    document.body.appendChild(el);
    expect(el.shadowRoot.querySelector('.katex-error')).toBeTruthy();
    el.remove();
  });
});
