# Auren Advisory — plataforma de presentación

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Motion. Sin
dependencias fuera de ese núcleo, y así debe seguir salvo razón concreta.

Motion es la única añadida, y tiene una: las animaciones de scroll estaban en
`animation-timeline: view()`, que no existe en Firefox ni en Safari < 26 — en
medio parque de navegadores no se movía nada.

**V2 (noviembre 2026):** rediseño completo bajo el sistema visual «Plano».
El porqué de cada decisión —diagnóstico, direcciones descartadas, puntuación—
está en `REDISENO-V2.md`; el diccionario visual, en `DESIGN.md`.

## Qué es Auren (y qué dice el sitio)

Firma de **transformación empresarial mediante tecnología**. No una empresa
de IA, ni una fábrica de software, ni una agencia de automatización. La
tecnología es el instrumento; la transformación es el propósito. Cuatro
dimensiones siempre presentes: estrategia, procesos, tecnología,
transformación. Filosofía: **Ver. Entender. Transformar.**

El orden de lectura de toda página es: *problema que reconoce el cliente →
qué hacemos → qué obtiene → cómo empezar*. La oferta se presenta por
**necesidad** (cinco `solutions`) y los ocho `services` son el nivel «cómo lo
entregamos». Nunca por catálogo de tecnologías.

## Comandos

```bash
npm run dev      # desarrollo (turbopack)
npm run build    # build de producción — correr antes de dar algo por terminado
npm test         # 101 pruebas; el glob va entre comillas dobles para que corra también en Windows
npm start
```

## Dónde va cada cosa

| Necesito… | Toco… |
|---|---|
| Cambiar textos; añadir solución, servicio, situación o principio | `src/content/site.ts` |
| Color, tipografía, escala, ritmo, tema claro/oscuro, `inverse`, `card`, `cota` | `src/app/globals.css` |
| Un diagrama o un glifo | `src/components/diagrams.tsx` |
| Una lámina (ilustración de tarjeta) | `src/components/laminas.tsx` |
| La tarjeta que se abre al pasar el mouse | `src/components/tiles.tsx` (`HoverTile`, `RevealCard`) |
| Foto de una solución, un sector o el hero | campo `image` en `solutions`, `sectors` o `hero`; sin archivo, se usa la lámina |
| El símbolo o el lockup | `src/components/logo.tsx` |
| Botón, sección, encabezado, cota, apertura de página, CTA, lista numerada | `src/components/ui.tsx` |
| El menú y el botón «Hablemos» | `nav` y `navCta` en `site.ts` → `src/components/nav.tsx` |
| El interruptor de tema | `src/components/theme-toggle.tsx` |
| Una sección de la home | `src/components/sections/*.tsx` |
| El hero (titular, bajada, CTA) | `hero` en `site.ts` → `sections/hero.tsx` |
| Las cuatro dimensiones y la frase central | `dimensions` y `manifesto` en `site.ts` |
| Las situaciones «¿Le suena?» | `problems` en `site.ts` (cada una apunta a una `solution`) |
| Las cinco soluciones | `solutions` en `site.ts` → `src/app/soluciones/page.tsx` |
| El método (Ver/Entender/Transformar) | `phases` y `method` en `site.ts` |
| Sectores, sus preguntas, oportunidades y demos | `sectors` en `site.ts` → `src/app/sectores/page.tsx` |
| La página de un servicio | `src/app/servicios/[slug]/page.tsx` (plantilla única) |
| Historia de la firma, socios, límites | `about` en `site.ts` → `src/app/nosotros/page.tsx` |
| Contacto: qué pasa después, compromisos | `contact` en `site.ts` → `src/app/contacto/page.tsx` |
| Validación y mensaje de WhatsApp | `src/lib/lead.ts` |
| Testimonios (y su marca de borrador) | `testimonials` en `site.ts` |
| El manual de marca público | `src/app/marca/page.tsx` |
| Preguntas, ejes, bandas y textos de la Radiografía | `src/content/radiografia.ts` |
| Cómo se puntúa la Radiografía | `src/lib/radiografia.ts` |
| Título, descripción y canónica de una página | `pageMetadata()` en `src/lib/seo.ts` |
| Datos estructurados (JSON-LD) de cualquier tipo | `src/lib/schema.tsx` |
| Publicar un artículo; editar uno | `posts` en `src/content/recursos.ts` |
| Preguntas frecuentes (viven en /contacto) | `homeFaqs` en `site.ts` |
| Pasos, industrias, métricas o preguntas de un servicio | la entrada en `services` |
| La imagen que se ve al compartir | `src/app/opengraph-image.tsx` |
| Número de WhatsApp, correo, dominio | `site` en `src/content/site.ts` |
| Qué **sabe** el asistente del chat | `site.ts` → `npm run build:kb` |
| Cómo se ve la burbuja del chat | `src/components/chat-widget.tsx` |
| Negritas, enlaces y listas de la respuesta del bot | `src/lib/chat-format.ts` |

### Rutas

`/` · `/soluciones` · `/enfoque` · `/sectores` · `/nosotros` · `/contacto` ·
`/servicios` · `/servicios/[slug]` (8, prerenderizadas) · `/recursos` ·
`/recursos/[slug]` · `/radiografia` · `/marca` · `/demos/*` (en `noindex`,
fuera del sitemap)

**Menú:** Soluciones · Cómo trabajamos · Sectores · Nosotros · Recursos ·
**Hablemos**. La Radiografía y los demos no van en el menú a propósito: se
enlazan donde convencen (hero, cierres, sectores, «Por qué creer», pie).

La home es un resumen: cada bloque enlaza a su página completa. El contenido no
se duplica — home y página interior leen del mismo array en `site.ts`.

- **Añadir una solución**: una entrada en `solutions`. Sus `services` deben
  existir y debe aparecer en `problems` al menos una vez (`npm test`). La
  home, `/soluciones`, el pie y el bot la toman solos. Si necesita glifo
  nuevo, se añade un `kind` en `SolutionGlyph`.
- **Añadir un servicio**: una entrada en `services`. La página, el listado, el
  footer y `generateStaticParams` se actualizan solos. `next` debe apuntar a un
  `slug` existente, el servicio debe aparecer en `phases[].services` y, salvo
  Care, en alguna `solution`.
- **Anclajes de `/enfoque`**: se derivan de `phase.title` en minúscula
  (`#ver`, `#entender`, `#transformar`). `/soluciones#slug` y
  `/sectores#id` siguen el mismo patrón. Las secciones llevan `scroll-mt-20`
  para caer bajo la barra fija de 5rem — si cambia la altura del nav, cambia ahí.
- **Publicar un artículo**: una entrada en `posts` (`src/content/recursos.ts`).
  La ruta, el listado, el sitemap, el JSON-LD de `Article`, las migas y los
  enlaces desde cada servicio salen solos. `services` y `related` deben existir.

**SEO** (ver `SEO.md` para el porqué de cada decisión): `sitemap.ts` y
`robots.ts` se derivan de `services`, `posts` y `site.domain` — un servicio o un
artículo nuevo entra solo. Toda página usa `pageMetadata(título, descripción,
ruta)`: sin él Next hereda el `openGraph` del layout y la página se anuncia con
el título de la home, sin canónica y sin imagen.

- Todo el JSON-LD vive en `src/lib/schema.tsx`. La firma se declara **una sola
  vez** en `layout.tsx` con un `@id`; `Service`, `Article` y `FAQPage` la
  referencian con ese id en vez de repetir el bloque.
- Un `<title>` compuesto empieza por la búsqueda y termina por la marca: el
  buscador corta por la derecha. Máx. 75 caracteres con el sufijo del template.
- En las páginas de servicio **la necesidad va antes que la marca**: el H1 es
  `keyword` (lo que se busca) y `Auren Flow` es la cota. Nadie busca «Auren
  Flow».
- Nada marcado como `FAQPage` puede estar oculto: `FaqList` renderiza las
  respuestas abiertas a propósito, no en un acordeón.
- Todo H1 dice a qué se dedica la página, no solo el eslogan. El patrón es
  titular + línea descriptiva dentro del mismo `<h1>`.
- La redirección entre `www` y el dominio desnudo la resuelve **Vercel**, no
  `next.config.ts`. Poner la regla en los dos lados produce un bucle. Hoy
  (7-nov-2026) producción sigue mandando el ápice a `www`, al revés de la
  canónica: pendiente del propietario, ver SEO.md.

`npm test` cubre esas invariantes: slugs únicos y seguros, `next` válido, toda
fase referencia servicios existentes, toda solución tiene servicios y
situación, todo sector enlaza a demos existentes, el menú apunta a rutas
reales, el hero y el contacto no prometen nada gratuito; y del lado SEO, que
todo servicio traiga pasos, sectores, métricas y preguntas, que los títulos y
descripciones quepan y que cada artículo pase de 900 palabras.

**Imágenes**: el sitio no tiene ninguna todavía. El campo `image` es opcional en
servicios, artículos y `about`; mientras no exista, `Figura` no renderiza nada.
Los diagramas propios ocupan su lugar sin que falte nada. Las especificaciones
están en `IMAGENES.md`.

## Reglas de marca (no son decorativas — vienen del brand brief)

- **Nada de colores crudos en los componentes: solo tokens semánticos.**
  `bg-surface`/`-2`/`-3`/`-4`, `text-fg` (en cinco peldaños), `border-line`,
  `card`, `text-accent`. El tema decide qué color crudo toma cada papel.
  Excepción: `marca/page.tsx`, que exhibe la paleta literal.
- **Claro es el tema de la casa; oscuro es completo y opcional.** `data-theme`
  en `<html>` gana; lo escribe `theme-toggle.tsx` y un script en línea en
  `layout.tsx` lo aplica antes de pintar. **El diccionario está en `DESIGN.md`.**
- **`inverse` es la superficie de declaración** (Auren Deep en los dos temas):
  hero, método y cierre. Máximo dos por página, nunca seguidas. Se obtiene con
  `<Section tone="deep">`.
- **Una sola tarjeta: `card`** (plana, filo de 1 px, `rounded-card`). Sin
  `backdrop-filter`, sin resplandores. `glass`/`panel` son alias de legado;
  `glow` es un no-op.
- **`text-accent` existe porque lima nunca es texto sobre marfil**: en claro
  vale Auren Deep. El lima de relleno (`bg-lime`, reglas, el nodo final de un
  diagrama) sí es el mismo en los dos temas.
- **Lima (`#C8F169`) es acento, máx. ~10%.** Un botón `lime` por pantalla, y
  sobre `inverse`. Nunca como texto sobre marfil.
- **Cada recurso gráfico explica algo.** Diagramas de línea propios en
  `diagrams.tsx`, `currentColor`, trazo 1–1,5 px. Nada de iconografía de IA:
  cerebros, circuitos, robots, hologramas, ojos, bombillos.
- **Las cotas (`.cota`, mono con tick) son la etiqueta del sistema.** Índices
  de capítulo, metadatos, pasos. `.label` se conserva para lo que ya lo usaba.
- Serif (`font-serif`) solo en frases estratégicas: la cita del manifiesto,
  `<Em>` y las preguntas de sector/solución. Nunca en párrafos ni interfaz.
- **El único color que no es marca vive en `/demos/*`**: el semáforo operativo.
  Estado = color **más** palabra.
- **Los testimonios con `borrador: true` son texto de ejemplo** y no se
  muestran en la home. Quitar la marca exige nombre y cargo reales.
- **Nada promete un servicio gratuito.** La conversión es «Hablemos de su
  empresa» → `/contacto`, y `/contacto` dice qué pasa después. La Radiografía
  es la alternativa de diez minutos. `npm test` lo verifica en hero y contacto.
- El símbolo no se rota, no se inclina y no cambia de proporciones. **El texto
  del lockup se pone con `<Wordmark>`, nunca a mano.**

## Convenciones de código

- Server Components por defecto. `"use client"` solo donde hay estado real
  (hoy: `contact-form.tsx`, `radiografia-form.tsx`, `chat-widget.tsx`,
  `nav.tsx`, `theme-toggle.tsx`, `motion.tsx` y los demos).
- Nada de hex sueltos en JSX. Excepciones documentadas: `logo.tsx` y
  `opengraph-image.tsx` (renderiza fuera de Tailwind).
- **Animación: CSS para lo que está sobre el pliegue, Motion para el scroll.**
  `.enter` (hero) y `.draw` (diagramas) son CSS: no dependen de un bundle.
  `<Reveal>`, `<RevealList>`/`<RevealItem>`, `<DrawRule>` viven en
  `components/motion.tsx`; son componentes cliente que reciben hijos ya
  renderizados en el servidor. El *reveal* es de 14 px y 0,5 s, sin desenfoque.
- Comentarios `ponytail:` marcan simplificaciones deliberadas y su techo.

## Radiografía Auren

Auto-diagnóstico de 12 preguntas en `/radiografia`. Es el lead magnet: regala
criterio y termina invitando a la llamada que abre el Auren Insight. **Nunca
menciona precio.**

- **Sin persistencia, a propósito.** El resultado vive en el estado de React y
  muere al cerrar la pestaña. Añadir analítica o guardado rompe la promesa
  «sin registro», no solo el código.
- **Añadir o cambiar una pregunta**: una entrada en `questions`. El índice de
  la opción ES su puntaje (0–3). `axis` debe existir en `axes`.
- **Los focos se ordenan por proporción** (`score / max`), no por puntos crudos.
- El puntaje parcial no se muestra.

## Contacto

El formulario **no toca el servidor**: `src/lib/lead.ts` valida, arma el mensaje
y devuelve un enlace `wa.me`; el cliente lo abre en una pestaña nueva. Vive en
`/contacto` junto a los canales directos y a «qué pasa después».

- Cambiar el número o el correo → `site` en `src/content/site.ts`.
- Cambiar el texto que llega al chat → `composeMessage()`.
- `lead.ts` importa `../content/site.ts` en relativo a propósito: también corre
  bajo el runner de Node, que no resuelve el alias `@/`.

## Asistente del chat

Burbuja flotante en todas las páginas (`chat-widget.tsx`, montada en el
layout). Habla con el servicio de `../bot-page` (FastAPI + Claude).

- **El bot no tiene conocimiento propio.** Lee `bot-page/knowledge/auren.md`,
  que genera `npm run build:kb` desde `site.ts`, `recursos.ts` y `demos.ts`
  (incluye soluciones, dimensiones y situaciones). Cambiar un texto del sitio
  y no correr `build:kb` deja al bot contestando lo que la página ya no dice.
- **Los testimonios `borrador` no llegan al bot.**
- **El bot nunca da precios.**
- **Sin persistencia.** La conversación vive en el estado de React.
- **El texto del bot se formatea, no se inyecta** (`src/lib/chat-format.ts`).
  Las raíces de ruta enlazables son una lista explícita (`RAICES`): sección
  nueva en el sitio → se añade ahí (`/soluciones`, `/sectores` y `/contacto`
  ya están).
- `NEXT_PUBLIC_BOT_URL` apunta al servicio; sin ella asume `localhost:8000`.

## Integrar servicios en el futuro

No hay servidor hoy — el sitio es estático completo. Cuando haga falta uno
(CRM, agendamiento, analítica), el patrón es: un módulo por servicio en
`src/lib/`, con una función, un tipo de resultado explícito y el fallo
tratado, nunca silenciado.
