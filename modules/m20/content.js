// modules/m20/content.js
// Contenido estructurado — Módulo 20: Polinomios Avanzados
// Teorema del resto, teorema del factor, raíces racionales, regla de Descartes, límites, comportamiento asintótico.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm20',
  title: 'Polinomios Avanzados',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['polinomios', 'teorema del resto', 'teorema del factor', 'raíces racionales', 'regla de Descartes', 'límites', 'comportamiento asintótico'],
  learningObjectives: [
    'Entender qué es un polinomio y su grado',
    'Aplicar el teorema del resto y el teorema del factor',
    'Encontrar raíces racionales usando el teorema de raíces racionales',
    'Aplicar la regla de Descartes para contar raíces positivas y negativas',
    'Analizar el comportamiento asintótico de polinomios',
    'Factorizar polinomios y encontrar todas sus raíces'
  ],
  theory: {
    historicalContext: 'El estudio de los polinomios se remonta a Babilonia y Egipto (ecuaciones cuadráticas). Al-Khwarizmi (siglo IX) sistematizó la solución de ecuaciones. Cardano y Tartaglia (siglo XVI) resolvieron ecuaciones cúbicas y cuárticas. Descartes (siglo XVII) introdujo la notación moderna y la regla de signos. El teorema fundamental del álgebra (que todo polinomio de grado n tiene n raíces complejas) fue demostrado por Gauss en 1799.',
    sections: [
      {
        number: '20.1',
        title: 'Qué es un polinomio',
        content: 'Un polinomio es una expresión de la forma P(x) = a_n·x^n + a_{n-1}·x^{n-1} + ... + a₁·x + a₀, donde n es un entero no negativo, a_n ≠ 0, y los coeficientes son números reales. El grado del polinomio es el exponente más alto (n). El coeficiente líder es a_n. El término independiente es a₀.',
        formulas: ['P(x) = a_n·x^n + ... + a₁·x + a₀, a_n ≠ 0'],
        analogies: [
          'Un polinomio es como una receta que combina potencias de x con coeficientes.'
        ]
      },
      {
        number: '20.2',
        title: 'Teorema del resto',
        content: 'Si un polinomio P(x) se divide por (x - c), el resto es P(c). Es decir, P(x) = (x - c)·Q(x) + P(c). Esto permite evaluar un polinomio rápidamente sin hacer todas las multiplicaciones.',
        formulas: ['P(x) = (x - c)·Q(x) + P(c)'],
        analogies: [
          'Es como dividir una cantidad entre un número y preguntar cuál es el resto.'
        ]
      },
      {
        number: '20.3',
        title: 'Teorema del factor',
        content: 'Un polinomio P(x) tiene un factor (x - c) si y solo si P(c) = 0. Es decir, c es una raíz del polinomio si y solo si (x - c) divide a P(x). Esto conecta las raíces con los factores.',
        formulas: ['P(c) = 0 ⟺ (x - c) es factor de P(x)'],
        analogies: [
          'Si al evaluar en c obtienes cero, entonces (x - c) es un factor del polinomio.'
        ]
      },
      {
        number: '20.4',
        title: 'Teorema de raíces racionales',
        content: 'Si P(x) = a_n·x^n + ... + a₁·x + a₀ tiene coeficientes enteros, cualquier raíz racional de la forma p/q (en términos más simples) cumple que p divide a a₀ (término independiente) y q divide a a_n (coeficiente líder). Esto limita las posibles raíces racionales a probar.',
        formulas: ['p divide a₀, q divide a_n'],
        analogies: [
          'Es como reducir el número de candidatos a probar para encontrar raíces racionales.'
        ]
      },
      {
        number: '20.5',
        title: 'Regla de Descartes',
        content: 'La regla de Descartes permite determinar el número de raíces positivas y negativas reales de un polinomio. El número de raíces positivas es igual al número de cambios de signo en los coeficientes de P(x), o menor por un número par. El número de raíces negativas es igual al número de cambios de signo en P(-x), o menor por un número par.',
        formulas: ['Número de raíces positivas ≤ número de cambios de signo en P(x)'],
        analogies: [
          'Es como contar cuántas veces cambia de signo el polinomio para saber cuántas raíces positivas puede tener.'
        ]
      },
      {
        number: '20.6',
        title: 'Límites y comportamiento asintótico',
        content: 'Para x → ∞ o x → -∞, el comportamiento de un polinomio está dominado por su término de mayor grado (término líder). Si a_n > 0, P(x) → +∞ cuando x → +∞; si a_n < 0, P(x) → -∞. Para x → -∞, depende del grado: si n es par, P(x) tiene el mismo signo que a_n; si n es impar, tiene el signo opuesto.',
        formulas: ['P(x) ~ a_n·x^n cuando x → ±∞'],
        analogies: [
          'Para valores muy grandes de x, el término de mayor grado domina sobre todos los demás.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que todo polinomio tiene raíces reales',
        description: 'No todo polinomio tiene raíces reales. Por ejemplo, x² + 1 = 0 no tiene solución real. Todo polinomio de grado n tiene n raíces complejas (contando multiplicidad), pero algunas pueden no ser reales.',
        remediation: 'Recordar que las raíces pueden ser complejas, no necesariamente reales.'
      },
      {
        name: 'Creer que el grado indica el número de raíces reales',
        description: 'Un polinomio de grado n tiene a lo más n raíces reales, pero puede tener menos (incluso ninguna). El resto son raíces complejas.',
        remediation: 'Un polinomio de grado n tiene n raíces complejas (contando multiplicidad), pero algunas pueden no ser reales.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar grado y coeficiente líder',
        type: 'Identificación',
        estimatedMinutes: 4,
        question: 'Para P(x) = 4x³ - 2x² + 7x - 5, ¿cuál es el grado y el coeficiente líder?',
        steps: [
          'El grado es el exponente más alto: 3.',
          'El coeficiente líder es el coeficiente del término de mayor grado: 4.',
          'Resultado: grado 3, coeficiente líder 4.'
        ],
        hints: [
          'Busca el término con el exponente más alto de x.',
          'El coeficiente de ese término es el coeficiente líder.'
        ],
        solution: 'Grado 3, coeficiente líder 4.'
      },
      {
        title: 'Aplicar teorema del resto',
        type: 'Teorema del resto',
        estimatedMinutes: 5,
        question: 'Hallar el resto al dividir P(x) = x³ - 2x² + 3x - 4 entre (x - 2)',
        steps: [
          'Por el teorema del resto, el resto es P(2).',
          'Calcula: P(2) = 2³ - 2·2² + 3·2 - 4 = 8 - 8 + 6 - 4 = 2.',
          'Resultado: resto = 2.'
        ],
        hints: [
          'No necesitas hacer la división larga, solo evalúa P(2).',
          'P(2) = 8 - 8 + 6 - 4 = 2.'
        ],
        solution: 'Resto = 2.'
      },
      {
        title: 'Verificar si es factor',
        type: 'Teorema del factor',
        estimatedMinutes: 6,
        question: '¿Es (x - 3) factor de P(x) = x³ - 6x² + 11x - 6?',
        steps: [
          'Por el teorema del factor, (x - 3) es factor si y solo si P(3) = 0.',
          'Calcula: P(3) = 3³ - 6·3² + 11·3 - 6 = 27 - 54 + 33 - 6 = 0.',
          'Como P(3) = 0, sí es factor.'
        ],
        hints: [
          'Evalúa P(3) y verifica si da cero.',
          'Si da cero, (x - 3) es factor.'
        ],
        solution: 'Sí, (x - 3) es factor porque P(3) = 0.'
      },
      {
        title: 'Teorema de raíces racionales',
        type: 'Raíces racionales',
        estimatedMinutes: 7,
        question: 'Lista las posibles raíces racionales de P(x) = 2x³ - 3x² - 11x + 6',
        steps: [
          'El término independiente es a₀ = 6, los divisores son ±1, ±2, ±3, ±6.',
          'El coeficiente líder es a_n = 2, los divisores son ±1, ±2.',
          'Las posibles raíces racionales son ±1, ±2, ±3, ±6, ±1/2, ±3/2.',
          'Resultado: ±1, ±2, ±3, ±6, ±1/2, ±3/2.'
        ],
        hints: [
          'Los valores posibles de p son divisores de a₀.',
          'Los valores posibles de q son divisores de a_n.'
        ],
        solution: '±1, ±2, ±3, ±6, ±1/2, ±3/2.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es el grado del polinomio P(x) = 4x⁵ - 2x³ + x - 7?',
        options: [
          '4',
          '5',
          '3',
          '7'
        ],
        correct: 1,
        hints: [
          'El grado es el exponente más alto de x.',
          'El exponente más alto es 5.'
        ],
        explanation: 'El grado es 5 porque el exponente más alto de x es 5.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el resto al dividir P(x) = x² - 3x + 2 entre (x - 1)?',
        options: [
          '0',
          '1',
          '2',
          '3'
        ],
        correct: 0,
        hints: [
          'Por el teorema del resto, el resto es P(1).',
          'P(1) = 1² - 3·1 + 2 = 1 - 3 + 2 = 0.'
        ],
        explanation: 'P(1) = 1 - 3 + 2 = 0, así que el resto es 0.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuántas raíces positivas puede tener como máximo P(x) = x³ - 4x² + x + 6 según la regla de Descartes?',
        options: [
          '1',
          '2',
          '3',
          '0'
        ],
        correct: 1,
        hints: [
          'Cuenta los cambios de signo en los coeficientes: +, -, +, +.',
          'Hay 2 cambios de signo.'
        ],
        explanation: 'Los coeficientes son +1, -4, +1, +6. Hay 2 cambios de signo (+ a -, - a +), así que hay 2 o 0 raíces positivas.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Comportamiento asintótico de polinomios',
        description: 'Observa cómo cambia la gráfica al modificar el grado y coeficiente líder',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'a', min: -5, max: 5, step: 1, default: 1, label: 'Coeficiente líder a' },
          { var: 'n', min: 1, max: 6, step: 1, default: 2, label: 'Grado n' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Raíces de un polinomio',
        description: 'Observa cómo cambian las raíces al modificar los coeficientes',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'a', min: -5, max: 5, step: 1, default: 1, label: 'Coeficiente x²' },
          { var: 'b', min: -10, max: 10, step: 1, default: -5, label: 'Coeficiente x' },
          { var: 'c', min: -10, max: 10, step: 1, default: 6, label: 'Término independiente' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
