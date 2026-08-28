# Auren Advisory

Plataforma de presentación de la firma. **Ver. Entender. Transformar.**

```bash
npm install
npm run dev
```

- `/` — presentación: enfoque, capacidades, arquitectura de servicios, contacto.
- `/marca` — manual de identidad vivo (símbolo *El Vértice*, versiones, paleta, tipografía).
- `/demos` — demos vendibles de cada servicio. `noindex`: se comparten por enlace, no por buscador.

## Demos

Siete piezas demostrables bajo un solo shell. Sin backend, sin base de datos y
sin datos reales: todo sembrado con fechas relativas y guardado en
`sessionStorage`, que se limpia al cerrar la pestaña.

| Ruta | Demo | Servicio |
|---|---|---|
| `/demos/preoperacional` | Checklist, foto, firma y bloqueo por ítem crítico | Auren Flow |
| `/demos/preoperacional/tablero` | Cumplimiento del día e ítems que más fallan | Auren Flow |
| `/demos/flota` | Semáforo de SOAT, tecnomecánica, licencias y mantenimiento | Auren Flow |
| `/demos/pqrsd` · `/bandeja` · `/tablero` | Radicación, términos en días hábiles y gestión | Auren Flow |
| `/demos/vision/siete-segmentos` | Lectura de display LED por cámara | Auren Vision |
| `/demos/vision/medidor` | Lectura de aguja análoga con calibración en vivo | Auren Vision |
| `/demos/vision/placas` | ALPR con validación de formato y votación temporal | Auren Vision |
| `/demos/friccion` | Costo anual de una tarea manual | Auren Insight |

Dónde va cada cosa:

| Necesito… | Toco… |
|---|---|
| Cambiar qué dice un demo (resumen, pasos, límite) | `src/content/demos.ts` |
| Flota, checklist o inspecciones sembradas | `src/content/demo-data.ts` |
| Términos de ley, festivos, entidad, radicados | `src/content/terminos.ts` |
| Semáforos, regla del preoperacional, fricción | `src/lib/demos.ts` |
| Días hábiles y semáforo de términos | `src/lib/terminos.ts` |
| Un modo de cámara nuevo | `src/lib/vision/modos/` + una ruta |

Reglas que no se negocian: ninguna fecha literal en los datos sembrados (hay
una prueba que lo verifica), el semáforo siempre lleva la palabra además del
color, y si la confianza de una lectura por cámara no alcanza, la pantalla
dice «acercando…» en vez de mostrar un número.

**La cámara exige contexto seguro.** En el portátil `localhost` sirve; para
probar en el celular por IP de la red local, `npm run dev -- --experimental-https`.

```bash
npm run build   # producción
npm test        # formulario, servicios, días hábiles, semáforos y modos de visión
```

Convenciones, reglas de marca y cómo integrar servicios nuevos: **`CLAUDE.md`**.
