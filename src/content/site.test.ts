import assert from "node:assert/strict";
import test from "node:test";
import { homeFaqs, phases, sectors, serviceBySlug, services, site } from "./site.ts";

// El listado, el footer y generateStaticParams se derivan de `services`.
// Un slug duplicado o un `next` roto rompe rutas en silencio.

test("los slugs son únicos", () => {
  const slugs = services.map((s) => s.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("cada `next` apunta a un servicio existente", () => {
  for (const s of services) {
    assert.ok(serviceBySlug(s.next), `${s.slug}.next → «${s.next}» no existe`);
  }
});

test("ningún servicio se apunta a sí mismo como paso siguiente", () => {
  for (const s of services) assert.notEqual(s.next, s.slug);
});

test("los slugs son seguros para URL", () => {
  for (const s of services) assert.match(s.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/);
});

// /enfoque enlaza a los servicios de cada fase, y la home y /servicios enlazan
// de vuelta a los anclajes de /enfoque.

test("cada fase referencia servicios existentes", () => {
  for (const phase of phases) {
    for (const slug of phase.services) {
      assert.ok(serviceBySlug(slug), `fase ${phase.title} → «${slug}» no existe`);
    }
  }
});

test("todo servicio aparece en alguna fase del método", () => {
  const referenced = new Set(phases.flatMap((p) => p.services));
  for (const s of services) {
    assert.ok(referenced.has(s.slug), `${s.slug} no está en ninguna fase`);
  }
});

test("los anclajes de fase son únicos y seguros para URL", () => {
  const anchors = phases.map((p) => p.title.toLowerCase());
  assert.equal(new Set(anchors).size, anchors.length);
  for (const a of anchors) assert.match(a, /^[a-z]+$/);
});

// Campos de SEO: si falta uno, la página se publica sin H1 descriptivo o sin
// preguntas, y eso no rompe el build — solo el posicionamiento, en silencio.

test("todo servicio trae los campos que alimentan el <title> y el H1", () => {
  for (const s of services) {
    assert.ok(s.keyword.length > 10, `${s.slug}: keyword vacía o muy corta`);
    assert.ok(s.headline.length > 20, `${s.slug}: headline vacía o muy corta`);
  }
});

test("el <title> de un servicio cabe en lo que muestra el buscador", () => {
  // `${keyword} | ${name}` + " — Auren Advisory" del template del layout.
  const SUFIJO = " — Auren Advisory".length;
  for (const s of services) {
    const largo = `${s.keyword} | ${s.name}`.length + SUFIJO;
    assert.ok(largo <= 75, `${s.slug}: title de ${largo} caracteres, se corta feo`);
  }
});

test("la meta description de un servicio no se corta", () => {
  for (const s of services) {
    assert.ok(s.summary.length <= 160, `${s.slug}: summary de ${s.summary.length} caracteres`);
  }
});

test("todo servicio trae pasos, sectores, métricas y preguntas", () => {
  for (const s of services) {
    assert.ok(s.steps.length >= 3, `${s.slug}: pocos pasos`);
    assert.ok(s.industries.length >= 3, `${s.slug}: pocos sectores`);
    assert.ok(s.measures.length >= 3, `${s.slug}: pocas métricas`);
    // Menos de tres preguntas no justifica el JSON-LD de FAQPage.
    assert.ok(s.faqs.length >= 3, `${s.slug}: pocas preguntas`);
  }
});

test("ninguna pregunta se queda sin respuesta", () => {
  const todas = [...services.flatMap((s) => s.faqs), ...homeFaqs];
  for (const f of todas) {
    assert.ok(f.q.trim().endsWith("?"), `«${f.q}» no es una pregunta`);
    assert.ok(f.a.length > 80, `«${f.q}»: respuesta demasiado corta para servir`);
  }
});

test("los sectores enlazan a servicios existentes", () => {
  for (const sector of sectors) {
    assert.ok(sector.services.length > 0, `${sector.id} no enlaza a ningún servicio`);
    for (const slug of sector.services) {
      assert.ok(serviceBySlug(slug), `sector ${sector.id} → «${slug}» no existe`);
    }
  }
});

test("la meta description del sitio cabe en el resultado de búsqueda", () => {
  assert.ok(site.description.length <= 160, `${site.description.length} caracteres`);
});
