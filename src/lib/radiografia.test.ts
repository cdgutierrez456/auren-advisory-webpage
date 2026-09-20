import assert from "node:assert/strict";
import test from "node:test";
import { axes, bands, questions } from "../content/radiografia.ts";
import { type Answers, MAX_SCORE, bandFor, callUrl, scoreRadiografia } from "./radiografia.ts";

const answersAll = (value: number | "NA"): Answers =>
  Object.fromEntries(questions.map((q) => [q.id, value]));

test("son 12 preguntas, 6 ejes y el máximo es 36", () => {
  assert.equal(questions.length, 12);
  assert.equal(Object.keys(axes).length, 6);
  assert.equal(MAX_SCORE, 36);
});

test("cada eje tiene exactamente dos preguntas", () => {
  for (const id of Object.keys(axes)) {
    const n = questions.filter((q) => q.axis === id).length;
    assert.equal(n, 2, `el eje ${id} no tiene 2 preguntas`);
  }
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

test("las bandas cubren 0–36 sin huecos y en los cortes v2", () => {
  assert.equal(bands[0].min, 0);
  for (let total = 0; total <= MAX_SCORE; total += 1) assert.ok(bandFor(total));
  assert.equal(bandFor(0).name, "Base sólida");
  assert.equal(bandFor(13).name, "Base sólida");
  assert.equal(bandFor(14).name, "Oportunidad clara");
  assert.equal(bandFor(25).name, "Oportunidad clara");
  assert.equal(bandFor(26).name, "Alta oportunidad");
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
  assert.equal(r.band?.name, "Alta oportunidad");
  assert.equal(r.focuses.length, 3);
});

test("el formulario incompleto no se declara completo", () => {
  const r = scoreRadiografia({ q1: 3, q2: 2 });
  assert.equal(r.answered, 2);
  assert.equal(r.complete, false);
});

test("ignora respuestas fuera de rango o corruptas", () => {
  const r = scoreRadiografia({ q1: 9, q2: -1, q3: 1.5, q4: NaN, q5: 2 } as Answers);
  assert.equal(r.answered, 1);
});

test("un No aplica en un eje duplica la otra pregunta", () => {
  // repetido: q1=3, q2=NA → eje = 6; el resto en 0.
  const r = scoreRadiografia({ ...answersAll(0), q1: 3, q2: "NA" });
  const repetido = r.focuses.find((f) => f.id === "repetido");
  assert.ok(repetido, "repetido debería ser foco");
  assert.equal(repetido?.score, 6);
  assert.equal(r.naCount, 1);
});

test("un eje con las dos NA se excluye y el total se escala", () => {
  // repetido excluido (dos NA); dispersa al tope (6); el resto en 0.
  const r = scoreRadiografia({
    ...answersAll(0),
    q1: "NA",
    q2: "NA",
    q3: 3,
    q4: 3,
  });
  // 5 ejes vivos, rawSum 6 → round(6*6/5) = 7, por encima del 6 crudo.
  assert.equal(r.total, 7);
  assert.equal(r.offScale, false);
});

test("cinco o más No aplica sacan a la operación del patrón", () => {
  const answers: Answers = { ...answersAll(1), q1: "NA", q2: "NA", q3: "NA", q4: "NA", q5: "NA" };
  const r = scoreRadiografia(answers);
  assert.equal(r.naCount, 5);
  assert.equal(r.offScale, true);
  assert.equal(r.band, null);
  assert.deepEqual(r.focuses, []);
});

test("el desempate de focos respeta la prioridad del eje", () => {
  // repetido y dispersa empatan en 3; dispersa (priority 0) gana el primer lugar.
  const r = scoreRadiografia({ ...answersAll(0), q1: 3, q3: 3 });
  assert.equal(r.focuses[0].id, "dispersa");
});

test("guarda el puntaje de P1 para el costo en horas", () => {
  assert.equal(scoreRadiografia({ ...answersAll(0), q1: 2 }).p1, 2);
  assert.equal(scoreRadiografia({ ...answersAll(0), q1: "NA" }).p1, null);
});

test("el enlace de la llamada lleva puntaje, banda y focos", () => {
  const url = callUrl(scoreRadiografia(answersAll(3)), {
    operacion: "Prestamos servicios a otras empresas",
    tamano: "31 a 80",
  });
  const text = decodeURIComponent(new URL(url).searchParams.get("text") ?? "");
  assert.match(url, /^https:\/\/wa\.me\/\d+\?text=/);
  assert.match(text, /36 de 36 — Alta oportunidad/);
  assert.match(text, /Focos: .+/);
  assert.match(text, /Tama.o: 31 a 80/);
});

test("el enlace también funciona fuera del patrón", () => {
  const answers: Answers = { ...answersAll("NA") };
  const url = callUrl(scoreRadiografia(answers));
  const text = decodeURIComponent(new URL(url).searchParams.get("text") ?? "");
  assert.match(text, /se sale del patrón/);
});
