"use server";

import { deliverLead } from "@/lib/leads";
import { validateLead } from "@/lib/validate-lead";

export type ContactState = {
  status: "idle" | "ok" | "error";
  message: string;
  /** Errores por campo, para marcar los inputs. */
  fields?: Record<string, string>;
};

export async function submitContact(
  _prev: ContactState,
  data: FormData,
): Promise<ContactState> {
  // Honeypot: los bots rellenan campos ocultos. Se responde ok sin entregar.
  if (data.get("website")) return { status: "ok", message: "Gracias. Le escribiremos pronto." };

  const result = validateLead(data);
  if (!result.ok) {
    return { status: "error", message: "Revise los campos marcados.", fields: result.fields };
  }

  const delivery = await deliverLead(result.lead);

  if (delivery === "delivered") {
    return {
      status: "ok",
      message: "Recibido. Le respondemos en menos de 24 horas hábiles.",
    };
  }

  return {
    status: "error",
    message:
      "No pudimos registrar su mensaje. Escríbanos directamente a hola@aurenadvisory.com.",
  };
}
