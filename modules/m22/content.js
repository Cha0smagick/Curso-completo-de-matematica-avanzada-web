// modules/m22/content.js
// Contenido estructurado — Módulo 22: Sucesiones y Series
// Sucesiones aritméticas y geométricas, recursivas, límite, convergencia, serie telescopica, serie armónica, criterios de convergencia.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm22',
  title: 'Sucesiones y Series',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['sucesiones', 'series', 'aritmética', 'geométrica', 'límite', 'convergencia', 'serie armónica', 'criterios de convergencia'],
  learningObjectives: [
    'Entender qué es una sucesión y cómo se define',
    'Identificar sucesiones aritméticas y geométricas',
    'Calcular el límite de una sucesión y entender convergencia',
    'Sumar series aritméticas y geométricas finitas',
    'Entender series infinitas y criterios de convergencia',
    'Aplicar series telescopicas y armónicas'
  ],
  theory: {
    historicalContext: 'El estudio de las sucesiones y series se remonta a la antigüedad (progresiones aritméticas en Egipto y Babilonia). Los matemáticos griegos como Arquímedes usaron series geométricas para calcular áreas. En el siglo XVII, Newton y Leibniz desarrollaron el cálculo infinitesimal, donde las series de potencias son fundamentales. Euler (siglo XVIII) contribuyó enormemente al estudio de series infinitas, incluyendo la famosa serie armónica y la suma de 1/n².',
    sections: [
      {
        number: '22.1',
        title: 'Qué es una sucesión',
        content: 'Una sucesión es una lista ordenada de números: a₁, a₂, a₃, ... Cada número se llama término. Una sucesión puede definirse por una fórmula del término general (aₙ = f(n)) o de forma recursiva (definiendo el primer término y cómo obtener el siguiente a partir del anterior).',
        formulas: ['aₙ = f(n)', 'a₁, a₂, a₃, ...'],
        analogies: [
          'Una sucesión es como una lista de números ordenados: el primero, el segundo, el tercero...'
        ]
      },
      {
        number: '22.2',
        title: 'Sucesión aritmética',
        content: 'Una sucesión aritmética es aquella en la que la diferencia entre términos consecutivos es constante (diferencia común d). La fórmula del término general es aₙ = a₁ + (n-1)·d. La suma de los primeros n términos es Sₙ = n·(a₁ + aₙ)/2 o Sₙ = n/2·[2a₁ + (n-1)·d].',
        formulas: ['aₙ = a₁ + (n-1)·d', 'Sₙ = n·(a₁ + aₙ)/2'],
        analogies: [
          'Es como ahorrar dinero: cada mes ahorras la misma cantidad adicional.'
        ]
      },
      {
        number: '22.3',
        title: 'Sucesión geométrica',
        content: 'Una sucesión geométrica es aquella en la que el cociente entre términos consecutivos es constante (razón común r). La fórmula del término general es aₙ = a₁·r^(n-1). La suma de los primeros n términos es Sₙ = a₁·(1 - r^n)/(1 - r) si r ≠ 1.',
        formulas: ['aₙ = a₁·r^(n-1)', 'Sₙ = a₁·(1 - r^n)/(1 - r)'],
        analogies: [
          'Es como el crecimiento de bacterias: cada hora se duplica (razón r = 2).'
        ]
      },
      {
        number: '22.4',
        title: 'Límite de una sucesión',
        content: 'El límite de una sucesión es el valor al que tienden sus términos cuando n tiende a infinito. Decimos que la sucesión converge si el límite existe y es finito; de lo contrario diverge. Por ejemplo, aₙ = 1/n tiende a 0 cuando n → ∞.',
        formulas: ['límite aₙ = L cuando n → ∞', 'aₙ = 1/n → 0'],
        analogies: [
          'Es como preguntar: ¿hacia dónde se dirigen los términos si seguimos la sucesión para siempre?'
        ]
      },
      {
        number: '22.5',
        title: 'Serie infinita y convergencia',
        content: 'Una serie es la suma de los términos de una sucesión: S = Σaₙ. Una serie converge si la secuencia de sumas parciales tiene un límite finito. La serie armónica Σ(1/n) diverge (crece sin límite), aunque sus términos tiendan a 0. La serie geométrica Σa·r^(n-1) converge si |r| < 1 y su suma es a/(1-r).',
        formulas: ['Σaₙ converge si las sumas parciales tienen límite', 'Σa·r^(n-1) = a/(1-r) si |r| < 1'],
        analogies: [
          'Una serie es como sumar infinitos términos. Algunos suman un número finito, otros crecen para siempre.'
        ]
      },
      {
        number: '22.6',
        title: 'Serie telescopica',
        content: 'Una serie telescopica es aquella donde la mayoría de los términos se cancelan al sumar. Por ejemplo, Σ[1/n - 1/(n+1)] = 1 - 1/(n+1), que tiende a 1 cuando n → ∞. Son útiles porque permiten calcular la suma exactamente sin sumar infinitos términos.',
        formulas: ['Σ[1/n - 1/(n+1)] = 1 - 1/(n+1) → 1'],
        analogies: [
          'Es como un telescopio: los términos del medio se "colapsan" y solo quedan los extremos.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que si los términos tienden a 0, la serie converge',
        description: 'No es cierto. La serie armónica Σ(1/n) tiene términos que tienden a 0 pero diverge. La condición de que los términos tiendan a 0 es necesaria pero no suficiente para convergencia.',
        remediation: 'Recordar que aₙ → 0 es necesario pero no suficiente para que Σaₙ converja.'
      },
      {
        name: 'Creer que toda serie geométrica diverge',
        description: 'Una serie geométrica Σa·r^(n-1) converge si |r| < 1 y diverge si |r| ≥ 1. Muchas series geométricas convergen.',
        remediation: 'Recordar que una serie geométrica converge si y solo si |r| < 1.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar sucesión aritmética',
        type: 'Identificación',
        estimatedMinutes: 5,
        question: '¿Es la sucesión 3, 7, 11, 15, ... aritmética? Si es así, ¿cuál es la diferencia común?',
        steps: [
          'Calcula las diferencias entre términos consecutivos: 7-3=4, 11-7=4, 15-11=4.',
          'La diferencia es constante: d = 4.',
          'Por lo tanto, es una sucesión aritmética con diferencia común 4.'
        ],
        hints: [
          'Resta términos consecutivos y verifica si la diferencia es siempre la misma.',
          '7-3=4, 11-7=4, 15-11=4.'
        ],
        solution: 'Es aritmética con diferencia común d = 4.'
      },
      {
        title: 'Término general de una aritmética',
        type: 'Fórmula',
        estimatedMinutes: 5,
        question: 'Halla el término 10 de la sucesión aritmética con a₁ = 5 y d = 3.',
        steps: [
          'Usa la fórmula aₙ = a₁ + (n-1)·d.',
          'Sustituye: a₁₀ = 5 + (10-1)·3 = 5 + 27 = 32.',
          'Resultado: a₁₀ = 32.'
        ],
        hints: [
          'Usa la fórmula del término general: aₙ = a₁ + (n-1)·d.',
          'Sustituye n = 10, a₁ = 5, d = 3.'
        ],
        solution: 'a₁₀ = 32.'
      },
      {
        title: 'Suma de una aritmética',
        type: 'Suma',
        estimatedMinutes: 6,
        question: 'Halla la suma de los primeros 10 términos de la sucesión aritmética 2, 5, 8, 11, ...',
        steps: [
          'Identifica: a₁ = 2, d = 3, n = 10.',
          'El décimo término: a₁₀ = 2 + 9·3 = 29.',
          'Usa la fórmula: S₁₀ = 10·(2 + 29)/2 = 10·31/2 = 155.',
          'Resultado: S₁₀ = 155.'
        ],
        hints: [
          'Primero encuentra el décimo término, luego usa la fórmula de la suma.',
          'Sₙ = n·(a₁ + aₙ)/2.'
        ],
        solution: 'S₁₀ = 155.'
      },
      {
        title: 'Serie geométrica infinita',
        type: 'Serie',
        estimatedMinutes: 6,
        question: 'Halla la suma de la serie geométrica 1 + 1/2 + 1/4 + 1/8 + ...',
        steps: [
          'Identifica: a = 1, r = 1/2.',
          'Como |r| < 1, la serie converge.',
          'Usa S = a/(1-r) = 1/(1-1/2) = 1/(1/2) = 2.',
          'Resultado: S = 2.'
        ],
        hints: [
          'Identifica el primer término y la razón.',
          'Usa la fórmula S = a/(1-r) para |r| < 1.'
        ],
        solution: 'S = 2.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es el término general de una sucesión aritmética?',
        options: [
          'aₙ = a₁ + (n-1)·d',
          'aₙ = a₁·r^(n-1)',
          'aₙ = a₁·n',
          'aₙ = a₁ + n·d'
        ],
        correct: 0,
        hints: [
          'Es la fórmula del término general de una aritmética.',
          'El primer término más (n-1) veces la diferencia.'
        ],
        explanation: 'aₙ = a₁ + (n-1)·d es la fórmula del término general de una sucesión aritmética.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es la suma de la serie geométrica 1 + 1/2 + 1/4 + 1/8 + ...?',
        options: [
          '1',
          '2',
          '3',
          '4'
        ],
        correct: 1,
        hints: [
          'Es una serie geométrica con a = 1, r = 1/2.',
          'Usa S = a/(1-r) = 1/(1-1/2) = 2.'
        ],
        explanation: 'S = 1/(1-1/2) = 1/(1/2) = 2.'
      },
      {
        type: 'multiple-choice',
        question: '¿La serie armónica Σ(1/n) converge o diverge?',
        options: [
          'Converge',
          'Diverge',
          'Depende de n',
          'No se puede determinar'
        ],
        correct: 1,
        'hints': [
          'Aunque los términos tienden a 0, la serie armónica diverge.',
          'Es un ejemplo clásico de serie divergente.'
        ],
        'explanation': 'La serie armónica Σ(1/n) diverge, aunque sus términos tiendan a 0.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Sucesión aritmética en la recta numérica',
        description: 'Observa cómo crece una sucesión aritmética',
        type: 'function',
        data: {
          functions: [],
          range: [0, 20]
        },
        sliders: [
          { var: 'a₁', min: -10, max: 10, step: 1, default: 1, label: 'Primer término' },
          { var: 'd', min: -5, max: 5, step: 1, default: 2, label: 'Diferencia común' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Serie geométrica infinita',
        description: 'Observa cómo las sumas parciales se acercan al límite',
        type: 'function',
        data: {
          functions: [],
          range: [0, 10]
        },
        sliders: [
          { var: 'r', min: -0.9, max: 0.9, step: 0.1, default: 0.5, label: 'Razón r' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
