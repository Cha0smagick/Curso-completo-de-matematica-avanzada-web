// modules/m24/content.js
// Contenido estructurado — Módulo 24: Geometría Analítica
// Coordenadas cartesianas, distancia, punto medio, pendiente, ecuaciones de la recta, posición relativa, haz de rectas.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm24',
  title: 'Geometría Analítica',
  estimatedMinutes: 90,
  difficulty: 3,
  tags: ['geometría analítica', 'coordenadas cartesianas', 'distancia', 'punto medio', 'pendiente', 'ecuación de la recta', 'posición relativa'],
  learningObjectives: [
    'Entender el plano cartesiano y cómo ubicar puntos en él',
    'Calcular la distancia entre dos puntos y el punto medio de un segmento',
    'Calcular la pendiente de una recta y entender su significado geométrico',
    'Escribir la ecuación de una recta en sus diferentes formas',
    'Analizar la posición relativa de dos rectas (paralelas, perpendiculares, secantes)',
    'Resolver sistemas de ecuaciones lineales gráficamente'
  ],
  theory: {
    historicalContext: 'La geometría analítica fue desarrollada por René Descartes y Pierre de Fermat en el siglo XVII. Fue el primer paso importante hacia el cálculo y permitió unir el álgebra y la geometría. La idea fundamental es representar puntos geométricos como pares de números (coordenadas) y representar ecuaciones algebraicas como curvas en el plano.',
    sections: [
      {
        number: '24.1',
        title: 'Coordenadas cartesianas',
        content: 'El plano cartesiano se forma por dos rectas numéricas perpendiculares que se cruzan en el origen (0,0): el eje x (horizontal) y el eje y (vertical). Cada punto del plano se representa por un par ordenado (x, y), donde x es la coordenada horizontal (abscisa) y y es la coordenada vertical (ordenada). El plano se divide en cuatro cuadrantes.',
        formulas: ['P(x, y)', 'origen: (0, 0)'],
        analogies: [
          'Es como un mapa con coordenadas: el eje x es este-oeste y el eje y es norte-sur.'
        ]
      },
      {
        number: '24.2',
        title: 'Distancia entre dos puntos',
        content: 'La distancia entre dos puntos A(x₁, y₁) y B(x₂, y₂) se calcula con la fórmula de la distancia, que se deriva del teorema de Pitágoras: d = √((x₂ - x₁)² + (y₂ - y₁)²).',
        formulas: ['d = √((x₂ - x₁)² + (y₂ - y₁)²)'],
        analogies: [
          'Es como medir la distancia en línea recta entre dos puntos en un mapa.'
        ]
      },
      {
        number: '24.3',
        title: 'Punto medio de un segmento',
        content: 'El punto medio de un segmento que une dos puntos A(x₁, y₁) y B(x₂, y₂) es el punto que divide el segmento en dos partes iguales. Sus coordenadas son el promedio de las coordenadas de los extremos: M((x₁ + x₂)/2, (y₁ + y₂)/2).',
        formulas: ['M = ((x₁ + x₂)/2, (y₁ + y₂)/2)'],
        analogies: [
          'El punto medio está exactamente a la mitad del camino entre dos puntos.'
        ]
      },
      {
        number: '24.4',
        title: 'Pendiente de una recta',
        content: 'La pendiente de una recta mide su inclinación respecto al eje x. Se calcula como el cambio en y dividido por el cambio en x: m = (y₂ - y₁)/(x₂ - x₁). Una pendiente positiva significa que la recta sube de izquierda a derecha; una pendiente negativa significa que baja; una pendiente cero es una recta horizontal; una pendiente indefinida es una recta vertical.',
        formulas: ['m = (y₂ - y₁)/(x₂ - x₁)'],
        analogies: [
          'La pendiente es como la inclinación de una carretera: cuánto subes verticalmente por cada metro que avanzas horizontalmente.'
        ]
      },
      {
        number: '24.5',
        title: 'Ecuación de la recta',
        content: 'Una recta se puede escribir en varias formas: forma pendiente-sección (y = mx + b), forma punto-pendiente (y - y₁ = m(x - x₁)) y forma general (Ax + By + C = 0). La forma pendiente-sección es la más útil porque da directamente la pendiente m y el intercepto con el eje y b.',
        formulas: ['y = mx + b', 'y - y₁ = m(x - x₁)', 'Ax + By + C = 0'],
        'analogies': [
          'La ecuación de la recta es como una receta: dado un valor de x, te dice cuál es el valor de y.'
        ]
      },
      {
        number: '24.6',
        title: 'Posición relativa de dos rectas',
        content: 'Dos rectas pueden ser paralelas (misma pendiente, nunca se cruzan), perpendiculares (producto de pendientes = -1, se cruzan en ángulo recto) o secantes (diferentes pendientes, se cruzan en un punto). Para hallar el punto de intersección de dos rectas, se resuelve el sistema de sus dos ecuaciones.',
        formulas: ['Paralelas: m₁ = m₂', 'Perpendiculares: m₁·m₂ = -1'],
        'analogies': [
          'Dos rectas paralelas son como dos vías de tren que nunca se encuentran. Dos rectas perpendiculares son como una esquina de pared.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que una línea vertical tiene pendiente 0',
        description: 'Una línea vertical tiene pendiente indefinida porque el cambio en x es 0 y dividir por cero no está definido. Una línea horizontal tiene pendiente 0.',
        remediation: 'Recordar que pendiente = cambio en y / cambio en x. Si el cambio en x es 0, la pendiente es indefinida (recta vertical).'
      },
      {
        name: 'Confundir pendiente positiva con negativa',
        description: 'Los estudiantes confunden cuándo una recta sube o baja. Una pendiente positiva significa que la recta sube de izquierda a derecha; una pendiente negativa significa que baja.',
        remediation: 'Recordar: pendiente positiva = sube de izquierda a derecha; pendiente negativa = baja de izquierda a derecha.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Calcular distancia entre dos puntos',
        type: 'Distancia',
        estimatedMinutes: 5,
        question: 'Halla la distancia entre A(1, 2) y B(4, 6).',
        steps: [
          'Usa la fórmula: d = √((x₂ - x₁)² + (y₂ - y₁)²).',
          'Sustituye: d = √((4 - 1)² + (6 - 2)²) = √(3² + 4²) = √(9 + 16) = √25 = 5.',
          'Resultado: d = 5.'
        ],
        hints: [
          'Identifica las coordenadas de ambos puntos.',
          'Aplica la fórmula de la distancia.'
        ],
        solution: 'd = 5.'
      },
      {
        title: 'Encontrar punto medio',
        type: 'Punto medio',
        estimatedMinutes: 4,
        question: 'Halla el punto medio del segmento que une A(2, 3) y B(8, 7).',
        steps: [
          'Usa la fórmula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2).',
          'Sustituye: M = ((2 + 8)/2, (3 + 7)/2) = (10/2, 10/2) = (5, 5).',
          'Resultado: M(5, 5).'
        ],
        hints: [
          'Promedia las coordenadas x y las coordenadas y por separado.'
        ],
        solution: 'M(5, 5).'
      },
      {
        title: 'Calcular pendiente',
        type: 'Pendiente',
        estimatedMinutes: 5,
        question: 'Halla la pendiente de la recta que pasa por A(1, 2) y B(4, 8).',
        steps: [
          'Usa la fórmula: m = (y₂ - y₁)/(x₂ - x₁).',
          'Sustituye: m = (8 - 2)/(4 - 1) = 6/3 = 2.',
          'Resultado: m = 2.'
        ],
        hints: [
          'Resta las ordenadas y divide entre la resta de las abscisas.'
        ],
        solution: 'm = 2.'
      },
      {
        title: 'Escribir ecuación de una recta',
        'type': 'Ecuación de la recta',
        estimatedMinutes: 6,
        question: 'Halla la ecuación de la recta que pasa por (2, 3) con pendiente 4.',
        steps: [
          'Usa la forma punto-pendiente: y - y₁ = m(x - x₁).',
          'Sustituye: y - 3 = 4(x - 2).',
          'Despeja y: y = 4x - 8 + 3 = 4x - 5.',
          'Resultado: y = 4x - 5.'
        ],
        hints: [
          'Usa la forma punto-pendiente y luego despeja y.'
        ],
        solution: 'y = 4x - 5.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es la fórmula de la distancia entre dos puntos?',
        options: [
          'd = √((x₂ - x₁)² + (y₂ - y₁)²)',
          'd = (x₂ - x₁) + (y₂ - y₁)',
          'd = √((x₁ + x₂)² + (y₁ + y₂)²)',
          'd = (x₂ - x₁)·(y₂ - y₁)'
        ],
        correct: 0,
        'hints': [
          'La fórmula de la distancia viene del teorema de Pitágoras.',
          'Es la raíz cuadrada de la suma de los cuadrados de las diferencias.'
        ],
        explanation: 'd = √((x₂ - x₁)² + (y₂ - y₁)²) es la fórmula de la distancia entre dos puntos.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es la pendiente de una recta horizontal?',
        options: [
          '0',
          '1',
          'Indefinida',
          '-1'
        ],
        correct: 0,
        'hints': [
          'Una recta horizontal no sube ni baja, por lo que su cambio en y es 0.',
          'm = 0/(cualquier cosa) = 0.'
        ],
        explanation: 'Una recta horizontal tiene pendiente 0 porque no hay cambio en y.'
      },
      {
        type: 'multiple-choice',
        question: 'Si dos rectas son paralelas, ¿cuál es la relación entre sus pendientes?',
        options: [
          'Son iguales',
          'Son recíprocas',
          'Son opuestas',
          'Su producto es -1'
        ],
        correct: 0,
        'hints': [
          'Dos rectas paralelas tienen la misma inclinación.',
          'Por lo tanto, tienen la misma pendiente.'
        ],
        explanation: 'Dos rectas paralelas tienen la misma pendiente: m₁ = m₂.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Recta con pendiente variable',
        description: 'Observa cómo cambia la recta al modificar la pendiente y la ordenada al origen',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'm', min: -5, max: 5, step: 0.5, default: 1, label: 'Pendiente m' },
          { var: 'b', min: -10, max: 10, step: 1, default: 0, label: 'Ordenada b' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Distancia entre dos puntos',
        description: 'Arrastra dos puntos para ver cómo cambia la distancia entre ellos',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'x₁', min: -5, max: 5, step: 1, default: 0, label: 'x₁' },
          { var: 'y₁', min: -5, max: 5, step: 1, default: 0, label: 'y₁' },
          { var: 'x₂', min: -5, max: 5, step: 1, default: 4, label: 'x₂' },
          { var: 'y₂', min: -5, max: 5, step: 1, default: 3, label: 'y₂' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
