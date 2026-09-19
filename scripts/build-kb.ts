/**
 * Genera la base de conocimiento del bot a partir del contenido del sitio.
 *
 * El bot no puede tener su propia copia a mano de lo que dice la web: se
 * desincroniza al primer cambio de texto y empieza a contestar cosas que la
 * página ya no dice. Esto lee los mismos arrays que renderizan las páginas y
 * escribe un Markdown plano que el servicio de Python carga como contexto.
 *
 *   npm run build:kb
 *
 * Qué NO entra, y por qué:
 * — Testimonios con `borrador: true`: son texto de ejemplo. Un bot citándolos
 *   como reales es publicidad engañosa, no un placeholder.
 * — Precios: no existen en el sitio y el bot no los debe inventar.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  about,
  capabilities,
  contact,
  hero,
  homeFaqs,
  manifesto,
  method,
  phases,
  principles,
  sectors,
  services,
  site,
  testimonials,
} from "../src/content/site.ts";
import { posts } from "../src/content/recursos.ts";
import { demos } from "../src/content/demos.ts";

const out: string[] = [];
const w = (...lines: string[]) => out.push(...lines, "");
const bullets = (items: readonly string[]) => items.map((i) => `- ${i}`).join("\n");

// ── Identidad ────────────────────────────────────────────────────────────────
w(`# ${site.name} — base de conocimiento`);
w(
  `> Generado desde el contenido del sitio (\`npm run build:kb\`). No editar a mano.`,
);
w(`## La firma`);
w(
  `**${site.name}** — ${site.tagline}`,
  ``,
  site.descriptionLong,
  ``,
  bullets([
    `Sitio web: https://${site.domain}`,
    `Ciudad: ${site.city}, ${site.region}, Colombia`,
    `Correos de contacto: ${site.emails.join(" · ")}`,
    `WhatsApp: ${site.whatsappDisplay} (enlace: https://wa.me/${site.whatsapp})`,
    `Formulario de contacto: https://${site.domain}/#contacto`,
    `Autodiagnóstico gratuito «Radiografía Auren»: https://${site.domain}/radiografia (12 preguntas, 10 minutos, sin registro)`,
  ]),
);

w(`### Qué decimos de nosotros`);
w(hero.lede, ``, `> ${manifesto.quote}`, ``, manifesto.body.join("\n\n"));

// ── Método ───────────────────────────────────────────────────────────────────
w(`## El método: ${site.tagline}`);
w(method.lede, ``, `### ${method.order.title}`, ``, method.order.body.join("\n\n"));

for (const p of phases) {
  w(`### Fase ${p.index} — ${p.title}`);
  w(
    `**${p.claim}** ${p.detail}`,
    ``,
    `Pregunta que responde: *${p.question}*`,
    ``,
    p.body.join("\n\n"),
    ``,
    `Qué incluye:`,
    bullets(p.points),
    ``,
    `Resultado de la fase: ${p.output}`,
    `Servicios que la ejecutan: ${p.services.join(", ")}`,
  );
}

w(`### Qué previene este orden`);
w(method.avoids.map((a) => `- **${a.title}** — ${a.body}`).join("\n"));

// ── Servicios ────────────────────────────────────────────────────────────────
w(`## Servicios`);
w(
  `Son ocho y forman un solo sistema. Cada uno tiene página propia en ` +
    `https://${site.domain}/servicios/<slug>.`,
);

for (const s of services) {
  w(`### ${s.name} — ${s.kind}`);
  w(
    bullets([
      `Slug / URL: https://${site.domain}/servicios/${s.slug}`,
      `En una línea: ${s.summary}`,
      `Entregable: ${s.deliverable}`,
      `Duración de referencia: ${s.duration} (referencia de mercado, NO un compromiso comercial)`,
      `Paso siguiente natural: ${s.next}`,
    ]),
    ``,
    s.lede,
    ``,
    s.body.join("\n\n"),
  );
  w(`**Cuándo tiene sentido contratarlo**`, bullets(s.signals));
  w(`**Qué incluye**`, bullets(s.includes));
  w(`**Con qué se queda el cliente**`, bullets(s.outcome));
  w(
    `**Cómo trabajamos, paso a paso**`,
    s.steps.map((st, i) => `${i + 1}. **${st.title}** — ${st.body}`).join("\n"),
  );
  w(
    `**Dónde aplica**`,
    s.industries.map((ind) => `- **${ind.sector}** — ${ind.body}`).join("\n"),
  );
  w(`**Qué se mide**`, bullets(s.measures));
  w(
    `**Preguntas frecuentes de ${s.name}**`,
    s.faqs.map((f) => `**P: ${f.q}**\nR: ${f.a}`).join("\n\n"),
  );
}

// ── Capacidades y sectores ───────────────────────────────────────────────────
w(`## Capacidades técnicas`);
w(capabilities.map((c) => `- **${c.title}** — ${c.description}`).join("\n"));

w(`## Sectores donde trabajamos`);
for (const sec of sectors) {
  w(
    `### ${sec.title}`,
    sec.body,
    ``,
    `Procesos concretos donde entramos:`,
    bullets(sec.cases),
    ``,
    `Servicios asociados: ${sec.services.join(", ")}`,
  );
}

// ── Nosotros ─────────────────────────────────────────────────────────────────
w(`## Nosotros — https://${site.domain}/nosotros`);
w(about.lede, ``, about.origin.join("\n\n"));
w(
  `### Los dos socios fundadores`,
  `Auren es de estas dos personas. Sus correos son personales, uno por socio: ` +
    `escribirles es hablar directamente con un fundador.`,
  ``,
  about.founders
    .map((f) => `- **${f.name}** — ${f.role}. Correo directo: ${f.email}`)
    .join("\n"),
);
w(
  `### Datos de la firma`,
  bullets(about.facts.map((f) => `${f.k}: ${f.v}`)),
);
w(
  `### Cómo combinamos conocimiento`,
  about.disciplines.map((d) => `- **${d.title}** — ${d.body}`).join("\n"),
);
w(`### Lo que NO hacemos (límites explícitos)`, bullets(about.boundaries));
w(`### ${about.region.title}`, about.region.body);
w(`### Principios`, principles.map((p) => `- **${p.title}** — ${p.body}`).join("\n"));

// ── Demos ────────────────────────────────────────────────────────────────────
w(`## Demos en vivo — https://${site.domain}/demos`);
w(
  `Piezas demostrables de cada servicio. Funcionan en el navegador, sin backend ` +
    `y con datos de ejemplo: no son datos reales de ningún cliente. Se comparten ` +
    `por enlace directo.`,
);
for (const d of demos) {
  w(
    `### ${d.nombre} (${d.servicioNombre} · ${d.segmento})`,
    bullets([
      `URL: https://${site.domain}/demos/${d.slug}`,
      `Qué se ve: ${d.resumen}`,
      `El dolor que resuelve: ${d.dolor}`,
      `Límite declarado del demo: ${d.limite}`,
    ]),
  );
}

// ── Artículos ────────────────────────────────────────────────────────────────
w(`## Artículos publicados — https://${site.domain}/recursos`);
for (const post of posts) {
  w(
    `### ${post.title}`,
    bullets([
      `URL: https://${site.domain}/recursos/${post.slug}`,
      `Publicado: ${post.published} · ${post.minutes} min de lectura`,
      `Servicios relacionados: ${post.services.join(", ")}`,
    ]),
    ``,
    post.lede,
    ``,
    `Contenido:`,
    post.sections
      .map((sec) => `- **${sec.heading}** — ${sec.body[0] ?? ""}`)
      .join("\n"),
  );
  if (post.faqs.length) {
    w(post.faqs.map((f) => `**P: ${f.q}**\nR: ${f.a}`).join("\n\n"));
  }
}

// ── FAQ general ──────────────────────────────────────────────────────────────
w(`## Preguntas frecuentes generales`);
w(homeFaqs.map((f) => `**P: ${f.q}**\nR: ${f.a}`).join("\n\n"));

// ── Contacto ─────────────────────────────────────────────────────────────────
w(`## Cómo nos contactan`);
w(
  `${contact.title} ${contact.lede}`,
  ``,
  bullets([
    `WhatsApp (el canal más rápido): https://wa.me/${site.whatsapp} — ${site.whatsappDisplay}`,
    `Formulario en la web: https://${site.domain}/#contacto`,
    `Correo: ${site.emails.join(" o ")}`,
    `Antes de hablar con alguien: la Radiografía Auren en https://${site.domain}/radiografia da un diagnóstico estimado en 10 minutos, sin registro y sin costo.`,
  ]),
);

// Los testimonios reales entran; los `borrador` son texto de ejemplo y quedan
// fuera a propósito — ver el encabezado de este archivo.
const reales = testimonials.filter((t) => !t.borrador);
if (reales.length) {
  w(`## Testimonios de clientes`);
  w(reales.map((t) => `> «${t.quote}»\n> — ${t.name}, ${t.role}`).join("\n\n"));
}

const here = dirname(fileURLToPath(import.meta.url));
const target =
  process.argv[2] ?? resolve(here, "../../bot-page/knowledge/auren.md");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n");

const texto = out.join("\n");
console.log(
  `✓ ${target}\n  ${texto.length.toLocaleString("es-CO")} caracteres · ` +
    `${services.length} servicios · ${demos.length} demos · ${posts.length} artículos · ` +
    `${reales.length}/${testimonials.length} testimonios (los borradores se excluyen)`,
);
