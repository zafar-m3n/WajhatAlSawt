// Image slots. Drop a file at public/images/<file> and it replaces the placeholder automatically.
// Keywords are suggested Freepik Premium searches.

const service = {
  'customer-support-excellence': 'customer support agent headset smiling, multichannel support team office',
  'technical-support': 'IT support engineer monitors headset, technical help desk night shift',
  'back-office-operations': 'back office team documents laptop, data processing office professional',
  'sales-lead-generation': 'sales development representative calling, sales team headset office',
  'finance-accounting': 'accountant reviewing reports laptop, finance team office calculator',
  'hr-recruitment': 'recruiter interviewing candidate, HR team hiring office',
  'virtual-call-center-solutions': 'remote call center agent home office headset, virtual agent laptop',
  'customer-experience-management': 'customer experience team analysing feedback, CX manager dashboard',
  'contact-center-as-a-service': 'cloud contact center agents, omnichannel support software team',
  'contact-center-workforce-optimization': 'contact center supervisor floor, workforce planning team',
  'onshore-call-center-services': 'call center team local office, agents headsets bright office',
  'nearshore-call-center-services': 'call center agents collaboration, multilingual support team',
  'offshore-call-center-services': 'large contact center floor agents, global support team',
  'smartshore-call-center-services': 'hybrid support team video call, global team collaboration',
  'back-office-support': 'back office administrator data entry, document management office',
  'revenue-cycle-management': 'medical billing specialist computer, healthcare revenue cycle office',
  'workforce-management': 'workforce manager scheduling screen, operations planning team',
  'management-business-support': 'business support team meeting, operations manager office',
  'enterprise-contact-center': 'enterprise contact center large team, corporate call center modern',
  'small-business-contact-center': 'small business owner phone call, receptionist small office',
  'sms-support': 'person reading text message smartphone, sms customer service',
  'email-support': 'support agent answering emails laptop, customer service email desk',
  'live-chat-support': 'live chat agent laptop headset, customer chat support',
  'order-taking': 'agent taking phone order, ecommerce order call center',
  'billing-payment-support': 'billing support agent payment, customer paying invoice phone',
  'subscription-continuity': 'subscription service customer smartphone, retention agent call',
  'inbound-contact-center-solutions': 'inbound call center agent answering, receptionist headset',
  'omnichannel-customer-support': 'omnichannel support agent multiple screens, chat email phone support',
  'lead-qualification': 'sales rep qualifying lead phone, sales call notes laptop',
  'cross-selling-upselling': 'sales agent recommending product phone, retail upsell call',
  'appointment-setting': 'agent booking appointment calendar, scheduler phone call',
  'answering-services': 'virtual receptionist answering phone, front desk headset',
  'help-desk': 'help desk technician supporting user, IT service desk',
  'content-moderation': 'content moderator reviewing screen, trust and safety team',
  'ai-data-annotation': 'data annotator labelling images computer, AI training data team',
  'ai-as-a-service': 'AI assistant interface business, team using AI software',
  'ai-implementation': 'AI implementation team meeting, engineers deploying AI system',
  'human-in-the-loop': 'person reviewing AI output screen, human AI collaboration',
}

const industry = {
  automotive: 'car service advisor customer, automotive dealership service center',
  'banking-financial': 'bank customer service representative, financial advisor phone call',
  ecommerce: 'online shopping customer support, ecommerce warehouse packages',
  technology: 'SaaS support team laptops, tech company customer success',
}

const post = {
  'future-of-bpo-ai-transforming-outsourcing': 'AI and human collaboration office, artificial intelligence business',
  'data-security-outsourcing-best-practices-2025': 'data security lock laptop, cybersecurity professional',
  'how-to-choose-right-bpo-partner': 'business partners handshake meeting, choosing partner discussion',
  'building-world-class-customer-experience-2025': 'happy customer support interaction, customer experience',
  'rise-of-remote-work-impact-on-bpo': 'remote worker home office headset, work from home agent',
  '5-key-benefits-outsourcing-back-office': 'back office team paperwork, outsourcing operations office',
  omnichannel: 'omnichannel communication phone chat email, customer on smartphone',
  'sales-call-logistics': 'sales call logistics warehouse, delivery planning phone',
}

const slots = {
  'home-hero': {
    ratio: '3 / 2',
    size: '2100×1400',
    keywords: 'contact center agent headset natural light, customer service professional smiling, call center team modern office',
    alt: 'Wajhat Al Sawt team at work',
  },
  'about-team': {
    ratio: '4 / 5',
    size: '1600×2000',
    keywords: 'diverse office team meeting, business team collaborating, call center team portrait',
    alt: 'Wajhat Al Sawt Team',
  },
}
for (const [k, v] of Object.entries(service)) slots[`service-${k}`] = { ratio: '3 / 2', size: '1800×1200', keywords: v }
for (const [k, v] of Object.entries(industry)) slots[`industry-${k}`] = { ratio: '21 / 9', size: '2400×1030', keywords: v }
for (const [k, v] of Object.entries(post)) slots[`post-${k}`] = { ratio: '16 / 9', size: '1920×1080', keywords: v }

export const imageSlots = slots

export function imageFor(slot) {
  const s = slots[slot]
  if (!s) return null
  return { ...s, slot, file: `/images/${slot}.jpg` }
}
