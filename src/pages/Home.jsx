import { motion, useReducedMotion } from 'motion/react'
import { Icon } from '@iconify/react'
import Button from '@/components/ui/Button'
import Photo from '@/components/ui/Photo'
import Seo from '@/components/ui/Seo'
import { company, home } from '@/data/site'

const ease = [0.2, 0.8, 0.2, 1]

/** The logo's sound waves, drawn toward the hero photo on first load. */
function Waves({ animate }) {
  const arcs = ['M30 70a40 40 0 0 1 0 80', 'M30 40a70 70 0 0 1 0 140', 'M30 10a100 100 0 0 1 0 200']
  return (
    <svg viewBox="0 0 140 220" fill="none" className="h-full w-auto" aria-hidden="true">
      <motion.circle
        cx="30"
        cy="110"
        r="7"
        fill="#7EE8BF"
        initial={animate ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease }}
      />
      {arcs.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="#7EE8BF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity={1 - i * 0.28}
          initial={animate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.25 + i * 0.18, ease }}
        />
      ))}
    </svg>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const rise = (i) =>
    reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: 0.15 + i * 0.1, ease } }
  const lines = ['Empowering', 'Businesses Through', 'Smart Outsourcing']

  return (
    <section className="shell pt-12 pb-20 md:pt-20 lg:pb-28">
      <h1 className="display-hero">
        {lines.map((l, i) => (
          <motion.span key={l} className="block whitespace-nowrap max-sm:whitespace-normal" {...rise(i)}>
            {l}
          </motion.span>
        ))}
      </h1>

      <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
        <motion.div {...rise(3)} className="lg:pb-4">
          <p className="deck max-w-[38ch]">{home.lede}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button to="/contact">Get started</Button>
            <Button to="/solutions" variant="secondary">
              Our solutions
            </Button>
          </div>
        </motion.div>

        <div className="relative pl-14 sm:pl-20 lg:pl-24">
          <div className="absolute top-1/2 left-0 h-36 -translate-y-1/2 sm:h-48 lg:h-64">
            <Waves animate={!reduce} />
          </div>
          <Photo slot="home-hero" eager rounded="rounded-[28px] rounded-tl-[140px]" className="relative w-full" />
        </div>
      </div>
    </section>
  )
}

const B = ({ children }) => <span className="text-linen">{children}</span>

function Facts() {
  const f = Object.fromEntries(home.facts.map((x) => [x.label, x.value]))
  return (
    <section className="bg-fern" aria-label="Wajhat Al Sawt in numbers">
      <p className="shell display-section py-20 font-light text-sage md:py-28">
        <B>{f['Rated BPO Provider 2026']}</B> rated BPO provider of 2026, trusted by <B>{f['Global Clients']}</B> global
        clients in <B>{f['Countries Served']}</B> countries, with <B>{f['Client Retention']}</B> client retention and{' '}
        <B>{f['Professionals']}</B> professionals.
      </p>
    </section>
  )
}

function Journey() {
  const { journey } = home
  return (
    <section className="shell grid gap-12 pt-28 md:pt-40 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-24">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <h2 className="display-section">{journey.title}</h2>
        <p className="deck mt-6 max-w-[34ch]">{journey.intro}</p>
        <div className="mt-10 hidden lg:block">
          <p className="text-15 text-sage">{journey.cta}</p>
          <Button to="/contact" className="mt-4">
            Get started today
          </Button>
        </div>
      </div>
      <ol className="border-t border-line">
        {journey.steps.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-x-6 border-b border-line py-9 md:grid-cols-[5rem_1fr] md:py-12">
            <span className="font-display text-33 leading-none font-light text-mint md:text-41" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h3 className="text-21 tracking-[-0.025em] md:text-26">{s.title}</h3>
              <p className="measure mt-3 text-sage">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="lg:hidden">
        <p className="text-15 text-sage">{journey.cta}</p>
        <Button to="/contact" className="mt-4">
          Get started today
        </Button>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="shell pt-28 md:pt-40" aria-labelledby="home-contact">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
        <h2 id="home-contact" className="display-section">
          {home.contact.title}
        </h2>
        <p className="deck max-w-[36ch]">{home.contact.intro}</p>
      </div>

      <a
        href={`mailto:${company.email}`}
        className="mt-14 block font-display text-[clamp(1.6rem,6.4vw,5.125rem)] leading-none font-light tracking-[-0.045em] break-words transition-colors hover:text-mint"
      >
        {company.email}
      </a>

      <div className="mt-14 grid gap-12 border-t border-line pt-10 md:grid-cols-3 md:gap-10">
        <div className="space-y-6">
          <div>
            <p className="text-15 text-sage">Hotline</p>
            <a href={company.phoneHref} className="mt-1 block text-21 hover:text-mint">
              {company.phone}
            </a>
          </div>
          <div>
            <p className="text-15 text-sage">Address</p>
            <p className="mt-1 text-21">{company.address}</p>
          </div>
        </div>
        <div>
          <p className="text-15 text-sage">Send us a message</p>
          <p className="mt-1 max-w-[30ch]">{home.contact.note}</p>
          <Button href={`mailto:${company.email}`} variant="secondary" className="mt-5">
            Email us
          </Button>
        </div>
        <div>
          <h3 className="font-sans text-15 font-normal tracking-normal text-sage">Why choose us?</h3>
          <ul className="mt-3 space-y-3">
            {home.why.map((w) => (
              <li key={w} className="flex gap-3">
                <Icon icon="ph:check" className="mt-1 size-4.5 shrink-0 text-jade" aria-hidden="true" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo description={home.lede} path="/" />
      <Hero />
      <Facts />
      <Journey />
      <Contact />
    </>
  )
}
