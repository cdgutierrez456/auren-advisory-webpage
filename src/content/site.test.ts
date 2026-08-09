import assert from "node:assert/strict";
import test from "node:test";
import { phases, serviceBySlug, services } from "./site.ts";

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
