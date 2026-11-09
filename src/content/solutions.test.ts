import assert from "node:assert/strict";
import test from "node:test";
import { demoBySlug } from "./demos.ts";
import {
  contact,
  dimensions,
  hero,
  nav,
  navCta,
  problems,
  sectors,
  serviceBySlug,
  services,
  solutionBySlug,
  solutions,
} from "./site.ts";

// Las soluciones son el nivel que lee un gerente; los servicios, cómo se
// entregan. Una solución que apunte a un servicio inexistente deja un enlace
// roto en /soluciones, en la home y en el pie, sin que el build se entere.

test("los slugs de solución son únicos y seguros para URL", () => {
  const slugs = solutions.map((s) => s.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const s of slugs) assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/);
});

test("cada solución la ejecuta al menos un servicio existente", () => {
  for (const s of solutions) {
    assert.ok(s.services.length > 0, `${s.slug} no tiene servicios`);
    for (const slug of s.services) {
      assert.ok(serviceBySlug(slug), `solución ${s.slug} → «${slug}» no existe`);
    }
  }
});

test("todo servicio que ejecuta una solución aparece en alguna", () => {
  // Care es continuidad transversal: se nombra en texto, no como ejecutor.
  const referenced = new Set(solutions.flatMap((s) => s.services));
  for (const s of services) {
    if (s.slug === "auren-care") continue;
    assert.ok(referenced.has(s.slug), `${s.slug} no está en ninguna solución`);
  }
});

test("cada solución explica problema, trabajo, resultado y cómo empezar", () => {
  for (const s of solutions) {
    assert.ok(s.problem.length > 120, `${s.slug}: problema demasiado corto`);
    assert.ok(s.symptoms.length >= 3, `${s.slug}: pocos síntomas`);
    assert.ok(s.work.length >= 3, `${s.slug}: pocos pasos`);
    assert.ok(s.outcomes.length >= 3, `${s.slug}: pocos resultados`);
    assert.ok(s.start.length > 60, `${s.slug}: «cómo empezar» vacío`);
    assert.ok(s.question.trim().endsWith("?"), `${s.slug}: la pregunta no es una pregunta`);
  }
});

// Las situaciones de «¿Le suena?» son la entrada por problema.

test("cada situación enruta a una solución existente", () => {
  for (const p of problems) {
    assert.ok(solutionBySlug(p.solution), `«${p.quote}» → «${p.solution}» no existe`);
    assert.ok(p.hint.length > 20, `«${p.quote}» sin pista`);
  }
});

test("toda solución tiene al menos una situación que la nombra", () => {
  const referenced = new Set(problems.map((p) => p.solution));
  for (const s of solutions) {
    assert.ok(referenced.has(s.slug), `${s.slug} no aparece en «¿Le suena?»`);
  }
});

// Sectores: enlazan a servicios y a demos; ambos deben existir.

test("los demos de cada sector existen en el catálogo", () => {
  for (const sector of sectors) {
    assert.ok(sector.demos.length > 0, `${sector.id} no enlaza a ningún demo`);
    for (const slug of sector.demos) {
      assert.ok(demoBySlug(slug), `sector ${sector.id} → demo «${slug}» no existe`);
    }
    assert.ok(sector.opportunities.length >= 3, `${sector.id}: pocas oportunidades`);
    assert.ok(sector.question.trim().endsWith("?"), `${sector.id}: la pregunta no es una pregunta`);
  }
});

// Propuesta de valor: cuatro dimensiones, siempre.

test("la propuesta de valor tiene las cuatro dimensiones del brief", () => {
  assert.deepEqual(
    dimensions.map((d) => d.title),
    ["Estrategia", "Procesos", "Tecnología", "Transformación"],
  );
});

// El hero y el contacto no prometen nada que no exista.

test("el hero dice a qué se dedica la firma y no promete servicios gratuitos", () => {
  assert.match(hero.titleSub, /transformación empresarial/i);
  for (const t of [hero.title, hero.titleSub, hero.lede, hero.primary.label, contact.title, contact.lede]) {
    assert.doesNotMatch(t, /gratis|gratuito|sin costo/i, `«${t}» promete algo gratuito`);
  }
});

test("el menú apunta a rutas del sitio y el botón va a /contacto", () => {
  const rutas = new Set(["/soluciones", "/enfoque", "/sectores", "/nosotros", "/recursos", "/servicios", "/contacto", "/radiografia"]);
  for (const item of nav) assert.ok(rutas.has(item.href), `${item.href} no es una ruta conocida`);
  assert.equal(navCta.href, "/contacto");
});
