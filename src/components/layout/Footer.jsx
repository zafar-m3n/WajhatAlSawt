import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { company, footerLinks } from '@/data/site'
import { practices, industryIndex as industries } from '@/data/catalog'

export default function Footer() {
  const columns = {
    ...footerLinks,
    Services: practices.map((p) => ({ label: p.name, to: `/services/${p.slug}` })),
    Industries: industries.map((i) => ({ label: i.name, to: `/industries/${i.slug}` })),
  }
  // Brand block + these three columns = 4 columns on desktop; legal links live in the bottom bar
  const order = ['Company', 'Services', 'Industries']

  return (
    <footer className="mt-32 overflow-hidden border-t border-line md:mt-40">
      <div className="shell grid gap-12 pt-16 md:grid-cols-[minmax(0,1.3fr)_minmax(0,2.7fr)] md:gap-16">
        <div className="space-y-6">
          <p className="measure text-15 text-sage">{company.blurb}</p>
          <address className="space-y-1 text-15 not-italic">
            <a href={`mailto:${company.email}`} className="block hover:text-mint">
              {company.email}
            </a>
            <a href={`mailto:${company.careersEmail}`} className="block hover:text-mint">
              {company.careersEmail}
            </a>
            <span className="block text-sage">{company.address}</span>
          </address>
          <ul className="flex gap-2" aria-label="Social media">
            {company.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} className="grid size-10 place-items-center rounded-full border border-line text-sage transition-colors hover:border-mint hover:text-linen">
                  <Icon icon={s.icon} className="size-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
          {order.map((col) => (
            <div key={col}>
              <h2 className="font-sans text-15 font-semibold tracking-normal text-linen">{col}</h2>
              <ul className="mt-4 space-y-2.5">
                {columns[col].map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-15 text-sage transition-colors hover:text-linen">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <p aria-hidden="true" className="shell mt-20 font-display text-[clamp(2.2rem,10.4vw,9.25rem)] leading-[0.82] font-light tracking-[-0.02em] whitespace-nowrap text-linen/90 select-none">
        Wajhat <span className="text-sage/70">Al</span> Sawt
      </p>
      <div className="shell flex flex-col gap-3 border-t border-line py-6 text-13 text-sage sm:flex-row sm:justify-between">
        <p>© 2026 Wajhat Al Sawt. All rights reserved.</p>
        <p className="flex gap-5">
          <Link to="/privacy" className="hover:text-linen">Privacy</Link>
          <Link to="/terms" className="hover:text-linen">Terms</Link>
          <Link to="/cookies" className="hover:text-linen">Cookies</Link>
        </p>
      </div>
    </footer>
  )
}
