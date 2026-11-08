import * as L from 'lucide-static'

// ícono de lucide por nombre en kebab-case ("message-circle" -> MessageCircle)
export const ic = (name, size = 36, sw = 2) => {
  const key = name.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('')
  const svg = L[key] || L.Circle
  return svg.replace(/width="24"/, `width="${size}"`).replace(/height="24"/, `height="${size}"`).replace(/stroke-width="2"/, `stroke-width="${sw}"`)
}

const browser = (src, url, style) =>
  `<div class="browser" style="${style}"><div class="bar"><i></i><i></i><i></i><span>${url}</span></div><img src="${src}" alt="" /></div>`

export const TEAM = [
  { id: 'angel', name: 'Angel Sanabria', short: 'Angel' },
  { id: 'derek', name: 'Derek Coronado', short: 'Derek' },
  { id: 'saul', name: 'Saúl Castillo', short: 'Saúl' },
  { id: 'vernel', name: 'Vernel Hernández', short: 'Vernel' },
  { id: 'samuel', name: 'Samuel Robledo', short: 'Samuel' },
]
const sprite = (id, pose = 'stand') => `/avatars/sprites/${id}_${pose}.png`

export const SLIDES = []
const S = (o) => SLIDES.push(o)

// ------------------------------------------------------------------ 1 portada
S({
  id: 'portada', sec: 'Inicio', who: 'Angel', t: 20, cls: 'cover',
  notes: 'Buenas noches. Somos el Grupo 6 y les presentamos UVGenius. Empezamos con una pregunta para Saúl.',
  html: `<div class="grid"></div>
  <img class="cv-logo" src="/img/logo-claro.png" alt="UVG" />
  <div class="cv-tag">Presentación final · Ingeniería de Software · Sección 30 · Grupo 6</div>
  <div class="cv-left">
    <div class="wm"><i></i>UVGenius</div>
    <h1 class="hero">Todos los proyectos de la UVG, <em>en un solo lugar.</em></h1>
    <p class="lead">Publicar, postularse, trabajar en equipo y validar horas, sin depender de estar en el grupo correcto.</p>
  </div>
  <div class="cv-team">${TEAM.map((p, i) => `<figure class="avatar cv-a" style="--i:${i}"><img class="px" src="${sprite(p.id)}" alt="" /><figcaption>${p.short}</figcaption></figure>`).join('')}</div>`,
})

// ------------------------------------------------------------------ 2 gancho
const chans = [
  ['message-circle', 'Boca en boca', 'Te enteras si alguien te cuenta.'],
  ['mail', 'Correo', 'Convocatorias que se pierden en la bandeja.'],
  ['file-spreadsheet', 'Formularios y Drive', 'Cada asociación con su propio formato.'],
  ['users', 'Grupos de WhatsApp', 'Solo llega a quien ya está en el grupo.'],
]
S({
  id: 'gancho', sec: 'Problema', who: 'Saúl', t: 35,
  notes: '¿Cómo se entera hoy un estudiante de la UVG de que existe un proyecto? De boca en boca, por un correo que se pierde, por un formulario o por un grupo de WhatsApp. Si no estás en el grupo correcto, no te enteras.',
  html: `<div class="grid"></div><div class="kick">El problema</div>
  <h2 class="h">¿Cómo te enteras hoy de un proyecto <em>en la UVG?</em></h2>
  <div class="chans">${chans.map(([a, b, c], i) => `<div class="card ch" data-step="${i + 1}"><div class="ib">${ic(a)}</div><div class="ct">${b}</div><div class="cd">${c}</div></div>`).join('')}</div>
  <div class="punch" data-step="5">${ic('split', 40)}<span>La información vive en cuatro lugares <b>que no se hablan entre sí.</b></span></div>`,
})

// ------------------------------------------------------------------ 3 público objetivo
const aud = [
  ['graduation-cap', 'Estudiantes', 'Necesitan horas beca y de extensión, y no saben dónde buscarlas.', 'samuel'],
  ['crown', 'Líderes de proyecto', 'Publican un proyecto y necesitan armar y coordinar un equipo.', 'derek'],
  ['landmark', 'Junta de asociación', 'Impulsa proyectos y rinde cuentas del trabajo de sus miembros.', 'saul'],
  ['book-open-check', 'Coordinación académica', 'Da seguimiento a las horas de los estudiantes de su carrera.', 'vernel'],
  ['shield-check', 'Administración', 'Aprueba cuentas, gestiona roles y cuida la plataforma.', 'angel'],
]
S({
  id: 'publico', sec: 'Problema', who: 'Saúl', t: 45,
  notes: 'Nuestro público objetivo es la comunidad de la UVG que participa en proyectos estudiantiles. El cliente es Norman Aguirre, presidente de una asociación estudiantil. Y los usuarios son cinco: el estudiante que busca horas, el líder que arma su equipo, la junta de la asociación, la coordinación académica de cada carrera y la administración.',
  html: `<div class="grid"></div><div class="kick">Público objetivo</div>
  <h2 class="h">Para la comunidad UVG <em>que mueve proyectos.</em></h2>
  <div class="client card" data-step="1"><div class="clab">Cliente · Product Owner</div><div class="nm">Norman Aguirre</div><div class="rl">Presidente de asociación estudiantil, UVG</div></div>
  <div class="aud">${aud.map(([a, b, c, who], i) => `<div class="card au" data-step="${i + 2}"><div class="ib">${ic(a)}</div><div class="ct">${b}</div><div class="cd">${c}</div></div>`).join('')}</div>`,
})

// ------------------------------------------------------------------ 4 consecuencias
const cons = [
  ['user-x', 'Cupos que no se llenan', 'El proyecto existe, pero los estudiantes no se enteran a tiempo.'],
  ['clock-alert', 'Horas sin evidencia', 'Lo que se acredita depende de un reporte al final.'],
  ['eye-off', 'Avance invisible', 'La autoridad solo ve el resultado cuando ya terminó.'],
]
S({
  id: 'consecuencias', sec: 'Problema', who: 'Saúl', t: 25,
  notes: 'Eso tiene tres consecuencias: cupos que no se llenan, horas que se acreditan sin evidencia y un avance que nadie ve hasta el final. [Relevo a Angel]',
  html: `<div class="grid"></div><div class="kick">Lo que pasa hoy</div>
  <h2 class="h">Tres consecuencias <em>de no tener un solo lugar.</em></h2>
  <div class="cons">${cons.map(([a, b, c], i) => `<div class="card cn" data-step="${i + 1}"><div class="big">${['01', '02', '03'][i]}</div><div class="ib">${ic(a)}</div><div class="ct">${b}</div><div class="cd">${c}</div></div>`).join('')}</div>`,
})

// ------------------------------------------------------------------ 5 solución
const flow = [
  ['megaphone', 'Publicar', 'El líder crea el proyecto y la autoridad lo aprueba.'],
  ['send', 'Postularse', 'El estudiante lo encuentra y envía su postulación.'],
  ['kanban', 'Trabajar por sprints', 'Tablero, tareas, chat y calendario del equipo.'],
  ['timer', 'Registrar horas', 'Cada hora queda ligada a una tarea.'],
  ['badge-check', 'Validar y acreditar', 'La autoridad revisa la evidencia y acredita.'],
]
S({
  id: 'solucion', sec: 'Solución', who: 'Angel', t: 40,
  notes: 'UVGenius junta todo en un solo flujo de cinco pasos: publicar, postularse, trabajar por sprints, registrar horas y validar. Cada paso queda en la plataforma, así que la evidencia se construye sola mientras el equipo trabaja.',
  html: `<div class="grid"></div><div class="kick">La solución</div>
  <h2 class="h">Un solo flujo, <em>de la convocatoria a la acreditación.</em></h2>
  <svg class="flow-line" viewBox="0 0 1680 20" preserveAspectRatio="none"><line x1="0" y1="10" x2="1680" y2="10" /></svg>
  <div class="flow">${flow.map(([a, b, c], i) => `<div class="fs" data-step="${i + 1}"><div class="fn">${i + 1}</div><div class="fi">${ic(a, 46)}</div><div class="ct">${b}</div><div class="cd">${c}</div></div>`).join('')}</div>`,
})

// ------------------------------------------------------------------ 6 competencia
const comp = [
  ['Convocatoria abierta a toda la universidad', ['no', 'no', 'si', 'si']],
  ['Postulación con estado (pendiente, aceptada…)', ['no', 'no', 'si', 'si']],
  ['Trabajo del equipo por sprints y tablero', ['no', 'si', 'no', 'si']],
  ['Horas ligadas a tareas reales', ['no', 'no', 'mid', 'si']],
  ['Validación por junta, coordinación y admin', ['no', 'no', 'mid', 'si']],
  ['Pensado para la UVG y en español', ['mid', 'mid', 'no', 'si']],
]
const mark = { si: ic('check', 30, 3), no: ic('x', 26, 2.5), mid: ic('minus', 26, 3) }
S({
  id: 'competencia', sec: 'Competencia', who: 'Derek', t: 50,
  notes: '¿Por qué no usar algo que ya existe? Hoy se usan Forms con WhatsApp y Excel, que son gratis pero no se conectan. Microsoft Teams con Planner organiza tareas, pero no publica convocatorias ni lleva horas. GivePulse es una plataforma que usan universidades en Estados Unidos para registrar horas de voluntariado, pero no organiza el trabajo del equipo y no está pensada para la UVG. UVGenius es la única que une las tres cosas: convocatoria, trabajo en equipo y validación de horas.',
  html: `<div class="grid"></div><div class="kick">Competencia</div>
  <h2 class="h">Otras herramientas resuelven <em>una parte.</em></h2>
  <div class="cmp">
    <div class="cmp-h"><div></div><div>Forms + WhatsApp + Excel<small>lo que se usa hoy</small></div><div>Teams + Planner<small>Microsoft 365</small></div><div>GivePulse<small>voluntariado universitario</small></div><div class="us">UVGenius</div></div>
    ${comp.map(([k, v], i) => `<div class="cmp-r" data-step="${i + 1}"><div class="k">${k}</div>${v.map((x, j) => `<div class="m ${x}${j === 3 ? ' us' : ''}">${mark[x]}</div>`).join('')}</div>`).join('')}
  </div>
  <div class="cmp-leg" data-step="${comp.length}">${mark.mid} parcial o requiere adaptarlo</div>`,
})

// ------------------------------------------------------------------ 7 antes vs ahora
const rows = [
  ['search', 'Encontrar un proyecto', 'Preguntar en grupos y correos', 'Explorar con filtros por tipo de horas'],
  ['send', 'Postularse', 'Mensaje informal al líder', 'Postulación con estado y respuesta'],
  ['trending-up', 'Ver el avance', 'Al final, con lo que reporta el líder', 'Sprint por sprint, en tiempo real'],
  ['timer', 'Validar horas', 'Reporte manual del líder', 'Horas por tarea, revisadas y aprobadas'],
]
S({
  id: 'valor', sec: 'Valor', who: 'Derek', t: 35,
  notes: 'Lo que cambia en el día a día: encontrar un proyecto deja de depender de grupos y correos, la postulación tiene un estado claro, el avance se ve sprint por sprint y las horas quedan ligadas a tareas reales.',
  html: `<div class="grid"></div><div class="kick">Valor</div>
  <h2 class="h">Lo que cambia <em>en el día a día.</em></h2>
  <div class="vs"><div class="vh"><div></div><div>Hoy</div><div class="g">Con UVGenius</div></div>
  ${rows.map(([a, b, c, d], i) => `<div class="vr" data-step="${i + 1}"><div class="vk">${ic(a, 30)}<span>${b}</span></div><div class="vb">${c}</div><div class="va">${ic('check', 26, 3)}<span>${d}</span></div></div>`).join('')}</div>`,
})

// ------------------------------------------------------------------ 8 impacto
S({
  id: 'impacto', sec: 'Valor', who: 'Derek', t: 40,
  notes: 'Para medir el valor usamos una medida real y una estimación. En el laboratorio, encontrar un proyecto y postularse tomó 37 segundos en promedio y los cinco participantes lo lograron. Y si la autoridad revisa 20 proyectos por semestre, pasar de una hora a 15 minutos por proyecto son unas 15 horas ahorradas cada semestre. Esos supuestos los vamos a confirmar con el cliente. [Relevo a Samuel]',
  html: `<div class="grid"></div><div class="kick">Impacto</div>
  <h2 class="h">¿Cuánto vale? <em>Lo medimos y lo estimamos.</em></h2>
  <div class="imp">
    <div class="card kp" data-step="1"><div class="kl">Medido en laboratorio</div><div class="kv"><span data-count="37">0</span><small>s</small></div><div class="cd">promedio para encontrar un proyecto y postularse, 5 de 5 sin ayuda</div></div>
    <div class="card kp" data-step="2"><div class="kl">Estimado por semestre</div><div class="kv"><span data-count="15">0</span><small>h</small></div><div class="cd">menos de revisión: 20 proyectos × (60 − 15) min por proyecto</div></div>
    <div class="card kp alt" data-step="3"><div class="kl">Supuestos</div><div class="cd">20 proyectos con horas por semestre; hoy una hora para reunir y revisar reportes; con UVGenius unos 15 minutos porque la evidencia ya está junta. <b>Los confirmaremos con el cliente.</b></div></div>
  </div>`,
})

// ------------------------------------------------------------------ 9 NeuroLab
const times = [['T1', 'Crear cuenta', 73.2, 7.0], ['T2', 'Sesión y perfil', 104.9, 7.0], ['T3', 'Buscar y postularse', 37.0, 6.8], ['T4', 'Tablero y horas', 59.5, 5.4], ['T5', 'Chat y aviso', 44.7, 5.4]]
S({
  id: 'neurolab', sec: 'Usuarios', who: 'Samuel', t: 40,
  notes: 'Para saber si de verdad funciona, lo llevamos al NeuroLab de la UVG con cinco estudiantes, eye tracking y un sensor de estrés. Los cinco terminaron todas las tareas sin ayuda y el SUS fue de 85.5, muy arriba del 68 de referencia. Pero el tablero con las horas y el chat fueron las tareas peor calificadas. Ahí nos enfocamos.',
  html: `<div class="grid"></div><div class="kick">Pruebas con usuarios · NeuroLab UVG</div>
  <h2 class="h">Lo probamos con <em>eye tracking y sensores.</em></h2>
  <div class="lab">
    <div class="lab-l">
      <div class="card st" data-step="1"><div class="sv">5/5</div><div class="cd">participantes terminaron las 5 tareas sin ayuda</div></div>
      <div class="card st" data-step="2"><div class="sv"><span data-count="85.5" data-dec="1">0</span></div><div class="cd">puntaje SUS de usabilidad · el promedio es 68</div>
        <div class="sus"><i style="left:68%"></i><b style="--to:85.5%"></b></div></div>
    </div>
    <div class="card lab-r" data-step="3"><div class="chh"><span>Tiempo promedio por tarea</span><span>Facilidad (1 a 7)</span></div>
      ${times.map(([k, l, v, s]) => `<div class="br${s < 6 ? ' lo' : ''}"><div class="bk"><b>${k}</b> ${l}</div><div class="bt"><i style="--w:${(v / 110) * 100}%"></i><span>${Math.round(v)} s</span></div><div class="bs">${s.toFixed(1)}</div></div>`).join('')}
      <div class="cnote">T4 y T5 fueron las más difíciles: ahí estaba lo que había que mejorar.</div></div>
  </div>`,
})

// ------------------------------------------------------------------ 10 eye tracker
const finds = [
  ['message-circle-question', '39 s', 'tardó un participante en encontrar el chat', 'Lo buscó en el menú del proyecto; estaba en un botón flotante.'],
  ['timer', '48.6 s', 'para mirar la zona de horas', '4 de 5 entraron primero al Resumen y no al Tablero.'],
  ['key-round', '4 de 5', 'vieron un error de inicio de sesión', 'El mensaje no decía qué corregir.'],
]
S({
  id: 'eyetracker', sec: 'Usuarios', who: 'Samuel', t: 35,
  notes: 'El eye tracker mostró lo que la encuesta no. Aquí un participante busca el chat en el menú del proyecto y tarda 39 segundos en encontrarlo. La zona de horas tardaron casi 49 segundos en mirarla, y cuatro de cinco vieron un error de inicio de sesión que no les decía qué corregir.',
  html: `<div class="grid"></div><div class="kick">Lo que vio el eye tracker</div>
  <h2 class="h">Lo calificaron fácil, <em>pero su mirada dijo otra cosa.</em></h2>
  <div class="eye"><div class="eye-img" data-step="1"><img src="/img/lab_p02.jpg" alt="" /><div class="tag">${ic('scan-eye', 22)} Tarea 5: busca el chat en el menú del proyecto</div></div>
  <div class="fds">${finds.map(([a, b, c, d], i) => `<div class="card fd" data-step="${i + 2}"><div class="ib">${ic(a, 30)}</div><div><div class="fv">${b}</div><div class="fl">${c}</div><div class="cd">${d}</div></div></div>`).join('')}</div></div>`,
})

// ------------------------------------------------------------------ 11 hallazgo -> mejora
const ch = [
  ['message-circle', 'Chat difícil de encontrar', 'Ícono de chat con contador en la barra superior, junto a la campana.'],
  ['list-checks', 'Llegar a la tarea asignada', 'El aviso trae «Ver mi tarea» y el Resumen muestra mis tareas.'],
  ['triangle-alert', 'Errores que no explican', 'Cada campo marca su error y se puede recuperar la contraseña ahí mismo.'],
]
S({
  id: 'mejoras', sec: 'Usuarios', who: 'Samuel', t: 30,
  notes: 'Cada hallazgo se convirtió en un cambio: el chat ahora está en la barra superior con contador, el aviso de una tarea asignada lleva directo a la tarea y los errores dicen qué campo corregir. [Relevo a Vernel]',
  html: `<div class="grid"></div><div class="kick">Del hallazgo a la mejora</div>
  <h2 class="h">Cada hallazgo se convirtió <em>en un cambio.</em></h2>
  <div class="hms">${ch.map(([a, b, c], i) => `<div class="hm" data-step="${i + 1}"><div class="h1x">${b}</div><div class="arr">${ic('arrow-right', 36, 2.5)}</div><div class="card h2x"><span class="ib">${ic(a, 30)}</span><span>${c}</span></div></div>`).join('')}</div>`,
})

// ------------------------------------------------------------------ 12 calidad
const q = [['9,832', 'pruebas automatizadas', 'unitarias, integración, E2E y carga'], ['9 de 381', 'rutas públicas', 'las demás exigen sesión; verificado en producción'], ['0', 'defectos críticos', 'en la revisión técnica de otro grupo']]
const sec = [['lock-keyhole', 'Una cuenta nueva no entra hasta que la aprueban'], ['shield', 'Cada rol ve solo lo que le corresponde'], ['git-pull-request', 'Cada cambio pasa por revisión y CI antes de producción']]
S({
  id: 'calidad', sec: 'Tecnología', who: 'Vernel', t: 35,
  notes: 'Como UVGenius valida horas que cuentan para una beca, tenía que ser confiable. Tenemos 9,832 pruebas automatizadas, solo 9 de 381 rutas son públicas y la revisión técnica de otro grupo no encontró defectos críticos. Cada rol ve solo lo que le corresponde, y cada cambio pasa por revisión antes de llegar a producción.',
  html: `<div class="grid"></div><div class="kick">Calidad y seguridad</div>
  <h2 class="h">Confiable para <em>validar horas reales.</em></h2>
  <div class="qks">${q.map(([a, b, c], i) => `<div class="card qk" data-step="${i + 1}"><div class="qv">${a}</div><div class="ct">${b}</div><div class="cd">${c}</div></div>`).join('')}</div>
  <div class="sis" data-step="4">${sec.map(([a, b]) => `<div class="si">${ic(a, 28)}<span>${b}</span></div>`).join('')}</div>`,
})

// ------------------------------------------------------------------ 13 arquitectura
const nodes = [
  ['nav', 'Navegador', 'Web y móvil', 'monitor-smartphone', 120, 420],
  ['ngx', 'Nginx', 'HTTPS · un dominio', 'shield-check', 520, 420],
  ['web', 'Next.js', 'Interfaz', 'layout-dashboard', 920, 300],
  ['api', 'NestJS', 'API + Socket.io', 'server', 920, 560],
  ['db', 'PostgreSQL', 'Datos y horas', 'database', 1360, 260],
  ['rd', 'Redis', 'Caché y tiempo real', 'zap', 1360, 470],
  ['cl', 'Cloudinary', 'Archivos', 'cloud', 1360, 680],
]
S({
  id: 'arquitectura', sec: 'Tecnología', who: 'Vernel', t: 40,
  notes: 'La arquitectura es simple: el navegador entra por Nginx con HTTPS; la interfaz es Next.js y la API es NestJS. Los datos están en PostgreSQL, el tiempo real del chat y los avisos va con Redis y Socket.io, y los archivos en Cloudinary. Todo corre en contenedores Docker y cada versión aprobada se prueba y se despliega sola con GitHub Actions.',
  html: `<div class="grid"></div><div class="kick">Arquitectura</div>
  <h2 class="h">Simple de operar, <em>lista para crecer.</em></h2>
  <svg class="arch-svg" viewBox="0 0 1920 1080">
    <g class="wires" data-step="2">
      <path d="M420 500 H520" /><path d="M820 470 C870 470 870 380 920 380" /><path d="M820 530 C870 530 870 640 920 640" />
      <path d="M1220 620 C1290 620 1290 340 1360 340" /><path d="M1220 640 H1360 V550" /><path d="M1220 660 C1290 660 1290 760 1360 760" />
    </g>
  </svg>
  ${nodes.map(([id, t, s, i, x, y], k) => `<div class="card node" data-step="1" style="left:${x}px;top:${y}px;--d:${k * 0.07}s"><div class="ib">${ic(i, 32)}</div><div><div class="nt">${t}</div><div class="cd">${s}</div></div></div>`).join('')}
  <div class="ci" data-step="3" style="top:900px">${ic('container', 28)} Docker en una máquina virtual de Azure · ${ic('git-branch', 28)} GitHub Actions prueba y despliega cada versión</div>`,
})

// ------------------------------------------------------------------ 14 lo que sigue
S({
  id: 'futuro', sec: 'Futuro', who: 'Vernel', t: 30,
  notes: 'Lo que sigue: un piloto con la asociación de nuestro cliente, activar los avisos por correo y mover la plataforma a un servidor de la UVG; como todo corre en Docker, se puede mover sin cambiar el código. Y si crece, el tiempo real con Redis permite agregar más servidores detrás de Nginx. [Relevo a Angel para la demo]',
  html: `<div class="grid"></div><div class="kick">Lo que sigue</div>
  <h2 class="h">Listo para un piloto <em>real.</em></h2>
  <div class="nx-list">
    <div class="card nx" data-step="1"><div class="ib">${ic('rocket', 34)}</div><div><div class="ct">Piloto con la asociación del cliente</div><div class="cd">Un semestre real con proyectos y horas de verdad.</div></div></div>
    <div class="card nx" data-step="2"><div class="ib">${ic('server-cog', 34)}</div><div><div class="ct">Servidor propio de la UVG</div><div class="cd">Todo corre en Docker: se mueve de Azure sin cambiar el código.</div></div></div>
    <div class="card nx" data-step="3"><div class="ib">${ic('trending-up', 34)}</div><div><div class="ct">Crecer sin rehacerlo</div><div class="cd">Redis permite sumar servidores detrás de Nginx cuando haya más usuarios.</div></div></div>
  </div>`,
})

// ------------------------------------------------------------------ 15 demo (escena especial, ver demo.js)
S({
  id: 'demo', sec: 'Demo', who: 'Todos', t: 300, cls: 'demo-slide', steps: 2,
  notes: 'Paso 1: aparece la laptop con la landing. Paso 2 (→): doble clic, entra a pantalla completa, saluda el equipo y arranca el recorrido de 5 minutos. No hay que tocar nada hasta que termine; al terminar, → pasa al cierre.',
  html: `<div class="grid"></div>
  <div class="kick dm-kick">Demo</div>
  <h2 class="h dm-title">Ahora, <em>véanlo funcionando.</em></h2>
  <div id="dm-laptop"><div class="screen"><div class="bezel"><div class="cam"></div><div class="display"><img src="/media/landing.png" alt="" /></div></div></div><div class="base"><div class="notch"></div></div></div>
  <div id="dm-full"><img class="dm-still" src="/media/landing.png" alt="" />
    <video id="dm-video" playsinline preload="auto"><source src="/media/demo.mp4" type="video/mp4" /><source src="/media/demo-proto.webm" type="video/webm" /></video></div>
  <div id="dm-team">${TEAM.map((p, i) => `<figure class="avatar dm-a" data-id="${p.id}" style="--i:${i}"><img class="px" src="${sprite(p.id)}" alt="" /><figcaption>${p.short}</figcaption></figure>`).join('')}</div>
  <div id="dm-guide"><div class="avatar"><img class="px" alt="" /></div><div class="dm-sub"><b></b><span></span></div></div>
  <div id="dm-cursor">${ic('mouse-pointer-2', 52, 1.6)}</div><div class="dm-ripple"></div><div class="dm-ripple r2"></div>
  <audio id="dm-intro" src="/audio/intro.mp3" preload="auto"></audio><audio id="dm-click" src="/audio/dblclick.wav" preload="auto"></audio>`,
})

// ------------------------------------------------------------------ 16 cierre
S({
  id: 'cierre', sec: 'Cierre', who: 'Angel', t: 20, cls: 'cover',
  notes: 'Antes, te enterabas de un proyecto solo si estabas en el grupo correcto. Ahora cualquier estudiante lo encuentra, y su trabajo cuenta. Muchas gracias, ¿tienen preguntas?',
  html: `<div class="grid"></div>
  <div class="cv-left cl">
    <div class="wm"><i></i>UVGenius</div>
    <div class="bef" data-step="1">Antes: te enterabas de un proyecto <s>si estabas en el grupo correcto.</s></div>
    <h1 class="hero sm" data-step="1">Ahora: cualquier estudiante lo encuentra, <em>y su trabajo cuenta.</em></h1>
    <div class="thx" data-step="2">Gracias · <em>¿Preguntas?</em></div>
  </div>
  <div class="qr" data-step="2"><img src="/img/qr.png" alt="" /><div>Pruébalo<br /><b>158.23.57.118.nip.io</b></div></div>
  <div class="cv-team">${TEAM.map((p, i) => `<figure class="avatar cv-a" style="--i:${i}"><img class="px" data-wave src="${sprite(p.id, 'wave')}" alt="" /><figcaption>${p.short}</figcaption></figure>`).join('')}</div>`,
})
