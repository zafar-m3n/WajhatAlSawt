// Build-time entry: renders a route to static HTML (used by scripts/prerender.mjs).
import { StaticRouter } from 'react-router-dom'
import { prerenderToNodeStream } from 'react-dom/static'
import App from '@/App'

export { pages, notFound } from '@/seo/meta'
export { headFor } from '@/seo/head'

export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  let html = ''
  for await (const chunk of prelude) html += chunk
  return html
}
