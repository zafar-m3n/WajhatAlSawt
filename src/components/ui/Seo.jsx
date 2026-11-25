import { useEffect } from 'react'
import { SHARE_IMAGE, SITE_URL, metaFor } from '@/seo/meta'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Keeps <head> in sync when navigating inside the app. The prerendered HTML already carries
 * the same tags for each page, so crawlers and link previews never depend on this running.
 */
export default function Seo({ path }) {
  useEffect(() => {
    const m = metaFor(path)
    const url = `${SITE_URL}${m.path === '/404' ? '' : m.path}`
    document.title = m.title
    setMeta('name', 'description', m.description)
    setMeta('name', 'robots', m.noindex ? 'noindex' : 'index, follow')
    setMeta('property', 'og:title', m.title)
    setMeta('property', 'og:description', m.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', SHARE_IMAGE)
    setMeta('name', 'twitter:title', m.title)
    setMeta('name', 'twitter:description', m.description)
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [path])
  return null
}
