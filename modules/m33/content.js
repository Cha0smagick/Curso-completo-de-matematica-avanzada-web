// modules/m33/content.js
// Contenido estructurado — Módulo 33: Aplicaciones de la Integral
// Área entre curvas, volúmenes (discos, washers, capas cilíndricas), longitud de arco, área de superficie de revolución, trabajo, centro de masa, teorema de Pappus.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm33',
  title: 'Aplicaciones de la Integral',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['área entre curvas', 'volúmenes de revolución', 'discos', 'washers', 'capas cilíndricas', 'longitud de arco', 'superficie de revolución', 'centro de masa'],
  learningObjectives: [
    'Calcular el área entre dos curvas usando integrales',
    'Calcular volúmenes de sólidos de revolución (discos y washers)',
    'Calcular volúmenes usando capas cilíndricas',
    'Calcular la longitud de arco de una curva',
    'Calcular el área de una superficie de revolución',
    'Calcular el centro de masa de una región'
  ],
  theory: {
    historicalContext: 'Las aplicaciones de la integral a la geometría (áreas, volúmenes, longitudes) se desarrollaron con el cálculo de Newton y Leibniz en el siglo XVII. Arquímedes ya había calculado volúmenes de esferas con su método. El teorema de Pappus (siglo IV d.C.) conecta volúmenes de revolución con centroides, mucho antes del cálculo formal. Estas técnicas son fundamentales en ingeniería (diseño de piezas, cálculo de centros de masa) y física.',
    sections: [
      {
        number: '33.1',
        title: 'Área entre dos curvas',
        content: 'El área entre dos curvas f(x) y g(x) donde f(x) ≥ g(x) en el intervalo [a, b] se calcula con la integral de la diferencia: integral desde a hasta b de (f(x) - g(x)) dx. Para encontrar los límites de integración, se hallan los puntos de intersección de las curvas.',
        formulas: ['Área = ∫[a,b] (f(x) - g(x))dx donde f(x) ≥ g(x)'],
        analogies: [
          'Es como calcular el área de una franja entre dos carreteras: restas el área de la carretera inferior del área de la superior.'
        ]
      },
      {
        number: '33.2',
        title: 'Volúmenes por discos',
        content: 'Cuando una región se rota alrededor de un eje, se genera un sólido de revolución. El método de discos calcula el volumen como la suma de discos finos: el volumen es la integral de π por (radio)² dx, donde el radio es la distancia del eje de rotación a la curva.',
        formulas: ['V = ∫[a,b] π·[R(x)]² dx (método de discos)'],
        analogies: [
          'Es como apilar monedas (discos) de radio variable: cada moneda es un disco fino del sólido.'
        ]
      },
      {
        number: '33.3',
        title: 'Volúmenes por washers y capas cilíndricas',
        content: 'El método de washers se usa cuando hay un hueco en el sólido: el volumen es la integral de π por (radio exterior)² menos π por (radio interior)². El método de capas cilíndricas usa cilindros delgados en lugar de discos: el volumen es la integral de 2π por (radio) por (altura) dx. La elección del método depende de cómo se rota la región.',
        formulas: ['V = ∫[a,b] π([R(x)]² - [r(x)]²) dx (washers)', 'V = ∫[a,b] 2π·x·f(x) dx (capas cilíndricas)'],
        analogies: [
          'Un washer es como un donut: un disco con un agujero. Una capa cilíndrica es como la etiqueta de una lata de conserva.'
        ]
      },
      {
        number: '33.4',
        title: 'Longitud de arco',
        content: 'La longitud de arco de una curva y = f(x) desde x = a hasta x = b se calcula con la integral de la raíz cuadrada de (1 + (derivada)²) dx. Esta fórmula se deriva aplicando el teorema de Pitágoras a pequeños segmentos de la curva.',
        formulas: ['L = ∫[a,b] √(1 + [f prima(x)]²) dx'],
        analogies: [
          'Es como medir la longitud de un camino sinuoso sumando las longitudes de pequeños segmentos rectos.'
        ]
      },
      {
        number: '33.5',
        title: 'Área de superficie de revolución',
        content: 'El área de la superficie generada al rotar una curva alrededor de un eje se calcula con la integral de 2π por (radio) por (longitud de arco) dx, donde la longitud de arco es la raíz cuadrada de (1 + (derivada)²).',
        formulas: ['S = ∫[a,b] 2π·f(x)·√(1 + [f prima(x)]²) dx'],
        analogies: [
          'Es como calcular el área de la etiqueta de una lata de conserva que tiene forma curva.'
        ]
      },
      {
        number: '33.6',
        title: 'Centro de masa',
        content: 'El centro de masa (o centroide) de una región plana es el punto donde se puede considerar concentrada toda la masa. Sus coordenadas se calculan con integrales: la coordenada x del centroide es la integral de x por f(x) dividida por el área, y análogamente para la coordenada y. El teorema de Pappus relaciona el volumen de revolución con el centroide: el volumen es 2π por la distancia del centroide al eje por el área.',
        formulas: ['x centroide = (1/Área)·∫[a,b] x·f(x)dx', 'V = 2π·d·A (teorema de Pappus)'],
        analogies: [
          'El centro de masa es el punto de equilibrio: si apoyas la figura en ese punto, se mantiene balanceada.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Olvidar elevar al cuadrado el radio en el método de discos',
        description: 'El volumen de un disco es π por radio al cuadrado por espesor, no π por radio por espesor. Olvidar elevar al cuadrado es un error común.',
        remediation: 'Recordar que el área de un círculo es π por radio al cuadrado, así que el volumen del disco es πR² por espesor.'
      },
      {
        name: 'Usar la función incorrecta para el radio en washers',
        description: 'En el método de washers, el radio exterior es la curva más alejada del eje de rotación y el radio interior es la más cercana. Confundirlos da volúmenes negativos o incorrectos.',
        remediation: 'Siempre identificar cuál curva está más lejos del eje de rotación (radio exterior) y cuál está más cerca (radio interior).'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Área entre dos curvas',
        type: 'Área',
        estimatedMinutes: 7,
        question: 'Calcula el área entre y = x² e y = x desde x = 0 hasta x = 1.',
        steps: [
          'En [0, 1], la recta y = x está por encima de la parábola y = x².',
          'El área es la integral de (x - x²) desde 0 hasta 1.',
          'Integra: x²/2 - x³/3 evaluado de 0 a 1 = 1/2 - 1/3 = 1/6.',
          'Resultado: el área es 1/6 unidades cuadradas.'
        ],
        hints: [
          'Identifica cuál curva está arriba y cuál abajo.',
          'Integra la diferencia (arriba menos abajo).'
        ],
        solution: '1/6 unidades cuadradas.'
      },
      {
        title: 'Volumen por discos',
        type: 'Volumen',
        estimatedMinutes: 8,
        question: 'Calcula el volumen del sólido de revolución generado al rotar y = √x desde x = 0 hasta x = 4 alrededor del eje x.',
        steps: [
          'El radio del disco en x es R(x) = √x.',
          'El volumen es la integral de π·R² dx = π·x desde 0 hasta 4.',
          'Integra: π·x²/2 evaluado de 0 a 4 = π·16/2 = 8π.',
          'Resultado: el volumen es 8π unidades cúbicas.'
        ],
        hints: [
          'El radio del disco es la distancia del eje de rotación a la curva.',
          'El volumen es la integral de π por radio al cuadrado.'
        ],
        solution: '8π unidades cúbicas.'
      },
      {
        title: 'Longitud de arco',
        type: 'Longitud',
        estimatedMinutes: 7,
        question: 'Calcula la longitud de arco de y = (2/3)x^(3/2) desde x = 0 hasta x = 3.',
        steps: [
          'La derivada es f prima de x = x^(1/2) = √x.',
          'La longitud es la integral de √(1 + x) dx desde 0 hasta 3.',
          'Integra: (2/3)(1+x)^(3/2) evaluado de 0 a 3 = (2/3)(4^(3/2) - 1) = (2/3)(8 - 1) = 14/3.',
          'Resultado: la longitud es 14/3 unidades.'
        ],
        hints: [
          'Calcula la derivada de la función.',
          'Usa la fórmula de longitud de arco.'
        ],
        solution: '14/3 unidades.'
      },
      {
        title: 'Centro de masa',
        type: 'Centro de masa',
        estimatedMinutes: 8,
        question: 'Halla la coordenada x del centroide de la región bajo y = x² desde x = 0 hasta x = 2.',
        steps: [
          'El área es la integral de x² desde 0 hasta 2 = 8/3.',
          'El momento respecto al eje y es la integral de x·x² desde 0 hasta 2 = x⁴/4 de 0 a 2 = 4.',
          'La coordenada x del centroide es momento/área = 4/(8/3) = 3/2.',
          'Resultado: el centroide está en x = 3/2.'
        ],
        hints: [
          'Calcula el área de la región.',
          'Calcula el momento y divide entre el área.'
        ],
        solution: 'x centroide = 3/2.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cómo se calcula el área entre dos curvas f(x) y g(x) donde f está arriba de g?',
        options: [
          'La integral de f(x) + g(x)',
          'La integral de (f(x) - g(x))',
          'La integral de (g(x) - f(x))',
          'La integral de f(x) por g(x)'
        ],
        correct: 1,
        hints: [
          'Restas la curva inferior de la curva superior.',
          'Es la integral de (arriba menos abajo).'
        ],
        explanation: 'El área entre dos curvas es la integral de la diferencia: f(x) - g(x) donde f está arriba.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es la fórmula del volumen por el método de discos?',
        options: [
          'V = π·R dx',
          'V = ∫π·R² dx',
          'V = ∫2π·R dx',
          'V = ∫π·R dx'
        ],
        correct: 1,
        hints: [
          'El área de un disco es π por radio al cuadrado.',
          'El volumen es la integral del área del disco por el espesor.'
        ],
        explanation: 'El volumen por discos es la integral de πR² dx.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es la fórmula de la longitud de arco de y = f(x) desde a hasta b?',
        options: [
          'L = ∫√(1 + f(x))dx',
          'L = ∫√(1 + (f prima)²)dx',
          'L = ∫(1 + f prima)dx',
          'L = ∫f(x)dx'
        ],
        correct: 1,
        hints: [
          'Se deriva del teorema de Pitágoras aplicado a pequeños segmentos.',
          'Incluye la derivada de la función elevada al cuadrado.'
        ],
        explanation: 'La longitud de arco es la integral de la raíz cuadrada de (1 más la derivada al cuadrado).'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Área entre dos curvas',
        description: 'Visualiza el área entre dos curvas',
        type: 'function',
        data: {
          functions: [],
          range: [0, 2]
        },
        sliders: [
          { var: 'a', min: 0, max: 1, step: 0.1, default: 0, label: 'Límite inferior' },
          { var: 'b', min: 1, max: 2, step: 0.1, default: 1, label: 'Límite superior' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Sólido de revolución',
        description: 'Visualiza el radio del disco al rotar una curva',
        type: 'function',
        data: {
          functions: [],
          range: [0, 4]
        },
        sliders: [
          { var: 'x', min: 0, max: 4, step: 0.5, default: 2, label: 'Posición x' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
