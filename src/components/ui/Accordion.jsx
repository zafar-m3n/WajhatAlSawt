import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Icon } from '@iconify/react'

function Item({ q, a, open, onToggle }) {
  const id = useId()
  return (
    <div className="border-b border-line">
      <h3 className="font-sans text-17 font-semibold tracking-normal">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-mint"
        >
          <span>{q}</span>
          <Icon icon={open ? 'ph:minus' : 'ph:plus'} className="mt-1 size-5 shrink-0 text-mint" aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="measure pb-6 text-sage">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** FAQ list: one item open at a time; the first starts open. */
export default function Accordion({ items, className = '' }) {
  const [open, setOpen] = useState(0)
  return (
    <div className={`border-t border-line ${className}`}>
      {items.map((it, i) => (
        <Item key={it.q} q={it.q} a={it.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
      ))}
    </div>
  )
}
