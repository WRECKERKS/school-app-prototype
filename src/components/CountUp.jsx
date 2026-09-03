import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

export default function CountUp({ value, duration = 1400 }) {
  const reduced = usePrefersReducedMotion()
  const [n, setN] = useState(value)
  const raf = useRef(0)

  useEffect(() => {
    if (reduced) {
      setN(value)
      return undefined
    }
    setN(0)
    const t0 = performance.now()
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(value * eased)
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [value, duration, reduced])

  return <>{Math.round(n).toLocaleString('en-IN')}</>
}