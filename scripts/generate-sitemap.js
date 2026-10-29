// scripts/generate-sitemap.js
// Genera sitemap.xml para SEO

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://cha0smagick.github.io/Curso-completo-de-matematica-avanzada-web';
const DIST_DIR = path.join(__dirname, '..', 'dist');

const pages = [
  { url: '', priority: '1.0', changefreq: 'weekly' },
  { url: '#dashboard', priority: '0.9', changefreq: 'daily' },
  { url: '#progress', priority: '0.7', changefreq: 'weekly' },
  { url: '#certificates', priority: '0.7', changefreq: 'weekly' },
  { url: '#review', priority: '0.8', changefreq: 'daily' },
  { url: '#settings', priority: '0.5', changefreq: 'monthly' }
];

// Añadir módulos
for (let i = 1; i <= 46; i++) {
  const num = i.toString().padStart(2, '0');
  pages.push({ url: `modules/m${num}/`, priority: '0.8', changefreq: 'weekly' });
}

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