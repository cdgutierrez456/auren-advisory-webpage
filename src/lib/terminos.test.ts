import assert from "node:assert/strict";
import { test } from "node:test";
import { radicados } from "../content/terminos.ts";
import {
  evaluarRadicado,
  habilesEntre,
  iso,
  siguienteNumero,
  sumarHabiles,
} from "./terminos.ts";

/**
 * Las cuatro invariantes del cálculo de términos. Un error acá se ve en
 * pantalla delante del cliente que cuenta términos mejor que nosotros.
 */

const d = (s: string) => new Date(`${s}T00:00:00`);

test("el día de radicación no cuenta: el término corre desde el siguiente hábil", () => {
  // Martes + 1 hábil = miércoles, no el mismo martes.
  assert.equal(iso(sumarHabiles(d("2026-09-15"), 1)), "2026-09-16");
});

test("radicar un viernes: el término empieza a contar el lunes", () => {
  assert.equal(iso(sumarHabiles(d("2026-09-11"), 1)), "2026-09-14");
});

test("un festivo en medio corre el límite un día", () => {
  // Viernes 9 de octubre. El lunes 12 es festivo (Día de la Raza), así que el
  // primer día hábil es el martes 13.
  assert.equal(iso(sumarHabiles(d("2026-10-09"), 1)), "2026-10-13");
  // Sin el festivo serían 15 hábiles hasta el 30; con él, hasta el 2 de nov.
  assert.equal(iso(sumarHabiles(d("2026-10-09"), 15)), "2026-11-03");
});

test("habilesEntre es el inverso de sumarHabiles y es simétrico", () => {
  const desde = d("2026-09-15");
  const limite = sumarHabiles(desde, 15);
  assert.equal(habilesEntre(desde, limite), 15);
  assert.equal(habilesEntre(limite, desde), -15);
  assert.equal(habilesEntre(desde, desde), 0);
});

test("un radicado respondido nunca aparece vencido", () => {
  const cerrado = {
    ...radicados[0],
    respondidoEn: "2020-01-15T10:00:00",
    radicadoEn: "2020-01-02T08:00:00",
  };
  assert.equal(evaluarRadicado(cerrado, d("2030-01-01")).semaforo, "cerrado");
});

test("los datos sembrados traen al menos un vencido y un crítico", () => {
  const estados = radicados.map((r) => evaluarRadicado(r).semaforo);
  assert.ok(estados.includes("vencido"), "la bandeja debe abrir con algo en rojo");
  assert.ok(estados.includes("critico"), "y con algo en amarillo");
  assert.ok(estados.includes("cerrado"), "y con casos ya resueltos, o parece abandonada");
  assert.ok(
    radicados.some((r) => r.responsable === null),
    "sin radicados sin responsable se pierde el dato que más incomoda",
  );
});

test("el consecutivo continúa después del máximo sembrado", () => {
  const siguiente = siguienteNumero(radicados);
  const max = Math.max(...radicados.map((r) => Number(r.numero.split("-")[1])));
  assert.equal(siguiente.split("-")[1], String(max + 1).padStart(5, "0"));
});
