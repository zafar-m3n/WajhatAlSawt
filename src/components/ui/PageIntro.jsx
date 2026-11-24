import { Link } from 'react-router-dom'

/**
 * Inner-page opening: optional breadcrumb, a large light headline, and a deck.
 * Left-aligned; the headline is the design.
 */
export default function PageIntro({ crumbs, title, deck, children, className = '' }) {
  return (
    <header className={`shell pt-14 pb-16 md:pt-24 md:pb-24 ${className}`}>
      {crumbs && (
        <nav aria-label="Breadcrumb" className="mb-8 text-15 text-sage">
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
        </nav>
      )}
      <h1 className="display-page max-w-[16ch]">{title}</h1>
      {deck && <p className="deck measure mt-8">{deck}</p>}
      {children}
    </header>
  )
}
