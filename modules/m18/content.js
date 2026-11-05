// modules/m18/content.js
// Contenido estructurado — Módulo 18: Trigonometría Avanzada
// Fórmulas de adición, doble/medio ángulo, suma-producto, ecuaciones trigonométricas, triángulos oblicuángulos (leyes de senos/cosenos).
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm18',
  title: 'Trigonometría Avanzada',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['identidades trigonométricas', 'fórmulas de adición', 'doble ángulo', 'medio ángulo', 'suma-producto', 'ley de senos', 'ley de cosenos', 'triángulos oblicuángulos'],
  learningObjectives: [
    'Aplicar fórmulas de adición y resta de ángulos',
    'Usar fórmulas de ángulo doble y medio ángulo',
    'Transformar sumas en productos y viceversa',
    'Resolver ecuaciones trigonométricas',
    'Aplicar leyes de senos y cosenos en triángulos oblicuángulos'
  ],
  theory: {
    historicalContext: 'Las identidades trigonométricas se desarrollaron con el álgebra y el análisis en los siglos XVII y XVIII. Euler (1748) estableció la conexión entre exponenciales y funciones trigonométricas con su fórmula e^(ix) = cos(x) + i·sen(x). Las leyes de senos y cosenos se usaron en navegación y topografía mucho antes, pero se formalizaron con el álgebra moderna.',
    sections: [
      {
        number: '18.1',
        title: 'Fórmulas de adición y resta',
        content: 'Las fórmulas de adición permiten calcular el seno y coseno de la suma de dos ángulos: sen(a + b) = sen(a)cos(b) + cos(a)sen(b), cos(a + b) = cos(a)cos(b) - sen(a)sen(b). Para la resta, cambian los signos: sen(a - b) = sen(a)cos(b) - cos(a)sen(b), cos(a - b) = cos(a)cos(b) + sen(a)sen(b). Para la tangente: tan(a + b) = (tan(a) + tan(b))/(1 - tan(a)tan(b)).',
        formulas: ['sen(a+b) = sen(a)cos(b) + cos(a)sen(b)', 'cos(a+b) = cos(a)cos(b) - sen(a)sen(b)', 'tan(a+b) = (tan(a) + tan(b))/(1 - tan(a)tan(b))'],
        analogies: [
          'Es como descomponer un ángulo grande en dos más pequeños para calcular su seno o coseno.'
        ]
      },
      {
        number: '18.2',
        title: 'Fórmulas de ángulo doble y medio ángulo',
        content: 'Las fórmulas de ángulo doble se derivan de las de adición poniendo a = b: sen(2θ) = 2·sen(θ)·cos(θ), cos(2θ) = cos²(θ) - sen²(θ) = 2cos²(θ) - 1 = 1 - 2sen²(θ), tan(2θ) = 2tan(θ)/(1 - tan²(θ)). Las de medio ángulo se derivan despejando: sen²(θ/2) = (1 - cos(θ))/2, cos²(θ/2) = (1 + cos(θ))/2.',
        formulas: ['sen(2θ) = 2·sen(θ)·cos(θ)', 'cos(2θ) = cos²(θ) - sen²(θ)', 'sen²(θ/2) = (1 - cos(θ))/2'],
        analogies: [
          'El ángulo doble es como girar dos veces el mismo ángulo. El medio ángulo es como partir un ángulo en dos partes iguales.'
        ]
      },
      {
        number: '18.3',
        title: 'Fórmulas de suma-producto y producto-suma',
        content: 'Permiten convertir sumas de senos o cosenos en productos y viceversa: sen(a) + sen(b) = 2·sen((a+b)/2)·cos((a-b)/2), sen(a) - sen(b) = 2·cos((a+b)/2)·sen((a-b)/2), cos(a) + cos(b) = 2·cos((a+b)/2)·cos((a-b)/2), cos(a) - cos(b) = -2·sen((a+b)/2)·sen((a-b)/2).',
        formulas: ['sen(a) + sen(b) = 2·sen((a+b)/2)·cos((a-b)/2)', 'cos(a) + cos(b) = 2·cos((a+b)/2)·cos((a-b)/2)'],
        analogies: [
          'Es como descomponer una onda compleja en ondas más simples, o viceversa.'
        ]
      },
      {
        number: '18.4',
        title: 'Ecuaciones trigonométricas',
        content: 'Una ecuación trigonométrica tiene la forma f(trig(θ)) = 0. Se resuelve despejando la función trigonométrica y luego buscando todos los ángulos en el intervalo dado que la satisfacen. Usar identidades para simplificar primero. Siempre verificar que las soluciones estén en el dominio de la función original.',
        formulas: ['sen(θ) = 1/2 → θ = π/6 + 2kπ o θ = 5π/6 + 2kπ'],
        analogies: [
          'Es como buscar todos los ángulos en el círculo unitario donde el punto tiene una coordenada dada.'
        ]
      },
      {
        number: '18.5',
        title: 'Ley de senos y ley de cosenos',
        content: 'En cualquier triángulo (no necesariamente rectángulo): Ley de senos: sen(A)/a = sen(B)/b = sen(C)/c = 2R (donde R es el radio circunscrito). Ley de cosenos: a² = b² + c² - 2·b·c·cos(A). Estas leyes permiten resolver triángulos oblicuángulos (sin ángulo recto) cuando se conocen tres elementos (al menos uno es un lado).',
        formulas: ['sen(A)/a = sen(B)/b = sen(C)/c', 'a² = b² + c² - 2bc·cos(A)'],
        analogies: [
          'La ley de cosenos es el teorema de Pitágoras generalizado para triángulos que no son rectángulos.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que sen(a + b) = sen(a) + sen(b)',
        description: 'Las funciones trigonométricas no son lineales. La identidad correcta es sen(a + b) = sen(a)cos(b) + cos(a)sen(b).',
        remediation: 'Siempre usar la identidad de suma de ángulos, no sumar senos directamente.'
      },
      {
        name: 'Olvidar que las ecuaciones trigonométricas tienen infinitas soluciones',
        description: 'Por la periodicidad, si θ es solución, entonces θ + 2kπ también lo es para cualquier entero k.',
        remediation: 'Siempre escribir la solución general con el parámetro k entero, y luego filtrar por el intervalo dado.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Aplicar fórmula de adición',
        type: 'Cálculo',
        estimatedMinutes: 6,
        question: 'Calcula sen(75°) usando sen(45° + 30°)',
        steps: [
          'Usa sen(a + b) = sen(a)cos(b) + cos(a)sen(b) con a = 45°, b = 30°. ',
          'sen(45°) = √2/2, cos(45°) = √2/2, sen(30°) = 1/2, cos(30°) = √3/2.',
          'sen(75°) = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4.',
          'Resultado: sen(75°) = (√6 + √2)/4.'
        ],
        hints: [
          'Descompone 75° en ángulos que conozcas: 45° + 30°.',
          'Aplica la fórmula de adición del seno.'
        ],
        solution: 'sen(75°) = (√6 + √2)/4.'
      },
      {
        title: 'Doblar un ángulo',
        type: 'Doble ángulo',
        estimatedMinutes: 5,
        question: 'Si sen(θ) = 3/5 y θ está en el primer cuadrante, calcula sen(2θ)',
        steps: [
          'Primero encuentra cos(θ): cos²(θ) = 1 - sen²(θ) = 1 - 9/25 = 16/25, así cos(θ) = 4/5.',
          'Usa sen(2θ) = 2·sen(θ)·cos(θ) = 2·(3/5)·(4/5) = 24/25.',
          'Resultado: sen(2θ) = 24/25.'
        ],
        hints: [
          'Primero encuentra cos(θ) usando sen² + cos² = 1.',
          'Luego aplica la fórmula del ángulo doble.'
        ],
        solution: 'sen(2θ) = 24/25.'
      },
      {
        title: 'Ley de cosenos',
        type: 'Ley de cosenos',
        estimatedMinutes: 7,
        question: 'En un triángulo con lados b = 5, c = 7 y ángulo A = 60° entre ellos, halla el lado a.',
        steps: [
          'Usa la ley de cosenos: a² = b² + c² - 2bc·cos(A).',
          'Sustituye: a² = 25 + 49 - 2·5·7·cos(60°) = 74 - 70·(1/2) = 74 - 35 = 39.',
          'a = √39 ≈ 6.24.',
          'Resultado: a = √39.'
        ],
        hints: [
          'La ley de cosenos generaliza el teorema de Pitágoras.',
          'cos(60°) = 1/2.'
        ],
        solution: 'a = √39 ≈ 6.24.'
      },
      {
        title: 'Resolver ecuación trigonométrica',
        type: 'Ecuación',
        estimatedMinutes: 6,
        question: 'Resuelve sen(x) = 1/2 para x en [0, 2π]',
        steps: [
          'En el círculo unitario, sen(x) = 1/2 en x = π/6 y x = 5π/6.',
          'Estos son los únicos dos ángulos en [0, 2π] con seno 1/2.',
          'Resultado: x = π/6, 5π/6.'
        ],
        hints: [
          'Recuerda los valores especiales del círculo unitario.',
          'El seno es positivo en el primer y segundo cuadrante.'
        ],
        solution: 'x = π/6, 5π/6.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es la fórmula correcta para sen(a + b)?',
        options: [
          'sen(a) + sen(b)',
          'sen(a)cos(b) + cos(a)sen(b)',
          'sen(a)cos(b) - cos(a)sen(b)',
          'sen(a)·sen(b)'
        ],
        correct: 1,
        hints: [
          'No es simplemente sumar los senos.',
          'La fórmula incluye productos de seno y coseno.'
        ],
        explanation: 'sen(a + b) = sen(a)cos(b) + cos(a)sen(b).'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es sen(2θ) en términos de sen(θ) y cos(θ)?',
        options: [
          '2·sen(θ)·cos(θ)',
          'sen²(θ) + cos²(θ)',
          '2·sen(θ)',
          'cos²(θ) - sen²(θ)'
        ],
        correct: 0,
        hints: [
          'Es la fórmula del ángulo doble del seno.',
          'Es 2 veces el producto de seno y coseno.'
        ],
        explanation: 'sen(2θ) = 2·sen(θ)·cos(θ).'
      },
      {
        type: 'multiple-choice',
        question: 'En un triángulo con lados a, b, c y ángulos A, B, C opuestos respectivamente, ¿cuál es la ley de cosenos para el lado a?',
        options: [
          'a² = b² + c² - 2bc·cos(A)',
          'a² = b² + c² + 2bc·cos(A)',
          'a² = b² - c²',
          'a = b + c'
        ],
        correct: 0,
        hints: [
          'Es el teorema de Pitágoras generalizado.',
          'Incluye el término -2bc·cos(A).'
        ],
        explanation: 'La ley de cosenos para el lado a es a² = b² + c² - 2bc·cos(A).'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Suma de ángulos en el círculo unitario',
        description: 'Visualiza sen(a + b) usando el círculo unitario',
        type: 'function',
        data: {
          functions: [],
          range: [0, 2*Math.PI]
        },
        sliders: [
          { var: 'a', min: 0, max: 2*Math.PI, step: 0.1, default: Math.PI/4, label: 'Ángulo a' },
          { var: 'b', min: 0, max: 2*Math.PI, step: 0.1, default: Math.PI/6, label: 'Ángulo b' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Ley de cosenos en triángulo',
        description: 'Observa cómo cambia el lado a al variar el ángulo A',
        type: 'function',
        data: {
          functions: [],
          range: [0, Math.PI]
        },
        sliders: [
          { var: 'b', min: 1, max: 10, step: 1, default: 5, label: 'Lado b' },
          { var: 'c', min: 1, max: 10, step: 1, default: 7, label: 'Lado c' },
          { var: 'A', min: 0, max: Math.PI, step: 0.1, default: Math.PI/3, label: 'Ángulo A' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
