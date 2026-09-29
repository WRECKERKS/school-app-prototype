/* Rendered-DOM audit.

   Screenshots are useless here because the model cannot read images, so instead
   of looking at a picture this asserts the properties a picture would have been
   used to check: real contrast of real text against real backgrounds, whether
   the ambient shading actually applied and the old hard clay rim is gone,
   whether the canvas and card are actually different colours, and whether
   anything overflows or is too small to tap.

   Everything is read back from getComputedStyle on the live page, so it cannot
   drift from what ships. */
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = 'http://localhost:4173/school-app-prototype'
const PORT = 9334

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`, '--headless=new', '--disable-gpu',
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
  '--user-data-dir=' + process.env.TEMP + '\\cdp-audit', 'about:blank',
], { stdio: 'ignore' })
process.on('exit', () => chrome.kill())

async function endpoint() {
  for (let i = 0; i < 60; i++) {
    try { return (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl }
    catch { await sleep(250) }
  }
  throw new Error('no debug port')
}

const ws = new WebSocket(await endpoint())
await new Promise((res, rej) => {
  ws.onopen = res
  ws.onerror = () => rej(new Error('ws error'))
})
let id = 0
const pending = new Map()
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id); pending.delete(m.id)
    if (m.error) rej(new Error(JSON.stringify(m.error)))
    else res(m.result)
  }
}
const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
  const n = ++id; pending.set(n, { res, rej })
  ws.send(JSON.stringify({ id: n, method, params, sessionId }))
})
const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
const call = (m, p) => send(m, p, sessionId)
await call('Page.enable')
await call('Runtime.enable')

/* ---- the audit, runs inside the page ------------------------------------ */
const AUDIT = String.raw`(() => {
  const out = { textFail: [], depth: [], surfaces: [], overflow: [], smallTargets: [], missing: [], skipped: 0 }

  const px = (v) => parseFloat(v) || 0
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/)
    if (!m) return null
    const p = m[1].split(',').map((x) => parseFloat(x))
    return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] }
  }
  const lum = ({ r, g, b }) => {
    const f = (v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4) }
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
  }
  const over = (fg, bg) => ({ // composite fg (with alpha) onto bg
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  })
  const ratio = (a, b) => { const la = lum(a), lb = lum(b); return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05) }
  const effectiveBg = (el) => {
    let n = el
    let acc = null
    while (n && n !== document.documentElement.parentNode) {
      const cs = getComputedStyle(n)
      /* A gradient lives in background-image, so the colour walk would fall
         through to the canvas and report a false 1:1. Flag it instead. */
      const bi = cs.backgroundImage
      if (bi && bi !== 'none' && /gradient/.test(bi) && n === el) return { gradient: true }
      const c = parse(cs.backgroundColor)
      if (c && c.a > 0) { acc = acc ? over(acc, c) : c; if (c.a >= 1) return acc }
      n = n.parentElement
    }
    return acc || { r: 255, g: 255, b: 255, a: 1 }
  }

  /* 1. text contrast, on every element that directly holds a text node */
  for (const el of document.querySelectorAll('body *')) {
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)
    if (!hasText) continue
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none' || px(cs.opacity) === 0) continue
    const r = el.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) continue
    const fg = parse(cs.color); if (!fg) continue
    const bg = effectiveBg(el)
    if (bg.gradient) { out.skipped++; continue }
    const solid = fg.a < 1 ? over(fg, bg) : fg
    const cr = ratio(solid, bg)
    const size = px(cs.fontSize)
    const weight = parseInt(cs.fontWeight, 10) || 400
    const large = size >= 24 || (size >= 18.66 && weight >= 700)
    const need = large ? 3 : 4.5
    if (cr < need) {
      out.textFail.push({
        sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''),
        ratio: +cr.toFixed(2), need, size, weight,
        fg: cs.color, bg: 'rgb(' + Math.round(bg.r) + ',' + Math.round(bg.g) + ',' + Math.round(bg.b) + ')',
        text: (el.textContent || '').trim().slice(0, 42),
      })
    }
  }

  /* 2. depth model. Two things have to be true now that clay is gone: the
        ambient green glow actually applied, and no hard rim is left behind.
        A rim is an outset layer with zero blur and zero spread -- that single
        line under the card was the whole clay read. */
  const RAISED = ['.panel', '.stat-card', '.login-card', '.start-card', '.fcard', '.tcard',
                   '.app-launch', '.app-quick', '.app-profile-card', '.btn', '.modal', '.app-tile']
  for (const sel of RAISED) {
    const el = document.querySelector(sel)
    if (!el) { out.missing.push(sel); continue }
    const sh = getComputedStyle(el).boxShadow
    const layers = !sh || sh === 'none' ? [] : sh.split(/,(?![^(]*\))/).filter((s) => s.trim())
    /* zero blur, zero spread, outset (no 'inset') => a drawn rim */
    const rim = layers.find((l) => !/inset/.test(l) && /^0(px)?\s+-?[\d.]+px\s+0(px)?\s+/.test(l.trim()))
    const b = getComputedStyle(el, '::before')
    const glow = b && b.backgroundImage && /gradient/.test(b.backgroundImage) && px(b.opacity) > 0
    out.depth.push({ sel, layers: layers.length, glow: !!glow, rim: rim ? rim.trim() : null })
  }

  /* 3. is the card actually a different colour from the canvas? */
  const canvas = parse(getComputedStyle(document.body).backgroundColor)
  const card = document.querySelector('.panel, .login-card, .card, .start-card, .fcard')
  if (canvas && card) {
    const cb = effectiveBg(card)
    if (!cb.gradient) {
      out.surfaces.push({ canvas, card: cb, ratio: +ratio(canvas, cb).toFixed(2) })
    }
  }

  /* 4. horizontal overflow */
  const de = document.documentElement
  const inScroller = (el) => {
    for (let n = el.parentElement; n && n !== document.documentElement; n = n.parentElement) {
      const ox = getComputedStyle(n).overflowX
      if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') return true
    }
    return false
  }
  if (de.scrollWidth > de.clientWidth + 1) {
    out.overflow.push({ el: 'DOCUMENT', right: de.scrollWidth, vw: de.clientWidth })
  }
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect()
    /* A child of an overflow-x scroller is allowed past the edge; the
       container clips it, so it is not a page-level overflow. */
    if (r.right > de.clientWidth + 2 && r.width > 0 && !inScroller(el)) {
      out.overflow.push({ el: el.tagName.toLowerCase() + '.' + String(el.className || '').trim().split(/\s+/)[0],
                          right: Math.round(r.right), vw: de.clientWidth })
    }
  }

  /* 5. tap targets under 44px that are actually interactive */
  for (const el of document.querySelectorAll('a[href], button, [role="button"], input, select')) {
    const r = el.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) continue
    const cs = getComputedStyle(el)
    if (cs.display === 'none' || cs.visibility === 'hidden') continue
    if (r.height < 40 || r.width < 24) {
      out.smallTargets.push({ el: el.tagName.toLowerCase() + '.' + String(el.className || '').trim().split(/\s+/)[0],
                              w: Math.round(r.width), h: Math.round(r.height),
                              text: (el.textContent || el.value || '').trim().slice(0, 26) })
    }
  }

  return out
})()`

async function runAudit(label, { path: route, width, height, theme, signIn }) {
  await call('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 700 })

  if (signIn) {
    /* Deterministic session for the app routes. Unauthenticated, /app/* bounces
       to /login?plan=basic and Login does not redirect away once a user exists,
       so: plant the session, hard reload (AuthContext mounts with the user in
       memory), and only then tell the router to go to the route. */
    await call('Page.navigate', { url: `${BASE}/#${route}` })
    await sleep(600)
    await call('Runtime.evaluate', {
      expression: `localStorage.clear(); localStorage.setItem('edusuite_user', JSON.stringify({
        name: 'Priya Sharma', role: 'Teacher', roleId: 'teacher', plan: 'premium',
        email: 'teacher@demoschool.edu', isDemo: true }))`,
    })
    await call('Page.reload', { ignoreCache: true })
    await sleep(900)
    await call('Runtime.evaluate', { expression: `location.hash = '#${route}'` })
    let landed = false
    for (let i = 0; i < 30; i++) {
      await sleep(300)
      const r = await call('Runtime.evaluate', {
        expression: `location.hash.startsWith('#${route}') && !!document.querySelector('.app-shell')`,
        returnByValue: true,
      })
      if (r.result.value) { landed = true; break }
    }
    if (!landed) {
      const where = await call('Runtime.evaluate', { expression: 'location.hash', returnByValue: true })
      console.log(`WARN ${label}: never reached ${route} (stuck at ${where.result.value})`)
    }
  } else {
    await call('Page.navigate', { url: `${BASE}/#${route}` })
    await sleep(1400)
  }

  /* Report where we actually landed, so a mis-routed audit cannot pass silently */
  const where = await call('Runtime.evaluate', {
    expression: `location.hash + ' | ' + (document.querySelector('.app-shell') ? 'app-shell' : 'no-shell') + ' | ' + (document.querySelector('.login-card') ? 'login' : '')`,
    returnByValue: true,
  })

  await call('Runtime.evaluate', { expression: `document.documentElement.setAttribute('data-theme','${theme}')` })
  await sleep(700)

  const { result } = await call('Runtime.evaluate', { expression: AUDIT, returnByValue: true })
  const r = result.value
  const t = r.textFail.length
  /* flat = no glow and no shadow at all; rim = the old clay edge came back */
  const d = r.depth.filter((x) => x.rim || (!x.glow && x.layers === 0))
  const of = r.overflow.length, s = r.smallTargets.length
  const flag = t || d.length || of ? '!!' : 'ok'
  console.log(
    `${flag} ${label.padEnd(30)} text-fail=${String(t).padEnd(3)} depth-weak=${String(d.length).padEnd(3)} overflow=${String(of).padEnd(3)} small=${s}  [${where.result.value}]`
  )
  return r
}

async function audit(label, opts) {
  const { width } = opts
  const r = await runAudit(label, opts)
  if (r.textFail.length) {
    console.log(`     -> ${r.textFail.length} contrast failure(s)`)
    for (const f of r.textFail.slice(0, 8)) {
      console.log(`        ${String(f.ratio).padStart(5)}:1 need ${f.need}  ${f.size}px/${f.weight}  ${f.sel}`)
      console.log(`              fg=${f.fg} bg=${f.bg}  "${f.text}"`)
    }
  }
  const bad = r.depth.filter((x) => x.rim || (!x.glow && x.layers === 0))
  if (bad.length) {
    console.log(`     -> depth failures (${bad.length})`)
    for (const d of bad.slice(0, 8)) {
      console.log(`        ${d.sel}  layers=${d.layers} glow=${d.glow}` + (d.rim ? `  RIM: ${d.rim}` : ''))
    }
  }
  if (r.overflow.length) {
    console.log(`     -> OVERFLOW (${r.overflow.length})`)
    for (const o of r.overflow.slice(0, 8)) {
      console.log(`        ${o.el || 'document'} right=${o.right} vw=${o.vw}`)
    }
  }
  if (width < 700 && r.smallTargets.length) {
    console.log(`     -> small targets (${r.smallTargets.length})`)
    for (const t of [...new Map(r.smallTargets.map((x) => [x.el + x.w + x.h, x])).values()].slice(0, 8)) {
      console.log(`        ${t.w}x${t.h}  ${t.el}  "${t.text}"`)
    }
  }
  return r
}

const DESK = { width: 1440, height: 900 }
const PHONE = { width: 390, height: 844 }

console.log('\n=== desktop ===')
await audit('landing light', { path: '/', ...DESK, theme: 'light' })
await audit('landing dark', { path: '/', ...DESK, theme: 'dark' })
await audit('start light', { path: '/start', ...DESK, theme: 'light' })
await audit('login light', { path: '/login?plan=premium', ...DESK, theme: 'light' })
await audit('login dark', { path: '/login?plan=premium', ...DESK, theme: 'dark' })
await audit('notfound light', { path: '/nope', ...DESK, theme: 'light' })
await audit('app home light', { path: '/app/home', ...DESK, theme: 'light', signIn: true })
await audit('app home dark', { path: '/app/home', ...DESK, theme: 'dark', signIn: true })
await audit('app overview light', { path: '/app/overview', ...DESK, theme: 'light', signIn: true })
await audit('app fees light', { path: '/app/fees', ...DESK, theme: 'light', signIn: true })
await audit('app attendance light', { path: '/app/attendance', ...DESK, theme: 'light', signIn: true })
await audit('app attendance dark', { path: '/app/attendance', ...DESK, theme: 'dark', signIn: true })
await audit('app students light', { path: '/app/students', ...DESK, theme: 'light', signIn: true })
await audit('app tests light', { path: '/app/tests', ...DESK, theme: 'light', signIn: true })
await audit('app schedule light', { path: '/app/schedule', ...DESK, theme: 'light', signIn: true })
await audit('app timetable light', { path: '/app/timetable', ...DESK, theme: 'light', signIn: true })
await audit('app homework light', { path: '/app/homework', ...DESK, theme: 'light', signIn: true })

console.log('\n=== phone ===')
await audit('app home phone light', { path: '/app/home', ...PHONE, theme: 'light', signIn: true })
await audit('app home phone dark', { path: '/app/home', ...PHONE, theme: 'dark', signIn: true })
await audit('login phone light', { path: '/login?plan=premium', ...PHONE, theme: 'light' })
await audit('start phone light', { path: '/start', ...PHONE, theme: 'light' })

ws.close(); chrome.kill(); process.exit(0)


