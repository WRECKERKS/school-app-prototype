const LIGHT_BG = '#f2f4f7'
const DARK_BG = '#0e1116'

export function syncThemeColor(theme) {
  try {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) return
    meta.setAttribute('content', theme === 'dark' ? DARK_BG : LIGHT_BG)
  } catch {
    // meta tag missing
  }
}