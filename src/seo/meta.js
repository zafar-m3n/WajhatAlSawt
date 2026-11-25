// Page metadata (titles, descriptions, share image) for every route.
// Used in the browser on navigation and by the build-time prerenderer.
import { practices, industryIndex } from '@/data/catalog'

export const SITE_URL = 'https://wajhatalsawt.com'
export const SITE_NAME = 'Wajhat Al Sawt'
export const SHARE_IMAGE = `${SITE_URL}/og-image.jpg`
export const TAGLINE = 'Global BPO & contact center services, based in the Middle East'

const page = (path, title, description, extra = {}) => ({ path, title, description, ...extra })

export const pages = [
  page(
    '/',
    'BPO & Contact Center Services, Middle East | Wajhat Al Sawt',
    'Wajhat Al Sawt is a Middle East based BPO and contact center provider delivering customer support, back office and AI services to enterprises worldwide.',
  ),
  page(
    '/about',
    'About Us | Wajhat Al Sawt',
    'Wajhat Al Sawt helps enterprises worldwide run leaner, smarter operations through dedicated outsourcing teams, delivered from our base in the Middle East.',
  ),
  ...practices.map((p) =>
    page(`/services/${p.slug}`, `${p.name} | Wajhat Al Sawt`, p.description, {
      crumbs: [{ name: 'Services' }, { name: p.name, path: `/services/${p.slug}` }],
      practice: p.slug,
    }),
  ),
  ...industryIndex.map((i) =>
    page(`/industries/${i.slug}`, `${i.title} | Wajhat Al Sawt`, i.intro, {
      crumbs: [{ name: 'Industries' }, { name: i.name, path: `/industries/${i.slug}` }],
      industry: i.slug,
    }),
  ),
  page(
    '/contact',
    'Contact Us | Wajhat Al Sawt',
    'Speak with Wajhat Al Sawt about outsourcing your customer support, back office or contact center operations. Our team responds within 24 hours.',
  ),
  page(
    '/faqs',
    'Frequently Asked Questions | Wajhat Al Sawt',
    'Answers to common questions about Wajhat Al Sawt outsourcing services, onboarding timelines, data security, contract terms and team scaling.',
  ),
  page('/privacy', 'Privacy Policy | Wajhat Al Sawt', 'How Wajhat Al Sawt collects, uses and protects your personal information.'),
  page('/terms', 'Terms of Service | Wajhat Al Sawt', 'The terms that govern your use of the Wajhat Al Sawt website and services.'),
  page('/cookies', 'Cookie Policy | Wajhat Al Sawt', 'How Wajhat Al Sawt uses cookies and similar technologies on this website.'),
]

export const notFound = page('/404', 'Page Not Found | Wajhat Al Sawt', 'The page you are looking for does not exist or has moved.', {
  noindex: true,
})

export function metaFor(path) {
  const clean = path.replace(/\/+$/, '') || '/'
  return pages.find((p) => p.path === clean) ?? notFound
}
