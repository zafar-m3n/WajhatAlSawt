import PageIntro from '@/components/ui/PageIntro'
import Seo from '@/components/ui/Seo'
import { legal } from '@/data/legal'

const anchor = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function Legal({ page }) {
  const doc = legal[page]
  const deck = doc.intro[doc.intro.length - 1]
  return (
    <>
      <Seo title={doc.title} description={deck} path={`/${page}`} />
      <PageIntro title={doc.title} deck={deck}>
        {doc.updated && <p className="mt-6 text-15 text-sage">Last updated {doc.updated}</p>}
      </PageIntro>
      <div className="shell grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
        <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-15 font-semibold">On this page</p>
          <ul className="mt-4 space-y-2 border-l border-line pl-4">
            {doc.sections.map((s) => (
              <li key={s.heading}>
                <a href={`#${anchor(s.heading)}`} className="text-15 text-sage hover:text-linen">
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <article className="max-w-[68ch]">
          {doc.sections.map((s) => (
            <section key={s.heading} id={anchor(s.heading)} className="scroll-mt-28 border-t border-line pt-8 pb-12">
              <h2 className="text-26 tracking-[-0.03em]">{s.heading}</h2>
              {s.blocks.some((b) => b.type === 'li') ? (
                <div className="mt-5 space-y-4 text-sage">
                  {s.blocks.filter((b) => b.type === 'p').map((b) => (
                    <p key={b.text}>{b.text}</p>
                  ))}
                  <ul className="list-disc space-y-2 pl-5 marker:text-mint">
                    {s.blocks.filter((b) => b.type === 'li').map((b) => (
                      <li key={b.text}>{b.text}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-5 space-y-4 text-sage">
                  {s.blocks.map((b) => (
                    <p key={b.text}>{b.text}</p>
                  ))}
                </div>
              )}
            </section>
          ))}
        </article>
      </div>
    </>
  )
}
