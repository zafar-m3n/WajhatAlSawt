import { Link, useParams } from 'react-router-dom'
import PageIntro from '@/components/ui/PageIntro'
import Photo from '@/components/ui/Photo'
import Seo from '@/components/ui/Seo'
import CtaBand from '@/components/layout/CtaBand'
import NotFound from '@/pages/NotFound'
import { PostMeta } from '@/pages/Blog'
import { posts } from '@/data/posts'

function Body({ blocks }) {
  let firstP = true
  return blocks.map((b, i) => {
    if (b.type === 'h2')
      return (
        <h2 key={i} className="mt-14 text-26 tracking-[-0.03em] md:text-33">
          {b.text}
        </h2>
      )
    if (b.type === 'ul')
      return (
        <ul key={i} className="mt-6 list-disc space-y-2 pl-5 text-sage marker:text-mint">
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      )
    const lead = firstP
    firstP = false
    return (
      <p key={i} className={lead ? 'mt-0 text-21 leading-relaxed' : 'mt-6 text-sage'} style={{ lineHeight: lead ? 1.6 : 1.75 }}>
        {b.text}
      </p>
    )
  })
}

export default function Post() {
  const { slug } = useParams()
  const p = posts.find((x) => x.slug === slug)
  if (!p) return <NotFound />
  const related = [...posts.filter((x) => x.slug !== p.slug && x.category === p.category), ...posts.filter((x) => x.slug !== p.slug && x.category !== p.category)].slice(0, 2)

  return (
    <>
      <Seo title={p.title} description={p.excerpt} path={`/blogs/${p.slug}`} />
      <PageIntro crumbs={[{ label: 'Blog', to: '/blogs' }, { label: p.category, to: `/blogs?category=${encodeURIComponent(p.category)}` }]} title={p.title} className="[&_h1]:max-w-[22ch]">
        <PostMeta p={p} className="mt-8" />
      </PageIntro>

      <div className="shell">
        <Photo slot={`post-${p.slug}`} alt={p.title} rounded="rounded-[28px]" eager />
      </div>

      <article className="shell pt-16 md:pt-24">
        <div className="mx-auto max-w-[68ch]">
          <Body blocks={p.body} />
          {p.tags.length > 0 && (
            <ul className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 text-15 text-sage" aria-label="Tags">
              {p.tags.map((t) => (
                <li key={t}>#{t}</li>
              ))}
            </ul>
          )}
        </div>
      </article>

      <section className="shell pt-28 md:pt-36">
        <h2 className="border-b border-linen/40 pb-4 text-26 tracking-[-0.03em]">Related Articles</h2>
        <ul className="grid md:grid-cols-2 md:gap-x-16">
          {related.map((r) => (
            <li key={r.slug} className="border-b border-line">
              <Link to={`/blogs/${r.slug}`} className="group block py-7">
                <p className="text-15 text-mint">{r.category}</p>
                <h3 className="mt-2 text-21 tracking-[-0.025em] group-hover:text-mint">{r.title}</h3>
                <p className="mt-3 line-clamp-2 text-15 text-sage">{r.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Ready to Transform Your Operations?" text="Let's discuss how our BPO solutions can help your business grow." />
    </>
  )
}
