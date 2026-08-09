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
| Número de WhatsApp, correo, dominio | `site` en `src/content/site.ts` |

### Rutas

`/` · `/enfoque` · `/servicios` · `/servicios/[slug]` (8, prerenderizadas) ·
`/nosotros` · `/marca`

La home es un resumen: cada bloque enlaza a su página completa. El contenido no
se duplica — home y página interior leen del mismo array en `site.ts`.

- **Añadir un servicio**: una entrada en `services`. La página, el listado, el
  footer y `generateStaticParams` se actualizan solos. `next` debe apuntar a un
  `slug` existente y el servicio debe aparecer en `phases[].services`.
- **Anclajes de `/enfoque`**: se derivan de `phase.title` en minúscula
  (`#ver`, `#entender`, `#transformar`). Las secciones llevan `scroll-mt-20`
  para caer bajo la barra fija de 5rem — si cambia la altura del nav, cambia ahí.

`npm test` cubre esas invariantes: slugs únicos y seguros, `next` válido, toda
fase referencia servicios existentes y todo servicio vive en alguna fase.

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
