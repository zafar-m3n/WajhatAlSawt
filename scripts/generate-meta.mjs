// Writes public/sitemap.xml and IMAGES.md from the site data. Run: npm run meta
import fs from 'node:fs'
import { services } from '../src/data/services.js'
import { industries } from '../src/data/industries.js'
import { posts } from '../src/data/posts.js'
import { imageSlots } from '../src/data/images.js'

const SITE = 'https://wajhatalsawt.com'
const paths = [
  '/',
  '/about',
  '/solutions',
  ...services.map((s) => `/solutions/${s.slug}`),
  ...industries.map((i) => `/industries/${i.slug}`),
  '/blogs',
  ...posts.map((p) => `/blogs/${p.slug}`),
  '/contact',
  '/faqs',
  '/privacy',
  '/terms',
  '/cookies',
]
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  paths.map((p) => `  <url><loc>${SITE}${p}</loc></url>`).join('\n') +
  '\n</urlset>\n'
fs.writeFileSync('public/sitemap.xml', xml)

const where = (slot) => {
  if (slot === 'home-hero') return 'Home, hero'
  if (slot === 'about-team') return 'About, story'
  const [kind, ...rest] = slot.split('-')
  const slug = rest.join('-')
  if (kind === 'service') return `Service page /solutions/${slug}`
  if (kind === 'industry') return `Industry page /industries/${slug}`
  if (kind === 'post') return `Blog post /blogs/${slug} (also blog list)`
  return ''
}
const rows = Object.entries(imageSlots).map(
  ([slot, s]) => `| \`${slot}.jpg\` | ${s.ratio.replace(/ /g, '')} | ${s.size} | ${where(slot)} | ${s.keywords} |`,
)
const md = `# Images

Every image on the site is a placeholder until a file is added. To use a Freepik image:

1. Download it at (or above) the listed size and crop to the ratio.
2. Save it as **JPG** with the exact file name below into \`public/images/\`.
3. It appears automatically; the placeholder disappears.

Team photos and social links use placeholder icons and are not listed here.

| File | Ratio | Size | Used on | Freepik search keywords |
|---|---|---|---|---|
${rows.join('\n')}
`
fs.writeFileSync('IMAGES.md', md)
console.log(`sitemap: ${paths.length} urls, images: ${rows.length} slots`)
