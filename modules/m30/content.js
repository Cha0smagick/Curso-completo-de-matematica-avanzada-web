// modules/m30/content.js
// Contenido estructurado — Módulo 30: Aplicaciones de la Derivada
// Razones de cambio, optimización, Teorema del Valor Medio, regla de L Hospital, concavidad, asíntotas.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm30',
  title: 'Aplicaciones de la Derivada',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['derivada', 'optimización', 'razones de cambio', 'teorema del valor medio', 'regla de l hospital', 'concavidad', 'puntos de inflexión', 'asíntotas', 'croquisizado'],
  learningObjectives: [
    'Interpretar la derivada como tasa de cambio instantánea',
    'Resolver problemas de optimización (máximos y mínimos)',
    'Aplicar el Teorema del Valor Medio (Rolle, Lagrange, Cauchy)',
    'Aplicar la regla de L Hospital para calcular límites indeterminados',
    'Analizar concavidad y encontrar puntos de inflexión',
    'Encontrar asíntotas y hacer croquis de funciones'
  ],
  theory: {
    historicalContext: 'Las aplicaciones de la derivada se desarrollaron en el siglo XVII con Newton y Leibniz. La optimización impulsó el desarrollo del cálculo. El Teorema del Valor Medio fue demostrado por Cauchy en el siglo XIX, y la regla de L Hospital fue publicada por Guillaume de l Hospital en 1696 basándose en trabajos de Johann Bernoulli.',
    sections: [
      {
        number: '30.1',
        title: 'Razones de cambio',
        content: 'La derivada representa la tasa de cambio instantánea de una función. En física, si s(t) es la posición, su derivada es la velocidad y la segunda derivada es la aceleración. En economía, si C(x) es el costo de producir x unidades, la derivada C prima de C es el costo marginal (costo de producir una unidad adicional).',
        formulas: ['derivada = tasa de cambio instantánea', 'velocidad = derivada de posición', 'aceleración = derivada de velocidad'],
        analogies: [
          'La derivada es como el velocímetro de un coche: te dice la velocidad en un instante exacto.'
        ]
      },
      {
        number: '30.2',
        title: 'Optimización: máximos y mínimos',
        content: 'Un punto c es un máximo local si el valor de la función en c es mayor o igual que en los puntos cercanos. Un punto c es un mínimo local si el valor es menor o igual. Para encontrarlos: primero halla los puntos críticos (donde la derivada es cero o no existe), luego aplica la prueba de la primera o segunda derivada.',
        formulas: ['derivada = 0 en puntos críticos', 'segunda derivada positiva: mínimo', 'segunda derivada negativa: máximo'],
        analogies: [
          'Un máximo local es como la cima de una colina; un mínimo local es como el fondo de un valle.'
        ]
      },
      {
        number: '30.3',
        title: 'Teorema del Valor Medio',
        content: 'El Teorema del Valor Medio dice que si una función es continua en un intervalo cerrado y derivable en el intervalo abierto, entonces existe al menos un punto donde la derivada es igual a la tasa de cambio promedio en el intervalo. El Teorema de Rolle es el caso especial donde la función tiene el mismo valor en los extremos, por lo que la derivada es cero en algún punto.',
        formulas: ['derivada en c = (f(b) - f(a)) / (b - a)', 'si f(a) = f(b), la derivada es cero en algún punto'],
        analogies: [
          'Si conduces de A a B y tu velocidad promedio es 60 km/h, en algún momento tu velocímetro marcó exactamente 60 km/h.'
        ]
      },
      {
        number: '30.4',
        title: 'Regla de L Hospital',
        content: 'La regla de L Hospital permite calcular límites de la forma cero sobre cero o infinito sobre infinito derivando numerador y denominador por separado: el límite del cociente es igual al límite del cociente de las derivadas, siempre que el segundo límite exista. Se puede aplicar repetidamente si sigue siendo una indeterminación.',
        formulas: ['límite de f/g = límite de f prima sobre g prima (si es 0/0 o infinito/infinito)'],
        analogies: [
          'Es como simplificar una fracción compleja derivando numerador y denominador por separado.'
        ]
      },
      {
        number: '30.5',
        title: 'Concavidad y puntos de inflexión',
        content: 'Una función es cóncava hacia arriba en un intervalo si su segunda derivada es positiva (la gráfica está hacia arriba como una taza). Es cóncava hacia abajo si la segunda derivada es negativa (la gráfica está hacia abajo como una campana). Un punto de inflexión es donde la concavidad cambia.',
        formulas: ['segunda derivada positiva: cóncava hacia arriba', 'segunda derivada negativa: cóncava hacia abajo'],
        analogies: [
          'Una función cóncava hacia arriba es como una taza que puede contener agua; una cóncava hacia abajo es como una campana que no.'
        ]
      },
      {
        number: '30.6',
        title: 'Asíntotas y croquisizado',
        content: 'Una asíntota vertical ocurre en un valor de x si la función tiende a infinito. Una asíntota horizontal es una recta horizontal a la que se acerca la función cuando x tiende a infinito. Una asíntota oblicua es una recta inclinada a la que se acerca la función. Para hacer un croquis: dominio, intersecciones con ejes, asíntotas, intervalos de crecimiento y decrecimiento, puntos críticos, concavidad, puntos de inflexión.',
        formulas: ['Asíntota vertical: x = a', 'Asíntota horizontal: y = L', 'Asíntota oblicua: y = mx + b'],
        analogies: [
          'Las asíntotas son como muros invisibles que la gráfica se acerca pero nunca toca.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que todo punto crítico es un máximo o mínimo',
        description: 'Un punto crítico (donde la derivada es cero o no existe) no siempre es un máximo o mínimo local. Por ejemplo, la función x al cubo tiene derivada cero en x = 0 pero no tiene ni máximo ni mínimo allí (es un punto de inflexión).',
        remediation: 'Siempre verificar con la prueba de la primera o segunda derivada si un punto crítico es máximo, mínimo o ninguno.'
      },
      {
        name: 'Creer que segunda derivada cero siempre implica punto de inflexión',
        description: 'Segunda derivada cero es necesario pero no suficiente para tener un punto de inflexión. También debe cambiar el signo de la segunda derivada en ese punto. Por ejemplo, la función x a la cuarta tiene segunda derivada cero en x = 0 pero no hay punto de inflexión.',
        remediation: 'Verificar que el signo de la segunda derivada cambie en el punto candidato.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Calcular una derivada y su interpretación',
        type: 'Derivada',
        estimatedMinutes: 6,
        question: 'Si f(x) = x³ - 3x² + 2, encuentra f prima de x y f prima de 2.',
        steps: [
          'La derivada de x al cubo es 3x al cuadrado, la derivada de -3x al cuadrado es -6x, y la derivada de 2 es 0.',
          'Por lo tanto, f prima de x = 3x² - 6x.',
          'Sustituye x = 2: 3 por 4 menos 12 = 12 - 12 = 0.',
          'Resultado: f prima de 2 = 0.'
        ],
        hints: [
          'Deriva término por término usando la regla de la potencia.',
          'Luego sustituye x = 2.'
        ],
        solution: 'f prima de x = 3x² - 6x, f prima de 2 = 0.'
      },
      {
        title: 'Encontrar máximos y mínimos locales',
        type: 'Optimización',
        estimatedMinutes: 7,
        question: 'Encuentra los máximos y mínimos locales de f(x) = x³ - 3x² + 2.',
        steps: [
          'La derivada es 3x² - 6x = 3x(x - 2).',
          'Puntos críticos: x = 0 y x = 2.',
          'La segunda derivada es 6x - 6. En x = 0: negativa (máximo). En x = 2: positiva (mínimo).',
          'Máximo local: el valor en x = 0 es 2. Mínimo local: el valor en x = 2 es -2.'
        ],
        hints: [
          'Encuentra los puntos críticos (derivada = 0), luego aplica la prueba de la segunda derivada.'
        ],
        solution: 'Máximo en (0, 2), mínimo en (2, -2).'
      },
      {
        title: 'Aplicar la regla de L Hospital',
        type: 'Límite',
        estimatedMinutes: 6,
        question: 'Calcula el límite cuando x tiende a 0 de sen(x)/x.',
        steps: [
          'Sustituir directamente da 0/0, una indeterminación.',
          'Aplica la regla de L Hospital: deriva numerador y denominador por separado.',
          'La derivada de sen(x) es cos(x) y la derivada de x es 1.',
          'El límite de cos(x)/1 cuando x tiende a 0 es cos(0) = 1.',
          'Resultado: 1.'
        ],
        hints: [
          'Cuando tengas 0/0, deriva numerador y denominador por separado.'
        ],
        solution: '1.'
      },
      {
        title: 'Encontrar asíntotas',
        type: 'Asíntotas',
        estimatedMinutes: 7,
        question: 'Encuentra las asíntotas de f(x) = (x² - 1)/(x - 1).',
        steps: [
          'Factoriza y simplifica: (x-1)(x+1)/(x-1) = x + 1 (para x distinto de 1).',
          'Hay una discontinuidad removible en x = 1, no una asíntota vertical.',
          'No hay asíntota horizontal porque el grado del numerador es mayor que el del denominador.',
          'Resultado: no hay asíntota vertical, hay una discontinuidad removible en x = 1.'
        ],
        hints: [
          'Factoriza el numerador y simplifica antes de buscar asíntotas.'
        ],
        solution: 'No hay asíntota vertical (discontinuidad removible en x = 1).'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es la derivada de e elevado a x?',
        options: [
          'e elevado a x',
          'e elevado a x menos 1',
          'x por e elevado a x menos 1',
          '1'
        ],
        correct: 0,
        hints: [
          'La derivada de e elevado a x es ella misma.',
          'Es la única función que es igual a su propia derivada.'
        ],
        explanation: 'La derivada de e elevado a x es e elevado a x.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué indica que la segunda derivada sea positiva en un intervalo?',
        options: [
          'La función está creciendo',
          'La función está decreciendo',
          'La función es cóncava hacia arriba',
          'La función es cóncava hacia abajo'
        ],
        correct: 2,
        hints: [
          'La segunda derivada nos dice sobre la concavidad.',
          'Segunda derivada positiva significa cóncava hacia arriba.'
        ],
        explanation: 'Segunda derivada positiva indica que la función es cóncava hacia arriba en ese intervalo.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué nos dice el Teorema del Valor Medio?',
        options: [
          'Que siempre hay un punto donde la derivada instantánea es igual a la tasa de cambio promedio',
          'Que todas las funciones son continuas',
          'Que todas las funciones tienen máximos y mínimos',
          'Que todas las funciones tienen asíntotas'
        ],
        correct: 0,
        hints: [
          'El Teorema del Valor Medio relaciona la tasa de cambio promedio con la derivada instantánea.',
          'La derivada en algún punto es igual a la tasa de cambio promedio en el intervalo.'
        ],
        explanation: 'El Teorema del Valor Medio dice que existe al menos un punto donde la derivada instantánea es igual a la tasa de cambio promedio en el intervalo.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Función y su derivada',
        description: 'Observa cómo la derivada indica la pendiente de la tangente',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'a', min: -5, max: 5, step: 0.1, default: 1, label: 'Punto a' },
          { var: 'b', min: -3, max: 3, step: 0.1, default: 1, label: 'Coeficiente a' },
          { var: 'c', min: -3, max: 3, step: 1, default: 0, label: 'Coeficiente b' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Optimización: máximos y mínimos',
        description: 'Observa los máximos y mínimos locales de una función',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'a', min: -5, max: 5, step: 1, default: 1, label: 'Coeficiente a' },
          { var: 'b', min: -5, max: 5, step: 1, default: -3, label: 'Coeficiente b' },
          { var: 'c', min: -5, max: 5, step: 1, default: 2, label: 'Coeficiente c' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
