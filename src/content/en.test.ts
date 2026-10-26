import assert from "node:assert/strict";
import test from "node:test";
import * as demosEs from "./demos.ts";
import { checklist, grupos, vehiculos } from "./demo-data.ts";
import { DATOS_EN } from "./en/demo-data.ts";
import * as demosEn from "./en/demos.ts";
import * as radiografiaEn from "./en/radiografia.ts";
import * as recursosEn from "./en/recursos.ts";
import * as siteEn from "./en/site.ts";
import * as radiografiaEs from "./radiografia.ts";
import * as recursosEs from "./recursos.ts";
import * as siteEs from "./site.ts";
import { TERMINOS, entidad, radicados } from "./terminos.ts";

// La edición en inglés espeja la española. Si se desincronizan, el sitio en
// inglés enlaza a un servicio que no existe, puntúa la Radiografía distinto o
// le muestra al buscador una página gemela con otra estructura.

/**
 * Lo que NO se traduce: identidades, rutas y referencias. Todo lo demás
 * (textos) solo tiene que tener la misma forma.
 */
const IDENTIDAD = new Set([
  "slug", "href", "services", "related", "id", "index", "servicio", "axis",
  "email", "emails", "domain", "whatsapp", "whatsappDisplay", "published",
  "updated", "minutes", "min", "priority", "insightBridge", "borrador", "service",
  "insightHref", "city", "region", "lat", "lng", "servicioNombre",
]);

function mismaForma(es: unknown, en: unknown, ruta: string, clave = ""): void {
  if (typeof es === "function") return;
  if (Array.isArray(es)) {
    assert.ok(Array.isArray(en), `${ruta}: debería ser lista`);
    assert.equal(en.length, es.length, `${ruta}: ${es.length} en español, ${en.length} en inglés`);
    es.forEach((v, i) => mismaForma(v, en[i], `${ruta}[${i}]`, clave));
    return;
  }
  if (es && typeof es === "object") {
    assert.ok(en && typeof en === "object", `${ruta}: debería ser objeto`);
    assert.deepEqual(
      Object.keys(en).sort(),
      Object.keys(es).sort(),
      `${ruta}: campos distintos`,
    );
    for (const k of Object.keys(es)) {
      mismaForma((es as Record<string, unknown>)[k], (en as Record<string, unknown>)[k], `${ruta}.${k}`, k);
    }
    return;
  }
  if (typeof es === "string" && !IDENTIDAD.has(clave)) {
    assert.equal(typeof en, "string", `${ruta}: debería ser texto`);
    assert.ok((en as string).trim(), `${ruta}: texto vacío en inglés`);
    return;
  }
  assert.deepEqual(en, es, `${ruta}: «${String(es)}» no se traduce, debe ser igual`);
}

const pares = [
  ["site", siteEs, siteEn],
  ["recursos", recursosEs, recursosEn],
  ["radiografia", radiografiaEs, radiografiaEn],
  ["demos", demosEs, demosEn],
] as const;

for (const [nombre, es, en] of pares) {
  test(`${nombre}: el inglés tiene la misma forma y las mismas referencias`, () => {
    const exportsEs = Object.keys(es).filter((k) => typeof (es as Record<string, unknown>)[k] !== "function");
    for (const k of exportsEs) {
      assert.ok(k in en, `${nombre}.${k} no existe en inglés`);
      mismaForma((es as Record<string, unknown>)[k], (en as Record<string, unknown>)[k], `${nombre}.${k}`);
    }
  });
}

test("los nombres propios no se traducen: servicios, socios y la firma", () => {
  assert.deepEqual(
    siteEn.services.map((s) => s.name),
    siteEs.services.map((s) => s.name),
  );
  assert.deepEqual(
    siteEn.about.founders.map((f) => f.name),
    siteEs.about.founders.map((f) => f.name),
  );
  assert.equal(siteEn.site.name, siteEs.site.name);
  // `next` es un slug: el mismo recorrido en los dos idiomas.
  assert.deepEqual(
    siteEn.services.map((s) => s.next),
    siteEs.services.map((s) => s.next),
  );
});

// Los mismos límites de SEO que en español: el buscador corta igual en inglés.

test("los <title> y descripciones en inglés caben en el resultado de búsqueda", () => {
  const SUFIJO = " — Auren Advisory".length;
  for (const s of siteEn.services) {
    const largo = `${s.keyword} | ${s.name}`.length + SUFIJO;
    assert.ok(largo <= 75, `${s.slug}: title de ${largo} caracteres`);
    assert.ok(s.summary.length <= 160, `${s.slug}: summary de ${s.summary.length} caracteres`);
  }
  assert.ok(siteEn.site.description.length <= 160, "site.description muy larga");
  for (const p of recursosEn.posts) {
    assert.ok(p.description.length <= 160, `${p.slug}: description de ${p.description.length}`);
    assert.ok((p.seoTitle ?? p.title).length + SUFIJO <= 75, `${p.slug}: title muy largo`);
  }
});

test("las preguntas en inglés son preguntas y tienen respuesta", () => {
  const todas = [
    ...siteEn.services.flatMap((s) => s.faqs),
    ...siteEn.homeFaqs,
    ...recursosEn.posts.flatMap((p) => p.faqs),
  ];
  for (const f of todas) {
    assert.ok(f.q.trim().endsWith("?"), `«${f.q}» no es una pregunta`);
    assert.ok(f.a.length > 80, `«${f.q}»: respuesta demasiado corta`);
  }
});

test("los anclajes de fase en inglés son únicos y seguros para URL", () => {
  const anchors = siteEn.phases.map((p) => p.title.toLowerCase());
  assert.equal(new Set(anchors).size, anchors.length);
  for (const a of anchors) assert.match(a, /^[a-z]+$/);
});

test("cada artículo en inglés tiene cuerpo suficiente para posicionar", () => {
  // Un poco menos que en español (900): el inglés dice lo mismo con ~10%
  // menos palabras, y la traducción no debe rellenarse para pasar el umbral.
  for (const p of recursosEn.posts) {
    const palabras = p.sections
      .flatMap((s) => [s.heading, ...s.body, ...(s.list ?? [])])
      .join(" ")
      .split(/\s+/).length;
    assert.ok(palabras >= 800, `${p.slug}: ${palabras} palabras`);
  }
});

test("la fecha en inglés también es un día de calendario", () => {
  assert.equal(recursosEn.fechaLarga("2026-08-12"), "August 12, 2026");
  assert.equal(recursosEn.fechaLarga("2026-01-01"), "January 1, 2026");
});

// Los datos de los demos viven en español y se traducen por texto: uno nuevo
// sin su entrada en DATOS_EN aparecería en español en la versión inglesa.

test("todo dato sembrado de los demos tiene su versión en inglés", () => {
  const textos = [
    ...grupos,
    ...checklist.map((i) => i.texto),
    ...vehiculos.map((v) => v.tipo),
    ...Object.values(TERMINOS).map((t) => t.etiqueta),
    entidad.nombre,
    ...entidad.dependencias,
    ...radicados.flatMap((r) => [r.asunto, r.canal]),
  ];
  const faltan = [...new Set(textos)].filter((t) => !(t in DATOS_EN));
  assert.deepEqual(faltan, [], "sin traducción en DATOS_EN");
});
