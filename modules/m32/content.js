// modules/m32/content.js
// Contenido estructurado — Módulo 32: Integral Definida
// Suma de Riemann, Teorema Fundamental del Cálculo (Barrow), propiedades, cambio de variable, funciones definidas por integrales.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm32',
  title: 'Integral Definida',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['integral definida', 'suma de Riemann', 'teorema fundamental del cálculo', 'área bajo la curva', 'cambio de variable', 'Barrow'],
  learningObjectives: [
    'Entender la integral definida como área bajo la curva',
    'Calcular áreas usando sumas de Riemann',
    'Aplicar el Teorema Fundamental del Cálculo (Barrow)',
    'Usar las propiedades de la integral definida',
    'Aplicar cambio de variable en integrales definidas',
    'Calcular derivadas de funciones definidas por integrales'
  ],
  theory: {
    historicalContext: 'La integral definida nació del problema de calcular áreas de figuras irregulares. Arquímedes (siglo III a.C.) usó el método de agotamiento para calcular el área de un círculo y de un segmento parabólico. Bernhard Riemann (siglo XIX) formalizó el concepto con las sumas de Riemann. El Teorema Fundamental del Cálculo, atribuido a Isaac Barrow (maestro de Newton), conecta la derivada y la integral en una de las relaciones más importantes de las matemáticas.',
    sections: [
      {
        number: '32.1',
        title: 'La integral definida como área',
        content: 'La integral definida de f(x) desde a hasta b representa el área con signo bajo la curva entre x = a y x = b. Las áreas por encima del eje x son positivas y las que están por debajo son negativas. Si f(x) ≥ 0 en [a, b], la integral es simplemente el área de la región bajo la curva.',
        formulas: ['∫[a,b] f(x)dx = área bajo la curva de a hasta b'],
        analogies: [
          'Es como calcular el área de un terreno irregular dividiéndolo en rectángulos muy finos y sumando sus áreas.'
        ]
      },
      {
        number: '32.2',
        title: 'Sumas de Riemann',
        content: 'Una suma de Riemann aproxima el área bajo la curva dividiendo el intervalo [a, b] en n subintervalos y sumando las áreas de rectángulos. A medida que n crece (los rectángulos se hacen más finos), la suma se aproxima a la integral definida. Formalmente, la integral definida es el límite de las sumas de Riemann cuando n tiende a infinito.',
        formulas: ['∫[a,b] f(x)dx = límite cuando n→∞ de Σ f(xᵢ)·Δx'],
        analogies: [
          'Es como aproximar el área de un terreno con fichas de dominó cada vez más delgadas: cuantas más fichas uses, mejor será la aproximación.'
        ]
      },
      {
        number: '32.3',
        title: 'Teorema Fundamental del Cálculo',
        content: 'El Teorema Fundamental del Cálculo conecta la derivada y la integral: si F es una antiderivada de f (F prima = f), entonces la integral definida de f desde a hasta b es F(b) - F(a). Esto significa que para calcular el área bajo la curva, no necesitas sumar infinitos rectángulos: solo necesitas encontrar una antiderivada y evaluarla en los extremos.',
        formulas: ['∫[a,b] f(x)dx = F(b) - F(a), donde F prima = f'],
        analogies: [
          'Es como tener un atajo mágico: en lugar de sumar infinitos rectángulos, solo evalúas la antiderivada en dos puntos y restas.'
        ]
      },
      {
        number: '32.4',
        title: 'Propiedades de la integral definida',
        content: 'La integral definida tiene propiedades importantes: linealidad (la integral de una suma es la suma de las integrales), aditividad (puedes dividir el intervalo), monotonía (si f ≤ g, entonces la integral de f es menor o igual que la de g), y la integral de una constante por una función es la constante por la integral.',
        formulas: ['∫[a,b] (f+g) = ∫[a,b] f + ∫[a,b] g', '∫[a,c] f = ∫[a,b] f + ∫[b,c] f'],
        analogies: [
          'Las propiedades de la integral son como las reglas de la aritmética: permiten descomponer problemas complejos en partes más simples.'
        ]
      },
      {
        number: '32.5',
        title: 'Cambio de variable en integrales definidas',
        content: 'El cambio de variable en integrales definidas funciona como en las indefinidas, pero con una diferencia importante: cuando sustituyes u = g(x), también debes cambiar los límites de integración (los valores de u correspondientes a x = a y x = b). Esto elimina la necesidad de volver a la variable original.',
        formulas: ['∫[a,b] f(g(x))·g prima dx = ∫[g(a),g(b)] f(u)du'],
        analogies: [
          'El cambio de límites es como actualizar las instrucciones del mapa cuando cambias de sistema de coordenadas.'
        ]
      },
      {
        number: '32.6',
        title: 'Funciones definidas por integrales',
        content: 'Una función puede definirse como una integral con límite superior variable: F(x) = integral desde a hasta x de f(t)dt. El Teorema Fundamental del Cálculo (parte 1) dice que la derivada de esta función es f(x): F prima de x = f(x). Esto es la base de las funciones especiales como la función error y la función logaritmo integral.',
        formulas: ['F(x) = ∫[a,x] f(t)dt → F prima de x = f(x)'],
        analogies: [
          'Una función definida por integral es como acumular área desde un punto fijo hasta un punto variable.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que la integral definida siempre da un área positiva',
        description: 'La integral definida da un área CON SIGNO: las áreas por encima del eje x son positivas y las que están por debajo son negativas. Si la función cruza el eje, las áreas se cancelan.',
        remediation: 'Recordar que la integral definida es área con signo. Para el área total (sin signo), usar el valor absoluto de la función.'
      },
      {
        name: 'Olvidar cambiar los límites al hacer sustitución',
        description: 'Al hacer cambio de variable en una integral definida, los límites de integración deben cambiar a los valores de u correspondientes. Olvidar cambiar los límites es un error común.',
        remediation: 'Recordar: cuando cambias de variable, también cambias los límites de integración.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Calcular un área bajo la curva',
        type: 'Área',
        estimatedMinutes: 6,
        question: 'Calcula el área bajo la curva y = x² desde x = 0 hasta x = 3.',
        steps: [
          'Encuentra una antiderivada: la antiderivada de x² es x³/3.',
          'Aplica el Teorema Fundamental: F(3) - F(0) = 27/3 - 0 = 9.',
          'Resultado: el área es 9 unidades cuadradas.'
        ],
        hints: [
          'Encuentra la antiderivada de la función.',
          'Evalúa en los límites y resta.'
        ],
        solution: '9 unidades cuadradas.'
      },
      {
        title: 'Suma de Riemann',
        type: 'Aproximación',
        estimatedMinutes: 6,
        question: 'Aproxima la integral de x² desde 0 hasta 2 usando 4 rectángulos.',
        steps: [
          'Divide [0, 2] en 4 subintervalos de ancho Δx = 0.5.',
          'Los puntos medios son: 0.25, 0.75, 1.25, 1.75.',
          'Alturas: f(0.25) = 0.0625, f(0.75) = 0.5625, f(1.25) = 1.5625, f(1.75) = 3.0625.',
          'Suma: 0.5 × (0.0625 + 0.5625 + 1.5625 + 3.0625) = 0.5 × 5.25 = 2.625.',
          'El valor exacto es 8/3 ≈ 2.667. La aproximación es cercana.'
        ],
        hints: [
          'Divide el intervalo en subintervalos iguales.',
          'Evalúa la función en el punto medio de cada subintervalo.'
        ],
        solution: 'Aproximación: 2.625 (valor exacto: 8/3 ≈ 2.667).'
      },
      {
        title: 'Propiedades de la integral',
        type: 'Propiedades',
        estimatedMinutes: 6,
        question: 'Si la integral de f desde 0 hasta 2 es 5 y la integral de f desde 2 hasta 4 es 3, ¿cuánto vale la integral de f desde 0 hasta 4?',
        steps: [
          'Usa la propiedad de aditividad: la integral de a hasta c es la suma de las integrales de a hasta b y de b hasta c.',
          'Aplica: integral de 0 hasta 4 = integral de 0 hasta 2 + integral de 2 hasta 4 = 5 + 3 = 8.',
          'Resultado: 8.'
        ],
        hints: [
          'Usa la propiedad de aditividad de la integral.'
        ],
        solution: '8.'
      },
      {
        title: 'Cambio de variable con límites',
        type: 'Cambio de variable',
        estimatedMinutes: 7,
        question: 'Calcula la integral de 2x(x²+1)³ dx desde 0 hasta 1.',
        steps: [
          'Sustituye u = x² + 1, du = 2x dx.',
          'Cuando x = 0: u = 1. Cuando x = 1: u = 2.',
          'La integral se convierte en: integral de u³ du desde 1 hasta 2.',
          'Integra: u⁴/4 evaluado de 1 a 2 = 16/4 - 1/4 = 15/4.',
          'Resultado: 15/4.'
        ],
        hints: [
          'Sustituye u = x² + 1 y cambia los límites.',
          'Los nuevos límites son u = 1 y u = 2.'
        ],
        solution: '15/4.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Qué representa la integral definida de f(x) desde a hasta b?',
        options: [
          'La pendiente de la recta tangente',
          'El área con signo bajo la curva entre a y b',
          'La antiderivada de f',
          'El valor máximo de f'
        ],
        correct: 1,
        hints: [
          'La integral definida representa un área.',
          'Es el área con signo bajo la curva entre los límites de integración.'
        ],
        explanation: 'La integral definida representa el área con signo bajo la curva de f(x) entre x = a y x = b.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué dice el Teorema Fundamental del Cálculo?',
        options: [
          'Que la derivada de una integral es cero',
          'Que la integral definida se calcula evaluando la antiderivada en los extremos',
          'Que todas las funciones son integrables',
          'Que la integral es siempre positiva'
        ],
        correct: 1,
        hints: [
          'El Teorema Fundamental conecta la derivada y la integral.',
          'Permite calcular integrales sin sumar infinitos rectángulos.'
        ],
        explanation: 'El Teorema Fundamental del Cálculo dice que la integral definida de f desde a hasta b es F(b) - F(a), donde F es una antiderivada de f.'
      },
      {
        type: 'multiple-choice',
        question: 'Si F(x) = integral desde 1 hasta x de t² dt, ¿cuál es F prima de x?',
        options: [
          'x²',
          'x³/3',
          '2x',
          '1'
        ],
        correct: 0,
        hints: [
          'Aplica la parte 1 del Teorema Fundamental.',
          'La derivada de la integral con límite variable es la función integrando evaluada en el límite superior.'
        ],
        explanation: 'F prima de x = x² por el Teorema Fundamental del Cálculo (parte 1).'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Sumas de Riemann',
        description: 'Observa cómo la aproximación mejora al aumentar el número de rectángulos',
        type: 'function',
        data: {
          functions: [],
          range: [0, 3]
        },
        sliders: [
          { var: 'n', min: 1, max: 20, step: 1, default: 4, label: 'Número de rectángulos' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Área bajo la curva',
        description: 'Visualiza el área entre dos límites de integración',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'a', min: -5, max: 5, step: 0.5, default: 0, label: 'Límite inferior a' },
          { var: 'b', min: -5, max: 5, step: 0.5, default: 3, label: 'Límite superior b' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
