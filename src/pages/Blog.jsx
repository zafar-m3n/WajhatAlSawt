import { motion } from 'motion/react'
import { Reveal, Stagger, item } from '@/components/motion/Motion'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageIntro from '@/components/ui/PageIntro'
import Photo from '@/components/ui/Photo'
import Select from '@/components/ui/Select'
import Seo from '@/components/ui/Seo'
import Button from '@/components/ui/Button'
import { posts } from '@/data/posts'
import { blogPage, company } from '@/data/site'

const categories = [...new Set(posts.map((p) => p.category))]
const options = [{ value: 'all', label: 'All posts' }, ...categories.map((c) => ({ value: c, label: c }))]

export function PostMeta({ p, className = '' }) {
  return (
    <p className={`flex flex-wrap gap-x-5 gap-y-1 text-15 text-sage ${className}`}>
      <span>{p.author}</span>
      {p.date && <span>{p.date}</span>}
      {p.readTime && <span>{p.readTime}</span>}
    </p>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState(null) // null | 'invalid' | 'offline'
  const submit = (e) => {
    e.preventDefault()
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'offline' : 'invalid')
  }
  return (
    <section className="mt-28 bg-fern md:mt-36" aria-labelledby="newsletter">
      <div className="shell grid gap-8 py-16 md:grid-cols-2 md:items-end md:py-20">
        <div>
          <h2 id="newsletter" className="text-26 tracking-[-0.02em] md:text-33">
            {blogPage.newsletter.title}
          </h2>
          <p className="mt-3 text-sage">{blogPage.newsletter.text}</p>
        </div>
        <form onSubmit={submit} noValidate className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="nl-email" className="sr-only">
              Email address
            </label>
            <input
              id="nl-email"
              type="email"
              value={email}
              onChange={(e) => (setEmail(e.target.value), setState(null))}
              placeholder="Enter your email"
              aria-invalid={state === 'invalid'}
              aria-describedby="nl-msg"
              className="min-h-12 flex-1 rounded-[10px] border border-line bg-ink px-4 text-17 placeholder:text-sage/70 focus:border-mint focus:outline-none"
            />
            <Button type="submit">Subscribe</Button>
          </div>
          <p id="nl-msg" role="status" className="min-h-6 text-15 text-sage">
            {state === 'invalid' && 'Enter an email address like name@company.com.'}
            {state === 'offline' && (
              <>
                Sign-up isn't available yet. Email <a className="text-link" href={`mailto:${company.email}`}>{company.email}</a> to subscribe.
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  )
}

export default function Blog() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('category') || 'all'
  const list = cat === 'all' ? posts : posts.filter((p) => p.category === cat)
  const [lead, ...rest] = list

  return (
    <>
      <Seo title="Blog" description={blogPage.lede} path="/blogs" />
      <PageIntro title={blogPage.title} deck={blogPage.lede} />

      <section className="shell">
        <div className="flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="cat-filter" className="text-15 text-sage">
            Category
          </label>
          <div className="w-full sm:w-80">
            <Select
              inputId="cat-filter"
              isSearchable={false}
              options={options}
              value={options.find((o) => o.value === cat)}
              onChange={(o) => setParams(o.value === 'all' ? {} : { category: o.value }, { replace: true })}
            />
          </div>
        </div>

        {lead && (
          <Reveal key={lead.slug} as="article" className="grid gap-8 pt-14 md:pt-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
            <Link to={`/blogs/${lead.slug}`} aria-hidden="true" tabIndex={-1} className="group block overflow-hidden rounded-[24px]">
              <div className="transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]">
                <Photo slot={`post-${lead.slug}`} alt={lead.title} rounded="rounded-none" />
              </div>
            </Link>
            <div>
              <p className="text-15 text-mint">{lead.category}</p>
              <h2 className="mt-3 text-33 leading-tight tracking-[-0.02em] md:text-41">
                <Link to={`/blogs/${lead.slug}`} className="hover:text-mint">
                  {lead.title}
                </Link>
              </h2>
              <p className="measure mt-5 text-sage">{lead.excerpt}</p>
              <PostMeta p={lead} className="mt-6" />
            </div>
          </Reveal>
        )}

        <Stagger key={cat} className="mt-16 border-t border-line md:mt-20">
          {rest.map((p) => (
            <motion.li variants={item} key={p.slug} className="border-b border-line">
              <Link to={`/blogs/${p.slug}`} className="group grid gap-5 py-8 sm:grid-cols-[11rem_1fr] sm:gap-8 md:grid-cols-[14rem_1fr]">
                <Photo slot={`post-${p.slug}`} alt="" showKeywords={false} rounded="rounded-[14px]" />
                <div>
                  <p className="text-15 text-mint">{p.category}</p>
                  <h3 className="mt-2 text-21 tracking-[-0.015em] transition-colors group-hover:text-mint md:text-26">{p.title}</h3>
                  <p className="measure mt-3 line-clamp-2 text-15 text-sage">{p.excerpt}</p>
                  <PostMeta p={p} className="mt-4" />
                </div>
              </Link>
            </motion.li>
          ))}
        </Stagger>
      </section>

      <Newsletter />
    </>
  )
}
