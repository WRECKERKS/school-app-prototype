const ACCENT_META = {
  indigo: '#ede9fe',
  violet: '#e5defc',
  royal: '#dedffb',
  steel: '#e0e6fd',
}

const DARK_BG = '#14132a'

export function syncThemeColor(theme, accent) {
  try {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) return
    const color = theme === 'dark' ? DARK_BG : (ACCENT_META[accent] || ACCENT_META.indigo)
    meta.setAttribute('content', color)
  } catch {
    // meta tag missing
  }
}