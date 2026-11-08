import '@fontsource/rubik/800.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/700.css'
import './presenter.css'
import { SLIDES } from './slides.js'

const chan = new BroadcastChannel('uvgenius-deck')
const $ = (id) => document.getElementById(id)
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
const cum = SLIDES.map((_, i) => SLIDES.slice(0, i).reduce((a, s) => a + s.t, 0))
let st = { index: 0, step: 0, steps: 0, start: null }, slideAt = Date.now()

$('list').innerHTML = SLIDES.map((s, i) => `<li data-i="${i}"><b>${String(i + 1).padStart(2, '0')}</b> ${s.id} <span>${s.who} · ${mmss(s.t)} · inicia ${mmss(cum[i])}</span></li>`).join('')
$('list').onclick = (e) => { const li = e.target.closest('li'); if (li) chan.postMessage({ type: 'goto', index: +li.dataset.i }) }
$('b-next').onclick = () => chan.postMessage({ type: 'cmd', cmd: 'next' })
$('b-prev').onclick = () => chan.postMessage({ type: 'cmd', cmd: 'prev' })
$('rst').onclick = () => chan.postMessage({ type: 'reset-timer' })
addEventListener('keydown', (e) => {
  if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) chan.postMessage({ type: 'cmd', cmd: 'next' })
  if (['ArrowLeft', 'PageUp'].includes(e.key)) chan.postMessage({ type: 'cmd', cmd: 'prev' })
})

chan.onmessage = ({ data }) => {
  if (data.type !== 'state') return
  if (data.index !== st.index) slideAt = Date.now()
  st = data
  const s = SLIDES[st.index], n = SLIDES[st.index + 1]
  $('title').textContent = `${String(st.index + 1).padStart(2, '0')} · ${s.sec} · ${s.id}`
  $('who').textContent = `Habla: ${s.who}`
  $('steps').textContent = s.steps ? `Paso ${st.step} de ${s.steps}` : ''
  $('notes').textContent = s.notes
  $('nxt').textContent = n ? `${n.sec} · ${n.id}` : 'Fin'
  $('nxtwho').textContent = n ? `Habla: ${n.who}` : ''
  $('target').textContent = `Meta: ${mmss(s.t)} · debería empezar en ${mmss(cum[st.index])}`
  for (const li of document.querySelectorAll('#list li')) li.classList.toggle('on', +li.dataset.i === st.index)
}
chan.postMessage({ type: 'hello' })

setInterval(() => {
  const el = st.start ? (Date.now() - st.start) / 1000 : 0
  $('clock').textContent = mmss(el)
  const drift = el - cum[st.index]
  $('plan').textContent = st.start ? (drift > 15 ? `${mmss(drift)} atrasados` : drift < -15 ? `${mmss(-drift)} adelantados` : 'a tiempo') : 'el reloj arranca con el primer →'
  $('plan').className = drift > 15 ? 'late' : drift < -15 ? 'early' : ''
  const ss = (Date.now() - slideAt) / 1000
  $('slideclock').textContent = mmss(ss)
  $('slideclock').classList.toggle('late', ss > SLIDES[st.index].t + 5)
  $('pos').textContent = `Demo en ${mmss(Math.max(0, cum[SLIDES.findIndex((s) => s.id === 'demo')] - el))}`
}, 250)
