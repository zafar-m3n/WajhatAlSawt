import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Photo from '@/components/ui/Photo'

export const EASE = [0.22, 1, 0.36, 1]

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ as = 'div', delay = 0, y = 40, className = '', children, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  if (reduce) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Staggered list: each child item rises in sequence when the list enters view. */
export function Stagger({ as = 'ul', className = '', children, gap = 0.08 }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Tag>
  )
}
export const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

/**
 * Headline that rises word by word, each word clipped by its own line mask.
 * `lines` is an array of strings (each rendered on its own line), or pass `text`.
 */
export function SplitHeading({ as = 'h1', lines, text, className = '', delay = 0, inView = false }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const rows = lines ?? [text]
  let i = 0
  const trigger = inView ? { whileInView: 'show', viewport: { once: true, amount: 0.4 } } : { animate: 'show' }
  return (
    <Tag className={className} initial={reduce ? false : 'hidden'} {...trigger} aria-label={rows.join(' ')}>
      {rows.map((row, r) => (
        <span key={r} className="block" aria-hidden="true">
          {row.split(' ').map((w) => {
            const idx = i++
            return (
              <span key={idx} className="inline-block overflow-hidden pb-[0.12em] align-top">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: '110%' },
                    show: { y: 0, transition: { duration: 1.1, delay: delay + idx * 0.06, ease: EASE } },
                  }}
                >
                  {w}
                  {' '}
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

/** A statement whose words light up one by one as it scrolls through the screen. */
export function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={reduce}>
          {w}
        </Word>
      ))}
    </p>
  )
}
function Word({ children, progress, range, still }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={still ? undefined : { opacity }} className="inline">
      {children}{' '}
    </motion.span>
  )
}

/** Image that drifts and settles inside its frame while scrolling past. */
export function ParallaxPhoto({ slot, alt, className = '', rounded = 'rounded-[28px]', ratio, mobileRatio, strength = 12, eager }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])
  return (
    <div ref={ref} className={`relative overflow-hidden ${rounded} ${className}`}>
      <motion.div style={reduce ? undefined : { y, scale: 1 + (strength * 2.2) / 100 }} className="origin-center">
        <Photo slot={slot} alt={alt} ratio={ratio} mobileRatio={mobileRatio} rounded="rounded-none" eager={eager} />
      </motion.div>
    </div>
  )
}

/** Endless band of text, drifting sideways. */
export function Marquee({ items, className = '', duration = 60, reverse = false }) {
  const reduce = useReducedMotion()
  const row = (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap">
          {t}
          <span className="size-2 rounded-full bg-jade" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className={`overflow-hidden ${className}`}>
      <span className="sr-only">{items.join(', ')}</span>
      <div
        className="flex w-max"
        style={reduce ? undefined : { animation: `marquee ${duration}s linear infinite${reverse ? ' reverse' : ''}` }}
      >
        {row}
        {row}
      </div>
    </div>
  )
}
