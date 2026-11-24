import { Icon } from '@iconify/react'
import PageIntro from '@/components/ui/PageIntro'
import Photo from '@/components/ui/Photo'
import Seo from '@/components/ui/Seo'
import CtaBand from '@/components/layout/CtaBand'
import { about } from '@/data/site'

function Portrait() {
  return (
    <div className="grid aspect-[4/5] place-items-center rounded-[22px] bg-fern" role="img" aria-label="Photo placeholder">
      <Icon icon="ph:user-light" className="size-16 text-mint/50" aria-hidden="true" />
    </div>
  )
}

export default function About() {
  const { story, team } = about
  return (
    <>
      <Seo title="About" description={about.lede} path="/about" />
      <PageIntro title={about.title} deck={about.lede} />

      <section className="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <figure>
          <Photo slot="about-team" rounded="rounded-[28px] rounded-tr-[140px]" />
          <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-4">
            <span className="font-display text-21 tracking-[-0.03em]">{story.badge.title}</span>
            <span className="text-15 text-sage">{story.badge.text}</span>
          </figcaption>
        </figure>
        <div>
          <h2 className="display-section max-w-[16ch]">{story.title}</h2>
          <div className="mt-8 space-y-5">
            <p className="measure text-21 leading-relaxed">{story.paras[0]}</p>
            {story.paras.slice(1).map((p) => (
              <p key={p} className="measure text-sage">
                {p}
              </p>
            ))}
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-x-8 border-t border-line">
            {about.facts.map((f) => (
              <div key={f.label} className="border-b border-line py-5">
                <dt className="text-15 text-sage">{f.label}</dt>
                <dd className="mt-1 font-display text-33 font-light tracking-[-0.04em]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mt-32 bg-fern md:mt-40">
        <div className="shell grid gap-14 py-20 md:grid-cols-2 md:gap-20 md:py-28">
          {[
            ['Our Mission', about.mission],
            ['Our Vision', about.vision],
          ].map(([h, t]) => (
            <div key={h}>
              <h2 className="text-26 tracking-[-0.03em] md:text-33">{h}</h2>
              <p className="measure mt-6 text-21 leading-relaxed text-linen/90">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pt-28 md:pt-40">
        <h2 className="display-section max-w-[14ch]">{about.valuesTitle}</h2>
        <ul className="mt-12 border-t border-line">
          {about.values.map((v) => (
            <li key={v.name} className="grid gap-3 border-b border-line py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-baseline md:gap-12 md:py-10">
              <h3 className="text-33 font-light tracking-[-0.04em] md:text-41">{v.name}</h3>
              <p className="measure text-sage">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pt-28 md:pt-40">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="display-section">{team.title}</h2>
          <p className="deck max-w-[40ch]">{team.intro}</p>
        </div>

        <h3 className="mt-16 font-sans text-17 font-semibold tracking-normal">Executive Directors</h3>
        <ul className="mt-6 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {team.directors.map((d) => (
            <li key={d.name}>
              <Portrait />
              <p className="mt-6 font-display text-21 tracking-[-0.03em]">{d.name}</p>
              <p className="mt-1 text-15 text-mint">{d.role}</p>
              <p className="mt-4 text-15 text-sage">{d.bio}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-24 font-sans text-17 font-semibold tracking-normal">Management Team</h3>
        <ul className="mt-6 border-t border-line">
          {team.managers.map((m) => (
            <li key={m.name} className="grid gap-x-10 gap-y-2 border-b border-line py-7 md:grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1.6fr)] md:items-start">
              <div className="grid size-14 place-items-center rounded-full bg-fern max-md:mb-2" role="img" aria-label="Photo placeholder">
                <Icon icon="ph:user-light" className="size-7 text-mint/60" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-21 tracking-[-0.03em]">{m.name}</p>
                <p className="mt-1 text-15 text-mint">{m.role}</p>
              </div>
              <p className="measure text-15 text-sage">{m.bio}</p>
            </li>
          ))}
        </ul>
        <p className="deck measure mt-12">{team.outro}</p>
      </section>

      <CtaBand />
    </>
  )
}
