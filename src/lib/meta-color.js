const LIGHT_BG = '#f4f6f9'
const DARK_BG = '#0a1020'

export function syncThemeColor(theme) {
  try {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) return
    meta.setAttribute('content', theme === 'dark' ? DARK_BG : LIGHT_BG)
  } catch {
    // meta tag missing
  }
}