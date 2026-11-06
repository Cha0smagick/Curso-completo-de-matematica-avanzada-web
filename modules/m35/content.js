// modules/m35/content.js
// Contenido estructurado — Módulo 35: Cálculo Multivariable (Introducción)
// Funciones de varias variables, límites, derivadas parciales, diferencial total, cadena, gradiente, direccional, extremos condicionados (Lagrange), integrales dobles/triples.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm35',
  title: 'Cálculo Multivariable (Introducción)',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['multivariable', 'derivadas parciales', 'gradiente', 'diferencial total', 'extremos', 'Lagrange', 'integrales dobles'],
  learningObjectives: [
    'Entender funciones de varias variables y sus gráficas en 3D',
    'Calcular derivadas parciales',
    'Calcular el gradiente y entender su significado geométrico',
    'Aplicar la regla de la cadena para funciones de varias variables',
    'Encontrar extremos de funciones de dos variables',
    'Calcular integrales dobles'
  ],
  theory: {
    historicalContext: 'El cálculo multivariable se desarrolló en el siglo XVIII con Euler, Lagrange y otros matemáticos. Extiende el cálculo de una variable a funciones de varias variables. Es fundamental en física (termodinámica, electromagnetismo), ingeniería (optimización de diseños) y economía (funciones de producción y utilidad).',
    sections: [
      {
        number: '35.1',
        title: 'Funciones de varias variables',
        content: 'Una función de varias variables toma múltiples entradas y produce una salida: f(x, y) = z. Su gráfica es una superficie en el espacio tridimensional. También se pueden usar curvas de nivel: conjuntos de puntos donde f(x, y) = c para una constante c, que son como las curvas de nivel de un mapa topográfico.',
        formulas: ['z = f(x, y)'],
        analogies: [
          'Una función de dos variables es como la altura de un terreno: para cada punto (x, y) del mapa, hay una altura z.'
        ]
      },
      {
        number: '35.2',
        title: 'Derivadas parciales',
        content: 'La derivada parcial de f respecto a x (denotada ∂f/∂x) se calcula derivando respecto a x mientras se mantiene y constante. Es la tasa de cambio de f cuando solo cambia x. Análogamente, ∂f/∂y es la tasa de cambio cuando solo cambia y.',
        formulas: ['∂f/∂x = derivada parcial respecto a x', '∂f/∂y = derivada parcial respecto a y'],
        analogies: [
          'Es como medir la pendiente de una colina caminando solo hacia el este (derivada respecto a x) o solo hacia el norte (derivada respecto a y).'
        ]
      },
      {
        number: '35.3',
        title: 'Gradiente',
        content: 'El gradiente de f es el vector de derivadas parciales: gradiente de f = (∂f/∂x, ∂f/∂y). Apunta en la dirección de máximo crecimiento de f, y su magnitud indica qué tan rápido crece en esa dirección. Es perpendicular a las curvas de nivel.',
        formulas: ['∇f = (∂f/∂x, ∂f/∂y)'],
        analogies: [
          'El gradiente apunta hacia arriba en la colina: si dejas caer una bola de agua, rodará en dirección opuesta al gradiente.'
        ]
      },
      {
        number: '35.4',
        title: 'Regla de la cadena multivariable',
        content: 'Si z = f(x, y) donde x y y dependen de t, entonces dz/dt = (∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt). Esta regla extiende la regla de la cadena de una variable al caso multivariable.',
        formulas: ['dz/dt = (∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt)'],
        analogies: [
          'Es como sumar las contribuciones de cada variable al cambio total.'
        ]
      },
      {
        number: '35.5',
        title: 'Extremos de funciones de dos variables',
        content: 'Para encontrar los extremos de f(x, y), se resuelven simultáneamente las ecuaciones ∂f/∂x = 0 y ∂f/∂y = 0. Los puntos críticos pueden ser máximos, mínimos o puntos de silla. El criterio de la segunda derivada usa el determinante Hessian: D = f_xx·f_yy - (f_xy)².',
        formulas: ['∂f/∂x = 0, ∂f/∂y = 0 (puntos críticos)', 'D = f_xx·f_yy - (f_xy)²'],
        analogies: [
          'Un punto de silla es como el centro de una montaña: sube en una dirección y baja en otra.'
        ]
      },
      {
        number: '35.6',
        title: 'Integrales dobles',
        content: 'Una integral doble extiende la integral definida a funciones de dos variables. Representa el volumen bajo la superficie z = f(x, y) sobre una región del plano. Se calcula integrando primero respecto a una variable y luego respecto a la otra (integración iterada).',
        formulas: ['∬R f(x,y) dA = ∫∫f(x,y)dx dy'],
        analogies: [
          'Una integral doble es como sumar infinitos rectángulos muy pequeños para calcular el volumen bajo una superficie.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Confundir derivada parcial con derivada total',
        description: 'La derivada parcial mide el cambio cuando solo una variable cambia (las otras se mantienen constantes). La derivada total mide el cambio cuando todas las variables cambian simultáneamente.',
        remediation: 'Recordar que la derivada parcial mantiene las otras variables constantes; la derivada total considera el cambio de todas las variables.'
      },
      {
        name: 'Creer que todo punto crítico es un extremo',
        description: 'No todo punto crítico de una función de dos variables es un máximo o mínimo. Algunos son puntos de silla (donde la función sube en una dirección y baja en otra).',
        remediation: 'Usar el criterio de la segunda derivada (Hessian) para clasificar los puntos críticos.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Calcular derivadas parciales',
        type: 'Derivadas parciales',
        estimatedMinutes: 6,
        question: 'Calcula las derivadas parciales de f(x, y) = x²y + 3y².',
        steps: [
          '∂f/∂x: deriva respecto a x manteniendo y constante: 2xy + 0 = 2xy.',
          '∂f/∂y: deriva respecto a y manteniendo x constante: x² + 6y.',
          'Resultado: ∂f/∂x = 2xy, ∂f/∂y = x² + 6y.'
        ],
        hints: [
          'Para ∂f/∂x, trata a y como constante.',
          'Para ∂f/∂y, trata a x como constante.'
        ],
        solution: '∂f/∂x = 2xy, ∂f/∂y = x² + 6y.'
      },
      {
        title: 'Calcular el gradiente',
        type: 'Gradiente',
        estimatedMinutes: 5,
        question: 'Calcula el gradiente de f(x, y) = x² + y² en el punto (1, 2).',
        steps: [
          '∂f/∂x = 2x, ∂f/∂y = 2y.',
          'El gradiente es (2x, 2y).',
          'En (1, 2): gradiente = (2, 4).',
          'Resultado: el gradiente en (1, 2) es (2, 4).'
        ],
        hints: [
          'Calcula las derivadas parciales.',
          'Evalúa en el punto dado.'
        ],
        solution: 'Gradiente en (1, 2) = (2, 4).'
      },
      {
        title: 'Encontrar extremos',
        type: 'Extremos',
        estimatedMinutes: 8,
        question: 'Encuentra los puntos críticos de f(x, y) = x² + y² - 2x - 4y + 5.',
        steps: [
          '∂f/∂x = 2x - 2 = 0 → x = 1.',
          '∂f/∂y = 2y - 4 = 0 → y = 2.',
          'Punto crítico: (1, 2).',
          'D = f_xx·f_yy - (f_xy)² = 2·2 - 0 = 4 > 0, y f_xx = 2 > 0, así es un mínimo.',
          'Resultado: mínimo en (1, 2) con valor f(1, 2) = 0.'
        ],
        hints: [
          'Resuelve ambas derivadas parciales = 0 simultáneamente.',
          'Clasifica con el criterio del Hessian.'
        ],
        solution: 'Mínimo en (1, 2) con valor 0.'
      },
      {
        title: 'Integral doble',
        type: 'Integral doble',
        estimatedMinutes: 8,
        question: 'Calcula la integral doble de xy sobre el rectángulo [0, 1] × [0, 2].',
        steps: [
          'Integra primero respecto a y: integral de xy dy de 0 a 2 = x·y²/2 de 0 a 2 = 2x.',
          'Luego integra respecto a x: integral de 2x dx de 0 a 1 = x² de 0 a 1 = 1.',
          'Resultado: 1.'
        ],
        hints: [
          'Integra primero respecto a una variable (la otra se mantiene constante).',
          'Luego integra el resultado respecto a la otra variable.'
        ],
        solution: '1.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Qué es una derivada parcial?',
        options: [
          'La derivada de una función de una variable',
          'La derivada respecto a una variable manteniendo las demás constantes',
          'La derivada de una parte de la función',
          'La derivada total dividida entre dos'
        ],
        correct: 1,
        hints: [
          'Es la derivada respecto a una sola variable.',
          'Las otras variables se tratan como constantes.'
        ],
        explanation: 'Una derivada parcial es la derivada respecto a una variable manteniendo las demás constantes.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué representa el gradiente de una función?',
        options: [
          'Un vector que apunta hacia el máximo crecimiento',
          'Un número que indica la pendiente',
          'El valor máximo de la función',
          'Una curva de nivel'
        ],
        correct: 0,
        hints: [
          'El gradiente es un vector.',
          'Apunta en la dirección de máximo crecimiento.'
        ],
        explanation: 'El gradiente es un vector que apunta en la dirección de máximo crecimiento de la función.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué representa una integral doble?',
        options: [
          'El área bajo una curva',
          'El volumen bajo una superficie',
          'La pendiente de una recta',
          'Una suma finita de términos'
        ],
        correct: 1,
        hints: [
          'Una integral simple da área, una doble da volumen.',
          'Es el volumen bajo la superficie sobre una región del plano.'
        ],
        explanation: 'Una integral doble representa el volumen bajo la superficie z = f(x,y) sobre una región del plano.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Superficie 3D',
        description: 'Visualiza una función de dos variables como superficie',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'x', min: -5, max: 5, step: 0.5, default: 1, label: 'Coordenada x' },
          { var: 'y', min: -5, max: 5, step: 0.5, default: 1, label: 'Coordenada y' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Curvas de nivel',
        description: 'Observa las curvas de nivel de una función de dos variables',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'c', min: 0, max: 10, step: 1, default: 5, label: 'Nivel c' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
