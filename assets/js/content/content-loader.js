/* ==========================================================================
   CONTENT LOADER — Carga contenido estructurado de módulos
   Registro explícito de módulos con contenido estructurado (content.js).
   Esto evita problemas de análisis estático con import dinámica variable.
   ========================================================================== */

import { validateModuleContent } from './module-schema.js';

const cache = new Map();

// Registro de módulos con contenido estructurado disponible.
// Añadir aquí cada módulo a medida que se completa su autoría pedagógica.
// Usar new URL(..., import.meta.url) para rutas absolutas correctas desde cualquier ubicación.
const MODULE_CONTENT_IMPORTS = {
  'm02': () => import(new URL('../../modules/m02/content.js', import.meta.url).href),
  'm03': () => import(new URL('../../modules/m03/content.js', import.meta.url).href),
  'm04': () => import(new URL('../../modules/m04/content.js', import.meta.url).href),
  'm05': () => import(new URL('../../modules/m05/content.js', import.meta.url).href),
  'm06': () => import(new URL('../../modules/m06/content.js', import.meta.url).href),
  'm07': () => import(new URL('../../modules/m07/content.js', import.meta.url).href),
  'm08': () => import(new URL('../../modules/m08/content.js', import.meta.url).href),
  'm09': () => import(new URL('../../modules/m09/content.js', import.meta.url).href),
  'm10': () => import(new URL('../../modules/m10/content.js', import.meta.url).href),
  'm11': () => import(new URL('../../modules/m11/content.js', import.meta.url).href),
  'm12': () => import(new URL('../../modules/m12/content.js', import.meta.url).href),
  'm13': () => import(new URL('../../modules/m13/content.js', import.meta.url).href),
  'm14': () => import(new URL('../../modules/m14/content.js', import.meta.url).href),
  'm15': () => import(new URL('../../modules/m15/content.js', import.meta.url).href),
  'm16': () => import(new URL('../../modules/m16/content.js', import.meta.url).href),
  'm17': () => import(new URL('../../modules/m17/content.js', import.meta.url).href),
  'm18': () => import(new URL('../../modules/m18/content.js', import.meta.url).href),
  'm19': () => import(new URL('../../modules/m19/content.js', import.meta.url).href),
  'm20': () => import(new URL('../../modules/m20/content.js', import.meta.url).href),
  'm21': () => import(new URL('../../modules/m21/content.js', import.meta.url).href),
  'm22': () => import(new URL('../../modules/m22/content.js', import.meta.url).href),
  'm23': () => import(new URL('../../modules/m23/content.js', import.meta.url).href),
  'm24': () => import(new URL('../../modules/m24/content.js', import.meta.url).href),
  'm25': () => import(new URL('../../modules/m25/content.js', import.meta.url).href),
  'm26': () => import(new URL('../../modules/m26/content.js', import.meta.url).href),
  'm27': () => import(new URL('../../modules/m27/content.js', import.meta.url).href),
  'm28': () => import(new URL('../../modules/m28/content.js', import.meta.url).href),
  'm29': () => import(new URL('../../modules/m29/content.js', import.meta.url).href),
  'm30': () => import(new URL('../../modules/m30/content.js', import.meta.url).href)
};

/**
 * Carga el contenido estructurado de un módulo.
 * @param {string} moduleId — ej: 'm02'
 * @returns {Promise<Object|null>} Contenido validado o null si no existe / no es válido
 */
export async function loadModuleContent(moduleId) {
  if (cache.has(moduleId)) {
    return cache.get(moduleId);
  }

  const importFn = MODULE_CONTENT_IMPORTS[moduleId];
  if (!importFn) {
    cache.set(moduleId, null);
    return null;
  }

  try {
    const mod = await importFn();
    const content = mod.default || mod;

    const validation = validateModuleContent(content);
    if (!validation.valid) {
      console.warn(`[ContentLoader] ${moduleId} no cumple esquema:`, validation.errors);
      cache.set(moduleId, null);
      return null;
    }

    cache.set(moduleId, content);
    return content;
  } catch (err) {
    console.warn(`[ContentLoader] Error cargando ${moduleId}:`, err.message);
    cache.set(moduleId, null);
    return null;
  }
}

/**
 * Verifica si un módulo tiene contenido estructurado disponible (sin lanzar).
 */
export async function hasModuleContent(moduleId) {
  return (await loadModuleContent(moduleId)) !== null;
}

/**
 * Limpia el caché (útil en tests).
 */
export function clearContentCache() {
  cache.clear();
}

/**
 * Devuelve la lista de IDs de módulos con contenido estructurado disponible.
 */
export function availableModuleIds() {
  return Object.keys(MODULE_CONTENT_IMPORTS);
}
