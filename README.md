# UVGenius · Presentación final

Presentación del proyecto UVGenius (Ingeniería de Software, sección 30, grupo 6).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

## Controles

| Tecla | Acción |
|---|---|
| → / espacio / clic derecho de la pantalla | Avanzar |
| ← | Regresar |
| P | Vista del presentador (notas y reloj) |
| F | Pantalla completa |
| B | Pantalla negra |
| S | Mostrar u ocultar subtítulos en la demo |

## Estructura

- `src/slides.js`: contenido de cada diapositiva, quién habla y tiempo meta.
- `src/demo.js`: escena de la demo (laptop, doble clic, equipo saludando y recorrido).
- `public/media/demo-cues.json`: en qué segundo del video habla cada integrante.
- `public/avatars/sprites`: personajes en pixel art (de pie, saludando y señalando, con boca abierta y cerrada).
