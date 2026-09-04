import { useEffect, useState } from 'react'
import { syncThemeColor } from './meta-color'

export const ACCENT_NAMES = {
  indigo: 'Indigo',
  violet: 'Violet',
  royal: 'Royal',
  steel: 'Steel',
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('edusuite_theme') || 'light'
    } catch {
      return 'light'
    }
  })

  const [accent, setAccent] = useState(() => {
    try {
      return localStorage.getItem('edusuite_accent') || 'indigo'
    } catch {
      return 'indigo'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('edusuite_theme', theme)
    } catch {
      // storage unavailable
    }
    syncThemeColor(theme, accent)
  }, [theme, accent])

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent)
    try {
      localStorage.setItem('edusuite_accent', accent)
    } catch {
      // storage unavailable
    }
    syncThemeColor(theme, accent)
  }, [accent, theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, accent, toggle, setAccent }
}