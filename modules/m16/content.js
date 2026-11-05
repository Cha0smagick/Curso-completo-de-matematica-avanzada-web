// modules/m16/content.js
// Contenido estructurado — Módulo 16: Transformaciones Gráficas
// Traslaciones, dilataciones, reflexiones, parámetros a,b,h,k en f(x)=a·f(b(x-h))+k.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm16',
  title: 'Transformaciones Gráficas',
  estimatedMinutes: 60,
  difficulty: 3,
  tags: ['transformaciones', 'traslación', 'dilatación', 'reflexión', 'parámetros a b h k', 'función parábola'],
  learningObjectives: [
    'Entender cómo los parámetros a, b, h, k transforman la gráfica de una función',
    'Aplicar traslaciones horizontales y verticales',
    'Aplicar dilataciones y compresiones verticales y horizontales',
    'Aplicar reflexiones sobre el eje x y el eje y',
    'Combinar múltiples transformaciones en una sola función'
  ],
  theory: {
    historicalContext: 'El uso de parámetros para transformar funciones se desarrolló con la geometría analítica de Descartes (siglo XVII) y se formalizó con el estudio de funciones en el siglo XIX. La notación f(x) = a·f(b(x-h)) + k es una forma moderna y compacta de describir todas las transformaciones básicas de una función base.',
    sections: [
      {
        number: '16.1',
        title: 'Parámetros de la transformación general',
        content: 'La forma general f(x) = a·f(b(x-h)) + k contiene cuatro parámetros: a controla la dilatación/compresión vertical y reflexión sobre el eje x; b controla la dilatación/compresión horizontal y reflexión sobre el eje y; h controla la traslación horizontal; k controla la traslación vertical.',
        formulas: ['f(x) = a·f(b(x-h)) + k'],
        analogies: [
          'Es como tener cuatro mandos en una máquina de transformación: a estira o comprime verticalmente, b estira o comprime horizontalmente, h mueve izquierda/derecha, k mueve arriba/abajo.'
        ]
      },
      {
        number: '16.2',
        title: 'Traslaciones (desplazamientos)',
        content: 'Una traslación mueve la gráfica sin cambiar su forma. f(x-h) desplaza la gráfica h unidades a la derecha (si h > 0) o a la izquierda (si h < 0). f(x) + k desplaza la gráfica k unidades hacia arriba (si k > 0) o hacia abajo (si k < 0).',
        formulas: ['f(x-h): desplaza h unidades a la derecha', 'f(x)+k: desplaza k unidades arriba'],
        analogies: [
          'Es como mover un mueble de una habitación a otra: la forma del mueble no cambia, solo su posición.'
        ]
      },
      {
        number: '16.3',
        title: 'Dilataciones y compresiones',
        content: 'Una dilatación estira la gráfica, una compresión la achica. a·f(x) con |a| > 1 estira verticalmente, con 0 < |a| < 1 comprime verticalmente. f(b·x) con |b| > 1 comprime horizontalmente (la gráfica se hace más angosta), con 0 < |b| < 1 estira horizontalmente (se hace más ancha).',
        formulas: ['|a| > 1: estira vertical', '0 < |a| < 1: comprime vertical', '|b| > 1: comprime horizontal', '0 < |b| < 1: estira horizontal'],
        analogies: [
          'Es como estirar o comprimir un resorte: a afecta la altura, b afecta el ancho.'
        ]
      },
      {
        number: '16.4',
        title: 'Reflexiones',
        content: 'Una reflexión voltea la gráfica sobre un eje. -f(x) refleja sobre el eje x (voltea hacia arriba/abajo). f(-x) refleja sobre el eje y (voltea hacia izquierda/derecha). Se pueden combinar: -f(-x) refleja sobre el origen (giro de 180°).',
        formulas: ['-f(x): reflejo sobre el eje x', 'f(-x): reflejo sobre el eje y'],
        analogies: [
          'Es como mirar en un espejo: -f(x) es el reflejo en el suelo (eje x), f(-x) es el reflejo en un espejo vertical (eje y).'
        ]
      },
      {
        number: '16.5',
        title: 'Combinación de transformaciones',
        content: 'Las transformaciones se aplican en un orden específico. La forma f(x) = a·f(b(x-h)) + k sugiere el orden: primero h (traslación horizontal dentro del paréntesis), luego b (dilatación horizontal), luego a (dilatación vertical), finalmente k (traslación vertical). Sin embargo, algunas transformaciones conmutan y otras no.',
        formulas: ['Orden sugerido: h → b → a → k'],
        analogies: [
          'Es como armar un mueble: el orden de los pasos importa para que el resultado final sea correcto.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que f(x-h) desplaza a la izquierda si h > 0',
        description: 'Los estudiantes piensan que h positivo desplaza a la derecha, pero en f(x-h), h positivo desplaza a la derecha y h negativo desplaza a la izquierda. Esto es contraintuitivo porque el signo está dentro del paréntesis.',
        remediation: 'Recordar: f(x-h) con h > 0 se desplaza a la derecha. Piensa en x-h = 0 → x = h, el punto origen se mueve a h.'
      },
      {
        name: 'Creer que f(b·x) con b > 1 estira horizontalmente',
        description: 'Los estudiantes piensan que b > 1 estira, pero en realidad comprime horizontalmente porque el gráfico se "aprieta" hacia el eje y.',
        remediation: 'Recordar: b > 1 comprime horizontalmente (necesitas menos x para obtener el mismo resultado), 0 < b < 1 estira horizontalmente.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar parámetros',
        type: 'Identificación',
        estimatedMinutes: 4,
        question: 'En la función g(x) = 3·f(2(x-1)) + 4, ¿cuáles son los valores de a, b, h, k?',
        steps: [
          'Compara con la forma general: a·f(b(x-h)) + k.',
          'Identifica: a = 3, b = 2, h = 1, k = 4.',
          'Verifica cada parámetro en su posición correspondiente.'
        ],
        hints: [
          'a está multiplicando a toda la función.',
          'b está multiplicando a x dentro del paréntesis.',
          'h está restando a x dentro del paréntesis.',
          'k está sumando al final.'
        ],
        solution: 'a = 3, b = 2, h = 1, k = 4.'
      },
      {
        title: 'Traslación vertical',
        type: 'Traslación',
        estimatedMinutes: 5,
        question: 'Si f(x) = x², ¿cuál es la ecuación de la gráfica desplazada 3 unidades arriba?',
        steps: [
          'Una traslación 3 unidades arriba se logra sumando 3 a la función.',
          'f(x) + 3 = x² + 3.',
          'Resultado: g(x) = x² + 3.'
        ],
        hints: [
          'Para mover arriba, suma al final de la función.',
          'Para mover abajo, resta al final.'
        ],
        solution: 'g(x) = x² + 3.'
      },
      {
        title: 'Reflexión sobre el eje x',
        type: 'Reflexión',
        estimatedMinutes: 5,
        question: '¿Cuál es la ecuación de la reflexión de f(x) = x² sobre el eje x?',
        steps: [
          'Reflexionar sobre el eje x significa multiplicar toda la función por -1.',
          'f(x) = x² se convierte en -f(x) = -x².',
          'Resultado: g(x) = -x².'
        ],
        hints: [
          'Para reflejar sobre el eje x, pon un signo menos delante de toda la función.',
          'La parábola se abre hacia abajo.'
        ],
        solution: 'g(x) = -x².'
      },
      {
        title: 'Combinación de transformaciones',
        type: 'Combinación',
        estimatedMinutes: 7,
        question: 'Escribe la ecuación de la función que resulta de tomar f(x) = x², desplazar 2 unidades a la derecha, estirar verticalmente por factor 3 y mover 4 unidades arriba.',
        steps: [
          'Desplazar 2 unidades a la derecha: f(x-2) = (x-2)².',
          'Estirar verticalmente por 3: 3·(x-2)².',
          'Mover 4 unidades arriba: 3·(x-2)² + 4.',
          'Resultado: g(x) = 3(x-2)² + 4.'
        ],
        hints: [
          'Aplica las transformaciones en orden: primero h, luego a, luego k.',
          'h = 2, a = 3, k = 4.'
        ],
        solution: 'g(x) = 3(x-2)² + 4.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Qué hace el parámetro h en f(x) = a·f(b(x-h)) + k?',
        options: [
          'Desplaza verticalmente',
          'Desplaza horizontalmente',
          'Estira verticalmente',
          'Reflexiona sobre el eje x'
        ],
        correct: 1,
        hints: [
          'h está dentro del paréntesis con x, afecta la posición horizontal.',
          'f(x-h) con h > 0 desplaza a la derecha.'
        ],
        explanation: 'h controla la traslación horizontal: f(x-h) desplaza h unidades a la derecha si h > 0.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué hace a = -2 en f(x) = a·f(b(x-h)) + k?',
        options: [
          'Estira verticalmente por 2 y refleja sobre el eje x',
          'Comprime verticalmente por 2',
          'Desplaza 2 unidades arriba',
          'Reflexiona sobre el eje y'
        ],
        correct: 0,
        hints: [
          'a controla la dilatación vertical y la reflexión sobre el eje x.',
          '|a| = 2 estira, el signo negativo refleja sobre el eje x.'
        ],
        explanation: 'a = -2 significa estirar verticalmente por factor 2 y reflejar sobre el eje x (por el signo negativo).'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué transformación convierte f(x) = x² en g(x) = (x-3)²?',
        options: [
          'Desplazar 3 unidades arriba',
          'Desplazar 3 unidades a la derecha',
          'Desplazar 3 unidades a la izquierda',
          'Estirar verticalmente por 3'
        ],
        correct: 1,
        hints: [
          'h = 3 en f(x-h) = (x-3)².',
          'h positivo en x-h desplaza a la derecha.'
        ],
        explanation: '(x-3)² es f(x-3) con f(x) = x², que es un desplazamiento 3 unidades a la derecha.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Transformaciones de la parábola',
        description: 'Observa cómo cambian a, b, h, k en la gráfica de una parábola',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'a', min: -3, max: 3, step: 0.5, default: 1, label: 'Factor a' },
          { var: 'b', min: -3, max: 3, step: 0.5, default: 1, label: 'Factor b' },
          { var: 'h', min: -5, max: 5, step: 1, default: 0, label: 'Desplazamiento h' },
          { var: 'k', min: -5, max: 5, step: 1, default: 0, label: 'Desplazamiento k' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Reflexiones sobre ejes',
        description: 'Compara f(x), -f(x) y f(-x)',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'x', min: -5, max: 5, step: 0.1, default: 1, label: 'Valor de x' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
