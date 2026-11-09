import * as L from 'lucide-static'

// ícono de lucide por nombre en kebab-case ("message-circle" -> MessageCircle)
export const ic = (name, size = 36, sw = 2) => {
  const key = name.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('')
  const svg = L[key] || L.Circle
  return svg.replace(/width="24"/, `width="${size}"`).replace(/height="24"/, `height="${size}"`).replace(/stroke-width="2"/, `stroke-width="${sw}"`)
}

const browser = (src, url, cls = '') =>
  `<div class="browser ${cls}"><div class="bar"><i></i><i></i><i></i><span>${url}</span></div><div class="shot"><img src="${src}" alt="" /></div></div>`

export const TEAM = [
  { id: 'angel', name: 'Angel Sanabria', short: 'Angel' },
  { id: 'derek', name: 'Derek Coronado', short: 'Derek' },
  { id: 'saul', name: 'Saúl Castillo', short: 'Saúl' },
  { id: 'vernel', name: 'Vernel Hernández', short: 'Vernel' },
  { id: 'samuel', name: 'Samuel Robledo', short: 'Samuel' },
]

export const SLIDES = []
const S = (o) => SLIDES.push(o)
const head = (kick, title, extra = '') => `<div class="kick">${kick}</div><h2 class="title ${extra}">${title}</h2>`

// =========================================================== ACTO I · EL PROBLEMA (Saúl)
S({
  id: 'portada', act: 'Inicio', who: 'Saúl', t: 15, cls: 'dark cover',
  notes: 'Buenas noches. Somos el Grupo 6 y les presentamos UVGenius.',
  html: `<div class="glow"></div>
  <img class="cv-logo" src="/img/logo-claro.png" alt="UVG" />
  <div class="cv-meta">Ingeniería de Software 2 · Sección 30 · Grupo 6</div>
  <div class="cv-center">
    <div class="brand"><img src="/img/logo.png" alt="" /><span>UVGenius</span></div>
    <h1 class="display">Conecta oportunidades,<br /><em>mide tu impacto real.</em></h1>
  </div>
  <div class="cv-names">Angel Sanabria · Derek Coronado · Saúl Castillo · Vernel Hernández · Samuel Robledo</div>`,
})

S({
  id: 'historia', act: 'El problema', who: 'Saúl', t: 25, cls: 'story',
  notes: 'Piensen en un estudiante de la UVG que necesita completar sus horas beca este semestre. Sabe que hay proyectos, pero no sabe dónde están. Le pregunta a un amigo, revisa el correo, entra a tres grupos de WhatsApp… y cuando por fin encuentra uno, ya se llenó.',
  html: `<div class="story-wrap">
    <div class="st-line" data-step="1">Un estudiante necesita <b>horas beca</b> este semestre.</div>
    <div class="st-line" data-step="2">Sabe que hay proyectos. <b>No sabe dónde.</b></div>
    <div class="st-line big" data-step="3">Cuando por fin encuentra uno, <em>ya se llenó.</em></div>
  </div>`,
})

const chans = [['message-circle', 'Boca en boca'], ['mail', 'Correos'], ['file-spreadsheet', 'Formularios'], ['users', 'Grupos de WhatsApp']]
S({
  id: 'canales', act: 'El problema', who: 'Saúl', t: 25,
  notes: 'Hoy la información de los proyectos vive en cuatro lugares que no se hablan entre sí. Si no estás en el grupo correcto, no te enteras.',
  html: `${head('El problema', 'Hoy un proyecto se encuentra <em>de boca en boca.</em>')}
  <div class="chans">${chans.map(([a, b], i) => `<div class="chip-card" data-step="${i + 1}"><div class="ib">${ic(a, 44)}</div><span>${b}</span></div>`).join('')}</div>
  <p class="foot" data-step="5">Cuatro lugares que <b>no se hablan entre sí.</b></p>`,
})

const cons = [['user-x', 'Cupos que no se llenan'], ['clock-alert', 'Horas sin evidencia'], ['eye-off', 'Avance invisible']]
S({
  id: 'sintomas', act: 'El problema', who: 'Saúl', t: 25,
  notes: 'Y eso tiene tres síntomas: cupos que no se llenan porque nadie se entera, horas que se acreditan sin evidencia y un avance que la autoridad solo ve cuando el proyecto ya terminó. [Relevo a Angel]',
  html: `${head('Tres síntomas', 'El costo de no tener <em>un solo lugar.</em>')}
  <div class="sym">${cons.map(([a, b], i) => `<div class="sym-c" data-step="${i + 1}"><div class="n">0${i + 1}</div><div class="ib">${ic(a, 40)}</div><div class="t">${b}</div></div>`).join('')}</div>`,
})

// =========================================================== ACTO II · LA SOLUCIÓN (Angel)
S({
  id: 'revelacion', act: 'La solución', who: 'Angel', t: 15, cls: 'dark reveal',
  notes: 'Por eso creamos UVGenius: todos los proyectos de la UVG en un solo lugar.',
  html: `<div class="glow"></div><div class="rv">
    <div class="brand xl"><img src="/img/logo.png" alt="" /><span>UVGenius</span></div>
    <p class="rv-sub" data-step="1">Todos los proyectos de la UVG, <em>en un solo lugar.</em></p></div>`,
})

const aud = [
  ['graduation-cap', 'Estudiantes', 'Encuentran proyectos y completan sus horas beca y de extensión.', '/shots/e_explorar.jpg'],
  ['crown', 'Líderes de asociación', 'Publican proyectos, arman su equipo y validan horas.', '/shots/e_kanban.jpg'],
  ['book-open-check', 'Coordinadores académicos', 'Dan seguimiento a las horas de su carrera con reportes.', '/shots/a_horas.jpg'],
]
S({
  id: 'para-quien', act: 'La solución', who: 'Angel', t: 35,
  notes: 'En esta primera etapa, UVGenius es para tres públicos: los estudiantes que buscan proyectos y horas, los líderes de asociación que publican proyectos y arman su equipo, y los coordinadores académicos que dan seguimiento a las horas de su carrera.',
  html: `${head('Público objetivo · primera etapa', 'Pensado para <em>tres públicos.</em>')}
  <div class="aud">${aud.map(([a, b, c, img], i) => `<div class="aud-c" data-step="${i + 1}"><div class="aud-img"><img src="${img}" alt="" /></div><div class="aud-b"><div class="ib">${ic(a, 34)}</div><div class="t">${b}</div><div class="d">${c}</div></div></div>`).join('')}</div>`,
})

const flow = [['megaphone', 'Publicar'], ['send', 'Postularse'], ['kanban', 'Trabajar por sprints'], ['timer', 'Registrar horas'], ['badge-check', 'Validar']]
S({
  id: 'recorrido', act: 'La solución', who: 'Angel', t: 35,
  notes: 'Todo pasa en un solo flujo de cinco pasos: el líder publica, el estudiante se postula, el equipo trabaja por sprints, cada hora queda ligada a una tarea y al final la autoridad valida con evidencia. [Relevo a Derek]',
  html: `${head('Cómo funciona', 'Un solo flujo, <em>de la convocatoria a la validación.</em>')}
  <div class="flow"><div class="flow-track"><i></i></div>${flow.map(([a, b], i) => `<div class="fs" data-step="${i + 1}"><div class="fi">${ic(a, 50)}</div><div class="fn">0${i + 1}</div><div class="t">${b}</div></div>`).join('')}</div>`,
})

// =========================================================== ACTO III · EL MERCADO (Derek)
const cols = ['Jira', 'Notion', 'Forms + WhatsApp', 'UVGenius']
const comp = [
  ['Publicar convocatorias para toda la UVG', ['no', 'mid', 'mid', 'si']],
  ['Postulación con estado y respuesta', ['no', 'mid', 'no', 'si']],
  ['Tablero y sprints del equipo', ['si', 'si', 'no', 'si']],
  ['Horas beca y de extensión validadas', ['mid', 'no', 'no', 'si']],
  ['Vista para asociación y coordinación', ['no', 'no', 'no', 'si']],
]
const mark = { si: ic('check', 32, 3), no: ic('x', 28, 2.5), mid: ic('minus', 28, 3) }
S({
  id: 'herramientas', act: 'Competencia', who: 'Derek', t: 45,
  notes: '¿Por qué no usar lo que ya existe? Jira organiza muy bien el trabajo y registra tiempo, pero no publica convocatorias ni valida horas para la universidad. Notion se puede armar a mano, pero cada asociación tendría que construirlo y mantenerlo. Y Forms con WhatsApp es lo que se usa hoy. UVGenius une las tres partes: convocatoria, trabajo en equipo y validación de horas.',
  html: `${head('Competencia', 'Otras herramientas resuelven <em>una parte.</em>')}
  <div class="cmp">
    <div class="cmp-r cmp-h"><div></div>${cols.map((c, j) => `<div class="${j === 3 ? 'us' : ''}">${c}</div>`).join('')}</div>
    ${comp.map(([k, v], i) => `<div class="cmp-r" data-step="${i + 1}"><div class="k">${k}</div>${v.map((x, j) => `<div class="m ${x}${j === 3 ? ' us' : ''}">${mark[x]}</div>`).join('')}</div>`).join('')}
    <div class="cmp-leg">${mark.mid} se puede, pero hay que armarlo o hacerlo a mano</div>
  </div>`,
})

const rows = [['Encontrar un proyecto', 'Preguntar en grupos', 'Explorar con filtros'], ['Postularse', 'Mensaje informal', 'Postulación con estado'], ['Ver el avance', 'Al final', 'Sprint por sprint'], ['Validar horas', 'Reporte manual', 'Horas por tarea']]
S({
  id: 'antes-despues', act: 'Valor', who: 'Derek', t: 30,
  notes: 'Lo que cambia en el día a día: encontrar un proyecto deja de depender de grupos; la postulación tiene un estado; el avance se ve sprint por sprint y las horas quedan ligadas a tareas reales.',
  html: `${head('Antes y después', 'Lo que cambia <em>en el día a día.</em>')}
  <div class="ba"><div class="ba-h"><div></div><div>Antes</div><div>Con UVGenius</div></div>
  ${rows.map(([a, b, c], i) => `<div class="ba-r" data-step="${i + 1}"><div class="k">${a}</div><div class="b">${b}</div><div class="a">${ic('arrow-right', 26, 2.5)}${c}</div></div>`).join('')}</div>`,
})

S({
  id: 'impacto', act: 'Valor', who: 'Derek', t: 30,
  notes: 'En el laboratorio, encontrar un proyecto y postularse tomó 37 segundos en promedio, y los cinco participantes lo lograron sin ayuda. Y si la autoridad revisa 20 proyectos por semestre, pasar de una hora a 15 minutos por proyecto son unas 15 horas menos de revisión; esos supuestos los confirmaremos con el cliente. [Relevo a Samuel]',
  html: `${head('Impacto', 'Lo medimos <em>y lo estimamos.</em>')}
  <div class="kpis">
    <div class="kpi" data-step="1"><div class="v"><span data-count="37">0</span><small>s</small></div><div class="l">para encontrar un proyecto y postularse</div><div class="s">Medido en el NeuroLab · 5 de 5 sin ayuda</div></div>
    <div class="kpi" data-step="2"><div class="v"><span data-count="15">0</span><small>h</small></div><div class="l">menos de revisión por semestre</div><div class="s">Estimado: 20 proyectos × 45 min ahorrados</div></div>
  </div>`,
})

// =========================================================== ACTO IV · LOS USUARIOS (Samuel)
const times = [['Crear cuenta', 73, 7.0], ['Sesión y perfil', 105, 7.0], ['Buscar y postularse', 37, 6.8], ['Tablero y horas', 60, 5.4], ['Chat y avisos', 45, 5.4]]
S({
  id: 'neurolab', act: 'Usuarios', who: 'Samuel', t: 35,
  notes: 'Lo llevamos al NeuroLab de la UVG con cinco estudiantes, eye tracking y un sensor de estrés. Los cinco terminaron todo sin ayuda y el SUS fue de 85.5, arriba del 68 de referencia. Pero el tablero con las horas y el chat fueron lo peor calificado.',
  html: `${head('Pruebas con usuarios · NeuroLab UVG', 'Lo probamos con <em>eye tracking.</em>')}
  <div class="lab">
    <div class="lab-k" data-step="1"><div class="v"><span data-count="85.5" data-dec="1">0</span></div><div class="l">puntaje SUS</div><div class="sus"><b></b><i></i><span>68 · promedio</span></div>
      <div class="v sm">5/5</div><div class="l">terminaron sin ayuda</div></div>
    <div class="lab-c" data-step="2"><div class="chh"><span>Facilidad por tarea</span><span>1 a 7</span></div>
      ${times.map(([l, v, s]) => `<div class="br${s < 6 ? ' lo' : ''}"><div class="bk">${l}</div><div class="bt"><i style="--w:${(s / 7) * 100}%"></i></div><div class="bs">${s.toFixed(1)}</div></div>`).join('')}</div>
  </div>`,
})

const ch = [['message-circle', 'Tardaron 39 s en encontrar el chat', 'Chat en la barra superior, con contador'], ['list-checks', '4 de 5 no llegaban a su tarea', 'El aviso lleva directo a «Ver mi tarea»'], ['triangle-alert', 'Errores que no decían qué corregir', 'Cada campo marca su error']]
S({
  id: 'mejoras', act: 'Usuarios', who: 'Samuel', t: 35,
  notes: 'El eye tracker mostró lo que la encuesta no: tardaron 39 segundos en encontrar el chat, cuatro de cinco no llegaban a su tarea y los errores no decían qué corregir. Cada hallazgo se volvió un cambio. [Relevo a Vernel]',
  html: `${head('Del hallazgo a la mejora', 'Lo que vio el eye tracker <em>se volvió un cambio.</em>')}
  <div class="eye-img" data-step="1"><img src="/img/lab_p02.jpg" alt="" /></div>
  <div class="hms">${ch.map(([a, b, c], i) => `<div class="hm" data-step="${i + 2}"><div class="h1">${b}</div><div class="h2"><span class="ib">${ic(a, 26)}</span>${c}</div></div>`).join('')}</div>`,
})

// =========================================================== ACTO V · LA TÉCNICA (Vernel)
const nodes = [
  ['Navegador', 'monitor-smartphone', 150, 470], ['Nginx', 'shield-check', 560, 470],
  ['Next.js', 'layout-dashboard', 970, 340], ['NestJS', 'server', 970, 600],
  ['PostgreSQL', 'database', 1400, 280], ['Redis', 'zap', 1400, 480], ['Cloudinary', 'cloud', 1400, 680],
]
S({
  id: 'arquitectura', act: 'Tecnología', who: 'Vernel', t: 35,
  notes: 'La arquitectura es simple: el navegador entra por Nginx con HTTPS; la interfaz es Next.js y la API NestJS. Los datos viven en PostgreSQL, el chat y los avisos en tiempo real usan Redis con Socket.io y los archivos van a Cloudinary. Todo corre en Docker; ahora les cuento en qué máquina.',
  html: `${head('Arquitectura', 'Simple de operar, <em>lista para crecer.</em>')}
  <svg class="wires" viewBox="0 0 1920 1080" data-step="2">
    <path d="M440 520 H560" /><path d="M850 500 C910 500 910 390 970 390" /><path d="M850 540 C910 540 910 650 970 650" />
    <path d="M1260 630 C1330 630 1330 330 1400 330" /><path d="M1260 650 C1330 650 1330 530 1400 530" /><path d="M1260 670 C1330 670 1330 730 1400 730" />
  </svg>
  ${nodes.map(([t, i, x, y], k) => `<div class="node" data-step="1" style="left:${x}px;top:${y}px;--d:${k * 0.07}s"><span class="ib">${ic(i, 30)}</span>${t}</div>`).join('')}
  <div class="arch-foot" data-step="3"><span>${ic('container', 26)} Docker</span><span>${ic('cloud-cog', 26)} VM de Azure</span><span>${ic('git-branch', 26)} GitHub Actions</span></div>`,
})

const pipe = [
  ['git-pull-request', 'Pull request', 'Con ticket de Jira'],
  ['shield-check', 'CI', 'Lint, tipos, unitarias, integración, secretos y OWASP'],
  ['users', 'Revisión', 'Otro integrante aprueba'],
  ['git-merge', 'Merge a main', 'CI corre otra vez'],
  ['package', 'Imagen Docker', 'Tag inmutable por commit'],
  ['heart-pulse', 'Deploy y salud', 'La API debe responder'],
  ['rocket', 'Producción', 'Estado del sistema en vivo'],
]
S({
  id: 'ci', act: 'Calidad', who: 'Vernel', t: 35,
  notes: 'Así validamos cada cambio antes de que llegue a producción. Todo empieza con un pull request ligado a un ticket de Jira. CI corre lint, tipos, pruebas unitarias y de integración, y revisa secretos y OWASP; luego otro integrante lo revisa. Al hacer merge a main, CI corre otra vez, se construye una imagen de Docker con un tag que no se puede sobrescribir y se despliega. El deploy solo termina si la API responde; si no, se detiene y deja los logs. En total son 9,832 pruebas, y la revisión externa no encontró defectos críticos.',
  html: `${head('Calidad · de un cambio a producción', 'Cada cambio pasa <em>siete filtros.</em>')}
  <div class="pipe2">
    <svg class="pipe-line" viewBox="0 0 1664 20" preserveAspectRatio="none"><line x1="20" y1="10" x2="1644" y2="10" /></svg>
    <i class="pipe-dot"></i>
    ${pipe.map(([a, b, c], i) => `<div class="pn${i === pipe.length - 1 ? ' last' : ''}" data-step="${i < 3 ? 1 : i < 5 ? 2 : 3}" style="--d:${(i % 3) * 0.12}s"><div class="pi">${ic(a, 38)}</div><div class="pt">${b}</div><div class="pd">${c}</div></div>`).join('')}
  </div>
  <div class="pipe-fail" data-step="3">${ic('octagon-x', 26)} <span>Si cualquier filtro falla, el cambio <b>no llega a producción.</b></span></div>
  <div class="ci-foot" data-step="4"><span><b>9,832</b>pruebas automatizadas</span><span><b>9 / 381</b>rutas públicas</span><span><b>0</b>defectos críticos en la revisión externa</span><span><b>k6</b>carga cada semana</span></div>`,
})

S({
  id: 'carga', act: 'Infraestructura', who: 'Vernel', t: 45,
  notes: 'Todo corre en una sola máquina virtual de Azure en la región de México: una instancia pequeña de un núcleo y un giga de RAM, de unos 8 dólares al mes, con cuatro contenedores. Con k6 medimos que la API responde en unos 200 milisegundos en el percentil 95, sin un solo error de servidor. Lo primero que se satura es el limitador de peticiones por IP, que es una protección, no el hardware. Y optimizando las cinco secciones más lentas bajamos su tiempo entre 59 y 76 %. [Relevo a Angel]',
  html: `${head('Infraestructura y carga · k6', 'Una máquina pequeña <em>que aguanta.</em>')}
  <div class="infra" data-step="1"><div class="when">Producción hoy</div><div class="t">VM de Azure</div>
    <div class="spec"><div>Instancia<b>B1s</b></div><div>Región<b>México</b></div><div>Recursos<b>1 vCPU · 1 GB</b></div><div>Costo<b>≈ US$8 / mes</b></div></div>
    <div class="stack">Docker Compose con 4 contenedores: Next.js, NestJS, PostgreSQL y Redis, detrás de Nginx con HTTPS.</div></div>
  <div class="load">
    <div class="ld" data-step="2"><div class="v">~200<small>ms</small></div><div class="l">p95 de la API en producción</div><div class="s">k6 con rampa de 1 a 20 usuarios</div></div>
    <div class="ld" data-step="2"><div class="v">0</div><div class="l">errores de servidor</div><div class="s">ni caídas ni timeouts durante la prueba</div></div>
    <div class="ld" data-step="3"><div class="v">−59<small>a</small>−76<small>%</small></div><div class="l">tiempo de las 5 secciones más lentas</div><div class="s">tablero, sprint, proyecto, admin y sesión: ninguna pasa de 75 ms</div></div>
    <div class="ld" data-step="3"><div class="v">5<small>req/s</small></div><div class="l">límite por IP</div><div class="s">lo primero que se satura es la protección, no el hardware</div></div>
  </div>`,
})

const proc = [['10', 'sprints'], ['9', 'meses'], ['5', 'integrantes']]
S({
  id: 'proceso', act: 'Proceso', who: 'Vernel', t: 25,
  notes: 'Trabajamos con Scrum durante diez sprints, de marzo a noviembre, con Jira para el backlog y cada cambio pasando por revisión de código y por CI antes de llegar a producción. [Relevo a Angel]',
  html: `${head('Cómo trabajamos', 'Scrum, Jira <em>y revisión en cada cambio.</em>')}
  <div class="proc">${proc.map(([a, b], i) => `<div class="proc-c" data-step="1" style="--d:${i * 0.1}s"><div class="v">${a}</div><div class="l">${b}</div></div>`).join('')}</div>
  <div class="pipe" data-step="2">${['Historia en Jira', 'Rama y PR', 'Revisión', 'CI: pruebas', 'Producción'].map((s, i) => `<div class="pp"><span>${i + 1}</span>${s}</div>`).join(`<div class="pa">${ic('chevron-right', 28)}</div>`)}</div>`,
})

// =========================================================== ACTO VI · CIERRE (Angel)
S({
  id: 'siguiente', act: 'Lo que sigue', who: 'Angel', t: 20,
  notes: 'Lo que sigue: un piloto con una asociación real, mover la plataforma a un servidor de la UVG —como todo está en Docker se mueve sin cambiar código— y crecer sumando servidores cuando haya más usuarios. Y ahora, mejor véanlo funcionando.',
  html: `${head('Lo que sigue', 'Listo para un <em>piloto real.</em>')}
  <div class="next">${[['rocket', 'Piloto con una asociación'], ['server-cog', 'Servidor propio de la UVG'], ['trending-up', 'Crecer sin rehacerlo']].map(([a, b], i) => `<div class="nx" data-step="${i + 1}"><div class="ib">${ic(a, 40)}</div><div class="t">${b}</div></div>`).join('')}</div>`,
})

S({
  id: 'demo', act: 'Demo', who: 'Todos', t: 300, cls: 'demo-slide', steps: 2,
  notes: 'Paso 1: aparece la laptop con la landing. Paso 2 (→): doble clic, entra a pantalla completa, el equipo saluda abajo a la derecha y arranca el recorrido. No toquen nada hasta que termine; al final, → pasa al cierre.',
  html: `<div class="kick dm-kick">Demo</div>
  <h2 class="title dm-title">Ahora, <em>véanlo funcionando.</em></h2>
  <div id="dm-laptop"><div class="screen"><div class="bezel"><div class="cam"></div><div class="display"><img src="/media/landing.png" alt="" /></div></div></div><div class="base"><div class="notch"></div></div></div>
  <div id="dm-full"><img class="dm-still" src="/media/landing.png" alt="" />
    <video id="dm-video" playsinline preload="auto"><source src="/media/demo.mp4" type="video/mp4" /></video></div>
  <div id="dm-team">${TEAM.map((p) => `<figure class="dm-a" data-id="${p.id}"><canvas></canvas><figcaption>${p.short}</figcaption></figure>`).join('')}</div>
  <div id="dm-guide"><canvas></canvas><div class="dm-sub"><b></b><span></span></div></div>
  <div id="dm-cursor">${ic('mouse-pointer-2', 52, 1.6)}</div><div class="dm-ripple"></div><div class="dm-ripple"></div>
  <audio id="dm-intro" src="/audio/intro.mp3" preload="auto"></audio><audio id="dm-outro" src="/audio/outro.mp3" preload="auto"></audio><audio id="dm-click" src="/audio/dblclick.wav" preload="auto"></audio>`,
})

S({
  id: 'cierre', act: 'Cierre', who: 'Angel', t: 20, cls: 'dark cover',
  notes: 'Antes, te enterabas de un proyecto solo si estabas en el grupo correcto. Ahora cualquier estudiante lo encuentra, y su trabajo cuenta. Muchas gracias, ¿tienen preguntas?',
  html: `<div class="glow"></div>
  <div class="cl">
    <div class="bef" data-step="1">Antes: te enterabas <s>si estabas en el grupo correcto.</s></div>
    <h1 class="display sm" data-step="1">Ahora: cualquier estudiante lo encuentra, <em>y su trabajo cuenta.</em></h1>
    <div class="thx" data-step="2">Gracias · <em>¿Preguntas?</em></div>
  </div>
  <div class="qr" data-step="2"><img src="/img/qr.png" alt="" /><div>Pruébalo<br /><b>158.23.57.118.nip.io</b></div></div>
  <div class="cl-team" data-step="2">${TEAM.map((p) => `<figure data-id="${p.id}"><canvas></canvas><figcaption>${p.short}</figcaption></figure>`).join('')}</div>`,
})
