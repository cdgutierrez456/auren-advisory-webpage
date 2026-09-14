# Diccionario de diseño — Auren Advisory

Qué es este archivo: el contrato visual del sitio. Si algo no está aquí ni en
`globals.css`, no es sistema: es un accidente que alguien dejó en una clase.

Tesis: **una sola composición, dos temperaturas**. El sitio nació oscuro y esa
sigue siendo la voz de la marca; el tema claro no es otro diseño, es el mismo
con los papeles reasignados. Por eso los componentes no saben de qué color son.

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

| Token | Papel | Oscuro | Claro |
|---|---|---|---|
| `bg-surface` | base del sitio | deep-900 | ivory |
| `bg-surface-2` | segundo escalón | deep-700 | paper |
| `bg-surface-3` | tercer escalón | deep | `#eceadf` |
| `bg-surface-4` | cuarto escalón | ink | `#e3e0d3` |
| `text-fg` | texto | ivory | ink |
| `border-line` / `-strong` | filos | ivory 11% / 20% | ink 12% / 22% |
| `glass` | superficie elevada | deep 42% | paper 62% |
| `text-accent` | **texto** de acento | lima | **deep** |

La última fila es una regla de marca, no una decisión estética: **lima nunca es
texto sobre marfil.** Por eso `text-accent` cambia de color, mientras el lima de
relleno (`bg-lime`, reglas, trazos, bordes) es el mismo en los dos temas.

Regla de fondo: los cuatro escalones se alternan para dar ritmo; ninguno
«significa» algo, y una sección nunca salta más de un escalón respecto a su
vecina. Nada de hue nuevos: el contraste se construye con valor y translucidez.

## 2. Temas

- **Por defecto manda el sistema operativo**: `:root` trae el oscuro y
  `@media (prefers-color-scheme: light)` lo reasigna.
- **`data-theme` en `<html>` gana siempre**, y es lo que escribe el interruptor
  (`theme-toggle.tsx` → `localStorage.tema`).
- Un script en línea en `layout.tsx` aplica el tema guardado **antes de pintar**.
  Es el único JavaScript en línea del sitio y existe solo para eso: sin él, quien
  guardó el tema claro ve un fogonazo oscuro en cada carga.
- El bloque de tokens claros está escrito dos veces a propósito (media query y
  atributo). CSS no tiene mixins; duplicar doce líneas sale más barato que
  sostener una clase extra en `<html>`.
- `--glow-opacity` y `--shadow-color` también son del tema: la luz ambiental y
  las sombras bajan de intensidad en claro, donde una sombra negra es un moretón.

## 3. Superficies

`@utility glass` = fondo semitransparente + `backdrop-filter: blur(18px)
saturate(1.1)` + filo `line`. **Es LA tarjeta del sistema, no hay otra.** Va
siempre con `rounded-card`, y con `shadow-float` cuando flota sobre luz.

Listas largas (servicios, artículos, pasos) no son N tarjetas: son **un** panel
glass con `divide-line`. Menos ruido, misma familia.

## 4. Escala de texto

| Peldaño | Clase | Uso |
|---|---|---|
| Titular | `text-fg` | h1, h2, cifras |
| Cuerpo fuerte | `text-fg/90` | claim de tarjeta |
| Cuerpo | `text-fg/75` | párrafos |
| Secundario | `text-fg/55` | labels, metadatos |
| Terciario | `text-fg/40` | copyright, apoyos |

Cinco peldaños, y solo cinco. Salir de la tabla es la forma más rápida de romper
la armonía — ya pasó una vez: había doce opacidades sueltas antes de normalizar.

## 5. Tipografía

- **Geist** para todo. **Instrument Serif itálica** solo vía `<Em>`: una o dos
  palabras por sección, las de mayor carga. Requiere `style: ["normal","italic"]`
  en `layout.tsx` o el navegador sintetiza la itálica y se nota.
- **Geist Mono** solo para índices de fase.
- Escala fluida sin breakpoints: `text-mega` → `text-display` → `text-headline`
  → `text-lede`. `.label` (11px, tracking .34em) es el conector del sistema.
- `.tnum` en toda cifra.

## 6. Forma

`--radius-card: 1.5rem` (tarjetas, paneles, menús) · `--radius-lg: 1rem` (ítems
dentro de una tarjeta) · `--radius-pill` (botones, chips, puntos). Cero esquinas
rectas en superficies; las únicas rectas son las reglas de 1–2px y los divisores.

Ritmo: `py-section` y `shell`. Toda sección es `<Section>`; nada define su propio
padding vertical.

## 7. Movimiento

Dos motores, y la división no es capricho:

**Motion** (`components/motion.tsx`) para todo lo que depende del scroll.
`animation-timeline: view()` no existe en Firefox ni en Safari anteriores al 26:
ahí las animaciones de scroll no corrían en absoluto, y ese fue el motivo para
añadir la única dependencia de animación del proyecto.

| Componente | Qué hace |
|---|---|
| `<Reveal>` | un bloque que entra al aparecer (opacidad + subida + desenfoque) |
| `<RevealList>` + `<RevealItem>` | rejilla escalonada; el padre orquesta, 70ms entre hijos |
| `<DrawRule>` | el trazo lima que se dibuja de izquierda a derecha |
| `<ParallaxY>` | telón que sube más lento que el contenido |
| `<ToTopButton>` | volver arriba: aparece entre 400 y 700px de scroll |

Todo se dispara **una sola vez** (`once: true`): volver a subir no vuelve a
animar. `<MotionProvider reducedMotion="user">` envuelve el sitio en
`layout.tsx`, así que quien pide menos movimiento recibe solo opacidad.

**CSS** (`globals.css`) para lo que no necesita JavaScript: `.enter` (entrada
del hero, escalonada con `--i`) y `.drift` / `.breathe` (telón y luz ambiental,
continuos). El hero se queda en CSS a propósito: **el contenido sobre el pliegue
no debería depender de que cargue un bundle para hacerse visible.**

Por lo mismo, `layout.tsx` trae un `<noscript>` que fuerza la visibilidad de lo
que Motion deja en `opacity: 0`. La animación es un lujo; el texto no.

## 8. Microinteracciones

Un solo gesto, repetido:

- **Botón**: `hover` sube 2px + resplandor lima; `active` vuelve a su sitio y
  encoge a 0.97. La flecha hija se desplaza en diagonal — la anima el botón con
  `[&_svg]`, no cada llamada.
- **Tarjeta enlazada**: `hover` sube 4px y el filo pasa a `lime/40`, 500ms.
- **Enlace de texto**: cambia a `text-accent`. Siempre con `transition-colors`:
  un color que salta se siente roto.
- **Fila de tabla/listado**: `hover:bg-fg/5`.

## 9. El semáforo operativo (demos)

`/demos/*` es la única parte del sitio con color que no es marca: un tablero de
riesgo necesita rojo/ámbar/verde reales. Cada tema trae su calibración —claros
sobre oscuro, oscuros de imprenta sobre marfil— y el tinte `-suave` se deriva
solo con `color-mix(… 16%, transparent)`.

| Token | Oscuro | Claro |
|---|---|---|
| `--color-alerta` | `#ff8173` | `#a4231c` |
| `--color-aviso` | `#f5b83d` | `#7d5100` |
| `--color-ok` | `#5fd3a3` | `#1c6142` |

El verde se va al menta en oscuro a propósito: un verde amarillento competiría
con el lima y el tablero dejaría de distinguir estado de acento. Estado = color
**más** palabra, siempre. Relleno sólido lleva `text-surface`, que se invierte
con el tema.

## 10. Testimonios

`borrador: true` en `site.ts` significa **texto de ejemplo**: no lo dijo nadie, y
la tarjeta lo declara en pantalla. Un borrador no lleva nombre propio ni empresa
inventada — un testimonio falso sin marcar es publicidad engañosa, no un
placeholder. `npm test` impide publicar (quitar `borrador`) sin atribución.

## 11. Dónde vive cada pieza

| Pieza | Archivo |
|---|---|
| Paleta, semánticos, temas, `glass`, `glow`, movimiento CSS | `src/app/globals.css` |
| Animaciones de scroll (Motion) | `src/components/motion.tsx` |
| `Section`, `Card`, `Em`, `Button`, `SectionHead`, `PageHero`, `CtaBand`, `FaqList` | `src/components/ui.tsx` |
| Interruptor de tema | `src/components/theme-toggle.tsx` + script en `layout.tsx` |
| Volver arriba | `src/components/to-top.tsx` (ancla + `ToTopButton`) |
| Telones y luz ambiental | `src/components/vertex-art.tsx` |
| Lockup que sigue al tema | `<Logo tone="tema" />` en `logo.tsx` |
| Kit de los demos | `src/components/demo-ui.tsx` |

Antes de dar algo por terminado: `npm run build` y `npm test`.
