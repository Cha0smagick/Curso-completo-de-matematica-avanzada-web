// modules/m09/content.js
// Contenido estructurado — Módulo 9: Reales
// Irracionales (√2, π, e), densidad, intervalos, notación científica, órdenes de magnitud.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm09',
  title: 'Reales',
  estimatedMinutes: 60,
  difficulty: 3,
  tags: ['números reales', 'irracionales', '√2', 'π', 'e', 'densidad', 'intervalos', 'notación científica'],
  learningObjectives: [
    'Entender la diferencia entre números racionales e irracionales',
    'Reconocer irracionales clásicos: √2, π, e',
    'Entender la densidad de los racionales y los irracionales en la recta real',
    'Usar intervalos para describir conjuntos de números',
    'Usar notación científica y entender órdenes de magnitud'
  ],
  theory: {
    historicalContext: 'El descubrimiento de los irracionales fue un escándalo en la antigua Grecia. Se cuenta que Hipaso de Metaponto demostró que √2 no es racional y fue asesinado por ello (los pitagóricos creían que todo era número/razón). Los intervalos y la notación científica son herramientas modernas para manejar números muy grandes o muy pequeños en ciencia e ingeniería.',
    sections: [
      {
        number: '9.1',
        title: 'Racionales vs irracionales',
        content: 'Un número racional se puede escribir como fracción a/b. Un irracional no: su decimal es infinito y no periódico. √2, π y e son los irracionales más famosos. La prueba de que √2 es irracional usa reducción al absurdo: si √2 = a/b, llegamos a una contradicción.',
        formulas: ['√2', 'π', 'e'],
        analogies: [
          'Los racionales son como puntos en una rejilla: se pueden escribir exactamente. Los irracionales son como puntos entre los rejillas: nunca terminan de escribirse.'
        ]
      },
      {
        number: '9.2',
        title: '√2: el primer irracional',
        content: '√2 es el número que multiplicado por sí mismo da 2. Mide la diagonal de un cuadrado de lado 1. Pitágoras demostró que no es racional: si √2 = a/b en términos más simples, entonces ambos a y b serían pares, contradiciendo que la fracción esté simplificada.',
        formulas: ['√2 ≈ 1.41421356...', '(√2)² = 2'],
        analogies: [
          'Es como la diagonal de una hoja cuadriculada de 1×1: nunca terminará de medirse con las marcas de la cuadrícula.'
        ]
      },
      {
        number: '9.3',
        title: 'π y e: constantes fundamentales',
        content: 'π (pi) es la relación entre la circunferencia y el diámetro de un círculo: ≈ 3.14159... e (número de Euler) surge del interés compuesto continuo: ≈ 2.71828... Ambos son irracionales y trascedentes (no son raíces de polinomios con coeficientes racionales).',
        formulas: ['π ≈ 3.14159...', 'e ≈ 2.71828...'],
        analogies: [
          'π es como la relación entre cuánto mide el borde de una rueda y cuánto mide su ancho: siempre el mismo número, sin importar el tamaño de la rueda.'
        ]
      },
      {
        number: '9.4',
        title: 'Densidad de los reales',
        content: 'Entre cualquier dos números reales distintos hay infinitos racionales e infinitos irracionales. Los racionales son densos (entre dos racionales hay otro racional) y los irracionales también son densos. La recta real está "llena": no hay huecos.',
        formulas: ['a < b → ∃q∈Q: a < q < b'],
        analogies: [
          'Es como mirar por un microscopio: entre dos puntos que parecen tocarse, siempre hay más espacio para más números.'
        ]
      },
      {
        number: '9.5',
        title: 'Intervalos',
        content: 'Un intervalo es un conjunto de números reales entre dos extremos. Abierto (a,b) no incluye los extremos, cerrado [a,b] sí los incluye, semicerrado [a,b) incluye solo uno. Se usan para describir rangos de valores posibles.',
        formulas: ['(a,b)', '[a,b]', '[a,b)'],
        analogies: [
          'Es como decir "la temperatura estará entre 18 y 24 grados": el intervalo [18,24] incluye ambos extremos.'
        ]
      },
      {
        number: '9.6',
        title: 'Notación científica y órdenes de magnitud',
        content: 'La notación científica escribe números como m × 10^n donde 1 ≤ |m| < 10 y n es entero entero. Sirve para números muy grandes (distancia entre estrellas) o muy pequeños (tamaño de un átomo). El orden de magnitud es la potencia de 10 más cercana.',
        formulas: ['m × 10^n', '1 ≤ |m| < 10'],
        analogies: [
          'Es como decir "la distancia a la estrella es de 4 ordenes de magnitud" en lugar de escribir ceros interminables.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que todo decimal infinito es irracional',
        description: 'Los estudiantes piensan que 0.333... es irracional porque su decimal no termina. Pero es periódico, así que es racional (1/3).',
        remediation: 'Un decimal es irracional solo si es infinito Y no periódico. 0.333... es periódico, así que es racional.'
      },
      {
        name: 'Creer que √2 ≈ 1.414 es exacto',
        description: '1.414 es una aproximación, no el valor exacto de √2. √2 tiene infinitos decimales sin patrón repetitivo.',
        remediation: 'Usar el símbolo ≈ para aproximaciones y reservar = para igualdades exactas.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar racionales e irracionales',
        type: 'Clasificación',
        estimatedMinutes: 5,
        question: '¿Cuál de los siguientes es irracional: 0.5, 1/3, √2, 0.75?',
        steps: [
          '0.5 = 1/2 es racional.',
          '1/3 es racional.',
          '√2 no se puede escribir como fracción, es irracional.',
          '0.75 = 3/4 es racional.'
        ],
        hints: [
          'Un racional se escribe como fracción.',
          '√2 no se puede escribir como fracción de enteros.'
        ],
        solution: '√2 es irracional.'
      },
      {
        title: 'Notación científica',
        type: 'Conversión',
        estimatedMinutes: 5,
        question: 'Escribe 300.000.000 en notación científica.',
        steps: [
          'Mueve el punto decimal hasta tener un número entre 1 y 10: 3.',
          'Cuenta cuántas posiciones moviste: 8.',
          'Resultado: 3 × 10^8.'
        ],
        hints: [
          'El exponente es cuántos lugares moviste el punto.',
          '300.000.000 = 3 × 10^8.'
        ],
        solution: '3 × 10^8.'
      },
      {
        title: 'Intervalos',
        type: 'Intervalos',
        estimatedMinutes: 4,
        question: '¿Qué números están en el intervalo (2, 5)?',
        steps: [
          'El paréntesis abierto ( significa que no incluye el extremo.',
          'Todos los números mayores que 2 y menores que 5.',
          'No incluye el 2 ni el 5.'
        ],
        hints: [
          'Paréntesis = no incluye. Corchete = incluye.',
          'Entre 2 y 5, sin tocar los extremos.'
        ],
        solution: 'Todos los x tales que 2 < x < 5.'
      },
      {
        title: 'Valor absoluto de reales',
        type: 'Valor absoluto',
        estimatedMinutes: 4,
        question: '¿Cuál es |π - 3|?',
        steps: [
          'π ≈ 3.14159...',
          'π - 3 ≈ 0.14159... que es positivo.',
          'El valor absoluto de un positivo es él mismo.',
          '|π - 3| = π - 3 ≈ 0.14159...'
        ],
        hints: [
          'Primero calcula lo que está dentro del valor absoluto.',
          'Luego aplica el valor absoluto.'
        ],
        solution: '|π - 3| = π - 3 ≈ 0.14159...'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál de los siguientes es irracional?',
        options: [
          '0.25',
          '7/3',
          '√2',
          '0.333...'
        ],
        correct: 2,
        hints: [
          'Un racional se escribe como fracción.',
          '√2 no se puede escribir como fracción.'
        ],
        explanation: '√2 es irracional. 0.25 = 1/4, 7/3 es fracción, 0.333... = 1/3 son racionales.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué representa π?',
        options: [
          'La base del interés compuesto',
          'La relación entre circunferencia y diámetro',
          'La diagonal de un cuadrado de lado 1',
          'La base de los logaritmos naturales'
        ],
        correct: 1,
        hints: [
          'π está relacionado con círculos.',
          'Es circunferencia dividido diámetro.'
        ],
        explanation: 'π es la relación entre la longitud de una circunferencia y su diámetro.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué significa la notación científica 6 × 10^23?',
        options: [
          '6 seguido de 23 ceros',
          '6 multiplicado por 10 elevado a 23',
          '6 más 10 al 23',
          '6 dividido entre 10 al 23'
        ],
        correct: 1,
        hints: [
          'm × 10^n significa m veces 10 elevado a n.',
          '6 × 10^23 = 600.000.000.000.000.000.000.000.'
        ],
        explanation: '6 × 10^23 significa 6 multiplicado por 10 elevado a la 23.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Recta numérica con racionales e irracionales',
        description: 'Ubica √2, π, e y otros números en la recta real',
        type: 'function',
        data: {
          functions: [],
          range: [0, 5]
        },
        sliders: [
          { var: 'x', min: 0, max: 5, step: 0.1, default: 1.414, label: 'Posición x' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Densidad de los reales',
        description: 'Observa cómo entre dos números siempre hay más números',
        type: 'function',
        data: {
          functions: [],
          range: [0, 1]
        },
        sliders: [
          { var: 'zoom', min: 1, max: 100, step: 1, default: 10, label: 'Nivel de zoom' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
