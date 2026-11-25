import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Icon } from '@iconify/react'
import Button from '@/components/ui/Button'
import Photo from '@/components/ui/Photo'
import Seo from '@/components/ui/Seo'
import { EASE, Marquee, ParallaxPhoto, Reveal, ScrollWords, SplitHeading, Stagger, item } from '@/components/motion/Motion'
import { company, home, about } from '@/data/site'
import { practices, serviceIndex, industryIndex } from '@/data/catalog'

const titleOf = Object.fromEntries(serviceIndex.map((s) => [s.slug, s.title]))

/* 1 ── Hero: full-screen image that shrinks into a framed card as you scroll */
function HeroScene() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 0.75], [1, 0.82])
  const radius = useTransform(scrollYProgress, [0, 0.75], [0, 36])
  const zoom = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  const textY = useTransform(scrollYProgress, [0, 0.45], [0, -120])
  const textO = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const cueO = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  return (
    <section ref={ref} className="relative -mt-[4.5rem] h-[200svh] lg:h-[240svh]" aria-label="Introduction">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <motion.div style={reduce ? undefined : { scale, borderRadius: radius }} className="absolute inset-0 overflow-hidden will-change-transform">
          <motion.div style={reduce ? undefined : { scale: zoom }} className="absolute inset-0">
            <Photo slot="home-hero" fill eager rounded="rounded-none" captionClassName="top-28 right-[10%] text-right max-sm:hidden" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        </motion.div>

        <motion.div style={reduce ? undefined : { y: textY, opacity: textO }} className="shell relative mt-auto pb-16 md:pb-20">
          <SplitHeading lines={['Empowering Businesses', 'Through Smart Outsourcing']} className="display-hero max-w-[14ch] lg:max-w-none" delay={0.2} />
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
            className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="deck max-w-[42ch] text-linen/85">{home.lede}</p>
            <div className="flex flex-wrap gap-4">
              <Button to="/contact">Get started</Button>
              <Button href="#services" variant="secondary" className="bg-ink/40 backdrop-blur">
                Our services
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={reduce ? undefined : { opacity: cueO }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-13 text-sage md:flex" aria-hidden="true">
          Scroll
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-4 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-mint" />
          </span>
        </motion.div>
      </div>
    </section>
  )
}

/* 2 ── Statement that lights up word by word */
function Statement() {
  return (
    <section className="shell py-32 md:py-48">
      <ScrollWords text={about.story.paras[1]} className="max-w-[22ch] font-display text-[clamp(2rem,4.8vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.02em]" />
    </section>
  )
}

/* 3 ── Practices gliding past horizontally (pinned on desktop, swipe on phones) */
function PracticeCard({ p }) {
  return (
    <Link to={`/services/${p.slug}`} className="group flex h-full w-[82vw] shrink-0 snap-start flex-col sm:w-[26rem] lg:w-[30rem]">
      <div className="overflow-hidden rounded-[24px]">
        <div className="transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">
          <Photo slot={`service-${p.slug}`} ratio="4 / 3" rounded="rounded-none" showKeywords={false} />
        </div>
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-4">
        <h3 className="text-26 font-semibold tracking-[-0.02em] transition-colors group-hover:text-mint md:text-33">{p.name}</h3>
        <span className="shrink-0 text-15 text-sage">{p.services.length} services</span>
      </div>
      <ul className="mt-3 space-y-1 text-15 text-sage">
        {p.services.slice(0, 3).map((s) => (
          <li key={s}>{titleOf[s]}</li>
        ))}
      </ul>
      <span className="mt-5 inline-flex items-center gap-2 text-15 text-linen">
        Explore
        <Icon icon="ph:arrow-right" className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden="true" />
      </span>
    </Link>
  )
}

function Practices() {
  const section = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])

  useLayoutEffect(() => {
    const measure = () => setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const intro = (
    <div className="flex w-[82vw] shrink-0 flex-col sm:w-[24rem] lg:w-[28rem]">
      <div>
        <h2 className="display-section">Our Services</h2>
        <p className="deck mt-6 max-w-[30ch]">Empowering businesses worldwide with innovative BPO solutions.</p>
      </div>
    </div>
  )

  return (
    <>
      <div id="services" className="scroll-mt-24" aria-hidden="true" />
      {/* Desktop: pinned horizontal glide */}
      <section ref={section} className="relative hidden lg:block" style={{ height: `calc(100vh + ${dist}px)` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div ref={track} style={reduce ? undefined : { x }} className="flex gap-12 pr-[3rem] pl-[max(3rem,calc((100vw-82.5rem)/2+3rem))]">
            {intro}
            {practices.map((p) => (
              <PracticeCard key={p.slug} p={p} />
            ))}
          </motion.div>
        </div>
      </section>
      {/* Phones/tablets: native swipe */}
      <section className="py-16 lg:hidden">
        <div className="shell mb-10">{intro}</div>
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-5 px-5 pb-4 [scrollbar-width:none]">
          {practices.map((p) => (
            <PracticeCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </>
  )
}

/* 4 ── How we work: pinned, steps swap as you scroll */
function Journey() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { journey } = home
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setStep(Math.min(journey.steps.length - 1, Math.floor(v * journey.steps.length))))
  const s = journey.steps[step]

  return (
    <>
      <section ref={ref} className="relative hidden h-[400vh] lg:block" aria-labelledby="journey-title">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="shell grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-20">
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-17 text-mint">How We Work</p>
                <h2 id="journey-title" className="display-section mt-4">
                  {journey.title}
                </h2>
                <p className="deck mt-6 max-w-[34ch]">{journey.intro}</p>
              </div>
              <div className="mt-16">
                <div className="h-px w-full bg-line">
                  <motion.div style={{ width: bar }} className="h-px bg-mint" />
                </div>
                <ol className="mt-5 grid grid-cols-4 gap-4 text-13">
                  {journey.steps.map((x, i) => (
                    <li key={x.title} className={`transition-colors duration-500 ${i === step ? 'text-linen' : 'text-sage/60'}`}>
                      {x.title}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="relative min-h-[26rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduce ? false : { opacity: 0, y: 60, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -60, filter: 'blur(8px)' }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <span className="font-display text-[11rem] leading-[0.8] font-semibold tracking-[-0.02em] text-mint/90">{step + 1}</span>
                  <h3 className="mt-8 text-[clamp(2rem,3vw,3rem)] font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="deck mt-5 max-w-[40ch]">{s.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-20 lg:hidden" aria-labelledby="journey-title-m">
        <p className="text-17 text-mint">How We Work</p>
        <h2 id="journey-title-m" className="display-section mt-3">
          {journey.title}
        </h2>
        <p className="deck mt-5">{journey.intro}</p>
        <Stagger as="ol" className="mt-12 border-t border-line">
          {journey.steps.map((x, i) => (
            <motion.li variants={item} key={x.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-8">
              <span className="font-display text-41 leading-none font-semibold text-mint">{i + 1}</span>
              <div>
                <h3 className="text-21 font-semibold tracking-[-0.02em]">{x.title}</h3>
                <p className="mt-2 text-sage">{x.text}</p>
              </div>
            </motion.li>
          ))}
        </Stagger>
      </section>

      <Reveal className="shell flex flex-col gap-4 pt-4 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sage">{journey.cta}</p>
        <Button to="/contact">Get started today</Button>
      </Reveal>
    </>
  )
}

/* 5 ── Drifting band of every service */
function ServiceBand() {
  return (
    <section className="space-y-4 border-y border-line py-10 md:py-14" aria-label="All services">
      <Marquee items={serviceIndex.slice(0, 19).map((s) => s.title)} className="font-display text-33 font-semibold tracking-[-0.02em] md:text-52" duration={90} />
      <Marquee items={serviceIndex.slice(19).map((s) => s.title)} className="font-display text-33 font-semibold tracking-[-0.02em] text-sage/50 md:text-52" duration={100} reverse />
    </section>
  )
}

/* 6 ── Industries as tall parallax bands */
function Industries() {
  return (
    <section className="shell pt-32 md:pt-44" aria-labelledby="ind-title">
      <Reveal className="grid gap-6 md:grid-cols-2 md:items-end">
        <h2 id="ind-title" className="display-section">
          Industries we serve
        </h2>
        <p className="deck max-w-[38ch]">Dedicated teams that understand your customers, your workflows, and your standards.</p>
      </Reveal>
      <ul className="mt-14 space-y-6 md:space-y-8">
        {industryIndex.map((i) => (
          <Reveal as="li" key={i.slug}>
            <Link to={`/industries/${i.slug}`} className="group relative block overflow-hidden rounded-[28px]">
              <ParallaxPhoto slot={`industry-${i.slug}`} alt={i.name} ratio="21 / 9" mobileRatio="4 / 5" rounded="rounded-[28px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-10">
                <div>
                  <h3 className="font-display text-[clamp(2.25rem,5vw,5rem)] leading-none font-semibold tracking-[-0.02em]">{i.name}</h3>
                  <p className="mt-3 max-w-[40ch] text-linen/80">{i.subtitle}</p>
                </div>
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-linen/30 transition-all duration-500 group-hover:border-mint group-hover:bg-mint group-hover:text-ink">
                  <Icon icon="ph:arrow-up-right" className="size-6" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* 7 ── Why choose us beside a parallax photo */
function Why() {
  return (
    <section className="shell grid gap-14 pt-32 md:pt-44 lg:grid-cols-2 lg:items-center lg:gap-24">
      <ParallaxPhoto slot="home-why" rounded="rounded-[28px] rounded-tr-[140px]" />
      <div>
        <SplitHeading as="h2" text="Why Choose Us?" className="display-section" inView />
        <p className="deck mt-6 max-w-[38ch]">{about.lede}</p>
        <Stagger className="mt-12 border-t border-line">
          {home.why.map((w) => (
            <motion.li variants={item} key={w} className="flex gap-4 border-b border-line py-6 text-21 tracking-[-0.01em]">
              <Icon icon="ph:check-circle-light" className="mt-0.5 size-7 shrink-0 text-jade" aria-hidden="true" />
              {w}
            </motion.li>
          ))}
        </Stagger>
      </div>
    </section>
  )
}


/* 8 ── Contact */
function Contact() {
  return (
    <section className="shell pt-32 md:pt-44" aria-labelledby="home-contact">
      <div className="grid gap-6 md:grid-cols-2 md:items-end">
        <SplitHeading as="h2" text={home.contact.title} className="display-section" inView />
        <Reveal>
          <p className="deck max-w-[36ch]">{home.contact.intro}</p>
        </Reveal>
      </div>
      <Reveal>
        <a
          href={`mailto:${company.email}`}
          className="mt-14 block font-display text-[clamp(1.9rem,7.4vw,6.5rem)] leading-none font-semibold tracking-[-0.02em] break-words transition-colors duration-500 hover:text-mint"
        >
          {company.email}
        </a>
      </Reveal>
      <Reveal className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
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
        <div>
          <p className="text-15 text-sage">Send us a message</p>
          <p className="mt-1">{home.contact.note}</p>
        </div>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo description={home.lede} path="/" />
      <HeroScene />
      <Statement />
      <Practices />
      <Journey />
      <ServiceBand />
      <Industries />
      <Why />
      <Contact />
    </>
  )
}
