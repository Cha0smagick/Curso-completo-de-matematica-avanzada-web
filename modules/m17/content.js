// modules/m17/content.js
// Contenido estructurado — Módulo 17: Funciones Trigonométricas
// Círculo unitario, sen, cos, tan, cot, sec, csc, identidades fundamentales, gráficas, período, amplitud, fase.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm17',
  title: 'Funciones Trigonométricas',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['trigonometría', 'seno', 'coseno', 'tangente', 'círculo unitario', 'identidades', 'gráficas', 'período', 'amplitud', 'fase'],
  learningObjectives: [
    'Entender las funciones trigonométricas desde el círculo unitario',
    'Definir seno, coseno, tangente y sus recíprocas',
    'Aplicar identidades trigonométricas fundamentales',
    'Graficar funciones seno y coseno con período, amplitud y fase',
    'Resolver ecuaciones trigonométricas básicas'
  ],
  theory: {
    historicalContext: 'La trigonometría nació en la astronomía y la navegación antigua. Los babilonios y griegos usaban cuerdas (antecesoras del seno) en círculos. La palabra "seno" viene de una mala traducción del árabe "jiba" al latín "sinus" (seno, curva). Hiparco (siglo II a.C.) se considera el padre de la trigonometría. Las funciones trigonométricas modernas se desarrollaron con el cálculo y el análisis.',
    sections: [
      {
        number: '17.1',
        title: 'Círculo unitario y definición de funciones',
        content: 'En el círculo unitario (radio 1, centro en el origen), para un ángulo θ medido desde el eje x positivo en sentido antihorario, el punto (x, y) en el círculo satisface: cos(θ) = x, sen(θ) = y. La tangente es tan(θ) = sen(θ)/cos(θ) = y/x. Las recíprocas son: sec(θ) = 1/cos(θ), csc(θ) = 1/sen(θ), cot(θ) = 1/tan(θ) = cos(θ)/sen(θ).',
        formulas: ['cos(θ) = x, sen(θ) = y, tan(θ) = y/x', 'sec(θ) = 1/cos(θ), csc(θ) = 1/sen(θ), cot(θ) = 1/tan(θ)'],
        analogies: [
          'Imagina un reloj de círculo unitario. El coseno es cuánto te desplazaste horizontalmente, el seno cuánto verticalmente.'
        ]
      },
      {
        number: '17.2',
        title: 'Identidades trigonométricas fundamentales',
        content: 'La identidad más importante es sen²(θ) + cos²(θ) = 1 (teorema de Pitágoras en el círculo unitario). Otras: 1 + tan²(θ) = sec²(θ), 1 + cot²(θ) = csc²(θ). Las relaciones de recíproco: tan(θ) = sen(θ)/cos(θ), cot(θ) = cos(θ)/sen(θ). Las funciones pares e impares: cos(-θ) = cos(θ) (par), sen(-θ) = -sen(θ) (impar), tan(-θ) = -tan(θ) (impar).',
        formulas: ['sen²(θ) + cos²(θ) = 1', '1 + tan²(θ) = sec²(θ)', 'sen(-θ) = -sen(θ), cos(-θ) = cos(θ)'],
        analogies: [
          'sen² + cos² = 1 es el teorema de Pitágoras en el círculo unitario: x² + y² = 1 donde x = cos(θ) e y = sen(θ).'
        ]
      },
      {
        number: '17.3',
        title: 'Gráficas de seno y coseno',
        content: 'La gráfica de sen(x) es una onda que oscila entre -1 y 1, con período 2π. Cruza el origen (0,0), sube a 1 en π/2, cruza en π, baja a -1 en 3π/2, y vuelve a cruzar en 2π. La gráfica de cos(x) es igual pero desplazada π/2 a la izquierda: empieza en 1, cruza en π/2, baja a -1 en π, etc.',
        formulas: ['período de sen y cos = 2π', 'amplitud = 1'],
        analogies: [
          'Es como el movimiento de un punto en una rueda giratoria: la altura del punto sobre el centro da el seno, la distancia horizontal da el coseno.'
        ]
      },
      {
        number: '17.4',
        title: 'Período, amplitud y fase',
        content: 'Para f(x) = a·sen(b(x-h)) + k: |a| es la amplitud (altura de la onda), 2π/|b| es el período (cuánto tarda en repetirse), h es la desfase fase (desplazamiento horizontal), k es el desplazamiento vertical (línea media).',
        formulas: ['amplitud = |a|', 'período = 2π/|b|', 'fase = h', 'línea media = k'],
        analogies: [
          'La amplitud es qué tan alto sube la ola, el período es cuánto tarda en repetirse, la fase es dónde empieza, la línea media es el nivel del agua.'
        ]
      },
      {
        number: '17.5',
        title: 'Otras funciones trigonométricas',
        content: 'tan(θ) = sen(θ)/cos(θ) tiene asíntotas verticales donde cos(θ) = 0 (θ = π/2 + kπ). sec(θ) = 1/cos(θ) tiene asíntotas donde cos(θ) = 0. csc(θ) = 1/sen(θ) tiene asíntotas donde sen(θ) = 0. cot(θ) = cos(θ)/sen(θ) tiene asíntotas donde sen(θ) = 0.',
        formulas: ['tan(θ) = sen(θ)/cos(θ)', 'sec(θ) = 1/cos(θ)', 'csc(θ) = 1/sen(θ)', 'cot(θ) = cos(θ)/sen(θ)'],
        analogies: [
          'La tangente es como la pendiente de una línea que forma el ángulo θ con el horizontal: se hace infinita cuando la línea es vertical.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que sen(a + b) = sen(a) + sen(b)',
        description: 'Las funciones trigonométricas no son lineales. sen(a + b) = sen(a)cos(b) + cos(a)sen(b), no sen(a) + sen(b).',
        remediation: 'Recordar la identidad de suma de ángulos: sen(a + b) = sen(a)cos(b) + cos(a)sen(b).'
      },
      {
        name: 'Olvidar que el seno y coseno están acotados entre -1 y 1',
        description: 'Algunos estudiantes creen que sen(x) puede ser mayor que 1. Pero en el círculo unitario, x e y están siempre entre -1 y 1.',
        remediation: 'Recordar que |sen(θ)| ≤ 1 y |cos(θ)| ≤ 1 para todo θ real.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Evaluar funciones trigonométricas',
        type: 'Evaluación',
        estimatedMinutes: 5,
        question: 'Calcula sen(π/6), cos(π/6), tan(π/6)',
        steps: [
          'En el círculo unitario, π/6 = 30°.',
          'sen(π/6) = 1/2, cos(π/6) = √3/2.',
          'tan(π/6) = sen/cos = (1/2)/(√3/2) = 1/√3 = √3/3.',
          'Resultado: sen = 1/2, cos = √3/2, tan = √3/3.'
        ],
        hints: [
          'Recuerda los valores especiales del círculo unitario.',
          'π/6 = 30° es un ángulo especial.'
        ],
        solution: 'sen(π/6) = 1/2, cos(π/6) = √3/2, tan(π/6) = √3/3.'
      },
      {
        title: 'Aplicar identidad fundamental',
        type: 'Identidad',
        estimatedMinutes: 5,
        question: 'Si sen(θ) = 3/5 y θ está en el primer cuadrante, ¿cuál es cos(θ)?',
        steps: [
          'Usa sen²(θ) + cos²(θ) = 1.',
          '(3/5)² + cos²(θ) = 1 → 9/25 + cos²(θ) = 1.',
          'cos²(θ) = 1 - 9/25 = 16/25.',
          'cos(θ) = √(16/25) = 4/5 (positivo en primer cuadrante).'
        ],
        hints: [
          'Usa sen² + cos² = 1.',
          'En el primer cuadrante, cos es positivo.'
        ],
        solution: 'cos(θ) = 4/5.'
      },
      {
        title: 'Graficar seno con amplitud y período',
        type: 'Gráfica',
        estimatedMinutes: 7,
        question: 'Para f(x) = 3·sen(2x), ¿cuál es la amplitud y el período?',
        steps: [
          'La amplitud es |a| = |3| = 3.',
          'El período es 2π/|b| = 2π/2 = π.',
          'Resultado: amplitud 3, período π.'
        ],
        hints: [
          'La amplitud es el valor absoluto del coeficiente adelante.',
          'El período es 2π dividido por el coeficiente de x dentro del seno.'
        ],
        solution: 'Amplitud = 3, Período = π.'
      },
      {
        title: 'Resolver ecuación trigonométrica simple',
        type: 'Ecuación',
        estimatedMinutes: 6,
        question: 'Resuelve sen(x) = 1/2 para x en [0, 2π]',
        steps: [
          'En el círculo unitario, sen(θ) = 1/2 en θ = π/6 y θ = 5π/6.',
          'Estos son los dos ángulos en [0, 2π] cuyo seno es 1/2.',
          'Solución: x = π/6, 5π/6.'
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
        question: '¿Cuál es el período de f(x) = sen(3x)?',
        options: [
          '2π',
          '2π/3',
          '3·2π',
          'π/3'
        ],
        correct: 1,
        hints: [
          'El período de sen(x) es 2π.',
          'El período de sen(bx) es 2π/|b|. Aquí b = 3.'
        ],
        explanation: 'El período de sen(bx) es 2π/|b|. Para b = 3, el período es 2π/3.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el valor de cos(0)?',
        options: [
          '0',
          '1',
          '-1',
          'No está definido'
        ],
        correct: 1,
        hints: [
          'En el círculo unitario, cos(0) es la coordenada x del punto (1, 0).',
          'Eso es 1.'
        ],
        explanation: 'cos(0) = 1 porque en el círculo unitario, el punto en el ángulo 0 es (1, 0).'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué identidad es sen²(θ) + cos²(θ) = 1?',
        options: [
          'Identidad pitagórica',
          'Identidad de ángulo doble',
          'Identidad de suma de ángulos',
          'Identidad recíproca'
        ],
        correct: 0,
        hints: [
          'Viene del teorema de Pitágoras aplicado al círculo unitario.',
          'x² + y² = 1 donde x = cos(θ), y = sen(θ).'
        ],
        explanation: 'Es la identidad pitagórica trigonométrica, que viene del teorema de Pitágoras en el círculo unitario.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Seno y coseno en el círculo unitario',
        description: 'Observa cómo sen y cos cambian con el ángulo en el círculo unitario',
        type: 'function',
        data: {
          functions: [],
          range: [0, 2*Math.PI]
        },
        sliders: [
          { var: 'θ', min: 0, max: 2*Math.PI, step: 0.1, default: 0, label: 'Ángulo θ (radianes)' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Gráfica de seno con amplitud y período',
        description: 'Observa cómo cambian la gráfica al modificar amplitud y período',
        type: 'function',
        data: {
          functions: [],
          range: [-2*Math.PI, 2*Math.PI]
        },
        sliders: [
          { var: 'a', min: 1, max: 5, step: 1, default: 1, label: 'Amplitud a' },
          { var: 'b', min: 1, max: 5, step: 1, default: 1, label: 'Factor b' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
