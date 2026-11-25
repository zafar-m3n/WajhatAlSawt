import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'
import Button from '@/components/ui/Button'
import PageIntro from '@/components/ui/PageIntro'
import Seo from '@/components/ui/Seo'
import CtaBand from '@/components/layout/CtaBand'
import { FaqBlock, Steps } from '@/components/sections/Blocks'
import { Reveal, SplitHeading, Stagger, item } from '@/components/motion/Motion'
import NotFound from '@/pages/NotFound'
import { practices, services } from '@/data/services'

const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]))

/** One service, shown as a chapter of its category page. */
function ServiceChapter({ s }) {
  const secs = s.sections
  const overview = secs[0]
  const included = secs.find((x) => x.heading === "What's Included")
  const process = secs.find((x) => x.steps)
  const benefits = secs.find((x) => x.heading === 'Key Benefits')
  const used = new Set([overview, included, process, benefits, secs.find((x) => x.faqs)])
  const extra = secs.filter((x) => !used.has(x))

  return (
    <article id={s.slug} className="scroll-mt-28 border-t border-line pt-14 pb-20 first:border-t-0 first:pt-0 md:pb-28">
      {s.kicker && (
        <Reveal>
          <p className="text-17 text-mint">{s.kicker}</p>
        </Reveal>
      )}
      <SplitHeading as="h2" text={s.title} className="display-section mt-3 max-w-[18ch]" inView />
      <Reveal>
        <p className="deck measure mt-6">{s.intro}</p>
      </Reveal>

      <div className="mt-14 grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-14">
        <Reveal>
          <h3 className="text-26 font-semibold tracking-[-0.02em]">{overview.heading}</h3>
          {overview.paras?.map((p) => (
            <p key={p} className="measure mt-4 text-sage">
              {p}
            </p>
          ))}
        </Reveal>
        {overview.bullets && (
          <Stagger className="self-start border-t border-line">
            {overview.bullets.map((b) => (
              <motion.li variants={item} key={b} className="flex gap-4 border-b border-line py-4">
                <Icon icon="ph:check-circle-light" className="mt-0.5 size-6 shrink-0 text-jade" aria-hidden="true" />
                <span>{b}</span>
              </motion.li>
            ))}
          </Stagger>
        )}
      </div>

      {included && (
        <div className="mt-16">
          <Reveal>
            <h3 className="text-26 font-semibold tracking-[-0.02em]">{included.heading}</h3>
          </Reveal>
          <Stagger className="mt-6 grid gap-x-12 border-t border-line md:grid-cols-2">
            {included.items.map((it) => (
              <motion.li variants={item} key={it.title} className="border-b border-line py-6">
                <h4 className="text-17 font-semibold">{it.title}</h4>
                <p className="mt-2 text-15 text-sage">{it.text}</p>
              </motion.li>
            ))}
          </Stagger>
        </div>
      )}

      {extra.map((x) => (
        <Reveal key={x.heading} className="mt-16">
          <h3 className="text-26 font-semibold tracking-[-0.02em]">{x.heading}</h3>
          {x.paras?.map((p) => (
            <p key={p} className="measure mt-4 text-sage">
              {p}
            </p>
          ))}
          {x.items && (
            <ul className="mt-6 grid gap-x-12 border-t border-line md:grid-cols-2">
              {x.items.map((it) => (
                <li key={it.title} className="border-b border-line py-5">
                  <h4 className="text-17 font-semibold">{it.title}</h4>
                  {it.text && <p className="mt-2 text-15 text-sage">{it.text}</p>}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}

      {process && (
        <div className="mt-16">
          <Reveal>
            <h3 className="text-26 font-semibold tracking-[-0.02em]">{process.heading}</h3>
          </Reveal>
          <div className="mt-6">
            <Steps steps={process.steps} />
          </div>
        </div>
      )}

      {benefits && (
        <Reveal className="mt-16 rounded-[24px] bg-fern p-7 md:p-10">
          <h3 className="text-17 font-semibold text-mint">{benefits.heading}</h3>
          <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {benefits.list.map((b) => (
              <li key={b} className="flex gap-3 text-17">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-jade" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </article>
  )
}

/** Sticky in-page index that highlights the service currently on screen. */
function useActive(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

export default function Category() {
  const { slug } = useParams()
  const p = practices.find((x) => x.slug === slug)
  const list = p ? p.services.map((s) => bySlug[s]) : []
  const ids = p ? p.services : []
  const active = useActive(ids)
  if (!p) return <NotFound />

  const faqs = list.flatMap((s) => s.sections.find((x) => x.faqs)?.faqs ?? [])

  return (
    <>
      <Seo title={p.name} description={p.description} path={`/services/${p.slug}`} />
      <PageIntro crumbs={[{ label: 'Services' }, { label: p.name }]} title={p.name} deck={p.description} image={{ slot: `service-${p.slug}`, alt: p.name }}>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button to="/contact">Get started</Button>
        </div>
      </PageIntro>

      <div className="shell grid gap-12 pt-24 md:pt-36 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-20">
        <nav aria-label={`${p.name} services`} className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-15 font-semibold">In this category</p>
          <ul className="mt-4 space-y-1 border-l border-line">
            {list.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className={`-ml-px block border-l py-1.5 pl-4 text-15 transition-colors ${
                    active === s.slug ? 'border-mint text-linen' : 'border-transparent text-sage hover:text-linen'
                  }`}
                >
                  {s.short}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          {list.map((s) => (
            <ServiceChapter key={s.slug} s={s} />
          ))}
        </div>
      </div>

      {faqs.length > 0 && <FaqBlock faqs={faqs} />}

      <CtaBand title="Ready to Get Started?" text="Let's discuss how we can help transform your business operations." />
    </>
  )
}
