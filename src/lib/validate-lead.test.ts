import assert from "node:assert/strict";
import test from "node:test";
import { validateLead } from "./validate-lead.ts";

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

test("acepta un lead completo y recorta espacios", () => {
  const r = validateLead(form({ ...valid, name: "  Ana Pérez  " }));
  assert.ok(r.ok);
  assert.equal(r.lead.name, "Ana Pérez");
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
  const r = validateLead(form({ ...valid, message: "x".repeat(9000) }));
  assert.ok(r.ok);
  assert.equal(r.lead.message.length, 4000);
});

test("campos ausentes no lanzan", () => {
  const r = validateLead(new FormData());
  assert.ok(!r.ok);
  assert.equal(Object.keys(r.fields).length, 3);
});
