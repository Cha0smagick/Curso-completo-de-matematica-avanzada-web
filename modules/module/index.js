// modules/module/index.js
// Module view - shows module content with tabs.
// Soporte dual: contenido estructurado (modules/mXX/content.js) o HTML estático (modules/mXX/index.html).
// El contenido estructurado es el formato objetivo para deep dive pedagógico.

import { loadModuleContent } from '../../assets/js/content/content-loader.js';

/* ==========================================================================
   FUNCIONES AUXILIARES DE RENDERIZADO (fuera del objeto para evitar
   problemas de sintaxis de objeto literal con mezcla de arrow functions
   y métodos abreviados)
   ========================================================================== */

function renderPlaceholder(section, moduleData) {
  const icons = { theory: '📖', practice: '✏️', quiz: '📝', interactive: '🎮' };
  const titles = {
    theory: 'Teoría',
    practice: 'Práctica',
    quiz: 'Quiz',
    interactive: 'Interactivo'
  };
  const messages = {
    theory: 'El contenido teórico de este módulo está en preparación.',
    practice: 'Los ejercicios guiados de este módulo están en preparación.',
    quiz: 'El quiz adaptativo de este módulo está en preparación.',
    interactive: 'Las gráficas interactivas de este módulo están en preparación.'
  };
  return `
    <div class="theory-section">
      <div class="card p-8 text-center">
        <div class="text-5xl mb-4">${icons[section] || '📘'}</div>
        <h2 class="text-2xl font-bold mb-2">${titles[section] || 'Contenido'}: ${moduleData.title}</h2>
        <p class="text-muted mb-6">${messages[section] || 'Disponible pronto.'}</p>
        ${moduleData.id !== 'm01' ? `
          <p class="text-sm text-muted">Mientras tanto, el Módulo 1 ya tiene contenido completo:</p>
          <a href="#module/m01" class="btn btn-primary mt-4">Ir al Módulo 1</a>
        ` : ''}
      </div>
    </div>
  `;
}

function renderStructuredSection(name, content, moduleData, store) {
  switch (name) {
    case 'theory':
      return renderTheoryFromContent(content.theory, moduleData);
    case 'practice':
      return renderPracticeFromContent(content.practice, moduleData);
    case 'quiz':
      return renderQuizFromContent(content.quiz, moduleData);
    case 'interactive':
      return renderInteractiveFromContent(content.interactive, moduleData);
    default:
      return renderPlaceholder(name, moduleData);
  }
}

function renderTheoryFromContent(theory, moduleData) {
  const sectionsHtml = (theory.sections || []).map(sec => `
    <div class="theory-section mb-8">
      <header class="theory-section-header mb-4">
        <span class="theory-section-number">${sec.number || ''}</span>
        <h2 class="theory-section-title">${sec.title}</h2>
      </header>
      <div class="theory-content">
        ${sec.content ? `<div class="prose mb-6">${sec.content}</div>` : ''}
        ${sec.formulas && sec.formulas.length
          ? `<div class="formulas mb-6">${sec.formulas.map(f => `<math-formula latex="${escapeHtml(f)}" display></math-formula>`).join('')}</div>`
          : ''}
        ${sec.analogies && sec.analogies.length
          ? `<div class="callout callout-analogy mb-6">
               <span class="callout-title">💡 Analogía para entenderlo</span>
               <span class="callout-text">${sec.analogies.map(a => `<p>${a}</p>`).join('')}</span>
             </div>`
          : ''}
      </div>
    </div>
  `).join('');

  const misconceptionsHtml = (theory.misconceptions || []).map(m => `
    <div class="callout callout-warning mb-6">
      <span class="callout-title">⚠️ Error común: ${m.name || 'Concepto erróneo'}</span>
      <span class="callout-text">${m.description}</span>
      ${m.remediation ? `<div class="remediation mt-3"><strong>Remediación:</strong> ${m.remediation}</div>` : ''}
    </div>
  `).join('');

  return `
    <div class="theory-section">
      <header class="mb-8">
        <h1 class="text-3xl font-extrabold mb-2">${moduleData.title}</h1>
        ${theory.historicalContext ? `<p class="text-muted text-lg">${theory.historicalContext}</p>` : ''}
      </header>
      ${sectionsHtml}
      ${misconceptionsHtml ? `<div class="theory-section mb-8"><h3 class="text-xl font-bold mb-4">Errores comunes y cómo evitarlos</h3>${misconceptionsHtml}</div>` : ''}
      ${moduleData.learningObjectives && moduleData.learningObjectives.length
        ? `<div class="card p-6 mb-8 mt-8" style="background: var(--color-bg);">
             <h3 class="text-sm font-semibold mb-3" style="color: var(--brand-primary);">Objetivos de aprendizaje</h3>
             <ul class="text-sm text-muted space-y-2">
               ${moduleData.learningObjectives.map(obj => `<li>✓ ${obj}</li>`).join('')}
             </ul>
           </div>`
        : ''}
    </div>
  `;
}

function renderPracticeFromContent(practice, moduleData) {
  const exercisesHtml = (practice.exercises || []).map((ex, i) => `
    <div class="practice-section mb-8">
      <header class="practice-header mb-4">
        <h3 class="practice-title">${ex.title || `Ejercicio ${i + 1}`}</h3>
        <div class="practice-meta">
          <span class="badge badge-primary">${ex.type || 'Guiado'}</span>
          ${ex.estimatedMinutes ? `<span class="badge badge-neutral">${ex.estimatedMinutes} min</span>` : ''}
        </div>
      </header>
      <div class="practice-card">
        <div class="practice-card-body">
          <p class="practice-question">${ex.question}</p>
          ${ex.steps && ex.steps.length
            ? `<ol class="mt-4 space-y-3 text-sm">${ex.steps.map(s => `<li>${s}</li>`).join('')}</ol>`
            : ''}
          ${ex.hints && ex.hints.length
            ? `<div class="practice-hints mt-4">${ex.hints.map((h, hi) => `
              <div class="practice-hint">
                <span class="practice-hint-icon">💡</span>
                <div class="practice-hint-content">
                  <span class="practice-hint-level">Pista ${hi + 1}</span>
                  ${h}
                </div>
              </div>
            `).join('')}</div>`
            : ''}
          <div class="practice-solution mt-6">
            <div class="practice-solution-header">✓ Solución</div>
            <div class="practice-solution-content">${ex.solution}</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="practice-section">
      <header class="mb-8">
        <h1 class="text-3xl font-extrabold mb-2">Práctica Guiada — ${moduleData.title}</h1>
        <p class="text-muted text-lg">Aplica lo aprendido con ejercicios paso a paso</p>
      </header>
      ${exercisesHtml}
    </div>
  `;
}

function renderQuizFromContent(quiz, moduleData) {
  const questionsHtml = (quiz.questions || []).map((q, i) => `
    <quiz-card
      mode="learning"
      question-id="${moduleData.id}-q${i + 1}"
      difficulty="adaptive"
      hints="progressive"
      explanation="required"
      xp="10"
      data='${escapeHtml(JSON.stringify({
        type: q.type || 'multiple-choice',
        question: q.question,
        options: q.options || [],
        correct: q.correct !== undefined ? q.correct : 0,
        hints: q.hints || [],
        explanation: q.explanation
      }))}'>
    </quiz-card>
  `).join('');

  return `
    <div class="quiz-section mb-8">
      <header class="mb-8">
        <h1 class="text-3xl font-extrabold mb-2">Quiz — ${moduleData.title}</h1>
        <p class="text-muted text-lg">Responde y recibe retroalimentación inmediata antes de continuar</p>
      </header>
      ${questionsHtml}
    </div>
  `;
}

function renderInteractiveFromContent(interactive, moduleData) {
  const graphsHtml = (interactive.graphs || []).map((g, i) => `
    <div class="card p-6 mb-6">
      <h3 class="text-lg font-semibold mb-4">${g.title || `Gráfica ${i + 1}`}</h3>
      ${g.description ? `<p class="text-sm text-muted mb-4">${g.description}</p>` : ''}
      <interactive-graph
        type="${g.type || 'function'}"
        data='${escapeHtml(JSON.stringify(g.data || {}))}'
        sliders='${escapeHtml(JSON.stringify(g.sliders || []))}'
        points="${g.points || 'false'}"
        export="${g.export || 'png'}"
        height="${g.height || '300px'}">
      </interactive-graph>
    </div>
  `).join('');

  return `
    <div class="interactive-section mb-8">
      <header class="mb-8">
        <h1 class="text-3xl font-extrabold mb-2">Exploración Interactiva — ${moduleData.title}</h1>
        <p class="text-muted text-lg">Experimenta con los conceptos de forma visual</p>
      </header>
      <div class="grid grid-cols-2 gap-6">${graphsHtml}</div>
    </div>
  `;
}

function escapeHtml(text) {
  const map = { '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": '#39' };
  return String(text ?? '').replace(/[&<>"']/g, (ch) => `&${map[ch]};`);
}

function getNextModule(currentId, curriculum) {
  let found = false;
  for (const phase of curriculum.phases) {
    for (const module of phase.modules) {
      if (found) return module.id;
      if (module.id === currentId) found = true;
    }
  }
  return 'm01';
}

/* ==========================================================================
   EXPORT DEFAULT — Vista del módulo
   ========================================================================== */

export default {
  async render(container, params, { store, router, eventBus, curriculum }) {
    const { moduleId, section = 'overview' } = params;

    // Buscar módulo en el currículo
    let moduleData = null;
    let phaseData = null;
    for (const phase of curriculum.phases) {
      const mod = phase.modules.find(m => m.id === moduleId);
      if (mod) {
        moduleData = mod;
        phaseData = phase;
        break;
      }
    }

    if (!moduleData) {
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="text-6xl mb-4">😕</div>
          <h2 class="text-2xl font-bold mb-2">Módulo no encontrado</h2>
          <p class="text-muted mb-6">El módulo "${moduleId}" no existe.</p>
          <a href="#dashboard" class="btn btn-primary">Volver al dashboard</a>
        </div>
      `;
      return;
    }

    // Iniciar módulo si no está started
    const progress = store.getModuleProgress(moduleId);
    if (progress.status === 'available' || progress.status === 'locked') {
      store.startModule(moduleId);
    }

    const content = await loadModuleContent(moduleId);
    const sections = moduleData.sections || ['theory', 'practice', 'quiz', 'interactive'];
    const sectionLabels = {
      overview: 'Resumen',
      theory: 'Teoría',
      practice: 'Práctica',
      quiz: 'Quiz',
      interactive: 'Interactivo',
      summary: 'Resumen'
    };

    const renderSection = (name) => {
      if (section !== name) return '';
      if (name === 'overview') {
        return renderOverview(moduleData, progress);
      }

      if (content && content.kind === 'structured') {
        if (name === 'theory' || name === 'practice') {
          store.completeModuleSection(moduleId, name);
        }
        return renderStructuredSection(name, content.data, moduleData, store);
      }

      if (content && content.kind === 'legacy' && content.data[name]) {
        if (name === 'theory' || name === 'practice') {
          store.completeModuleSection(moduleId, name);
        }
        return content.data[name];
      }

      return renderPlaceholder(name, moduleData);
    };

    container.innerHTML = `
      <div class="container">
        <!-- Module Header -->
        <header class="mb-8">
          <div class="flex items-center gap-3 mb-4 flex-wrap">
            <span class="badge badge-primary">Fase ${phaseData.id}</span>
            <span class="badge badge-neutral">${phaseData.title}</span>
            <span class="badge badge-success">${moduleData.estimatedMinutes} min</span>
            <span class="badge badge-warning">Dificultad ${moduleData.difficulty}/7</span>
          </div>
          <h1 class="text-3xl font-extrabold mb-2">${moduleData.title}</h1>
          <p class="text-muted text-lg">${moduleData.description}</p>
          
          ${moduleData.learningObjectives ? `
            <div class="card p-4 mt-4" style="background: var(--color-bg);">
              <h3 class="text-sm font-semibold mb-3" style="color: var(--brand-primary);">Objetivos de aprendizaje</h3>
              <ul class="text-sm text-muted space-y-1">
                ${moduleData.learningObjectives.map(obj => `<li>✓ ${obj}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </header>
        
        <!-- Tabs -->
        <div class="tabs mb-6" role="tablist">
          ${sections.map(s => `
            <button class="tab ${s === section ? 'active' : ''}" role="tab" id="tab-${s}" data-section="${s}" aria-selected="${s === section}" aria-controls="module-content">
              ${sectionLabels[s] || s}
            </button>
          `).join('')}
        </div>
        
        <!-- Content Area -->
        <div id="module-content" class="tab-panel active">
          ${renderSection('overview')}
          ${renderSection('theory')}
          ${renderSection('practice')}
          ${renderSection('quiz')}
          ${renderSection('interactive')}
        </div>
        
        <!-- Module Navigation -->
        <nav class="mt-10 flex justify-between" aria-label="Navegación entre módulos">
          <a href="#dashboard" class="btn btn-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Dashboard
          </a>
          <a href="#module/${getNextModule(moduleId, curriculum)}" class="btn btn-primary">
            Siguiente módulo
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </nav>
      </div>
    `;

    // Bind tab clicks
    container.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const targetSection = tab.dataset.section;
        router.navigate(`/module/${moduleId}/${targetSection}`, { replace: true });
      });
    });

    // Track view
    store.trackModuleView(moduleId);
  }
};

function renderOverview(moduleData, progress) {
  return `
    <div class="theory-section">
      <div class="card p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">Bienvenido a ${moduleData.title}</h2>
        <p class="text-muted mb-4">${moduleData.description}</p>
        <div class="grid grid-cols-2 gap-4">
          <div class="card p-4" style="background: var(--color-bg);">
            <span class="text-sm text-muted">Tiempo estimado</span>
            <div class="text-2xl font-bold" style="color: var(--brand-primary);">${moduleData.estimatedMinutes} min</div>
          </div>
          <div class="card p-4" style="background: var(--color-bg);">
            <span class="text-sm text-muted">Dificultad</span>
            <div class="text-2xl font-bold" style="color: var(--brand-warning);">${moduleData.difficulty}/7</div>
          </div>
        </div>
      </div>
      
      <div class="card p-6">
        <h3 class="text-lg font-semibold mb-4">Tu progreso en este módulo</h3>
        <div class="flex items-center gap-4 mb-4">
          <progress-ring value="${progress.quizScore / 100 || 0}" max="1" stroke-width="6" show-percentage size="80"></progress-ring>
          <div>
            <p class="text-sm text-muted">Estado: <strong style="color: var(--brand-primary);">${progress.status}</strong></p>
            <p class="text-sm text-muted">Intentos de quiz: ${progress.quizAttempts}</p>
            <p class="text-sm text-muted">Mejor puntuación: ${progress.bestScore}%</p>
          </div>
        </div>
        <div class="flex gap-3 flex-wrap">
          <a href="#module/${moduleData.id}/theory" class="btn btn-primary">Comenzar teoría</a>
          <a href="#module/${moduleData.id}/practice" class="btn btn-secondary">Práctica</a>
          <a href="#module/${moduleData.id}/quiz" class="btn btn-secondary">Quiz</a>
        </div>
      </div>
    </div>
  `;
}
