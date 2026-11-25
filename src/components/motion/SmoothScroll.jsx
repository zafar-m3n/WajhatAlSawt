import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

const OFFSET = -110 // keep anchored headings clear of the sticky header

/** Smooth, weighted scrolling for the whole site (off for reduced-motion users). */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      anchors: { offset: OFFSET },
    })
    lenisRef.current = lenis
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // New page: go to its #section if there is one, otherwise jump to the top
  useEffect(() => {
    const lenis = lenisRef.current
    if (!hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
      return
    }
    const t = setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!el) return
      if (lenis) lenis.scrollTo(el, { offset: OFFSET })
      else window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + OFFSET)
    }, 120)
    return () => clearTimeout(t)
  }, [pathname, hash])

  return children
}
