// scripts/validate-content.js
// Valida la estructura del currículo y preguntas

const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '..', 'assets', 'data', 'curriculum.json');

try {
  const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf-8'));
  
  console.log('✅ Currículo válido');
  console.log(`   Fases: ${curriculum.phases.length}`);
  console.log(`   Módulos: ${curriculum.metadata.totalModules}`);
  
  // Validar que cada módulo tiene los campos requeridos
  let errors = 0;
  for (const phase of curriculum.phases) {
    if (!phase.id && phase.id !== 0) { console.error(`❌ Fase sin id: ${phase.title}`); errors++; }
    if (!phase.title) { console.error(`❌ Fase sin título: ${phase.id}`); errors++; }
    if (!phase.modules || !Array.isArray(phase.modules)) { console.error(`❌ Fase sin módulos: ${phase.title}`); errors++; }
    
    for (const mod of (phase.modules || [])) {
      if (!mod.id) { console.error(`❌ Módulo sin id en fase ${phase.id}`); errors++; }
      if (!mod.title) { console.error(`❌ Módulo sin título: ${mod.id}`); errors++; }
      if (!mod.estimatedMinutes) { console.warn(`⚠️  Módulo sin tiempo estimado: ${mod.id}`); }
    }
  }
  
  if (errors > 0) {
    console.error(`\n❌ ${errors} errores encontrados`);
    process.exit(1);
  }
  
  console.log('✅ Validación completada sin errores');
  process.exit(0);
} catch (error) {
  console.error('❌ Error al validar currículo:', error.message);
  process.exit(1);
}