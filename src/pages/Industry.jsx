import { useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'
import Button from '@/components/ui/Button'
import PageIntro from '@/components/ui/PageIntro'
import Seo from '@/components/ui/Seo'
import CtaBand from '@/components/layout/CtaBand'
import { Reveal, ScrollWords, SplitHeading, Stagger, item } from '@/components/motion/Motion'
import NotFound from '@/pages/NotFound'
import { FaqBlock } from '@/pages/Service'
import { industries } from '@/data/industries'

const by = (secs, h) => secs.find((s) => s.heading === h)

export default function Industry() {
  const { slug } = useParams()
  const ind = industries.find((i) => i.slug === slug)
  if (!ind) return <NotFound />

  const secs = ind.sections
  const overview = secs[0]
  const challenges = by(secs, 'Challenges We Handle')
  const built = by(secs, 'Solutions Built Around Your Workflow')
  const why = by(secs, 'Why It Works')
  const cover = by(secs, 'What We Can Cover')
  const example = by(secs, 'How Teams Use This')
  const faq = secs.find((s) => s.faqs)

  return (
    <>
      <Seo title={ind.title} description={ind.intro} path={`/industries/${ind.slug}`} />
      <PageIntro crumbs={[{ label: 'Industries' }, { label: ind.name }]} title={ind.title} image={{ slot: `industry-${ind.slug}`, alt: ind.title }}>
        <p className="mt-6 text-17 text-mint">{ind.subtitle}</p>
        <p className="deck measure mt-4">{ind.intro}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button to="/contact">Get started</Button>
          <Button to="/solutions" variant="secondary">
            View solutions
          </Button>
        </div>
      </PageIntro>

      <section className="shell pt-32 md:pt-48">
        <SplitHeading as="h2" text={overview.heading} className="display-section max-w-[18ch]" inView />
        {overview.paras?.[0] && <ScrollWords text={overview.paras[0]} className="mt-12 max-w-[34ch] font-display text-[clamp(1.5rem,2.6vw,2.6rem)] leading-[1.2] font-medium tracking-[-0.015em]" />}
        <Stagger className="mt-20 grid gap-10 md:grid-cols-3">
          {overview.items?.map((it) => (
            <motion.li variants={item} key={it.title} className="border-t border-linen/40 pt-6">
              <h3 className="text-21 font-semibold tracking-[-0.015em]">{it.title}</h3>
              <p className="mt-3 text-sage">{it.text}</p>
            </motion.li>
          ))}
        </Stagger>
      </section>

      {challenges && (
        <section className="shell pt-32 md:pt-44">
          <Reveal>
            <h2 className="font-sans text-17 font-semibold tracking-normal text-mint">{challenges.heading}</h2>
          </Reveal>
          <Stagger className="mt-8 border-t border-line" gap={0.12}>
            {challenges.items.map((c) => (
              <motion.li variants={item} key={c.title} className="flex items-center justify-between gap-6 border-b border-line py-7 md:py-9">
                <span className="font-display text-[clamp(1.6rem,3.6vw,3.5rem)] leading-tight font-semibold tracking-[-0.02em]">{c.title}</span>
                <Icon icon="ph:check-circle-light" className="size-8 shrink-0 text-jade md:size-10" aria-hidden="true" />
              </motion.li>
            ))}
          </Stagger>
        </section>
      )}

      {built && (
        <section className="mt-32 bg-fern md:mt-44">
          <div className="shell grid gap-12 py-24 md:py-32 lg:grid-cols-2 lg:gap-20">
            <div>
              <SplitHeading as="h2" text={built.heading} className="display-section max-w-[14ch]" inView />
              <Reveal>
                {built.paras?.map((p) => (
                  <p key={p} className="measure mt-8 text-sage">
                    {p}
                  </p>
                ))}
              </Reveal>
            </div>
            <Stagger className="self-end border-t border-line">
              {built.list.map((l) => (
                <motion.li variants={item} key={l} className="flex gap-4 border-b border-line py-5 text-17">
                  <Icon icon="ph:check" className="mt-1 size-4.5 shrink-0 text-jade" aria-hidden="true" />
                  {l}
                </motion.li>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {why && (
        <section className="shell pt-32 md:pt-44">
          <SplitHeading as="h2" text={why.heading} className="display-section" inView />
          <Stagger className="mt-14 grid gap-12 md:grid-cols-3">
            {why.items.map((it) => (
              <motion.li variants={item} key={it.title}>
                <h3 className="text-26 font-semibold tracking-[-0.02em]">{it.title}</h3>
                <p className="mt-3 text-sage">{it.text}</p>
              </motion.li>
            ))}
          </Stagger>
        </section>
      )}

      {cover && (
        <section className="shell grid gap-10 pt-32 md:pt-44 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SplitHeading as="h2" text={cover.heading} className="display-section max-w-[12ch]" inView />
          <Stagger className="grid gap-x-12 border-t border-line sm:grid-cols-2">
            {cover.list.map((l) => (
              <motion.li variants={item} key={l} className="border-b border-line py-5 text-17">
                {l}
              </motion.li>
            ))}
          </Stagger>
        </section>
      )}

      {example && (
        <section className="shell pt-32 md:pt-44">
          <Reveal>
            <p className="text-17 text-mint">{example.heading}</p>
          </Reveal>
          <ScrollWords text={example.paras?.[0] ?? ''} className="mt-8 max-w-[28ch] font-display text-[clamp(1.75rem,3.6vw,3.6rem)] leading-[1.1] font-semibold tracking-[-0.02em]" />
          <Reveal>
            <Button to="/contact" variant="secondary" className="mt-12">
              Talk to us
            </Button>
          </Reveal>
        </section>
      )}

      {faq && <FaqBlock faqs={faq.faqs} title={faq.heading} />}

      <CtaBand title="Ready to Build Your Industry Support Team?" text="Let's map the workflows, coverage, and service standards your customers need." />
    </>
  )
}
