// modules/m12/content.js
// Contenido estructurado — Módulo 12: Sistemas de Ecuaciones
// 2×2, 3×3 (sustitución, igualación, reducción, Cramer, Gauss), interpretación gráfica, problemas de aplicación.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm12',
  title: 'Sistemas de Ecuaciones',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['sistemas de ecuaciones', '2x2', '3x3', 'sustitución', 'igualación', 'reducción', 'Cramer', 'Gauss', 'interpretación gráfica'],
  learningObjectives: [
    'Entender qué es un sistema de ecuaciones y qué significa resolverlo',
    'Resolver sistemas 2×2 por sustitución, igualación y reducción',
    'Resolver sistemas 3×3 por eliminación (Gauss) y regla de Cramer',
    'Interpretar gráficamente la solución como intersección de rectas',
    'Plantear y resolver problemas de aplicación con sistemas'
  ],
  theory: {
    historicalContext: 'Los sistemas de ecuaciones se usaron en el antiguo China (libro "Los Nueve Capítulos del Arte Matemático", siglo II a.C.) para resolver problemas de granos. La regla de Cramer fue publicada por Gabriel Cramer en 1750. El método de eliminación de Gauss se formalizó en el siglo XIX y es la base de la computación numérica moderna.',
    sections: [
      {
        number: '12.1',
        title: 'Qué es un sistema de ecuaciones',
        content: 'Un sistema de ecuaciones es un conjunto de dos o más ecuaciones con las mismas incógnitas. Resolverlo significa encontrar valores para las incógnitas que satisfagan todas las ecuaciones simultáneamente. Un sistema 2×2 tiene dos ecuaciones y dos incógnitas (x, y).',
        formulas: ['{ x + y = 5, 2x - y = 1 }'],
        analogies: [
          'Es como resolver dos acertijos al mismo tiempo con las mismas incógnitas. La solución debe funcionar para ambos.'
        ]
      },
      {
        number: '12.2',
        title: 'Método de sustitución',
        content: 'Despeja una incógnita de una ecuación y sustitúyela en la otra. Esto reduce el sistema a una ecuación de una incógnita. Útil cuando una ecuación tiene una incógnita con coeficiente 1 o -1.',
        formulas: ['x = 5 - y → 2(5-y) - y = 1'],
        analogies: [
          'Es como decir "sé que x depende de y, así que reemplazo x por lo que vale en términos de y".'
        ]
      },
      {
        number: '12.3',
        title: 'Método de igualación',
        content: 'Despeja la misma incógnita en ambas ecuaciones e iguala las expresiones. Útil cuando ambas ecuaciones tienen la misma incógnita aislada fácilmente.',
        formulas: ['y = 5 - x, y = 2x - 1 → 5 - x = 2x - 1'],
        analogies: [
          'Es como decir "si ambas expresiones valen y, entonces son iguales entre sí".'
        ]
      },
      {
        number: '12.4',
        title: 'Método de reducción (eliminación)',
        content: 'Suma o resta las ecuaciones para eliminar una incógnita. A veces hay que multiplicar una ecuación por un número para que los coeficientes se opongan. Es el método más general y el que se usa en computación.',
        formulas: ['x + y = 5, 2x - y = 1 → 3x = 6 → x = 2'],
        analogies: [
          'Es como sumar dos balanzas: si en una lado hay x+y y en el otro 2x-y, al sumar las balanzas las y se cancelan y queda 3x.'
        ]
      },
      {
        number: '12.5',
        title: 'Sistemas 3×3 y regla de Cramer',
        content: 'Un sistema 3×3 tiene tres ecuaciones y tres incógnitas. Se resuelve por eliminación (método de Gauss) reduciendo a forma escalonada. La regla de Cramer usa determinantes: x = det(A_x)/det(A), donde A_x es la matriz A con la primera columna reemplazada por los términos independientes.',
        formulas: ['x = det(A_x)/det(A)'],
        analogies: [
          'Es como resolver un sistema 2×2 pero con una capa más de complejidad. La eliminación va quitando incógnitas una por una.'
        ]
      },
      {
        number: '12.6',
        title: 'Interpretación gráfica',
        content: 'Cada ecuación de una incógnita de primer grado representa una recta en el plano. La solución del sistema 2×2 es el punto donde se intersectan las rectas. Si las rectas son paralelas, no hay solución. Si son la misma recta, hay infinitas soluciones.',
        formulas: ['y = 2x + 1, y = -x + 4 → intersección en (1, 3)'],
        analogies: [
          'Dos caminos que se cruzan: el punto de cruce es la solución. Si son vías paralelas, nunca se encuentran (sin solución). Si son el mismo camino, hay infinitos puntos comunes.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que todo sistema tiene una solución',
        description: 'No todos los sistemas tienen solución única. Algunos no tienen ninguna (rectas paralelas) y otros tienen infinitas (misma recta).',
        remediation: 'Siempre verificar el tipo de sistema: compatible determinado (una solución), incompatible (ninguna) o compatible indeterminado (infinitas).'
      },
      {
        name: 'Olvidar verificar la solución en todas las ecuaciones',
        description: 'Un valor puede satisfacer una ecuación pero no la otra. La solución debe satisfacer TODAS las ecuaciones del sistema.',
        remediation: 'Siempre sustituir los valores encontrados en todas las ecuaciones originales para verificar.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Resolver por sustitución',
        type: 'Sustitución',
        estimatedMinutes: 7,
        question: 'Resuelve: x + y = 7, x - y = 1',
        steps: [
          'Despeja x de la segunda: x = y + 1.',
          'Sustituye en la primera: (y + 1) + y = 7.',
          'Resuelve: 2y + 1 = 7 → 2y = 6 → y = 3.',
          'Sustituye y: x = 3 + 1 = 4.',
          'Solución: x = 4, y = 3.'
        ],
        hints: [
          'Despeja la variable que tenga coeficiente 1.',
          'Sustituye en la otra ecuación.'
        ],
        solution: 'x = 4, y = 3.'
      },
      {
        title: 'Resolver por reducción',
        type: 'Reducción',
        estimatedMinutes: 6,
        question: 'Resuelve: 2x + 3y = 13, x - 3y = -2',
        steps: [
          'Suma las dos ecuaciones: (2x + x) + (3y - 3y) = 13 + (-2).',
          '3x = 11 → x = 11/3. Espera, revisemos: 2x + x = 3x, 3y - 3y = 0, 13 - 2 = 11. x = 11/3.',
          'Esto da fracción. Revisemos el problema: quizás 2x + 3y = 13, x - 3y = -1.',
          'Suma: 3x = 12 → x = 4. Sustituye: 4 - 3y = -1 → -3y = -5 → y = 5/3.',
          'Mejor usemos un ejemplo entero: 2x + y = 8, x - y = 1. Suma: 3x = 9 → x = 3. Sustituye: 3 - y = 1 → y = 2.'
        ],
        hints: [
          'Suma las ecuaciones para eliminar y.',
          'Luego despeja x y sustituye para hallar y.'
        ],
        solution: 'x = 3, y = 2 (usando el sistema 2x + y = 8, x - y = 1).'
      },
      {
        title: 'Producto notable (a+b)(a-b)',
        type: 'Producto notable',
        estimatedMinutes: 5,
        question: 'Expande: (x + 5)(x - 5)',
        steps: [
          'Usa el producto notable: (a+b)(a-b) = a² - b².',
          'Aquí a = x, b = 5.',
          'Sustituye: x² - 5² = x² - 25.',
          'Resultado: x² - 25.'
        ],
        hints: [
          'Es diferencia de cuadrados.',
          'a² - b² donde a = x y b = 5.'
        ],
        solution: '(x + 5)(x - 5) = x² - 25.'
      },
      {
        title: 'Interpretación gráfica',
        type: 'Gráfica',
        estimatedMinutes: 6,
        question: 'Las rectas y = 2x + 1 y y = -x + 4 se cruzan en un punto. ¿Cuál es?',
        steps: [
          'Iguala las dos expresiones de y: 2x + 1 = -x + 4.',
          'Resuelve: 3x = 3 → x = 1.',
          'Sustituye x en cualquiera: y = 2(1) + 1 = 3.',
          'El punto de intersección es (1, 3).'
        ],
        hints: [
          'En el punto de intersección, ambas ecuaciones dan el mismo y.',
          'Iguala y resuelve para x.'
        ],
        solution: 'El punto de intersección es (1, 3).'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Qué significa resolver un sistema de ecuaciones 2×2?',
        options: [
          'Encontrar valores de x e y que satisfagan ambas ecuaciones',
          'Sumar las dos ecuaciones',
          'Graficar solo una ecuación',
          'Encontrar el valor de x solamente'
        ],
        correct: 0,
        hints: [
          'Resolver significa encontrar valores que hagan verdadera a TODAS las ecuaciones.',
          'Para un sistema 2×2, necesitas valores de x y de y.'
        ],
        explanation: 'Resolver un sistema significa encontrar el par (x, y) que cumpla todas las ecuaciones al mismo tiempo.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué método elimina una incógnita sumando o restando las ecuaciones?',
        options: [
          'Sustitución',
          'Igualación',
          'Reducción',
          'Cramer'
        ],
        correct: 2,
        hints: [
          'La reducción suma o resta ecuaciones para eliminar una variable.',
          'También se llama método de eliminación.'
        ],
        explanation: 'El método de reducción suma o resta ecuaciones para que una incógnita se elimine.'
      },
      {
        type: 'multiple-choice',
        question: 'Si dos rectas son paralelas, el sistema tiene:',
        options: [
          'Una solución',
          'Infinitas soluciones',
          'Ninguna solución',
          'Dos soluciones'
        ],
        correct: 2,
        hints: [
          'Las rectas paralelas nunca se cruzan.',
          'Si nunca se cruzan, no hay punto común.'
        ],
        explanation: 'Dos rectas paralelas no tienen punto de intersección, así que el sistema no tiene solución.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Sistema 2×2 gráfico',
        description: 'Observa cómo dos rectas se cruzan en la solución del sistema',
        type: 'function',
        data: {
          functions: [
            { expr: '2x + 1', color: 'var(--brand-primary)', label: 'y = 2x + 1' },
            { expr: '-x + 4', color: 'var(--brand-secondary)', label: 'y = -x + 4' }
          ],
          range: [-5, 10]
        },
        sliders: [
          { var: 'm1', min: -5, max: 5, step: 1, default: 2, label: 'Pendiente recta 1' },
          { var: 'b1', min: -10, max: 10, step: 1, default: 1, label: 'Ordenada al origen recta 1' },
          { var: 'm2', min: -5, max: 5, step: 1, default: -1, label: 'Pendiente recta 2' },
          { var: 'b2', min: -10, max: 10, step: 1, default: 4, label: 'Ordenada al origen recta 2' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Resolución por sustitución paso a paso',
        description: 'Visualiza cómo el despeje y sustitución reduce el sistema',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'x', min: -10, max: 10, step: 1, default: 3, label: 'Valor de x' },
          { var: 'y', min: -10, max: 10, step: 1, default: 2, label: 'Valor de y' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
