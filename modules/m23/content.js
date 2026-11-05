// modules/m23/content.js
// Contenido estructurado — Módulo 23: Geometría Euclidiana Plana
// Puntos, rectas, ángulos, triángulos (congruencia, semejanza, centros notables), cuadriláteros, circunferencia, teoremas clásicos.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm23',
  title: 'Geometría Euclidiana Plana',
  estimatedMinutes: 90,
  difficulty: 3,
  tags: ['geometría euclidiana', 'puntos', 'rectas', 'ángulos', 'triángulos', 'cuadriláteros', 'circunferencia', 'congruencia', 'semejanza'],
  learningObjectives: [
    'Entender los elementos básicos de la geometría euclidiana: punto, recta, plano',
    'Comprender ángulos y sus relaciones',
    'Dominar la congruencia y semejanza de triángulos',
    'Conocer los centros notables de un triángulo',
    'Entender las propiedades de cuadriláteros y circunferencias',
    'Aplicar teoremas clásicos de geometría euclidiana'
  ],
  theory: {
    historicalContext: 'La geometría euclidiana debe su nombre a Euclides de Alejandría, quien en su obra "Los Elementos" (siglo III a.C.) sistematizó la geometría conocida hasta entonces a partir de axiomas y postulados. Durante más de 2000 años, la geometría euclidiana fue considerada la única geometría posible. Fue hasta el siglo XIX que se desarrollaron geometrías no euclidianas.',
    sections: [
      {
        number: '23.1',
        title: 'Elementos básicos: punto, recta, plano',
        content: 'En geometría euclidiana, los elementos fundamentales son: el punto (no tiene dimensión), la recta (conjunto infinito de puntos alineados) y el plano (superficie infinita en dos dimensiones). A partir de estos elementos indefinibles se construyen todos los demás conceptos.',
        formulas: [],
        analogies: [
          'Un punto es como una marca diminuta en el papel, una recta es como un hilo estirado, y un plano es como una hoja de papel extendida.'
        ]
      },
      {
        number: '23.2',
        title: 'Ángulos y sus relaciones',
        content: 'Un ángulo se forma por dos semirrectas con un origen común (vértice). Se miden en grados o radianes. Los ángulos pueden ser agudos (<90°), rectos (90°), obtusos (>90°), llanos (180°) y cóncavos (>180°). Dos ángulos son suplementarios si suman 180° y complementarios si suman 90°.',
        formulas: ['ángulos suplementarios: α + β = 180°', 'ángulos complementarios: α + β = 90°'],
        analogies: [
          'El ángulo recto es como la esquina de una hoja de papel o de una pared.'
        ]
      },
      {
        number: '23.3',
        title: 'Triángulos: congruencia y semejanza',
        content: 'Dos triángulos son congruentes si tienen la misma forma y tamaño (los lados correspondientes son iguales y los ángulos correspondientes son iguales). Los criterios de congruencia son: LAL, ALA, AAA (no es criterio de congruencia, solo de semejanza), LLL. Dos triángulos son semejantes si tienen la misma forma pero no necesariamente el mismo tamaño; sus ángulos correspondientes son iguales y sus lados correspondientes son proporcionales.',
        formulas: ['LAL: dos lados y el ángulo incluido', 'ALA: dos ángulos y el lado incluido', 'LLL: los tres lados'],
        analogies: [
          'Dos triángulos congruentes son como dos copias idénticas de una misma figura. Dos triángulos semejantes son como una foto y su ampliación.'
        ]
      },
      {
        number: '23.4',
        title: 'Centros notables de un triángulo',
        content: 'Un triángulo tiene varios centros notables: el baricentro (intersección de las medianas), el circuncentro (intersección de las mediatrices), el incentro (intersección de las bisectrices de los ángulos internos) y el ortocentro (intersección de las alturas). En un triángulo equilátero, todos los centros notables coinciden.',
        formulas: ['Baricentro: intersección de medianas', 'Circuncentro: intersección de mediatrices', 'Incentro: intersección de bisectrices', 'Ortocentro: intersección de alturas'],
        'analogies': [
          'El baricentro es el punto de equilibrio del triángulo (como el centro de gravedad de una lámina triangular).'
        ]
      },
      {
        number: '23.5',
        title: 'Cuadriláteros',
        content: 'Un cuadrilátero es un polígono de cuatro lados. Los tipos principales son: trapecio (al menos un par de lados paralelos), paralelogramo (dos pares de lados paralelos), rectángulo (paralelogramo con ángulos rectos), rombo (paralelogramo con lados iguales), cuadrado (rectángulo con lados iguales) y trapecio isósceles (trapecio con lados no paralelos iguales).',
        formulas: ['Área de un rectángulo: base × altura', 'Área de un paralelogramo: base × altura'],
        'analogies': [
          'Un cuadrado es un rectángulo con lados iguales; un rombo es un paralelogramo con lados iguales.'
        ]
      },
      {
        number: '23.6',
        title: 'Circunferencia y círculo',
        content: 'Una circunferencia es el lugar geométrico de los puntos del plano que están a una distancia dada (radio) de un punto fijo (centro). Un círculo es la región del plano limitada por una circunferencia. Elementos de una circunferencia: radio, diámetro, cuerda, arco, sector, segmento. La longitud de una circunferencia es L = 2πr y el área de un círculo es A = πr².',
        formulas: ['L = 2πr', 'A = πr²', 'Ecuación de la circunferencia: (x-a)² + (y-b)² = r²'],
        'analogies': [
          'El radio es como el radio de una rueda; el diámetro es el doble del radio.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que todo triángulo isósceles es equilátero',
        description: 'Un triángulo isósceles tiene al menos dos lados iguales, pero un triángulo equilátero tiene los tres lados iguales. Todo triángulo equilátero es isósceles, pero no todo triángulo isósceles es equilátero.',
        remediation: 'Recordar que isósceles significa "al menos dos lados iguales", mientras que equilátero significa "los tres lados iguales".'
      },
      {
        name: 'Confundir circunferencia con círculo',
        description: 'La circunferencia es la línea (el borde), mientras que el círculo es la región del plano limitada por esa línea.',
        remediation: 'Recordar que la circunferencia es un conjunto de puntos (línea) y el círculo es el área que encierra.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar tipo de triángulo',
        type: 'Identificación',
        estimatedMinutes: 4,
        question: 'Un triángulo tiene lados de 3, 4 y 5 cm. ¿Qué tipo de triángulo es?',
        steps: [
          'Los tres lados tienen medidas diferentes: 3, 4 y 5.',
          'Por lo tanto, es un triángulo escaleno (todos los lados diferentes).',
          'Además, cumple 3² + 4² = 5² (9 + 16 = 25), por lo que es un triángulo rectángulo.'
        ],
        hints: [
          'Compara las longitudes de los tres lados.',
          'Verifica si cumple el teorema de Pitágoras.'
        ],
        solution: 'Es un triángulo escaleno y rectángulo.'
      },
      {
        title: 'Calcular ángulo faltante',
        type: 'Ángulos',
        estimatedMinutes: 4,
        question: 'En un triángulo, dos ángulos miden 50° y 70°. ¿Cuánto mide el tercer ángulo?',
        steps: [
          'La suma de los ángulos internos de un triángulo es 180°.',
          'Calcula: 180° - 50° - 70° = 60°.',
          'Resultado: el tercer ángulo mide 60°.'
        ],
        hints: [
          'La suma de los ángulos internos de cualquier triángulo es 180°.',
          'Resta los dos ángulos conocidos de 180°.'
        ],
        solution: 'El tercer ángulo mide 60°.'
      },
      {
        title: 'Aplicar teorema de Pitágoras',
        'type': 'Teorema de Pitágoras',
        estimatedMinutes: 6,
        question: 'En un triángulo rectángulo con catetos de 3 cm y 4 cm, ¿cuánto mide la hipotenusa?',
        steps: [
          'Aplica el teorema de Pitágoras: a² + b² = c².',
          'Sustituye: 3² + 4² = c² → 9 + 16 = c² → 25 = c².',
          'Calcula: c = √25 = 5.',
          'Resultado: la hipotenusa mide 5 cm.'
        ],
        hints: [
          'Usa el teorema de Pitágoras: la suma de los cuadrados de los catetos es igual al cuadrado de la hipotenusa.',
          '3-4-5 es una terna pitagórica clásica.'
        ],
        solution: 'La hipotenusa mide 5 cm.'
      },
      {
        title: 'Calcular área de un círculo',
        'type': 'Área',
        estimatedMinutes: 5,
        question: '¿Cuál es el área de un círculo de radio 7 cm?',
        steps: [
          'Usa la fórmula: A = πr².',
          'Sustituye: A = π · 7² = π · 49 ≈ 3.14159 · 49 ≈ 153.94.',
          'Resultado: A ≈ 153.94 cm².'
        ],
        hints: [
          'Eleva el radio al cuadrado y multiplica por π.',
          '7² = 49.'
        ],
        solution: 'A ≈ 153.94 cm².'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es la suma de los ángulos internos de un triángulo?',
        options: [
          '90°',
          '180°',
          '270°',
          '360°'
        ],
        correct: 1,
        'hints': [
          'La suma de los ángulos internos de cualquier triángulo es siempre 180°.',
          'Es una propiedad fundamental de la geometría euclidiana.'
        ],
        explanation: 'La suma de los ángulos internos de un triángulo es siempre 180°.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el criterio de congruencia que usa dos lados y el ángulo incluido?',
        options: [
          'LLL',
          'LAL',
          'ALA',
          'AAA'
        ],
        correct: 1,
        'hints': [
          'LAL significa Lado-Ángulo-Lado.',
          'Dos lados y el ángulo que los incluye.'
        ],
        explanation: 'El criterio LAL (Lado-Ángulo-Lado) establece que si dos lados y el ángulo incluido de un triángulo son respectivamente iguales a dos lados y el ángulo incluido de otro triángulo, entonces los triángulos son congruentes.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el área de un círculo de radio 3 cm?',
        options: [
          '3π cm²',
          '6π cm²',
          '9π cm²',
          '12π cm²'
        ],
        correct: 2,
        'hints': [
          'Usa la fórmula A = πr².',
          'Sustituye r = 3: A = π · 3² = 9π.'
        ],
        explanation: 'A = πr² = π · 3² = 9π cm².'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Triángulos y sus centros notables',
        description: 'Observa los centros notables de un triángulo',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'a', min: 1, max: 5, step: 1, default: 3, label: 'Vértice A (x)' },
          { var: 'b', min: -5, max: 5, step: 1, default: 4, label: 'Vértice B (x)' },
          { var: 'c', min: -5, max: 5, step: 1, default: 0, label: 'Vértice C (x)' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Circunferencia con radio variable',
        description: 'Observa cómo cambian el perímetro y el área al cambiar el radio',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'r', min: 1, max: 10, step: 1, default: 3, label: 'Radio r' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
