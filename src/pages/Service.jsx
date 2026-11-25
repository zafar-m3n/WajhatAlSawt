import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'
import Accordion from '@/components/ui/Accordion'
import Button from '@/components/ui/Button'
import PageIntro from '@/components/ui/PageIntro'
import Seo from '@/components/ui/Seo'
import CtaBand from '@/components/layout/CtaBand'
import { Marquee, Reveal, SplitHeading, Stagger, item } from '@/components/motion/Motion'
import NotFound from '@/pages/NotFound'
import { practices, services } from '@/data/services'

const find = (secs, test) => secs.find(test)

export function Steps({ steps }) {
  return (
    <Stagger as="ol" className="border-t border-line">
      {steps.map((s, i) => (
        <motion.li variants={item} key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-x-6 border-b border-line py-8 md:grid-cols-[6rem_1fr] md:py-10">
          <span className="font-display text-41 leading-none font-semibold text-mint md:text-52" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <h3 className="text-21 font-semibold tracking-[-0.015em] md:text-26">{s.title}</h3>
            <p className="measure mt-2 text-sage">{s.text}</p>
          </div>
        </motion.li>
      ))}
    </Stagger>
  )
}

export function FaqBlock({ faqs, title = 'Frequently Asked Questions' }) {
  return (
    <section className="shell grid gap-10 pt-32 md:pt-44 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
      <SplitHeading as="h2" text={title} className="display-section max-w-[12ch]" inView />
      <Reveal delay={0.15}>
        <Accordion items={faqs} />
      </Reveal>
    </section>
  )
}

export default function Service() {
  const { slug } = useParams()
  const s = services.find((x) => x.slug === slug)
  if (!s) return <NotFound />
  const practice = practices.find((p) => p.slug === s.practice)

  const secs = s.sections
  const overview = secs[0]
  const included = find(secs, (x) => x.heading === "What's Included")
  const process = find(secs, (x) => x.steps)
  const benefits = find(secs, (x) => x.heading === 'Key Benefits')
  const faq = find(secs, (x) => x.faqs)
  const used = new Set([overview, included, process, benefits, faq])
  const extra = secs.filter((x) => !used.has(x))
  const siblings = practice.services.filter((x) => x !== s.slug).map((x) => services.find((y) => y.slug === x))

  return (
    <>
      <Seo title={s.title} description={s.intro} path={`/solutions/${s.slug}`} />
      <PageIntro
        crumbs={[{ label: 'Solutions', to: '/solutions' }, { label: practice.name, to: `/solutions?practice=${practice.slug}` }, { label: s.card.title }]}
        title={s.title}
        image={{ slot: `service-${s.slug}`, alt: s.title }}
      >
        {s.kicker && <p className="mt-6 text-17 text-mint">{s.kicker}</p>}
        <p className="deck measure mt-4">{s.intro}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button to="/contact">Get started</Button>
          <Button to="/solutions" variant="secondary">
            All solutions
          </Button>
        </div>
      </PageIntro>

      <section className="shell grid gap-12 pt-32 md:pt-44 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-24">
        <SplitHeading as="h2" text={overview.heading} className="display-section max-w-[14ch] lg:sticky lg:top-28 lg:self-start" inView />
        <div>
          <Reveal className="space-y-5">
            {overview.paras?.map((p, i) => (
              <p key={p} className={`measure ${i === 0 ? 'text-21 leading-relaxed' : 'text-sage'}`}>
                {p}
              </p>
            ))}
          </Reveal>
          {overview.bullets && (
            <Stagger className="mt-10 border-t border-line">
              {overview.bullets.map((b) => (
                <motion.li variants={item} key={b} className="flex gap-4 border-b border-line py-5 text-17">
                  <Icon icon="ph:check-circle-light" className="mt-0.5 size-6 shrink-0 text-jade" aria-hidden="true" />
                  <span>{b}</span>
                </motion.li>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      {included && (
        <section className="shell pt-32 md:pt-44">
          <SplitHeading as="h2" text={included.heading} className="display-section" inView />
          <Stagger className="mt-12 grid gap-x-16 border-t border-line md:grid-cols-2">
            {included.items.map((it) => (
              <motion.li variants={item} key={it.title} className="border-b border-line py-8">
                <h3 className="text-21 font-semibold tracking-[-0.015em] md:text-26">{it.title}</h3>
                <p className="mt-3 text-sage">{it.text}</p>
              </motion.li>
            ))}
          </Stagger>
        </section>
      )}

      {extra.map((x) => (
        <section key={x.heading} className="shell pt-32 md:pt-44">
          <SplitHeading as="h2" text={x.heading} className="display-section max-w-[18ch]" inView />
          <Reveal>
            {x.paras?.map((p) => (
              <p key={p} className="measure mt-6 text-sage">
                {p}
              </p>
            ))}
          </Reveal>
          {x.items && (
            <Stagger className="mt-10 grid gap-x-16 border-t border-line md:grid-cols-2">
              {x.items.map((it) => (
                <motion.li variants={item} key={it.title} className="border-b border-line py-7">
                  <h3 className="text-21 font-semibold tracking-[-0.015em]">{it.title}</h3>
                  {it.text && <p className="mt-2 text-sage">{it.text}</p>}
                </motion.li>
              ))}
            </Stagger>
          )}
        </section>
      ))}

      {process && (
        <section className="shell grid gap-12 pt-32 md:pt-44 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SplitHeading as="h2" text={process.heading} className="display-section max-w-[14ch] lg:sticky lg:top-28 lg:self-start" inView />
          <Steps steps={process.steps} />
        </section>
      )}

      {benefits && (
        <section className="mt-32 bg-fern py-20 md:mt-44 md:py-28" aria-labelledby="benefits">
          <Reveal className="shell">
            <h2 id="benefits" className="font-sans text-17 font-semibold tracking-normal text-mint">
              {benefits.heading}
            </h2>
          </Reveal>
          <Marquee items={benefits.list} className="mt-10 font-display text-41 font-semibold tracking-[-0.02em] md:text-65" duration={45} />
        </section>
      )}

      {faq && <FaqBlock faqs={faq.faqs} title={faq.heading} />}

      {siblings.length > 0 && (
        <section className="shell pt-32 md:pt-44">
          <Reveal className="flex items-baseline justify-between gap-6 border-b border-linen/40 pb-4">
            <h2 className="text-26 font-semibold tracking-[-0.02em] md:text-33">More in {practice.name}</h2>
            <Link to={`/solutions?practice=${practice.slug}`} className="text-link shrink-0 text-15">
              See all
            </Link>
          </Reveal>
          <Stagger className="grid md:grid-cols-2 md:gap-x-16">
            {siblings.slice(0, 6).map((x) => (
              <motion.li variants={item} key={x.slug} className="border-b border-line">
                <Link to={`/solutions/${x.slug}`} className="group flex items-center justify-between gap-6 py-5">
                  <span className="text-17 transition-colors group-hover:text-mint">{x.card.title}</span>
                  <Icon icon="ph:arrow-up-right" className="size-5 shrink-0 text-sage transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-mint" aria-hidden="true" />
                </Link>
              </motion.li>
            ))}
          </Stagger>
        </section>
      )}

      <CtaBand title="Ready to Get Started?" text="Let's discuss how we can help transform your business operations." />
    </>
  )
}
