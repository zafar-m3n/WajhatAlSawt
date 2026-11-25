import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

const base =
  'inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3.5 text-15 font-semibold whitespace-nowrap transition-colors duration-200 disabled:cursor-wait disabled:opacity-60'

const variants = {
  primary: 'bg-jade text-ink hover:bg-mint',
  secondary: 'border border-line text-linen hover:border-mint',
}

/** Button that renders a router Link, an <a>, or a <button>. */
export default function Button({ to, href, variant = 'primary', icon, className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`
  const inner = (
    <>
      {children}
      {icon && <Icon icon={icon} className="size-4.5" aria-hidden="true" />}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>
  return <button className={cls} {...rest}>{inner}</button>
}
