// modules/m15/content.js
// Contenido estructurado — Módulo 15: Funciones Elementales
// Lineal, cuadrática, polinómica, racional, raíz, valor absoluto, parte entera, signo.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm15',
  title: 'Funciones Elementales',
  estimatedMinutes: 90,
  difficulty: 3,
  tags: ['función lineal', 'función cuadrática', 'función polinómica', 'función racional', 'función raíz', 'valor absoluto', 'parte entera', 'función signo'],
  learningObjectives: [
    'Identificar y graficar funciones lineales, cuadráticas y polinómicas',
    'Entender funciones racionales y sus asíntotas',
    'Graficar funciones raíz, valor absoluto, parte entera y signo',
    'Reconocer transformaciones básicas de gráficas (traslaciones, reflexiones)',
    'Resolver problemas aplicando funciones elementales'
  ],
  theory: {
    historicalContext: 'Las funciones elementales han sido estudiadas desde la antigüedad. Las funciones lineales y cuadráticas se conocen desde Babilonia y Egipto. Las funciones polinómicas se desarrollaron plenamente con el álgebra de al-Khwarizmi y luego con Descartes (geometría analítica, siglo XVII). Las funciones trascendentes (exponencial, logarítmica, trigonométrica) se desarrollaron en el siglo XVII con el cálculo de Newton y Leibniz.',
    sections: [
      {
        number: '15.1',
        title: 'Función lineal',
        content: 'Una función lineal tiene la forma f(x) = mx + b, donde m es la pendiente (inclinación) y b es la ordenada al origen (donde corta el eje y). Su gráfica es una recta. La pendiente m representa la tasa de cambio: cuánto cambia y por cada unidad que cambia x.',
        formulas: ['f(x) = mx + b'],
        analogies: [
          'Es como una carretera con pendiente constante: por cada metro que avanzas horizontalmente, subes o bajas siempre lo mismo verticalmente.'
        ]
      },
      {
        number: '15.2',
        title: 'Función cuadrática',
        content: 'Una función cuadrática tiene la forma f(x) = ax² + bx + c, con a ≠ 0. Su gráfica es una parábola. Si a > 0 abre hacia arriba (tiene mínimo), si a < 0 abre hacia abajo (tiene máximo). El vértice está en x = -b/(2a). Las raíces son los valores de x donde f(x) = 0.',
        formulas: ['f(x) = ax² + bx + c', 'x_vértice = -b/(2a)'],
        analogies: [
          'Es como la trayectoria de una pelota lanzada al aire: sube, llega al máximo (vértice) y baja.'
        ]
      },
      {
        number: '15.3',
        title: 'Función polinómica',
        content: 'Una función polinómica es una suma de términos de la forma a_n·x^n donde n es entero no negativo. El grado es el exponente más alto. Cuanto mayor el grado, más compleja puede ser la gráfica (más giros). Una función polinómica de grado n tiene a lo más n raíces y a lo más n-1 giros.',
        formulas: ['f(x) = a_n·x^n + ... + a₁·x + a₀'],
        analogies: [
          'Es como sumar términos de diferentes potencias: cada término aporta una "curva" a la gráfica.'
        ]
      },
      {
        number: '15.4',
        title: 'Función racional',
        content: 'Una función racional es el cociente de dos polinomios: f(x) = P(x)/Q(x), con Q(x) ≠ 0. Su dominio excluye los valores donde Q(x) = 0 (estos dan asíntotas verticales). Las asíntotas horizontales dependen de los grados de P y Q.',
        formulas: ['f(x) = P(x)/Q(x), Q(x) ≠ 0'],
        analogies: [
          'Es como dividir una pizza entre un número variable de personas: si el denominador se hace cero, no se puede dividir (asíntota vertical).'
        ]
      },
      {
        number: '15.5',
        title: 'Función raíz, valor absoluto, parte entera y signo',
        content: 'La función raíz f(x) = √n√x tiene dominio restringido (para índice par, x ≥ 0). La función valor absoluto f(x) = |x| da la distancia al cero, su gráfica es una V. La función parte entera f(x) = ⌊x⌋ da el entero más menor o igual a x, su gráfica es una escalera. La función signo f(x) = sgn(x) devuelve -1, 0 o 1 según el signo de x.',
        formulas: ['f(x) = |x|', 'f(x) = ⌊x⌋', 'f(x) = sgn(x)'],
        analogies: [
          'El valor absoluto es como una distancia: siempre positiva. La parte entera es como redondear hacia abajo al entero más cercano.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que toda gráfica que parece una curva es una función',
        description: 'No toda curva representa una función. Debe pasar la prueba de la línea vertical: una vertical no puede cortar la gráfica en más de un punto.',
        remediation: 'Aplicar la prueba de la línea vertical: si una línea vertical corta la gráfica en más de un punto, no es una función.'
      },
      {
        name: 'Creer que f(x) = x² es lineal',
        description: 'f(x) = x² tiene x elevada al cuadrado, no es lineal. Una función lineal solo tiene x elevada a la primera potencia.',
        remediation: 'Una función lineal tiene la forma f(x) = mx + b. Si hay x², x³, etc., no es lineal.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar tipo de función',
        type: 'Identificación',
        estimatedMinutes: 5,
        question: '¿Qué tipo de función es f(x) = 3x² - 2x + 1?',
        steps: [
          'Tiene un término con x², que es el grado más alto.',
          'El grado es 2, por tanto es una función cuadrática.',
          'No es lineal porque tiene x².'
        ],
        hints: [
          'Mira el exponente más alto de x.',
          'Si es 2, es cuadrática.'
        ],
        solution: 'Es una función cuadrática (grado 2).'
      },
      {
        title: 'Evaluar una función lineal',
        type: 'Evaluación',
        estimatedMinutes: 4,
        question: 'Dado f(x) = 2x + 5, calcula f(-3)',
        steps: [
          'Sustituye x por -3: f(-3) = 2(-3) + 5.',
          'Calcula: -6 + 5 = -1.',
          'Resultado: f(-3) = -1.'
        ],
        hints: [
          'Reemplaza cada x por -3.',
          '2 × (-3) = -6.'
        ],
        solution: 'f(-3) = -1.'
      },
      {
        title: 'Encontrar el vértice de una parábola',
        type: 'Vértice',
        estimatedMinutes: 6,
        question: 'Encuentra el vértice de f(x) = x² - 4x + 3',
        steps: [
          'Usa la fórmula x = -b/(2a). Aquí a = 1, b = -4.',
          'x = -(-4)/(2·1) = 4/2 = 2.',
          'Calcula f(2) = 2² - 4(2) + 3 = 4 - 8 + 3 = -1.',
          'El vértice es (2, -1).'
        ],
        hints: [
          'Primero encuentra la coordenada x del vértice.',
          'Luego sustituye para encontrar y.'
        ],
        solution: 'Vértice: (2, -1).'
      },
      {
        title: 'Evaluar valor absoluto',
        type: 'Valor absoluto',
        estimatedMinutes: 4,
        question: 'Calcula f(x) = |x - 5| para x = 2',
        steps: [
          'Sustituye x por 2: f(2) = |2 - 5|.',
          'Calcula: | -3 | = 3.',
          'Resultado: f(2) = 3.'
        ],
        hints: [
          'Primero haz lo que está dentro del valor absoluto.',
          'Luego toma el valor absoluto (distancia al cero).'
        ],
        solution: 'f(2) = 3.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es el dominio de f(x) = √x?',
        options: [
          'Todos los reales',
          'x ≥ 0',
          'x > 0',
          'x ≠ 0'
        ],
        correct: 1,
        hints: [
          'No puedes sacar raíz cuadrada de un número negativo en los reales.',
          'x debe ser mayor o igual que 0.'
        ],
        explanation: 'El dominio de √x es x ≥ 0 porque no existe raíz cuadrada de negativos en ℝ.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué forma tiene la gráfica de una función cuadrática?',
        options: [
          'Una recta',
          'Una parábola',
          'Una hipérbola',
          'Una línea escalera'
        ],
        correct: 1,
        hints: [
          'Las funciones cuadráticas tienen x².',
          'Su gráfica es una curva con forma de U.'
        ],
        explanation: 'La gráfica de una función cuadrática es una parábola.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el dominio de f(x) = 1/(x - 2)?',
        options: [
          'Todos los reales',
          'x ≠ 2',
          'x = 2',
          'x > 2'
        ],
        correct: 1,
        hints: [
          'El denominador no puede ser cero.',
          'x - 2 ≠ 0, así que x ≠ 2.'
        ],
        explanation: 'El denominador no puede ser cero, así que x ≠ 2. El dominio es todos los reales excepto 2.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Función lineal con pendiente variable',
        description: 'Observa cómo cambia la recta al modificar la pendiente y la ordenada al origen',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'm', min: -5, max: 5, step: 0.5, default: 1, label: 'Pendiente m' },
          { var: 'b', min: -5, max: 5, step: 1, default: 0, label: 'Ordenada b' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Parábola con vértice móvil',
        description: 'Observa cómo cambian a, b, c en f(x) = ax² + bx + c',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'a', min: -3, max: 3, step: 0.5, default: 1, label: 'Coeficiente a' },
          { var: 'b', min: -5, max: 5, step: 1, default: 0, label: 'Coeficiente b' },
          { var: 'c', min: -5, max: 5, step: 1, default: 0, label: 'Coeficiente c' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
