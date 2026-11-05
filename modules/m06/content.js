// modules/m06/content.js
// Contenido estructurado — Módulo 6: Números Naturales
// Propiedades, divisibilidad, mcd/mcm, factorización prima, teorema fundamental.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm06',
  title: 'Números Naturales',
  estimatedMinutes: 60,
  difficulty: 2,
  tags: ['números naturales', 'divisibilidad', 'mcd', 'mcm', 'factorización prima', 'teorema fundamental'],
  learningObjectives: [
    'Entender qué son los números naturales y para qué sirven',
    'Aplicar las leyes de los números naturales (conmutativa, asociativa, distributiva)',
    'Entender la divisibilidad y encontrar divisores y múltiplos',
    'Calcular MCM y MCD de dos o más números',
    'Realizar factorización prima y entender el Teorema Fundamental de la Aritmética'
  ],
  theory: {
    historicalContext: 'Los números naturales son los primeros números que la humanidad usó: 1, 2, 3... para contar objetos. Los antiguos babilonios y egipcios ya los usaban hace miles de años. El concepto de cero como número vino mucho más tarde (India, siglo VII). Euclides, en sus Elementos (siglo III a.C.), ya hablaba de números primos y del Teorema Fundamental de la Aritmética.',
    sections: [
      {
        number: '6.1',
        title: 'Qué son los números naturales',
        content: 'Los números naturales son los que usamos para contar: 1, 2, 3, 4, 5... Se denotan con la letra N. No incluyen cero (en algunas convenciones sí), ni negativos, ni fracciones. Son la base de toda la aritmética.',
        formulas: ['\\mathbb{N} = {1, 2, 3, ...}'],
        analogies: [
          'Son como los dedos de tus manos: cuentas uno, dos, tres... No puedes tener "medio dedo" ni "-3 dedos" cuando cuentas objetos reales.'
        ]
      },
      {
        number: '6.2',
        title: 'Leyes de los números naturales',
        content: 'Los números naturales siguen leyes que siempre se cumplen: conmutativa (a+b = b+a), asociativa ((a+b)+c = a+(b+c)), distributiva (a×(b+c) = a×b + a×c), y la existencia de elementos neutros (0 para suma, 1 para multiplicación).',
        formulas: ['a+b = b+a', 'a×(b+c) = a×b + a×c'],
        analogies: [
          'Es como las reglas de tránsito: siempre se cumplen, no importa quién las aplique. Sumar 2+3 es lo mismo que 3+2, igual que girar a la izquierda luego a la derecha es lo mismo que a la derecha luego a la izquierda (terminas en el mismo lugar).'
        ]
      },
      {
        number: '6.3',
        title: 'Divisibilidad',
        content: 'Un número a es divisible por b si al dividir a entre b el resto es cero. Se escribe a = b×k para algún número natural k. Los criterios de divisibilidad son atajos: un número es divisible por 2 si termina en par, por 5 si termina en 0 o 5, por 3 si la suma de sus dígitos es múltiplo de 3.',
        formulas: ['a = b×k', 'b | a'],
        analogies: [
          'Es como repartir galletas entre amigos: si sobran galletas, no es divisible. Si repartes 10 galletas entre 2 amigos, cada uno recibe 5 y no sobra nada: 10 es divisible por 2.'
        ]
      },
      {
        number: '6.4',
        title: 'MCD y MCM',
        content: 'El Máximo Común Divisor (MCD) es el mayor número que divide a dos o más números. El Mínimo Común Múltiplo (MCM) es el menor número que es múltiplo de dos o más números. Se relacionan por: MCD(a,b) × MCM(a,b) = a × b.',
        formulas: ['MCD(a,b) × MCM(a,b) = a × b'],
        analogies: [
          'MCD es como encontrar el tamaño de los grupos más grandes iguales en que puedes dividir dos cantidades. MCM es como encontrar cuándo dos eventos periódicos coinciden (dos campanas que suenan cada 4 y cada 6 minutos, suenan juntas cada 12 minutos).'
        ]
      },
      {
        number: '6.5',
        title: 'Factorización prima y teorema fundamental',
        content: 'Todo número natural mayor que 1 es primo o se puede escribir como producto de primos de forma única (salvo el orden). Ese es el Teorema Fundamental de la Aritmética. Los números primos son los "átomos" de los números: no se pueden dividir entre nada más que entre 1 y sí mismos.',
        formulas: ['n = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ'],
        analogies: [
          'Los números primos son como los átomos en química: no se pueden descomponer más. Todo número está hecho de primos, como toda molécula está hecha de átomos.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que el 1 es primo',
        description: 'Muchos estudiantes piensan que 1 es primo porque solo se divide entre 1 y sí mismo. Pero por definición, un primo debe tener exactamente dos divisores distintos: 1 y sí mismo. El 1 solo tiene un divisor.',
        remediation: 'Recordar que un número primo debe ser mayor que 1 y tener exactamente dos divisores.'
      },
      {
        name: 'Confundir MCD con MCM',
        description: 'Los estudiantes confunden cuál es el máximo común divisor y cuál el mínimo común múltiplo.',
        remediation: 'MCD divide a ambos números (es menor o igual que ambos). MCM es múltiplo de ambos (es mayor o igual que ambos). MCD × MCM = producto de los números.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar números naturales',
        type: 'Clasificación',
        estimatedMinutes: 5,
        question: '¿Cuáles de los siguientes son números naturales: 3, -2, 0, 5.5, 100?',
        steps: [
          'Los naturales son los que usamos para contar: 1, 2, 3...',
          '3 es natural (se puede contar).',
          '-2 no (es negativo).',
          '0 depende de la convención (en este curso no contamos con 0 como natural).',
          '5.5 no (es fracción/decimal).',
          '100 es natural.'
        ],
        hints: [
          'Pregúntate: ¿puedo contar objetos con este número?',
          'No se cuentan objetos negativos ni fracciones de objetos enteros.'
        ],
        solution: 'Los naturales son: 3 y 100.'
      },
      {
        title: 'Ley conmutativa',
        type: 'Propiedad',
        estimatedMinutes: 4,
        question: '¿Es cierto que 7 + 5 = 5 + 7? ¿Por qué?',
        steps: [
          'Calcula 7 + 5 = 12.',
          'Calcula 5 + 7 = 12.',
          'Ambos dan 12, así que sí es cierto.',
          'La ley conmutativa dice que el orden de la suma no cambia el resultado.'
        ],
        hints: [
          'Suma ambos lados y compara.',
          'Piensa en dinero: 7 pesos + 5 pesos es lo mismo que 5 pesos + 7 pesos.'
        ],
        solution: 'Sí, es cierto. 7 + 5 = 12 y 5 + 7 = 12. La suma es conmutativa.'
      },
      {
        title: 'MCD y MCM',
        type: 'Cálculo',
        estimatedMinutes: 7,
        question: 'Halla el MCD y el MCM de 12 y 18.',
        steps: [
          'Divisores de 12: 1, 2, 3, 4, 6, 12.',
          'Divisores de 18: 1, 2, 3, 6, 9, 18.',
          'Los comunes son: 1, 2, 3, 6. El máximo es 6. MCD = 6.',
          'Múltiplos de 12: 12, 24, 36, 48...',
          'Múltiplos de 18: 18, 36, 54...',
          'El mínimo común es 36. MCM = 36.',
          'Verifica: MCD × MCM = 6 × 36 = 216. Y 12 × 18 = 216. ✓'
        ],
        hints: [
          'Lista los divisores de cada número.',
          'Lista los múltiplos de cada número hasta encontrar el primer coincidente.'
        ],
        solution: 'MCD(12,18) = 6, MCM(12,18) = 36.'
      },
      {
        title: 'Factorización prima',
        type: 'Factorización',
        estimatedMinutes: 6,
        question: 'Factoriza el número 60 en primos.',
        steps: [
          '60 es par, divide entre 2: 60 = 2 × 30.',
          '30 es par, divide entre 2: 30 = 2 × 15.',
          '15 es divisible entre 3: 15 = 3 × 5.',
          '5 es primo.',
          'Junto: 60 = 2 × 2 × 3 × 5 = 2² × 3 × 5.'
        ],
        hints: [
          'Empieza dividiendo por el primo más pequeño (2) mientras sea posible.',
          'Luego prueba con 3, 5, 7... hasta que el cociente sea primo.'
        ],
        solution: '60 = 2² × 3 × 5.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál de los siguientes NO es un número natural?',
        options: [
          '1',
          '100',
          '-5',
          '1000'
        ],
        correct: 2,
        hints: [
          'Los naturales se usan para contar objetos.',
          'No se cuentan objetos negativos.'
        ],
        explanation: 'Los números naturales son los que usamos para contar: 1, 2, 3... El -5 es negativo, no natural.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el MCD de 8 y 12?',
        options: [
          '2',
          '4',
          '8',
          '24'
        ],
        correct: 1,
        hints: [
          'Lista los divisores de 8: 1, 2, 4, 8.',
          'Lista los divisores de 12: 1, 2, 3, 4, 6, 12.',
          'El máximo común es 4.'
        ],
        explanation: 'MCD(8,12) = 4 porque 4 es el número más grande que divide a ambos.'
      },
      {
        type: 'multiple-choice',
        question: '¿Es el 1 un número primo?',
        options: [
          'Sí',
          'No',
          'Depende',
          'Solo si es par'
        ],
        correct: 1,
        hints: [
          'Un primo debe tener exactamente dos divisores: 1 y sí mismo.',
          'El 1 solo tiene un divisor: el 1.'
        ],
        explanation: 'El 1 no es primo porque tiene un solo divisor (el 1), no dos. Un primo debe tener exactamente dos divisores distintos.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Recta numérica con números naturales',
        description: 'Ubica números naturales en la recta numérica',
        type: 'function',
        data: {
          functions: [],
          range: [0, 20]
        },
        sliders: [
          { var: 'n', min: 1, max: 20, step: 1, default: 7, label: 'Número natural n' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Criba de Eratóstenes (concepto)',
        description: 'Visualiza cómo se eliminan múltiplos para encontrar primos',
        type: 'function',
        data: {
          functions: [],
          range: [0, 30]
        },
        sliders: [
          { var: 'limite', min: 10, max: 30, step: 1, default: 20, label: 'Límite superior' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
