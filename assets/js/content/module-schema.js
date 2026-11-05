/* ==========================================================================
   MODULE CONTENT SCHEMA — Esquema obligatorio para deep dive pedagógico
   Cada módulo debe exportar un objeto que cumpla este contrato.
   Diseñado para: interiorización, intuición, progresión paso a paso, ludicidad.
   ========================================================================== */

export const REQUIRED_SECTIONS = ['theory', 'practice', 'quiz', 'interactive'];

/**
 * Valida que un objeto de contenido de módulo cumpla el esquema mínimo.
 * Devuelve { valid: boolean, errors: string[] }
 */
export function validateModuleContent(content) {
  const errors = [];

  if (!content || typeof content !== 'object') {
    return { valid: false, errors: ['Contenido no es un objeto'] };
  }

  if (!content.id || typeof content.id !== 'string') {
    errors.push('Falta id del módulo');
  }
  if (!content.title || typeof content.title !== 'string') {
    errors.push('Falta title del módulo');
  }

  // --- Teoría: deep dive obligatorio ---
  if (!content.theory || !Array.isArray(content.theory.sections)) {
    errors.push('Falta theory.sections (array de secciones teóricas)');
  } else {
    content.theory.sections.forEach((sec, i) => {
      if (!sec.title) errors.push(`theory.sections[${i}] sin título`);
      if (!sec.content || sec.content.length < 50) {
        errors.push(`theory.sections[${i}] contenido demasiado corto (mín. 50 chars)`);
      }
      if (!sec.analogies || sec.analogies.length === 0) {
        errors.push(`theory.sections[${i}] sin analogías cotidianas (intuición)`);
      }
    });
  }

  if (!content.theory || !content.theory.historicalContext) {
    errors.push('Falta theory.historicalContext (origen del concepto)');
  }
  if (!content.theory || !Array.isArray(content.theory.misconceptions) || content.theory.misconceptions.length === 0) {
    errors.push('Falta theory.misconceptions (errores comunes + remediación)');
  }

  // --- Práctica: ejercicios guiados progresivos ---
  if (!content.practice || !Array.isArray(content.practice.exercises)) {
    errors.push('Falta practice.exercises (array de ejercicios guiados)');
  } else {
    content.practice.exercises.forEach((ex, i) => {
      if (!ex.question) errors.push(`practice.exercises[${i}] sin pregunta`);
      if (!ex.solution) errors.push(`practice.exercises[${i}] sin solución`);
      if (!Array.isArray(ex.steps) || ex.steps.length === 0) {
        errors.push(`practice.exercises[${i}] sin pasos guiados`);
      }
    });
  }

  // --- Quiz: evaluación con retroalimentación inmediata ---
  if (!content.quiz || !Array.isArray(content.quiz.questions)) {
    errors.push('Falta quiz.questions (array de preguntas)');
  } else {
    content.quiz.questions.forEach((q, i) => {
      if (!q.question) errors.push(`quiz.questions[${i}] sin enunciado`);
      if (!q.explanation) errors.push(`quiz.questions[${i}] sin explicación obligatoria`);
      if (q.type === 'multiple-choice' && (!q.options || q.options.length < 2)) {
        errors.push(`quiz.questions[${i}] sin opciones válidas`);
      }
      if (q.type === 'multiple-choice' && q.correct === undefined) {
        errors.push(`quiz.questions[${i}] sin índice correcto`);
      }
    });
  }

  // --- Interactivo: visualizaciones ---
  if (!content.interactive || !Array.isArray(content.interactive.graphs)) {
    errors.push('Falta interactive.graphs (array de visualizaciones)');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Plantilla vacía para crear un nuevo módulo rápidamente.
 */
export const EMPTY_MODULE_CONTENT = {
  id: '',
  title: '',
  estimatedMinutes: 30,
  difficulty: 1,
  tags: [],
  learningObjectives: [],
  theory: {
    historicalContext: '',
    sections: [],
    misconceptions: []
  },
  practice: {
    exercises: []
  },
  quiz: {
    questions: []
  },
  interactive: {
    graphs: []
  }
};
