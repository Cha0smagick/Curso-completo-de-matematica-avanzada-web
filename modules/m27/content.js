// modules/m27/content.js
// Contenido estructurado — Módulo 27: Transformaciones Geométricas
// Isometrías, homotecias, afinidades, matriz de transformación, valores propios/vectores propios geométricos.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm27',
  title: 'Transformaciones Geométricas',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['transformaciones geométricas', 'isometrías', 'traslación', 'rotación', 'reflexión', 'homotecia', 'afinidad', 'matriz de transformación', 'autovalores', 'autovectores'],
  learningObjectives: [
    'Entender qué es una transformación geométrica y cómo se representa con matrices',
    'Identificar y aplicar isometrías (traslación, rotación, reflexión)',
    'Entender homotecias y dilataciones',
    'Entender transformaciones afines',
    'Representar transformaciones con matrices',
    'Entender autovalores y autovectores desde el punto de vista geométrico'
  ],
  theory: {
    historicalContext: 'Las transformaciones geométricas se estudiaron desde la antigüedad, pero fueron formalizadas como funciones del plano en sí mismo en el siglo XIX con el auge de la geometría no euclidiana y el álgebra lineal. El uso de matrices para representar transformaciones se consolidó a principios del siglo XX con el desarrollo del álgebra lineal moderna.',
    sections: [
      {
        number: '27.1',
        title: '¿Qué es una transformación geométrica?',
        content: 'Una transformación geométrica es una función que asigna a cada punto del plano (o del espacio) otro punto del mismo plano (o espacio). Se representa como T: R² → R² (o R³ → R³). Si aplicamos una transformación a una figura, obtenemos otra figura llamada imagen.',
        formulas: ['T: R² → R²', 'T(P) = P\''],
        analogies: [
          'Una transformación es como una máquina que toma un punto como entrada y devuelve otro punto como salida.'
        ]
      },
      {
        number: '27.2',
        title: 'Traslación',
        content: 'Una traslación mueve todos los puntos del plano la misma distancia en la misma dirección. Si el vector de traslación es v = (a, b), entonces T(x, y) = (x + a, y + b). Es una isometría (conserva distancias y ángulos).',
        formulas: ['T(x, y) = (x + a, y + b)'],
        'analogies': [
          'Es como deslizar una figura sobre una hoja de papel sin rotarla ni deformarla.'
        ]
      },
      {
        number: '27.3',
        title: 'Rotación',
        content: 'Una rotación gira todos los puntos alrededor de un punto fijo (centro de rotación) por un ángulo θ. Si el centro es el origen, la rotación de ángulo θ se representa con la matriz [[cos θ, -sin θ], [sin θ, cos θ]]. Es una isometría.',
        formulas: ['R_θ(x, y) = (x cos θ - y sin θ, x sin θ + y cos θ)'],
        'analogies': [
          'Una rotación es como girar una figura alrededor de un punto fijo, como las agujas de un reloj.'
        ]
      },
      {
        number: '27.4',
        title: 'Reflexión (espejo)',
        content: 'Una reflexión refleja todos los puntos respecto a una recta (eje de reflexión). Si el eje es el eje x, T(x, y) = (x, -y). Si el eje es el eje y, T(x, y) = (-x, y). Es una isometría que cambia la orientación.',
        formulas: ['T(x, y) = (x, -y) (reflexión sobre el eje x)', 'T(x, y) = (-x, y) (reflexión sobre el eje y)'],
        'analogies': [
          'Una reflexión es como mirar en un espejo: la imagen está al otro lado del espejo, a la misma distancia.'
        ]
      },
      {
        number: '27.5',
        title: 'Hotecia',
        content: 'Una homotecia es una transformación que dilata o contrae una figura respecto a un punto fijo (centro de homotecia) por un factor k. Si el centro es el origen, T(x, y) = (kx, ky). Si |k| > 1 es una dilatación, si 0 < |k| < 1 es una contracción, y si k < 0 hay también una reflexión.',
        formulas: ['T(x, y) = (kx, ky)'],
        'analogies': [
          'Una homotecia es como hacer un zoom (acercar o alejar) respecto a un punto fijo.'
        ]
      },
      {
        number: '27.6',
        title: 'Transformaciones afines',
        content: 'Una transformación afine tiene la forma T(x) = Ax + b, donde A es una matriz 2×2 y b es un vector de traslación. Incluye traslaciones, rotaciones, reflexiones, homotecias y cizallamientos. Las transformaciones afines preservan la alignación de puntos y las razones de división en un segmento.',
        formulas: ['T(x) = Ax + b', 'A = [[a, b], [c, d]], b = (e, f)'],
        'analogies': [
          'Una transformación afine puede estirar, rotar, desplazar y cizallar una figura, pero mantiene las líneas rectas como líneas rectas.'
        ]
      },
      {
        number: '27.7',
        title: 'Autovalores y autovectores geométricos',
        content: 'Un autovector de una transformación lineal es un vector que no cambia de dirección al aplicar la transformación (solo cambia de longitud). El factor por el que cambia de longitud es el autovalor. Geométricamente, los autovectores son las direcciones invariantes de la transformación.',
        formulas: ['A·v = λ·v (v es autovector, λ es autovalor)'],
        'analogies': [
          'Un autovector es una dirección que no cambia bajo la transformación; el autovalor es cuánto se estira o encoge en esa dirección.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que toda transformación preserva distancias',
        description: 'Solo las isometrías (traslación, rotación, reflexión) preservan distancias. Una homotecia con k ≠ 1 no preserva distancias, y una transformación afine general tampoco.',
        remediation: 'Recordar que solo las isometrías preservan distancias y ángulos.'
      },
      {
        name: 'Creer que todo vector es un autovector',
        description: 'No todo vector es un autovector. Solo los vectores cuya dirección no cambia bajo la transformación son autovectores. La mayoría de los vectores cambian de dirección.',
        remediation: 'Recordar que un autovector es un vector cuya dirección no cambia bajo la transformación.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Aplicar una traslación',
        type: 'Traslación',
        estimatedMinutes: 5,
        question: 'Aplica la traslación T(x, y) = (x + 3, y - 2) al punto P(1, 4).',
        steps: [
          'Sustituye x = 1, y = 4 en la fórmula.',
          'x\' = 1 + 3 = 4, y\' = 4 - 2 = 2.',
          'Resultado: P\'(4, 2).'
        ],
        hints: [
          'Suma 3 a la coordenada x y resta 2 a la coordenada y.'
        ],
        solution: 'P\'(4, 2).'
      },
      {
        title: 'Aplicar una rotación de 90°',
        type: 'Rotación',
        estimatedMinutes: 6,
        question: 'Rota el punto P(1, 0) un ángulo de 90° en sentido antihorario sobre el origen.',
        steps: [
          'Usa la fórmula: R_90(x, y) = (-y, x).',
          'Sustituye: R_90(1, 0) = (-0, 1) = (0, 1).',
          'Resultado: P\'(0, 1).'
        ],
        hints: [
          'Una rotación de 90° en sentido antihorario sobre el origen transforma (x, y) en (-y, x).'
        ],
        solution: 'P\'(0, 1).'
      },
      {
        title: 'Aplicar una reflexión',
        type: 'Reflexión',
        estimatedMinutes: 5,
        question: 'Refleja el punto P(3, 4) sobre el eje y.',
        steps: [
          'La reflexión sobre el eje y cambia el signo de la coordenada x.',
          'P\'(−3, 4).'
        ],
        hints: [
          'La reflexión sobre el eje y cambia el signo de x.'
        ],
        solution: 'P\'(-3, 4).'
      },
      {
        title: 'Aplicar una homotecia',
        type: 'Hotecia',
        estimatedMinutes: 5,
        question: 'Aplica una homotecia de centro en el origen y factor k = 2 al punto P(2, 3).',
        steps: [
          'Multiplica cada coordenada por k = 2.',
          'P\'(2·2, 3·2) = (4, 6).',
          'Resultado: P\'(4, 6).'
        ],
        hints: [
          'Multiplica cada coordenada por el factor de homotecia.'
        ],
        solution: 'P\'(4, 6).'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Qué tipo de transformación preserva distancias y ángulos?',
        options: [
          'Isometría',
          'Hotecia',
          'Transformación afine general',
          'Todas las anteriores'
        ],
        correct: 0,
        'hints': [
          'Una isometría preserva distancias y ángulos.',
          'Una homotecia con k ≠ 1 no preserva distancias.'
        ],
        explanation: 'Una isometría (traslación, rotación, reflexión) preserva distancias y ángulos.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el efecto de una homotecia con k = 2 sobre una figura?',
        options: [
          'La duplica en tamaño',
          'La reduce a la mitad',
          'La rota 90°',
          'La refleja sobre un eje'
        ],
        correct: 0,
        'hints': [
          'k = 2 significa que todas las distancias se duplican.',
          'La figura se hace el doble de grande.'
        ],
        explanation: 'Una homotecia con k = 2 duplica todas las distancias, por lo que la figura se hace el doble de grande.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué es un autovector de una transformación lineal?',
        options: [
          'Un vector que no cambia de dirección bajo la transformación',
          'Un vector que cambia de longitud pero no de dirección',
          'Ambas respuestas anteriores',
          'Ninguna de las anteriores'
        ],
        correct: 2,
        'hints': [
          'Un autovector es un vector cuya dirección no cambia bajo la transformación.',
          'Su longitud puede cambiar (ese es el autovalor), pero su dirección no.'
        ],
        explanation: 'Un autovector es un vector cuya dirección no cambia bajo la transformación; su longitud puede cambiar (ese es el autovalor λ).'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Transformaciones geométricas',
        description: 'Observa cómo diferentes transformaciones afectan a una figura',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'tipo', min: 0, max: 3, step: 1, default: 0, label: 'Tipo (0=traslación, 1=rotación, 2=reflexión, 3=homotecia)' },
          { var: 'param', min: -5, max: 5, step: 0.5, default: 1, label: 'Parámetro' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Autovectores de una transformación',
        description: 'Observa cómo se transforman los vectores bajo una matriz dada',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'a', min: -3, max: 3, step: 1, default: 2, label: 'a' },
          { var: 'b', min: -3, max: 3, step: 1, default: 1, label: 'b' },
          { var: 'c', min: -3, max: 3, step: 1, default: 1, label: 'c' },
          { var: 'd', min: -3, max: 3, step: 1, default: 2, label: 'd' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
