// modules/m25/content.js
// Contenido estructurado — Módulo 25: Cónicas
// Circunferencia, parábola, elipse, hipérbola: ecuaciones canónicas/grales, elementos, tangentes, propiedades ópticas, ecuación general de 2º grado.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm25',
  title: 'Cónicas',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['circunferencia', 'parábola', 'elipse', 'hipérbola', 'ecuación canónica', 'ecuación general', 'tangentes', 'propiedades ópticas'],
  learningObjectives: [
    'Entender qué son las cónicas y cómo se obtienen seccionando un cono',
    'Identificar y graficar circunferencia, parábola, elipse e hipérbola',
    'Escribir ecuaciones canónicas y generales de cada cónica',
    'Identificar elementos de cada cónica (centro, vértices, focos, ejes, asíntotas)',
    'Aplicar propiedades ópticas de las cónicas',
    'Clasificar una cónica a partir de su ecuación general de 2º grado'
  ],
  theory: {
    historicalContext: 'Las cónicas fueron estudiadas por los antiguos griegos, especialmente por Apolonio de Perga (siglo III a.C.), quien las llamó "secciones de un cono". Las cónicas se obtienen cortando un cono con un plano. Más tarde, Descartes y Fermat las estudiaron desde el álgebra, y Kepler descubrió que los planetas se mueven en elipsas con el Sol en un foco (primera ley de Kepler).',
    sections: [
      {
        number: '25.1',
        title: '¿Qué son las cónicas?',
        content: 'Las cónicas son las curvas que se obtienen al cortar un cono circular recto con un plano. Dependiendo del ángulo de corte, se obtienen: círculo (corte perpendicular al eje), elipse (corte oblicuo que no corta la base), parábola (corte paralelo a una generatriz) e hipérbola (corte que corta ambas hojas del cono).',
        formulas: [],
        analogies: [
          'Es como cortar un helado de cono con un cuchillo en diferentes ángulos: obtienes diferentes formas en el corte.'
        ]
      },
      {
        number: '25.2',
        title: 'Circunferencia',
        content: 'Una circunferencia es el lugar geométrico de los puntos del plano que están a una distancia fija (radio) de un punto fijo (centro). Su ecuación canónica con centro en el origen es x² + y² = r², y con centro en (h, k) es (x - h)² + (y - k)² = r².',
        formulas: ['(x - h)² + (y - k)² = r²'],
        'analogies': [
          'Una circunferencia es como el borde de una rueda o de una moneda.'
        ]
      },
      {
        number: '25.3',
        title: 'Parábola',
        content: 'Una parábola es el lugar geométrico de los puntos equidistantes de un punto fijo (foco) y una recta fija (directriz). Su ecuación canónica con vértice en el origen es y² = 4px (eje horizontal) o x² = 4py (eje vertical). Tiene propiedades ópticas importantes: los rayos paralelos al eje se reflejan en el foco (usado en antenas parabólicas y faros).',
        formulas: ['y² = 4px', 'x² = 4py'],
        'analogies': [
          'Una parábola es como la forma de una antena parabólica o de un reflector de faro.'
        ]
      },
      {
        number: '25.4',
        title: 'Elipse',
        content: 'Una elipse es el lugar geométrico de los puntos cuya suma de distancias a dos puntos fijos (focos) es constante. Su ecuación canónica con centro en el origen es x²/a² + y²/b² = 1, donde a es el semieje mayor y b es el semieje menor. Los focos están en (±c, 0) donde c² = a² - b². La excentricidad es e = c/a, con 0 < e < 1.',
        formulas: ['x²/a² + y²/b² = 1', 'c² = a² - b²', 'e = c/a'],
        'analogies': [
          'Una elipse es como un círculo "estirado" en una dirección. Las órbitas de los planetas son elípticas con el Sol en un foco.'
        ]
      },
      {
        number: '25.5',
        title: 'Hipérbola',
        content: 'Una hipérbola es el lugar geométrico de los puntos cuya diferencia de distancias a dos puntos fijos (focos) es constante. Su ecuación canónica con centro en el origen es x²/a² - y²/b² = 1 (eje transversal horizontal) o y²/a² - x²/b² = 1 (eje transversal vertical). Tiene dos ramas y asíntotas y = ±(b/a)x. La excentricidad es e = c/a con e > 1.',
        formulas: ['x²/a² - y²/b² = 1', 'c² = a² + b²', 'e = c/a > 1', 'y = ±(b/a)x (asíntotas)'],
        'analogies': [
          'Una hipérbola es como dos curvas que se separan cada vez más. Las rutas de algunos cometas son hipérbolas.'
        ]
      },
      {
        number: '25.6',
        title: 'Ecuación general de 2º grado',
        content: 'La ecuación general de 2º grado es Ax² + Bxy + Cy² + Dx + Ey + F = 0. El tipo de cónica se determina por el discriminante Δ = B² - 4AC: si Δ < 0 es elipse (o circunferencia si A = C y B = 0), si Δ = 0 es parábola, si Δ > 0 es hipérbola. Para eliminar el término Bxy se rota el sistema de coordenadas.',
        formulas: ['Ax² + Bxy + Cy² + Dx + Ey + F = 0', 'Δ = B² - 4AC', 'Δ < 0: elipse, Δ = 0: parábola, Δ > 0: hipérbola'],
        'analogies': [
          'El discriminante te dice qué tipo de cónica tienes sin necesidad de graficar.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que una elipse es un óvalo cualquiera',
        description: 'Una elipse tiene propiedades matemáticas precisas (suma de distancias a focos constante). No todo óvalo es una elipse.',
        remediation: 'Recordar que una elipse cumple la propiedad de las dos focas: suma de distancias constante.'
      },
      {
        name: 'Confundir parábola con catenaria',
        description: 'Una cadena colgante forma una catenaria (cosh), no una parábola. Aunque se vean similares, son curvas diferentes.',
        remediation: 'Recordar que una parábola es el lugar de puntos equidistantes de un foco y una directriz, mientras que una catenaria es la forma de una cadena colgante.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar ecuación de circunferencia',
        type: 'Identificación',
        estimatedMinutes: 5,
        question: '¿Cuál es el centro y radio de la circunferencia (x - 3)² + (y + 2)² = 25?',
        steps: [
          'Compara con la ecuación canónica: (x - h)² + (y - k)² = r².',
          'Identifica: h = 3, k = -2, r² = 25.',
          'Por lo tanto, el centro es C(3, -2) y el radio es r = √25 = 5.',
          'Resultado: centro (3, -2), radio 5.'
        ],
        hints: [
          'Compara con la forma (x - h)² + (y - k)² = r².',
          'El centro es (h, k) y el radio es √r².'
        ],
        solution: 'Centro (3, -2), radio 5.'
      },
      {
        title: 'Ecuación de una parábola',
        type: 'Ecuación',
        estimatedMinutes: 6,
        question: 'Halla la ecuación de la parábola con vértice en el origen y foco en (0, 3).',
        steps: [
          'Como el foco está en el eje y, es una parábola vertical: x² = 4py.',
          'El foco está en (0, p) = (0, 3), así que p = 3.',
          'Sustituye: x² = 4·3·y = 12y.',
          'Resultado: x² = 12y.'
        ],
        hints: [
          'Si el foco está en el eje y, la parábola es vertical: x² = 4py.',
          'p es la coordenada y del foco.'
        ],
        solution: 'x² = 12y.'
      },
      {
        title: 'Ecuación de una elipse',
        type: 'Elipse',
        estimatedMinutes: 7,
        question: 'Halla la ecuación de la elipse con centro en el origen, semieje mayor a = 5 sobre el eje x, y semieje menor b = 3.',
        steps: [
          'Usa la ecuación canónica: x²/a² + y²/b² = 1.',
          'Sustituye: a = 5, b = 3.',
          'x²/25 + y²/9 = 1.',
          'Resultado: x²/25 + y²/9 = 1.'
        ],
        hints: [
          'Usa la ecuación canónica x²/a² + y²/b² = 1.',
          'a es el semieje mayor (eje x), b es el semieje menor (eje y).'
        ],
        solution: 'x²/25 + y²/9 = 1.'
      },
      {
        title: 'Clasificar una cónica',
        type: 'Clasificación',
        estimatedMinutes: 6,
        question: '¿Qué tipo de cónica es 4x² + 9y² - 16x + 18y - 11 = 0?',
        steps: [
          'Identifica coeficientes: A = 4, B = 0, C = 9.',
          'Calcula el discriminante: Δ = B² - 4AC = 0² - 4·4·9 = -144.',
          'Como Δ < 0, es una elipse (o circunferencia). Como A ≠ C, es una elipse (no circunferencia).',
          'Resultado: elipse.'
        ],
        hints: [
          'Calcula el discriminante Δ = B² - 4AC.',
          'Si Δ < 0 es elipse, si Δ = 0 es parábola, si Δ > 0 es hipérbola.'
        ],
        solution: 'Es una elipse (Δ < 0).'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es la ecuación de una circunferencia con centro en el origen y radio 3?',
        options: [
          'x² + y² = 3',
          'x² + y² = 9',
          'x² + y² = 6',
          'x² - y² = 9'
        ],
        correct: 1,
        'hints': [
          'La ecuación de una circunferencia con centro en el origen es x² + y² = r².',
          'Si r = 3, entonces r² = 9.'
        ],
        explanation: 'x² + y² = r² = 3² = 9.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es la ecuación canónica de una parábola con vértice en el origen y eje de simetría en el eje x?',
        options: [
          'x² = 4py',
          'y² = 4px',
          'x² + y² = r²',
          'x²/a² + y²/b² = 1'
        ],
        correct: 1,
        'hints': [
          'Si el eje de simetría es el eje x, la parábola abre hacia derecha o izquierda.',
          'La forma es y² = 4px.'
        ],
        explanation: 'Una parábola con eje de simetría en el eje x tiene ecuación y² = 4px.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el discriminante Δ de una ecuación general de 2º grado Ax² + Bxy + Cy² + Dx + Ey + F = 0?',
        options: [
          'B² - 4AC',
          'B² + 4AC',
          'A² - 4BC',
          'C² - 4AB'
        ],
        correct: 0,
        'hints': [
          'El discriminante de una ecuación de 2º grado es B² - 4AC.',
          'Determina el tipo de cónica.'
        ],
        explanation: 'Δ = B² - 4AC. Si Δ < 0 es elipse, si Δ = 0 es parábola, si Δ > 0 es hipérbola.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Familia de cónicas',
        description: 'Observa cómo cambia una cónica al modificar sus parámetros',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'a', min: 1, max: 8, step: 1, default: 3, label: 'Semieje a' },
          { var: 'b', min: 1, max: 8, step: 1, default: 2, label: 'Semieje b' },
          { var: 'tipo', min: 0, max: 2, step: 1, default: 0, label: 'Tipo (0=elipse, 1=hipérbola)' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Parábola con foco variable',
        description: 'Observa cómo cambia la parábola al mover el foco',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'p', min: -5, max: 5, step: 0.5, default: 1, label: 'Parámetro p' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
