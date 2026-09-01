import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function CountUp({ value, duration = 1400 }) {
  const [n, setN] = useState(() => (prefersReducedMotion() ? value : 0))
  const raf = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const t0 = performance.now()
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(value * eased)
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [value, duration])

  return <>{Math.round(n).toLocaleString('en-IN')}</>
}