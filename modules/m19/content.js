// modules/m19/content.js
// Contenido estructurado — Módulo 19: Números Complejos
// Forma binomica/polar/exponencial, operaciones, raíz n-ésima, teorema de Moivre, ecuaciones polinómicas, plano de Argand.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm19',
  title: 'Números Complejos',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['números complejos', 'forma binomica', 'forma polar', 'forma exponencial', 'plano de Argand', 'teorema de Moivre', 'raíz enésima'],
  learningObjectives: [
    'Entender qué es un número complejo y por qué se necesitan',
    'Representar números complejos en forma binomica, polar y exponencial',
    'Operar con números complejos (suma, resta, multiplicación, división)',
    'Aplicar el teorema de Moivre para potencias y raíces',
    'Encontrar raíces n-ésimas de números complejos'
  ],
  theory: {
    historicalContext: 'Los números complejos surgieron del bisogno de resolver ecuaciones como x² + 1 = 0, que no tienen solución real. Cardano (siglo XVI) los usó sin entenderlos. Euler (siglo XVIII) introdujo la notación i para √(-1) y la fórmula e^(ix) = cos(x) + i·sen(x). Gauss (siglo XIX) les dio una interpretación geométrica en el plano complejo (plano de Argand), lo que los hizo aceptados plenamente.',
    sections: [
      {
        number: '19.1',
        title: 'Qué es un número complejo',
        content: 'Un número complejo tiene la forma z = a + bi, donde a y b son números reales e i es la unidad imaginaria con i² = -1. a se llama parte real (Re(z)) y b se llama parte imaginaria (Im(z)). Todo número real es un complejo con b = 0. Todo número imaginario puro es un complejo con a = 0.',
        formulas: ['z = a + bi, i² = -1', 'Re(z) = a, Im(z) = b'],
        analogies: [
          'Es como un número de dos componentes: una parte real y una parte imaginaria, como coordenadas en un plano.'
        ]
      },
      {
        number: '19.2',
        title: 'Plano de Argand y representación geométrica',
        content: 'Los números complejos se representan en el plano complejo (plano de Argand): el eje horizontal es la parte real y el eje vertical es la parte imaginaria. El número z = a + bi se representa como el punto (a, b). El módulo |z| = √(a² + b²) es la distancia desde el origen, y el argumento arg(z) es el ángulo que forma con el eje real positivo.',
        formulas: ['|z| = √(a² + b²)', 'arg(z) = ángulo con el eje real'],
        analogies: [
          'Es como un mapa: la parte real es la coordenada este-oeste, la imaginaria es norte-sur.'
        ]
      },
      {
        number: '19.3',
        title: 'Forma polar y exponencial',
        content: 'Un número complejo se puede escribir en forma polar: z = r·(cos(θ) + i·sen(θ)) = r·cis(θ), donde r = |z| es el módulo y θ = arg(z) es el argumento. Usando la fórmula de Euler, se escribe en forma exponencial: z = r·e^(iθ). Esta forma facilita mucho la multiplicación y división.',
        formulas: ['z = r·(cos(θ) + i·sen(θ)) = r·e^(iθ)', 'r = |z|, θ = arg(z)'],
        analogies: [
          'La forma polar es como dar coordenadas polares: distancia desde el origen y ángulo.'
        ]
      },
      {
        number: '19.4',
        title: 'Operaciones con números complejos',
        content: 'Suma y resta: se suman/restan partes reales e imaginarias por separado. Multiplicación: se distribuye como polinomios, usando i² = -1. División: se multiplica numerador y denominador por el conjugado del denominador para eliminar i del denominador. El conjugado de z = a + bi es z̄ = a - bi.',
        formulas: ['z₁ + z₂ = (a₁ + a₂) + (b₁ + b₂)i', 'z₁·z₂ = (a₁a₂ - b₁b₂) + (a₁b₂ + a₂b₁)i', 'z̄ = a - bi'],
        analogies: [
          'Sumar complejos es como sumar vectores: componente por componente.'
        ]
      },
      {
        number: '19.5',
        title: 'Teorema de Moivre y raíces n-ésimas',
        content: 'El teorema de Moivre dice que (r·e^(iθ))^n = r^n·e^(inθ) = r^n·(cos(nθ) + i·sen(nθ)). Para encontrar la raíz n-ésima de z, se escribe z en forma polar y se aplica: las n raíces n-ésimas de z tienen módulo |z|^(1/n) y argumentos (arg(z) + 2kπ)/n para k = 0, 1, ..., n-1.',
        formulas: ['(r·e^(iθ))^n = r^n·e^(inθ)', 'z_k = |z|^(1/n)·e^(i(θ + 2kπ)/n), k = 0, 1, ..., n-1'],
        analogies: [
          'Las raíces n-ésimas de un número complejo están distribuidas uniformemente en un círculo del radio |z|^(1/n).'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que √(-1) = i sin más',
        description: '√(-1) no está definido en los reales. i se define como el número que al cuadrarse da -1, no como una raíz cuadrada en el sentido real.',
        remediation: 'Recordar que i se define por i² = -1, no como √(-1) en el sentido de raíces reales.'
      },
      {
        name: 'Creer que i² = 1',
        description: 'Algunos estudiantes confunden i con 1 y creen que i² = 1. Pero i² = -1 por definición.',
        remediation: 'Recordar que i es la unidad imaginaria con i² = -1, no i = 1.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar partes real e imaginaria',
        type: 'Identificación',
        estimatedMinutes: 4,
        question: 'Para z = 3 - 4i, ¿cuáles son Re(z) e Im(z)?',
        steps: [
          'La parte real es el coeficiente del término sin i: 3.',
          'La parte imaginaria es el coeficiente del término con i: -4.',
          'Resultado: Re(z) = 3, Im(z) = -4.'
        ],
        hints: [
          'La parte real está sin i, la imaginaria va con i.',
          'No incluir la i en la parte imaginaria.'
        ],
        solution: 'Re(z) = 3, Im(z) = -4.'
      },
      {
        title: 'Sumar números complejos',
        type: 'Operación',
        estimatedMinutes: 5,
        question: 'Calcula (2 + 3i) + (4 - 5i)',
        steps: [
          'Suma las partes reales: 2 + 4 = 6.',
          'Suma las partes imaginarias: 3i - 5i = -2i.',
          'Resultado: 6 - 2i.'
        ],
        hints: [
          'Suma reales con reales e imaginarias con imaginarias.',
          'No mezcles partes reales con imaginarias.'
        ],
        solution: '(2 + 3i) + (4 - 5i) = 6 - 2i.'
      },
      {
        title: 'Multiplicar complejos',
        type: 'Multiplicación',
        estimatedMinutes: 6,
        question: 'Calcula (2 + 3i)(1 - 2i)',
        steps: [
          'Distribuye: 2(1) + 2(-2i) + 3i(1) + 3i(-2i).',
          'Calcula: 2 - 4i + 3i - 6i².',
          'Como i² = -1: 2 - 4i + 3i + 6 = 8 - i.',
          'Resultado: 8 - i.'
        ],
        hints: [
          'Multiplica como polinomios.',
          'Recuerda que i² = -1.'
        ],
        solution: '(2 + 3i)(1 - 2i) = 8 - i.'
      },
      {
        title: 'Forma polar',
        type: 'Forma polar',
        estimatedMinutes: 7,
        question: 'Expresa z = 1 + i en forma polar.',
        steps: [
          'Calcula el módulo: r = |z| = √(1² + 1²) = √2.',
          'Calcula el argumento: θ = arctan(1/1) = π/4 (en el primer cuadrante).',
          'Escribe: z = √2·(cos(π/4) + i·sen(π/4)) = √2·e^(iπ/4).',
          'Resultado: z = √2·e^(iπ/4).'
        ],
        hints: [
          'Módulo = distancia desde el origen.',
          'Argumento = ángulo con el eje real positivo.'
        ],
        solution: 'z = √2·e^(iπ/4).'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es el valor de i²?',
        options: [
          '1',
          '-1',
          'i',
          '0'
        ],
        correct: 1,
        hints: [
          'i se define como el número cuyo cuadrado es -1.',
          'No es 1.'
        ],
        explanation: 'i² = -1 por definición de la unidad imaginaria.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el módulo de z = 3 + 4i?',
        options: [
          '5',
          '7',
          '12',
          '25'
        ],
        correct: 0,
        hints: [
          'El módulo es la distancia desde el origen: √(3² + 4²).',
          '√(9 + 16) = √25 = 5.'
        ],
        explanation: '|3 + 4i| = √(3² + 4²) = √(9 + 16) = √25 = 5.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es la forma exponencial de un número complejo?',
        options: [
          'z = a + bi',
          'z = r·e^(iθ)',
          'z = r·cos(θ)',
          'z = r·sen(θ)'
        ],
        correct: 1,
        hints: [
          'La forma exponencial usa la fórmula de Euler.',
          'Es z = r·e^(iθ) donde r es el módulo y θ el argumento.'
        ],
        explanation: 'La forma exponencial es z = r·e^(iθ), donde r = |z| y θ = arg(z).'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Número complejo en el plano de Argand',
        description: 'Arrastra el punto para ver cómo cambian módulo y argumento',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'a', min: -5, max: 5, step: 0.5, default: 3, label: 'Parte real a' },
          { var: 'b', min: -5, max: 5, step: 0.5, default: 4, label: 'Parte imaginaria b' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Raíces n-ésimas de la unidad',
        description: 'Observa cómo las raíces n-ésimas de 1 se distribuyen en el círculo unitario',
        type: 'function',
        data: {
          functions: [],
          range: [-2, 2]
        },
        sliders: [
          { var: 'n', min: 2, max: 10, step: 1, default: 5, label: 'Índice de raíz n' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
