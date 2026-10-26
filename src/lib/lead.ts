// Import relativo (no `@/`): este módulo también corre bajo el runner de Node,
// que no conoce el alias del tsconfig.
import { site } from "../content/site.ts";
import { translator, type Lang } from "./i18n.ts";

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

export function validateLead(data: FormData, lang: Lang = "es"): Validation {
  const t = translator(lang);
  const lead: Lead = {
    name: read(data, "name"),
    email: read(data, "email"),
    company: read(data, "company"),
    message: read(data, "message"),
  };

  const fields: Record<string, string> = {};
  if (lead.name.length < 2) fields.name = t("Indique su nombre.", "Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email))
    fields.email = t("Correo no válido.", "Invalid email.");
  if (lead.message.length < 10)
    fields.message = t("Cuéntenos algo más del contexto.", "Tell us a bit more about the context.");

  return Object.keys(fields).length > 0 ? { ok: false, fields } : { ok: true, lead };
}

/**
 * Mensaje que llega a WhatsApp. Legible por una persona, no un volcado de
 * campos. En el idioma de quien escribe: es la primera señal de en cuál
 * contestarle.
 */
export function composeMessage(lead: Lead, lang: Lang = "es"): string {
  const t = translator(lang);
  return [
    t(`Hola ${site.name}, quiero agendar un diagnóstico.`, `Hi ${site.name}, I'd like to book a diagnosis.`),
    "",
    `${t("Nombre", "Name")}: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company ? `${t("Empresa", "Company")}: ${lead.company}` : null,
    "",
    t("Qué quiero resolver:", "What I want to solve:"),
    lead.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

/** Enlace universal de WhatsApp: funciona en app de escritorio, móvil y web. */
export function whatsappUrl(lead: Lead, lang: Lang = "es"): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(composeMessage(lead, lang))}`;
}
