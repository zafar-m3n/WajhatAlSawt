import { motion } from 'motion/react'
import { Icon } from '@iconify/react'
import PageIntro from '@/components/ui/PageIntro'
import Seo from '@/components/ui/Seo'
import CtaBand from '@/components/layout/CtaBand'
import { Reveal, ScrollWords, SplitHeading, Stagger, item } from '@/components/motion/Motion'
import { about } from '@/data/site'

function Portrait() {
  return (
    <div className="grid aspect-[4/5] place-items-center rounded-[24px] bg-fern transition-colors duration-700 group-hover:bg-moss" role="img" aria-label="Photo placeholder">
      <Icon icon="ph:user-light" className="size-16 text-mint/50 transition-transform duration-700 group-hover:scale-110" aria-hidden="true" />
    </div>
  )
}

export default function About() {
  const { story, team } = about
  return (
    <>
      <Seo title="About" description={about.lede} path="/about" />
      <PageIntro title={about.title} deck={about.lede} image={{ slot: 'about-team' }} />

      <section className="shell pt-32 md:pt-48">
        <Reveal>
          <p className="text-17 text-mint">Our Story</p>
        </Reveal>
        <SplitHeading as="h2" text={story.title} className="display-section mt-4 max-w-[16ch]" inView />
        <ScrollWords text={story.paras[0]} className="mt-14 max-w-[30ch] font-display text-[clamp(1.6rem,3.2vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.02em]" />
        <Reveal className="mt-14 grid gap-6 md:ml-[30%] md:grid-cols-2 md:gap-12">
          {story.paras.slice(1).map((p) => (
            <p key={p} className="text-sage">
              {p}
            </p>
          ))}
        </Reveal>
      </section>

      <section className="mt-32 bg-fern md:mt-44">
        <div className="shell grid gap-16 py-24 md:grid-cols-2 md:gap-20 md:py-32">
          {[
            ['Our Mission', about.mission],
            ['Our Vision', about.vision],
          ].map(([h, t], i) => (
            <Reveal key={h} delay={i * 0.15}>
              <h2 className="text-33 font-semibold tracking-[-0.02em] md:text-41">{h}</h2>
              <p className="measure mt-6 text-21 leading-relaxed text-linen/90">{t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pt-32 md:pt-44">
        <SplitHeading as="h2" text={about.valuesTitle} className="display-section max-w-[14ch]" inView />
        <Stagger className="mt-14 border-t border-line" gap={0.12}>
          {about.values.map((v) => (
            <motion.li
              variants={item}
              key={v.name}
              className="group grid gap-3 border-b border-line py-9 transition-colors duration-500 hover:bg-fern/50 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:gap-12 md:px-4 md:py-12"
            >
              <h3 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-none font-semibold tracking-[-0.03em] transition-colors duration-500 group-hover:text-mint">{v.name}</h3>
              <p className="measure text-17 text-sage">{v.text}</p>
            </motion.li>
          ))}
        </Stagger>
      </section>

      <section className="shell pt-32 md:pt-44">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <SplitHeading as="h2" text={team.title} className="display-section" inView />
          <Reveal>
            <p className="deck max-w-[40ch]">{team.intro}</p>
          </Reveal>
        </div>

        <Reveal>
          <h3 className="mt-16 font-sans text-17 font-semibold tracking-normal">Executive Directors</h3>
        </Reveal>
        <Stagger className="mt-6 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10" gap={0.12}>
          {team.directors.map((d) => (
            <motion.li variants={item} key={d.name} className="group">
              <Portrait />
              <p className="mt-6 font-display text-26 font-semibold tracking-[-0.02em]">{d.name}</p>
              <p className="mt-1 text-15 text-mint">{d.role}</p>
              <p className="mt-4 text-15 text-sage">{d.bio}</p>
            </motion.li>
          ))}
        </Stagger>

        <Reveal>
          <h3 className="mt-24 font-sans text-17 font-semibold tracking-normal">Management Team</h3>
        </Reveal>
        <Stagger className="mt-6 border-t border-line">
          {team.managers.map((m) => (
            <motion.li
              variants={item}
              key={m.name}
              className="grid gap-x-10 gap-y-2 border-b border-line py-7 md:grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1.6fr)] md:items-start"
            >
              <div className="grid size-14 place-items-center rounded-full bg-fern max-md:mb-2" role="img" aria-label="Photo placeholder">
                <Icon icon="ph:user-light" className="size-7 text-mint/60" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-21 font-semibold tracking-[-0.015em]">{m.name}</p>
                <p className="mt-1 text-15 text-mint">{m.role}</p>
              </div>
              <p className="measure text-15 text-sage">{m.bio}</p>
            </motion.li>
          ))}
        </Stagger>
        <Reveal>
          <p className="deck measure mt-12">{team.outro}</p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  )
}
