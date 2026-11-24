import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Icon } from '@iconify/react'
import Logo from '@/components/layout/Logo'
import Button from '@/components/ui/Button'
import { company, nav } from '@/data/site'
import { practices, services } from '@/data/services'
import { industries } from '@/data/industries'

const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]))
const shortTitle = (s) => s.card?.title ?? s.title

function ServicesPanel({ onNavigate }) {
  return (
    <div className="shell grid grid-cols-[minmax(0,15rem)_1fr] gap-12 py-10">
      <div>
        <p className="font-display text-26 tracking-[-0.03em]">Services</p>
        <Link to="/solutions" onClick={onNavigate} className="text-link mt-6 inline-block text-15">
          See all solutions
        </Link>
      </div>
      <div className="columns-3 gap-10">
        {practices.map((p) => (
          <div key={p.slug} className="mb-8 break-inside-avoid">
            <Link to={`/solutions?practice=${p.slug}`} onClick={onNavigate} className="text-15 font-semibold hover:text-mint">
              {p.name}
            </Link>
            <ul className="mt-2 space-y-1.5">
              {p.services.map((slug) => (
                <li key={slug}>
                  <Link to={`/solutions/${slug}`} onClick={onNavigate} className="text-15 text-sage hover:text-linen">
                    {shortTitle(serviceBySlug[slug])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function IndustriesPanel({ onNavigate }) {
  return (
    <div className="shell grid grid-cols-[minmax(0,15rem)_1fr] gap-12 py-10">
      <p className="font-display text-26 tracking-[-0.03em]">Industries</p>
      <ul className="grid grid-cols-2 gap-x-12">
        {industries.map((i) => (
          <li key={i.slug} className="border-t border-line">
            <Link to={`/industries/${i.slug}`} onClick={onNavigate} className="group block py-5">
              <span className="text-17 font-semibold group-hover:text-mint">{i.name}</span>
              <span className="mt-1 block text-15 text-sage">{i.subtitle}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MobileMenu({ onClose }) {
  const [open, setOpen] = useState(null)
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 flex flex-col overflow-y-auto bg-ink lg:hidden"
      id="mobile-menu"
    >
      <ul className="shell flex-1 py-4">
        {nav.map((item) =>
          item.menu ? (
            <li key={item.label} className="border-b border-line">
              <button
                type="button"
                aria-expanded={open === item.menu}
                onClick={() => setOpen(open === item.menu ? null : item.menu)}
                className="flex w-full items-center justify-between py-4 font-display text-26 tracking-[-0.035em]"
              >
                {item.label}
                <Icon icon="ph:caret-down" className={`size-5 text-sage transition-transform ${open === item.menu ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {open === item.menu && (
                <ul className="space-y-3 pb-5">
                  {item.menu === 'services'
                    ? practices.map((p) => (
                        <li key={p.slug}>
                          <Link to={`/solutions?practice=${p.slug}`} onClick={onClose} className="flex justify-between text-17 text-sage">
                            {p.name}
                            <span className="text-15">{p.services.length}</span>
                          </Link>
                        </li>
                      ))
                    : industries.map((i) => (
                        <li key={i.slug}>
                          <Link to={`/industries/${i.slug}`} onClick={onClose} className="text-17 text-sage">
                            {i.name}
                          </Link>
                        </li>
                      ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={item.label} className="border-b border-line">
              <NavLink to={item.to} onClick={onClose} className="block py-4 font-display text-26 tracking-[-0.035em]">
                {item.label}
              </NavLink>
            </li>
          ),
        )}
      </ul>
      <div className="shell space-y-4 border-t border-line py-6">
        <Button to="/contact" onClick={onClose} className="w-full">
          Get started
        </Button>
        <p className="text-15 text-sage">
          <a href={company.phoneHref} className="text-linen">
            {company.phone}
          </a>
          <br />
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
      </div>
    </motion.div>
  )
}

export default function Header() {
  const [panel, setPanel] = useState(null) // 'services' | 'industries' | null
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const ref = useRef(null)
  const closeTimer = useRef()

  useEffect(() => {
    setPanel(null)
    setMobile(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && (setPanel(null), setMobile(false))
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  const openPanel = (p) => {
    clearTimeout(closeTimer.current)
    setPanel(p)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setPanel(null), 140)
  }

  const linkCls = ({ isActive }) => `px-3 py-2 text-15 transition-colors ${isActive ? 'text-linen' : 'text-sage hover:text-linen'}`

  return (
    <header
      ref={ref}
      className={`sticky top-0 z-50 border-b bg-ink transition-colors ${scrolled || panel || mobile ? 'border-line' : 'border-transparent'}`}
      style={{ '--header-h': '4.5rem' }}
      onMouseLeave={scheduleClose}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center lg:flex">
          {nav.map((item) =>
            item.menu ? (
              <button
                key={item.label}
                type="button"
                aria-expanded={panel === item.menu}
                aria-controls={`panel-${item.menu}`}
                onClick={() => setPanel(panel === item.menu ? null : item.menu)}
                onMouseEnter={() => openPanel(item.menu)}
                className={`flex items-center gap-1 px-3 py-2 text-15 transition-colors ${panel === item.menu ? 'text-linen' : 'text-sage hover:text-linen'}`}
              >
                {item.label}
                <Icon icon="ph:caret-down" className={`size-3.5 transition-transform ${panel === item.menu ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            ) : (
              <NavLink key={item.label} to={item.to} className={linkCls} onMouseEnter={() => setPanel(null)}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden lg:block">
            <Button to="/contact" className="px-4 py-2.5">
              Get started
            </Button>
          </span>
          <button
            type="button"
            className="flex items-center gap-2 rounded-[10px] border border-line px-3.5 py-2 text-15 lg:hidden"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setMobile((m) => !m)}
          >
            <Icon icon={mobile ? 'ph:x' : 'ph:list'} className="size-5" aria-hidden="true" />
            {mobile ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {panel && (
          <motion.div
            key={panel}
            id={`panel-${panel}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => openPanel(panel)}
            className="absolute inset-x-0 top-full hidden border-b border-line bg-ink shadow-[0_40px_60px_-30px_rgb(0_0_0/0.8)] lg:block"
          >
            {panel === 'services' ? <ServicesPanel onNavigate={() => setPanel(null)} /> : <IndustriesPanel onNavigate={() => setPanel(null)} />}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{mobile && <MobileMenu onClose={() => setMobile(false)} />}</AnimatePresence>
    </header>
  )
}
