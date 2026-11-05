// modules/m08/content.js
// Contenido estructurado — Módulo 8: Racionales
// Fracciones (modelos: área, recta, conjunto), decimales exactos/periódicos, conversión, porcentaje, razón, proporción.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm08',
  title: 'Racionales',
  estimatedMinutes: 90,
  difficulty: 3,
  tags: ['fracciones', 'decimales', 'porcentaje', 'razón', 'proporción', 'números racionales'],
  learningObjectives: [
    'Entender qué es un número racional y cómo se representa como fracción',
    'Usar tres modelos de fracción: área, recta y conjunto',
    'Convertir entre fracciones y decimales (exactos y periódicos)',
    'Entender porcentaje como fracción con denominador 100',
    'Resolver problemas de razón y proporción'
  ],
  theory: {
    historicalContext: 'Los fracciones se usaron en el antiguo Egipto (fracciones unitarias) y en Babilonia (sistema base 60). La palabra "fracción" viene del latín "fractus" (roto, dividido). Los números racionales (de "ratio", razón) son todos los que se pueden escribir como cociente de dos enteros. Los antiguos griegos descubrieron que no todos los números son racionales (√2 no lo es), lo que provocó una crisis en su matemática.',
    sections: [
      {
        number: '8.1',
        title: 'Qué son los números racionales',
        content: 'Un número racional es cualquier número que se puede escribir como fracción a/b, donde a y b son enteros y b no es cero. La palabra proviene de "ratio" (razón, relación). Incluye enteros (3 = 3/1), fracciones propias (1/2), impropias (5/3), y decimales exactos o periódicos.',
        formulas: ['a/b', 'b ≠ 0'],
        analogies: [
          'Es como compartir una pizza: si la divides en 4 partes y tomas 1, tienes 1/4 de la pizza.'
        ]
      },
      {
        number: '8.2',
        title: 'Modelos de fracción: área, recta y conjunto',
        content: 'Una fracción se puede ver de tres formas: (1) Área: dividir una figura en partes iguales y colorear algunas. (2) Recta: ubicar la fracción como una posición entre 0 y 1. (3) Conjunto: tomar una parte de un grupo de objetos. Los tres modelos ayudan a entender la fracción desde diferentes perspectivas.',
        formulas: ['1/4', '3/4'],
        analogies: [
          'Área: una pizza cortada en 8, tomas 3 → 3/8. Recta: en la recta del 0 al 1, 3/8 está a 3/8 del camino. Conjunto: 10 canicas, 3 son rojas → 3/10 son rojas.'
        ]
      },
      {
        number: '8.3',
        title: 'Fracciones equivalentes y simplificación',
        content: 'Dos fracciones son equivalentes si representan la misma cantidad: 1/2 = 2/4 = 3/6. Se simplifican dividiendo numerador y denominador por su MCD. Una fracción es irreducible cuando numerador y denominador son coprimos (MCD = 1).',
        formulas: ['1/2 = 2/4', 'MCD(a,b) = 1'],
        analogies: [
          'Es como cortar una pizza en 2 partes y tomar 1, o cortarla en 4 y tomar 2: es la misma cantidad de pizza.'
        ]
      },
      {
        number: '8.4',
        title: 'Decimales exactos y periódicos',
        content: 'Un decimal exacto tiene una cantidad finita de dígitos decimales (0.5, 0.25). Un decimal periódico repite un patrón infinitamente (0.333..., 0.142857142857...). Todo decimal exacto o periódico es racional. Para convertir fracción a decimal, divides el numerador entre el denominador.',
        formulas: ['0.5 = 1/2', '0.333... = 1/3'],
        analogies: [
          'Es como medir con una regla: 0.5 es medio centímetro (exacto), 0.333... es como intentar medir un tercio de centímetro con una regla común: nunca terminas.'
        ]
      },
      {
        number: '8.5',
        title: 'Porcentaje, razón y proporción',
        content: 'Un porcentaje es una fracción con denominador 100: 25% = 25/100 = 1/4. Una razón compara dos cantidades (a:b o a/b). Una proporción dice que dos razones son iguales (a/b = c/d). Se resuelven con producto cruz: a×d = b×c.',
        formulas: ['25% = 25/100', 'a/b = c/d', 'a×d = b×c'],
        analogies: [
          'Porcentaje es como decir "de cada 100, cuántos". Proporción es como una receta: si 2 tazas de harina necesitan 1 huevo, 4 tazas necesitan 2 huevos.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que fracción mayor denominador es mayor valor',
        description: 'Los estudiantes piensan que 1/8 es mayor que 1/2 porque 8 > 2. Pero cuanto más partes divides el todo, más pequeñas son las partes: 1/8 < 1/2.',
        remediation: 'Usar modelos visuales (área, recta) para comparar fracciones con diferente denominador.'
      },
      {
        name: 'Creer que 0.999... es menor que 1',
        description: 'Muchos piensan que 0.999... se acerca a 1 pero nunca llega. En realidad, 0.999... es exactamente igual a 1 (son dos representaciones del mismo número).',
        remediation: 'Demostrar con álgebra: si x = 0.999..., entonces 10x = 9.999..., restando: 9x = 9, así x = 1.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar fracciones',
        type: 'Reconocimiento',
        estimatedMinutes: 5,
        question: 'Si una pizza se corta en 8 partes iguales y te comes 3, ¿qué fracción de la pizza te comiste?',
        steps: [
          'El todo es 8 partes.',
          'Tomaste 3 partes.',
          'La fracción es partes tomadas / partes totales = 3/8.'
        ],
        hints: [
          'El numerador es cuántas tomaste.',
          'El denominador es en cuántas partes se dividió el todo.'
        ],
        solution: 'Te comiste 3/8 de la pizza.'
      },
      {
        title: 'Simplificar fracción',
        type: 'Simplificación',
        estimatedMinutes: 5,
        question: 'Simplifica 12/18.',
        steps: [
          'Busca el MCD de 12 y 18: divisores de 12 (1,2,3,4,6,12), de 18 (1,2,3,6,9,18). MCD = 6.',
          'Divide numerador y denominador por 6: 12/6 = 2, 18/6 = 3.',
          'Resultado: 2/3.'
        ],
        hints: [
          'Busca el mayor número que divida a ambos.',
          'Divide arriba y abajo por ese número.'
        ],
        solution: '12/18 = 2/3.'
      },
      {
        title: 'Convertir fracción a decimal',
        type: 'Conversión',
        estimatedMinutes: 5,
        question: '¿Cuánto es 3/4 en decimal?',
        steps: [
          'Divide 3 entre 4.',
          '3 ÷ 4 = 0.75.',
          'Es un decimal exacto.'
        ],
        hints: [
          'Divide el numerador entre el denominador.',
          '3/4 = 0.75.'
        ],
        solution: '3/4 = 0.75.'
      },
      {
        title: 'Porcentaje',
        type: 'Porcentaje',
        estimatedMinutes: 5,
        question: '¿Cuánto es 20% de 50?',
        steps: [
          '20% = 20/100 = 1/5.',
          '1/5 de 50 = 50/5 = 10.',
          'O directamente: 0.20 × 50 = 10.'
        ],
        hints: [
          'Convierte el porcentaje a fracción o decimal.',
          'Multiplica por la cantidad total.'
        ],
        solution: '20% de 50 = 10.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál de los siguientes es un número racional?',
        options: [
          '√2',
          'π',
          '3/4',
          'e'
        ],
        correct: 2,
        hints: [
          'Un racional se escribe como fracción de enteros.',
          '3/4 ya es una fracción.'
        ],
        explanation: '3/4 es racional porque se escribe como cociente de dos enteros. √2, π y e no son racionales.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es 1/4 como decimal?',
        options: [
          '0.4',
          '0.25',
          '0.14',
          '0.41'
        ],
        correct: 1,
        hints: [
          'Divide 1 entre 4.',
          '1 ÷ 4 = 0.25.'
        ],
        explanation: '1/4 = 0.25.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el resultado de 1/2 + 1/4?',
        options: [
          '2/6',
          '3/4',
          '1/8',
          '1/6'
        ],
        correct: 1,
        hints: [
          'Busca un denominador común: 1/2 = 2/4.',
          '2/4 + 1/4 = 3/4.'
        ],
        explanation: '1/2 = 2/4, así que 2/4 + 1/4 = 3/4.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Fracciones en la recta numérica',
        description: 'Ubica fracciones entre 0 y 1 en la recta numérica',
        type: 'function',
        data: {
          functions: [],
          range: [0, 1]
        },
        sliders: [
          { var: 'x', min: 0, max: 1, step: 0.1, default: 0.5, label: 'Posición x' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Fracciones equivalentes (área)',
        description: 'Visualiza cómo 1/2 = 2/4 = 3/6 en un cuadrado dividido',
        type: 'function',
        data: {
          functions: [],
          range: [0, 1]
        },
        sliders: [
          { var: 'divisiones', min: 2, max: 8, step: 1, default: 4, label: 'Divisiones' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
