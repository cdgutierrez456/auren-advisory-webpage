import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { checklist, vehiculos } from "../content/demo-data.ts";
import { costoAnual, estadoDe, estadoVehiculo, evaluar, resumenFlota } from "./demos.ts";

/**
 * Invariantes de los demos que no dependen de días hábiles. Son pocas a
 * propósito: solo lo que, si se rompe, hace que el demo mienta sobre lo que
 * vende.
 */

/* --- La regla del preoperacional -------------------------------------- */

const critico = checklist.find((i) => i.critico && !i.exigeFoto)!;
const criticoConFoto = checklist.find((i) => i.critico && i.exigeFoto)!;
const noCritico = checklist.find((i) => !i.critico)!;
/** Todo en bueno, para partir de una inspección completa y aprobada. */
const todoBueno = checklist.map((i) => ({ itemId: i.id, estado: "bueno" as const }));
const con = (itemId: string, extra: object = {}) =>
  todoBueno.map((r) => (r.itemId === itemId ? { ...r, estado: "malo" as const, ...extra } : r));

test("un ítem crítico en malo bloquea la salida del vehículo", () => {
  assert.equal(evaluar(con(critico.id)).resultado, "bloqueado");
});

test("un ítem no crítico en malo no bloquea", () => {
  assert.equal(evaluar(con(noCritico.id)).resultado, "aprobado");
});

test("un ítem que exige foto deja la inspección incompleta si no la tiene", () => {
  assert.equal(evaluar(con(criticoConFoto.id)).incompleta, true);
  assert.equal(evaluar(con(criticoConFoto.id, { foto: "data:," })).incompleta, false);
});

test("una inspección sin responder todos los ítems está incompleta", () => {
  assert.equal(evaluar(todoBueno.slice(0, 5)).incompleta, true);
  assert.equal(evaluar(todoBueno).incompleta, false);
});

/* --- El semáforo de vencimientos -------------------------------------- */

const hoy = new Date("2026-06-15T10:00:00");

test("el semáforo clasifica por días restantes, no por color", () => {
  assert.equal(estadoDe("2026-06-14", hoy).estado, "vencido");
  assert.equal(estadoDe("2026-06-15", hoy).estado, "critico");
  assert.equal(estadoDe("2026-06-29", hoy).estado, "critico");
  assert.equal(estadoDe("2026-07-15", hoy).estado, "proximo");
  assert.equal(estadoDe("2026-12-01", hoy).estado, "vigente");
  assert.equal(estadoDe("2026-06-10", hoy).dias, -5);
});

test("los umbrales se pueden mover en vivo", () => {
  assert.equal(estadoDe("2026-07-10", hoy).estado, "proximo");
  assert.equal(estadoDe("2026-07-10", hoy, { critico: 30, proximo: 60 }).estado, "critico");
});

test("el estado del vehículo es el peor de sus documentos", () => {
  const peorVencido = vehiculos.find((v) => v.placa === "TBN147")!;
  assert.equal(estadoVehiculo(peorVencido).peor.estado, "vencido");
});

/* --- El dataset sembrado: la invariante que evita la disculpa ---------- */

test("los datos sembrados no tienen ninguna fecha literal", () => {
  const fuente = readFileSync(new URL("../content/demo-data.ts", import.meta.url), "utf8");
  const literales = fuente.match(/\d{4}-\d{2}-\d{2}/g) ?? [];
  assert.deepEqual(
    literales,
    [],
    "una fecha quemada hace que a las tres semanas todo aparezca vencido",
  );
});

test("la flota abre con rojos, amarillos y verdes", () => {
  const r = resumenFlota(vehiculos);
  assert.ok(r.vencidos >= 1, "sin un vencido no hay nada que mostrar");
  assert.ok(r.enRiesgo > r.vencidos, "hace falta al menos un crítico además del vencido");
  assert.ok(r.enRiesgo < vehiculos.length / 2, "si todo está mal parece un error del sistema");
  assert.ok(r.mantenimiento >= 1, "y al menos un mantenimiento pasado de kilometraje");
});

/* --- Costo de la fricción --------------------------------------------- */

test("el costo anual es doce veces el mensual y el equivalente es coherente", () => {
  const r = costoAnual({ personas: 2, horasSemana: 10, salarioMensual: 3_000_000 });
  assert.equal(r.anual, r.mensual * 12);
  assert.equal(r.valorHora, 15_625);
  // 2 personas × 10 h × 4,33 sem × 12 meses = 1.039 h ≈ 0,5 personas a tiempo completo.
  assert.equal(r.equivalente, "0.5");
});
