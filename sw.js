/* ==========================================================================
   SERVICE WORKER - Matemáticas Avanzadas
   Offline-first caching with Workbox-inspired patterns
   ========================================================================== */

const CACHE_NAME = 'matematicas-avanzadas-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const IMAGE_CACHE = 'images-v1';
const FONT_CACHE = 'fonts-v1';

// Archivos estáticos para cachear inmediatamente
const STATIC_ASSETS = [
  '/Curso-completo-de-matematica-avanzada-web/',
  '/Curso-completo-de-matematica-avanzada-web/index.html',
  '/Curso-completo-de-matematica-avanzada-web/manifest.json',
  '/Curso-completo-de-matematica-avanzada-web/assets/css/variables.css',
  '/Curso-completo-de-matematica-avanzada-web/assets/css/reset.css',
  '/Curso-completo-de-matematica-avanzada-web/assets/css/layout.css',
  '/Curso-completo-de-matematica-avanzada-web/assets/css/components.css',
  '/Curso-completo-de-matematica-avanzada-web/assets/css/course.css',
  '/Curso-completo-de-matematica-avanzada-web/assets/css/animations.css',
  '/Curso-completo-de-matematica-avanzada-web/assets/css/print.css',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/core/app.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/core/store.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/core/router.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/core/events.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/components/MathFormula.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/components/HoverTooltip.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/components/InteractiveGraph.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/components/QuizCard.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/components/ProgressRing.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/components/CertificateView.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/components/SpacedRepetition.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/utils/katex-helper.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/utils/storage.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/js/utils/export-pdf.js',
  '/Curso-completo-de-matematica-avanzada-web/assets/data/curriculum.json',
  'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap'
];

// Estrategias de cache
const CACHE_STRATEGIES = {
  // Cache First: para assets estáticos inmutables
  cacheFirst: async (request, cacheName) => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    if (cached) return cached;
    
    try {
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    } catch {
      return new Response('Offline', { status: 503 });
    }
  },
  
  // Network First: para HTML y datos dinámicos
  networkFirst: async (request, cacheName) => {
    const cache = await caches.open(cacheName);
    
    try {
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    } catch {
      const cached = await cache.match(request);
      if (cached) return cached;
      return new Response('Offline', { status: 503 });
    }
  },
  
  // Stale While Revalidate: para recursos que cambian ocasionalmente
  staleWhileRevalidate: async (request, cacheName) => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    const fetchPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => cached);
    
    return cached || fetchPromise;
  }
};

// Install: cachear assets estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll(STATIC_ASSETS);
      self.skipWaiting();
    })()
  );
});

// Activate: limpiar caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => ![STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE, FONT_CACHE].includes(name))
          .map(name => caches.delete(name))
      );
      self.clients.claim();
    })()
  );
});

// Fetch: interceptar peticiones
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo manejar peticiones GET
  if (request.method !== 'GET') return;
  
  // Ignorar peticiones a APIs externas (analytics, etc.)
  if (url.origin !== location.origin && !url.hostname.includes('fonts.googleapis.com') && !url.hostname.includes('fonts.gstatic.com') && !url.hostname.includes('cdn.jsdelivr.net')) {
    return;
  }
  
  // Determinar estrategia basada en el tipo de recurso
  const pathname = url.pathname;
  
  // HTML pages - Network First
  if (pathname.endsWith('.html') || pathname === '/' || pathname.endsWith('/')) {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request, DYNAMIC_CACHE));
    return;
  }
  
  // CSS/JS - Cache First (versionados en build)
  if (pathname.endsWith('.css') || pathname.endsWith('.js') || pathname.endsWith('.mjs')) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request, STATIC_CACHE));
    return;
  }
  
  // Imágenes - Cache First con cache dedicado
  if (request.destination === 'image' || pathname.match(/\.(png|jpg|jpeg|svg|webp|avico|ico)$/)) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request, IMAGE_CACHE));
    return;
  }
  
  // Fuentes - Cache First
  if (request.destination === 'font' || pathname.match(/\.(woff2?|ttf|eot)$/)) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request, FONT_CACHE));
    return;
  }
  
  // JSON data - Stale While Revalidate
  if (pathname.endsWith('.json')) {
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request, DYNAMIC_CACHE));
    return;
  }
  
  // KaTeX CDN - Cache First
  if (url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request, STATIC_CACHE));
    return;
  }
  
  // Google Fonts - Stale While Revalidate
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request, FONT_CACHE));
    return;
  }
  
  // Default: Network First
  event.respondWith(CACHE_STRATEGIES.networkFirst(request, DYNAMIC_CACHE));
});

// Background Sync para sincronización de datos offline
self.addEventListener('sync', event => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  } else if (event.tag === 'sync-analytics') {
    event.waitUntil(syncAnalytics());
  }
});

// Push notifications (para recordatorios de repaso)
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/Curso-completo-de-matematica-avanzada-web/assets/images/icon-192.png',
    badge: '/Curso-completo-de-matematica-avanzada-web/assets/images/badge-72.png',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: [
      { action: 'open', title: 'Abrir' },
      { action: 'dismiss', title: 'Descartar' }
    ],
    requireInteraction: true
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
          // Si ya hay una ventana abierta, enfocarla
          for (const client of clientList) {
            if (client.url.includes('Curso-completo-de-matematica-avanzada') && 'focus' in client) {
              return client.focus();
            }
          }
          // Si no, abrir nueva
          return clients.openWindow('/Curso-completo-de-matematica-avanzada-web/#review');
        })
    );
  }
});

// Message handling (comunicación con la app)
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data?.type === 'CACHE_MODULE') {
    cacheModule(event.data.moduleId);
  } else if (event.data?.type === 'CLEAR_CACHE') {
    clearAllCaches();
  }
});

// Funciones auxiliares

async function syncProgress() {
  try {
    // En una implementación real, sincronizar con backend
    console.log('[SW] Syncing progress...');
  } catch (error) {
    console.error('[SW] Sync failed:', error);
  }
}

async function syncAnalytics() {
  try {
    console.log('[SW] Syncing analytics...');
  } catch (error) {
    console.error('[SW] Analytics sync failed:', error);
  }
}

async function cacheModule(moduleId) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const modulePaths = [
    `/Curso-completo-de-matematica-avanzada-web/modules/${moduleId}/index.html`,
    `/Curso-completo-de-matematica-avanzada-web/modules/${moduleId}/theory.html`,
    `/Curso-completo-de-matematica-avanzada-web/modules/${moduleId}/practice.html`,
    `/Curso-completo-de-matematica-avanzada-web/modules/${moduleId}/quiz.html`,
    `/Curso-completo-de-matematica-avanzada-web/modules/${moduleId}/interactive.html`,
    `/Curso-completo-de-matematica-avanzada-web/modules/${moduleId}/data.json`
  ];
  
  await Promise.all(
    modulePaths.map(path => 
      fetch(path).then(res => {
        if (res.ok) cache.put(path, res.clone());
      }).catch(() => {})
    )
  );
}

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
}

// Periodic cleanup (ejecutar cada 24h)
setInterval(async () => {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();
  const now = Date.now();
  const MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 días
  
  for (const request of requests) {
    const response = await cache.match(request);
    if (response) {
      const cachedTime = response.headers.get('sw-cached-at');
      if (cachedTime && now - parseInt(cachedTime) > MAX_AGE) {
        await cache.delete(request);
      }
    }
  }
}, 24 * 60 * 60 * 1000);

console.log('[SW] Service Worker loaded');