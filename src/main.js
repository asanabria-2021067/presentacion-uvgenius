import gsap from 'gsap'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/manrope/800.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/rubik/600.css'
import '@fontsource/rubik/700.css'
import '@fontsource/rubik/800.css'
import './styles.css'
import './slides.css'
import { SLIDES } from './slides.js'
import { Demo } from './demo.js'
import { Avatar, track, PEOPLE } from './avatar3d.js'
import { sfx, toggleMute } from './sfx.js'

gsap.ticker.lagSmoothing(0)
const stage = document.getElementById('stage')
const slidesEl = document.getElementById('slides')
const bar = document.querySelector('#progress i')
const secname = document.getElementById('secname')
const blackout = document.getElementById('blackout')
const chan = new BroadcastChannel('uvgenius-deck')

// ---------- montaje ----------
for (const s of SLIDES) {
  const el = document.createElement('section')
  el.className = `slide ${s.cls || ''}`.trim()
  el.dataset.id = s.id
  el.innerHTML = `<div class="inner">${s.html}</div>`
  slidesEl.appendChild(el)
  s.el = el
  if (!s.manual) s.steps = 0 // todo corre solo al entrar; la flecha pasa a la siguiente
}
const demo = new Demo(SLIDES.find((s) => s.id === 'demo').el)
for (const f of document.querySelectorAll('.cl-team figure')) { const a = new Avatar(f.querySelector('canvas'), PEOPLE[f.dataset.id]); a.pose = 'wave'; track(a) }

// El escenario ocupa TODA la ventana: el contenido vive en un lienzo de 1920×1080 centrado.
function fit() {
  const k = Math.min(innerWidth / 1920, innerHeight / 1080)
  const sw = innerWidth / k, sh = innerHeight / k
  stage.style.width = `${sw}px`; stage.style.height = `${sh}px`
  stage.style.setProperty('--sw', `${sw}px`); stage.style.setProperty('--sh', `${sh}px`)
  stage.style.setProperty('--ox', `${(sw - 1920) / 2}px`); stage.style.setProperty('--oy', `${(sh - 1080) / 2}px`)
  stage.style.transform = `translate(-50%, -50%) scale(${k})`
}
addEventListener('resize', fit)
fit()

// ---------- animaciones ----------
function countUp(root, tl, at, quiet) {
  for (const n of root.querySelectorAll('[data-count]')) {
    const to = +n.dataset.count, dec = +(n.dataset.dec || 0), pre = n.dataset.prefix || '', suf = n.dataset.suffix || ''
    const fmt = (v) => pre + v.toFixed(dec) + suf
    if (!tl) { n.textContent = fmt(to); continue }
    const o = { v: 0 }; let last = -1
    n.textContent = fmt(0)
    tl.to(o, { v: to, duration: to > 0 ? 1.3 : 0.01, ease: 'power2.out', onUpdate: () => {
      n.textContent = fmt(o.v)
      const q = Math.floor(o.v / Math.max(1, to / 14))
      if (!quiet && q !== last) { last = q; sfx('tick', 0.8, 0.9 + 0.5 * (o.v / Math.max(1, to))) }
    } }, at)
  }
}
const Q = (el, s) => [...el.querySelectorAll(s)]
let TL = null

function revealAll(s) {
  for (const e of Q(s.el, '[data-step], .kick, .title')) gsap.set(e, { opacity: 1, y: 0, x: 0, scale: 1, filter: 'none' })
  countUp(s.el, null)
  for (const b of Q(s.el, '.sus b, .bt i')) gsap.set(b, { clearProps: 'width' })
  const tr = s.el.querySelector('.flow-track i'); if (tr) tr.style.width = '100%'
}

function enter(s, instant) {
  TL?.kill(); TL = null
  const el = s.el
  const steps = Q(el, '[data-step]')
  gsap.killTweensOf(Q(el, '*'))
  if (s.aud !== undefined) return enterAud(s, instant)
  if (s.ci) return enterCI(s, instant)
  if (s.id === 'demo') return
  if (instant) return revealAll(s)
  const base = Q(el, '.kick, .title, .cv-logo, .cv-meta, .cv-names')
  for (const e of steps) gsap.set(e, { opacity: 0 })
  const tl = (TL = gsap.timeline())
  tl.fromTo(base, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, 0)
  const gap = s.gap ?? 0.7
  const t0 = base.length ? 0.55 : 0.25
  const tr = el.querySelector('.flow-track i'); if (tr) tr.style.width = '0%'
  const maxStep = Math.max(0, ...steps.map((e) => +e.dataset.step))
  for (const e of steps) {
    const k = +e.dataset.step, d = parseFloat(getComputedStyle(e).getPropertyValue('--d')) || 0
    const at = t0 + (k - 1) * gap + d
    const big = e.matches('.wordmark')
    tl.fromTo(e, big ? { opacity: 0, scale: 0.86, filter: 'blur(10px)' } : { opacity: 0, y: 40, filter: 'blur(6px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: big ? 1.1 : 0.7, ease: big ? 'expo.out' : 'power3.out' }, at)
    const snd = e.dataset.sfx ?? 'pop'
    if (snd !== 'none') tl.call(() => sfx(snd), null, at)
    if (e.querySelector('[data-count]')) countUp(e, tl, at + 0.1)
    for (const b of Q(e, '.sus b, .bt i')) tl.from(b, { width: 0, duration: 1.2, ease: 'power2.out' }, at + 0.2)
    if (e.matches('.wires')) tl.fromTo(Q(e, 'path'), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.08 }, at)
    if (e.matches('.cl-team')) tl.fromTo(e.children, { y: 160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.6)' }, at)
    if (e.matches('.st-full')) tl.fromTo(e, { scale: 1.6, rotate: -14 }, { scale: 1, rotate: -6, duration: 0.45, ease: 'back.out(2)' }, at)
    if (tr && e.matches('.fs')) tl.call(() => (tr.style.width = `${((k - 1) / (maxStep - 1)) * 100}%`), null, at)
  }
}

// ---------- público objetivo: el cursor abre cada tarjeta ----------
function cardCenter(c) {
  const a = c.parentElement
  return { x: a.offsetLeft + c.offsetLeft + c.offsetWidth / 2, y: a.offsetTop + c.offsetTop + c.offsetHeight / 2 }
}
function enterAud(s, instant) {
  const el = s.el, cards = Q(el, '.aud-c'), cur = el.querySelector('.aud-cursor')
  s._clicked = false
  gsap.set(cur, { x: 1560, y: 980, opacity: 0, scale: 1 })
  gsap.set(cards, { opacity: 1, y: 0, scale: 1 })
  if (instant || s.aud > 0) {
    gsap.set(Q(el, '.kick, .title'), { opacity: 1, y: 0 })
    if (!instant) { const tl = (TL = gsap.timeline()); tl.to(cur, { opacity: 1, duration: 0.3 }, 0.2) }
    return
  }
  const tl = (TL = gsap.timeline())
  tl.fromTo(Q(el, '.kick, .title'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0)
  cards.forEach((c, i) => {
    tl.fromTo(c, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' }, 0.6 + i * 0.35)
    tl.call(() => sfx('pop'), null, 0.6 + i * 0.35)
  })
  tl.to(cur, { opacity: 1, duration: 0.3 }, 1.9)
}
function clickAud(s) {
  s._clicked = true
  const el = s.el, c = Q(el, '.aud-c')[s.aud], cur = el.querySelector('.aud-cursor'), rp = el.querySelector('.aud-ripple')
  const p = cardCenter(c)
  const tl = (TL = gsap.timeline())
  tl.to(cur, { x: p.x, y: p.y + 20, duration: 0.75, ease: 'power2.inOut' })
  tl.to(cur, { scale: 0.85, duration: 0.08 }).call(() => sfx('click')).to(cur, { scale: 1, duration: 0.12 })
  tl.fromTo(rp, { x: p.x - 22, y: p.y - 2, scale: 0.4, opacity: 1 }, { scale: 2.4, opacity: 0, duration: 0.5 }, '<')
  tl.to(c, { scale: 0.96, duration: 0.08 }, '<').to(c, { scale: 1, duration: 0.15 })
  tl.to(Q(el, '.aud-c').filter((x) => x !== c), { opacity: 0.25, duration: 0.3 }, '<')
  tl.to(c, { scale: 1.15, opacity: 0, duration: 0.45, ease: 'power2.in' }, '+=0.1')
  tl.call(() => { sfx('slide'); show(index + 1) })
}

// ---------- CI: siete filtros y luego una falla ----------
function enterCI(s, instant) {
  const el = s.el, nodes = Q(el, '.pn'), dot = el.querySelector('.pipe-dot'), fail = el.querySelector('.pipe-fail'), foot = el.querySelector('.ci-foot')
  const base = Q(el, '.kick, .title')
  gsap.set(nodes, { clearProps: 'all' }); nodes.forEach((n) => n.classList.remove('ok', 'ko', 'off'))
  const cx = (i) => nodes[i].offsetLeft + nodes[i].offsetWidth / 2 - 9
  if (instant) {
    gsap.set([...base, ...nodes, fail, foot], { opacity: 1, y: 0 }); gsap.set(dot, { opacity: 0 })
    nodes.forEach((n) => n.classList.add('ok')); return
  }
  gsap.set([fail, foot], { opacity: 0 }); gsap.set(nodes, { opacity: 0 }); gsap.set(dot, { opacity: 0, x: cx(0), background: 'var(--green)' })
  const tl = (TL = gsap.timeline())
  tl.fromTo(base, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0)
  nodes.forEach((n, i) => { const at = 0.6 + i * 0.32; tl.fromTo(n, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.5)' }, at); tl.call(() => sfx('pop', 0.8, 0.9 + i * 0.05), null, at) })
  // pasada correcta: el punto recorre los siete y cada uno queda en verde
  let t = 0.6 + 7 * 0.32 + 0.3
  tl.set(dot, { opacity: 1, x: cx(0) }, t)
  nodes.forEach((n, i) => { const at = t + i * 0.42; tl.to(dot, { x: cx(i), duration: 0.42, ease: 'none' }, at - 0.42 > t ? at - 0.42 : t); tl.call(() => { n.classList.add('ok'); sfx('tick', 1.2, 1 + i * 0.08) }, null, at) })
  t += 7 * 0.42
  tl.call(() => sfx('bell'), null, t)
  tl.to(dot, { opacity: 0, duration: 0.3 }, t + 0.3)
  // mensaje y luego la falla
  t += 0.9
  tl.fromTo(fail, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, t); tl.call(() => sfx('pop'), null, t)
  t += 1.4
  tl.call(() => nodes.forEach((n) => n.classList.remove('ok')), null, t)
  tl.set(dot, { x: cx(0), opacity: 1, background: 'var(--red)' }, t)
  tl.call(() => nodes[0].classList.add('ok'), null, t + 0.1)
  tl.to(dot, { x: cx(1), duration: 0.5, ease: 'none' }, t + 0.1)
  tl.call(() => { nodes[1].classList.add('ko'); sfx('error') }, null, t + 0.6)
  tl.fromTo(nodes[1], { x: -8 }, { x: 8, duration: 0.06, repeat: 5, yoyo: true, clearProps: 'x' }, t + 0.6)
  tl.call(() => sfx('boom'), null, t + 1.0)
  nodes.slice(2).forEach((n, k) => tl.to(n, { y: 560 + k * 20, rotate: (k % 2 ? 1 : -1) * (10 + k * 4), opacity: 0, duration: 0.9, ease: 'power2.in', onStart: () => n.classList.add('off') }, t + 1.0 + k * 0.08))
  tl.to(dot, { opacity: 0, duration: 0.3 }, t + 1.0)
  tl.fromTo(foot, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, t + 2.4); tl.call(() => sfx('pop'), null, t + 2.4)
}

// ---------- navegación ----------
let index = -1, step = 0
const T0 = { start: null }

function render() {
  const s = SLIDES[index]
  if (s.id === 'demo') demo.step(step)
  document.body.classList.toggle('dark-bg', s.el.classList.contains('dark'))
  stage.classList.toggle('on-dark', s.el.classList.contains('dark'))
  bar.style.width = `${((index + 1) / SLIDES.length) * 100}%`
  secname.textContent = s.act
  stage.classList.toggle('hide-chrome', s.id === 'demo' && step > 0)
  chan.postMessage({ type: 'state', index, step, steps: s.steps, start: T0.start })
  const h = `#${index + 1}`
  if (location.hash !== h) history.replaceState(null, '', h)
}

function show(i, instant = false, st = 0) {
  i = Math.max(0, Math.min(SLIDES.length - 1, i))
  if (index >= 0 && i !== index) {
    const prev = SLIDES[index]
    prev.el.classList.remove('on')
    if (prev.id === 'demo') demo.reset()
  }
  index = i; step = st
  const s = SLIDES[index]
  s.el.classList.add('on')
  enter(s, instant)
  if (s.id === 'demo') demo.enter()
  render()
}

function next() {
  if (T0.start === null) T0.start = Date.now()
  const s = SLIDES[index]
  if (s.aud !== undefined && !s._clicked) return clickAud(s)
  if (s.manual && step < s.steps) { step++; render(); return }
  if (index < SLIDES.length - 1) show(index + 1)
}
function prev() { if (index > 0) show(index - 1, true) }

addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return
  const k = e.key
  if (['ArrowRight', ' ', 'PageDown', 'Enter'].includes(k)) { e.preventDefault(); next() }
  else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev() }
  else if (k === 'p' || k === 'P') window.open('/presenter.html', 'uvg-presenter', 'width=1280,height=800')
  else if (k === 'f' || k === 'F') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  else if (k === 'b' || k === 'B' || k === '.') blackout.classList.toggle('on')
  else if (k === 'm' || k === 'M') toggleMute()
  else if (k === 'r' || k === 'R') show(index)
  else if (k === 'Home') show(0)
  else if (k === 'End') show(SLIDES.length - 1)
  else if (k === '?' || k === 'h') document.body.classList.toggle('showhelp')
})
stage.addEventListener('click', (e) => { if (e.clientX > innerWidth * 0.5) next(); else prev() })

chan.onmessage = ({ data }) => {
  if (data.type === 'cmd') ({ next, prev })[data.cmd]?.()
  if (data.type === 'goto') show(data.index)
  if (data.type === 'hello') render()
  if (data.type === 'reset-timer') { T0.start = null; render() }
}

const start = parseInt(location.hash.slice(1), 10)
show(Number.isFinite(start) ? start - 1 : 0)
window.__deck = { next, prev, show, get state() { return { index, step } } }
