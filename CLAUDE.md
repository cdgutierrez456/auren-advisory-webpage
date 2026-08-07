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
| Cambiar textos, añadir capacidad / producto / principio | `src/content/site.ts` |
| Color, tipografía, escala, ritmo vertical | `@theme` en `src/app/globals.css` |
| El símbolo o el lockup | `src/components/logo.tsx` |
| Botón, sección, encabezado | `src/components/ui.tsx` |
| Una sección de la home | `src/components/sections/*.tsx` |
| El manual de marca público | `src/app/marca/page.tsx` |
| A dónde va un lead | `src/lib/leads.ts` |

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

## Integrar servicios en el futuro

El sitio tiene **un solo punto de contacto con el exterior**: `deliverLead()` en
`src/lib/leads.ts`. Hoy hace POST a `AUREN_LEAD_WEBHOOK` (sirve para Slack, n8n,
Zapier, Make, HubSpot). Para cambiar a Resend, SMTP o la API de un CRM se
reemplaza el cuerpo de esa función y nada más del sitio cambia.

`src/lib/actions.ts` valida en el servidor (frontera de confianza) antes de
llamarla; el honeypot y los límites de longitud viven ahí. Si se añade un
segundo formulario, reutilizar esa validación en vez de duplicarla.

Variables de entorno en `.env.local` (ver `.env.example`).

Cuando aparezca un servicio nuevo (analítica, CMS, agendamiento), crear un
módulo hermano en `src/lib/` con la misma forma: una función, un tipo de
resultado explícito, y el fallo tratado —nunca silenciado.
