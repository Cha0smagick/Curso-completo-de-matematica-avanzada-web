/* ==========================================================================
   KATEX HELPER - Matemáticas Avanzadas
   Utilidades para renderizado LaTeX con KaTeX, cache, validación
   ========================================================================== */

import { renderToString } from 'katex';

/* ==========================================================================
   CACHE DE RENDERIZADO
   ========================================================================== */
const katexCache = new Map();
const MAX_CACHE_SIZE = 1000;

const defaultOptions = {
  throwOnError: false,
  displayMode: false,
  strict: false,
  trust: true,
  output: 'html',
  macros: {
    '\\R': '\\mathbb{R}',
    '\\N': '\\mathbb{N}',
    '\\Z': '\\mathbb{Z}',
    '\\Q': '\\mathbb{Q}',
    '\\C': '\\mathbb{C}',
    '\\d': '\\,\\mathrm{d}',
    '\\pd': '\\frac{\\partial #1}{\\partial #2}',
    '\\abs': '\\left| #1 \\right|',
    '\\norm': '\\left\\| #1 \\right\\|',
    '\\eval': '\\left[ #1 \\right]_{#2}^{#3}',
    '\\int': '\\int',
    '\\iint': '\\iint',
    '\\iiint': '\\iiint',
    '\\oint': '\\oint',
    '\\sum': '\\sum',
    '\\prod': '\\prod',
    '\\lim': '\\lim',
    '\\infty': '\\infty',
    '\\partial': '\\partial',
    '\\nabla': '\\nabla',
    '\\alpha': '\\alpha',
    '\\beta': '\\beta',
    '\\gamma': '\\gamma',
    '\\delta': '\\delta',
    '\\epsilon': '\\epsilon',
    '\\varepsilon': '\\varepsilon',
    '\\zeta': '\\zeta',
    '\\eta': '\\eta',
    '\\theta': '\\theta',
    '\\vartheta': '\\vartheta',
    '\\iota': '\\iota',
    '\\kappa': '\\kappa',
    '\\lambda': '\\lambda',
    '\\mu': '\\mu',
    '\\nu': '\\nu',
    '\\xi': '\\xi',
    '\\pi': '\\pi',
    '\\varpi': '\\varpi',
    '\\rho': '\\rho',
    '\\varrho': '\\varrho',
    '\\sigma': '\\sigma',
    '\\varsigma': '\\varsigma',
    '\\tau': '\\tau',
    '\\upsilon': '\\upsilon',
    '\\phi': '\\phi',
    '\\varphi': '\\varphi',
    '\\chi': '\\chi',
    '\\psi': '\\psi',
    '\\omega': '\\omega',
    '\\Gamma': '\\Gamma',
    '\\Delta': '\\Delta',
    '\\Theta': '\\Theta',
    '\\Lambda': '\\Lambda',
    '\\Xi': '\\Xi',
    '\\Pi': '\\Pi',
    '\\Sigma': '\\Sigma',
    '\\Upsilon': '\\Upsilon',
    '\\Phi': '\\Phi',
    '\\Psi': '\\Psi',
    '\\Omega': '\\Omega'
  }
};

/* ==========================================================================
   RENDERIZADO PRINCIPAL
   ========================================================================== */

/**
 * Renderizar LaTeX a HTML
 * @param {string} latex - Código LaTeX
 * @param {Object} options - Opciones de KaTeX
 * @returns {string} HTML renderizado
 */
export function renderLatex(latex, options = {}) {
  if (!latex || typeof latex !== 'string') return '';
  
  const opts = { ...defaultOptions, ...options };
  const cacheKey = `${latex}|${opts.displayMode}|${opts.throwOnError}`;
  
  // Verificar cache
  if (katexCache.has(cacheKey)) {
    return katexCache.get(cacheKey);
  }
  
  try {
    const html = renderToString(latex.trim(), opts);
    
    // Guardar en cache
    if (katexCache.size >= MAX_CACHE_SIZE) {
      const firstKey = katexCache.keys().next().value;
      katexCache.delete(firstKey);
    }
    katexCache.set(cacheKey, html);
    
    return html;
  } catch (error) {
    console.warn('[KatexHelper] Render error:', error.message, latex);
    return `<span class="katex-error" title="${escapeHtml(error.message)}">${escapeHtml(latex)}</span>`;
  }
}

/**
 * Renderizar LaTeX en modo display (bloque)
 */
export function renderLatexDisplay(latex, options = {}) {
  return renderLatex(latex, { ...options, displayMode: true });
}

/**
 * Renderizar LaTeX en modo inline
 */
export function renderLatexInline(latex, options = {}) {
  return renderLatex(latex, { ...options, displayMode: false });
}

/* ==========================================================================
   VALIDACIÓN
   ================================== */

/**
 * Validar sintaxis LaTeX sin renderizar
 * @param {string} latex - Código LaTeX
 * @returns {Object} { valid: boolean, error?: string }
 */
export function validateLatex(latex) {
  if (!latex || typeof latex !== 'string') {
    return { valid: false, error: 'LaTeX vacío o inválido' };
  }
  
  try {
    renderToString(latex.trim(), { ...defaultOptions, throwOnError: true });
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

/**
 * Verificar si LaTeX contiene comandos no permitidos
 * @param {string} latex - Código LaTeX
 * @returns {Object} { safe: boolean, issues: string[] }
 */
export function checkLatexSafety(latex) {
  const issues = [];
  const dangerousPatterns = [
    { pattern: /\\input\s*\{/g, name: '\\input' },
    { pattern: /\\include\s*\{/g, name: '\\include' },
    { pattern: /\\write18/g, name: '\\write18' },
    { pattern: /\\openout/g, name: '\\openout' },
    { pattern: /\\read/g, name: '\\read' },
    { pattern: /\\catcode/g, name: '\\catcode' },
    { pattern: /\\def\s*\\/g, name: '\\def de control sequence' }
  ];
  
  for (const { pattern, name } of dangerousPatterns) {
    if (pattern.test(latex)) {
      issues.push(`Comando potencialmente inseguro: ${name}`);
    }
  }
  
  // Verificar llaves balanceadas
  let braceCount = 0;
  for (const char of latex) {
    if (char === '{') braceCount++;
    else if (char === '}') braceCount--;
    if (braceCount < 0) {
      issues.push('Llaves desbalanceadas: } sin { correspondiente');
      break;
    }
  }
  if (braceCount > 0) {
    issues.push(`Llaves desbalanceadas: ${braceCount} { sin cerrar`);
  }
  
  return {
    safe: issues.length === 0,
    issues
  };
}

/* ==========================================================================
   UTILIDADES DE TEXTO
   ========================================================================== */

/**
 * Extraer fórmulas LaTeX de un texto mixto
 * @param {string} text - Texto con $...$ y $$...$$
 * @returns {Array} Array de { type: 'inline'|'display', latex: string, index: number }
 */
export function extractFormulas(text) {
  const formulas = [];
  let displayRegex = /\$\$([\s\S]+?)\$\$/g;
  let inlineRegex = /\$([\s\S]+?)\$/g;
  
  // Primero display
  let match;
  while ((match = displayRegex.exec(text)) !== null) {
    formulas.push({
      type: 'display',
      latex: match[1],
      index: match.index,
      fullMatch: match[0]
    });
  }
  
  // Luego inline (excluyendo los ya capturados en display)
  const displayRanges = formulas.map(f => [f.index, f.index + f.fullMatch.length]);
  
  while ((match = inlineRegex.exec(text)) !== null) {
    const isInsideDisplay = displayRanges.some(([start, end]) => 
      match.index >= start && match.index < end
    );
    if (!isInsideDisplay) {
      formulas.push({
        type: 'inline',
        latex: match[1],
        index: match.index,
        fullMatch: match[0]
      });
    }
  }
  
  // Ordenar por posición
  formulas.sort((a, b) => a.index - b.index);
  
  return formulas;
}

/**
 * Convertir texto con LaTeX a HTML con componentes math-formula
 * @param {string} text - Texto con $...$ y $$...$$
 * @returns {string} HTML con <math-formula>
 */
export function convertMathToComponents(text) {
  if (!text) return '';
  
  let result = text;
  
  // Reemplazar $$...$$ (display)
  result = result.replace(/\$\$([\s\S]+?)\$\$/g, (match, latex) => 
    `<math-formula latex="${escapeHtml(latex.trim())}" display></math-formula>`
  );
  
  // Reemplazar $...$ (inline)
  result = result.replace(/\$([\s\S]+?)\$/g, (match, latex) => 
    `<math-formula latex="${escapeHtml(latex.trim())}"></math-formula>`
  );
  
  return result;
}

/**
 * Convertir HTML con math-formula de vuelta a texto con $/$ $
 * @param {string} html - HTML con math-formula
 * @returns {string} Texto con LaTeX delimitado
 */
export function convertComponentsToMath(html) {
  if (!html) return '';
  
  let result = html;
  
  // Display
  result = result.replace(
    /<math-formula[^>]*display[^>]*>([\s\S]*?)<\/math-formula>/g,
    (match, inner) => {
      // Extraer latex del data attribute o innerHTML
      const latexMatch = match.match(/latex="([^"]*)"/);
      if (latexMatch) {
        return `$$${latexMatch[1]}$$`;
      }
      return match;
    }
  );
  
  // Inline
  result = result.replace(
    /<math-formula[^>]*>([\s\S]*?)<\/math-formula>/g,
    (match, inner) => {
      const latexMatch = match.match(/latex="([^"]*)"/);
      if (latexMatch) {
        return `$${latexMatch[1]}$`;
      }
      return match;
    }
  );
  
  return result;
}

/* ==========================================================================
   PREPROCESAMIENTO MATEMÁTICO
   ========================================================================== */

/**
 * Preprocesar LaTeX para corregir errores comunes
 * @param {string} latex - LaTeX crudo
 * @returns {string} LaTeX preprocesado
 */
export function preprocessLatex(latex) {
  if (!latex) return '';
  
  return latex
    // Espacios implícitos en funciones
    .replace(/(\\(?:sin|cos|tan|sec|csc|cot|arcsin|arccos|arctan|sinh|cosh|tanh|log|ln|exp|det|ker|dim|rank|tr|Re|Im|arg|deg|max|min|sup|inf|lim|limsup|liminf))\s*([a-zA-Z])/g, '$1\\,$2')
    // Multiplicación implícita: 2x -> 2\\,x
    .replace(/(\d)([a-zA-Z])/g, '$1\\,$2')
    // Paréntesis: )( -> )\\,( 
    .replace(/\)\s*\(/g, ')\\,(')
    // Números con comas: 1,000 -> 1{,}000
    .replace(/(\d),(\d{3})/g, '$1{,} $2')
    // Espaciar operadores
    .replace(/\s*\+\s*/g, '\\,+\\,')
    .replace(/\s*\-\s*/g, '\\,-\\,')
    .replace(/\s*\=\s*/g, '\\,=\\,')
    .replace(/\s*\<\s*/g, '\\,<\\,')
    .replace(/\s*\>\s*/g, '\\,>\\,')
    .replace(/\s*\<\=\s*/g, '\\,\\le\\,')
    .replace(/\s*\>\=\s*/g, '\\,\\ge\\,')
    .replace(/\s*\<\>\s*/g, '\\,\\ne\\,')
    .replace(/\s*\~\s*/g, '\\,\\sim\\,')
    .replace(/\s*\*\s*/g, '\\,\\cdot\\,')
    .replace(/\s*\/\s*/g, '\\,/\\,')
    // Diferenciales
    .replace(/d([xyzt])/g, '\\,\\mathrm{d}$1')
    .replace(/d\\([a-z]+)\\)/g, '\\,\\mathrm{d}$1')
    // Normalizar espacios múltiples
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Normalizar LaTeX para comparación
 * @param {string} latex - LaTeX
 * @returns {string} LaTeX normalizado
 */
export function normalizeLatex(latex) {
  if (!latex) return '';
  
  return latex
    .replace(/\s+/g, '')           // Eliminar espacios
    .replace(/\\,/g, '')           // Eliminar espacios finos
    .replace(/\\;/g, '')           // Eliminar espacios medios
    .replace(/\\:/g, '')           // Eliminar espacios grandes
    .replace(/\\!/g, '')           // Eliminar espacios negativos
    .replace(/\\quad/g, '')        // Eliminar quads
    .replace(/\\qquad/g, '')       // Eliminar double quads
    .replace(/\{([^}]*)\}/g, '$1') // Eliminar llaves innecesarias
    .toLowerCase();                // Case insensitive
}

/* ==========================================================================
   ESCAPE HTML
   ========================================================================== */

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ==========================================================================
   EXPORTACIONES
   ========================================================================== */

export const KatexHelper = {
  renderLatex,
  renderLatexDisplay,
  renderLatexInline,
  validateLatex,
  checkLatexSafety,
  extractFormulas,
  convertMathToComponents,
  convertComponentsToMath,
  preprocessLatex,
  normalizeLatex,
  clearCache: () => katexCache.clear(),
  getCacheSize: () => katexCache.size
};

export default KatexHelper;