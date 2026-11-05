// modules/m13/content.js
// Contenido estructurado — Módulo 13: Inecuaciones
// Lineales, cuadráticas, con valor absoluto, sistemas, región factible.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm13',
  title: 'Inecuaciones',
  estimatedMinutes: 60,
  difficulty: 3,
  tags: ['inecuaciones', 'desigualdades', 'lineales', 'cuadráticas', 'valor absoluto', 'sistemas', 'región factible'],
  learningObjectives: [
    'Entender qué es una inecuación y cómo se diferencia de una ecuación',
    'Resolver inecuaciones lineales de una incógnita',
    'Resolver inecuaciones cuadráticas',
    'Resolver inecuaciones con valor absoluto',
    'Resolver sistemas de inecuaciones y graficar la región factible'
  ],
  theory: {
    historicalContext: 'Los símbolos de desigualdad (<, >, ≤, ≥) fueron introducidos por Thomas Harriot en 1631. Antes, se usaban palabras como "maior" y "minor". Las inecuaciones son fundamentales en optimización, economía y programación lineal, donde se busca maximizar o minimizar una función sujeta a restricciones.',
    sections: [
      {
        number: '13.1',
        title: 'Qué es una inecuación',
        content: 'Una inecuación es una relación entre dos expresiones que no son iguales, usando símbolos <, >, ≤, ≥. Resolver una inecuación significa encontrar todos los valores que la hacen verdadera. La solución es generalmente un intervalo, no un solo valor.',
        formulas: ['x + 3 > 5', '2x - 1 ≤ 7'],
        analogies: [
          'Es como decir "necesito al menos 5 pesos para comprar esto" → x ≥ 5. No es un valor exacto, es un rango.'
        ]
      },
      {
        number: '13.2',
        title: 'Inecuaciones lineales',
        content: 'Una inecuación lineal tiene la forma ax + b > 0 (o <, ≤, ≥). Se resuelve igual que una ecuación, pero con una regla crucial: si multiplicas o divides por un número negativo, el signo de la inecuación se invierte.',
        formulas: ['2x - 3 < 5 → 2x < 8 → x < 4', '-2x < 6 → x > -3'],
        analogies: [
          'Es como una balanza desigual: un lado pesa más que el otro. Al multiplicar por negativo, el lado más pesado se vuelve el más ligero (se invierte el orden).'
        ]
      },
      {
        number: '13.3',
        title: 'Inecuaciones cuadráticas',
        content: 'Una inecuación cuadrática tiene la forma ax² + bx + c > 0. Se resuelve hallando las raíces de la ecuación asociada ax² + bx + c = 0, y luego determinando en qué intervalos la expresión es positiva o negativa usando el signo del coeficiente principal.',
        formulas: ['x² - 5x + 6 > 0'],
        analogies: [
          'Es como saber cuándo una pelota lanzada está por encima de cierta altura: la parábola está arriba del eje x en ciertos intervalos.'
        ]
      },
      {
        number: '13.4',
        title: 'Inecuaciones con valor absoluto',
        content: '|x| < a significa que x está a menos de distancia a del cero: -a < x < a. |x| > a significa que x está a más de distancia a del cero: x < -a o x > a. Se resuelven descomponiendo en casos.',
        formulas: ['|x - 3| < 2 → 1 < x < 5', '|x| > 3 → x < -3 o x > 3'],
        analogies: [
          '|x - 3| < 2 significa "la distancia entre x y 3 es menor que 2", es decir, x está entre 1 y 5.'
        ]
      },
      {
        number: '13.5',
        title: 'Sistemas de inecuaciones y región factible',
        content: 'Un sistema de inecuaciones se resuelve graficando cada inecuación y buscando la región donde se cumplen todas al mismo tiempo. Esa región se llama región factible. Es fundamental en optimización y programación lineal.',
        formulas: ['{ x + y ≤ 10, x ≥ 0, y ≥ 0 }'],
        analogies: [
          'Es como encontrar el área donde se cumplen varias restricciones al mismo tiempo: el presupuesto, el tiempo y los recursos disponibles.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Olvidar cambiar el signo al multiplicar por negativo',
        description: 'Al multiplicar o dividir una inecuación por un número negativo, el signo se invierte (> se convierte en <). Los estudiantes lo olvidan frecuentemente.',
        remediation: 'Siempre recordar: multiplicar o dividir por negativo invierte el signo de la inecuación.'
      },
      {
        name: 'Creer que el valor absoluto siempre da positivo sin más',
        description: 'Los estudiantes piensan que |x| < -1 tiene solución, pero el valor absoluto nunca es negativo, así que no hay solución.',
        remediation: 'Recordar que |x| ≥ 0 siempre, así que |x| < número negativo no tiene solución.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Inecuación lineal simple',
        type: 'Inecuación lineal',
        estimatedMinutes: 5,
        question: 'Resuelve: 3x - 7 < 11',
        steps: [
          'Pasa el -7 al otro lado: 3x < 11 + 7.',
          'Calcula: 3x < 18.',
          'Divide entre 3 (positivo, no cambia el signo): x < 6.',
          'Solución: x < 6.'
        ],
        hints: [
          'Trata la inecuación como una ecuación hasta el final.',
          'Solo cambia el signo si multiplicas o divides por negativo.'
        ],
        solution: 'x < 6.'
      },
      {
        title: 'Inecuación con coeficiente negativo',
        type: 'Inecuación lineal',
        estimatedMinutes: 5,
        question: 'Resuelve: -2x + 5 ≥ 13',
        steps: [
          'Pasa el 5: -2x ≥ 13 - 5 → -2x ≥ 8.',
          'Divide entre -2 (negativo, CAMBIA el signo): x ≤ -4.',
          'Solución: x ≤ -4.'
        ],
        hints: [
          'Cuidado: al dividir por -2, el signo ≥ se convierte en ≤.',
          'Verifica probando x = -5: -2(-5) + 5 = 15 ≥ 13. ✓'
        ],
        solution: 'x ≤ -4.'
      },
      {
        title: 'Inecuación cuadrática',
        type: 'Inecuación cuadrática',
        estimatedMinutes: 7,
        question: 'Resuelve: x² - 5x + 6 > 0',
        steps: [
          'Halla las raíces de x² - 5x + 6 = 0: (x-2)(x-3) = 0 → x = 2, x = 3.',
          'La parábola abre hacia arriba (coeficiente de x² positivo).',
          'Es positiva fuera de las raíces: x < 2 o x > 3.',
          'Solución: (-∞, 2) ∪ (3, ∞).'
        ],
        hints: [
          'Encuentra primero las raíces de la ecuación asociada.',
          'La parábola abre hacia arriba, así que es positiva "afuera" de las raíces.'
        ],
        solution: 'x < 2 o x > 3.'
      },
      {
        title: 'Inecuación con valor absoluto',
        type: 'Valor absoluto',
        estimatedMinutes: 6,
        question: 'Resuelve: |2x - 4| ≤ 6',
        steps: [
          '|2x - 4| ≤ 6 significa -6 ≤ 2x - 4 ≤ 6.',
          'Suma 4 a las tres partes: -2 ≤ 2x ≤ 10.',
          'Divide entre 2: -1 ≤ x ≤ 5.',
          'Solución: -1 ≤ x ≤ 5.'
        ],
        hints: [
          '|expression| ≤ a significa -a ≤ expression ≤ a.',
          'Resuelve la inecuación compuesta.'
        ],
        solution: '-1 ≤ x ≤ 5.'
      },
      {
        title: 'Sistema de inecuaciones',
        type: 'Sistema',
        estimatedMinutes: 7,
        question: 'Grafica y encuentra la región factible: x + y ≤ 6, x ≥ 0, y ≥ 0',
        steps: [
          'Grafica x + y = 6: recta que pasa por (6,0) y (0,6).',
          'x + y ≤ 6 es la región debajo de la recta.',
          'x ≥ 0 es la región a la derecha del eje y.',
          'y ≥ 0 es la región arriba del eje x.',
          'La región factible es el triángulo con vértices (0,0), (6,0), (0,6).'
        ],
        hints: [
          'Grafica cada inecuación y sombrea el lado que cumple.',
          'La región factible es donde se superponen todas las sombras.'
        ],
        solution: 'Triángulo con vértices (0,0), (6,0), (0,6).'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es la solución de 2x + 3 > 9?',
        options: [
          'x > 3',
          'x < 3',
          'x > 6',
          'x < 6'
        ],
        correct: 0,
        hints: [
          'Pasa el 3: 2x > 6.',
          'Divide entre 2: x > 3.'
        ],
        explanation: '2x > 6, así que x > 3.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué pasa al multiplicar una inecuación por un número negativo?',
        options: [
          'El signo se mantiene',
          'El signo se invierte',
          'La inecuación se convierte en ecuación',
          'No pasa nada'
        ],
        correct: 1,
        hints: [
          'Multiplicar por negativo invierte el orden.',
          'Si -2 < -1, multiplicando por -1 da 2 > 1.'
        ],
        explanation: 'Al multiplicar o dividir por un número negativo, el signo de la inecuación se invierte.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es la solución de |x| < 4?',
        options: [
          'x < 4',
          'x > 4',
          '-4 < x < 4',
          'x < -4 o x > 4'
        ],
        correct: 2,
        hints: [
          '|x| < 4 significa que x está a menos de 4 unidades del cero.',
          'Está entre -4 y 4.'
        ],
        explanation: '|x| < 4 significa -4 < x < 4.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Inecuación lineal en recta numérica',
        description: 'Visualiza la solución de ax + b > 0 en la recta numérica',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'a', min: -5, max: 5, step: 1, default: 2, label: 'Coeficiente a' },
          { var: 'b', min: -10, max: 10, step: 1, default: -3, label: 'Término b' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Región factible de sistema de inecuaciones',
        description: 'Visualiza la región donde se cumplen dos inecuaciones al mismo tiempo',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 10]
        },
        sliders: [
          { var: 'm1', min: -5, max: 5, step: 1, default: -1, label: 'Pendiente recta 1' },
          { var: 'b1', min: 0, max: 10, step: 1, default: 6, label: 'Intersección recta 1' },
          { var: 'm2', min: 0, max: 5, step: 1, default: 0, label: 'Pendiente recta 2 (eje x)' },
          { var: 'b2', min: 0, max: 10, step: 1, default: 0, label: 'Intersección recta 2' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
