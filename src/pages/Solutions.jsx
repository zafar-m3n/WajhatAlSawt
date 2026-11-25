import { motion } from 'motion/react'
import { Reveal, Stagger, item } from '@/components/motion/Motion'
import { Link, useSearchParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import PageIntro from '@/components/ui/PageIntro'
import Select from '@/components/ui/Select'
import Seo from '@/components/ui/Seo'
import CtaBand from '@/components/layout/CtaBand'
import { practices, services } from '@/data/services'
import { solutionsPage } from '@/data/site'

const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]))
const options = [
  { value: 'all', label: `All solutions (${services.length})` },
  ...practices.map((p) => ({ value: p.slug, label: `${p.name} (${p.services.length})` })),
]

function Row({ s }) {
  const c = s.card
  return (
    <motion.li variants={item} className="border-b border-line">
      <Link
        to={`/solutions/${s.slug}`}
        className="group grid gap-x-10 gap-y-2 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_9rem_2.5rem] md:items-center md:py-8"
      >
        <h3 className="text-21 tracking-[-0.02em] transition-colors group-hover:text-mint md:text-26">{c.title}</h3>
        <p className="measure text-15 text-sage">{c.description}</p>
        {c.metric ? (
          <p className="text-15 md:text-right">
            <span className="font-display text-21 tracking-[-0.02em] text-linen">{c.metric.value}</span>
            <span className="ml-2 text-sage md:ml-0 md:block">{c.metric.label}</span>
          </p>
        ) : (
          <span className="hidden md:block" />
        )}
        <Icon
          icon="ph:arrow-up-right"
          className="hidden size-6 justify-self-end text-sage transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mint md:block"
          aria-hidden="true"
        />
      </Link>
    </motion.li>
  )
}

export default function Solutions() {
  const [params, setParams] = useSearchParams()
  const current = params.get('practice') || 'all'
  const shown = current === 'all' ? practices : practices.filter((p) => p.slug === current)
  const value = options.find((o) => o.value === current) ?? options[0]

  return (
    <>
      <Seo title="Solutions" description={solutionsPage.lede} path="/solutions" />
      <PageIntro title={solutionsPage.title} deck={solutionsPage.lede} />

      <section className="shell">
        <div className="flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="practice-filter" className="text-15 text-sage">
            Show
          </label>
          <div className="w-full sm:w-96">
            <Select
              inputId="practice-filter"
              isSearchable={false}
              options={options}
              value={value}
              onChange={(o) => setParams(o.value === 'all' ? {} : { practice: o.value }, { replace: true })}
            />
          </div>
        </div>

        {shown.map((p) => (
          <div key={p.slug} className="pt-16 md:pt-20">
            <Reveal className="flex items-baseline justify-between gap-6 border-b border-linen/40 pb-4">
              <h2 className="text-26 tracking-[-0.02em] md:text-33">{p.name}</h2>
              <span className="shrink-0 text-15 text-sage">{p.services.length} services</span>
            </Reveal>
            <Stagger>
              {p.services.map((slug) => (
                <Row key={slug} s={bySlug[slug]} />
              ))}
            </Stagger>
          </div>
        ))}
      </section>

      <CtaBand />
    </>
  )
}
