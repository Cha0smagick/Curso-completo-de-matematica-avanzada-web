// scripts/generate-sitemap.js
// Genera sitemap.xml para SEO

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://cha0smagick.github.io/Curso-completo-de-matematica-avanzada-web';
const DIST_DIR = path.join(__dirname, '..', 'dist');

// Solo URLs que realmente existen en dist (el sitemap anterior enlazaba 45 módulos
// inexistentes y URLs #hash que no son páginas indexables)
const pages = [
  { url: '', priority: '1.0', changefreq: 'weekly' },
  { url: 'modules/m01/', priority: '0.8', changefreq: 'monthly' }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${BASE_URL}/${p.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
console.log(`✅ Sitemap generado en ${sitemapPath} (${pages.length} URLs)`);