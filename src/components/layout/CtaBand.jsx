import Button from '@/components/ui/Button'
import { company, cta } from '@/data/site'

/** Closing call to action on a fern band. Title/text can be overridden per page. */
export default function CtaBand({ title = cta.title, text = cta.text, action = 'Get started' }) {
  return (
    <section className="mt-32 bg-fern md:mt-40">
      <div className="shell grid gap-10 py-20 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-end md:py-28">
        <h2 className="display-section max-w-[18ch]">{title}</h2>
        <div className="space-y-6">
          <p className="text-sage">{text}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button to="/contact">{action}</Button>
            <a href={company.phoneHref} className="text-15 text-sage hover:text-linen">
              or call {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
