import * as L from 'lucide-static'
import { siJira, siNotion, siWhatsapp, siGoogleforms, siNextdotjs, siReact, siTypescript, siNestjs, siPrisma, siPostgresql, siSocketdotio, siRedis, siCloudinary, siDocker, siNginx, siGithubactions } from 'simple-icons'
const SI = { siJira, siNotion, siWhatsapp, siGoogleforms, siNextdotjs, siReact, siTypescript, siNestjs, siPrisma, siPostgresql, siSocketdotio, siRedis, siCloudinary, siDocker, siNginx, siGithubactions }

// ícono de lucide por nombre en kebab-case ("message-circle" -> MessageCircle)
export const ic = (name, size = 36, sw = 2) => {
  const key = name.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('')
  const svg = L[key] || L.Circle
  return svg.replace(/width="24"/, `width="${size}"`).replace(/height="24"/, `height="${size}"`).replace(/stroke-width="2"/, `stroke-width="${sw}"`)
}
// logo de marca (simple-icons, CC0)
const logo = (k, size = 54, color) => {
  const s = SI[k]
  if (!s) return ic('box', size)
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color || '#' + s.hex}" aria-label="${s.title}"><path d="${s.path}"/></svg>`
}

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
// Cada elemento con data-step aparece solo, en orden, al entrar a la diapositiva.
// data-sfx elige su sonido (pop por defecto).

// =========================================================== ACTO I · EL PROBLEMA (Saúl)
S({
  id: 'pitch', act: 'Inicio', who: 'Samuel', t: 25, cls: 'dark cover', gap: 1.8,
  notes: 'PITCH (sin cifras). ¿Cuántos estudiantes de la UVG quieren sumarse a un proyecto… y no saben dónde buscarlo? ¿Y cuántos proyectos arrancan sin la persona que mejor encajaba, solo porque nunca se enteró? Pausa. Eso pasa todos los semestres.',
  html: `<div class="glow"></div>
  <div class="pt">
    <p class="pt-q" data-step="1" data-sfx="none">¿Cuántos estudiantes de la UVG quieren sumarse a un proyecto…</p>
    <p class="pt-q b" data-step="2" data-sfx="reveal">…y no saben <em>dónde buscarlo?</em></p>
    <p class="pt-q s" data-step="3" data-sfx="pop">¿Y cuántos proyectos arrancan sin la persona que mejor encajaba, <em>solo porque nunca se enteró?</em></p>
  </div>`,
})

S({
  id: 'equipo', act: 'Inicio', who: 'Angel', t: 15, cls: 'dark cover', gap: 0.6,
  notes: 'Buenas noches. Somos el Grupo 6 de la sección 30: Angel, Derek, Saúl, Vernel y Samuel. Y hoy les presentamos cómo resolvimos eso.',
  html: `<div class="glow"></div>
  <img class="cv-logo" src="/img/logo-claro.png" alt="UVG" />
  <div class="cv-meta">Ingeniería de Software · Universidad del Valle de Guatemala</div>
  <div class="eq-h"><div class="eq-k" data-step="1" data-sfx="none">Equipo de trabajo</div><h1 class="eq-t" data-step="1" data-sfx="none">Grupo 6 <span>· Sección 30</span></h1></div>
  <div class="cv-team eq" data-step="2" data-sfx="pop">${TEAM.map((p) => `<figure data-id="${p.id}"><canvas></canvas><figcaption>${p.name.replace(' ', '<br />')}</figcaption></figure>`).join('')}</div>`,
})

S({
  id: 'historia', act: 'El problema', who: 'Angel', t: 25, gap: 1.6,
  notes: 'Piensen en un estudiante de la UVG que necesita completar sus horas beca o de extensión este semestre. Sabe que hay proyectos, pero no sabe dónde están. Le pregunta a un amigo, revisa el correo, entra a tres grupos de WhatsApp… y cuando por fin encuentra uno, ya se llenó.',
  html: `<div class="story-wrap">
    <div class="st-line" data-step="1" data-sfx="none">Un estudiante necesita <b>horas beca o de extensión</b> este semestre.</div>
    <div class="st-line" data-step="2" data-sfx="none">Sabe que hay proyectos. <b>No sabe dónde.</b></div>
    <div class="st-line big" data-step="4" data-sfx="none">Cuando por fin encuentra uno, <em>ya se llenó.</em></div>
  </div>
  <div class="st-art">
    <div class="st-card" data-step="1" data-sfx="pop">
      <div class="st-who"><span class="av">CM</span><div><b>Carlos M.</b><small>Ingeniería en Computación</small></div></div>
      <div class="st-row"><span>Horas beca</span><b>0 / 50 h</b></div><div class="st-bar"><i></i></div>
      <div class="st-row"><span>Horas de extensión</span><b>0 / 40 h</b></div><div class="st-bar"><i></i></div>
    </div>
    <div class="st-q q1" data-step="2" data-sfx="glass">${ic('message-circle', 26)} ¿Alguien sabe de un proyecto?</div>
    <div class="st-q q2" data-step="3" data-sfx="glass">${ic('mail', 26)} 46 correos sin leer</div>
    <div class="st-q q3" data-step="3" data-sfx="glass" style="--d:.35s">${ic('users', 26)} 3 grupos de WhatsApp</div>
    <div class="st-full" data-step="4" data-sfx="boom">${ic('lock', 30)} Cupo lleno</div>
  </div>`,
})

const chans = [['message-circle', 'Boca en boca', 'Un amigo te cuenta'], ['mail', 'Correos', 'Se pierden entre otros'], ['file-spreadsheet', 'Formularios', 'Uno distinto por proyecto'], ['message-square-text', 'Grupos de WhatsApp', 'Solo si estás en el grupo']]
S({
  id: 'canales', act: 'El problema', who: 'Samuel', t: 25, gap: 0.7,
  notes: 'El problema: la información de los proyectos está descentralizada. Hoy un proyecto se anuncia de boca en boca, por correo, con un formulario distinto cada vez o en grupos de WhatsApp. Son cuatro lugares que no se hablan entre sí: si no estás en el grupo correcto, no te enteras.',
  html: `${head('El problema', 'La información de los proyectos <em>está descentralizada.</em>')}
  <p class="sub" data-step="1" data-sfx="none">Así se anuncia hoy un proyecto:</p>
  <div class="chans">${chans.map(([a, b, c], i) => `<div class="chip-card" data-step="${i + 1}" data-sfx="slide"><div class="ib">${ic(a, 44)}</div><span>${b}</span><small>${c}</small></div>`).join('')}</div>
  <svg class="ch-break" viewBox="0 0 1664 60" data-step="5" data-sfx="none"><path d="M0 30 H1664" /></svg>
  <p class="foot" data-step="5" data-sfx="bong">Cuatro lugares que <b>no se hablan entre sí.</b></p>`,
})

const cons = [
  ['zap', 'Gana el más rápido', 'El cupo se lo queda quien vio primero el WhatsApp, no quien encaja mejor.'],
  ['clock-alert', 'Horas sin evidencia', 'Se reportan a mano, sin una tarea que las respalde.'],
  ['eye-off', 'Avance invisible', 'La coordinación lo ve hasta que el proyecto ya terminó.'],
]
S({
  id: 'sintomas', act: 'El problema', who: 'Samuel', t: 25, gap: 1.1,
  notes: 'Y eso trae tres problemas. Primero, gana el más rápido: el aviso cae en un grupo y el cupo se lo queda quien estaba pendiente del teléfono, no quien encaja mejor en el proyecto. Segundo, las horas se reportan a mano, sin una tarea que las respalde. Y tercero, la coordinación solo ve el avance cuando el proyecto ya terminó. ',
  html: `${head('Lo que pasa hoy', 'Sin un solo lugar, <em>tres problemas.</em>')}
  <div class="sym">${cons.map(([a, b, c], i) => `<div class="sym-c" data-step="${i + 1}" data-sfx="slide"><div class="n">0${i + 1}</div><div class="ib">${ic(a, 40)}</div><div class="t">${b}</div><div class="d">${c}</div></div>`).join('')}</div>`,
})

// =========================================================== ACTO II · LA SOLUCIÓN (Angel)
S({
  id: 'revelacion', act: 'La solución', who: 'Angel', t: 15, cls: 'dark reveal', gap: 1.2,
  notes: 'De este problema nace UVGenius: todos los proyectos de la UVG en un solo lugar.',
  html: `<div class="glow"></div><div class="rv">
    <div class="rv-k" data-step="1" data-sfx="none">De este problema nace</div>
    <div class="wordmark xl" data-step="2" data-sfx="reveal">UVGenius</div>
    <p class="rv-sub" data-step="3" data-sfx="bell">Todos los proyectos de la UVG, <em>en un solo lugar.</em></p></div>`,
})

const AUD = [
  { icon: 'graduation-cap', t: 'Estudiantes', img: '/shots/e_explorar.jpg', url: 'uvgenius / proyectos',
    can: [['search', 'Encuentran proyectos con filtros por área y tipo de horas'], ['send', 'Se postulan a un rol y ven el estado de su solicitud'], ['timer', 'Registran horas ligadas a sus tareas'], ['link', 'Comparten su portafolio con un enlace']] },
  { icon: 'crown', t: 'Líderes de asociación', img: '/shots/e_kanban.jpg', url: 'uvgenius / tablero',
    can: [['megaphone', 'Publican proyectos y abren roles'], ['user-check', 'Aceptan o rechazan postulaciones'], ['kanban', 'Organizan el trabajo por sprints o metas'], ['badge-check', 'Revisan y validan las horas del equipo']] },
  { icon: 'book-open-check', t: 'Coordinadores académicos', img: '/shots/a_horas.jpg', url: 'uvgenius / horas',
    can: [['school', 'Ven solo las carreras que coordinan'], ['bar-chart-3', 'Siguen las horas por semestre y por estudiante'], ['triangle-alert', 'Detectan a quién le faltan horas'], ['file-down', 'Descargan reportes en PDF o CSV']] },
]
const audCards = (focus) => `<div class="aud">${AUD.map((a, i) => `<div class="aud-c${i < focus ? ' seen' : ''}" data-i="${i}"><div class="ib">${ic(a.icon, 40)}</div><div class="t">${a.t}</div><div class="go">${i < focus ? ic('check', 22, 3) + ' Visto' : 'Ver qué puede hacer ' + ic('arrow-right', 22, 2.5)}</div></div>`).join('')}</div>
  <div class="aud-cursor">${ic('mouse-pointer-2', 52, 1.6)}</div><div class="aud-ripple"></div>`
const audNotes = [
  'En esta primera etapa, UVGenius está pensado para tres públicos. [→ el cursor abre Estudiantes]',
  '[→ el cursor abre Líderes de asociación]',
  '[→ el cursor abre Coordinadores académicos]',
]
const audDetail = [
  'Los estudiantes encuentran proyectos con filtros, se postulan a un rol y ven en qué va su solicitud; registran sus horas en cada tarea y al final comparten su portafolio con un enlace.',
  'Los líderes de asociación publican sus proyectos, eligen a quién aceptar, organizan el trabajo por sprints o metas y revisan las horas de su equipo.',
  'Y los coordinadores académicos ven solo las carreras que coordinan: siguen las horas por semestre, detectan a quién le faltan y descargan los reportes. [Sigue: el flujo]',
]
AUD.forEach((a, i) => {
  S({ id: `para-quien-${i}`, act: 'La solución', who: 'Angel', t: i === 0 ? 15 : 4, aud: i, notes: audNotes[i],
    html: `${head('Público objetivo · primera etapa', 'Pensado para <em>tres públicos.</em>')}${audCards(i)}` })
  S({ id: `publico-${i}`, act: 'La solución', who: 'Angel', t: 14, gap: 0.55, notes: audDetail[i],
    html: `<div class="kick">Público objetivo · ${i + 1} de 3</div><h2 class="title">${a.t}</h2>
    <div class="pd-shot" data-step="1" data-sfx="slide"><div class="browser"><div class="bar"><i></i><i></i><i></i><span>${a.url}</span></div><div class="shot"><img src="${a.img}" alt="" /></div></div></div>
    <div class="pd-can">${a.can.map(([ico, t], k) => `<div class="pd-i" data-step="${k + 2}" data-sfx="pop"><span class="ib">${ic(ico, 30)}</span>${t}</div>`).join('')}</div>` })
})

const flow = [['megaphone', 'Publicar el proyecto'], ['send', 'Postularse a un rol'], ['kanban', 'Trabajar por sprints o metas'], ['timer', 'Registrar horas'], ['badge-check', 'Validar']]
S({
  id: 'recorrido', act: 'La solución', who: 'Saúl', t: 30, gap: 0.8,
  notes: 'Todo pasa en un solo flujo: el líder publica el proyecto, el estudiante se postula a un rol, el equipo trabaja por sprints o por metas, cada hora queda registrada en una tarea y al final se valida con evidencia. ',
  html: `${head('Cómo funciona', 'Un solo flujo, <em>de la convocatoria a la validación.</em>')}
  <div class="flow"><div class="flow-track"><i></i></div>${flow.map(([a, b], i) => `<div class="fs" data-step="${i + 1}" data-sfx="pop"><div class="fi">${ic(a, 50)}</div><div class="fn">0${i + 1}</div><div class="t">${b}</div></div>`).join('')}</div>`,
})

// =========================================================== ACTO III · EL MERCADO (Derek)
const cols = [['siJira', 'Jira'], ['siNotion', 'Notion'], ['siWhatsapp', 'Forms + WhatsApp'], [null, 'UVGenius']]
const comp = [
  ['Publicar convocatorias para toda la UVG', ['no', 'mid', 'mid', 'si']],
  ['Postulación con estado y respuesta', ['no', 'mid', 'no', 'si']],
  ['Tablero y sprints del equipo', ['si', 'si', 'no', 'si']],
  ['Horas beca y de extensión validadas', ['mid', 'no', 'no', 'si']],
  ['Vista para asociación y coordinación', ['no', 'no', 'no', 'si']],
]
const mark = { si: ic('check', 32, 3), no: ic('x', 28, 2.5), mid: ic('minus', 28, 3) }
S({
  id: 'herramientas', act: 'Competencia', who: 'Samuel', t: 35, gap: 0.6,
  notes: '¿Por qué no usar lo que ya existe? Jira organiza muy bien el trabajo, pero no publica convocatorias ni valida horas para la universidad. Notion se puede armar a mano, pero cada asociación tendría que construirlo y mantenerlo. Y Forms con WhatsApp es lo que se usa hoy. UVGenius une las tres partes: convocatoria, trabajo en equipo y validación de horas.',
  html: `${head('Competencia', 'Otras herramientas resuelven <em>una parte.</em>')}
  <div class="cmp">
    <div class="cmp-r cmp-h"><div></div>${cols.map(([k, c], j) => `<div class="${j === 3 ? 'us' : ''}">${k ? logo(k, 30, j === 2 ? undefined : undefined) : ''}<span>${c}</span></div>`).join('')}</div>
    ${comp.map(([k, v], i) => `<div class="cmp-r" data-step="${i + 1}" data-sfx="tick"><div class="k">${k}</div>${v.map((x, j) => `<div class="m ${x}${j === 3 ? ' us' : ''}">${mark[x]}</div>`).join('')}</div>`).join('')}
    <div class="cmp-leg">${mark.mid} se puede, pero hay que armarlo o hacerlo a mano</div>
  </div>`,
})

const costs = [
  ['siJira', 'Jira', 'Standard', 'US$ 7.91 por persona · gratis solo hasta 10', 396],
  ['siNotion', 'Notion', 'Plus', 'US$ 12 a 16 por persona', 800, 600],
  ['siGoogleforms', 'Forms + WhatsApp', 'Gratis', 'sin estado, horas ni seguimiento', 0],
  [null, 'UVGenius', 'Servidor propio', 'costo de hoy; si crece la carga, se escala el servidor', 8],
]
S({
  id: 'costos', act: 'Competencia', who: 'Derek', t: 25, gap: 0.7,
  notes: 'Y el costo. Para una asociación con 50 estudiantes activos, Jira Standard sale en unos 396 dólares al mes porque cobra por persona y el plan gratis llega solo a 10. Notion Plus, entre 600 y 800. Forms y WhatsApp son gratis, pero no dan estado, horas ni seguimiento. UVGenius corre hoy en un servidor de unos 8 dólares al mes, y ese costo es del servidor, no por persona. (Precios de lista en dólares, 2026.)',
  html: `${head('Costo al mes · ejemplo con 50 estudiantes', 'Las otras cobran <em>por persona.</em>')}
  <div class="cost2">${costs.map(([k, n, p, note, tot, lo], i) => `<div class="cr${i === 3 ? ' us' : ''}" data-step="${i + 1}" data-sfx="${i === 3 ? 'bell' : 'slide'}">
    <div class="cr-h">${k ? logo(k, 44) : '<span class="co-uvg">UV</span>'}<div><b>${n} <small>${p}</small></b><span>${note}</span></div></div>
    <div class="cr-bar"><i style="--w:${Math.max(1.2, (tot / 800) * 100)}%"></i></div>
    <div class="cr-v"><small>US$</small><span data-count="${lo ?? tot}" ${lo ? `data-suffix="–${tot}"` : ''} ${i === 3 ? 'data-prefix="≈ "' : ''}>0</span></div></div>`).join('')}</div>
  <div class="cost-src" data-step="5" data-sfx="none">Precios de lista en US$ (Jira y Notion, 2026). UVGenius: VM actual de Azure; con más usuarios se escala el servidor, no las licencias.</div>`,
})

const rows = [['Encontrar un proyecto', 'Preguntar en grupos', 'Explorar con filtros'], ['Postularse', 'Mensaje informal', 'Postulación con estado'], ['Ver el avance', 'Al final', 'Sprint por sprint'], ['Validar horas', 'Reporte manual', 'Horas por tarea']]
S({
  id: 'antes-despues', act: 'Valor', who: 'Vernel', t: 20, gap: 0.7,
  notes: 'Lo que cambia en el día a día: encontrar un proyecto deja de depender de grupos; la postulación tiene un estado; el avance se ve sprint por sprint y las horas quedan ligadas a tareas reales.',
  html: `${head('Antes y después', 'Lo que cambia <em>en el día a día.</em>')}
  <div class="ba"><div class="ba-h"><div></div><div>Antes</div><div>Con UVGenius</div></div>
  ${rows.map(([a, b, c], i) => `<div class="ba-r" data-step="${i + 1}" data-sfx="switch"><div class="k">${a}</div><div class="b">${b}</div><div class="a">${ic('arrow-right', 26, 2.5)}${c}</div></div>`).join('')}</div>`,
})

S({
  id: 'impacto', act: 'Valor', who: 'Derek', t: 25, gap: 1.6,
  notes: 'Y lo medimos en el NeuroLab con cinco estudiantes: encontrar un proyecto y postularse tomó 37 segundos en promedio, y mover una tarea en el tablero y registrar sus horas, un minuto. Los cinco lo lograron sin ayuda. ',
  html: `${head('Impacto · medido en el NeuroLab', 'Lo medimos <em>con usuarios reales.</em>')}
  <div class="kpis">
    <div class="kpi" data-step="1" data-sfx="none"><div class="v"><span data-count="37">0</span><small>s</small></div><div class="l">para encontrar un proyecto y postularse</div><div class="s">Promedio de 5 estudiantes</div></div>
    <div class="kpi" data-step="2" data-sfx="none"><div class="v"><span data-count="60">0</span><small>s</small></div><div class="l">para mover una tarea y registrar sus horas</div><div class="s">Promedio de 5 estudiantes</div></div>
    <div class="kpi" data-step="3" data-sfx="none"><div class="v"><span data-count="5">0</span><small>/5</small></div><div class="l">terminaron todas las tareas sin ayuda</div><div class="s">Prueba con eye tracking y sensor de estrés</div></div>
  </div>`,
})

// =========================================================== ACTO IV · LOS USUARIOS (Samuel)
const times = [['Crear cuenta', 73, 7.0], ['Sesión y perfil', 105, 7.0], ['Buscar y postularse', 37, 6.8], ['Tablero y horas', 60, 5.4], ['Chat y avisos', 45, 5.4]]
S({
  id: 'neurolab', act: 'Usuarios', who: 'Saúl', t: 35, gap: 1.4,
  notes: 'Lo llevamos al NeuroLab de la UVG con cinco estudiantes, eye tracking y un sensor de estrés. Los cinco terminaron todo sin ayuda y el SUS fue de 85.5, arriba del 68 de referencia. Pero el tablero con las horas y el chat fueron lo peor calificado.',
  html: `${head('Pruebas con usuarios · NeuroLab UVG', 'Lo probamos con <em>eye tracking.</em>')}
  <div class="lab">
    <div class="lab-k" data-step="1" data-sfx="none"><div class="v"><span data-count="85.5" data-dec="1">0</span></div><div class="l">puntaje SUS</div><div class="sus"><b></b><i></i><span>68 · promedio</span></div>
      <div class="v sm">5/5</div><div class="l">terminaron sin ayuda</div></div>
    <div class="lab-c" data-step="2" data-sfx="slide"><div class="chh"><span>Facilidad por tarea</span><span>1 a 7</span></div>
      ${times.map(([l, v, s]) => `<div class="br${s < 6 ? ' lo' : ''}"><div class="bk">${l}</div><div class="bt"><i style="--w:${(s / 7) * 100}%"></i></div><div class="bs">${s.toFixed(1)}</div></div>`).join('')}</div>
  </div>`,
})

const ch = [['message-circle', 'Tardaban 39 s en encontrar el chat', 'Pusimos el chat en la barra superior, con contador'], ['list-checks', '4 de 5 no llegaban a su tarea', 'El aviso ahora lleva directo a «Ver mi tarea»'], ['triangle-alert', 'Los errores no decían qué corregir', 'Ahora cada campo marca su propio error']]
S({
  id: 'mejoras', act: 'Usuarios', who: 'Saúl', t: 35, gap: 1.2,
  notes: 'El eye tracker mostró lo que la encuesta no: tardaban 39 segundos en encontrar el chat, cuatro de cinco no llegaban a su tarea y los errores no decían qué corregir. Con eso hicimos tres cambios que ya están en producción: el chat pasó a la barra superior con contador, el aviso de tarea lleva directo a «Ver mi tarea» y cada campo marca su propio error. ',
  html: `${head('Del hallazgo al cambio', 'Lo que vio el eye tracker, <em>ya está corregido.</em>')}
  <div class="eye-img" data-step="1" data-sfx="slide"><img src="/img/lab_p02.jpg" alt="" /><span class="eye-tag">Mapa de calor · NeuroLab</span></div>
  <div class="hms">${ch.map(([a, b, c], i) => `<div class="hm" data-step="${i + 2}" data-sfx="pop"><div class="h1">${ic('eye', 20)} ${b}</div><div class="h2"><span class="ib">${ic(a, 26)}</span>${c}</div></div>`).join('')}</div>`,
})

// =========================================================== ACTO V · LA TÉCNICA (Vernel)
const stack = [
  ['Interfaz', [['siNextdotjs', 'Next.js 16'], ['siReact', 'React 19'], ['siTypescript', 'TypeScript']], 'Páginas rápidas desde el servidor y un solo lenguaje en todo el proyecto.'],
  ['API', [['siNestjs', 'NestJS 11'], ['siPrisma', 'Prisma']], 'Módulos ordenados y permisos por rol en cada ruta.'],
  ['Datos y tiempo real', [['siPostgresql', 'PostgreSQL'], ['siSocketdotio', 'Socket.io'], ['siRedis', 'Redis']], 'Base relacional para proyectos, roles y horas; chat y avisos al instante.'],
  ['Archivos', [['siCloudinary', 'Cloudinary']], 'Fotos y documentos fuera del servidor, optimizados y servidos por CDN.'],
  ['Infraestructura', [['siDocker', 'Docker'], ['siNginx', 'Nginx'], ['siGithubactions', 'GitHub Actions']], 'Todo en contenedores: la base de datos también. Se mueve a otro servidor sin cambiar código.'],
]
S({
  id: 'tecnologias', act: 'Tecnología', who: 'Vernel', t: 35, gap: 0.9,
  notes: `Estas son las tecnologías. La interfaz es Next.js con React y TypeScript; la API es NestJS con Prisma. Los datos viven en PostgreSQL, que también corre en un contenedor de Docker. El chat, los avisos y el tablero en tiempo real usan Socket.io con Redis, y los archivos van a Cloudinary. Todo se despliega con Docker, Nginx y GitHub Actions.
SI PREGUNTAN POR QUÉ:
• Next.js: renderiza en el servidor (carga rápida) y es TypeScript igual que la API.
• NestJS: estructura por módulos, guardas de rol y validación en cada ruta; se integra con Socket.io.
• PostgreSQL: los datos son relacionales (proyecto → roles → postulaciones → tareas → horas); transacciones para que una hora no se acredite dos veces.
• Base dockerizada: mismo motor y versión en desarrollo, CI y producción; respaldos con pg_dump.
• Socket.io + Redis: tiempo real con reconexión automática; Redis permite varias instancias de la API.
• Cloudinary: no llenamos el disco de la VM con fotos y se sirven por CDN.`,
  html: `${head('Tecnologías', 'Con qué <em>está hecho.</em>')}
  <div class="stk2">${stack.map(([k, ls, why], i) => `<div class="sc" data-step="${i + 1}" data-sfx="pop"><div class="sc-k">${k}</div><div class="sc-l">${ls.map(([s, n]) => `<span class="lg2">${logo(s, 58)}<b>${n}</b></span>`).join('')}</div></div>`).join('')}</div>`,
})

const nodes = [
  ['Navegador', 'monitor-smartphone', 150, 470], ['Nginx', 'shield-check', 560, 470],
  ['Next.js', 'layout-dashboard', 970, 340], ['NestJS', 'server', 970, 600],
  ['PostgreSQL', 'database', 1400, 280], ['Redis', 'zap', 1400, 480], ['Cloudinary', 'cloud', 1400, 680],
]
S({
  id: 'arquitectura', act: 'Tecnología', who: 'Vernel', t: 25, gap: 0.9,
  notes: 'Y así se conectan: el navegador entra por Nginx con HTTPS; la interfaz es Next.js y la API NestJS. Los datos viven en PostgreSQL, el tiempo real pasa por Redis y los archivos por Cloudinary. Todo en Docker, sobre una VM de Azure.',
  html: `${head('Arquitectura', 'Simple de operar, <em>lista para crecer.</em>')}
  <svg class="wires" viewBox="0 0 1920 1080" data-step="2" data-sfx="none">
    <path d="M440 520 H560" /><path d="M850 500 C910 500 910 390 970 390" /><path d="M850 540 C910 540 910 650 970 650" />
    <path d="M1260 630 C1330 630 1330 330 1400 330" /><path d="M1260 650 C1330 650 1330 530 1400 530" /><path d="M1260 670 C1330 670 1330 730 1400 730" />
  </svg>
  ${nodes.map(([t, i, x, y], k) => `<div class="node" data-step="1" data-sfx="${k ? 'none' : 'pop'}" style="left:${x}px;top:${y}px;--d:${k * 0.09}s"><span class="ib">${ic(i, 30)}</span>${t}</div>`).join('')}
  <div class="arch-foot" data-step="3" data-sfx="pop"><span>${ic('container', 26)} Docker</span><span>${ic('cloud-cog', 26)} VM de Azure</span><span>${ic('git-branch', 26)} GitHub Actions</span></div>`,
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
  id: 'ci', act: 'Calidad', who: 'Vernel', t: 35, ci: true,
  notes: 'Así validamos cada cambio antes de que llegue a producción. Empieza con un pull request ligado a un ticket de Jira. CI corre lint, tipos, pruebas unitarias y de integración, y revisa secretos y OWASP; luego otro integrante lo revisa. Al hacer merge a main, CI corre otra vez, se construye una imagen de Docker con un tag que no se puede sobrescribir y se despliega. El deploy solo termina si la API responde. [→ flecha: aparece la falla] Si cualquier filtro falla, el cambio se detiene ahí y no llega a producción. En total son 9,832 pruebas, la revisión externa no encontró defectos críticos y cada semana corre una prueba de carga con k6: la API responde en unos 200 milisegundos en el percentil 95, sin errores de servidor. ',
  html: `${head('Calidad · de un cambio a producción', 'Cada cambio pasa <em>siete filtros.</em>')}
  <div class="pipe2">
    <svg class="pipe-line" viewBox="0 0 1664 20" preserveAspectRatio="none"><line x1="20" y1="10" x2="1644" y2="10" /></svg>
    <i class="pipe-dot"></i>
    ${pipe.map(([a, b, c], i) => `<div class="pn${i === pipe.length - 1 ? ' last' : ''}"><div class="pi">${ic(a, 38)}<span class="pok">${ic('check', 18, 3.5)}</span><span class="pko">${ic('x', 18, 3.5)}</span></div><div class="pt">${b}</div><div class="pd">${c}</div></div>`).join('')}
  </div>
  <div class="pipe-fail">${ic('octagon-x', 30)} <span>Si cualquier filtro falla, el cambio <b>no llega a producción.</b></span></div>
  <div class="ci-foot"><span><b>9,832</b>pruebas automatizadas</span><span><b>9 / 381</b>rutas públicas</span><span><b>0</b>defectos críticos en la revisión externa</span><span><b>k6</b>carga cada semana</span></div>`,
})

// =========================================================== ACTO VI · CIERRE (Angel)
const plan = [['rocket', 'Piloto con la Asociación de Estudiantes de Computación'], ['message-square-heart', 'Ajustes con lo que nos digan'], ['users', 'Más asociaciones y carreras'], ['trending-up', 'Toda la UVG, sin rehacerlo']]
S({
  id: 'siguiente', act: 'Lo que sigue', who: 'Derek', t: 20, gap: 0.8,
  notes: 'Lo que sigue: un piloto con la Asociación de Estudiantes de Computación, ajustar con lo que nos digan, sumar más asociaciones y carreras, y llegar a toda la UVG sin rehacer la plataforma: como todo está en Docker, solo se cambia el tamaño del servidor. Y ahora, mejor véanlo funcionando.',
  html: `${head('Lo que sigue', 'Listo para un <em>piloto real.</em>')}
  <div class="flow f4"><div class="flow-track"><i></i></div>${plan.map(([a, b], i) => `<div class="fs" data-step="${i + 1}" data-sfx="pop"><div class="fi">${ic(a, 50)}</div><div class="fn">0${i + 1}</div><div class="t">${b}</div></div>`).join('')}</div>`,
})

S({
  id: 'demo', act: 'Demo', who: 'Todos', t: 225, cls: 'demo-slide', steps: 2, manual: true,
  notes: 'Paso 1: aparece la laptop con la landing. Paso 2 (→): doble clic, entra a pantalla completa, el equipo saluda abajo a la derecha y arranca el recorrido. No toquen nada hasta que termine; al final, → pasa al cierre.',
  html: `<div class="kick dm-kick">Demo</div>
  <h2 class="title dm-title">Ahora, <em>véanlo funcionando.</em></h2>
  <div id="dm-laptop"><div class="screen"><div class="bezel"><div class="cam"></div><div class="display"><img src="/media/landing.png" alt="" /></div></div></div><div class="base"><div class="notch"></div></div></div>
  <div id="dm-full"><img class="dm-still" src="/media/landing.png" alt="" />
    <video id="dm-video" playsinline preload="auto"><source src="/media/demo.mp4" type="video/mp4" /></video></div>
  <div id="dm-team">${TEAM.map((p) => `<figure class="dm-a" data-id="${p.id}"><canvas></canvas><figcaption>${p.short}</figcaption></figure>`).join('')}</div>
  <div id="dm-guide"><canvas></canvas><b class="dm-name"></b></div>
  <div id="dm-sub"><span></span></div>
  <div id="dm-cursor">${ic('mouse-pointer-2', 52, 1.6)}</div><div class="dm-ripple"></div><div class="dm-ripple"></div>
  <audio id="dm-intro" src="/audio/intro.mp3" preload="auto"></audio><audio id="dm-outro" src="/audio/outro.mp3" preload="auto"></audio><audio id="dm-click" src="/audio/dblclick.wav" preload="auto"></audio>`,
})

S({
  id: 'cierre', act: 'Cierre', who: 'Derek', t: 20, cls: 'dark cover', gap: 1.4,
  notes: 'Antes, te enterabas de un proyecto solo si estabas en el grupo correcto. Ahora cualquier estudiante lo encuentra, y su trabajo cuenta. Muchas gracias, ¿tienen preguntas?',
  html: `<div class="glow"></div>
  <div class="cl">
    <div class="bef" data-step="1" data-sfx="none">Antes: te enterabas <s>si estabas en el grupo correcto.</s></div>
    <h1 class="display sm" data-step="2" data-sfx="reveal">Ahora: cualquier estudiante lo encuentra, <em>y su trabajo cuenta.</em></h1>
    <div class="thx" data-step="3" data-sfx="bell">Gracias · <em>¿Preguntas?</em></div>
  </div>
  <div class="qr" data-step="3" data-sfx="none"><img src="/img/qr.png" alt="" /><div>Pruébalo<br /><b>158.23.57.118.nip.io</b></div></div>
  <div class="cl-team" data-step="3" data-sfx="none">${TEAM.map((p) => `<figure data-id="${p.id}"><canvas></canvas><figcaption>${p.short}</figcaption></figure>`).join('')}</div>`,
})

// Orden de la presentación: pitch, equipo, problema, público objetivo y la demo lo antes posible.
const ORDER = ['pitch', 'historia', 'equipo', 'canales', 'sintomas', 'revelacion', 'para-quien-0', 'publico-0', 'para-quien-1', 'publico-1', 'para-quien-2', 'publico-2', 'demo',
  'recorrido', 'neurolab', 'mejoras', 'tecnologias', 'arquitectura', 'ci', 'antes-despues', 'herramientas', 'costos', 'impacto', 'siguiente', 'cierre']
SLIDES.sort((x, y) => ORDER.indexOf(x.id) - ORDER.indexOf(y.id))
