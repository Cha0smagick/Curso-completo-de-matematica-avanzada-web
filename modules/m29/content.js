// modules/m29/content.js
// Contenido estructurado — Módulo 29: Derivada
// Definición como límite, interpretación geométrica/física, reglas (suma, producto, cociente, cadena), derivadas implícitas, paramétricas, orden superior.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm29',
  title: 'Derivada',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['derivada', 'límite', 'pendiente de tangente', 'regla de la cadena', 'derivada implícita', 'derivada paramétrica', 'derivada de orden superior'],
  learningObjectives: [
    'Entender la derivada como límite de tasas de cambio promedio',
    'Interpretar la derivada geométricamente (pendiente de tangente) y físicamente (tasa de cambio instantánea)',
    'Aplicar reglas de derivación: suma, producto, cociente, cadena',
    'Calcular derivadas implícitas y paramétricas',
    'Calcular derivadas de orden superior'
  ],
  theory: {
    historicalContext: 'El concepto de derivada se desarrolló independientemente por Isaac Newton y Gottfried Wilhelm Leibniz en el siglo XVII. Newton lo llamó "fluxión" y lo usó para estudiar el movimiento. Leibniz introdujo la notación dy/dx que aún usamos hoy. La definición formal con límites ε-δ llegó más tarde con Cauchy y Weierstrass en el siglo XIX.',
    sections: [
      {
        number: '29.1',
        title: 'La derivada como límite',
        content: 'La derivada de una función f en un punto a se define como el límite del cociente de incrementos cuando el incremento tiende a cero: f\'(a) = lim(h→0) [f(a+h) - f(a)]/h. Geométricamente, es la pendiente de la recta tangente a la gráfica de f en el punto (a, f(a)).',
        formulas: ["f'(a) = lim(h→0) [f(a+h) - f(a)]/h"],
        analogies: [
          'Es como medir la velocidad instantánea de un objeto en un instante exacto, no el velocidad promedio en un intervalo.'
        ]
      },
      {
        number: '29.2',
        title: 'Interpretación geométrica y física',
        content: 'Geométricamente, la derivada f\'(a) es la pendiente de la recta tangente a la curva en el punto (a, f(a)). Físicamente, si f(t) representa la posición de un objeto en el tiempo t, entonces f\'(t) es la velocidad instantánea en el tiempo t. La segunda derivada f\'\'(t) es la aceleración.',
        formulas: ["f'(a) = pendiente de la recta tangente en (a, f(a))", 'v(t) = s\'(t), a(t) = v\'(t) = s\'\'(t)'],
        'analogies': [
          'La derivada es como el velocímetro de un coche: te dice la velocidad en un instante exacto, no el promedio de todo el viaje.'
        ]
      },
      {
        number: '29.3',
        title: 'Reglas de derivación',
        content: 'Las reglas fundamentales son: suma/resta: (f ± g)\' = f\' ± g\'; producto: (fg)\' = f\'g + fg\' (regla del producto); cociente: (f/g)\' = (f\'g - fg\')/g²; cadena: (f(g(x)))\' = f\'(g(x))·g\'(x).',
        formulas: ["(f+g)' = f' + g'", "(fg)' = f'g + fg'", "(f/g)' = (f'g - fg')/g²", "(f(g(x)))' = f'(g(x))·g'(x)"],
        'analogies': [
          'La regla de la cadena es como una cadena de mandos: el cambio en x afecta a g, y el cambio en g afecta a f.'
        ]
      },
      {
        number: '29.4',
        title: 'Derivadas de funciones elementales',
        content: 'd/dx(c) = 0; d/dx(xⁿ) = nxⁿ⁻¹; d/dx(sin x) = cos x; d/dx(cos x) = -sin x; d/dx(e^x) = e^x; d/dx(ln x) = 1/x; d/dx(a^x) = a^x ln a.',
        formulas: ["d/dx(x^n) = nx^(n-1)", "d/dx(sin x) = cos x", "d/dx(e^x) = e^x", "d/dx(ln x) = 1/x"],
        'analogies': [
          'Cada tipo de función tiene su propia regla de derivación que debes memorizar.'
        ]
      },
      {
        number: '29.5',
        title: 'Derivadas implícitas y paramétricas',
        content: 'Para derivar implícitamente, derivamos ambos lados de la ecuación respecto a x, tratando a y como función de x (usando la regla de la cadena para términos con y). Para derivar paramétricamente, si x = f(t) y y = g(t), entonces dy/dx = (dy/dt)/(dx/dx) = g\'(t)/f\'(t).',
        formulas: ["d/dx(y) = dy/dx", "dy/dx = (dy/dt)/(dx/dt) = g'(t)/f'(t)"],
        'analogies': [
          'La derivación implícita es como resolver un misterio: no conoces y explícitamente, pero puedes encontrar cómo cambia.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que (fg)\' = f\'g\'',
        description: 'La regla del producto no es simplemente multiplicar las derivadas. La regla correcta es (fg)\' = f\'g + fg\'.',
        remediation: 'Recordar que la derivada de un producto implica ambos términos: el primero por la derivada del segundo más el segundo por la derivada del primero.'
      },
      {
        name: 'Creer que (f/g)\' = f\'/g\'',
        description: 'La regla del cociente no es simplemente dividir las derivadas. La regla correcta es (f/g)\' = (f\'g - fg\')/g².',
        remediation: 'Recordar la fórmula del cociente: (f\'g - fg\')/g².'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Calcular una derivada por definición',
        type: 'Definición',
        estimatedMinutes: 6,
        question: 'Calcula f\'(x) para f(x) = x² usando la definición.',
        steps: [
          'f\'(x) = lim(h→0) [(x+h)² - x²]/h.',
          'Expande: (x² + 2xh + h² - x²)/h = (2xh + h²)/h.',
          'Simplifica: 2x + h.',
          'Toma el límite: lim(h→0) (2x + h) = 2x.',
          'Resultado: f\'(x) = 2x.'
        ],
        hints: [
          'Expande (x+h)² y simplifica antes de tomar el límite.'
        ],
        solution: 'f\'(x) = 2x.'
      },
      {
        title: 'Aplicar la regla del producto',
        type: 'Producto',
        estimatedMinutes: 5,
        question: 'Calcula d/dx[x²·sin(x)].',
        steps: [
          'Usa la regla del producto: (fg)\' = f\'g + fg\'.',
          'f = x², f\' = 2x; g = sin x, g\' = cos x.',
          'Resultado: 2x·sin x + x²·cos x.'
        ],
        hints: [
          'Identifica qué es f y qué es g, luego aplica la regla del producto.'
        ],
        solution: '2x·sin x + x²·cos x.'
      },
      {
        title: 'Aplicar la regla de la cadena',
        type: 'Cadena',
        estimatedMinutes: 6,
        question: 'Calcula d/dx[sin(x²)].',
        steps: [
          'Identifica la función externa f(u) = sin u y la interna g(x) = x².',
          'f\'(u) = cos u, g\'(x) = 2x.',
          'Aplica la cadena: f\'(g(x))·g\'(x) = cos(x²)·2x.',
          'Resultado: 2x·cos(x²).'
        ],
        hints: [
          'Identifica la función exterior y la interior, luego aplica la regla de la cadena.'
        ],
        solution: '2x·cos(x²).'
      },
      {
        title: 'Derivada implícita',
        type: 'Implícita',
        estimatedMinutes: 6,
        question: 'Encuentra dy/dx si x² + y² = 25.',
        steps: [
          'Deriva ambos lados respecto a x: d/dx[x²] + d/dx[y²] = d/dx[25].',
          '2x + 2y·dy/dx = 0.',
          'Resuelve para dy/dx: 2y·dy/dx = -2x → dy/dx = -x/y.',
          'Resultado: dy/dx = -x/y.'
        ],
        hints: [
          'Recuerda que dy/dx aparece cuando derivas términos con y.'
        ],
        solution: 'dy/dx = -x/y.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es la derivada de f(x) = x⁵?',
        options: [
          '5x⁴',
          '5x⁵',
          'x⁴',
          '5x'
        ],
        correct: 0,
        'hints': [
          'Usa la regla de la potencia: d/dx(xⁿ) = nxⁿ⁻¹.',
          'Aquí n = 5, así que la derivada es 5x⁴.'
        ],
        explanation: 'd/dx(x⁵) = 5x⁴.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es la derivada de f(x) = sin(x)?',
        options: [
          'cos(x)',
          '-sin(x)',
          '-cos(x)',
          'sin(x)'
        ],
        correct: 0,
        'hints': [
          'La derivada del seno es el coseno.'
        ],
        explanation: 'd/dx(sin x) = cos x.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué representa geométricamente la derivada f\'(a)?',
        options: [
          'El valor de la función en x = a',
          'La pendiente de la recta tangente en (a, f(a))',
          'El área bajo la curva',
          'El valor máximo de la función'
        ],
        correct: 1,
        'hints': [
          'La derivada representa la pendiente de la recta tangente.',
          'Es la tasa de cambio instantánea en ese punto.'
        ],
        explanation: 'f\'(a) representa la pendiente de la recta tangente a la gráfica en el punto (a, f(a)).'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Recta tangente y derivada',
        description: 'Observa cómo la recta tangente cambia al mover el punto',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'a', min: -5, max: 5, step: 0.1, default: 1, label: 'Punto a' },
          { var: 'm', min: -5, max: 5, step: 0.1, default: 2, label: 'Pendiente m' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Función y su derivada',
        description: 'Compara la gráfica de una función y su derivada',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'a', min: -3, max: 3, step: 0.1, default: 1, label: 'Coeficiente a' },
          { var: 'b', min: -3, max: 3, step: 1, default: 0, label: 'Coeficiente b' },
          { var: 'c', min: -5, max: 5, step: 1, default: 0, label: 'Término c' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
