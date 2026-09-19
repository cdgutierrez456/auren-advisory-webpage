import assert from "node:assert/strict";
import { test } from "node:test";

import { formatear, type Trozo } from "./chat-format.ts";

/** Aplana un resultado a algo legible en el mensaje de error de un assert. */
const plano = (trozos: readonly Trozo[]) =>
  trozos.map((t) => (t.tipo === "enlace" ? `[${t.texto}](${t.href})` : t.tipo === "negrita" ? `**${t.texto}**` : t.texto)).join("");

test("los asteriscos se vuelven negrita, no se ven en pantalla", () => {
  const [bloque] = formatear("La **Radiografía Auren** es gratis.");
  assert.equal(bloque.tipo, "parrafo");
  assert.deepEqual(bloque.tipo === "parrafo" ? [...bloque.trozos] : [], [
    { tipo: "texto", texto: "La " },
    { tipo: "negrita", texto: "Radiografía Auren" },
    { tipo: "texto", texto: " es gratis." },
  ]);
});

test("el enlace con etiqueta se integra en la frase", () => {
  const [bloque] = formatear("Empieza por la [Radiografía Auren](/radiografia), son 10 minutos.");
  assert.equal(
    plano(bloque.tipo === "parrafo" ? bloque.trozos : []),
    "Empieza por la [Radiografía Auren](/radiografia), son 10 minutos.",
  );
});

test("una ruta pelada recibe etiqueta legible, no la ruta cruda", () => {
  // «Está en /servicios/auren-flow» corta la lectura: nadie lee rutas.
  const [bloque] = formatear("Está en /servicios/auren-flow y listo.");
  const enlace = (bloque.tipo === "parrafo" ? bloque.trozos : []).find((t) => t.tipo === "enlace");
  assert.deepEqual(enlace, {
    tipo: "enlace",
    texto: "Auren Flow",
    href: "/servicios/auren-flow",
    externo: false,
  });
});

test("cada ruta conocida tiene su nombre en castellano", () => {
  const casos: [string, string][] = [
    ["/radiografia", "Radiografía Auren"],
    ["/demos", "los demos"],
    ["/#contacto", "el formulario de contacto"],
    ["/servicios/auren-vision", "Auren Vision"],
    ["https://wa.me/573206548168", "WhatsApp"],
  ];
  for (const [ruta, esperado] of casos) {
    const [b] = formatear(`Mira ${ruta} ya.`);
    const e = (b.tipo === "parrafo" ? b.trozos : []).find((t) => t.tipo === "enlace");
    assert.equal(e?.texto, esperado, `${ruta} debería llamarse «${esperado}»`);
  }
});

test("un destino inventado pierde el enlace pero conserva el texto", () => {
  // El modelo puede inventarse una ruta. Un 404 desde el chat es peor que
  // texto plano, así que el enlace muerto no se pinta.
  const [bloque] = formatear("Ve a [nuestros precios](/precios) ahora.");
  const trozos = bloque.tipo === "parrafo" ? bloque.trozos : [];
  assert.equal(trozos.filter((t) => t.tipo === "enlace").length, 0);
  assert.equal(plano(trozos), "Ve a nuestros precios ahora.");
});

test("una URL externa se marca como externa y suelta la puntuación final", () => {
  const [bloque] = formatear("Escríbenos: https://wa.me/573206548168.");
  const trozos = bloque.tipo === "parrafo" ? bloque.trozos : [];
  assert.deepEqual(trozos[1], {
    tipo: "enlace",
    texto: "WhatsApp",
    href: "https://wa.me/573206548168",
    externo: true,
  });
  // El punto es de la frase, no del número de WhatsApp.
  assert.deepEqual(trozos[2], { tipo: "texto", texto: "." });
});

test("un paréntesis de cierre no se cuela dentro de la ruta", () => {
  // Sin duplicado que fusionar, el paréntesis se conserva tal cual.
  const [bloque] = formatear("Nos vemos en el patio (/demos) mañana.");
  assert.equal(
    plano(bloque.tipo === "parrafo" ? bloque.trozos : []),
    "Nos vemos en el patio ([los demos](/demos)) mañana.",
  );
});

test("«Nombre (Nombre)» se funde en un solo enlace, y hereda la negrita", () => {
  // El bot escribe «**Auren Insight** (/servicios/auren-insight)» y nuestra
  // etiqueta automática reponía el nombre: se leía «Auren Insight (Auren
  // Insight)». Queda un único enlace, en negrita.
  const [bloque] = formatear("El punto de entrada es **Auren Insight** (/servicios/auren-insight), el diagnóstico.");
  const trozos = bloque.tipo === "parrafo" ? bloque.trozos : [];

  assert.equal(trozos.filter((t) => t.tipo === "negrita").length, 0, "la negrita se absorbió");
  const enlace = trozos.find((t) => t.tipo === "enlace");
  assert.equal(enlace?.texto, "Auren Insight");
  assert.equal(enlace?.fuerte, true, "el enlace conserva el peso del nombre");
  assert.equal(plano(trozos), "El punto de entrada es [Auren Insight](/servicios/auren-insight), el diagnóstico.");
});

test("el artículo se queda fuera del enlace, y no se come el espacio", () => {
  const [bloque] = formatear("escribe por WhatsApp (https://wa.me/573206548168) o deja tus datos en el formulario (/#contacto).");
  assert.equal(
    plano(bloque.tipo === "parrafo" ? bloque.trozos : []),
    "escribe por [WhatsApp](https://wa.me/573206548168) o deja tus datos en el [formulario de contacto](/#contacto).",
  );
});

test("una ruta dentro de una URL no se parte en dos enlaces", () => {
  const [bloque] = formatear("Ver https://aurenadv.com/servicios/auren-vision hoy.");
  const enlaces = (bloque.tipo === "parrafo" ? bloque.trozos : []).filter((t) => t.tipo === "enlace");
  assert.equal(enlaces.length, 1, "la ruta de dentro de la URL no es un enlace aparte");
  assert.equal(enlaces[0].href, "https://aurenadv.com/servicios/auren-vision");
});

test("una barra que no es ruta se queda como texto", () => {
  // Con un /\w+/ suelto, «24/7» y «y/o» se volverían enlaces rotos.
  const [bloque] = formatear("Atendemos 24/7 y/o por correo.");
  const trozos = bloque.tipo === "parrafo" ? bloque.trozos : [];
  assert.equal(trozos.filter((t) => t.tipo === "enlace").length, 0);
});

test("las viñetas se agrupan en una lista, con su formato dentro", () => {
  const bloques = formatear(
    ["El camino:", "", "- **Auren Insight**: el diagnóstico en /servicios/auren-insight", "- **Auren Flow**: automatización", "", "Eso es todo."].join("\n"),
  );

  assert.deepEqual(bloques.map((b) => b.tipo), ["parrafo", "lista", "parrafo"]);

  const lista = bloques[1];
  assert.equal(lista.tipo === "lista" ? lista.items.length : 0, 2);
  assert.equal(
    plano(lista.tipo === "lista" ? lista.items[0] : []),
    "**Auren Insight**: el diagnóstico en [Auren Insight](/servicios/auren-insight)",
  );
});

test("una lista numerada no se fusiona en un párrafo corrido", () => {
  // El bot enumera con «1. », «2. »… y sin reconocerlo los cuatro pasos salían
  // pegados en un solo bloque de texto.
  const bloques = formatear(
    ["El camino:", "1. **Auren Insight** (/servicios/auren-insight) — el diagnóstico.", "2. **Auren Blueprint** — el plan.", "3. **Auren Transform** — la ejecución."].join("\n"),
  );

  const lista = bloques.find((b) => b.tipo === "lista");
  assert.ok(lista, "los pasos numerados deben formar una lista");
  assert.equal(lista.tipo === "lista" && lista.ordenada, true, "debe ser ordenada, no de viñetas");
  assert.equal(lista.tipo === "lista" ? lista.items.length : 0, 3);
});

test("viñetas y números seguidos no se mezclan en la misma lista", () => {
  const bloques = formatear(["- uno", "- dos", "1. primero", "2. segundo"].join("\n"));
  const listas = bloques.filter((b) => b.tipo === "lista");
  assert.equal(listas.length, 2);
  assert.deepEqual(listas.map((l) => (l.tipo === "lista" ? l.ordenada : null)), [false, true]);
});

test("un salto de línea suelto no parte el párrafo; uno doble sí", () => {
  const bloques = formatear("Primera línea\ncontinúa aquí.\n\nOtro párrafo.");
  assert.equal(bloques.length, 2);
  assert.equal(plano(bloques[0].tipo === "parrafo" ? bloques[0].trozos : []), "Primera línea continúa aquí.");
});

test("texto sin marcas sobrevive intacto", () => {
  const bloques = formatear("Sí sirve. Somos una firma nueva, fundada en 2026.");
  assert.equal(plano(bloques[0].tipo === "parrafo" ? bloques[0].trozos : []), "Sí sirve. Somos una firma nueva, fundada en 2026.");
});
