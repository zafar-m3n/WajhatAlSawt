// Structured data (JSON-LD) for search engines. Build-time only (imported by the prerenderer).
import { company } from '@/data/site'
import { practices, services } from '@/data/services'
import { industries } from '@/data/industries'
import { faqs } from '@/data/faqs'
import { SITE_NAME, SITE_URL, TAGLINE } from '@/seo/meta'

const ORG_ID = `${SITE_URL}/#organization`

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description: TAGLINE,
  email: company.email,
  telephone: company.phone,
  // Address comes from site data, so updating company.address updates search data too
  address: { '@type': 'PostalAddress', streetAddress: company.address },
  areaServed: ['Worldwide', 'Middle East'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: company.phone,
    email: company.email,
    availableLanguage: ['English'],
  },
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': ORG_ID },
}

function breadcrumbs(crumbs) {
  const items = [{ name: 'Home', path: '/' }, ...crumbs]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: `${SITE_URL}${c.path}` } : {}),
    })),
  }
}

function faqPage(list) {
  if (!list?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

function serviceList(practiceSlug) {
  const p = practices.find((x) => x.slug === practiceSlug)
  const list = p.services.map((s) => services.find((x) => x.slug === s))
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: p.name,
    itemListElement: list.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.intro,
        url: `${SITE_URL}/services/${p.slug}#${s.slug}`,
        serviceType: p.name,
        provider: { '@id': ORG_ID },
        areaServed: ['Worldwide', 'Middle East'],
      },
    })),
  }
}

/** All JSON-LD blocks for a page's metadata entry. */
export function schemaFor(meta) {
  const blocks = [organization]
  if (meta.path === '/') blocks.push(website)
  if (meta.crumbs) blocks.push(breadcrumbs(meta.crumbs))
  if (meta.practice) {
    blocks.push(serviceList(meta.practice))
    const p = practices.find((x) => x.slug === meta.practice)
    const list = p.services.flatMap((s) => services.find((x) => x.slug === s).sections.find((x) => x.faqs)?.faqs ?? [])
    blocks.push(faqPage(list))
  }
  if (meta.industry) {
    const ind = industries.find((x) => x.slug === meta.industry)
    blocks.push(faqPage(ind.sections.find((x) => x.faqs)?.faqs))
  }
  if (meta.path === '/faqs') blocks.push(faqPage(faqs.general))
  if (meta.path === '/contact') blocks.push(faqPage(faqs.contact))
  return blocks.filter(Boolean)
}
