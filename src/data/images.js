// Site photography (WebP, 2560px wide; home-why 2000px), imported through the @/ alias so Vite
// fingerprints and caches them.
//
// `pos` is the CSS object-position used when an image is cropped to fit its frame (wide banners,
// cards). `posMobile` overrides it on phones, where frames are portrait and off-centre subjects
// would otherwise be cut.
import homeHero from '@/assets/home-hero.webp'
import homeWhy from '@/assets/home-why.webp'
import aboutTeam from '@/assets/about-team.webp'
import callCenter from '@/assets/service-call-center-outsourcing.webp'
import bpoSupport from '@/assets/service-bpo-business-support.webp'
import afterHours from '@/assets/service-after-hours-overflow.webp'
import orderBilling from '@/assets/service-order-taking-billing.webp'
import inboundOutbound from '@/assets/service-inbound-outbound.webp'
import customerService from '@/assets/service-customer-service-support.webp'
import aiTechnology from '@/assets/service-ai-technology.webp'
import banking from '@/assets/industry-banking-financial.webp'
import ecommerce from '@/assets/industry-ecommerce.webp'
import technology from '@/assets/industry-technology.webp'

const slots = {
  'home-hero': { file: homeHero, ratio: '16 / 9', alt: 'Wajhat Al Sawt team at work' },
  'home-why': { file: homeWhy, ratio: '4 / 5', alt: 'Wajhat Al Sawt team lead with an agent' },
  'about-team': { file: aboutTeam, ratio: '21 / 9', alt: 'Wajhat Al Sawt Team', pos: 'center 22%' },

  // One image per service category (category page banner + home card)
  'service-call-center-outsourcing': { file: callCenter, ratio: '21 / 9' },
  'service-bpo-business-support': { file: bpoSupport, ratio: '21 / 9', pos: 'center 4%' },
  'service-after-hours-overflow': { file: afterHours, ratio: '21 / 9' },
  'service-order-taking-billing': { file: orderBilling, ratio: '21 / 9', pos: 'center 25%' },
  'service-inbound-outbound': { file: inboundOutbound, ratio: '21 / 9', posMobile: '66% center' },
  'service-customer-service-support': { file: customerService, ratio: '21 / 9' },
  'service-ai-technology': { file: aiTechnology, ratio: '21 / 9', posMobile: '74% center' },

  // One image per industry (industry page banner + home industries band)
  'industry-banking-financial': { file: banking, ratio: '21 / 9', pos: 'center 18%' },
  'industry-ecommerce': { file: ecommerce, ratio: '21 / 9', posMobile: '60% center' },
  'industry-technology': { file: technology, ratio: '21 / 9', pos: 'center 15%', posMobile: '64% center' },
}

export function imageFor(slot) {
  const s = slots[slot]
  return s ? { ...s, slot } : null
}
