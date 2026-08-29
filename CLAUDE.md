# Auren Advisory — plataforma de presentación

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4. Sin dependencias
fuera de ese núcleo, y así debe seguir salvo razón concreta.

## Comandos

```bash
npm run dev      # desarrollo (turbopack)
npm run build    # build de producción — correr antes de dar algo por terminado
npm start
```

## Dónde va cada cosa

| Necesito… | Toco… |
|---|---|
| Cambiar textos; añadir capacidad, servicio o principio | `src/content/site.ts` |
| Color, tipografía, escala, ritmo vertical | `@theme` en `src/app/globals.css` |
| El símbolo o el lockup | `src/components/logo.tsx` |
| Botón, sección, encabezado, apertura de página, CTA | `src/components/ui.tsx` |
| Una sección de la home | `src/components/sections/*.tsx` |
| El método (Ver/Entender/Transformar) | `phases` y `method` en `site.ts` |
| La página de un servicio | `src/app/servicios/[slug]/page.tsx` (plantilla única) |
| Historia de la firma | `about` en `site.ts` → `src/app/nosotros/page.tsx` |
| El manual de marca público | `src/app/marca/page.tsx` |
| Validación y mensaje de contacto | `src/lib/lead.ts` |
| Preguntas, ejes, bandas y textos de la Radiografía | `src/content/radiografia.ts` |
| Cómo se puntúa la Radiografía | `src/lib/radiografia.ts` |
| Título, descripción y canónica de una página | `pageMetadata()` en `src/lib/seo.ts` |
| Datos estructurados (JSON-LD) de cualquier tipo | `src/lib/schema.tsx` |
| Publicar un artículo; editar uno | `posts` en `src/content/recursos.ts` |
| Sectores y preguntas frecuentes de la home | `sectors` y `homeFaqs` en `site.ts` |
| Pasos, industrias, métricas o preguntas de un servicio | la entrada en `services` |
| La imagen que se ve al compartir | `src/app/opengraph-image.tsx` |
| Número de WhatsApp, correo, dominio | `site` en `src/content/site.ts` |

### Rutas

`/` · `/enfoque` · `/servicios` · `/servicios/[slug]` (8, prerenderizadas) ·
`/recursos` · `/recursos/[slug]` · `/radiografia` · `/nosotros` · `/marca` ·
`/demos/*` (en `noindex`, fuera del sitemap)

La home es un resumen: cada bloque enlaza a su página completa. El contenido no
se duplica — home y página interior leen del mismo array en `site.ts`.

- **Añadir un servicio**: una entrada en `services`. La página, el listado, el
  footer y `generateStaticParams` se actualizan solos. `next` debe apuntar a un
  `slug` existente y el servicio debe aparecer en `phases[].services`.
- **Anclajes de `/enfoque`**: se derivan de `phase.title` en minúscula
  (`#ver`, `#entender`, `#transformar`). Las secciones llevan `scroll-mt-20`
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
  referencian con ese id en vez de repetir el bloque. Repetirlo le daría al
  buscador varias entidades parecidas en lugar de una con más señales.
- Un `<title>` compuesto empieza por la búsqueda y termina por la marca: el
  buscador corta por la derecha. Máx. 75 caracteres con el sufijo del template.
- Nada marcado como `FAQPage` puede estar oculto: `FaqList` renderiza las
  respuestas abiertas a propósito, no en un acordeón.
- Todo H1 dice a qué se dedica la página, no solo el eslogan. El patrón es
  nombre o frase de marca + línea descriptiva dentro del mismo `<h1>`.
- `next.config.ts` redirige `www` al dominio desnudo con 301. Esa regla la
  ejecuta el servidor de Next: bajo un CDN estático hay que replicarla ahí.

`npm test` cubre esas invariantes: slugs únicos y seguros, `next` válido, toda
fase referencia servicios existentes y todo servicio vive en alguna fase; y del
lado SEO, que todo servicio traiga pasos, sectores, métricas y preguntas, que
los títulos y descripciones quepan, que las preguntas tengan respuesta de
verdad y que cada artículo pase de 900 palabras y enlace a servicios que
existen.

**Imágenes**: el sitio no tiene ninguna todavía. El campo `image` es opcional en
servicios, artículos y `about`; mientras no exista, `Figura` no renderiza nada.
Las especificaciones, rutas y textos alternativos están en `IMAGENES.md`.

## Reglas de marca (no son decorativas — vienen del brand brief)

- **Lima (`#C8F169`) es acento, máx. ~10% de la composición.** Nunca como texto
  sobre marfil: solo forma, regla, trazo o acento sobre fondo oscuro.
- La base la construyen Auren Deep y Auren Black; el marfil aporta espacio.
- Serif (`font-serif`) solo en frases estratégicas. Nunca en párrafos ni interfaz.
- Nada de iconografía de IA: cerebros, circuitos, robots, hologramas, ojos,
  bombillos. La marca es tecnológica por precisión, no por iconos.
- El símbolo no se rota, no se inclina y no cambia de proporciones. Cualquier
  aplicación nueva deriva de las coordenadas en `logo.tsx`.

## Convenciones de código

- Server Components por defecto. `"use client"` solo donde hay estado real
  (hoy: `contact-form.tsx`).
- Nada de hex sueltos en JSX: usar los tokens (`bg-deep`, `text-lime`, …).
  Excepción documentada: `logo.tsx`, que es la fuente de verdad del símbolo.
- Animación con CSS nativo (`animation-timeline: view()`, clase `.reveal`),
  degradando a contenido visible donde no haya soporte. No añadir una librería
  de animación para esto.
- Comentarios `ponytail:` marcan simplificaciones deliberadas y su techo.

## Radiografía Auren

Auto-diagnóstico de 12 preguntas en `/radiografia`. Es el lead magnet: regala
criterio y termina invitando a la llamada de 20 minutos que abre el Auren
Insight. **Nunca menciona precio.**

- **Sin persistencia, a propósito.** El resultado vive en el estado de React y
  muere al cerrar la pestaña. No hay red, ni backend, ni dato guardado sin que
  la persona lo entregue — la página lo promete («sin registro»), así que
  añadir analítica o guardado rompe esa promesa, no solo el código.
- **Añadir o cambiar una pregunta**: una entrada en `questions`. El índice de
  la opción ES su puntaje (0–3), por eso siempre son cuatro y van de menor a
  mayor fuga. `axis` debe existir en `axes`.
- **Los focos se ordenan por proporción** (`score / max`), no por puntos
  crudos: hay ejes de dos preguntas (máx. 6) y de una (máx. 3), y el orden
  crudo escondería siempre a los de una.
- El puntaje parcial no se muestra: engañaría (pocas respondidas = puntaje
  bajo = «base sólida»). Solo la barra de progreso, y el resultado al llegar a 12.

`npm test` cubre el puntaje: bandas sin huecos en 0–36, respuestas corruptas
descartadas, y que un eje de una pregunta pueda ganarle a uno de dos.

## Contacto

El formulario **no toca el servidor**: `src/lib/lead.ts` valida, arma el mensaje
y devuelve un enlace `wa.me`; el cliente lo abre en una pestaña nueva. No hay
backend, ni base de datos, ni lead que se pueda perder en silencio.

- Cambiar el número o el correo → `site` en `src/content/site.ts`. `whatsapp`
  va sin `+` ni espacios (formato que exige wa.me); `whatsappDisplay` es lo que
  ve la persona.
- Cambiar el texto que llega al chat → `composeMessage()`.
- `lead.ts` importa `../content/site.ts` en relativo a propósito: también corre
  bajo el runner de Node, que no resuelve el alias `@/`.

Verificado con `npm test`: campos vacíos no abren nada, y el enlace apunta al
número correcto con el texto codificado.

## Integrar servicios en el futuro

No hay servidor hoy — el sitio es estático completo. Cuando haga falta uno
(guardar los leads en un CRM, agendamiento, analítica), el patrón es: un módulo
por servicio en `src/lib/`, con una función, un tipo de resultado explícito y el
fallo tratado, nunca silenciado. Si el contacto pasa a tener backend, la
validación de `lead.ts` se reutiliza en el servidor: es pura a propósito.
