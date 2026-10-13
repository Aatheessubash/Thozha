import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * useLenis
 * Initializes smooth page scrolling with Lenis and unifies it with GSAP ScrollTrigger.
 * Uses GSAP ticker as the single animation driver to eliminate RAF competition and jitter.
 */
export function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis({
      duration: 0.82,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.05,
      infinite: false,
    })

    lenisRef.current = lenis
    window.lenis = lenis

    // Synchronize Lenis scroll event with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Unify animation loops into GSAP's central ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after DOM has settled
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(timeout)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
