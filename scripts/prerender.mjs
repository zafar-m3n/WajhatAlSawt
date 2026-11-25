// Writes a fully rendered HTML file for every page into dist/, after `vite build` and the SSR build.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const { render, pages, notFound, headFor } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href)

const template = fs
  .readFileSync('dist/index.html', 'utf8')
  .replace(/\s*<title>[\s\S]*?<\/title>/, '')
  .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '')

async function write(url, file) {
  const app = await render(url)
  const html = template.replace('</head>', `${headFor(url)}\n  </head>`).replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
  console.log(`prerendered ${url} -> ${file}`)
}

for (const p of pages) await write(p.path, p.path === '/' ? 'dist/index.html' : `dist${p.path}/index.html`)
await write(notFound.path, 'dist/404.html')

// Sitemap from the same page list, dated with this build
const SITE = 'https://wajhatalsawt.com'
const today = new Date().toISOString().slice(0, 10)
const urls = pages.map((p) => `  <url><loc>${SITE}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod></url>`)
const sitemap = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>', '']
fs.writeFileSync('dist/sitemap.xml', sitemap.join('\n'))
console.log(`sitemap: ${pages.length} urls`)

fs.rmSync('dist-ssr', { recursive: true, force: true })
