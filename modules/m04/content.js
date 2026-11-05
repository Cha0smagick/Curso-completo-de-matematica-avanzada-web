// modules/m04/content.js
// Contenido estructurado — Módulo 4: Patrones y regularidades
// Secuencias, periodicidad, simetría, pensamiento algebraico temprano.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm04',
  title: 'Patrones y regularidades',
  estimatedMinutes: 30,
  difficulty: 2,
  tags: ['patrones', 'secuencias', 'periodicidad', 'simetría', 'pensamiento algebraico', 'generalización'],
  learningObjectives: [
    'Identificar patrones en secuencias numéricas y visuales',
    'Entender la periodicidad y la repetición ordenada',
    'Reconocer simetría en figuras y patrones',
    'Pasar del patrón concreto a la regla algebraica (generalización)'
  ],
  theory: {
    historicalContext: 'Los patrones están en todas partes: en las estrellas, en las estaciones, en los panales de abejas. Los antiguos griegos veían la geometría como el estudio de patrones en el espacio. El pensamiento algebraico temprano nace al preguntarse: "¿cuál sigue?" y "¿cuál es la regla?".',
    sections: [
      {
        number: '4.1',
        title: 'Secuencias numéricas: ¿qué sigue?',
        content: 'Una secuencia es una lista ordenada de números que sigue una regla. El patrón puede ser sumar siempre lo mismo (2, 4, 6, 8...), multiplicar (2, 4, 8, 16...), o alternar (1, 3, 1, 3...). La clave es encontrar la regla que genera el patrón.',
        formulas: ['a_{n+1} = a_n + d'],
        analogies: [
          'Es como subir escaleras: si subes de 2 en 2, pisas los escalones 2, 4, 6, 8... La regla es siempre la misma.'
        ]
      },
      {
        number: '4.2',
        title: 'Periodicidad y ciclos',
        content: 'La periodicidad es cuando un patrón se repite después de un intervalo fijo. Los días de la semana (lunes, martes... domingo, lunes...) tienen periodo 7. Los meses del año tienen periodo 12. Entender el periodo permite predecir qué viene después sin listar todo.',
        formulas: ['periodo = intervalo de repetición'],
        analogies: [
          'Un reloj es el ejemplo perfecto de periodicidad: las horas se repiten cada 12, los minutos cada 60.'
        ]
      },
      {
        number: '4.3',
        title: 'Simetría: espejo y rotación',
        content: 'La simetría es cuando una figura se puede dividir en partes que se reflejan o rotan y se ven iguales. La simetría de espejo (reflexión) divide una figura en dos mitades idénticas. La simetría de rotación gira la figura y se ve igual. La naturaleza está llena de simetría: mariposas, flores, copos de nieve.',
        formulas: [],
        analogies: [
          'Pliega una hoja por la mitad, recorta medio corazón, despliega: tienes un corazón completo gracias a la simetría de espejo.'
        ]
      },
      {
        number: '4.4',
        title: 'Del patrón a la regla: pensamiento algebraico',
        content: 'El pensamiento algebraico es pasar de "veo un patrón" a "la regla es...". Si ves 3, 6, 9, 12..., la regla es "multiplica la posición por 3". Eso es álgebra temprana: usar letras o símbolos para describir la regla general, no solo el caso particular.',
        formulas: ['a_n = 3n'],
        analogies: [
          'Es como tener una receta: en lugar de decir "primero 3, luego 6, luego 9", dices "cada número es 3 veces su posición". Esa es la regla general.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Asumir que dos términos definen el patrón',
        description: 'Los estudiantes ven 2, 4 y asumen que la regla es "sumar 2", pero podría ser "multiplicar por 2" (2, 4, 8, 16...) o cualquier otra cosa.',
        remediation: 'Siempre buscar al menos 3-4 términos para confirmar la regla antes de generalizar.'
      },
      {
        name: 'Confundir patrón con secuencia aleatoria',
        description: 'Pensar que cualquier lista de números es un patrón, incluso cuando no hay regla clara.',
        remediation: 'Un patrón requiere una regla consistente que se pueda aplicar para predecir el siguiente término.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Encontrar la regla',
        type: 'Secuencia numérica',
        estimatedMinutes: 5,
        question: '¿Cuál es el siguiente número? 5, 10, 15, 20, __',
        steps: [
          'Observa la diferencia entre términos consecutivos: 10-5=5, 15-10=5, 20-15=5.',
          'La regla es sumar 5 cada vez.',
          'El siguiente es 20 + 5 = 25.'
        ],
        hints: [
          'Mira cuánto cambia de un número al siguiente.',
          'Si el cambio es siempre el mismo, ese es tu patrón.'
        ],
        solution: 'El siguiente es 25. La regla es sumar 5 (múltiplos de 5).'
      },
      {
        title: 'Periodicidad',
        type: 'Ciclo',
        estimatedMinutes: 5,
        question: 'Si hoy es lunes, ¿qué día será dentro de 10 días?',
        steps: [
          'Los días de la semana tienen periodo 7.',
          '10 días = 1 semana completa (7) + 3 días.',
          'Lunes + 3 días = jueves.'
        ],
        hints: [
          'No cuentes uno por uno. Usa el ciclo de 7 días.',
          '10 dividido entre 7 da resto 3.'
        ],
        solution: 'Jueves. 10 días = 7 (una semana) + 3 días, así que es lunes + 3 = jueves.'
      },
      {
        title: 'Simetría visual',
        type: 'Simetría',
        estimatedMinutes: 4,
        question: '¿Una mariposa tiene simetría de espejo? ¿Por qué?',
        steps: [
          'Imagina una línea vertical por el centro del cuerpo de la mariposa.',
          'El ala izquierda es el reflejo del ala derecha.',
          'Sí, tiene simetría de espejo.'
        ],
        hints: [
          'Dobla mentalmente la mariposa por la mitad.',
          '¿Coinciden las alas?'
        ],
        solution: 'Sí, una mariposa tiene simetría de espejo: su ala izquierda es el reflejo de su ala derecha.'
      },
      {
        title: 'Regla algebraica',
        type: 'Generalización',
        estimatedMinutes: 6,
        question: 'La secuencia es 2, 5, 8, 11, 14... ¿Cuál es la regla para encontrar el término n?',
        steps: [
          'Observa la diferencia: 5-2=3, 8-5=3, 11-8=3. Siempre suma 3.',
          'El primer término (n=1) es 2.',
          'La regla es: empezar en 2 y sumar 3 por cada paso después.',
          'En álgebra: a_n = 2 + 3(n-1) o equivalentemente a_n = 3n - 1.'
        ],
        hints: [
          'Empieza por el primer término y añade 3 por cada paso adicional.',
          'Prueba con n=2: 3(2)-1 = 5. Correcto.'
        ],
        solution: 'La regla es a_n = 3n - 1 (o 2 + 3(n-1)). Para n=5: 3(5)-1 = 14. Correcto.'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál es el siguiente número en la secuencia 3, 6, 9, 12, __?',
        options: [
          '13',
          '14',
          '15',
          '16'
        ],
        correct: 2,
        hints: [
          'Mira la diferencia entre números consecutivos.',
          'Cada número suma 3 al anterior.'
        ],
        explanation: 'La regla es sumar 3 cada vez. 12 + 3 = 15.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué es la periodicidad?',
        options: [
          'Que un patrón crece sin límite',
          'Que un patrón se repite después de un intervalo fijo',
          'Que un patrón solo tiene un término',
          'Que un patrón no se puede predecir'
        ],
        correct: 1,
        hints: [
          'Piensa en los días de la semana o en un reloj.',
          'Periodo = intervalo después del cual se repite.'
        ],
        explanation: 'La periodicidad es cuando un patrón se repite cada cierto intervalo (el periodo). Los días se repiten cada 7, los meses cada 12.'
      },
      {
        type: 'multiple-choice',
        question: 'Si el patrón es 1, 4, 7, 10..., ¿cuál es la regla?',
        options: [
          'Sumar 2',
          'Sumar 3',
          'Multiplicar por 3',
          'Restar 3'
        ],
        correct: 1,
        hints: [
          'Calcula la diferencia: 4-1=3, 7-4=3, 10-7=3.',
          'La diferencia es siempre 3.'
        ],
        explanation: 'La regla es sumar 3 cada vez: empezar en 1 y añadir 3 por cada paso.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Secuencia aritmética en la recta numérica',
        description: 'Ajusta el paso para ver cómo crece la secuencia en la recta',
        type: 'function',
        data: {
          functions: [],
          range: [0, 30]
        },
        sliders: [
          { var: 'paso', min: 1, max: 5, step: 1, default: 3, label: 'Paso de la secuencia' },
          { var: 'inicio', min: 0, max: 10, step: 1, default: 2, label: 'Término inicial' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Simetría de espejo',
        description: 'Observa cómo se refleja una figura en el eje de simetría',
        type: 'function',
        data: {
          functions: [],
          range: [-10, 10]
        },
        sliders: [
          { var: 'x', min: -5, max: 5, step: 1, default: 0, label: 'Posición en el eje' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
