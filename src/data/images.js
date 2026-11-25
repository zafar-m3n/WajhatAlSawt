// Image slots. Drop public/images/<slot>.webp and it replaces the placeholder automatically.
// Keywords are suggested Freepik Premium searches.

const main = {
  'home-hero': {
    ratio: '16 / 9',
    size: 'landscape, 2560px+ wide',
    keywords: 'contact center agent headset natural light, customer service professional smiling, call center team modern office',
    alt: 'Wajhat Al Sawt team at work',
  },
  'about-team': {
    ratio: '21 / 9',
    size: 'landscape, 2400px+ wide',
    keywords: 'diverse office team meeting, business team collaborating, call center team portrait',
    alt: 'Wajhat Al Sawt Team',
  },
  'home-why': {
    ratio: '4 / 5',
    size: 'portrait, 1600px+ wide',
    keywords: 'contact center supervisor coaching agent, team leader headset office, support team collaboration',
    alt: 'Wajhat Al Sawt team lead with an agent',
  },
}

// One image per service category (category page banner + home card)
const category = {
  'call-center-outsourcing': 'call center agents headsets modern office, contact center team working',
  'bpo-business-support': 'back office team working laptops office, business operations team documents',
  'after-hours-overflow': 'night shift customer support agent headset, support agent working late office',
  'order-taking-billing': 'agent taking phone order laptop, customer service billing call',
  'inbound-outbound': 'sales agent phone call headset smiling, inbound call center agent answering',
  'customer-service-support': 'customer service representative helping customer headset, help desk support agent',
  'ai-technology': 'person working with AI interface computer, data annotation team computers',
}

// One image per industry (industry page banner + home industries band)
const industry = {
  'banking-financial': 'bank customer service representative headset, financial advisor phone call office',
  ecommerce: 'online shopping customer support agent, ecommerce packages delivery laptop',
  technology: 'SaaS support team laptops office, tech company customer success team',
}

const slots = { ...main }
for (const [k, v] of Object.entries(category)) slots[`service-${k}`] = { ratio: '21 / 9', size: 'landscape, 2400px+ wide', keywords: v }
for (const [k, v] of Object.entries(industry)) slots[`industry-${k}`] = { ratio: '21 / 9', size: 'landscape, 2400px+ wide', keywords: v }

export const imageSlots = slots

export function imageFor(slot) {
  const s = slots[slot]
  if (!s) return null
  return { ...s, slot, file: `/images/${slot}.webp` }
}
