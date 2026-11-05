// modules/m26/content.js
// Contenido estructurado — Módulo 26: Geometría del Espacio
// Vectores en R³, producto escalar/vectorial/mixtos, rectas y planos, distancias, ángulos, tetraedros, esferas.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm26',
  title: 'Geometría del Espacio',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['geometría del espacio', 'vectores en R3', 'producto escalar', 'producto vectorial', 'producto mixto', 'rectas y planos', 'distancias', 'ángulos', 'esferas'],
  learningObjectives: [
    'Entender vectores en el espacio tridimensional R³',
    'Operar con producto escalar, vectorial y mixto',
    'Representar rectas y planos en el espacio',
    'Calcular distancias entre puntos, rectas y planos',
    'Calcular ángulos entre rectas y planos',
    'Entender esferas y tetraedros'
  ],
  theory: {
    historicalContext: 'La geometría del espacio tridimensional se desarrolló formalmente en el siglo XIX con el álgebra vectorial de Grassmann y Hamilton, y fue sistematizada por Gibbs y Heaviside a finales del siglo XIX. Los vectores se convirtieron en el lenguaje natural de la física (mecánica, electromagnetismo) y la ingeniería.',
    sections: [
      {
        number: '26.1',
        title: 'Vectores en el espacio R³',
        content: 'Un vector en el espacio es un segmento orientado definido por su origen y su extremo, o equivalentemente por sus tres componentes (x, y, z). Dos vectores son iguales si tienen la misma magnitud y dirección, independientemente de su posición. Las operaciones son: suma vectorial (regla del paralelogramo), multiplicación por un escalar, y resta.',
        formulas: ['v = (x, y, z)', '|v| = √(x² + y² + z²)'],
        analogies: [
          'Un vector es como una flecha en el espacio: tiene dirección, sentido y magnitud.'
        ]
      },
      {
        number: '26.2',
        title: 'Producto escalar',
        content: 'El producto escalar de dos vectores u y v se define como u·v = |u|·|v|·cos(θ), donde θ es el ángulo entre ellos. En coordenadas: u·v = u₁v₁ + u₂v₂ + u₃v₃. Dos vectores son ortogonales si su producto escalar es cero. El producto escalar permite calcular el ángulo entre dos vectores: cos(θ) = (u·v)/(|u|·|v|).',
        formulas: ['u·v = u₁v₁ + u₂v₂ + u₃v₃', 'u·v = |u|·|v|·cos(θ)', 'cos(θ) = (u·v)/(|u|·|v|)'],
        'analogies': [
          'El producto escalar mide cuánto "apuntan en la misma dirección" dos vectores.'
        ]
      },
      {
        number: '26.3',
        title: 'Producto vectorial',
        content: 'El producto vectorial de dos vectores u y v es un vector u × v perpendicular a ambos, con magnitud |u||v|sen(θ) y dirección dada por la regla de la mano derecha. En coordenadas: u × v = (u₂v₃ - u₃v₂, u₃v₁ - u₁v₃, u₁v₂ - u₂v₁). El módulo |u × v| es el área del paralelogramo determinado por u y v.',
        formulas: ['u × v = (u₂v₃ - u₃v₂, u₃v₁ - u₁v₃, u₁v₂ - u₂v₁)', '|u × v| = |u||v|sen(θ)'],
        'analogies': [
          'El producto vectorial da un vector perpendicular a ambos, como el eje de rotación.'
        ]
      },
      {
        number: '26.4',
        title: 'Producto mixto',
        content: 'El producto mixto de tres vectores u, v, w es u · (v × w), que es un escalar. Su valor absoluto es el volumen del paralelepípedo determinado por los tres vectores. Se calcula como el determinante de la matriz cuyas filas son los vectores.',
        formulas: ['u · (v × w) = det([u; v; w])', 'Volumen = |u · (v × w)|'],
        'analogies': [
          'El producto mixto da el volumen del paralelepípedo formado por tres vectores.'
        ]
      },
      {
        number: '26.5',
        title: 'Rectas y planos en el espacio',
        content: 'Una recta se determina por un punto y un vector director: r(t) = P + t·v. Un plano se determina por un punto y un vector normal: n·(X - P) = 0, o equivalentemente ax + by + cz + d = 0. La intersección de dos planos no paralelos es una recta.',
        formulas: ['r(t) = P + t·v', 'n·(X - P) = 0', 'ax + by + cz + d = 0'],
        'analogies': [
          'Una recta se determina por un punto y una dirección; un plano por un punto y una dirección perpendicular (normal).'
        ]
      },
      {
        number: '26.6',
        title: 'Distancias y ángulos en el espacio',
        content: 'La distancia de un punto P a un plano ax + by + cz + d = 0 es |ax₀ + by₀ + cz₀ + d|/√(a² + b² + c²). El ángulo entre dos planos es el ángulo entre sus normales. El ángulo entre una recta y un plano es el complemento del ángulo entre la dirección de la recta y la normal al plano.',
        formulas: ['dist(P, plano) = |ax₀ + by₀ + cz₀ + d|/√(a² + b² + c²)'],
        'analogies': [
          'La distancia de un punto a un plano es la longitud del segmento perpendicular desde el punto al plano.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que el producto vectorial es conmutativo',
        description: 'El producto vectorial NO es conmutativo: u × v = -v × u. Cambiar el orden cambia el signo del resultado.',
        remediation: 'Recordar que u × v = -(v × u). El orden importa en el producto vectorial.'
      },
      {
        name: 'Creer que dos vectores ortogonales son paralelos',
        description: 'Dos vectores ortogonales son perpendiculares (ángulo de 90°), no paralelos. Dos vectores paralelos son collinearios.',
        remediation: 'Recordar: ortogonal = perpendicular (ángulo 90°), paralelo = misma dirección (ángulo 0° o 180°).'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Producto escalar',
        type: 'Producto escalar',
        estimatedMinutes: 5,
        question: 'Calcula el producto escalar de u = (1, 2, 3) y v = (4, -1, 2).',
        steps: [
          'Aplica la fórmula: u·v = u₁v₁ + u₂v₂ + u₃v₃.',
          'Sustituye: u·v = 1·4 + 2·(-1) + 3·2 = 4 - 2 + 6 = 6.',
          'Resultado: u·v = 6.'
        ],
        hints: [
          'Multiplica componente por componente y suma.'
        ],
        solution: 'u·v = 6.'
      },
      {
        title: 'Producto vectorial',
        type: 'Producto vectorial',
        estimatedMinutes: 6,
        question: 'Calcula u × v donde u = (1, 0, 0) y v = (0, 1, 0).',
        steps: [
          'Aplica la fórmula: u × v = (u₂v₃ - u₃v₂, u₃v₁ - u₁v₃, u₁v₂ - u₂v₁).',
          'Sustituye: u × v = (0·0 - 0·1, 0·0 - 1·0, 1·1 - 0·0) = (0, 0, 1).',
          'Resultado: u × v = (0, 0, 1).'
        ],
        hints: [
          'Aplica la fórmula componente por componente.'
        ],
        solution: 'u × v = (0, 0, 1).'
      },
      {
        title: 'Producto mixto',
        type: 'Producto mixto',
        estimatedMinutes: 6,
        question: 'Calcula el volumen del paralelepípedo definido por u = (1, 0, 0), v = (0, 1, 0), w = (0, 0, 1).',
        steps: [
          'Calcula el determinante: det([u; v; w]) = det([[1,0,0],[0,1,0],[0,0,1]]) = 1.',
          'El volumen es |det| = |1| = 1.',
          'Resultado: volumen = 1.'
        ],
        hints: [
          'El volumen del paralelepípedo es el valor absoluto del determinante.'
        ],
        solution: 'Volumen = 1.'
      },
      {
        title: 'Distancia punto-plano',
        type: 'Distancia',
        estimatedMinutes: 6,
        question: 'Halla la distancia del punto P(1, 2, 3) al plano x + y + z - 6 = 0.',
        steps: [
          'Usa la fórmula: d = |ax₀ + by₀ + cz₀ + d|/√(a² + b² + c²).',
          'Sustituye: d = |1·1 + 1·2 + 1·3 - 6|/√(1² + 1² + 1²) = |1 + 2 + 3 - 6|/√3 = |0|/√3 = 0.',
          'Resultado: d = 0 (el punto está sobre el plano).'
        ],
        hints: [
          'Sustituye las coordenadas del punto en la expresión del plano.'
        ],
        solution: 'd = 0.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es el resultado de u × v si u y v son paralelos?',
        options: [
          'Un vector no nulo',
          'El vector cero',
          'Un vector unitario',
          'No está definido'
        ],
        correct: 1,
        'hints': [
          'Si u y v son paralelos, el seno del ángulo entre ellos es 0.',
          '|u × v| = |u||v|sen(0) = 0.'
        ],
        explanation: 'Si u y v son paralelos, el ángulo entre ellos es 0° o 180°, por lo que su producto vectorial es el vector cero.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es la ecuación de un plano con normal n = (1, 2, 3) que pasa por el punto P(1, 1, 1)?',
        options: [
          'x + 2y + 3z = 6',
          'x + 2y + 3z = 1',
          'x + 2y + 3z = 0',
          'x + y + z = 3'
        ],
        correct: 0,
        'hints': [
          'Usa la ecuación n·(X - P) = 0.',
          'Sustituye: 1(x - 1) + 2(y - 1) + 3(z - 1) = 0 → x + 2y + 3z = 6.'
        ],
        explanation: 'La ecuación es x + 2y + 3z = 6.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es la fórmula del producto escalar de dos vectores?',
        options: [
          'u·v = |u||v|cos(θ)',
          'u·v = |u||v|sin(θ)',
          'u·v = |u| + |v|',
          'u·v = |u| - |v|'
        ],
        correct: 0,
        'hints': [
          'El producto escalar es el producto de las magnitudes por el coseno del ángulo entre ellas.'
        ],
        explanation: 'u·v = |u||v|cos(θ).'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Vectores en el espacio',
        description: 'Visualiza vectores en el espacio 3D',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'x', min: -5, max: 5, step: 1, default: 2, label: 'x' },
          { var: 'y', min: -5, max: 5, step: 1, default: 3, label: 'y' },
          { var: 'z', min: -5, max: 5, step: 1, default: 4, label: 'z' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Plano y punto',
        description: 'Visualiza la distancia de un punto a un plano',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'a', min: -5, max: 5, step: 1, default: 1, label: 'Coeficiente a' },
          { var: 'b', min: -5, max: 5, step: 1, default: 1, label: 'Coeficiente b' },
          { var: 'c', min: -5, max: 5, step: 1, default: 1, label: 'Coeficiente c' },
          { var: 'd', min: -10, max: 10, step: 1, default: -3, label: 'Término d' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
