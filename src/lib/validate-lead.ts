import type { Lead } from "@/lib/leads";

/**
 * Validación del formulario de contacto. Módulo puro y sin imports de runtime
 * para que sea ejecutable en pruebas: la frontera de confianza se verifica.
 */

const MAX = { name: 120, email: 200, company: 160, message: 4000 } as const;

function read(data: FormData, key: keyof typeof MAX) {
  const raw = data.get(key);
  return typeof raw === "string" ? raw.trim().slice(0, MAX[key]) : "";
}

export type Validation =
  | { ok: true; lead: Lead }
  | { ok: false; fields: Record<string, string> };

export function validateLead(data: FormData): Validation {
  const lead: Lead = {
    name: read(data, "name"),
    email: read(data, "email"),
    company: read(data, "company"),
    message: read(data, "message"),
  };

  const fields: Record<string, string> = {};
  if (lead.name.length < 2) fields.name = "Indique su nombre.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) fields.email = "Correo no válido.";
  if (lead.message.length < 10) fields.message = "Cuéntenos algo más del contexto.";

  return Object.keys(fields).length > 0 ? { ok: false, fields } : { ok: true, lead };
}
