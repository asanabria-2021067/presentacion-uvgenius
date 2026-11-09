// Sonidos cortos (Kenney, CC0) con WebAudio para que suenen sin retraso.
const NAMES = ['click', 'pop', 'slide', 'reveal', 'tick', 'error', 'bell', 'switch', 'boom', 'bong', 'glass']
const VOL = { click: 0.9, pop: 0.55, slide: 0.45, reveal: 0.8, tick: 0.35, error: 0.6, bell: 0.4, switch: 0.4, boom: 0.6, bong: 0.6, glass: 0.45 }
let ctx = null
const buf = {}
export let muted = false
export function toggleMute() { muted = !muted; return muted }

async function load() {
  ctx = new (window.AudioContext || window.webkitAudioContext)()
  await Promise.all(NAMES.map(async (n) => {
    try { const r = await fetch(`/sfx/${n}.mp3`); buf[n] = await ctx.decodeAudioData(await r.arrayBuffer()) } catch {}
  }))
}
const ready = load()
// el navegador pide un gesto del usuario antes de sonar: la primera tecla lo desbloquea
addEventListener('keydown', () => ctx && ctx.state === 'suspended' && ctx.resume(), true)
addEventListener('pointerdown', () => ctx && ctx.state === 'suspended' && ctx.resume(), true)

export function sfx(name, vol = 1, rate = 1) {
  if (muted || !name || name === 'none' || !ctx || !buf[name]) return
  const s = ctx.createBufferSource(), g = ctx.createGain()
  s.buffer = buf[name]; s.playbackRate.value = rate; g.gain.value = (VOL[name] ?? 0.5) * vol
  s.connect(g).connect(ctx.destination); s.start()
}
export { ready }
