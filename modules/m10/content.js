// modules/m10/content.js
// Contenido estructurado — Módulo 10: Potenciación y Radicación
// Leyes de exponentes (enteros, racionales), notación radical, racionalización, jerarquía de operaciones.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm10',
  title: 'Potenciación y Radicación',
  estimatedMinutes: 60,
  difficulty: 3,
  tags: ['potencias', 'raíces', 'exponentes', 'leyes de exponentes', 'radicación', 'racionalización'],
  learningObjectives: [
    'Entender qué es una potencia y cómo se lee',
    'Aplicar las leyes de los exponentes: producto, cociente, potencia de potencia, potencia de producto',
    'Entender exponentes cero y negativos',
    'Usar la notación radical y entender raíces como potencias fraccionarias',
    'Racionalizar denominadores y aplicar la jerarquía de operaciones con potencias y raíces'
  ],
  theory: {
    historicalContext: 'La notación de exponentes fue introducida por René Descartes en 1637 en su libro "La Géometría". Antes, se escribían las potencias como palabras (a quadrado, a cubo). La notación radical (√) viene de la letra r de "radix" (raíz en latín). Los exponentes fraccionarios y negativos fueron aceptados siglos después, cuando se entendió que las leyes de los exponentes debían mantenerse consistentes.',
    sections: [
      {
        number: '10.1',
        title: 'Qué es una potencia',
        content: 'Una potencia es la multiplicación repetida de un número por sí mismo. a^n significa multiplicar a por sí mismo n veces. a es la base, n es el exponente. 2^3 = 2×2×2 = 8. La potencia es una forma abreviada de escribir multiplicaciones repetidas.',
        formulas: ['a^n = a×a×...×a (n veces)', '2^3 = 8'],
        analogies: [
          'Es como decir "duplica el dinero 3 veces": 1 → 2 → 4 → 8. Eso es 2^3.'
        ]
      },
      {
        number: '10.2',
        title: 'Leyes de los exponentes',
        content: 'Las leyes de los exponentes se derivan de la definición de potencia como multiplicación repetida: (1) Producto: a^m × a^n = a^(m+n). (2) Cociente: a^m / a^n = a^(m-n). (3) Potencia de potencia: (a^m)^n = a^(m×n). (4) Potencia de producto: (ab)^n = a^n × b^n. (5) Potencia de cociente: (a/b)^n = a^n / b^n.',
        formulas: ['a^m × a^n = a^(m+n)', '(a^m)^n = a^(m×n)', '(ab)^n = a^n b^n'],
        analogies: [
          'Es como combinar duplicaciones: duplicar 3 veces y luego 2 veces es duplicar 5 veces en total: 2^3 × 2^2 = 2^5.'
        ]
      },
      {
        number: '10.3',
        title: 'Exponente cero y negativos',
        content: 'Cualquier número distinto de cero elevado a 0 es 1: a^0 = 1. Esto se deriva de la ley del cociente: a^3/a^3 = a^(3-3) = a^0 = 1. Un exponente negativo significa recíproco: a^(-n) = 1/a^n. Esto mantiene la consistencia de las leyes: a^2 × a^(-2) = a^0 = 1.',
        formulas: ['a^0 = 1', 'a^(-n) = 1/a^n'],
        analogies: [
          'El exponente cero es como "no aplicar ninguna duplicación": te quedas con lo que tenías (1, el elemento neutro de la multiplicación).'
        ]
      },
      {
        number: '10.4',
        title: 'Notación radical y raíces',
        content: 'La raíz n-ésima de a es el número que elevado a n da a: √[n]{a} = b si b^n = a. La raíz cuadrada es √a = √[2]{a}. Una raíz se puede escribir como potencia fraccionaria: √[n]{a} = a^(1/n). Esto unifica potencias y raíces bajo las mismas leyes de los exponentes.',
        formulas: ['√[n]{a} = a^(1/n)', '√a = a^(1/2)'],
        analogies: [
          'La raíz es como la potencia "al revés": si la potencia va hacia adelante (multiplicar), la raíz va hacia atrás (deshacer la multiplicación).'
        ]
      },
      {
        number: '10.5',
        title: 'Racionalización de denominadores',
        content: 'Racionalizar significa eliminar raíces del denominador de una fracción. Se multiplica numerador y denominador por una expresión que elimine la raíz: 1/√2 = (1×√2)/(√2×√2) = √2/2. Esto se hace para tener una forma canónica y facilitar cálculos.',
        formulas: ['1/√2 = √2/2'],
        analogies: [
          'Es como tener una fracción con una raíz en el denominador y "limpiarla" para que el denominador sea un número racional.'
        ]
      },
      {
        number: '10.6',
        title: 'Jerarquía de operaciones con potencias y raíces',
        content: 'El orden de operaciones con potencias y raíces es: 1) Paréntesis y símbolos de agrupamiento (incluyendo el vinculo de la raíz), 2) Potencias y raíces, 3) Multiplicación y división (izq. a der.), 4) Suma y resta (izq. a der.). Las raíces se tratan como potencias en la jerarquía.',
        formulas: ['√(4+5) = √9 = 3', '2 + 3^2 = 2 + 9 = 11'],
        analogies: [
          'Es como las reglas de tránsito: las potencias y raíces tienen prioridad sobre la suma y resta, al igual que los semáforos tienen prioridad sobre los peatones.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que (a+b)^2 = a^2 + b^2',
        description: 'Este es uno de los errores más comunes. (a+b)^2 = a^2 + 2ab + b^2, no a^2 + b^2. El término del medio 2ab se olvida frecuentemente.',
        remediation: 'Recordar que (a+b)^2 = (a+b)(a+b) = a^2 + ab + ba + b^2 = a^2 + 2ab + b^2.'
      },
      {
        name: 'Creer que √(a+b) = √a + √b',
        description: 'La raíz no se distribuye sobre la suma: √(a+b) ≠ √a + √b. Por ejemplo, √(4+9) = √13 ≈ 3.6, pero √4 + √9 = 2 + 3 = 5.',
        remediation: 'La raíz solo se distribuye sobre la multiplicación: √(ab) = √a × √b, no sobre la suma.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Aplicar leyes de exponentes',
        type: 'Cálculo',
        estimatedMinutes: 6,
        question: 'Calcula: 2^3 × 2^4',
        steps: [
          'Usa la ley del producto: a^m × a^n = a^(m+n).',
          '2^3 × 2^4 = 2^(3+4) = 2^7.',
          'Calcula 2^7 = 128.'
        ],
        hints: [
          'Cuando multiplicas potencias con la misma base, sumas los exponentes.',
          '3 + 4 = 7.'
        ],
        solution: '2^3 × 2^4 = 2^7 = 128.'
      },
      {
        title: 'Exponente negativo',
        type: 'Exponente negativo',
        estimatedMinutes: 5,
        question: '¿Cuánto es 2^(-3)?',
        steps: [
          'Usa la regla del exponente negativo: a^(-n) = 1/a^n.',
          '2^(-3) = 1/2^3 = 1/8.',
          'Resultado: 1/8 o 0.125.'
        ],
        hints: [
          'Un exponente negativo significa recíproco.',
          '2^3 = 8, así que 2^(-3) = 1/8.'
        ],
        solution: '2^(-3) = 1/8.'
      },
      {
        title: 'Raíz como potencia fraccionaria',
        type: 'Radicación',
        estimatedMinutes: 5,
        question: 'Escribe √[3]{8} como potencia fraccionaria y calcula.',
        steps: [
          '√[3]{8} = 8^(1/3).',
          'Busca qué número elevado al cubo da 8: 2^3 = 8.',
          'Entonces 8^(1/3) = 2.'
        ],
        hints: [
          'Una raíz es una potencia con exponente fraccionario.',
          '¿Qué número multiplicado por sí mismo 3 veces da 8?'
        ],
        solution: '√[3]{8} = 8^(1/3) = 2.'
      },
      {
        title: 'Racionalizar denominador',
        type: 'Racionalización',
        estimatedMinutes: 6,
        question: 'Racionaliza: 3/√5',
        steps: [
          'Multiplica numerador y denominador por √5.',
          '(3×√5)/(√5×√5) = 3√5/5.',
          'El denominador ahora es racional.'
        ],
        hints: [
          'Multiplica por √5/√5 (que vale 1).',
          '√5 × √5 = 5.'
        ],
        solution: '3/√5 = 3√5/5.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuánto es 2^0?',
        options: [
          '0',
          '1',
          '2',
          'Indefinido'
        ],
        correct: 1,
        hints: [
          'Cualquier número distinto de cero elevado a 0 es 1.',
          'Usa la ley del cociente: 2^3/2^3 = 2^0 = 1.'
        ],
        explanation: '2^0 = 1. Cualquier número (excepto 0) elevado a 0 es 1.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el resultado de (3^2)^3?',
        options: [
          '3^5',
          '3^6',
          '9^3',
          '3^8'
        ],
        correct: 1,
        hints: [
          'Usa la ley de potencia de potencia: (a^m)^n = a^(m×n).',
          '2 × 3 = 6.'
        ],
        explanation: '(3^2)^3 = 3^(2×3) = 3^6.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuánto es √[3]{27}?',
        options: [
          '3',
          '9',
          '7',
          '27'
        ],
        correct: 0,
        hints: [
          'Busca qué número elevado al cubo da 27.',
          '3 × 3 × 3 = 27.'
        ],
        explanation: '√[3]{27} = 3 porque 3^3 = 27.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Crecimiento de potencias',
        description: 'Observa cómo crecen 2^x, 3^x y 10^x',
        type: 'function',
        data: {
          functions: [],
          range: [0, 5]
        },
        sliders: [
          { var: 'base', min: 2, max: 10, step: 1, default: 2, label: 'Base' },
          { var: 'exp', min: 0, max: 5, step: 0.1, default: 2, label: 'Exponente' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Raíces en la recta numérica',
        description: 'Ubica √2, √3, √5 en la recta numérica',
        type: 'function',
        data: {
          functions: [],
          range: [0, 5]
        },
        sliders: [
          { var: 'n', min: 2, max: 10, step: 1, default: 2, label: 'Índice de raíz n' },
          { var: 'a', min: 1, max: 20, step: 1, default: 2, label: 'Radicando a' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
