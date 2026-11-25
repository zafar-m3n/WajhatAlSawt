import { motion } from 'motion/react'
import Accordion from '@/components/ui/Accordion'
import { Reveal, SplitHeading, Stagger, item } from '@/components/motion/Motion'

/** Numbered process steps (only for content that really is a sequence). */
export function Steps({ steps }) {
  return (
    <Stagger as="ol" className="border-t border-line">
      {steps.map((s, i) => (
        <motion.li variants={item} key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-x-6 border-b border-line py-7 md:grid-cols-[5rem_1fr]">
          <span className="font-display text-41 leading-none font-semibold text-mint" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <h4 className="text-21 font-semibold tracking-[-0.015em]">{s.title}</h4>
            <p className="measure mt-2 text-sage">{s.text}</p>
          </div>
        </motion.li>
      ))}
    </Stagger>
  )
}

/** Heading on the left, accordion on the right. */
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
