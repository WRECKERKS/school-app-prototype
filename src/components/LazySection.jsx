import { useEffect, useRef, useState } from 'react'

export default function LazySection({ children, as: Tag = 'div', className, id, rootMargin = '600px' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }
    const el = ref.current
    if (!el) return undefined
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setVisible(true)
      return undefined
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])

  return (
    <Tag ref={ref} id={id} className={className}>
      {visible ? children : null}
    </Tag>
  )
}
