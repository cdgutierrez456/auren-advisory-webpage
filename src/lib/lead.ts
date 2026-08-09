// Import relativo (no `@/`): este módulo también corre bajo el runner de Node,
// que no conoce el alias del tsconfig.
import { site } from "../content/site.ts";

/**
 * Formulario de contacto: validación y armado del mensaje de WhatsApp.
 *
 * Módulo puro, sin dependencias de runtime ni de servidor, para que la frontera
 * de entrada sea verificable en pruebas. El envío ocurre en el cliente: no hay
 * backend que pueda perder un lead en silencio.
 */

export type Lead = {
  name: string;
  email: string;
  company: string;
  message: string;
};

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

/** Mensaje que llega a WhatsApp. Legible por una persona, no un volcado de campos. */
export function composeMessage(lead: Lead): string {
  return [
    `Hola ${site.name}, quiero agendar un diagnóstico.`,
    "",
    `Nombre: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company ? `Empresa: ${lead.company}` : null,
    "",
    "Qué quiero resolver:",
    lead.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

/** Enlace universal de WhatsApp: funciona en app de escritorio, móvil y web. */
export function whatsappUrl(lead: Lead): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(composeMessage(lead))}`;
}
