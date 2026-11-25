import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { EASE, ParallaxPhoto, SplitHeading } from '@/components/motion/Motion'

/**
 * Inner-page opening: breadcrumb, a headline that rises word by word, a deck, optional actions,
 * and an optional cinematic image that drifts as the page scrolls.
 */
export default function PageIntro({ crumbs, title, deck, children, image, className = '' }) {
  const reduce = useReducedMotion()
  const fade = (d) => (reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: d, ease: EASE } })
  return (
    <>
      <header className={`shell pt-16 pb-16 md:pt-28 md:pb-24 ${className}`}>
        {crumbs && (
          <motion.nav aria-label="Breadcrumb" className="mb-8 text-15 text-sage" {...fade(0)}>
            <ol className="flex flex-wrap gap-x-2 gap-y-1">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {c.to ? (
                    <Link to={c.to} className="hover:text-linen">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-linen/80">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}
        <SplitHeading text={title} className="display-page max-w-[18ch]" delay={0.1} />
        {(deck || children) && (
          <motion.div {...fade(0.55)}>
            {deck && <p className="deck measure mt-8">{deck}</p>}
            {children}
          </motion.div>
        )}
      </header>
      {image && (
        <motion.div className="shell" {...fade(0.7)}>
          <ParallaxPhoto slot={image.slot} alt={image.alt} ratio="21 / 9" mobileRatio="4 / 5" eager strength={10} />
        </motion.div>
      )}
    </>
  )
}
