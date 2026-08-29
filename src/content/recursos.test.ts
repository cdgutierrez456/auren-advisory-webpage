import assert from "node:assert/strict";
import test from "node:test";
import { fechaLarga, postBySlug, posts, postsByDate } from "./recursos.ts";
import { serviceBySlug } from "./site.ts";

// El listado, las rutas, el sitemap y los enlaces desde cada servicio se
// derivan de `posts`. Un slug repetido o un `related` roto rompe rutas.

test("los slugs son únicos y seguros para URL", () => {
  const slugs = posts.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const s of slugs) assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/);
});

test("cada artículo enlaza a servicios que existen", () => {
  for (const p of posts) {
    assert.ok(p.services.length > 0, `${p.slug} no enlaza a ningún servicio`);
    for (const slug of p.services) {
      assert.ok(serviceBySlug(slug), `${p.slug} → «${slug}» no existe`);
    }
  }
});

test("los artículos relacionados existen y no se apuntan a sí mismos", () => {
  for (const p of posts) {
    for (const slug of p.related) {
      assert.notEqual(slug, p.slug, `${p.slug} se relaciona consigo mismo`);
      assert.ok(postBySlug(slug), `${p.slug} → related «${slug}» no existe`);
    }
  }
});

test("las fechas son ISO y la actualización no precede a la publicación", () => {
  for (const p of posts) {
    assert.match(p.published, /^\d{4}-\d{2}-\d{2}$/, `${p.slug}: fecha inválida`);
    if (p.updated) {
      assert.match(p.updated, /^\d{4}-\d{2}-\d{2}$/, `${p.slug}: actualización inválida`);
      assert.ok(p.updated >= p.published, `${p.slug}: actualizado antes de publicado`);
    }
  }
});

test("la fecha se imprime como día de calendario, sin corrimiento de zona", () => {
  // `new Date("2026-08-12")` es medianoche UTC: en Colombia sería el 11.
  assert.equal(fechaLarga("2026-08-12"), "12 de agosto de 2026");
  assert.equal(fechaLarga("2026-01-01"), "1 de enero de 2026");
  assert.equal(fechaLarga("2026-12-31"), "31 de diciembre de 2026");
});

test("el listado va de más reciente a más antiguo", () => {
  const fechas = postsByDate.map((p) => p.published);
  assert.deepEqual(fechas, [...fechas].sort().reverse());
});

test("la meta description de cada artículo no se corta", () => {
  for (const p of posts) {
    assert.ok(p.description.length <= 160, `${p.slug}: ${p.description.length} caracteres`);
    const titulo = p.seoTitle ?? p.title;
    assert.ok(titulo.length + " — Auren Advisory".length <= 75, `${p.slug}: title muy largo`);
  }
});

test("cada artículo tiene cuerpo suficiente para posicionar", () => {
  for (const p of posts) {
    const palabras = p.sections
      .flatMap((s) => [s.heading, ...s.body, ...(s.list ?? [])])
      .join(" ")
      .split(/\s+/).length;
    assert.ok(palabras >= 900, `${p.slug}: ${palabras} palabras, muy corto`);
    assert.ok(p.faqs.length >= 3, `${p.slug}: pocas preguntas`);
  }
});
