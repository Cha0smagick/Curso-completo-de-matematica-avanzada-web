// modules/m03/content.js
// Contenido estructurado — Módulo 3: Operaciones como acciones
// Modelos semánticos: parte-todo, cambio, comparación, agrupamiento.
// Sigue el esquema de module-schema.js para deep dive pedagógico completo.

export default {
  id: 'm03',
  title: 'Operaciones como acciones',
  estimatedMinutes: 45,
  difficulty: 2,
  tags: ['suma', 'resta', 'multiplicación', 'división', 'modelos semánticos', 'parte-todo', 'cambio', 'comparación', 'agrupamiento'],
  learningObjectives: [
    'Entender las operaciones como acciones sobre cantidades, no como reglas memorizadas',
    'Diferenciar los modelos semánticos: parte-todo, cambio, comparación y agrupamiento',
    'Resolver problemas aplicando el modelo correcto según el contexto',
    'Conectar suma y resta como operaciones inversas, y multiplicación y división como inversas'
  ],
  theory: {
    historicalContext: 'Durante miles de años, los humanos realizaron operaciones matemáticas sin símbolos escritos. Sumaban juntando piedras, restaban quitando ovejas de un rebaño, multiplicaban agrupando cosechas y dividían repartiendo alimentos. Los símbolos +, -, ×, ÷ son invenciones recientes (siglos XV-XVII). Lo esencial es la acción, no el símbolo.',
    sections: [
      {
        number: '3.1',
        title: 'Suma y resta como acciones de cambio',
        content: 'La suma es la acción de unir o añadir. La resta es la acción de separar o quitar. No son fórmulas abstractas: son acciones físicas. Si tienes 3 manzanas y añades 2, la cantidad cambia de 3 a 5. Si tienes 5 manzanas y quitas 2, la cantidad cambia de 5 a 3. La suma y la resta son inversas: deshacer una suma es hacer una resta.',
        formulas: ['a + b = c', 'c - b = a'],
        analogies: [
          'Imagina un ascensor: subir 3 pisos es +3, bajar 2 pisos es -2. Si subes 3 y luego bajas 2, terminas 1 piso arriba de donde empezaste.'
        ]
      },
      {
        number: '3.2',
        title: 'Modelo parte-todo: composición y descomposición',
        content: 'Un todo puede descomponerse en partes, y las partes pueden componerse en un todo. La suma une partes para formar el todo: 3 + 2 = 5 (partes 3 y 2, todo 5). La resta parte del todo y quita una parte para encontrar la otra: 5 - 2 = 3 (todo 5, parte 2, parte desconocida 3). Este modelo es la base del álgebra: encontrar la parte desconocida.',
        formulas: ['parte + parte = todo', 'todo - parte = parte'],
        analogies: [
          'Una pizza cortada en 8 rebanadas: 3 rebanadas de jamón y 5 de queso forman el todo de 8 rebanadas. Si te comes 3, quedan 5.'
        ]
      },
      {
        number: '3.3',
        title: 'Modelo comparación: diferenciar cantidades',
        content: 'Comparar no es unir ni separar: es encontrar la diferencia entre dos cantidades. ¿Cuánto más tiene uno que el otro? ¿Cuánto menos? La comparación usa la resta: la diferencia entre 8 y 5 es 8 - 5 = 3. No se trata de cuánto hay en total, sino de cuánto se diferencian.',
        formulas: ['mayor - menor = diferencia'],
        analogies: [
          'Dos hermanos: uno tiene 8 años y el otro 5. La diferencia de edad es 3 años. No importa cuántos años tengan en total (13), sino cuánto se diferencian (3).'
        ]
      },
      {
        number: '3.4',
        title: 'Multiplicación y división como agrupamiento',
        content: 'La multiplicación es la acción de agrupar cantidades iguales: 3 grupos de 4 son 12 (3 × 4 = 12). La división es la acción de repartir o separar en grupos iguales: 12 repartidos en 3 grupos son 4 por grupo (12 ÷ 3 = 4). Son inversas: multiplicar agrupa, dividir desagrupa.',
        formulas: ['grupos × tamaño = total', 'total ÷ grupos = tamaño', 'total ÷ tamaño = grupos'],
        analogies: [
          'Si tienes 12 galletas y las repartes en 3 platos iguales, cada plato recibe 4 galletas. Eso es división. Si armamos 3 bolsas con 4 galletas cada una, usamos 12 galletas en total. Eso es multiplicación.'
        ]
      }
    ],
    misconceptions: [
      {
        name: 'Creer que la suma siempre hace el número más grande',
        description: 'Los estudiantes piensan que sumar siempre aumenta, pero con números negativos o al restar un negativo, la suma puede disminuir.',
        remediation: 'Entender la suma como acción de cambio, no solo como "hacer más grande". Usar la recta numérica para visualizar.'
      },
      {
        name: 'Confundir multiplicación con "siempre hace más"',
        description: 'Pensar que multiplicar siempre da un número mayor que los originales, pero multiplicar por fracciones o decimales menores a 1 reduce la cantidad.',
        remediation: 'Usar el modelo de agrupamiento con ejemplos visuales: 3 grupos de 0.5 son 1.5, que es menor que 3.'
      }
    ]
  },
  practice: {
    exercises: [
      {
        title: 'Identificar el modelo',
        type: 'Modelo semántico',
        estimatedMinutes: 6,
        question: 'Tienes 5 caramelos y te regalan 3 más. ¿Qué modelo semántico es este? ¿Cuántos caramelos tienes ahora?',
        steps: [
          'Identifica la acción: te están añadiendo caramelos.',
          'Eso es el modelo de cambio (suma).',
          'Calcula: 5 + 3 = 8.',
          'Verifica: empezaste con 5, añadiste 3, terminas con 8.'
        ],
        hints: [
          'Pregúntate: ¿estoy juntando, separando, comparando o agrupando?',
          'Añadir caramelos es sumar.'
        ],
        solution: 'Modelo de cambio (suma). Tienes 8 caramelos (5 + 3 = 8).'
      },
      {
        title: 'Parte-todo',
        type: 'Parte-todo',
        estimatedMinutes: 5,
        question: 'Un parque tiene 12 árboles: 7 son pinos y el resto son robles. ¿Cuántos robles hay?',
        steps: [
          'El todo es 12 árboles.',
          'Una parte es 7 pinos.',
          'Buscas la otra parte (robles).',
          'Usa resta: todo - parte conocida = parte desconocida: 12 - 7 = 5.'
        ],
        hints: [
          'No sumes 12 y 7. El 12 es el total.',
          'Quieres encontrar cuántos árboles NO son pinos.'
        ],
        solution: 'Hay 5 robles. Todo (12) - parte pinos (7) = parte robles (5).'
      },
      {
        title: 'Comparación',
        type: 'Comparación',
        estimatedMinutes: 5,
        question: 'Ana tiene 9 canicas y Luis tiene 4 canicas. ¿Cuántas canicas más tiene Ana que Luis?',
        steps: [
          'Identifica las dos cantidades: 9 y 4.',
          'No estás buscando el total, sino la diferencia.',
          'Usa resta: 9 - 4 = 5.',
          'Ana tiene 5 canicas más que Luis.'
        ],
        hints: [
          'La pregunta es "¿cuántas más?", no "¿cuántas tienen en total?".',
          'Resta el menor del mayor.'
        ],
        solution: 'Ana tiene 5 canicas más que Luis (9 - 4 = 5).'
      },
      {
        title: 'Agrupamiento (multiplicación)',
        type: 'Agrupamiento',
        estimatedMinutes: 6,
        question: 'Una caja tiene 6 chocolates. Compras 4 cajas. ¿Cuántos chocolates tienes en total?',
        steps: [
          'Identifica: 4 grupos (cajas) de 6 elementos (chocolates).',
          'Eso es multiplicación: 4 × 6.',
          'Calcula: 4 × 6 = 24.',
          'Tienes 24 chocolates en total.'
        ],
        hints: [
          'No sumes 4 y 6. Hay 4 cajas, cada una con 6.',
          'Imagina las 4 cajas frente a ti.'
        ],
        solution: 'Tienes 24 chocolates (4 cajas × 6 chocolates = 24).'
      }
    ]
  },
  quiz: {
    questions: [
      {
        type: 'multiple-choice',
        question: '¿Cuál de los siguientes es un modelo de comparación?',
        options: [
          'Tengo 3 manzanas y compro 2 más',
          'Una pizza de 8 rebanadas, te como 3, ¿cuántas quedan?',
          'Ana tiene 10 años y Luis 6, ¿cuántos años más tiene Ana?',
          'Tengo 3 bolsas con 4 manzanas cada una'
        ],
        correct: 2,
        hints: [
          'La comparación busca la diferencia entre dos cantidades.',
          'La pregunta "¿cuántos años más?" indica comparación.'
        ],
        explanation: 'La comparación no une ni separa: encuentra la diferencia entre dos cantidades. 10 - 6 = 4 años de diferencia.'
      },
      {
        type: 'multiple-choice',
        question: '¿Qué operación es la inversa de la suma?',
        options: [
          'Multiplicación',
          'Resta',
          'División',
          'Ninguna'
        ],
        correct: 1,
        hints: [
          'La operación inversa deshace lo que hizo la primera.',
          'Si sumaste 3, para deshacerlo restas 3.'
        ],
        explanation: 'La resta deshace la suma: si a + b = c, entonces c - b = a. Son operaciones inversas.'
      },
      {
        type: 'multiple-choice',
        question: 'En el modelo parte-todo, si el todo es 15 y una parte es 9, ¿qué se busca?',
        options: [
          'La otra parte',
          'El total',
          'El producto',
          'La diferencia entre las partes'
        ],
        correct: 0,
        hints: [
          'Conoces el todo (15) y una parte (9).',
          'Te falta la otra parte para completar el todo.'
        ],
        explanation: 'En el modelo parte-todo, conociendo el todo y una parte, buscas la otra parte: 15 - 9 = 6.'
      }
    ]
  },
  interactive: {
    graphs: [
      {
        title: 'Recta numérica: suma y resta como movimiento',
        description: 'Arrastra el punto para ver cómo sumar mueve a la derecha y restar mueve a la izquierda',
        type: 'function',
        data: {
          functions: [
            { expr: 'x', color: 'var(--brand-primary)', label: 'Posición' },
            { expr: '0', color: 'transparent', label: '' },
            { expr: '10', color: 'transparent', label: '' }
          ],
          range: [0, 10]
        },
        sliders: [
          { var: 'x', min: 0, max: 10, step: 1, default: 3, label: 'Posición x' }
        ],
        points: 'draggable',
        export: 'png',
        height: '300px'
      },
      {
        title: 'Agrupamiento: multiplicación visual',
        description: 'Ajusta el número de grupos y el tamaño de cada grupo para ver el total',
        type: 'function',
        data: {
          functions: [],
          range: [0, 20]
        },
        sliders: [
          { var: 'grupos', min: 1, max: 5, step: 1, default: 3, label: 'Número de grupos' },
          { var: 'tamano', min: 1, max: 5, step: 1, default: 4, label: 'Tamaño de cada grupo' }
        ],
        points: 'false',
        export: 'png',
        height: '300px'
      }
    ]
  }
};
