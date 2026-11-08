import gsap from 'gsap'
import { TEAM } from './slides.js'

// Guion del recorrido: en qué segundo del video habla cada quien.
// Se reemplaza por los tiempos reales cuando lleguen los audios del equipo.
const CUES_URL = '/media/demo-cues.json'

const src = (id, pose, talk) => `/avatars/sprites/${id}_${pose}${talk ? '_talk' : ''}.png`

// precarga de todos los cuadros para que no parpadee
for (const p of TEAM) for (const pose of ['stand', 'wave', 'point']) for (const t of [0, 1]) new Image().src = src(p.id, pose, t)

export class Demo {
  constructor(root) {
    this.root = root
    this.q = (s) => root.querySelector(s)
    this.lap = this.q('#dm-laptop')
    this.full = this.q('#dm-full')
    this.still = this.q('.dm-still')
    this.video = this.q('#dm-video')
    this.intro = this.q('#dm-intro')
    this.click = this.q('#dm-click')
    this.cursor = this.q('#dm-cursor')
    this.ripples = root.querySelectorAll('.dm-ripple')
    this.team = [...root.querySelectorAll('.dm-a')]
    this.guide = this.q('#dm-guide')
    this.guideImg = this.q('#dm-guide img')
    this.sub = this.q('.dm-sub')
    this.cues = []
    this.subs = true
    fetch(CUES_URL).then((r) => (r.ok ? r.json() : [])).then((c) => (this.cues = c)).catch(() => {})
    addEventListener('keydown', (e) => { if (e.key === 's' || e.key === 'S') { this.subs = !this.subs; this.sub.classList.toggle('off', !this.subs) } })
    this.video.addEventListener('timeupdate', () => this.onTime())
    this.raf = this.raf.bind(this)
  }

  // ---------- audio: el nivel de la voz mueve la boca ----------
  audioInit() {
    if (this.ctx) return
    try {
      this.ctx = new AudioContext()
      this.an = this.ctx.createAnalyser(); this.an.fftSize = 512
      this.buf = new Uint8Array(this.an.fftSize)
      for (const m of [this.intro, this.video]) this.ctx.createMediaElementSource(m).connect(this.an)
      this.an.connect(this.ctx.destination)
    } catch { this.ctx = null }
  }
  level() {
    if (!this.an) return 0
    this.an.getByteTimeDomainData(this.buf)
    let s = 0
    for (const v of this.buf) s += ((v - 128) / 128) ** 2
    return Math.sqrt(s / this.buf.length)
  }

  setPose(img, id, pose, talk) { const u = src(id, pose, talk); if (img._u !== u) { img.src = u; img._u = u } }

  raf(now) {
    if (!this.running) return
    const lv = this.level()
    // sin audio (video de prueba) la boca se mueve sola mientras haya diálogo
    const talk = lv > 0.02 || (this.fakeTalk && Math.sin(now / 70) > 0)
    if (this.phase === 'intro') {
      for (const [i, a] of this.team.entries()) {
        const id = a.dataset.id
        const waving = Math.floor(now / 380 + i) % 2 === 0
        this.setPose(a.querySelector('img'), id, waving ? 'wave' : 'stand', id === this.speaker && talk)
      }
    } else if (this.phase === 'video' && this.cur) {
      this.setPose(this.guideImg, this.cur.who, this.cur.pose || 'stand', talk && !!this.cur.text)
    }
    requestAnimationFrame(this.raf)
  }

  // ---------- estados ----------
  enter() {
    this.reset()
    gsap.fromTo(this.lap, { y: 160, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: .2 })
  }

  reset() {
    this.running = false
    this.tl?.kill()
    for (const m of [this.intro, this.video]) { m.pause(); m.currentTime = 0 }
    gsap.set(this.lap, { x: 0, y: 0, scale: 1, opacity: 1, transformOrigin: '0 0' })
    gsap.set(this.full, { opacity: 0, visibility: 'hidden' })
    gsap.set(this.video, { opacity: 0 })
    gsap.set(this.still, { opacity: 1 })
    gsap.set([this.cursor, ...this.ripples], { opacity: 0 })
    gsap.set(this.cursor, { left: 1760, top: 1000, scale: 1 })
    gsap.set(this.team, { opacity: 0, y: 200 })
    gsap.set(this.guide, { opacity: 0, x: 0 })
    gsap.set(['.dm-title', '.dm-kick'].map((s) => this.q(s)), { opacity: 1, x: 0 })
    this.phase = null; this.cur = null; this.fakeTalk = false
  }

  step(n) {
    if (n === 1) this.playIntro()
    if (n === 2) this.playVideo()
  }

  // medida exacta para que la pantalla de la laptop termine ocupando todo el escenario
  zoomTarget() {
    const d = this.lap.querySelector('.display')
    let dx = 0, dy = 0, e = d
    while (e && e !== this.lap) { dx += e.offsetLeft; dy += e.offsetTop; e = e.offsetParent }
    const k = 1920 / d.offsetWidth
    return { x: -this.lap.offsetLeft - k * dx, y: -this.lap.offsetTop - k * dy, scale: k }
  }

  playIntro() {
    this.audioInit(); this.ctx?.resume()
    this.running = true; requestAnimationFrame(this.raf)
    const z = this.zoomTarget()
    const cx = 1310, cy = 470
    const tl = (this.tl = gsap.timeline())
    tl.to(this.cursor, { opacity: 1, duration: .2 })
      .to(this.cursor, { left: cx, top: cy, duration: 1.0, ease: 'power2.inOut' }, '<')
      .add(() => { this.click.currentTime = 0; this.click.play().catch(() => {}) })
      .to(this.cursor, { scale: .8, duration: .07, yoyo: true, repeat: 3 })
      .fromTo(this.ripples[0], { left: cx - 20, top: cy - 20, scale: .3, opacity: 1 }, { scale: 2.6, opacity: 0, duration: .5 }, '<')
      .fromTo(this.ripples[1], { left: cx - 20, top: cy - 20, scale: .3, opacity: 1 }, { scale: 2.6, opacity: 0, duration: .5 }, '<.14')
      .to([this.q('.dm-title'), this.q('.dm-kick')], { opacity: 0, x: -80, duration: .45 }, '<')
      .to(this.cursor, { opacity: 0, duration: .2 }, '<.1')
      .to(this.lap, { ...z, duration: 1.25, ease: 'power3.inOut' }, '<')
      .set(this.full, { visibility: 'visible', opacity: 1 })
      .set(this.lap, { opacity: 0 })
      .add(() => { this.phase = 'intro'; this.speaker = 'angel' })
      .to(this.team, { opacity: 1, y: 0, duration: .7, stagger: .12, ease: 'back.out(1.7)' }, '+=.15')
      .add(() => { this.intro.currentTime = 0; this.intro.play().catch(() => {}) }, '-=.3')
    this.intro.onended = () => { if (this.phase === 'intro') this.playVideo() }
  }

  playVideo() {
    this.tl?.kill()
    this.intro.pause()
    this.audioInit(); this.ctx?.resume()
    if (!this.running) { this.running = true; requestAnimationFrame(this.raf) }
    gsap.set(this.full, { visibility: 'visible', opacity: 1 }); gsap.set(this.lap, { opacity: 0 })
    const tl = (this.tl = gsap.timeline())
    tl.to(this.team, { opacity: 0, y: 220, duration: .5, stagger: .06, ease: 'power2.in' })
      .add(() => { this.phase = 'video'; this.video.currentTime = 0; this.video.play().catch(() => {}) })
      .to(this.video, { opacity: 1, duration: .5 }, '<')
      .to(this.still, { opacity: 0, duration: .5 }, '<.3')
  }

  onTime() {
    if (this.phase !== 'video') return
    const t = this.video.currentTime
    let c = null
    for (const x of this.cues) if (x.t <= t) c = x
    if (c === this.cur) return
    const prevWho = this.cur?.who
    this.cur = c
    this.fakeTalk = !!c?.text && !c?.audio
    if (!c || c.hide) { gsap.to(this.guide, { opacity: 0, x: 60, duration: .35 }); return }
    this.sub.querySelector('b').textContent = TEAM.find((p) => p.id === c.who)?.name ?? ''
    this.sub.querySelector('span').textContent = c.text || ''
    this.sub.style.display = c.text ? '' : 'none'
    if (prevWho !== c.who) gsap.fromTo(this.guide, { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: .5, ease: 'back.out(1.5)' })
    else gsap.to(this.guide, { opacity: 1, x: 0, duration: .3 })
  }
}
