// modules/m05/content.js
// Contenido estructurado — Módulo 5: Lenguaje matemático
// Símbolos, convenciones, precisión, leer matemáticas como idioma.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm05',
  title: 'Lenguaje matemático',
  estimatedMinutes: 30,
  difficulty: 2,
  tags: ['símbolos', 'notación', 'convenciones', 'precisión', 'leer matemáticas', 'idioma'],
  learningObjectives: [
    'Entender que las matemáticas son un idioma con sus propios símbolos y reglas',
    'Leer y escribir notación matemática con precisión',
    'Diferenciar símbolos de operación, relación y agrupamiento',
    'Usar el lenguaje matemático para comunicar ideas con claridad'
  ],
  theory: {
    historicalContext: 'Los símbolos matemáticos son invenciones recientes. El signo + y - aparecen en el siglo XV, el = en 1557 (Robert Recorde), y muchos símbolos modernos son del siglo XVII y XVIII. Antes, todo se escribía con palabras. Los símbolos nacieron para ahorrar escribir y comunicar con precisión.',
    sections: [
      {
        number: '5.1',
        title: 'Matemáticas como idioma',
        content: 'Las matemáticas no son solo números: son un idioma. Tiene vocabulario (símbolos), gramática (reglas de cómo combinarlos) y sintaxis (orden en que se leen). Como cualquier idioma, permite comunicar ideas complejas con precisión. Leer "√2" no es ver una letra rara, es leer "la raíz cuadrada de 2".',
        formulas: ['√2', 'π'],
        analogies: [
          'Al igual que en español, donde "casa" significa un lugar para vivir, en matemáticas "√" significa "raíz cuadrada". El símbolo es una abreviatura de una idea.'
        ]
      },
      {
        number: '5.2',
        title: 'Símbolos de operación',
        content: 'Los símbolos de operación indican qué hacer: + (sumar), - (restar), × (multiplicar), ÷ (dividir), ^ (potencia), √ (raíz). Cada uno tiene un significado preciso y un orden de aplicación (jerarquía de operaciones).',
        formulas: ['2+2', '5-3', '\\times', '\\div', 'x^2', '\\sqrt{4}'],
        analogies: [
          'Los símbolos de operación son como verbos en una oración: indican la acción que ocurre entre los números.'
        ]
      },
      {
        number: '5.3',
        title: 'Símbolos de relación y agrupamiento',
        content: 'Los símbolos de relación comparan: = (es igual a), ≠ (no es igual), < (menor que), > (mayor que), ≤ (menor o igual), ≥ (mayor o igual). Los de agrupamiento agrupan: ( ) paréntesis, [ ] corchetes, { } llaves. Indican qué se hace primero.',
        formulas: ['2=2', '\\neq', '2<5', '5>2', '\\leq', '\\geq', '(a+b)', '[a+b]', '\\{a\\}'],
        analogies: [
          'Los paréntesis son como comas en una oración: indican una pausa o agrupamiento que cambia el significado. "Come, abuela" no es lo mismo que "Come abuela".'
        ]
      },
      {
        number: '5.4',
        title: 'Precisión y convenciones',
        content: 'En matemáticas la precisión es todo. 2x no es lo mismo que 2 x (veces x es una variable). El orden de operaciones (jerarquía) dice que primero se resuelven paréntesis, luego potencias, luego multiplicación/división de izquierda a derecha, y finalmente suma/resta de izquierda a derecha.',
        formulas: ['2x', '2 × x'],
        analogies: [
          'Es como las reglas de tránsito: todos deben seguir las mismas para no chocar. En matemáticas, la jerarquía de operaciones es el tránsito que evita colas y accidentes.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que 2x es 2 veces la letra x como multiplicación explícita',
        description: 'Los estudiantes piensan que 2x significa "dos equis" como dos objetos separados, en lugar de entender que es 2 multiplicado por la variable x.',
        remediation: 'Enfatizar que la yuxtaposición (escribir dos cosas juntas) en álgebra significa multiplicación.'
      },
      {
        name: 'Confundir = con "y ahora viene la respuesta"',
        description: 'Los estudiantes ven el signo igual como una flecha que indica el resultado, en lugar de como una relación de equilibrio entre dos lados.',
        remediation: 'Enseñar el signo igual como balanza: lo que está a un lado debe pesar lo mismo que el otro.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Leer símbolos',
        type: 'Notación',
        estimatedMinutes: 5,
        question: '¿Cómo se lee en voz alta: √16 = 4?',
        steps: [
          '√ se lee "raíz cuadrada de".',
          '16 es el número dentro de la raíz.',
          '= se lee "es igual a".',
          '4 es el resultado.',
          'Junto: "La raíz cuadrada de 16 es igual a 4".'
        ],
        hints: [
          'No digas "raíz 16 igual 4". Usa palabras completas.',
          'Piensa en cómo se leería en una oración.'
        ],
        solution: 'Se lee: "La raíz cuadrada de dieciséis es igual a cuatro".'
      },
      {
        title: 'Jerarquía de operaciones',
        type: 'Precedencia',
        estimatedMinutes: 6,
        question: '¿Cuál es el resultado de 3 + 4 × 2?',
        steps: [
          'Según la jerarquía, la multiplicación va antes que la suma.',
          'Primero: 4 × 2 = 8.',
          'Luego: 3 + 8 = 11.',
          'Resultado: 11.'
        ],
        hints: [
          'No hagas primero 3 + 4 = 7.',
          'Recuerda: multiplicación antes que suma.'
        ],
        solution: 'El resultado es 11. Primero multiplicas 4 × 2 = 8, luego sumas 3 + 8 = 11.'
      },
      {
        title: 'Símbolos de relación',
        type: 'Comparación',
        estimatedMinutes: 4,
        question: 'Completa: 7 ___ 5',
        steps: [
          'Compara 7 y 5.',
          '7 es mayor que 5.',
          'El símbolo de "mayor que" es >.',
          'Entonces: 7 > 5.'
        ],
        hints: [
          'El símbolo > se abre hacia el número mayor.',
          'Piensa en la boca de un tiburón que quiere comer el número más grande.'
        ],
        solution: '7 > 5 (siete es mayor que cinco).'
      },
      {
        title: 'Agrupamiento con paréntesis',
        type: 'Paréntesis',
        estimatedMinutes: 5,
        question: '¿Cuál es el resultado de (3 + 4) × 2?',
        steps: [
          'Primero resuelve lo dentro de paréntesis: 3 + 4 = 7.',
          'Luego multiplica: 7 × 2 = 14.',
          'Resultado: 14.'
        ],
        hints: [
          'Los paréntesis tienen prioridad sobre todo lo demás.',
          'Sin paréntesis sería 3 + 4 × 2 = 11, diferente.'
        ],
        solution: 'El resultado es 14. Primero (3+4)=7, luego 7×2=14.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Qué significa el símbolo √?',
        options: [
          'Sumar',
          'Raíz cuadrada',
          'Dividir',
          'Multiplicar'
        ],
        correct: 1,
        hints: [
          'Es el símbolo de raíz.',
          '√9 = 3 porque 3 × 3 = 9.'
        ],
        explanation: '√ es el símbolo de raíz cuadrada. √16 = 4 porque 4 × 4 = 16.'
      },
      {
        type: 'multiple-choice',
        question: '¿Cuál es el orden correcto de operaciones?',
        options: [
          'Suma, resta, multiplicación, división',
          'Paréntesis, potencias, multiplicación/división, suma/resta',
          'De izquierda a derecha sin excepción',
          'Primero lo más fácil'
        ],
        correct: 1,
        hints: [
          'Recuerda la jerarquía: paréntesis primero.',
          'Luego potencias, luego multiplicación/división, luego suma/resta.'
        ],
        explanation: 'El orden es: 1) Paréntesis, 2) Potencias/raíces, 3) Multiplicación y división (izq. a der.), 4) Suma y resta (izq. a der.).'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué significa 2x en álgebra?',
        options: [
          'Dos veces la letra x',
          '2 multiplicado por x',
          'El número 2 seguido de la letra x',
          '2 elevado a x'
        ],
        correct: 1,
        hints: [
          'En álgebra, escribir dos cosas juntas significa multiplicación.',
          '2x = 2 · x.'
        ],
        explanation: 'En álgebra, la yuxtaposición (escribir dos símbolos juntos) significa multiplicación. 2x significa 2 veces x.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Jerarquía de operaciones visual',
        description: 'Observa cómo el orden cambia el resultado',
        type: 'function',
        data: {
          functions: [],
          range: [0, 20]
        },
        sliders: [
          { var: 'a', min: 0, max: 10, step: 1, default: 3, label: 'Número a' },
          { var: 'b', min: 0, max: 10, step: 1, default: 4, label: 'Número b' },
          { var: 'c', min: 0, max: 10, step: 1, default: 2, label: 'Número c' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Recta numérica con símbolos de relación',
        description: 'Ubica números y compara con <, >, =',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'x', min: -5, max: 5, step: 1, default: 2, label: 'Posición x' },
          { var: 'y', min: -5, max: 5, step: 1, default: 4, label: 'Posición y' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
