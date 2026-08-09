import assert from "node:assert/strict";
import test from "node:test";
import { composeMessage, validateLead, whatsappUrl } from "./lead.ts";

const form = (fields: Record<string, string>) => {
  const d = new FormData();
  for (const [k, v] of Object.entries(fields)) d.set(k, v);
  return d;
};

const valid = {
  name: "Ana Pérez",
  email: "ana@empresa.com",
  company: "Empresa SAS",
  message: "Queremos revisar el proceso de facturación.",
};

const leadOf = (fields: Record<string, string> = valid) => {
  const r = validateLead(form(fields));
  assert.ok(r.ok);
  return r.lead;
};

test("acepta un lead completo y recorta espacios", () => {
  assert.equal(leadOf({ ...valid, name: "  Ana Pérez  " }).name, "Ana Pérez");
});

test("empresa es opcional", () => {
  const { company: _, ...rest } = valid;
  assert.ok(validateLead(form(rest)).ok);
});

test("rechaza correos inválidos", () => {
  for (const email of ["ana", "ana@", "ana@empresa", "@empresa.com", "a b@c.com"]) {
    const r = validateLead(form({ ...valid, email }));
    assert.ok(!r.ok && r.fields.email, `debió rechazar: ${email}`);
  }
});

test("rechaza nombre y mensaje demasiado cortos", () => {
  const r = validateLead(form({ ...valid, name: "A", message: "hola" }));
  assert.ok(!r.ok);
  assert.ok(r.fields.name && r.fields.message);
});

test("trunca en el máximo en lugar de reventar", () => {
  assert.equal(leadOf({ ...valid, message: "x".repeat(9000) }).message.length, 4000);
});

test("campos ausentes no lanzan", () => {
  const r = validateLead(new FormData());
  assert.ok(!r.ok);
  assert.equal(Object.keys(r.fields).length, 3);
});

test("el mensaje incluye todos los datos entregados", () => {
  const text = composeMessage(leadOf());
  for (const v of Object.values(valid)) assert.ok(text.includes(v), `falta: ${v}`);
});

test("omite la línea de empresa cuando no se indicó", () => {
  const { company: _, ...rest } = valid;
  assert.ok(!composeMessage(leadOf({ ...rest })).includes("Empresa:"));
});

test("el enlace apunta al número de la firma y codifica el texto", () => {
  const url = whatsappUrl(leadOf());
  assert.ok(url.startsWith("https://wa.me/573206548168?text="));
  // Saltos de línea y acentos deben viajar codificados, no crudos.
  assert.ok(!/[\n\s]/.test(url));
  assert.equal(decodeURIComponent(new URL(url).searchParams.get("text") ?? ""), composeMessage(leadOf()));
});
