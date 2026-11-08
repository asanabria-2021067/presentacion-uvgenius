import gsap from 'gsap'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/manrope/800.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import './styles.css'
import './slides.css'
import { SLIDES } from './slides.js'
import { Demo } from './demo.js'
import { Avatar, track } from './avatar3d.js'
import { PEOPLE } from './avatar3d.js'

gsap.ticker.lagSmoothing(0)
const stage = document.getElementById('stage')
const slidesEl = document.getElementById('slides')
const bar = document.querySelector('#progress i')
const secname = document.getElementById('secname')
const blackout = document.getElementById('blackout')
const chan = new BroadcastChannel('uvgenius-deck')

// ---------- montaje ----------
for (const [i, s] of SLIDES.entries()) {
  const el = document.createElement('section')
  el.className = `slide ${s.cls || ''}`.trim()
  el.dataset.id = s.id
  el.innerHTML = s.html
  slidesEl.appendChild(el)
  s.el = el
  s.steps ??= Math.max(0, ...[...el.querySelectorAll('[data-step]')].map((e) => +e.dataset.step))
}
const demo = new Demo(SLIDES.find((s) => s.id === 'demo').el)
// equipo saludando en el cierre
for (const f of document.querySelectorAll('.cl-team figure')) { const a = new Avatar(f.querySelector('canvas'), PEOPLE[f.dataset.id]); a.pose = 'wave'; track(a) }

function fit() {
  const k = Math.min(innerWidth / 1920, innerHeight / 1080)
  stage.style.transform = `translate(-50%, -50%) scale(${k})`
}
addEventListener('resize', fit)
fit()

// ---------- animaciones ----------
function countUp(root) {
  for (const n of root.querySelectorAll('[data-count]')) {
    const to = +n.dataset.count, dec = +(n.dataset.dec || 0), o = { v: 0 }
    gsap.to(o, { v: to, duration: 1.4, ease: 'power2.out', onUpdate: () => (n.textContent = o.v.toFixed(dec)) })
  }
}
function reveal(el, instant) {
  if (instant) {
    gsap.set(el, { opacity: 1, y: 0, clearProps: 'filter' })
    for (const n of el.querySelectorAll('[data-count]')) n.textContent = (+n.dataset.count).toFixed(+(n.dataset.dec || 0))
    return
  }
  gsap.fromTo(el, { opacity: 0, y: 40, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .7, ease: 'power3.out', delay: parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0 })
  countUp(el)
  for (const b of el.querySelectorAll('.sus b, .bt i')) gsap.from(b, { width: 0, duration: 1.2, ease: 'power2.out', delay: .2 })
  if (el.matches('.wires')) gsap.fromTo(el.querySelectorAll('path'), { opacity: 0 }, { opacity: 1, duration: .6, stagger: .08 })
  if (el.matches('.cl-team')) gsap.fromTo(el.children, { y: 160, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .1, ease: 'back.out(1.6)' })
}
function hide(el) { gsap.set(el, { opacity: 0, y: 40 }) }

function enter(s, instant) {
  const el = s.el
  // elementos sin data-step: título y demás entran juntos
  const base = [...el.querySelectorAll('.kick, .title, .cv-logo, .cv-meta, .cv-center > *, .cv-names, .rv > .brand')]
  if (!instant) gsap.fromTo(base, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .7, stagger: .08, ease: 'power3.out' })
  if (el.querySelector('.rv') && !instant) gsap.fromTo(el.querySelector('.rv .brand'), { scale: .85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'expo.out' })
}

// ---------- navegación ----------
let index = -1, step = 0
const T0 = { start: null }

function render(instant = false) {
  const s = SLIDES[index]
  for (const el of s.el.querySelectorAll('[data-step]')) (+el.dataset.step <= step ? (el._on ? null : (reveal(el, instant), (el._on = true))) : (hide(el), (el._on = false)))
  if (s.id === 'demo') demo.step(step)
  const track_ = s.el.querySelector('.flow-track i')
  if (track_) track_.style.width = `${Math.max(0, step - 1) / 4 * 100}%`
  document.body.classList.toggle('dark-bg', s.el.classList.contains('dark'))
  stage.classList.toggle('on-dark', s.el.classList.contains('dark'))
  bar.style.width = `${((index + 1) / SLIDES.length) * 100}%`
  secname.textContent = s.act
  stage.classList.toggle('hide-chrome', s.id === 'demo' && step > 0)
  chan.postMessage({ type: 'state', index, step, steps: s.steps, start: T0.start })
  const h = `#${index + 1}`
  if (location.hash !== h) history.replaceState(null, '', h)
}

function show(i, st = 0) {
  i = Math.max(0, Math.min(SLIDES.length - 1, i))
  if (index >= 0 && i !== index) {
    const prev = SLIDES[index]
    prev.el.classList.remove('on')
    if (prev.id === 'demo') demo.reset()
    for (const el of prev.el.querySelectorAll('[data-step]')) el._on = false
  }
  const changed = i !== index
  index = i; step = st
  const s = SLIDES[index]
  s.el.classList.add('on')
  for (const el of s.el.querySelectorAll('[data-step]')) { el._on = false; hide(el) }
  if (changed) enter(s, st > 0)
  if (s.id === 'demo') demo.enter()
  render(st > 0)
}

function next() {
  if (T0.start === null) T0.start = Date.now()
  const s = SLIDES[index]
  if (step < s.steps) { step++; render() } else if (index < SLIDES.length - 1) show(index + 1)
}
function prev() {
  if (step > 0 && SLIDES[index].id !== 'demo') { step--; render(true) } else if (index > 0) show(index - 1, SLIDES[index - 1].steps)
}

addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return
  const k = e.key
  if (['ArrowRight', ' ', 'PageDown', 'Enter'].includes(k)) { e.preventDefault(); next() }
  else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev() }
  else if (k === 'p' || k === 'P') window.open('/presenter.html', 'uvg-presenter', 'width=1280,height=800')
  else if (k === 'f' || k === 'F') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  else if (k === 'b' || k === 'B' || k === '.') blackout.classList.toggle('on')
  else if (k === 'Home') show(0)
  else if (k === 'End') show(SLIDES.length - 1)
  else if (k === '?' || k === 'h') document.body.classList.toggle('showhelp')
})
stage.addEventListener('click', (e) => { if (e.clientX > innerWidth * 0.5) next(); else prev() })

chan.onmessage = ({ data }) => {
  if (data.type === 'cmd') ({ next, prev })[data.cmd]?.()
  if (data.type === 'goto') show(data.index)
  if (data.type === 'hello') render(true)
  if (data.type === 'reset-timer') { T0.start = null; render(true) }
}

const start = parseInt(location.hash.slice(1), 10)
show(Number.isFinite(start) ? start - 1 : 0)
window.__deck = { next, prev, show, get state() { return { index, step } } }
