import { Link } from 'react-router-dom'

export function Mark({ className = 'size-8' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ws-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A7F3D0" />
          <stop offset=".6" stopColor="#5EE0A8" />
          <stop offset="1" stopColor="#34D399" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#ws-mark)" />
      <circle cx="14.5" cy="24" r="3.6" fill="#06100D" />
      <g fill="none" stroke="#06100D" strokeWidth="3" strokeLinecap="round">
        <path d="M20.9 17.6 A9 9 0 0 1 20.9 30.4" />
        <path d="M25.1 13.4 A15 15 0 0 1 25.1 34.6" />
        <path d="M29.3 9.6 A20.5 20.5 0 0 1 29.3 38.4" opacity=".55" />
      </g>
    </svg>
  )
}

export default function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-3 font-display text-15 tracking-[-0.02em] whitespace-nowrap">
      <Mark className="size-8" />
      <span>
        Wajhat <span className="text-sage">Al</span> Sawt
      </span>
    </Link>
  )
}
