import Button from '@/components/ui/Button'
import { Reveal, SplitHeading } from '@/components/motion/Motion'
import { company, cta } from '@/data/site'

/** Closing call to action on a fern band. Title/text can be overridden per page. */
export default function CtaBand({ title = cta.title, text = cta.text, action = 'Get started' }) {
  return (
    <section className="mt-32 overflow-hidden bg-fern md:mt-44">
      <div className="shell grid gap-10 py-24 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-end md:py-32">
        <SplitHeading as="h2" text={title} className="display-section max-w-[16ch]" inView />
        <Reveal delay={0.2} className="space-y-6">
          <p className="text-sage">{text}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button to="/contact">{action}</Button>
            <a href={`mailto:${company.email}`} className="text-15 text-sage hover:text-linen">
              or email {company.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
