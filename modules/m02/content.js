// modules/m02/content.js
// Contenido estructurado — Módulo 2: Sentido numérico
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm02',
  title: 'Sentido numérico',
  estimatedMinutes: 45,
  difficulty: 2,
  tags: ['estimación', 'magnitud', 'recta numérica', 'benchmarking'],
  learningObjectives: [
    'Estimar magnitudes sin contar uno a uno',
    'Ubicar números en la recta numérica con referencia visual',
    'Usar puntos de referencia (benchmarks) para comparar cantidades',
    'Entender que los números son posiciones y distancias, no solo etiquetas'
  ],
  theory: {
    historicalContext: 'Mucho antes de los símbolos escritos, los humanos necesitaban saber si una cantidad era "mucha" o "poca". El sentido numérico es esa intuición innata que permite saber, sin contar, si hay más lobos que ovejas en el horizonte. Fue estudiado formalmente por Stanislas Dehaene y su teoría del "número aproximado".',
    sections: [
      {
        number: '2.1',
        title: 'Magnitud: números como tamaño',
        content: 'La magnitud es la propiedad de un número que responde a "qué tan grande es". No se trata del símbolo escrito, sino de la cantidad que representa. 1.000.000 es mucho más grande que 1.000, aunque ambos tengan cuatro dígitos. Nuestro cerebro no procesa todos los números con la misma facilidad: distinguir 5 de 6 es instantáneo, pero distinguir 105 de 106 requiere más esfuerzo. Esto se conoce como el "efecto de distancia numérica": cuanto más cercanos son dos números, más tiempo tardamos en compararlos.',
        formulas: ['|a - b|'],
        analogies: [
          'Imagina que tienes dos bolsas de canicas. Una tiene 5, la otra tiene 6. Sin contar, ves enseguida cuál tiene más. Ahora imagina que una tiene 105 y la otra 106. La diferencia sigue siendo una canica, pero ahora cuesta mucho más verla a simple vista.'
        ]
      },
      {
        number: '2.2',
        title: 'La recta numérica como mapa mental',
        content: 'La recta numérica no es solo una herramienta escolar: es el mapa mental que usa tu cerebro para ubicar números. Cada número ocupa una posición única. El 0 es el origen. A la derecha están los positivos, a la izquierda los negativos. La distancia entre dos números cualquiera es la diferencia absoluta entre ellos.',
        formulas: ['|x - y|'],
        analogies: [
          'Piensa en la recta numérica como una carretera. El kilómetro 0 es tu casa. El kilómetro 5 está a 5 unidades de distancia. El kilómetro 100 está mucho más lejos, aunque el símbolo "100" tenga el mismo número de dígitos que "10".'
        ]
      },
      {
        number: '2.3',
        title: 'Benchmarking mental: puntos de referencia',
        content: 'El benchmarking mental es usar números conocidos (puntos de referencia) para estimar números desconocidos. Los benchmarks más comunes son 0, 10, 100, 1000, etc. Si ves una multitud y sabes que hay aproximadamente 100 personas en un grupo, puedes estimar si el estadio tiene 5.000 o 50.000 multiplicando mentalmente.',
        formulas: ['x \\approx benchmark \\times n'],
        analogies: [
          'Es como saber que una manzana pesa unos 150 gramos. Si ves una bolsa con 10 manzanas, estimas que pesa unos 1,5 kg sin ponerla en la balanza.'
        ]
      },
      {
        number: '2.4',
        title: 'Subitizing conceptual y descomposición',
        content: 'Ya vimos en el módulo anterior el subitizing perceptual (1-4 elementos). El subitizing conceptual es descomponer mentalmente grupos mayores en subgrupos conocidos. Ver 7 puntos y ver "3 y 4" o "5 y 2". Esta habilidad es la base del cálculo mental.',
        formulas: [],
        analogies: [
          'Cuando ves los dados y sacas 7, no cuentas punto por punto: ves un grupo de 5 (la cara del dado) y 2 más. Tu cerebro descompone automáticamente.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que el número más largo es siempre el mayor',
        description: 'Los estudiantes piensan que 1.000 es mayor que 999 porque tiene más dígitos, pero en decimales 0.5 es mayor que 0.49 aunque 0.49 tenga más dígitos.',
        remediation: 'Comparar números en la recta numérica y entender que la longitud del símbolo no equivale a magnitud.'
      },
      {
        name: 'Confundir número con etiqueta',
        description: 'Pensar que el número de una camiseta de fútbol (el 10) es una cantidad que se puede sumar o restar.',
        remediation: 'Distinguir números cardinales (cuántos) de números nominales (etiquetas, códigos).'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Estimar sin contar',
        type: 'Estimación',
        estimatedMinutes: 5,
        question: 'Mira este grupo de puntos durante 2 segundos. ¿Cuántos hay aproximadamente? ● ● ● ● ● ● ● ● ● ●',
        steps: [
          'Mira el grupo sin contar uno a uno.',
          'Descompón mentalmente: ¿ves grupos de 5?',
          'Suma los grupos: 5 + 5 = 10.',
          'Verifica que tu estimación esté cerca de 10.'
        ],
        hints: [
          'Intenta ver dos grupos de 5 en lugar de contar individualmente.',
          'No necesitas el número exacto, solo una estimación cercana.'
        ],
        solution: 'Hay 10 puntos. Si respondiste entre 8 y 12, tu sentido numérico está funcionando bien.'
      },
      {
        title: 'Ubica en la recta numérica',
        type: 'Ubicación',
        estimatedMinutes: 7,
        question: '¿Dónde está el 7 en una recta del 0 al 10? ¿Está más cerca del 5 o del 10?',
        steps: [
          'Identifica el punto medio: el 5 está exactamente en la mitad.',
          'El 7 está a 2 unidades del 5, por lo tanto está más cerca del 5 que del 10.',
          'Visualiza: 0 --- 5 --- 7 --- 10.'
        ],
        hints: [
          'Piensa en la distancia desde el 0 hasta cada número.',
          'El 7 supera la mitad (5), así que está en la segunda mitad de la recta.'
        ],
        solution: 'El 7 está más cerca del 5 (distancia 2) que del 10 (distancia 3). Está en la segunda mitad de la recta.'
      },
      {
        title: 'Benchmarking mental',
        type: 'Estimación',
        estimatedMinutes: 6,
        question: 'Si una caja de huevos tiene 12 unidades y ves 3 cajas apiladas, ¿cuántos huevos hay aproximadamente sin multiplicar exactamente?',
        steps: [
          'Reconoce el benchmark: 1 huevo ≈ 1 unidad, 1 caja = 12.',
          'Estima: 3 cajas ≈ 3 × 12.',
          'Calcula mentalmente: 3 × 10 = 30, 3 × 2 = 6, total 36.'
        ],
        hints: [
          'Usa el 10 como referencia: 3 cajas de 10 son 30.',
          'Añade el resto: 3 cajas de 2 son 6 más.'
        ],
        solution: 'Aproximadamente 36 huevos. El benchmarking te da la respuesta sin necesidad de calcular exactamente 12 × 3.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Qué es el "efecto de distancia numérica"?',
        options: [
          'Que los números más lejos en la recta son más difíciles de comparar',
          'Que los números más cercanos entre sí son más difíciles de comparar',
          'Que solo funciona con números pares',
          'Que no existe en matemáticas reales'
        ],
        correct: 1,
        hints: [
          'Piensa en comparar 5 vs 6 frente a 105 vs 106.',
          'Cuanto más cercanos son dos números, más se parecen visualmente.'
        ],
        explanation: 'El efecto de distancia numérica dice que cuánto más cercanos son dos números (menor distancia absoluta entre ellos), más tiempo tarda nuestro cerebro en distinguir cuál es mayor. 5 y 6 se distinguen instantáneamente; 105 y 106 requieren más esfuerzo.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál de los siguientes NO es un punto de referencia (benchmark) común?',
        options: [
          '0',
          '10',
          '100',
          '3.14159'
        ],
        correct: 3,
        hints: [
          'Los benchmarks son números redondos y fáciles de usar mentalmente.',
          'Pi es una constante matemática, no un punto de referencia para estimación mental cotidiana.'
        ],
        explanation: 'Los benchmarks son números redondos como 0, 10, 100, 1000 que usamos para estimar otras cantidades. Pi (3.14159...) es una constante específica, no un benchmark general.'
      },
      {
        type: 'multiple-choice',
        question: 'En una recta numérica del 0 al 20, ¿dónde está el 14?',
        options: [
          'Más cerca del 0 que del 20',
          'Exactamente en el medio',
          'Más cerca del 20 que del 0',
          'Fuera de la recta'
        ],
        correct: 2,
        hints: [
          'El punto medio del 0 al 20 es el 10.',
          'El 14 está después del 10, así que está más cerca del 20.'
        ],
        explanation: 'El 14 está a 4 unidades del 10 y a 6 unidades del 20, pero comparado con el 0 (distancia 14), está mucho más cerca del 20. Está en el 70% de la recta.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Recta numérica con benchmarking',
        description: 'Arrastra el punto para ver cómo se ubica respecto a los benchmarks de 5, 10 y 15',
        type: 'function',
        data: {
          functions: [
            { expr: 'x', color: 'var(--brand-primary)', label: 'Posición x' },
            { expr: '0', color: 'transparent', label: '' },
            { expr: '20', color: 'transparent', label: '' }
          ],
          range: [0, 20]
        },
        sliders: [
          { var: 'x', min: 0, max: 20, step: 1, default: 7, label: 'Posición x' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Efecto de distancia numérica',
        description: 'Compara dos números y observa qué tan fácil es distinguir cuál es mayor',
        type: 'function',
        data: {
          functions: [],
          range: [0, 100]
        },
        sliders: [
          { var: 'a', min: 0, max: 100, step: 1, default: 45, label: 'Número A' },
          { var: 'b', min: 0, max: 100, step: 1, default: 46, label: 'Número B' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
