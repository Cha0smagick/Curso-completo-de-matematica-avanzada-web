// modules/m07/content.js
// Contenido estructurado — Módulo 7: Enteros
// Recta numérica extendida, valor absoluto, operaciones con signos, potencias enteras.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm07',
  title: 'Enteros',
  estimatedMinutes: 60,
  difficulty: 3,
  tags: ['enteros', 'números negativos', 'recta numérica', 'valor absoluto', 'operaciones con signos', 'potencias enteras'],
  learningObjectives: [
    'Entender qué son los números enteros (positivos, negativos y cero)',
    'Ubicar enteros en la recta numérica extendida',
    'Operar con enteros (suma, resta, multiplicación, división) respetando los signos',
    'Entender el valor absoluto como distancia desde el cero',
    'Elevar enteros a potencias enteras'
  ],
  theory: {
    historicalContext: 'Los números negativos fueron rechazados durante siglos por ser "absurdos" (¿cómo puede haber -3 manzanas?). Los chinos los usaban hace 2000 años para deudas, pero en Europa no se aceptaron hasta el siglo XVII. John Wallis y otros los popularizaron con la recta numérica extendida, donde el cero es el origen y los negativos van a la izquierda.',
    sections: [
      {
        number: '7.1',
        title: 'Qué son los enteros',
        content: 'Los enteros son los números naturales, sus opuestos (negativos) y el cero: ..., -3, -2, -1, 0, 1, 2, 3, ... Se denotan con Z (del alemán Zahlen, números). Representan cantidades que pueden ir en dos direcciones: temperatura bajo cero, deuda, altitud bajo el nivel del mar.',
        formulas: ['\\mathbb{Z} = {..., -2, -1, 0, 1, 2, ...}'],
        analogies: [
          'Es como un ascensor en un edificio con sótanos: el piso 0 es la planta baja, los pisos positivos están arriba, los negativos (sótanos) están abajo.'
        ]
      },
      {
        number: '7.2',
        title: 'Recta numérica extendida',
        content: 'La recta numérica se extiende a la izquierda del cero para los negativos. Cada entero ocupa una posición única. Cuanto más a la izquierda, menor es el número: -5 < -3 porque -5 está más a la izquierda. La distancia entre dos enteros es el valor absoluto de su diferencia.',
        formulas: ['-5 < -3', '|a - b|'],
        analogies: [
          'Es como una escalera que va hacia arriba (positivos) y hacia abajo (negativos) desde el suelo (cero). Cuanto más bajas, más bajo es el número.'
        ]
      },
      {
        number: '7.3',
        title: 'Valor absoluto',
        content: 'El valor absoluto de un número es su distancia desde el cero, sin importar la dirección. Siempre es positivo o cero: |-5| = 5, |5| = 5, |0| = 0. Se usa para medir distancias sin importar en qué dirección vayas.',
        formulas: ['|x|', '|-5| = 5', '|5| = 5'],
        analogies: [
          'Es como la distancia desde tu casa: si caminas 5 cuadras al este o 5 cuadras al oeste, la distancia desde tu casa es 5 cuadras en ambos casos.'
        ]
      },
      {
        number: '7.4',
        title: 'Suma y resta de enteros',
        content: 'Sumar enteros es combinar movimientos en la recta: +3 significa mover 3 a la derecha, -2 significa mover 2 a la izquierda. Restar un número es sumar su opuesto: 5 - (-3) = 5 + 3 = 8. Los signos importan: mismo signo se suman los valores absolutos y se mantiene el signo; signos distintos se restan los valores absolutos y se toma el signo del mayor valor absoluto.',
        formulas: ['5 - (-3) = 5 + 3 = 8', 'a + (-b) = a - b'],
        analogies: [
          'Es como dinero: +5 es ganar 5 pesos, -3 es deber 3 pesos. Ganar 5 y luego deber 3 te deja con 2 pesos netos.'
        ]
      },
      {
        number: '7.5',
        title: 'Multiplicación y división de enteros',
        content: 'La regla de signos: iguales dan positivo, distintos dan negativo. (+)×(+) = (+), (−)×(−) = (+), (+)×(−) = (−), (−)×(+) = (−). La división sigue la misma regla. Esto se puede entender con patrones: 3×2=6, 3×1=3, 3×0=0, 3×(-1)=-3, 3×(-2)=-6.',
        formulas: ['(+)×(−) = (−)', '(−)×(−) = (+)'],
        analogies: [
          'Es como películas: una película buena (+) que termina bien (+) es una buena experiencia (+). Una película mala (−) que termina mal (−) al final es una buena experiencia (+) porque aprendiste de ella.'
        ]
      },
      {
        number: '7.6',
        title: 'Potencias enteras',
        content: 'Elevar un entero a una potencia entera significa multiplicarlo por sí mismo tantas veces como diga el exponente. El signo del resultado depende de la base y del exponente: base negativa con exponente par da positivo, con exponente impar da negativo. Cualquier número elevado a 0 es 1 (excepto 0^0 que es indeterminado).',
        formulas: ['(-2)^3 = -8', '(-2)^4 = 16', 'x^0 = 1'],
        analogies: [
          'Es como espejos: un negativo elevado a potencia par es como dos espejos enfrentados (el negativo se cancela), con potencia impar es como un solo espejo (se mantiene el negativo).'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que -5 es mayor que -3 porque 5 > 3',
        description: 'Los estudiantes aplican la lógica de los positivos a los negativos y piensan que -5 > -3. Pero en la recta numérica, -5 está más a la izquierda que -3, así que -5 < -3.',
        remediation: 'Siempre usar la recta numérica para comparar negativos: más a la izquierda es menor.'
      },
      {
        name: 'Creer que dos negativos multiplicados dan negativo',
        description: 'Confusión con la regla de signos: (−)×(−) = (+), no (−).',
        remediation: 'Usar el patrón: 3×(-2)=-6, 2×(-2)=-4, 1×(-2)=-2, 0×(-2)=0, (-1)×(-2)=2. El resultado va subiendo de 2 en 2.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Ubicar en la recta',
        type: 'Recta numérica',
        estimatedMinutes: 5,
        question: '¿Dónde está -4 en una recta numérica del -10 al 10? ¿Está más cerca del 0 o del -10?',
        steps: [
          'Identifica el 0 en el centro.',
          'Cuenta 4 unidades hacia la izquierda.',
          'El -4 está a 4 unidades del 0 y a 6 unidades del -10.',
          'Está más cerca del 0.'
        ],
        hints: [
          'Los negativos van a la izquierda del cero.',
          'Cuenta las unidades desde el 0.'
        ],
        solution: 'El -4 está más cerca del 0 (distancia 4) que del -10 (distancia 6).'
      },
      {
        title: 'Valor absoluto',
        type: 'Valor absoluto',
        estimatedMinutes: 4,
        question: '¿Cuál es |-7|? ¿Y |7|? ¿Son iguales?',
        steps: [
          '|-7| es la distancia de -7 al 0: 7.',
          '|7| es la distancia de 7 al 0: 7.',
          'Son iguales porque ambos están a 7 unidades del cero.'
        ],
        hints: [
          'El valor absoluto siempre es positivo o cero.',
          'Piensa en distancia, no en dirección.'
        ],
        solution: '|-7| = 7 y |7| = 7. Sí, son iguales.'
      },
      {
        title: 'Suma de enteros',
        type: 'Operación',
        estimatedMinutes: 5,
        question: 'Calcula: -3 + 5',
        steps: [
          'Empieza en -3 en la recta numérica.',
          'Mueve 5 unidades a la derecha (porque es +5).',
          '-3 + 5 = 2.',
          'Verifica: -3, -2, -1, 0, 1, 2.'
        ],
        hints: [
          'El signo positivo significa mover a la derecha.',
          'Empieza en el primer número.'
        ],
        solution: '-3 + 5 = 2.'
      },
      {
        title: 'Regla de signos',
        type: 'Multiplicación',
        estimatedMinutes: 5,
        question: '¿Cuál es el resultado de (-4) × (-3)?',
        steps: [
          'Signo negativo por signo negativo da positivo.',
          'Multiplica los valores absolutos: 4 × 3 = 12.',
          'El resultado es +12.'
        ],
        hints: [
          'Iguales dan positivo.',
          '4 × 3 = 12, y el signo es +.'
        ],
        solution: '(-4) × (-3) = 12.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es menor: -5 o -3?',
        options: [
          '-5',
          '-3',
          'Son iguales',
          'No se pueden comparar'
        ],
        correct: 0,
        hints: [
          'En la recta numérica, más a la izquierda es menor.',
          '-5 está más a la izquierda que -3.'
        ],
        explanation: '-5 < -3 porque -5 está más a la izquierda en la recta numérica.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es |-8|?',
        options: [
          '-8',
          '8',
          '0',
          'No tiene valor absoluto'
        ],
        correct: 1,
        hints: [
          'El valor absoluto es la distancia desde el cero.',
          'La distancia de -8 al 0 es 8.'
        ],
        explanation: '|-8| = 8 porque -8 está a 8 unidades del cero.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el resultado de (-2) × (-5)?',
        options: [
          '-10',
          '10',
          '-7',
          '7'
        ],
        correct: 1,
        hints: [
          'Negativo por negativo da positivo.',
          '2 × 5 = 10.'
        ],
        explanation: 'Dos signos negativos multiplicados dan positivo: (-2) × (-5) = 10.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Recta numérica con enteros',
        description: 'Arrastra el punto para ver positivos y negativos en la recta',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'x', min: -10, max: 10, step: 1, default: -3, label: 'Posición x' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Valor absoluto como distancia',
        description: 'Visualiza cómo el valor absoluto mide distancia desde el cero',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'x', min: -10, max: 10, step: 1, default: -5, label: 'Posición x' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
