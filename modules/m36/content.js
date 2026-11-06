// modules/m36/content.js
// Contenido estructurado — Módulo 36: Matrices y Determinantes
// Operaciones, inversa, rango, determinante (propiedades, Laplace, Sarrus, Gauss), regla de Cramer, teorema de Rouché-Frobenius.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm36',
  title: 'Matrices y Determinantes',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['matrices', 'determinantes', 'inversa', 'rango', 'regla de Cramer', 'Laplace', 'Sarrus', 'Gauss'],
  learningObjectives: [
    'Entender qué es una matriz y sus operaciones básicas',
    'Calcular el determinante de una matriz',
    'Encontrar la inversa de una matriz',
    'Calcular el rango de una matriz',
    'Resolver sistemas de ecuaciones con la regla de Cramer',
    'Aplicar el teorema de Rouché-Frobenius'
  ],
  theory: {
    historicalContext: 'Las matrices aparecieron implícitamente en las matemáticas chinas antiguas (Los Nueve Capítulos, siglo II a.C.) para resolver sistemas de ecuaciones. El término "matriz" fue acuñado por James Sylvester en 1850. Arthur Cayley (1858) desarrolló el álgebra de matrices como una teoría independiente. Los determinantes fueron estudiados independientemente por Leibniz y por el matemático japonés Seki Takakazu en el siglo XVII.',
    sections: [
      {
        number: '36.1',
        title: 'Qué es una matriz',
        content: 'Una matriz es un arreglo rectangular de números organizados en filas y columnas. Una matriz de m filas y n columnas se dice de dimensión m × n. Los elementos se identifican por su posición: a_ij es el elemento de la fila i y la columna j. Las matrices representan sistemas de ecuaciones, transformaciones geométricas, grafos y muchos otros objetos.',
        formulas: ['A = [a_ij], i = 1..m, j = 1..n'],
        analogies: [
          'Una matriz es como una tabla de una hoja de cálculo: números organizados en filas y columnas con posiciones específicas.'
        ]
      },
      {
        number: '36.2',
        title: 'Operaciones con matrices',
        content: 'Las operaciones básicas son: suma (elemento a elemento, solo matrices de la misma dimensión), multiplicación por un escalar (multiplicar cada elemento), y multiplicación de matrices (más compleja: el elemento (i,j) del producto es la suma de los productos de los elementos de la fila i de la primera matriz por los elementos de la columna j de la segunda). La multiplicación de matrices NO es conmutativa.',
        formulas: ['(AB)_ij = Σ_k a_ik·b_kj'],
        analogies: [
          'La multiplicación de matrices es como combinar dos transformaciones: primero aplicas una y luego la otra.'
        ]
      },
      {
        number: '36.3',
        title: 'Determinante',
        content: 'El determinante es un número asociado a una matriz cuadrada. Para una matriz 2×2, det(A) = ad - bc. Para matrices mayores, se usa la expansión de Laplace (cofactores) o la regla de Sarrus (solo 3×3). El determinante mide cómo la matriz escala el área (o el volumen). Si det(A) = 0, la matriz no es invertible.',
        formulas: ['det([a,b],[c,d]) = ad - bc', 'Sarrus (3×3): suma de productos diagonales'],
        analogies: [
          'El determinante mide cuánto escala un área el transformación lineal asociada a la matriz.'
        ]
      },
      {
        number: '36.4',
        title: 'Inversa de una matriz',
        content: 'La inversa de una matriz cuadrada A es una matriz A⁻¹ tal que A·A⁻¹ = A⁻¹·A = I (matriz identidad). No toda matriz tiene inversa: solo las que tienen determinante distinto de cero. Se puede calcular por el método de Gauss-Jordan o usando la matriz adjunta.',
        formulas: ['A·A⁻¹ = I', 'A⁻¹ = adj(A)/det(A)'],
        analogies: [
          'La inversa de una matriz es como la operación inversa: si A transforma un punto, A⁻¹ lo devuelve a su posición original.'
        ]
      },
      {
        number: '36.5',
        title: 'Regla de Cramer',
        content: 'La regla de Cramer resuelve sistemas de ecuaciones lineales usando determinantes. Si el sistema Ax = b tiene det(A) ≠ 0, entonces x_i = det(A_i)/det(A), donde A_i es la matriz A con la columna i reemplazada por el vector b.',
        formulas: ['x_i = det(A_i)/det(A)'],
        analogies: [
          'La regla de Cramer es como resolver un sistema usando solo determinantes, sin hacer eliminación.'
        ]
      },
      {
        number: '36.6',
        title: 'Rango y teorema de Rouché-Frobenius',
        content: 'El rango de una matriz es el número máximo de filas (o columnas) linealmente independientes. El teorema de Rouché-Frobenius clasifica los sistemas de ecuaciones: si rango(A) = rango(A amplificada) = número de incógnitas, el sistema tiene solución única; si son iguales pero menores que el número de incógnitas, hay infinitas soluciones; si son diferentes, no hay solución.',
        formulas: ['rango(A) = rango(A|b): sistema compatible', 'rango(A) = n: solución única'],
        analogies: [
          'El rango mide cuánta información independiente contiene la matriz.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que la multiplicación de matrices es conmutativa',
        description: 'La multiplicación de matrices NO es conmutativa: AB ≠ BA en general. Este es uno de los conceptos más importantes del álgebra lineal.',
        remediation: 'Recordar que el orden de la multiplicación de matrices importa: AB y BA generalmente son diferentes.'
      },
      {
        name: 'Confundir la suma de matrices con la multiplicación',
        description: 'La suma de matrices es elemento a elemento (requiere la misma dimensión), mientras que la multiplicación es mucho más compleja (requiere que las dimensiones sean compatibles: m×n por n×p).',
        remediation: 'Recordar que la suma es elemento a elemento y la multiplicación es fila por columna.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Suma y resta de matrices',
        type: 'Operación',
        estimatedMinutes: 4,
        question: 'Calcula A + B donde A = [[1, 2], [3, 4]] y B = [[5, 6], [7, 8]].',
        steps: [
          'Suma elemento a elemento: (1+5, 2+6; 3+7, 4+8).',
          'Resultado: A + B = [[6, 8], [10, 12]].'
        ],
        hints: [
          'Suma los elementos en la misma posición.'
        ],
        solution: 'A + B = [[6, 8], [10, 12]].'
      },
      {
        title: 'Multiplicación de matrices',
        type: 'Multiplicación',
        estimatedMinutes: 7,
        question: 'Calcula AB donde A = [[1, 2], [3, 4]] y B = [[5, 6], [7, 8]].',
        steps: [
          'Elemento (1,1): 1·5 + 2·7 = 5 + 14 = 19.',
          'Elemento (1,2): 1·6 + 2·8 = 6 + 16 = 22.',
          'Elemento (2,1): 3·5 + 4·7 = 15 + 28 = 43.',
          'Elemento (2,2): 3·6 + 4·8 = 18 + 32 = 50.',
          'Resultado: AB = [[19, 22], [43, 50]].'
        ],
        hints: [
          'Multiplica fila de A por columna de B y suma.'
        ],
        solution: 'AB = [[19, 22], [43, 50]].'
      },
      {
        title: 'Determinante de una matriz 2×2',
        type: 'Determinante',
        estimatedMinutes: 4,
        question: 'Calcula el determinante de A = [[3, 5], [2, 7]].',
        steps: [
          'Usa la fórmula: det(A) = ad - bc.',
          'Sustituye: det(A) = 3·7 - 5·2 = 21 - 10 = 11.',
          'Resultado: det(A) = 11.'
        ],
        hints: [
          'Multiplica la diagonal principal y resta el producto de la diagonal secundaria.'
        ],
        solution: 'det(A) = 11.'
      },
      {
        title: 'Regla de Cramer',
        type: 'Cramer',
        estimatedMinutes: 8,
        question: 'Resuelve el sistema x + 2y = 5, 3x + 4y = 11 usando la regla de Cramer.',
        steps: [
          'Matriz de coeficientes: A = [[1, 2], [3, 4]], det(A) = 4 - 6 = -2.',
          'A_x = [[5, 2], [11, 4]], det(A_x) = 20 - 22 = -2.',
          'A_y = [[1, 5], [3, 11]], det(A_y) = 11 - 15 = -4.',
          'x = det(A_x)/det(A) = -2/-2 = 1. y = det(A_y)/det(A) = -4/-2 = 2.',
          'Resultado: x = 1, y = 2.'
        ],
        hints: [
          'Calcula el determinante de la matriz de coeficientes.',
          'Reemplaza columnas con el vector b y calcula los determinantes.'
        ],
        solution: 'x = 1, y = 2.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Qué condición debe cumplir una matriz para tener inversa?',
        options: [
          'Ser cuadrada y tener determinante distinto de cero',
          'Ser simétrica',
          'Ser diagonal',
          'Tener todos los elementos positivos'
        ],
        correct: 0,
        hints: [
          'No toda matriz tiene inversa.',
          'Debe ser cuadrada con determinante distinto de cero.'
        ],
        explanation: 'Una matriz tiene inversa si y solo si es cuadrada y su determinante es distinto de cero.'
      },
      {
        type: 'multiple-choice',
        question: '¿Es la multiplicación de matrices conmutativa?',
        options: [
          'Sí, siempre',
          'No, en general AB ≠ BA',
          'Solo para matrices cuadradas',
          'Solo para matrices diagonales'
        ],
        correct: 1,
        hints: [
          'El orden de la multiplicación importa.',
          'En general AB ≠ BA.'
        ],
        explanation: 'La multiplicación de matrices NO es conmutativa en general: AB ≠ BA.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué mide el determinante de una matriz de transformación 2×2?',
        options: [
          'El ángulo de rotación',
          'Cómo escala el área la transformación',
          'La suma de los elementos',
          'El rango de la matriz'
        ],
        correct: 1,
        hints: [
          'El determinante tiene un significado geométrico.',
          'Mide cómo escala el área.'
        ],
        explanation: 'El determinante mide el factor de escala del área bajo la transformación lineal.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Matriz como transformación',
        description: 'Observa cómo una matriz transforma el plano',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'a', min: -3, max: 3, step: 1, default: 2, label: 'a' },
          { var: 'b', min: -3, max: 3, step: 1, default: 0, label: 'b' },
          { var: 'c', min: -3, max: 3, step: 1, default: 0, label: 'c' },
          { var: 'd', min: -3, max: 3, step: 1, default: 3, label: 'd' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Determinante como área',
        description: 'Observa cómo el determinante mide el área del paralelogramo',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'a', min: -5, max: 5, step: 1, default: 1, label: 'Vector u (x)' },
          { var: 'b', min: -5, max: 5, step: 1, default: 0, label: 'Vector u (y)' },
          { var: 'c', min: -5, max: 5, step: 1, default: 0, label: 'Vector v (x)' },
          { var: 'd', min: -5, max: 5, step: 1, default: 1, label: 'Vector v (y)' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
