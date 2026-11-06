// modules/m34/content.js
// Contenido estructurado — Módulo 34: Ecuaciones Diferenciales
// Separables, lineales de 1er orden, exactas, homogéneas, Bernoulli, 2º orden lineales cte, aplicaciones.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm34',
  title: 'Ecuaciones Diferenciales',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['ecuaciones diferenciales', 'separables', 'lineales de primer orden', 'homogéneas', 'Bernoulli', 'segundo orden', 'crecimiento poblacional'],
  learningObjectives: [
    'Entender qué es una ecuación diferencial y qué significa resolverla',
    'Resolver ecuaciones diferenciales separables',
    'Resolver ecuaciones lineales de primer orden',
    'Aplicar ecuaciones diferenciales a problemas de crecimiento y decaimiento',
    'Entender ecuaciones de segundo orden con coeficientes constantes'
  ],
  theory: {
    historicalContext: 'Las ecuaciones diferenciales nacieron con el cálculo en el siglo XVII. Newton las usó para describir el movimiento de los planetas y la órbita de la Luna. Euler (siglo XVIII) sistematizó muchos métodos de resolución. Las ecuaciones diferenciales son el lenguaje de la física moderna: describen desde el movimiento de un péndulo hasta la propagación de ondas electromagnéticas y la mecánica cuántica.',
    sections: [
      {
        number: '34.1',
        title: 'Qué es una ecuación diferencial',
        content: 'Una ecuación diferencial es una ecuación que relaciona una función con sus derivadas. Resolverla significa encontrar la función que satisface la ecuación. Por ejemplo, y prima = 2x es una ecuación diferencial cuya solución es y = x² + C (donde C es una constante).',
        formulas: ['dy/dx = f(x, y)'],
        analogies: [
          'Una ecuación diferencial es como un acertijo: te dicen cómo cambia una función y debes encontrar la función.'
        ]
      },
      {
        number: '34.2',
        title: 'Ecuaciones separables',
        content: 'Una ecuación separable se puede escribir en la forma dy/dx = f(x)·g(y), donde las variables x y y se pueden separar a lados distintos. Se resuelve separando las variables: dy/g(y) = f(x)dx, y luego integrando ambos lados.',
        formulas: ['dy/dx = f(x)·g(y) → dy/g(y) = f(x)dx → integrar ambos lados'],
        analogies: [
          'Es como separar las cartas de dos mazos: pones todas las x de un lado y todas las y del otro, y luego integras cada lado.'
        ]
      },
      {
        number: '34.3',
        title: 'Ecuaciones lineales de primer orden',
        content: 'Una ecuación lineal de primer orden tiene la forma dy/dx + P(x)·y = Q(x). Se resuelve multiplicando por el factor integrante: e elevado a la integral de P(x) dx. Esto convierte el lado izquierdo en la derivada de un producto, que se puede integrar directamente.',
        formulas: ['dy/dx + P(x)·y = Q(x)', 'factor integrante = e^(∫P(x)dx)'],
        analogies: [
          'El factor integrante es como una llave maestra que abre la ecuación para que se pueda integrar fácilmente.'
        ]
      },
      {
        number: '34.4',
        title: 'Aplicaciones: crecimiento y decaimiento',
        content: 'Muchos fenómenos naturales se describen con la ecuación diferencial dy/dt = ky, donde k es una constante. Su solución es y = y₀·e^(kt). Si k > 0 es crecimiento (población, interés compuesto), si k < 0 es decaimiento (desintegración radiactiva, enfriamiento).',
        formulas: ['dy/dt = ky → y = y₀·e^(kt)'],
        analogies: [
          'La desintegración radiactiva es como una fuga: cuanta más agua hay, más rápido se escapa.'
        ]
      },
      {
        number: '34.5',
        title: 'Ecuaciones de segundo orden con coeficientes constantes',
        content: 'Una ecuación de segundo orden lineal con coeficientes constantes tiene la forma ay + b·y prima + c·y = 0. Se resuelve encontrando las raíces de la ecuación característica: a·r² + b·r + c = 0. Si las raíces son reales y distintas, la solución es una combinación de exponenciales. Si son complejas, la solución involucra senos y cosenos.',
        formulas: ['ay + by prima + cy = 0', 'a·r² + b·r + c = 0 (ecuación característica)'],
        analogies: [
          'Las soluciones oscilantes (senos y cosenos) describen fenómenos periódicos como resortes y péndulos.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Olvidar la constante de integración en la solución general',
        description: 'La solución general de una ecuación diferencial de primer orden incluye una constante arbitraria C. Olvidar C es un error común.',
        remediation: 'Siempre incluir la constante C en la solución general, y determinar su valor usando las condiciones iniciales.'
      },
      {
        name: 'Confundir la solución general con la solución particular',
        description: 'La solución general contiene una constante arbitraria; la solución particular se obtiene aplicando condiciones iniciales para determinar la constante.',
        remediation: 'La solución general es una familia de curvas; la solución particular es una curva específica que pasa por el punto dado por las condiciones iniciales.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Ecuación separable',
        type: 'Separable',
        estimatedMinutes: 7,
        question: 'Resuelve: dy/dx = x/y',
        steps: [
          'Separa las variables: y dy = x dx.',
          'Integra ambos lados: y²/2 = x²/2 + C.',
          'Simplifica: y² = x² + C (donde C absorbe el factor 2).',
          'Resultado: y² = x² + C (o y = ±√(x² + C)).'
        ],
        hints: [
          'Separa las variables: todas las y de un lado, todas las x del otro.',
          'Integra ambos lados.'
        ],
        solution: 'y² = x² + C.'
      },
      {
        title: 'Crecimiento exponencial',
        type: 'Aplicación',
        estimatedMinutes: 7,
        question: 'La población de una bacteria se duplica cada 3 horas. Si inicialmente hay 100 bacterias, ¿cuántas habrá después de 9 horas?',
        steps: [
          'El modelo es: dy/dt = ky, con solución y = y₀·e^(kt).',
          'Se duplica cada 3 horas: y(3) = 2·y(0), así e^(3k) = 2, k = ln(2)/3.',
          'Después de 9 horas: y(9) = 100·e^(9k) = 100·e^(9·ln(2)/3) = 100·e^(3ln(2)) = 100·2³ = 800.',
          'Resultado: 800 bacterias.'
        ],
        hints: [
          'Usa el modelo de crecimiento exponencial.',
          'La constante k se determina con la información de duplicación.'
        ],
        solution: '800 bacterias.'
      },
      {
        title: 'Ecuación lineal de primer orden',
        type: 'Lineal',
        estimatedMinutes: 8,
        question: 'Resuelve: dy/dx + 2y = 6',
        steps: [
          'Identifica P(x) = 2, Q(x) = 6.',
          'Factor integrante: e^(∫2dx) = e^(2x).',
          'Multiplica: e^(2x)·dy/dx + 2e^(2x)·y = 6e^(2x).',
          'Reconoce: d/dx[e^(2x)·y] = 6e^(2x).',
          'Integra: e^(2x)·y = 3e^(2x) + C.',
          'Resuelve: y = 3 + C·e^(-2x).'
        ],
        hints: [
          'Calcula el factor integrante.',
          'Multiplica la ecuación por el factor integrante.'
        ],
        solution: 'y = 3 + C·e^(-2x).'
      },
      {
        title: 'Ecuación de segundo orden',
        type: 'Segundo orden',
        estimatedMinutes: 8,
        question: 'Resuelve: y doble prima - 5y prima + 6y = 0',
        steps: [
          'Ecuación característica: r² - 5r + 6 = 0.',
          'Factoriza: (r - 2)(r - 3) = 0, así r = 2 y r = 3.',
          'Solución general: y = C₁·e^(2x) + C₂·e^(3x).',
          'Resultado: y = C₁·e^(2x) + C₂·e^(3x).'
        ],
        hints: [
          'Escribe la ecuación característica.',
          'Encuentra las raíces y escribe la solución general.'
        ],
        solution: 'y = C₁·e^(2x) + C₂·e^(3x).'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Qué es una ecuación diferencial?',
        options: [
          'Una ecuación que relaciona una función con sus derivadas',
          'Una ecuación que solo tiene números',
          'Una ecuación sin variables',
          'Una desigualdad con derivadas'
        ],
        correct: 0,
        hints: [
          'Contiene derivadas de una función.',
          'Relaciona la función con cómo cambia.'
        ],
        explanation: 'Una ecuación diferencial es una ecuación que relaciona una función con sus derivadas.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es la solución de dy/dt = ky?',
        options: [
          'y = y₀ + kt',
          'y = y₀·e^(kt)',
          'y = y₀·t²',
          'y = k·e^t'
        ],
        correct: 1,
        hints: [
          'Es el modelo de crecimiento/decaimiento exponencial.',
          'La solución es exponencial.'
        ],
        explanation: 'La solución de dy/dt = ky es y = y₀·e^(kt), que es crecimiento (k > 0) o decaimiento (k < 0) exponencial.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué es la ecuación característica de ay + by prima + cy = 0?',
        options: [
          'a·r + b·r + c = 0',
          'a·r² + b·r + c = 0',
          'ar + br + c = 0',
          'a·r³ + b·r² + c = 0'
        ],
        correct: 1,
        hints: [
          'Se obtiene sustituyendo y = e^(rx) en la ecuación.',
          'Es una ecuación cuadrática en r.'
        ],
        explanation: 'La ecuación característica es a·r² + b·r + c = 0.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Crecimiento y decaimiento exponencial',
        description: 'Observa cómo cambia la solución según el valor de k',
        type: 'function',
        data: {
          functions: [],
          range: [0, 5]
        },
        sliders: [
          { var: 'k', min: -2, max: 2, step: 0.1, default: 1, label: 'Constante k' },
          { var: 'y₀', min: 0, max: 5, step: 0.5, default: 1, label: 'Valor inicial y₀' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Solución de segundo orden oscilante',
        description: 'Observa las soluciones oscilantes cuando las raíces son complejas',
        type: 'function',
        data: {
          functions: [],
          range: [0, 10]
        },
        sliders: [
          { var: 'a', min: 0.5, max: 3, step: 0.1, default: 1, label: 'Frecuencia' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
