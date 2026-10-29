import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { glob } from 'glob';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Disable PWA for now due to Vite 5 compatibility issues
const pwaPlugin = process.env.ENABLE_PWA ? VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'robots.txt'],
  manifest: {
    name: 'Matemáticas Avanzadas - Curso Completo',
    short_name: 'MateAvanzada',
    description: 'Curso profesional completo de matemáticas desde cero hasta nivel universitario avanzado',
    theme_color: '#0a0f1a',
    background_color: '#0a0f1a',
    display: 'standalone',
    orientation: 'portrait-primary',
    scope: '/Curso-completo-de-matematica-avanzada/',
    start_url: '/Curso-completo-de-matematica-avanzada/',
    icons: [
      { src: 'assets/images/icon-72.png', sizes: '72x72', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/images/icon-96.png', sizes: '96x96', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/images/icon-128.png', sizes: '128x128', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/images/icon-144.png', sizes: '144x144', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/images/icon-152.png', sizes: '152x152', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/images/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/images/icon-384.png', sizes: '384x384', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/images/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable any' }
    ],
    categories: ['education', 'science'],
    shortcuts: [
      { name: 'Continuar aprendiendo', short_name: 'Continuar', url: '/Curso-completo-de-matematica-avanzada/#dashboard', description: 'Volver a tu último módulo' },
      { name: 'Ver progreso', short_name: 'Progreso', url: '/Curso-completo-de-matematica-avanzada/#progress', description: 'Ver tu progreso global y certificados' }
    ]
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json,webmanifest}'],
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    runtimeCaching: [
      { urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, handler: 'CacheFirst', options: { cacheName: 'google-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }, cacheableResponse: { statuses: [0, 200] } } },
      { urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i, handler: 'CacheFirst', options: { cacheName: 'gstatic-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }, cacheableResponse: { statuses: [0, 200] } } },
      { urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, handler: 'StaleWhileRevalidate', options: { cacheName: 'jsdelivr-cache', expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 } } }
    ],
    cleanupOutdatedCaches: true,
    skipWaiting: true,
    clientsClaim: true
  },
  devOptions: { enabled: false }
}) : null;

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: '/Curso-completo-de-matematica-avanzada/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...Object.fromEntries(
          glob.sync('phases/*.html').map(file => [
            file.replace('.html', '').replace('phases/', ''),
            resolve(__dirname, file)
          ])
        ),
        ...Object.fromEntries(
          glob.sync('modules/**/index.html').map(file => [
            file.replace('modules/', '').replace('/index.html', ''),
            resolve(__dirname, file)
          ])
        )
      },
      output: {
        manualChunks: {
          'vendor-katex': ['katex'],
          'vendor-chart': ['chart.js'],
          'vendor-d3': ['d3'],
          'vendor-floating': ['@floating-ui/dom'],
          'vendor-idb': ['idb'],
          'core': [
            './assets/js/core/app.js',
            './assets/js/core/store.js',
            './assets/js/core/router.js',
            './assets/js/core/events.js'
          ]
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|ttf|eot)$/.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          if (/\.css$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      }
    },
    cssCodeSplit: true,
    modulePreload: { polyfill: true },
    target: 'es2022'
  },
  server: {
    port: 3000,
    open: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  plugins: [
    pwaPlugin,
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(
          /%BUILD_DATE%/g,
          new Date().toISOString()
        ).replace(
          /%COMMIT_SHA%/g,
          process.env.COMMIT_SHA || 'dev'
        ).replace(
          /%VERSION%/g,
          JSON.parse(readFileSync('./package.json', 'utf-8')).version
        );
      }
    }
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'assets/js'),
      '@components': resolve(__dirname, 'assets/js/components'),
      '@core': resolve(__dirname, 'assets/js/core'),
      '@utils': resolve(__dirname, 'assets/js/utils'),
      '@data': resolve(__dirname, 'assets/data'),
      '@modules': resolve(__dirname, 'modules')
    }
  },
  css: {
    devSourcemap: true
  },
  esbuild: {
    target: 'es2022',
    treeShaking: true,
    legalComments: 'none'
  }
});