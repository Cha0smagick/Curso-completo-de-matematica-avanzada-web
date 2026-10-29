import { defineConfig } from 'vite';
import { glob } from 'glob';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: '/Curso-completo-de-matematica-avanzada-web/',
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