import * as THREE from 'three'

// Personajes en pixel 3D: modelo de vóxeles que se renderiza en vivo a baja
// resolución, con contorno y escalado sin suavizado. Brazos y cabeza son piezas
// aparte para poder animarlos (saludo, señalar, hablar, respirar).
// Ejes: x ancho (izq -> der), y alto, z profundidad (+z mira a la cámara).

export const PEOPLE = {
  angel: {
    name: 'Angel Sanabria', skin: '#d6a07f', skinShade: '#c08a69', hair: '#1d1817', brow: '#1d1817',
    eye: '#2a1d16', beard: '#4b3c35', hairStyle: 'mediumSwept', beardStyle: 'full', glasses: false, build: 'wide', mouth: '#a5604f',
  },
  derek: {
    name: 'Derek Coronado', skin: '#e2ab88', skinShade: '#cd9572', hair: '#241812', brow: '#21160f',
    eye: '#2a1d16', beard: null, hairStyle: 'mulletBack', beardStyle: null, glasses: false, build: 'wide', mouth: '#b56a58', thickBrow: true, smile: true,
  },
  saul: {
    name: 'Saúl Castillo', skin: '#edc3aa', skinShade: '#d8ab92', hair: '#2a1b15', brow: '#2a1b15',
    eye: '#3a2618', beard: '#4a362c', hairStyle: 'curlyShort', beardStyle: 'goateeSides', glasses: false, build: 'slim', mouth: '#b56a58',
  },
  vernel: {
    name: 'Vernel Hernández', skin: '#d2a184', skinShade: '#bb8a6c', hair: '#141214', brow: '#141214',
    eye: '#1d1410', beard: null, hairStyle: 'curtain', beardStyle: null, glasses: '#5d5f6b', build: 'normal', mouth: '#a85e50',
  },
  samuel: {
    name: 'Samuel Robledo', skin: '#ebb99e', skinShade: '#d6a185', hair: '#6b4a32', brow: '#5a3c28',
    eye: '#4f6f86', beard: null, hairStyle: 'swept', beardStyle: null, glasses: false, build: 'slim', mouth: '#b9705d',
  },
};

const SUIT = '#1b1d22', SUIT_SH = '#121317', SUIT_HI = '#262931', SHIRT = '#f2f4f5', TIE = '#22407e', TIE_SH = '#182f60', SHOE = '#0c0c0e', PANTS = '#1b1d22';

function voxels(p) {
  const vox = new Map();
  let part = 'body';
  const key = (x, y, z, pt = part) => `${pt.startsWith('mouth') ? pt : 'm'}|${x},${y},${z}`;
  const put = (x, y, z, c) => {
    if (!part.startsWith('mouth')) { vox.delete(`mouthC|${x},${y},${z}`); vox.delete(`mouthO|${x},${y},${z}`); }
    vox.set(key(x, y, z), [x, y, z, c, part]);
  };
  const del = (x, y, z) => vox.delete(key(x, y, z));
  const fill = (x0, x1, y0, y1, z0, z1, c) => { for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) put(x, y, z, c); };
  const W = p.build === 'wide' ? 1 : 0;

  // ---- piernas y zapatos ----
  fill(-3, -1, 0, 1, -1, 2, SHOE); fill(1, 3, 0, 1, -1, 2, SHOE);
  fill(-3, -1, 2, 8, -1, 1, PANTS); fill(1, 3, 2, 8, -1, 1, PANTS);
  fill(0, 0, 6, 8, -1, 1, PANTS);
  // ---- torso: saco cerrado; camisa y corbata solo en la abertura en V ----
  fill(-4 - W, 4 + W, 9, 17, -2, 2, SUIT);
  fill(-4 - W, 4 + W, 9, 9, -2, 2, SUIT_SH);
  for (let y = 13; y <= 17; y++) {
    const h = Math.floor((y - 13) / 2);           // ancho de la V
    fill(-h - 1, h + 1, y, y, 2, 2, SHIRT);       // camisa
    put(0, y, 2, y === 17 ? TIE_SH : TIE);        // corbata, por dentro del saco
    put(-h - 2, y, 3, SUIT_HI); put(h + 2, y, 3, SUIT_HI); // solapas encima
  }
  put(0, 12, 3, SUIT_HI); put(0, 10, 3, SUIT_HI); // botones del saco cerrado
  fill(-3 - W, -2 - W, 14, 14, 3, 3, SUIT_HI);    // bolsillo
  // ---- brazos (cuelgan; se rotan desde el hombro al animar) ----
  part = 'armL'; fill(-6 - W, -5 - W, 9, 17, -1, 1, SUIT); fill(-6 - W, -5 - W, 9, 9, -1, 1, SHIRT); fill(-6 - W, -5 - W, 7, 8, -1, 1, p.skin);
  part = 'armR'; fill(5 + W, 6 + W, 9, 17, -1, 1, SUIT); fill(5 + W, 6 + W, 9, 9, -1, 1, SHIRT); fill(5 + W, 6 + W, 7, 8, -1, 1, p.skin);
  part = 'body';
  // ---- cuello ----
  fill(-1, 1, 18, 18, -1, 1, p.skinShade); put(-1, 18, 2, SHIRT); put(1, 18, 2, SHIRT); put(0, 18, 2, TIE_SH);
  // ---- cabeza ----
  part = 'head';
  const HX0 = -5, HX1 = 5, HY0 = 19, HY1 = 29, HZ0 = -4, HZ1 = 5;
  fill(HX0, HX1, HY0, HY1, HZ0, HZ1, p.skin);
  for (const x of [HX0, HX1]) for (const z of [HZ0, HZ1]) { del(x, HY0, z); del(x, HY1, z); }
  fill(HX0 - 1, HX0 - 1, 23, 25, 0, 1, p.skinShade); fill(HX1 + 1, HX1 + 1, 23, 25, 0, 1, p.skinShade);
  const F = HZ1;
  for (const ex of [-3, 2]) { fill(ex, ex + 1, 23, 24, F, F, p.eye); put(ex + (ex < 0 ? 1 : 0), 24, F, '#ffffff'); }
  if (p.thickBrow) { fill(-4, -1, 26, 26, F, F, p.brow); fill(1, 4, 26, 26, F, F, p.brow); }
  else { fill(-4, -2, 26, 26, F, F, p.brow); fill(2, 4, 26, 26, F, F, p.brow); }
  put(0, 22, F + 1, p.skinShade); put(0, 23, F + 1, p.skinShade);
  // sonrisa con labios cerrados (sin dientes), igual para todos
  part = 'mouthO'; fill(-1, 1, 19, 20, F, F, '#4a1f1a'); put(-2, 20, F, p.mouth); put(2, 20, F, p.mouth); fill(-1, 1, 21, 21, F, F, p.mouth);
  part = 'mouthC'; fill(-1, 1, 20, 20, F, F, p.mouth); put(-2, 21, F, p.mouth); put(2, 21, F, p.mouth);
  part = 'head';
  put(-4, 21, F, p.skinShade); put(4, 21, F, p.skinShade);

  // ---- barba (una sola capa, sin volumen, para que no se vea tupida) ----
  const B = p.beard;
  if (p.beardStyle === 'full') {
    // barba corta: mentón, mandíbula y bigote, sin cubrir las mejillas
    for (let x = HX0; x <= HX1; x++) { put(x, 19, F, B); if (Math.abs(x) >= 3) put(x, 20, F, B); if (Math.abs(x) >= 5) put(x, 21, F, B); }
    fill(-2, 2, 21, 21, F, F, B);
    for (let z = 2; z <= F; z++) { fill(HX0, HX0, 19, 22, z, z, B); fill(HX1, HX1, 19, 22, z, z, B); }
  }
  if (p.beardStyle === 'goateeSides') {
    // bigote, perilla y barba solo por los lados (no se le llena la mejilla)
    fill(-2, 2, 21, 21, F, F, B);                 // bigote
    fill(-1, 1, 19, 19, F, F, B); put(0, 18, F - 1, B); // perilla
    for (let z = 1; z <= F; z++) { fill(HX0, HX0, 19, 23, z, z, B); fill(HX1, HX1, 19, 23, z, z, B); }
    put(HX0 + 1, 19, F, B); put(HX1 - 1, 19, F, B); // línea de la mandíbula
  }

  // ---- cabello ----
  const H = p.hair;
  const cap = (yFrom, extraTop) => {
    fill(HX0 - 1, HX1 + 1, HY1, HY1 + extraTop, HZ0 - 1, HZ1, H);
    fill(HX0 - 1, HX1 + 1, yFrom, HY1, HZ0 - 1, HZ0 - 1, H);
    for (let z = HZ0 - 1; z <= 1; z++) { fill(HX0 - 1, HX0 - 1, yFrom + 2, HY1, z, z, H); fill(HX1 + 1, HX1 + 1, yFrom + 2, HY1, z, z, H); }
  };
  if (p.hairStyle === 'mediumSwept') {
    // Angel: medio largo, barrido hacia un lado, cubre las orejas
    cap(21, 1);
    fill(HX0, HX1, 28, 28, F, F + 1, H);
    fill(-5, 0, 27, 27, F + 1, F + 1, H); fill(-5, -3, 26, 26, F + 1, F + 1, H); // mechón barrido
    put(4, 27, F + 1, H); put(5, 27, F + 1, H);
    for (let z = 0; z <= F; z++) { fill(HX0 - 1, HX0 - 1, 23, 28, z, z, H); fill(HX1 + 1, HX1 + 1, 23, 28, z, z, H); }
    for (const x of [-3, 0, 3]) put(x, HY1 + 2, 1, H);
  }
  if (p.hairStyle === 'longWavy') {
    // Derek: largo y ondulado, hasta el cuello, con volumen
    cap(18, 2);
    fill(HX0, HX1, 28, 28, F, F + 1, H); fill(-5, 1, 27, 27, F + 1, F + 1, H); put(-5, 26, F + 1, H);
    for (let z = HZ0 - 1; z <= F; z++) { fill(HX0 - 2, HX0 - 1, 19, 28, z, z, H); fill(HX1 + 1, HX1 + 2, 19, 28, z, z, H); }
    for (let z = HZ0 - 1; z <= 2; z++) { put(HX0 - 3, 20, z, H); put(HX1 + 3, 20, z, H); put(HX0 - 3, 23, z, H); put(HX1 + 3, 23, z, H); } // ondas
    fill(HX0 - 1, HX1 + 1, 17, 20, HZ0 - 2, HZ0 - 1, H);
    for (const [x, z] of [[-4, 3], [-1, 4], [2, 3], [5, 2], [-3, -1], [1, -2], [4, -1]]) put(x, HY1 + 3, z, H);
  }
  if (p.hairStyle === 'mulletBack') {
    // Derek: librito peinado hacia atrás, lados más cortos y mullet largo atrás
    fill(HX0 - 1, HX1 + 1, HY1, HY1 + 2, HZ0 - 1, HZ1, H);               // volumen arriba
    fill(HX0, HX1, HY1, HY1 + 1, F + 1, F + 1, H); del(0, HY1, F + 1);
    fill(HX0, HX1, HY1 + 3, HY1 + 3, -2, 2, H);
    fill(HX0, HX1, 28, 28, F, F + 1, H); del(0, 28, F + 1); put(0, 29, F + 1, H); // raya al medio
    fill(-5, -2, 27, 27, F + 1, F + 1, H); fill(2, 5, 27, 27, F + 1, F + 1, H);    // librito hacia atrás
    put(-5, 26, F + 1, H); put(5, 26, F + 1, H);
    for (let z = HZ0 - 1; z <= 3; z++) { fill(HX0 - 1, HX0 - 1, 26, 29, z, z, H); fill(HX1 + 1, HX1 + 1, 26, 29, z, z, H); } // lados cortos sobre la oreja
    for (let z = HZ0 - 1; z <= -1; z++) { fill(HX0 - 1, HX0 - 1, 20, 25, z, z, H); fill(HX1 + 1, HX1 + 1, 20, 25, z, z, H); } // detrás de la oreja
    fill(HX0 - 1, HX1 + 1, 19, HY1, HZ0 - 1, HZ0 - 1, H);                  // nuca
    fill(HX0, HX1, 15, 19, HZ0 - 2, HZ0 - 1, H);                            // mullet
    for (const s of [-1, 1]) { fill(s * 6, s * 6, 16, 21, -5, -3, H); put(s * 7, 17, -4, H); }
    for (const [x, z] of [[-4, 3], [-1, 3], [2, 3], [4, 2], [-3, -1], [1, -2], [4, -2]]) put(x, HY1 + 3, z, H);
  }
  if (p.hairStyle === 'curlyShort') {
    cap(22, 2);
    for (const [x, z] of [[-5, 2], [-3, 3], [-1, 2], [1, 3], [3, 2], [5, 3], [-4, -2], [0, -3], [4, -1], [-2, 0], [2, 0]]) put(x, HY1 + 3, z, H);
    fill(HX0, HX1, 28, 28, F, F + 1, H);
    for (const x of [-4, -1, 2, 4]) put(x, 27, F + 1, H);
    fill(HX0 - 1, HX0 - 1, 23, 27, 2, F, H); fill(HX1 + 1, HX1 + 1, 23, 27, 2, F, H);
  }
  if (p.hairStyle === 'curtain') {
    // Vernel: corte "de librito": raya al medio y dos cortinas que caen a los lados de la frente
    cap(21, 1);
    fill(HX0, HX1, 28, 28, F, F + 1, H);
    del(0, 28, F + 1); del(0, 28, F); del(-1, 28, F + 1); del(1, 28, F + 1); put(0, 29, F + 1, '#2b2622'); // raya al medio marcada
    fill(-5, -2, 27, 27, F + 1, F + 1, H); fill(2, 5, 27, 27, F + 1, F + 1, H);
    fill(-5, -3, 26, 26, F + 1, F + 1, H); fill(3, 5, 26, 26, F + 1, F + 1, H);
    put(-5, 25, F + 1, H); put(5, 25, F + 1, H); put(-4, 26, F + 2, H); put(4, 26, F + 2, H);
    for (let z = 0; z <= F; z++) { fill(HX0 - 1, HX0 - 1, 21, 28, z, z, H); fill(HX1 + 1, HX1 + 1, 21, 28, z, z, H); }
    for (let z = -3; z <= 2; z++) { put(HX0 - 2, 22, z, H); put(HX1 + 2, 22, z, H); } // ondas sobre las orejas
    for (const [x, z] of [[-4, 3], [-2, 4], [2, 4], [4, 3], [-3, 0], [3, 0], [-1, -2], [2, -2], [-5, -1], [5, -1]]) put(x, HY1 + 2, z, H);
  }
  if (p.hairStyle === 'swept') {
    cap(22, 1);
    fill(HX0, HX1, 28, 28, F, F + 1, H); fill(-5, 1, 27, 27, F + 1, F + 1, H); put(-5, 26, F + 1, H);
    fill(HX0 - 1, HX1 + 1, HY1 + 2, HY1 + 2, 0, F, H);
    fill(HX0 - 1, HX0 - 1, 24, 27, 2, F, H); fill(HX1 + 1, HX1 + 1, 24, 27, 2, F, H);
  }

  // ---- lentes (armazón delgado y translúcido) ----
  if (p.glasses) {
    // armazón grande: cada lente ocupa casi media cara
    const G = p.glasses;
    for (const [a, b] of [[-5, -1], [1, 5]]) {
      fill(a, b, 25, 25, F + 1, F + 1, G); fill(a, b, 21, 21, F + 1, F + 1, G);
      fill(a, a, 21, 25, F + 1, F + 1, G); fill(b, b, 21, 25, F + 1, F + 1, G);
    }
    put(0, 24, F + 1, G);
    fill(HX0 - 1, HX0 - 1, 24, 24, 1, F + 1, G); fill(HX1 + 1, HX1 + 1, 24, 24, 1, F + 1, G);
  }

  return { vox, W }
}

const PIVOT = { armL: (W) => [-5.5 - W, 17.5, 0], armR: (W) => [5.5 + W, 17.5, 0], head: () => [0, 18.5, 0], mouthO: () => [0, 18.5, 0], mouthC: () => [0, 18.5, 0], body: () => [0, 0, 0] }
const geo = new THREE.BoxGeometry(1, 1, 1)
const mats = {}
const mat = (c) => (mats[c] ??= new THREE.MeshLambertMaterial({ color: c }))

export function buildPerson(p) {
  const { vox, W } = voxels(p)
  const groups = {}
  const byPart = {}
  for (const [x, y, z, c, pt] of vox.values()) ((byPart[pt] ??= {})[c] ??= []).push([x, y, z])
  const root = new THREE.Group()
  for (const pt of ['body', 'armL', 'armR', 'head', 'mouthO', 'mouthC']) {
    const g = new THREE.Group(); const [px, py, pz] = PIVOT[pt](W); g.position.set(px, py, pz)
    for (const [c, list] of Object.entries(byPart[pt] || {})) {
      const m = new THREE.InstancedMesh(geo, mat(c), list.length); const o = new THREE.Object3D()
      list.forEach(([x, y, z], i) => { o.position.set(x - px, y - py, z - pz); o.updateMatrix(); m.setMatrixAt(i, o.matrix) })
      g.add(m)
    }
    groups[pt] = g
  }
  // la boca va dentro de la cabeza para moverse con ella
  groups.head.add(groups.mouthO, groups.mouthC); groups.mouthO.position.set(0, 0, 0); groups.mouthC.position.set(0, 0, 0)
  root.add(groups.body, groups.armL, groups.armR, groups.head)
  return { root, ...groups }
}

// ------------------------------------------------------------------
// Render compartido: un solo WebGL pequeño para todos los personajes.
// ------------------------------------------------------------------
const RW = 104, RH = 112
let R = null
function shared() {
  if (R) return R
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, preserveDrawingBuffer: true })
  renderer.setSize(RW, RH, false); renderer.setPixelRatio(1); renderer.outputColorSpace = THREE.SRGBColorSpace
  const scene = new THREE.Scene()
  scene.add(new THREE.AmbientLight(0xffffff, 1.55))
  const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(-5, 9, 10); scene.add(key)
  const s = 18.5
  const cam = new THREE.OrthographicCamera(-s * RW / RH, s * RW / RH, s, -s, 0.1, 200)
  cam.position.set(0, 15.5, 60); cam.lookAt(0, 15.5, 0)
  const low = document.createElement('canvas'); low.width = RW; low.height = RH
  R = { renderer, scene, cam, low, lx: low.getContext('2d', { willReadFrequently: true }) }
  return R
}

const lerp = (a, b, k) => a + (b - a) * k

export class Avatar {
  // canvas visible; se dibuja a 4 px por pixel del modelo
  constructor(canvas, person, px = 4) {
    this.canvas = canvas; canvas.width = RW * px; canvas.height = RH * px
    this.ctx = canvas.getContext('2d'); this.ctx.imageSmoothingEnabled = false
    this.m = buildPerson(person)
    this.pose = 'idle'; this.talk = 0; this.phase = Math.random() * 10
    this.cur = { aL: 0, aR: 0, hy: 0 }
  }
  draw(t) {
    const { renderer, scene, cam, low, lx } = shared()
    const m = this.m, T = t + this.phase
    // objetivo de cada pose
    let aL = Math.sin(T * 1.3) * 0.04, aR = -Math.sin(T * 1.3) * 0.04
    if (this.pose === 'wave') aR = 2.75 + Math.sin(T * 7) * 0.32          // brazo arriba, de lado a lado
    if (this.pose === 'point') aL = -1.5 + Math.sin(T * 2) * 0.03          // señala hacia la izquierda
    const k = 0.18
    this.cur.aL = lerp(this.cur.aL, aL, k); this.cur.aR = lerp(this.cur.aR, aR, k)
    m.armL.rotation.z = this.cur.aL; m.armR.rotation.z = this.cur.aR
    m.head.rotation.y = Math.sin(T * 0.8) * 0.1
    m.head.rotation.z = this.pose === 'wave' ? Math.sin(T * 3.5) * 0.05 : Math.sin(T * 0.6) * 0.02
    m.root.position.y = Math.abs(Math.sin(T * 1.6)) * 0.35
    const open = this.talk > 0.5
    m.mouthO.visible = open; m.mouthC.visible = !open
    scene.add(m.root); renderer.render(scene, cam); scene.remove(m.root)
    // contorno de 1 px y escalado nítido
    lx.clearRect(0, 0, RW, RH); lx.drawImage(renderer.domElement, 0, 0)
    const img = lx.getImageData(0, 0, RW, RH), d = img.data, out = new Uint8ClampedArray(d)
    const A = (x, y) => (x < 0 || y < 0 || x >= RW || y >= RH) ? 0 : d[(y * RW + x) * 4 + 3]
    for (let y = 0; y < RH; y++) for (let x = 0; x < RW; x++) {
      const i = (y * RW + x) * 4
      if (d[i + 3] === 0 && (A(x - 1, y) || A(x + 1, y) || A(x, y - 1) || A(x, y + 1))) { out[i] = 12; out[i + 1] = 14; out[i + 2] = 16; out[i + 3] = 255 }
    }
    lx.putImageData(new ImageData(out, RW, RH), 0, 0)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(low, 0, 0, this.canvas.width, this.canvas.height)
  }
}

// bucle único para todos los personajes visibles
const live = new Set()
export function track(a) { live.add(a); return () => live.delete(a) }
function loop(now) {
  const t = now / 1000
  for (const a of live) if (a.canvas.isConnected && a.canvas.closest('.slide')?.classList.contains('on') !== false) a.draw(t)
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)
