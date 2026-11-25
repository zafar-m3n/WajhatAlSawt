import { motion } from 'motion/react'
import PageIntro from '@/components/ui/PageIntro'
import Seo from '@/components/ui/Seo'
import CtaBand from '@/components/layout/CtaBand'
import { Reveal, ScrollWords, SplitHeading, Stagger, item } from '@/components/motion/Motion'
import { about } from '@/data/site'

export default function About() {
  const { story } = about
  return (
    <>
      <Seo path="/about" />
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

      <CtaBand />
    </>
  )
}
