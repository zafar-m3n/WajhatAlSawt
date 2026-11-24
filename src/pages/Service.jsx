import { Link, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Accordion from '@/components/ui/Accordion'
import Button from '@/components/ui/Button'
import PageIntro from '@/components/ui/PageIntro'
import Photo from '@/components/ui/Photo'
import Seo from '@/components/ui/Seo'
import CtaBand from '@/components/layout/CtaBand'
import NotFound from '@/pages/NotFound'
import { practices, services } from '@/data/services'

const find = (secs, test) => secs.find(test)

export function Figures({ metrics }) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 border-t border-line">
      {metrics.map((m) => (
        <div key={m.label} className="border-b border-line py-5">
          <dt className="text-15 text-sage">{m.label}</dt>
          <dd className="mt-1 font-display text-26 font-light tracking-[-0.04em] md:text-33">{m.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Steps({ steps }) {
  return (
    <ol className="border-t border-line">
      {steps.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-x-6 border-b border-line py-8 md:grid-cols-[5rem_1fr] md:py-10">
          <span className="font-display text-33 leading-none font-light text-mint md:text-41" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <h3 className="text-21 tracking-[-0.025em]">{s.title}</h3>
            <p className="measure mt-2 text-sage">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function FaqBlock({ faqs, title = 'Frequently Asked Questions' }) {
  return (
    <section className="shell grid gap-10 pt-28 md:pt-40 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
      <h2 className="display-section max-w-[12ch]">{title}</h2>
      <Accordion items={faqs} />
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

      <section className="shell grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="display-section max-w-[16ch]">{overview.heading}</h2>
          <div className="mt-8 space-y-5">
            {overview.paras?.map((p, i) => (
              <p key={p} className={`measure ${i === 0 ? 'text-21 leading-relaxed' : 'text-sage'}`}>
                {p}
              </p>
            ))}
          </div>
          {overview.bullets && (
            <ul className="mt-10 space-y-3 border-t border-line pt-8">
              {overview.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <Icon icon="ph:check" className="mt-1 size-4.5 shrink-0 text-jade" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="space-y-10 lg:sticky lg:top-28 lg:self-start">
          <Photo slot={`service-${s.slug}`} alt={s.title} />
          <Figures metrics={s.metrics} />
        </div>
      </section>

      {included && (
        <section className="shell pt-28 md:pt-40">
          <h2 className="display-section">{included.heading}</h2>
          <ul className="mt-12 grid gap-x-16 border-t border-line md:grid-cols-2">
            {included.items.map((it) => (
              <li key={it.title} className="border-b border-line py-7">
                <h3 className="text-21 tracking-[-0.025em]">{it.title}</h3>
                <p className="mt-2 text-sage">{it.text}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {extra.map((x) => (
        <section key={x.heading} className="shell pt-28 md:pt-40">
          <h2 className="display-section max-w-[18ch]">{x.heading}</h2>
          {x.paras?.map((p) => (
            <p key={p} className="measure mt-6 text-sage">
              {p}
            </p>
          ))}
          {x.items && (
            <ul className="mt-10 grid gap-x-16 border-t border-line md:grid-cols-2">
              {x.items.map((it) => (
                <li key={it.title} className="border-b border-line py-7">
                  <h3 className="text-21 tracking-[-0.025em]">{it.title}</h3>
                  {it.text && <p className="mt-2 text-sage">{it.text}</p>}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {process && (
        <section className="shell grid gap-12 pt-28 md:pt-40 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <h2 className="display-section max-w-[14ch] lg:sticky lg:top-28 lg:self-start">{process.heading}</h2>
          <Steps steps={process.steps} />
        </section>
      )}

      {benefits && (
        <section className="mt-28 bg-fern md:mt-40" aria-labelledby="benefits">
          <div className="shell py-20 md:py-28">
            <h2 id="benefits" className="font-sans text-17 font-semibold tracking-normal text-sage">
              {benefits.heading}
            </h2>
            <ul className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-3 font-display text-26 leading-snug font-light tracking-[-0.035em] md:text-41">
              {benefits.list.map((b, i) => (
                <li key={b} className="flex items-baseline gap-5">
                  {i > 0 && (
                    <span className="text-mint/60" aria-hidden="true">
                      /
                    </span>
                  )}
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {faq && <FaqBlock faqs={faq.faqs} title={faq.heading} />}

      {siblings.length > 0 && (
        <section className="shell pt-28 md:pt-40">
          <div className="flex items-baseline justify-between gap-6 border-b border-linen/40 pb-4">
            <h2 className="text-26 tracking-[-0.03em]">More in {practice.name}</h2>
            <Link to={`/solutions?practice=${practice.slug}`} className="text-link shrink-0 text-15">
              See all
            </Link>
          </div>
          <ul className="grid md:grid-cols-2 md:gap-x-16">
            {siblings.slice(0, 6).map((x) => (
              <li key={x.slug} className="border-b border-line">
                <Link to={`/solutions/${x.slug}`} className="group flex items-center justify-between gap-6 py-5">
                  <span className="transition-colors group-hover:text-mint">{x.card.title}</span>
                  <Icon icon="ph:arrow-up-right" className="size-5 shrink-0 text-sage group-hover:text-mint" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaBand title="Ready to Get Started?" text="Let's discuss how we can help transform your business operations." />
    </>
  )
}
