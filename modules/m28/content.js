// modules/m28/content.js
// Contenido estructurado — Módulo 28: Límites y Continuidad
// Definición ε-δ, límites laterales, infinitos, indeterminaciones, teoremas, continuidad, Teorema de Bolzano, Weierstrass, Darboux.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm28',
  title: 'Límites y Continuidad',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['límite', 'continuidad', 'epsilon-delta', 'límite lateral', 'indeterminaciones', 'teorema de bolzano', 'teorema de weierstrass'],
  learningObjectives: [
    'Entender el concepto de límite de una función',
    'Aplicar la definición formal ε-δ de límite',
    'Calcular límites laterales y en el infinito',
    'Resolver indeterminaciones (0/0, ∞/∞, 0·∞, ∞-∞)',
    'Entender la continuidad y sus propiedades',
    'Aplicar el Teorema del Valor Intermedio (Bolzano) y el Teorema del Valor Extremo (Weierstrass)'
  ],
  theory: {
    historicalContext: 'El concepto de límite se desarrolló lentamente desde la antigüedad ( Arquímedes y su método de agotamiento) hasta el siglo XIX, cuando Cauchy y Weierstrass lo formalizaron con la definición ε-δ. Esta definición dio fundamento riguroso al cálculo, que antes se basaba en intuición geométrica y cantidades "infinitesimales" no rigurosas.',
    sections: [
      {
        number: '28.1',
        title: 'Concepto intuitivo de límite',
        content: 'El límite de una función f(x) cuando x tiende a a es el valor al que se acerca f(x) cuando x se acerca a a, sin necesidad de que x sea igual a a. Notación: lim(x→a) f(x) = L. El límite existe si los límites laterales (por la izquierda y por la derecha) existen y son iguales.',
        formulas: ['lim(x→a) f(x) = L'],
        analogies: [
          'Es como acercarse a una puerta sin tocarla: te acercas más y más, y el límite es dónde estarías si llegaras.'
        ]
      },
      {
        number: '28.2',
        title: 'Definición formal ε-δ',
        content: 'Decimos que lim(x→a) f(x) = L si para todo ε > 0 existe un δ > 0 tal que si 0 < |x - a| < δ, entonces |f(x) - L| < ε. Esta definición hace rigurosa la noción intuitiva de "acercarse".',
        formulas: ['∀ε > 0, ∃δ > 0 : 0 < |x - a| < δ ⇒ |f(x) - L| < ε'],
        'analogies': [
          'ε es qué tan cerca quieres estar del valor L, y δ es qué tan cerca debes estar de a para lograrlo.'
        ]
      },
      {
        number: '28.3',
        title: 'Límites laterales',
        content: 'El límite por la derecha: lim(x→a+) f(x) = L si x se acerca a a por valores mayores que a. El límite por la izquierda: lim(x→a-) f(x) = L si x se acerca a a por valores menores que a. El límite existe si y solo si ambos límites laterales existen y son iguales.',
        formulas: ['lim(x→a+) f(x) = L', 'lim(x→a-) f(x) = L'],
        'analogies': [
          'Es como acercarse a un punto desde la derecha o desde la izquierda en la recta numérica.'
        ]
      },
      {
        number: '28.4',
        title: 'Límites en el infinito',
        content: 'lim(x→∞) f(x) = L significa que f(x) se acerca a L cuando x crece sin límite. De forma análoga para x → -∞. También podemos tener límites que tienden a infinito: lim(x→a) f(x) = ∞ significa que f(x) crece sin límite cuando x se acerca a a.',
        formulas: ['lim(x→∞) f(x) = L', 'lim(x→a) f(x) = ∞'],
        'analogies': [
          'Es como preguntar: ¿qué pasa con la función cuando x se hace muy grande o muy pequeño?'
        ]
      },
      {
        number: '28.5',
        title: 'Indeterminaciones',
        content: 'Algunas expresiones no tienen un valor determinado al sustituir directamente: 0/0, ∞/∞, 0·∞, ∞ - ∞, 0^0, ∞^0, 1^∞. Se resuelven mediante álgebra (factorización, racionalización), reglas de Líder Hospital, o manipulaciones algebraicas.',
        formulas: ['0/0, ∞/∞, 0·∞, ∞ - ∞'],
        'analogies': [
          'Es como intentar dividir cero entre cero: no hay una respuesta única, depende de cómo llegues a esos valores.'
        ]
      },
      {
        number: '28.6',
        title: 'Continuidad',
        content: 'Una función f es continua en un punto a si: 1) f(a) está definida, 2) lim(x→a) f(x) existe, 3) lim(x→a) f(x) = f(a). Una función es continua en un intervalo si es continua en cada punto de él. Las funciones polinómicas, racionales (donde el denominador no es cero), trigonométricas, exponenciales y logarítmicas son continuas en su dominio.',
        formulas: ['lim(x→a) f(x) = f(a)'],
        'analogies': [
          'Una función continua es como un trazo que puedes hacer sin levantar el lápiz del papel.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que lim(x→a) f(x) = f(a) siempre',
        description: 'No es cierto. Una función puede tener un límite en un punto sin estar definida allí, o puede tener un valor diferente al límite. Por ejemplo, f(x) = (x² - 1)/(x - 1) no está definida en x = 1, pero lim(x→1) f(x) = 2.',
        remediation: 'Recordar que el límite no depende del valor de la función en el punto, sino del comportamiento cerca del punto.'
      },
      {
        name: 'Creer que si existe el límite, la función es continua',
        description: 'No es cierto. Para que una función sea continua en un punto, se necesitan tres condiciones: la función debe estar definida, el límite debe existir, y deben ser iguales.',
        remediation: 'Recordar las tres condiciones de continuidad: f(a) definido, límite existe, y límite igual al valor de la función.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Evaluar un límite por sustitución directa',
        type: 'Evaluación',
        estimatedMinutes: 4,
        question: 'Calcula lim(x→2) (3x² - 5x + 2).',
        steps: [
          'Como es un polinomio, es continuo en todas partes, así que sustituimos directamente x = 2.',
          'Calcula: 3(2)² - 5(2) + 2 = 3·4 - 10 + 2 = 12 - 10 + 2 = 4.',
          'Resultado: 4.'
        ],
        hints: [
          'Para polinomios, simplemente sustituye el valor de x.'
        ],
        solution: '4.'
      },
      {
        title: 'Resolver una indeterminación 0/0',
        type: 'Cálculo',
        estimatedMinutes: 6,
        question: 'Calcula lim(x→2) (x² - 4)/(x - 2).',
        steps: [
          'Sustituir directamente da 0/0, una indeterminación.',
          'Factoriza el numerador: x² - 4 = (x - 2)(x + 2).',
          'Simplifica: (x - 2)(x + 2)/(x - 2) = x + 2 (para x ≠ 2).',
          'Calcula el límite: lim(x→2) (x + 2) = 4.',
          'Resultado: 4.'
        ],
        hints: [
          'Factoriza el numerador y cancela el factor común con el denominador.'
        ],
        solution: '4.'
      },
      {
        title: 'Límite en el infinito',
        type: 'Límite',
        estimatedMinutes: 6,
        question: 'Calcula lim(x→∞) (3x² + 2x)/(5x² - 7).',
        steps: [
          'Para razonamientos polinómicos, divide todo por la potencia más alta de x en el denominador (x²).',
          'lim(x→∞) (3 + 2/x)/(5 - 7/x²) = (3 + 0)/(5 - 0) = 3/5.',
          'Resultado: 3/5.'
        ],
        hints: [
          'Divide numerador y denominador por la potencia más alta de x.'
        ],
        solution: '3/5.'
      },
      {
        title: 'Verificar continuidad',
        type: 'Continuidad',
        estimatedMinutes: 6,
        question: '¿Es continua la función f(x) = (x² - 1)/(x - 1) en x = 1?',
        steps: [
          'f(1) no está definida (denominador cero).',
          'Por lo tanto, no es continua en x = 1, aunque el límite existe y vale 2.',
          'Resultado: no es continua.'
        ],
        hints: [
          'Verifica si la función está definida en el punto.'
        ],
        solution: 'No es continua en x = 1.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Qué significa lim(x→a) f(x) = L?',
        options: [
          'f(a) = L',
          'Cuando x se acerca a a, f(x) se acerca a L',
          'f(a) no está definida',
          'La función es continua en a'
        ],
        correct: 1,
        'hints': [
          'El límite describe el comportamiento de la función cerca de a, no necesariamente en a.',
          'Es el valor al que se acerca f(x) cuando x se acerca a a.'
        ],
        explanation: 'lim(x→a) f(x) = L significa que cuando x se acerca a a (sin necesidad de ser igual a a), f(x) se acerca a L.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el resultado de lim(x→∞) (2x² + 1)/(3x² - 5)?',
        options: [
          '2/3',
          '0',
          '∞',
          '1'
        ],
        correct: 0,
        'hints': [
          'Para razonamientos polinómicos del mismo grado, el límite es el cociente de los coeficientes líderes.',
          '2/3.'
        ],
        explanation: 'Divide numerador y denominador por x²: (2 + 1/x²)/(3 - 5/x²) → 2/3 cuando x → ∞.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál de las siguientes funciones NO es continua en x = 0?',
        options: [
          'f(x) = x²',
          'f(x) = sin(x)',
          'f(x) = 1/x',
          'f(x) = e^x'
        ],
        correct: 2,
        'hints': [
          'La función 1/x no está definida en x = 0.',
          'Por lo tanto, no es continua en x = 0.'
        ],
        explanation: 'f(x) = 1/x no está definida en x = 0, por lo que no es continua en ese punto.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Límite de una función',
        description: 'Observa cómo se acerca el valor de la función al límite',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'x', min: -5, max: 5, step: 0.1, default: 0, label: 'Valor de x' },
          { var: 'a', min: -5, max: 5, step: 0.1, default: 2, label: 'Punto a' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Límite en el infinito',
        description: 'Observa cómo se comporta una función racional cuando x → ∞',
        type: 'function',
        data: {
          functions: [],
          range: [-20, 20]
        },
        sliders: [
          { var: 'a', min: -10, max: 10, step: 1, default: 3, label: 'Coeficiente a' },
          { var: 'b', min: -10, max: 10, step: 1, default: 5, label: 'Coeficiente b' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
