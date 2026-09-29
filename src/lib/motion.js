import { useEffect, useRef } from 'react'
import { animate, createSpring, cubicBezier, stagger } from 'animejs'
import { usePrefersReducedMotion } from './useReducedMotion'

/* Easing curves are built once, here, as functions. anime.js v4 removed the
   "cubicBezier(...)" string syntax from the core: passing it logs a console
   warning and silently resolves to `none`, which turns every entrance into a
   linear slide. So the curves below are imported and called, not stringified.

   `ease` matches the --ease token in index.css, so a card that eases in from JS
   and a card that eases via a CSS transition sit on the same curve. */
export const EASE = {
  out: cubicBezier(0.2, 0.7, 0.3, 1),
  inOut: cubicBezier(0.65, 0, 0.35, 1),
  spring: () => createSpring({ stiffness: 180, damping: 18, mass: 1 }),
}

export const DUR = { fast: 160, base: 300, slow: 480 }

/* Distance travelled during an entrance. Kept small: a 14px rise reads as
   settling, a 60px rise reads as the page assembling itself in front of you. */
const RISE = 14

/* anime.js writes inline styles, so cleanup has to revert rather than cancel.
   Cancelling would leave a half-finished `opacity: 0.5` in the DOM; reverting
   puts the element back to whatever inline style it had before we touched it. */
function animating(el, params) {
  if (!el) return undefined
  const inst = animate(el, params)
  return () => {
    if (inst && typeof inst.revert === 'function') inst.revert()
  }
}

/* Reduced motion is not "a shorter animation", it is no animation. Anything
   reduced-motion users get instead of a tween. */
function clearInline(el) {
  if (!el) return
  el.style.opacity = ''
  el.style.transform = ''
}

/* The single entrance used across the app. Anything that appears should arrive
   the same way, or the app stops feeling like one product.

   `y` and `scale` are the anime.js v4 transform shorthands (y maps to
   translateY). They are not CSS property names, which is why they look short. */
export function revealParams(overrides = {}) {
  return {
    opacity: [0, 1],
    y: [RISE, 0],
    duration: DUR.base,
    ease: EASE.out,
    ...overrides,
  }
}

/** Fade and rise a single element when it mounts. */
export function useReveal({ delay = 0, duration = DUR.base, distance = RISE } = {}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (reduced) { clearInline(el); return undefined }
    return animating(el, revealParams({ delay, duration, y: [distance, 0] }))
  }, [reduced, delay, duration, distance])

  return ref
}

function useStaggerInto(selector, trigger, { gap = 42, max = 14, delay = 0, duration = DUR.base } = {}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (reduced) { clearInline(el); return undefined }
    const items = el ? [...el.querySelectorAll(selector)].slice(0, max) : []
    if (!items.length) return undefined
    return animating(items, revealParams({ delay: stagger(gap) + delay, duration }))
  }, [reduced, selector, trigger, gap, max, delay, duration])

  return ref
}

/** Stagger a container's existing children in. Use on a container whose
 *  children are already rendered on mount. */
export function useStaggerReveal(selector, options) {
  return useStaggerInto(selector, null, options)
}

/** Re-run a stagger when `key` changes, for lists that swap their contents
 *  without the container itself remounting. */
export function useStaggerOn(selector, key, options) {
  return useStaggerInto(selector, key, options)
}

/** The ambient breathing pulse on live indicators. Infinite by design, and
 *  skipped outright under reduced motion rather than shortened. */
export function usePulse({ from = 1, to = 1.35, duration = 1600 } = {}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (reduced) { clearInline(el); return undefined }
    const inst = animate(el, {
      scale: [from, to],
      opacity: [1, 0.55],
      duration,
      loop: true,
      alternate: true,
      ease: EASE.inOut,
    })
    return () => {
      if (inst && typeof inst.revert === 'function') inst.revert()
    }
  }, [reduced, from, to, duration])

  return ref
}

/** A one-shot emphasis, for the moment something becomes worth noticing. */
export function useNudge({ trigger = 0 } = {}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (reduced) { clearInline(el); return undefined }
    return animating(el, { scale: [1, 1.04, 1], duration: DUR.base, ease: EASE.out })
  }, [reduced, trigger])

  return ref
}
