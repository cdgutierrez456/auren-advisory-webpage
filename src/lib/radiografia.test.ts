import assert from "node:assert/strict";
import test from "node:test";
import { axes, bands, questions } from "../content/radiografia.ts";
import { MAX_SCORE, bandFor, callUrl, scoreRadiografia } from "./radiografia.ts";

const answersAll = (value: number) =>
  Object.fromEntries(questions.map((q) => [q.id, value]));

test("son 12 preguntas y el máximo es 36", () => {
  assert.equal(questions.length, 12);
  assert.equal(MAX_SCORE, 36);
});

test("toda pregunta tiene 4 opciones y un eje declarado", () => {
  for (const q of questions) {
    assert.equal(q.options.length, 4, `${q.id} no tiene 4 opciones`);
    assert.ok(axes[q.axis], `${q.id} apunta a un eje inexistente: ${q.axis}`);
  }
});

test("los ids de pregunta son únicos", () => {
  const ids = questions.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("las bandas cubren 0–36 sin huecos", () => {
  assert.equal(bands[0].min, 0);
  for (let total = 0; total <= MAX_SCORE; total += 1) assert.ok(bandFor(total));
  assert.equal(bandFor(0).name, "Base sólida");
  assert.equal(bandFor(11).name, "Base sólida");
  assert.equal(bandFor(12).name, "Oportunidad clara");
  assert.equal(bandFor(23).name, "Oportunidad clara");
  assert.equal(bandFor(24).name, "Alta oportunidad");
  assert.equal(bandFor(36).name, "Alta oportunidad");
});

test("todo en 0 da 0 puntos y ningún foco", () => {
  const r = scoreRadiografia(answersAll(0));
  assert.equal(r.total, 0);
  assert.equal(r.complete, true);
  assert.deepEqual(r.focuses, []);
});

test("todo en 3 da el máximo y devuelve 3 focos", () => {
  const r = scoreRadiografia(answersAll(3));
  assert.equal(r.total, MAX_SCORE);
  assert.equal(r.band.name, "Alta oportunidad");
  assert.equal(r.focuses.length, 3);
});

test("el formulario incompleto no se declara completo", () => {
  const r = scoreRadiografia({ q1: 3, q2: 2 });
  assert.equal(r.answered, 2);
  assert.equal(r.complete, false);
  assert.equal(r.total, 5);
});

test("ignora respuestas fuera de rango o corruptas", () => {
  const r = scoreRadiografia({ q1: 9, q2: -1, q3: 1.5, q4: NaN, q5: 2 });
  assert.equal(r.answered, 1);
  assert.equal(r.total, 2);
});

test("un eje de una pregunta puede ganarle a uno de dos", () => {
  // q5 (comunicación, máx 3) al tope; q1+q2 (manuales, máx 6) a la mitad.
  const r = scoreRadiografia({ q5: 3, q1: 1, q2: 2 });
  assert.equal(r.focuses[0].id, "comunicacion");
});

test("el enlace de la llamada lleva puntaje, banda y focos", () => {
  const url = callUrl(scoreRadiografia(answersAll(3)));
  const text = decodeURIComponent(new URL(url).searchParams.get("text") ?? "");
  assert.match(url, /^https:\/\/wa\.me\/\d+\?text=/);
  assert.match(text, /36 de 36 — Alta oportunidad/);
  assert.match(text, /Focos: .+/);
});
