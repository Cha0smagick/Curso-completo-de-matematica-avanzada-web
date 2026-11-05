// modules/m21/content.js
// Contenido estructurado — Módulo 21: Función Exponencial y Logarítmica
// Definición, propiedades, gráficas, ecuaciones exponenciales y logarítmicas, modelo de crecimiento/decay, interés compuesto.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm21',
  title: 'Función Exponencial y Logarítmica',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['función exponencial', 'función logarítmica', 'base e', 'logaritmo natural', 'ecuaciones exponenciales', 'crecimiento', 'decaimiento', 'interés compuesto'],
  learningObjectives: [
    'Entender qué es una función exponencial y su gráfica',
    'Entender qué es un logaritmo y su relación con la exponencial',
    'Aplicar propiedades de los logaritmos',
    'Resolver ecuaciones exponenciales y logarítmicas',
    'Modelar crecimiento y decaimiento exponencial',
    'Aplicar el fórmula de interés compuesto'
  ],
  theory: {
    historicalContext: 'Los logaritmos fueron inventados por John Napier (siglo XVI) para facilitar cálculos astronómicos. La base e (número de Euler, ≈ 2.71828) apareció naturalmente en el estudio del interés compuesto y fue estudiada por Jacob Bernoulli y Leonhard Euler (siglo XVIII). La función exponencial es fundamental en cálculo, física, biología y finanzas.',
    sections: [
      {
        number: '21.1',
        title: 'Función exponencial',
        content: 'Una función exponencial tiene la forma f(x) = a·b^x, donde a ≠ 0, b > 0, b ≠ 1. Si b > 1, la función crece exponencialmente; si 0 < b < 1, decae exponencialmente. La función exponencial natural es f(x) = e^x, donde e ≈ 2.71828 es la base de los logaritmos naturales.',
        formulas: ['f(x) = a·b^x', 'f(x) = e^x'],
        analogies: [
          'Es como el crecimiento de una población de bacterias: cada hora se duplica, por lo que crece cada vez más rápido.'
        ]
      },
      {
        number: '21.2',
        title: 'Logaritmo',
        content: 'El logaritmo es la operación inversa de la exponencial: log_b(x) = y si y sólo si b^y = x. El logaritmo natural ln(x) = log_e(x). Las propiedades del logaritmo provienen de las de la exponencial: log_b(xy) = log_b(x) + log_b(y), log_b(x/y) = log_b(x) - log_b(y), log_b(x^n) = n·log_b(x).',
        formulas: ['log_b(x) = y ⟺ b^y = x', 'ln(x) = log_e(x)', 'log_b(xy) = log_b(x) + log_b(y)'],
        analogies: [
          'El logaritmo responde a la pregunta: "¿a qué potencia debo elevar la base para obtener este número?"'
        ]
      },
      {
        number: '21.3',
        title: 'Gráficas de exponencial y logarítmica',
        content: 'La gráfica de f(x) = b^x con b > 1 crece rápidamente hacia la derecha y se acerca al eje x por la izquierda (asíntota y = 0). La gráfica de f(x) = log_b(x) es la imagen especular de f(x) = b^x respecto a la recta y = x, tiene asíntota vertical en x = 0 y crece lentamente.',
        formulas: ['f(x) = b^x, b > 1: crece', 'f(x) = log_b(x): asíntota x = 0'],
        analogies: [
          'La gráfica de la exponencial se dispara hacia arriba; la del logaritmo crece muy lentamente hacia la derecha.'
        ]
      },
      {
        number: '21.4',
        title: 'Ecuaciones exponenciales y logarítmicas',
        content: 'Para resolver ecuaciones exponenciales, se toma logaritmo de ambos lados o se escribe ambos lados con la misma base. Para resolver ecuaciones logarítmicas, se exponenciación ambos lados o se usa la definición de logaritmo. Siempre verificar que las soluciones estén en el dominio (argumento del logaritmo debe ser positivo).',
        formulas: ['a^x = b → x = log_b(a)', 'log_b(x) = y → x = b^y'],
        analogies: [
          'Es como deshacer una operación: si elevaste a una potencia, tomas logaritmo para deshacerlo.'
        ]
      },
      {
        number: '21.5',
        title: 'Modelo de crecimiento y decaimiento exponencial',
        content: 'Muchos fenómenos naturales se modelan con exponenciales: crecimiento poblacional (P(t) = P₀·e^(rt)), descomposición radiactiva (N(t) = N₀·e^(-λt)), enfriamiento (ley de Newton). La tasa de cambio es proporcional al valor actual.',
        formulas: ['P(t) = P₀·e^(rt)', 'N(t) = N₀·e^(-λt)'],
        analogies: [
          'El crecimiento exponencial es como el interés compuesto: cuanto más tienes, más rápido crece.'
        ]
      },
      {
        number: '21.6',
        title: 'Interés compuesto',
        content: 'El interés compuesto se calcula sobre el capital inicial más los intereses acumulados. La fórmula es A = P·(1 + r/n)^(n·t), donde P es el capital, r la tasa anual, n el número de capitalizaciones por año, y t el tiempo en años. Cuando n → ∞, se obtiene interés compuesto continuo: A = P·e^(r·t).',
        formulas: ['A = P·(1 + r/n)^(n·t)', 'A = P·e^(r·t) (interés compuesto continuo)'],
        analogies: [
          'El interés compuesto es como una bola de nieve: los intereses generan más intereses.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que log(a + b) = log(a) + log(b)',
        description: 'Las propiedades del logaritmo solo se aplican a productos, cocientes y potencias, no a sumas ni restas.',
        remediation: 'Recordar que log(a + b) ≠ log(a) + log(b). La propiedad es log(ab) = log(a) + log(b).'
      },
      {
        name: 'Creer que el logaritmo de un número negativo existe',
        description: 'El dominio de la función logarítmica es x > 0. No existe el logaritmo de un número negativo o cero en los reales.',
        remediation: 'Recordar que el argumento del logaritmo debe ser estrictamente positivo.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Evaluar una exponencial',
        type: 'Evaluación',
        estimatedMinutes: 4,
        question: 'Calcula f(x) = 3·2^x para x = 4',
        steps: [
          'Sustituye x por 4: f(4) = 3·2⁴.',
          'Calcula: 2⁴ = 16.',
          'Multiplica: 3·16 = 48.',
          'Resultado: f(4) = 48.'
        ],
        hints: [
          'Primero calcula la potencia, luego multiplica por el coeficiente.',
          '2⁴ = 16.'
        ],
        solution: 'f(4) = 48.'
      },
      {
        title: 'Evaluar un logaritmo',
        type: 'Evaluación',
        estimatedMinutes: 5,
        question: 'Calcula log₂(8)',
        steps: [
          'Pregúntate: ¿a qué potencia debo elevar 2 para obtener 8?',
          '2³ = 8.',
          'Resultado: log₂(8) = 3.'
        ],
        hints: [
          'El logaritmo es el exponente.',
          '2 elevado a qué número da 8?'
        ],
        solution: 'log₂(8) = 3.'
      },
      {
        title: 'Resolver ecuación exponencial',
        type: 'Ecuación',
        estimatedMinutes: 6,
        question: 'Resuelve 2^x = 16',
        steps: [
          'Expresa 16 como potencia de 2: 16 = 2⁴.',
          'Entonces 2^x = 2⁴.',
          'Por tanto x = 4.'
        ],
        hints: [
          'Escribe ambos lados con la misma base.',
          '16 es una potencia de 2.'
        ],
        solution: 'x = 4.'
      },
      {
        title: 'Interés compuesto',
        type: 'Aplicación',
        estimatedMinutes: 7,
        question: '¿Cuánto se acumula al invertir $1000 al 5% anual compuesto anualmente durante 3 años?',
        steps: [
          'Usa A = P·(1 + r)^t con P = 1000, r = 0.05, t = 3.',
          'Calcula: A = 1000·(1.05)³ = 1000·1.157625 = 1157.625.',
          'Resultado: aproximadamente $1157.63.'
        ],
        hints: [
          'Convierte el porcentaje a decimal: 5% = 0.05.',
          'Usa la fórmula de interés compuesto anual.'
        ],
        solution: 'A = $1157.63.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es el dominio de f(x) = log₂(x)?',
        options: [
          'Todos los reales',
          'x > 0',
          'x ≥ 0',
          'x ≠ 0'
        ],
        correct: 1,
        hints: [
          'El argumento del logaritmo debe ser positivo.',
          'No puedes tomar logaritmo de un número negativo o cero.'
        ],
        explanation: 'El dominio de log₂(x) es x > 0 porque el argumento debe ser positivo.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el valor de ln(e³)?',
        options: [
          '3',
          'e³',
          '1',
          '0'
        ],
        correct: 0,
        hints: [
          'ln(e^x) = x por definición de logaritmo natural.',
          'ln(e³) = 3.'
        ],
        explanation: 'ln(e³) = 3 porque el logaritmo natural es la inversa de la exponencial.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el período de la función f(x) = 2^x?',
        options: [
          'No tiene período (no es periódica)',
          '2π',
          '1',
          '2'
        ],
        correct: 0,
        hints: [
          'Una función exponencial no se repite, no es periódica.',
          'Cada valor de x da un valor diferente de y.'
        ],
        explanation: 'La función exponencial no es periódica; no tiene período.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Función exponencial con base variable',
        description: 'Observa cómo cambia la gráfica al modificar la base b',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'b', min: 0.1, max: 5, step: 0.1, default: 2, label: 'Base b' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Crecimiento vs decaimiento',
        description: 'Compara crecimiento (b > 1) y decaimiento (0 < b < 1)',
        type: 'function',
        data: {
          functions: [],
          range: [0, 10]
        },
        sliders: [
          { var: 'b', min: 0.1, max: 3, step: 0.1, default: 2, label: 'Base b' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
