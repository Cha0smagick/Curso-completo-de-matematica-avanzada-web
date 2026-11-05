import { defineConfig } from 'vite';
import { glob } from 'glob';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// import.meta.dirname: Node >= 20.11 (Vite 8 avisa con __dirname por su config loader nativo)
const __dirname = import.meta.dirname;

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: '/Curso-completo-de-matematica-avanzada-web/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    // minify por defecto (oxc). 'terser' ya no está soportado en Vite 8/Rolldown.
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
        // Rolldown: manualChunks se ignora; su API nativa es codeSplitting
        codeSplitting: {
          groups: [
            { name: 'vendor-katex', test: /node_modules[\\/]katex[\\/]/ },
            { name: 'vendor-chart', test: /node_modules[\\/](chart\.js|@kurkle)[\\/]/ },
            { name: 'vendor-floating', test: /node_modules[\\/]@floating-ui[\\/]/ },
            { name: 'vendor-idb', test: /node_modules[\\/]idb[\\/]/ },
            { name: 'core', test: /assets[\\/]js[\\/]core[\\/]/ }
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
  }
});