// Builds the <head> tags written into each prerendered page.
import { SHARE_IMAGE, SITE_NAME, SITE_URL, metaFor } from '@/seo/meta'
import { schemaFor } from '@/seo/schema'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// JSON inside <script> must not be able to close the tag
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

export function headFor(path) {
  const m = metaFor(path)
  const url = m.noindex ? SITE_URL : `${SITE_URL}${m.path === '/' ? '/' : m.path}`
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${m.noindex ? 'noindex' : 'index, follow'}" />`,
    m.noindex ? '' : `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${SHARE_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${SITE_NAME}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${SHARE_IMAGE}" />`,
    ...(m.noindex ? [] : schemaFor(m).map((s) => `<script type="application/ld+json">${json(s)}</script>`)),
  ]
  return tags.filter(Boolean).map((t) => `    ${t}`).join('\n')
}
