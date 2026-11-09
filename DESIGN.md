# Diccionario de diseño — Auren Advisory · sistema «Plano»

Qué es este archivo: el contrato visual del sitio. Si algo no está aquí ni en
`globals.css`, no es sistema: es un accidente que alguien dejó en una clase.

Tesis: **Ver. Entender. Transformar. como un plano de obra.** Auren lee la
operación como un ingeniero lee un plano: la ve entera, entiende cómo funciona
y la rediseña. El sistema visual es el de un plano: papel marfil para leer,
Auren Deep para declarar, trazos de 1–1,5 px que explican, cotas en mono que
miden, y un solo acento. Nada decorativo: **cada recurso gráfico explica algo.**

El razonamiento completo (diagnóstico, direcciones descartadas, por qué esta)
está en `REDISENO-V2.md`.

---

## 1. Las dos capas de color

**Paleta cruda** — los colores del brand brief. No cambian nunca.

| Token | Hex | Qué es |
|---|---|---|
| `--color-deep` | `#12343b` | Auren Deep |
| `--color-deep-700` | `#0b2126` | Deep hundido |
| `--color-deep-900` | `#071518` | Casi negro con tinte |
| `--color-ink` | `#111414` | Negro neutro |
| `--color-lime` | `#c8f169` | Acento de marca |
| `--color-ivory` | `#f2f1ea` | Marfil |
| `--color-paper` | `#ffffff` | Blanco |

**Semánticos** — el papel que cumple un color. Es lo único que usan los
componentes, y lo único que el tema reasigna:

| Token | Papel | Claro (casa) | Oscuro |
|---|---|---|---|
| `bg-surface` | base del sitio | ivory | deep-900 |
| `bg-surface-2` | tarjeta, segundo escalón | paper | deep-700 |
| `bg-surface-3` | tercer escalón | `#e9e7dc` | deep |
| `bg-surface-4` | cuarto escalón | `#dedbcd` | ink |
| `text-fg` | texto | ink | ivory |
| `border-line` / `-strong` | filos | ink 14% / 28% | ivory 13% / 24% |
| `text-accent` | **texto** de acento | **deep** | lima |

La última fila es una regla de marca, no una decisión estética: **lima nunca es
texto sobre marfil.** Por eso `text-accent` cambia de color, mientras el lima de
relleno (`bg-lime`, reglas, trazos, el nodo final de un diagrama) es el mismo
en los dos temas.

## 2. La superficie de declaración: `inverse`

`@utility inverse` es Auren Deep con marfil **en los dos temas**. No es una
variante de tema: es la superficie de marca. La usan el hero, la banda del
método y el cierre (`CtaBand`). Re-mapea los semánticos de sus descendientes
(`--color-surface`, `--color-fg`, `--color-line`, `--color-accent` → lima), así
los mismos componentes funcionan dentro sin saber dónde están.

Regla: **a lo sumo dos bandas `inverse` por página**, y nunca dos seguidas.
Es el contraste lo que la hace hablar; repetida, vuelve a ser el sitio oscuro.

`<Section tone="deep">` es la forma de obtenerla.

## 3. Temas

- **Claro es el tema de la casa.** `:root` trae el claro;
  `@media (prefers-color-scheme: dark)` reasigna.
- **`data-theme` en `<html>` gana siempre**, y es lo que escribe el interruptor
  (`theme-toggle.tsx` → `localStorage.tema`).
- Un script en línea en `layout.tsx` aplica el tema guardado **antes de pintar**.
- El bloque oscuro está escrito dos veces a propósito (media query y
  atributo). CSS no tiene mixins; duplicar doce líneas sale más barato que
  sostener una clase extra en `<html>`.

Por qué se invirtió el predeterminado: el oscuro con lima, tarjetas
translúcidas y resplandores era la causa principal de que el sitio se leyera
como «startup de IA». Sobre marfil, la misma paleta se lee como una firma.

## 4. Superficies

Una sola tarjeta: `@utility card` = `surface-2` + filo `line` de 1 px. Va
siempre con `rounded-card` (1 rem). **Sin `backdrop-filter`, sin resplandor,
sin sombra** salvo lo que flota sobre contenido con scroll (menú móvil, chat:
`shadow-float`).

Listas largas (servicios, pasos, soluciones) no son N tarjetas: son **un**
panel `card` con `divide-line`. Las franjas de ítems contiguos (dimensiones,
fases) son `grid gap-px bg-line` con cada celda en `bg-surface-2`: el filo de
1 px entre celdas es la línea del plano.

`glass` y `panel` siguen definidos **como alias de `card`** porque los demos,
el chat y la Radiografía los nombran. En código nuevo se usa `card`. `glow`
es un no-op: existe para que una clase huérfana no rompa nada.

## 5. Recursos gráficos (`components/diagrams.tsx`)

| Recurso | Qué explica | Dónde |
|---|---|---|
| `TransformDiagram` | la operación como es → vértice → flujo rediseñado y medido; cotas de las tres fases | hero |
| `SolutionGlyph` (5) | una lente, una cadena que se acorta, líneas que convergen, un marco a la medida, una señal leída | soluciones |
| `BeforeAfter` | cinco pasos con dos traspasos que desaparecen | disponible para servicios |
| `paper-grid` | retícula de papel técnico a 4 rem, 9 % de `currentColor` | hero, aperturas, cierre |

Reglas: todo es SVG propio, `currentColor` para el trazo, `var(--color-lime)`
**solo** en el trazo que marca la transformación, `strokeWidth` 1–1,5 (2 para
el lima). Nada de cerebros, circuitos, robots, hologramas, ojos ni bombillos.
Un diagrama que no explica nada no entra.

Los diagramas se dibujan al cargar con CSS: cada `path` lleva
`pathLength={1}` y `data-draw`; los nodos, `data-pop`. El contenedor lleva
`.draw` y `--i` escalona. Sin JavaScript y respetando `prefers-reduced-motion`.

## 6. Cotas y etiquetas

- `.cota` (mono 11 px, tracking .14em, mayúsculas) con `.cota-tick` delante:
  la etiqueta técnica del sistema. Índices de capítulo («01 — Qué hacemos»),
  metadatos, números de paso, encabezados de bloque. **Es la voz del plano**
  y reemplaza a `.label` en todo lo nuevo.
- `.label` (11 px, tracking .3em) se conserva para lo que ya lo usaba.
- `Cota` en `ui.tsx` es el componente; `SectionHead` lo usa con la regla
  superior `border-line-strong`.

## 7. Escala de texto

**Jerarquía por opacidad** — cinco peldaños, y solo cinco:

| Peldaño | Clase | Uso |
|---|---|---|
| Titular | `text-fg` | h1, h2, cifras |
| Cuerpo fuerte | `text-fg/90` | claim de tarjeta |
| Cuerpo | `text-fg/75` | párrafos |
| Secundario | `text-fg/55` | cotas, metadatos |
| Terciario | `text-fg/45` | índices, copyright |

(`/70`, `/65`, `/60` aparecen en texto corrido sobre `surface-2`, donde `/75`
sube demasiado el contraste. Son el mismo peldaño «cuerpo» ajustado a la
superficie; no son peldaños nuevos.)

**Jerarquía por tamaño:**

| Clase | Tamaño | Uso |
|---|---|---|
| `text-display` | 40–76 px fluido | hero y aperturas de página |
| `text-headline` | 30–48 px fluido | títulos de sección |
| `text-subhead` | 24–34 px fluido | títulos de tarjeta y de solución |
| `text-quote` | 32–56 px | la cita en serif |
| `text-lede` | 17–21 px | bajada de un titular |
| `text-base` | 16 px | **texto que se lee seguido** |
| `text-sm` | 14 px | interfaz: tarjetas, listados |
| `.cota` / `.label` | 11 px | etiquetas de sistema |

`text-mega` queda definido pero sin uso: el hero ya no grita.

## 8. Tipografía

- **Geist** para todo. **Instrument Serif itálica** solo vía `<Em>` y en las
  preguntas de sector/solución: una frase por bloque, la de mayor carga. La
  cita del manifiesto es la única serif a gran tamaño.
- **Geist Mono** para cotas y para los textos de los diagramas.
- `.tnum` en toda cifra.

## 9. Forma

`--radius-card: 1rem` (tarjetas, paneles, menús) · `--radius-lg: .625rem`
(ítems dentro de una tarjeta) · `--radius-pill` (botones, chips). Las únicas
rectas son las reglas de 1–2 px, los divisores y los marcos de los diagramas.

Ritmo: `py-section` y `shell`. Toda sección es `<Section>`.

## 10. Botones

| Variante | Qué es | Dónde |
|---|---|---|
| `solid` | `bg-fg text-surface`: se invierte con la superficie | acción primaria en páginas claras y en el menú |
| `lime` | `bg-lime text-ink` | **una vez por pantalla**, sobre `inverse` (hero, cierre) |
| `outline` | filo `line-strong` | acción secundaria |

Microinteracción única: `hover` sube 0,5 px, la flecha hija se desplaza en
diagonal, `active` encoge a 0,98.

## 11. Movimiento

Dos motores:

**CSS** (`globals.css`): `.enter` (entrada del hero al cargar, sin desenfoque,
máx. 400 ms de escalonado) y `.draw` (trazado de diagramas). El contenido
sobre el pliegue no depende de un bundle para verse.

**Motion** (`components/motion.tsx`) para lo que depende del scroll:
`<Reveal>`, `<RevealList>`/`<RevealItem>`, `<DrawRule>`, `<ParallaxY>`,
`<ToTopButton>`. V2 bajó el *reveal* a **14 px, 0,5 s y sin desenfoque**: el
anterior (28 px + blur 10 px + 0,75 s) dejaba media pantalla vacía al bajar
rápido. Todo se dispara **una sola vez**. `<MotionProvider
reducedMotion="user">` envuelve el sitio.

## 12. El semáforo operativo (demos)

`/demos/*` es la única parte del sitio con color que no es marca. Cada tema
trae su calibración y el tinte `-suave` se deriva con `color-mix`. Estado =
color **más** palabra, siempre.

| Token | Claro | Oscuro |
|---|---|---|
| `--color-alerta` | `#a4231c` | `#ff8173` |
| `--color-aviso` | `#7d5100` | `#f5b83d` |
| `--color-ok` | `#1c6142` | `#5fd3a3` |

## 13. Testimonios

`borrador: true` en `site.ts` significa **texto de ejemplo**: no lo dijo nadie.
V2 **no los muestra en la home**: la sección `Testimonios` filtra los
borradores y no se renderiza mientras no haya uno real con nombre y cargo.
`npm test` impide publicar (quitar `borrador`) sin atribución.

## 14. Dónde vive cada pieza

| Pieza | Archivo |
|---|---|
| Paleta, semánticos, temas, `inverse`, `card`, `cota`, `paper-grid`, movimiento CSS | `src/app/globals.css` |
| Diagramas | `src/components/diagrams.tsx` |
| Animaciones de scroll (Motion) | `src/components/motion.tsx` |
| `Section`, `SectionHead`, `Cota`, `Card`, `Em`, `Button`, `PageHero`, `CtaBand`, `FaqList`, `NumberedList`, `Figura` | `src/components/ui.tsx` |
| Interruptor de tema | `src/components/theme-toggle.tsx` + script en `layout.tsx` |
| Lockup que sigue al tema | `<Logo tone="tema" />` en `logo.tsx` |
| Kit de los demos | `src/components/demo-ui.tsx` |

Antes de dar algo por terminado: `npm run build` y `npm test`.
