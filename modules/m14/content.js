// modules/m14/content.js
// Contenido estructurado — Módulo 14: Concepto de Función
// Dominio, codominio, imagen, gráfica, inyectividad, suprayectividad, biyectividad, composición, inversa.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm14',
  title: 'Concepto de Función',
  estimatedMinutes: 60,
  difficulty: 3,
  tags: ['función', 'dominio', 'codominio', 'imagen', 'inyectividad', 'suprayectividad', 'biyectividad', 'composición', 'inversa'],
  learningObjectives: [
    'Entender qué es una función y cómo se diferencia de una relación cualquier',
    'Identificar dominio, codominio e imagen de una función',
    'Reconocer funciones inyectivas, suprayectivas y biyectoras',
    'Entender la composición de funciones y la función inversa',
    'Representar funciones gráficamente y aplicar la prueba de la línea vertical'
  ],
  theory: {
    historicalContext: 'El concepto de función se desarrolló lentamente durante siglos. Leibniz y Newton lo usaron en el cálculo (siglo XVII) sin definirlo formalmente. Euler introdujo la notación f(x) en 1734. Dirichlet dio la definición moderna (siglo XIX): una función es una regla que asigna a cada valor de x un único valor de y.',
    sections: [
      {
        number: '14.1',
        title: 'Qué es una función',
        content: 'Una función es una regla que asigna a cada elemento de un conjunto (dominio) exactamente un elemento de otro conjunto (codominio). Si x es del dominio, f(x) es el valor correspondiente en el codominio. La imagen es el conjunto de todos los valores que la función realmente toma.',
        formulas: ['f: A → B, f(x) = y'],
        analogies: [
          'Es como una máquina: metes un número (x), sale otro (f(x)). La misma entrada siempre da la misma salida.'
        ]
      },
      {
        number: '14.2',
        title: 'Dominio, codominio e imagen',
        content: 'El dominio es el conjunto de todas las entradas permitidas. El codominio es el conjunto de todas las salidas posibles. La imagen es el conjunto de salidas que la función realmente produce (siempre está contenido en el codominio).',
        formulas: ['Dominio: x valores, Codominio: y posibles, Imagen: y reales'],
        analogies: [
          'Dominio: todos los estudiantes de una clase. Codominio: todas las notas posibles (0-100). Imagen: las notas que realmente obtuvieron los estudiantes.'
        ]
      },
      {
        number: '14.3',
        title: 'Inyectividad, suprayectividad y biyectividad',
        content: 'Una función es inyectiva si cada salida tiene a lo más una entrada (no hay dos x con el mismo f(x)). Es suprayectiva si cada elemento del codominio es imagen de al menos una x. Es biyectiva si es ambas: inyectiva y suprayectiva (correspondencia uno a uno perfecta).',
        formulas: ['Inyectiva: f(x₁) = f(x₂) → x₁ = x₂', 'Suprayectiva: ∀y∈B, ∃x∈A: f(x) = y'],
        analogies: [
          'Inyectiva: cada asiento del teatro tiene a lo más una persona. Suprayectiva: cada asiento está ocupado. Biyectiva: cada asiento tiene exactamente una persona y cada persona tiene un asiento.'
        ]
      },
      {
        number: '14.4',
        title: 'Composición de funciones',
        content: 'La composición (f ∘ g)(x) = f(g(x)) significa aplicar primero g y luego f al resultado. El dominio de la composición son los x para los cuales g(x) está definido y f(g(x)) está definido. No es conmutativa: generalmente f∘g ≠ g∘f.',
        formulas: ['(f ∘ g)(x) = f(g(x))'],
        analogies: [
          'Es como dos máquinas en serie: la salida de la primera es la entrada de la segunda. El orden importa.'
        ]
      },
      {
        number: '14.5',
        title: 'Función inversa',
        content: 'La función inversa f⁻¹ "deshace" lo que f hace: si f(x) = y, entonces f⁻¹(y) = x. Solo las funciones biyectoras tienen inversa. Se encuentra intercambiando x e y y despejando y. Gráficamente, la inversa es el reflejo de la función sobre la recta y = x.',
        formulas: ['y = f(x) ↔ x = f⁻¹(y)', 'Gráfica de f⁻¹: reflejo de f sobre y = x'],
        analogies: [
          'Es como una máquina que puede funcionar en ambos sentidos: si metes 3 y sale 10, la inversa recibe 10 y devuelve 3.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que toda relación es una función',
        description: 'Una relación cualquier puede asignar varios valores de y a un mismo x. Una función solo permite un y por cada x. La prueba de la línea vertical lo detecta.',
        remediation: 'Una relación es función si y solo si ninguna vertical corta la gráfica en más de un punto.'
      },
      {
        name: 'Creer que f⁻¹(x) es 1/f(x)',
        description: 'El signo menos uno en f⁻¹ no es un exponente, no significa recíproco. f⁻¹ es la función inversa, no 1 sobre f.',
        remediation: 'Recordar que f⁻¹(x) se lee "f inversa de x", no "uno sobre f de x".'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar dominio y codominio',
        type: 'Dominio y codominio',
        estimatedMinutes: 5,
        question: 'Para f(x) = √x, ¿cuál es el dominio?',
        steps: [
          'La raíz cuadrada de un número negativo no es real.',
          'Por tanto, x debe ser mayor o igual que 0.',
          'Dominio: [0, ∞) o x ≥ 0.'
        ],
        hints: [
          'Pregúntate: ¿para qué valores de x está definida la expresión?',
          'No puedes sacar raíz cuadrada de negativos en los reales.'
        ],
        solution: 'Dominio: [0, ∞).'
      },
      {
        title: 'Probar inyectividad',
        type: 'Inyectividad',
        estimatedMinutes: 6,
        question: '¿Es f(x) = x² inyectiva en los reales?',
        steps: [
          'Busca dos valores distintos con el mismo f(x).',
          'f(2) = 4 y f(-2) = 4, pero 2 ≠ -2.',
          'Por tanto, no es inyectiva en los reales.'
        ],
        hints: [
          'Busca dos números distintos que al elevarse al cuadrado den lo mismo.',
          '2 y -2 son distintos pero dan 4.'
        ],
        solution: 'No es inyectiva en los reales porque f(2) = f(-2) = 4.'
      },
      {
        title: 'Calcular composición',
        type: 'Composición',
        estimatedMinutes: 6,
        question: 'Dado f(x) = 2x + 1 y g(x) = x², calcula (f ∘ g)(3)',
        steps: [
          'Primero calcula g(3) = 3² = 9.',
          'Luego aplica f a ese resultado: f(9) = 2(9) + 1 = 19.',
          'Resultado: (f ∘ g)(3) = 19.'
        ],
        hints: [
          'La composición se evalúa de adentro hacia afuera: primero g, luego f.',
          'g(3) = 9, f(9) = 19.'
        ],
        solution: '(f ∘ g)(3) = 19.'
      },
      {
        title: 'Encontrar función inversa',
        type: 'Inversa',
        estimatedMinutes: 7,
        question: 'Halla la inversa de f(x) = 2x + 3',
        steps: [
          'Escribe y = 2x + 3.',
          'Intercambia x e y: x = 2y + 3.',
          'Despeja y: x - 3 = 2y → y = (x - 3)/2.',
          'La inversa es f⁻¹(x) = (x - 3)/2.'
        ],
        hints: [
          'Intercambia x e y y despeja y.',
          'Verifica: f(f⁻¹(x)) = x.'
        ],
        solution: 'f⁻¹(x) = (x - 3)/2.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Qué es el dominio de una función?',
        options: [
          'El conjunto de todas las salidas posibles',
          'El conjunto de todas las entradas permitidas',
          'El conjunto de valores que la función realmente toma',
          'La gráfica de la función'
        ],
        correct: 1,
        hints: [
          'El dominio son los valores de entrada (x).',
          'Es para qué valores de x está definida la función.'
        ],
        explanation: 'El dominio es el conjunto de todos los valores de x para los cuales la función está definida.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué prueba determina si una gráfica representa una función?',
        options: [
          'Prueba de la línea horizontal',
          'Prueba de la línea vertical',
          'Prueba del origen',
          'Prueba de simetría'
        ],
        correct: 1,
        hints: [
          'Una función tiene un solo y por cada x.',
          'Si una línea vertical corta la gráfica en más de un punto, no es función.'
        ],
        explanation: 'La prueba de la línea vertical: si alguna línea vertical corta la gráfica en más de un punto, no es una función.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué significa que una función sea biyectiva?',
        options: [
          'Que es inyectiva o suprayectiva',
          'Que es inyectiva y suprayectiva al mismo tiempo',
          'Que no tiene inversa',
          'Que su dominio es todos los reales'
        ],
        correct: 1,
        hints: [
          'Biyectiva = inyectiva + suprayectiva.',
          'Cada entrada tiene una salida única y cada salida tiene una entrada única.'
        ],
        explanation: 'Una función es biyectiva si es inyectiva (una salida por entrada) y suprayectiva (toda salida tiene entrada).'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Función y su inversa',
        description: 'Visualiza una función y su inversa como reflejo sobre y = x',
        type: 'function',
        data: {
          functions: [
            { expr: '2x + 1', color: 'var(--brand-primary)', label: 'f(x) = 2x + 1' },
            { expr: '(x - 1)/2', color: 'var(--brand-secondary)', label: 'f⁻¹(x) = (x - 1)/2' },
            { expr: 'x', color: 'transparent', label: 'y = x' }
          ],
          range: [-5, 10]
        },
        sliders: [
          { var: 'm', min: 1, max: 5, step: 1, default: 2, label: 'Pendiente m' },
          { var: 'b', min: -5, max: 5, step: 1, default: 1, label: 'Intersección b' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Prueba de la línea vertical',
        description: 'Observa si una relación pasa la prueba de la línea vertical',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'x', min: -5, max: 5, step: 0.1, default: 0, label: 'Posición de la línea vertical' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
