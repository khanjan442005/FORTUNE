import { useCallback, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

const defaultEasing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export function useSmoothScroll(options) {
  const {
    duration = 1.2,
    easing = defaultEasing,
    direction = 'vertical',
    gestureDirection = 'vertical',
    smooth = true,
    smoothTouch = false,
    touchMultiplier = 2,
    wheelMultiplier,
    lerp,
    infinite,
    syncTouch,
    syncTouchLerp,
  } = options ?? {}
  const lenisRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration,
      easing,
      direction,
      gestureDirection,
      smooth,
      smoothTouch,
      touchMultiplier,
      ...(wheelMultiplier !== undefined ? { wheelMultiplier } : {}),
      ...(lerp !== undefined ? { lerp } : {}),
      ...(infinite !== undefined ? { infinite } : {}),
      ...(syncTouch !== undefined ? { syncTouch } : {}),
      ...(syncTouchLerp !== undefined ? { syncTouchLerp } : {}),
    })

    lenisRef.current = lenis

    const raf = (time) => {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      lenis.destroy()
      lenisRef.current = null
    }
  }, [
    direction,
    duration,
    easing,
    gestureDirection,
    infinite,
    lerp,
    smooth,
    smoothTouch,
    syncTouch,
    syncTouchLerp,
    touchMultiplier,
    wheelMultiplier,
  ])

  const scrollTo = useCallback((target, scrollOptions = {}) => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        immediate: false,
        duration: 1.2,
        ...scrollOptions,
      })
    } else {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      } else if (typeof target === 'string') {
        const el = document.querySelector(target)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return { scrollTo }
}

export default useSmoothScroll
