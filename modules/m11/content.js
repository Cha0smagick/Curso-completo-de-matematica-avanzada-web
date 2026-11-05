// modules/m11/content.js
// Contenido estructurado — Módulo 11: Álgebra Elemental
// Variable, expresión, término, polinomio, operaciones, factorización común, productos notables, ecuaciones lineales.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm11',
  title: 'Álgebra Elemental',
  estimatedMinutes: 90,
  difficulty: 3,
  tags: ['álgebra', 'variable', 'expresión', 'polinomio', 'ecuación lineal', 'productos notables', 'factorización'],
  learningObjectives: [
    'Entender qué es una variable y una expresión algebraica',
    'Operar con polinomios: suma, resta, multiplicación',
    'Aplicar productos notables: (a+b)², (a-b)², (a+b)(a-b)',
    'Factorizar por factor común',
    'Resolver ecuaciones lineales de una incógnita'
  ],
  theory: {
    historicalContext: 'La palabra "álgebra" viene del árabe "al-jabr" (reunir, restaurar), del libro de Al-Khwarizmi del siglo IX. La notación moderna con letras para variables (x, y, z) fue popularizada por Descartes en el siglo XVII. Antes, el álgebra se hacía todo con palabras (álgebra retórica) o con abreviaturas (álgebra sincopada).',
    sections: [
      {
        number: '11.1',
        title: 'Variable, expresión y término',
        content: 'Una variable es una letra que representa un número que puede cambiar (x, y, z). Una expresión algebraica combina números, variables y operaciones (3x + 2, a² - b²). Los términos son las partes separadas por + o - (en 3x + 2, los términos son 3x y 2). El coeficiente es el número que multiplica a la variable (3 en 3x).',
        formulas: ['3x + 2', 'a² - b²'],
        analogies: [
          'Una variable es como una caja cerrada: no sabes qué hay dentro, pero sabes que es un número. La expresión es la instrucción de qué hacer con esa caja.'
        ]
      },
      {
        number: '11.2',
        title: 'Operaciones con polinomios',
        content: 'Un polinomio es una suma de términos con variables elevadas a exponentes enteros positivos (2x² + 3x - 5). Se suman y restan términos semejantes (mismo literal con mismo exponente). Se multiplica distribuyendo cada término de un polinomio por cada término del otro.',
        formulas: ['(2x² + 3x) + (x² - 4x) = 3x² - x'],
        analogies: [
          'Sumar polinomios es como combinar manzanas con manzanas y naranjas con naranjas: 2x² + x² = 3x², pero 2x² + 3x no se puede simplificar porque son "diferentes frutas".'
        ]
      },
      {
        number: '11.3',
        title: 'Productos notables',
        content: 'Los productos notables son identidades que se cumplen siempre: (a+b)² = a² + 2ab + b², (a-b)² = a² - 2ab + b², (a+b)(a-b) = a² - b². Permiten expandir y factorizar rápidamente sin hacer todas las multiplicaciones.',
        formulas: ['(a+b)² = a² + 2ab + b²', '(a+b)(a-b) = a² - b²'],
        analogies: [
          'Son como atajos: en lugar de multiplicar término por término, aplicas la fórmula directamente.'
        ]
      },
      {
        number: '11.4',
        title: 'Factorización común',
        content: 'Factorizar es escribir una expresión como producto de factores. La factorización común busca el factor común a todos los términos: 6x² + 9x = 3x(2x + 3). El factor común es el MCD de los coeficientes veces las variables con el exponente más bajo.',
        formulas: ['6x² + 9x = 3x(2x + 3)'],
        analogies: [
          'Es como desarmar un mueble en sus piezas básicas: 6x² + 9x se desarma en 3x y (2x+3).'
        ]
      },
      {
        number: '11.5',
        title: 'Ecuaciones lineales de una incógnita',
        content: 'Una ecuación lineal es una igualdad donde la variable tiene exponente 1 (ax + b = 0). Se resuelve despejando la variable: pasar términos sin variable al otro lado cambiando el signo, y dividir por el coeficiente. La solución es el valor que hace verdadera la igualdad.',
        formulas: ['ax + b = 0', 'x = -b/a'],
        analogies: [
          'Una ecuación es como una balanza: lo que hagas a un lado, hazlo al otro para mantener el equilibrio. El objetivo es dejar la variable sola en un plato.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que (a+b)² = a² + b²',
        description: 'Error muy común: olvidar el término del medio 2ab. (a+b)² = a² + 2ab + b².',
        remediation: 'Recordar que (a+b)² = (a+b)(a+b) = a² + ab + ba + b² = a² + 2ab + b².'
      },
      {
        name: 'Cambiar el signo al pasar términos',
        description: 'Al pasar un término de un lado de la ecuación al otro, se cambia el signo (+ pasa a -, - pasa a +). Los estudiantes a veces olvidan cambiar el signo.',
        remediation: 'Recordar que pasar un término es equivalente a restarlo de ambos lados, por eso cambia de signo.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar términos y coeficientes',
        type: 'Identificación',
        estimatedMinutes: 4,
        question: 'En la expresión 4x² - 3x + 7, ¿cuáles son los términos y cuál es el coeficiente de x²?',
        steps: [
          'Los términos son las partes separadas por + o -: 4x², -3x, y 7.',
          'El término 4x² tiene coeficiente 4.',
          'El término -3x tiene coeficiente -3.',
          'El término 7 es independiente (no tiene variable).'
        ],
        hints: [
          'Los términos están separados por signos + o -.',
          'El coeficiente es el número que multiplica a la variable.'
        ],
        solution: 'Términos: 4x², -3x, 7. Coeficiente de x²: 4.'
      },
      {
        title: 'Sumar polinomios',
        type: 'Operación',
        estimatedMinutes: 5,
        question: 'Suma: (2x² + 3x - 1) + (x² - 4x + 5)',
        steps: [
          'Agrupa términos semejantes: (2x² + x²) + (3x - 4x) + (-1 + 5).',
          'Calcula: 3x² - x + 4.',
          'Resultado: 3x² - x + 4.'
        ],
        hints: [
          'Solo se pueden sumar términos semejantes (misma letra y mismo exponente).',
          'x² con x², x con x, número con número.'
        ],
        solution: '3x² - x + 4.'
      },
      {
        title: 'Producto notable',
        type: 'Producto notable',
        estimatedMinutes: 5,
        question: 'Expande: (x + 3)²',
        steps: [
          'Usa la fórmula: (a+b)² = a² + 2ab + b².',
          'Aquí a = x, b = 3.',
          'Sustituye: x² + 2(x)(3) + 3² = x² + 6x + 9.',
          'Resultado: x² + 6x + 9.'
        ],
        hints: [
          'No olvides el término del medio: 2ab.',
          '2 × x × 3 = 6x.'
        ],
        solution: '(x + 3)² = x² + 6x + 9.'
      },
      {
        title: 'Resolver ecuación lineal',
        type: 'Ecuación',
        estimatedMinutes: 6,
        question: 'Resuelve: 3x - 7 = 11',
        steps: [
          'Pasa el -7 al otro lado cambiando el signo: 3x = 11 + 7.',
          'Calcula: 3x = 18.',
          'Divide entre 3: x = 6.',
          'Verifica: 3(6) - 7 = 18 - 7 = 11. ✓'
        ],
        hints: [
          'Primero aísla el término con la variable.',
          'Luego divide por el coeficiente.'
        ],
        solution: 'x = 6.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es el coeficiente de x en -5x + 3?',
        options: [
          '3',
          '-5',
          '5',
          '0'
        ],
        correct: 1,
        hints: [
          'El coeficiente es el número que multiplica a la variable.',
          'El signo va incluido.'
        ],
        explanation: 'El coeficiente de x es -5 (incluye el signo menos).'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el resultado de (x + 2)(x - 2)?',
        options: [
          'x² + 4',
          'x² - 4',
          'x² + 2x + 4',
          'x² - 2x - 4'
        ],
        correct: 1,
        hints: [
          'Es el producto notable (a+b)(a-b) = a² - b².',
          'Aquí a = x, b = 2.'
        ],
        explanation: '(x + 2)(x - 2) = x² - 2² = x² - 4.'
      },
      {
        type: 'multiple-choice',
        question: 'Resuelve: 2x + 6 = 14',
        options: [
          'x = 4',
          'x = 8',
          'x = 10',
          'x = 2'
        ],
        correct: 0,
        hints: [
          'Pasa el 6 al otro lado: 2x = 14 - 6 = 8.',
          'Divide entre 2: x = 4.'
        ],
        explanation: '2x = 8, así que x = 4.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Recta numérica con solución de ecuación',
        description: 'Visualiza la solución de ax + b = 0 en la recta numérica',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'a', min: -5, max: 5, step: 1, default: 2, label: 'Coeficiente a' },
          { var: 'b', min: -10, max: 10, step: 1, default: -4, label: 'Término b' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Producto notable (a+b)²',
        description: 'Visualiza el descomposición geométrica de (a+b)²',
        type: 'function',
        data: {
          functions: [],
          range: [0, 10]
        },
        sliders: [
          { var: 'a', min: 1, max: 5, step: 1, default: 3, label: 'Lado a' },
          { var: 'b', min: 1, max: 5, step: 1, default: 2, label: 'Lado b' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
