import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Icon } from '@iconify/react'
import Logo from '@/components/layout/Logo'
import Button from '@/components/ui/Button'
import { company, nav } from '@/data/site'
import { practices, serviceIndex, industryIndex as industries } from '@/data/catalog'

const titleOf = Object.fromEntries(serviceIndex.map((s) => [s.slug, s.title]))
const EASE = [0.22, 1, 0.36, 1]
const panelMotion = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 6, scale: 0.98 },
  transition: { duration: 0.22, ease: EASE },
}

function ServicesMenu({ onNavigate }) {
  const [active, setActive] = useState(practices[0].slug)
  const p = practices.find((x) => x.slug === active)
  return (
    <motion.div
      {...panelMotion}
      id="menu-services"
      className="absolute top-full left-1/2 mt-3 grid w-[48rem] -translate-x-1/2 grid-cols-[20.5rem_1fr] overflow-hidden rounded-[18px] border border-line bg-fern shadow-[0_30px_60px_-20px_rgb(0_0_0/0.75)]"
    >
      <ul className="space-y-0.5 border-r border-line p-3">
        {practices.map((x) => (
          <li key={x.slug}>
            <Link
              to={`/services/${x.slug}`}
              onMouseEnter={() => setActive(x.slug)}
              onFocus={() => setActive(x.slug)}
              onClick={onNavigate}
              className={`flex items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-15 transition-colors ${
                active === x.slug ? 'bg-moss text-linen' : 'text-sage hover:text-linen'
              }`}
            >
              {x.name}
              <Icon icon="ph:caret-right" className={`size-3.5 ${active === x.slug ? 'text-mint' : 'opacity-0'}`} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col p-5">
        <AnimatePresence mode="wait">
          <motion.ul
            key={p.slug}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18 }}
            className="space-y-0.5"
          >
            {p.services.map((slug) => (
              <li key={slug}>
                <Link to={`/services/${p.slug}#${slug}`} onClick={onNavigate} className="block rounded-[8px] px-2 py-1.5 text-15 text-linen/90 transition-colors hover:text-mint">
                  {titleOf[slug]}
                </Link>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
        <Link to={`/services/${p.slug}`} onClick={onNavigate} className="text-link mt-auto self-start px-2 pt-4 text-15">
          Open {p.name}
        </Link>
      </div>
    </motion.div>
  )
}

function IndustriesMenu({ onNavigate }) {
  return (
    <motion.div
      {...panelMotion}
      id="menu-industries"
      className="absolute top-full left-1/2 mt-3 w-[24rem] -translate-x-1/2 rounded-[18px] border border-line bg-fern p-3 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.75)]"
    >
      <ul className="space-y-0.5">
        {industries.map((i) => (
          <li key={i.slug}>
            <Link to={`/industries/${i.slug}`} onClick={onNavigate} className="group block rounded-[10px] px-3 py-3 transition-colors hover:bg-moss">
              <span className="text-15 font-semibold group-hover:text-mint">{i.name}</span>
              <span className="mt-0.5 block text-13 text-sage">{i.subtitle}</span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/** Nav item with a dropdown that stays open while the pointer is over the link or the panel. */
function MenuItem({ item, open, setOpen }) {
  const timer = useRef()
  const isOpen = open === item.menu
  const enter = () => {
    clearTimeout(timer.current)
    setOpen(item.menu)
  }
  const leave = () => {
    timer.current = setTimeout(() => setOpen((o) => (o === item.menu ? null : o)), 160)
  }
  useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`menu-${item.menu}`}
        onClick={() => setOpen(isOpen ? null : item.menu)}
        className={`flex items-center gap-1 px-3 py-2 text-15 transition-colors ${isOpen ? 'text-linen' : 'text-sage hover:text-linen'}`}
      >
        {item.label}
        <Icon icon="ph:caret-down" className={`size-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {/* hover bridge so the gap above the panel doesn't close it */}
      {isOpen && <span className="absolute top-full left-0 h-4 w-full" aria-hidden="true" />}
      <AnimatePresence>
        {isOpen &&
          (item.menu === 'services' ? (
            <ServicesMenu key="s" onNavigate={() => setOpen(null)} />
          ) : (
            <IndustriesMenu key="i" onNavigate={() => setOpen(null)} />
          ))}
      </AnimatePresence>
    </div>
  )
}

function MobileMenu({ onClose }) {
  const [open, setOpen] = useState(null)
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.45, ease: EASE }}
      className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 flex flex-col overflow-y-auto bg-ink lg:hidden"
      id="mobile-menu"
      data-lenis-prevent
    >
      <ul className="shell flex-1 py-4">
        {nav.map((item, i) => (
          <motion.li
            key={item.label}
            className="border-b border-line"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: EASE }}
          >
            {item.menu ? (
              <>
                <button
                  type="button"
                  aria-expanded={open === item.menu}
                  onClick={() => setOpen(open === item.menu ? null : item.menu)}
                  className="flex w-full items-center justify-between py-4 font-display text-33 font-semibold tracking-[-0.02em]"
                >
                  {item.label}
                  <Icon icon="ph:caret-down" className={`size-5 text-sage transition-transform ${open === item.menu ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {open === item.menu && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="space-y-3 overflow-hidden pb-5"
                    >
                      {(item.menu === 'services' ? practices : industries).map((x) => (
                        <li key={x.slug}>
                          <Link
                            to={item.menu === 'services' ? `/services/${x.slug}` : `/industries/${x.slug}`}
                            onClick={onClose}
                            className="flex justify-between text-17 text-sage"
                          >
                            {x.name}
                            {x.services && <span className="text-15">{x.services.length}</span>}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <NavLink to={item.to} onClick={onClose} className="block py-4 font-display text-33 font-semibold tracking-[-0.02em]">
                {item.label}
              </NavLink>
            )}
          </motion.li>
        ))}
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
  const [open, setOpen] = useState(null) // 'services' | 'industries' | null
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)

  // Close menus whenever the URL changes (incl. back/forward)
  const routeKey = location.pathname + location.search
  const [lastRoute, setLastRoute] = useState(routeKey)
  if (lastRoute !== routeKey) {
    setLastRoute(routeKey)
    setOpen(null)
    setMobile(false)
  }

  // Hide while scrolling down, reveal on scroll up
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      setHidden(y > 160 && y > last)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && (setOpen(null), setMobile(false))
    const onDown = (e) => navRef.current && !navRef.current.contains(e.target) && setOpen(null)
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  const linkCls = ({ isActive }) => `px-3 py-2 text-15 transition-colors ${isActive ? 'text-linen' : 'text-sage hover:text-linen'}`
  const show = !hidden || open || mobile

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-ink/90 backdrop-blur-md transition-[transform,border-color] duration-500 ${
        show ? 'translate-y-0' : '-translate-y-full'
      } ${scrolled || mobile ? 'border-line' : 'border-transparent'}`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />
        <nav ref={navRef} aria-label="Main" className="hidden items-center lg:flex">
          {nav.map((item) =>
            item.menu ? (
              <MenuItem key={item.label} item={item} open={open} setOpen={setOpen} />
            ) : (
              <NavLink key={item.label} to={item.to} className={linkCls}>
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
      {createPortal(<AnimatePresence>{mobile && <MobileMenu onClose={() => setMobile(false)} />}</AnimatePresence>, document.body)}
    </header>
  )
}
