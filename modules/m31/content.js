// modules/m31/content.js
// Contenido estructurado — Módulo 31: Integral Indefinida
// Antiderivada, integración inmediata, sustitución, partes, fracciones parciales, sustitución trigonométrica.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm31',
  title: 'Integral Indefinida',
  estimatedMinutes: 90,
  difficulty: 4,
  tags: ['integral indefinida', 'antiderivada', 'integración inmediata', 'sustitución', 'integración por partes', 'fracciones parciales'],
  learningObjectives: [
    'Entender qué es una antiderivada y su relación con la derivada',
    'Aplicar la integración inmediata usando la tabla de integrales',
    'Aplicar el método de sustitución',
    'Aplicar la integración por partes',
    'Resolver integrales usando fracciones parciales',
    'Aplicar sustitución trigonométrica'
  ],
  theory: {
    historicalContext: 'La integración se originó con el problema de calcular áreas y volúmenes. Arquímedes (siglo III a.C.) usó el método de agotamiento para calcular áreas. Newton y Leibniz (siglo XVII) desarrollaron el cálculo integral como la operación inversa de la derivación. El Teorema Fundamental del Cálculo (Barrow) conecta la derivada y la integral.',
    sections: [
      {
        number: '31.1',
        title: 'Qué es una antiderivada',
        content: 'Una antiderivada de una función f es una función F cuya derivada es f: F prima = f. La integral indefinida de f es la familia de todas las antiderivadas: la integral de f dx es F(x) + C, donde C es una constante arbitraria (porque la derivada de una constante es cero).',
        formulas: ['∫f(x)dx = F(x) + C, donde F prima = f'],
        analogies: [
          'La integral es como la operación inversa de la derivada: si derivar va hacia adelante, integrar va hacia atrás.'
        ]
      },
      {
        number: '31.2',
        title: 'Integración inmediata',
        content: 'La integración inmediata usa una tabla de integrales conocidas: la integral de x elevado a n es x elevado a n+1 dividido entre n+1; la integral de 1/x es el logaritmo natural del valor absoluto de x; la integral de e elevado a x es e elevado a x; la integral de sen x es menos cos x; la integral de cos x es sen x.',
        formulas: ['∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ -1)', '∫(1/x)dx = ln|x| + C', '∫eˣdx = eˣ + C', '∫sen x dx = -cos x + C', '∫cos x dx = sen x + C'],
        analogies: [
          'Es como aprender la tabla de multiplicar: una vez memorizadas las integrales básicas, puedes resolver muchas rápidamente.'
        ]
      },
      {
        number: '31.3',
        title: 'Método de sustitución',
        content: 'La sustitución es la regla de la cadena al revés: si tienes una integral de la forma integral de f(g(x)) por g prima de x, puedes sustituir u = g(x) y du = g prima de x dx, transformando la integral en una más simple: integral de f(u) du. Al final, sustituye u de vuelta en términos de x.',
        formulas: ['∫f(g(x))·g prima de x dx = ∫f(u)du con u = g(x)'],
        analogies: [
          'La sustitución es como cambiar de variable para simplificar el problema, y luego volver a la variable original.'
        ]
      },
      {
        number: '31.4',
        title: 'Integración por partes',
        content: 'La integración por partes se deriva de la regla del producto de derivadas: la integral de u dv es u por v menos la integral de v du. Se usa para integrales de productos de funciones de tipos diferentes (como x por e elevado a x, o x por sen x). La clave es elegir u y dv correctamente.',
        formulas: ['∫u dv = uv - ∫v du'],
        analogies: [
          'La integración por partes es como dividir un problema difícil en dos partes más fáciles.'
        ]
      },
      {
        number: '31.5',
        title: 'Fracciones parciales',
        content: 'Las fracciones parciales se usan para integrar funciones racionales (cociente de polinomios). Se descompone la fracción en una suma de fracciones más simples que se pueden integrar fácilmente. Los factores del denominador determinan la forma de la descomposición.',
        formulas: ['1/((x-a)(x-b)) = A/(x-a) + B/(x-b)'],
        analogies: [
          'Es como descomponer una fracción compleja en fracciones más simples que se pueden integrar por separado.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Olvidar la constante de integración C',
        description: 'La integral indefinida incluye una constante arbitraria C porque la derivada de una constante es cero. Olvidar C es un error muy común.',
        remediation: 'Siempre añadir + C al final de cada integral indefinida.'
      },
      {
        name: 'Confundir la integral de x con la de 1/x',
        description: 'La integral de x dx es x²/2 + C, pero la integral de 1/x dx es ln|x| + C (caso especial porque el exponente sería -1).',
        remediation: 'Recordar que la fórmula x elevado a n+1 dividido entre n+1 no aplica cuando n = -1 (daría división por cero).'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Integración inmediata',
        type: 'Integración',
        estimatedMinutes: 5,
        question: 'Calcula la integral de x³ dx.',
        steps: [
          'Usa la fórmula: integral de x elevado a n dx = x elevado a n+1 dividido entre n+1 más C.',
          'Sustituye n = 3: integral de x³ dx = x⁴/4 + C.',
          'Resultado: x⁴/4 + C.'
        ],
        hints: [
          'Aplica la regla de la potencia para integrales.',
          'Sube el exponente en 1 y divide entre el nuevo exponente.'
        ],
        solution: 'x⁴/4 + C.'
      },
      {
        title: 'Método de sustitución',
        type: 'Sustitución',
        estimatedMinutes: 7,
        question: 'Calcula la integral de 2x · (x² + 1)³ dx.',
        steps: [
          'Sustituye u = x² + 1.',
          'Entonces du = 2x dx.',
          'La integral se convierte en: integral de u³ du.',
          'Integra: u⁴/4 + C.',
          'Sustituye de vuelta: (x² + 1)⁴/4 + C.',
          'Resultado: (x² + 1)⁴/4 + C.'
        ],
        hints: [
          'Identifica una función y su derivada dentro del integrando.',
          'Sustituye u = función, du = derivada dx.'
        ],
        solution: '(x² + 1)⁴/4 + C.'
      },
      {
        title: 'Integración por partes',
        type: 'Por partes',
        estimatedMinutes: 7,
        question: 'Calcula la integral de x · e^x dx.',
        steps: [
          'Usa integración por partes: integral de u dv = uv - integral de v du.',
          'Elige u = x (se simplifica al derivar) y dv = e^x dx.',
          'Entonces du = dx y v = e^x.',
          'Aplica: x·e^x - integral de e^x dx = x·e^x - e^x + C.',
          'Resultado: x·e^x - e^x + C.'
        ],
        hints: [
          'Elige u para que se simplifique al derivar.',
          'dv debe ser algo que sepas integrar.'
        ],
        solution: 'x·e^x - e^x + C.'
      },
      {
        title: 'Fracciones parciales',
        type: 'Fracciones parciales',
        estimatedMinutes: 8,
        question: 'Calcula la integral de 1/((x-1)(x+2)) dx.',
        steps: [
          'Descompón en fracciones parciales: 1/((x-1)(x+2)) = A/(x-1) + B/(x+2).',
          'Multiplica por el denominador común: 1 = A(x+2) + B(x-1).',
          'Para x = 1: 1 = 3A, así A = 1/3.',
          'Para x = -2: 1 = -3B, así B = -1/3.',
          'Integra cada fracción: (1/3)ln|x-1| - (1/3)ln|x+2| + C.',
          'Resultado: (1/3)ln|(x-1)/(x+2)| + C.'
        ],
        hints: [
          'Descompón la fracción en fracciones más simples.',
          'Cada fracción simple se integra como logaritmo.'
        ],
        solution: '(1/3)ln|(x-1)/(x+2)| + C.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es la integral de x² dx?',
        options: [
          'x³/3 + C',
          '2x + C',
          'x³ + C',
          '2x² + C'
        ],
        correct: 0,
        hints: [
          'Sube el exponente en 1 y divide entre el nuevo exponente.',
          'x² se convierte en x³/3.'
        ],
        explanation: 'La integral de x² dx es x³/3 + C.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es la integral de 1/x dx?',
        options: [
          'x²/2 + C',
          'ln|x| + C',
          '1/x² + C',
          'e^x + C'
        ],
        correct: 1,
        hints: [
          'Es un caso especial de la fórmula de la potencia.',
          'Cuando n = -1, la integral es el logaritmo natural.'
        ],
        explanation: 'La integral de 1/x dx es ln|x| + C.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué método usarías para calcular la integral de x · cos(x) dx?',
        options: [
          'Integración inmediata',
          'Sustitución',
          'Integración por partes',
          'Fracciones parciales'
        ],
        correct: 2,
        hints: [
          'Es un producto de dos funciones de tipos diferentes.',
          'La integración por partes es ideal para productos de polinomios y trigonométricas.'
        ],
        explanation: 'x por cos(x) se resuelve con integración por partes.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Función y su antiderivada',
        description: 'Observa cómo la antiderivada es la operación inversa de la derivada',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'a', min: -3, max: 3, step: 0.1, default: 1, label: 'Coeficiente a' },
          { var: 'C', min: -5, max: 5, step: 1, default: 0, label: 'Constante C' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Familia de antiderivadas',
        description: 'Observa cómo la constante C genera una familia de curvas paralelas',
        type: 'function',
        data: {
          functions: [],
          range: [-5, 5]
        },
        sliders: [
          { var: 'C', min: -5, max: 5, step: 1, default: 0, label: 'Constante C' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
