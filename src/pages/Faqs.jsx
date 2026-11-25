import { Reveal } from '@/components/motion/Motion'
import Accordion from '@/components/ui/Accordion'
import Button from '@/components/ui/Button'
import PageIntro from '@/components/ui/PageIntro'
import Seo from '@/components/ui/Seo'
import { company } from '@/data/site'
import { faqs } from '@/data/faqs'

export default function Faqs() {
  const deck = 'Answers to the questions we hear most from prospective clients.'
  return (
    <>
      <Seo title="FAQs" description={deck} path="/faqs" />
      <PageIntro title="Frequently Asked Questions" deck={deck} />
      <section className="shell grid gap-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-24">
        <Reveal>
          <Accordion items={faqs.general} />
        </Reveal>
        <Reveal delay={0.15} className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-26 tracking-[-0.02em]">Still have questions?</h2>
          <p className="mt-3 text-sage">Our team is happy to walk you through the details.</p>
          <Button href={`mailto:${company.email}`} className="mt-6">
            Email us
          </Button>
        </Reveal>
      </section>
    </>
  )
}
