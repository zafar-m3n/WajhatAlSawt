import { useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Button from '@/components/ui/Button'
import PageIntro from '@/components/ui/PageIntro'
import Photo from '@/components/ui/Photo'
import Seo from '@/components/ui/Seo'
import CtaBand from '@/components/layout/CtaBand'
import NotFound from '@/pages/NotFound'
import { FaqBlock, Figures } from '@/pages/Service'
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
      <PageIntro crumbs={[{ label: 'Industries' }, { label: ind.name }]} title={ind.title}>
        <p className="mt-6 text-17 text-mint">{ind.subtitle}</p>
        <p className="deck measure mt-4">{ind.intro}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button to="/contact">Get started</Button>
          <Button to="/solutions" variant="secondary">
            View solutions
          </Button>
        </div>
      </PageIntro>

      <div className="shell">
        <Photo slot={`industry-${ind.slug}`} alt={ind.title} rounded="rounded-[28px]" className="max-md:!aspect-[4/5]" />
      </div>

      <section className="shell grid gap-14 pt-28 md:pt-40 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="display-section max-w-[16ch]">{overview.heading}</h2>
          {overview.paras?.map((p) => (
            <p key={p} className="measure mt-8 text-21 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        <div className="space-y-12">
          <ul className="border-t border-line">
            {overview.items?.map((it) => (
              <li key={it.title} className="border-b border-line py-6">
                <h3 className="text-21 tracking-[-0.025em]">{it.title}</h3>
                <p className="mt-2 text-sage">{it.text}</p>
              </li>
            ))}
          </ul>
          <Figures metrics={ind.metrics} />
        </div>
      </section>

      {challenges && (
        <section className="shell pt-28 md:pt-40">
          <h2 className="font-sans text-17 font-semibold tracking-normal text-sage">{challenges.heading}</h2>
          <ul className="mt-8 border-t border-line">
            {challenges.items.map((c) => (
              <li key={c.title} className="border-b border-line py-6 font-display text-26 font-light tracking-[-0.035em] md:py-8 md:text-41">
                {c.title}
              </li>
            ))}
          </ul>
        </section>
      )}

      {built && (
        <section className="mt-28 bg-fern md:mt-40">
          <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="display-section max-w-[14ch]">{built.heading}</h2>
              {built.paras?.map((p) => (
                <p key={p} className="measure mt-8 text-sage">
                  {p}
                </p>
              ))}
            </div>
            <ul className="self-end border-t border-line">
              {built.list.map((l) => (
                <li key={l} className="flex gap-3 border-b border-line py-4 text-17">
                  <Icon icon="ph:check" className="mt-1 size-4.5 shrink-0 text-jade" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {why && (
        <section className="shell pt-28 md:pt-40">
          <h2 className="display-section">{why.heading}</h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {why.items.map((it) => (
              <li key={it.title} className="border-t border-linen/40 pt-6">
                <h3 className="text-21 tracking-[-0.025em]">{it.title}</h3>
                <p className="mt-3 text-sage">{it.text}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {cover && (
        <section className="shell grid gap-8 pt-28 md:pt-40 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <h2 className="display-section max-w-[12ch]">{cover.heading}</h2>
          <ul className="grid gap-x-12 border-t border-line sm:grid-cols-2">
            {cover.list.map((l) => (
              <li key={l} className="border-b border-line py-4">
                {l}
              </li>
            ))}
          </ul>
        </section>
      )}

      {example && (
        <section className="shell pt-28 md:pt-40">
          <figure className="border-l-2 border-jade pl-6 md:pl-10">
            <figcaption className="text-15 text-sage">{example.heading}</figcaption>
            <blockquote className="mt-5 max-w-[34ch] font-display text-26 leading-snug font-light tracking-[-0.035em] md:text-33">
              {example.paras?.[0]}
            </blockquote>
          </figure>
          <Button to="/contact" variant="secondary" className="mt-10">
            Talk to us
          </Button>
        </section>
      )}

      {faq && <FaqBlock faqs={faq.faqs} title={faq.heading} />}

      <CtaBand title="Ready to Build Your Industry Support Team?" text="Let's map the workflows, coverage, and service standards your customers need." />
    </>
  )
}
