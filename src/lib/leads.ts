import "server-only";

/**
 * Único punto de salida de un lead.
 *
 * Hoy: POST a un webhook (Slack, n8n, Zapier, HubSpot, Make…) definido en
 * AUREN_LEAD_WEBHOOK. Cero dependencias y compatible con casi cualquier CRM.
 *
 * Para integrar otro servicio en el futuro (Resend, correo SMTP, API del CRM)
 * se reemplaza el cuerpo de esta función. Nada más del sitio cambia.
 */

export type Lead = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type DeliveryResult = "delivered" | "not-configured" | "failed";

export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const webhook = process.env.AUREN_LEAD_WEBHOOK;

  if (!webhook) {
    // Sin destino configurado no se puede prometer entrega: el formulario
    // redirige a correo directo en lugar de perder el contacto en silencio.
    console.warn("[auren] AUREN_LEAD_WEBHOOK sin configurar. Lead no entregado:", lead.email);
    return "not-configured";
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: "aurenadvisory.com/#contacto",
        receivedAt: new Date().toISOString(),
        ...lead,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook respondió ${res.status}`);
    return "delivered";
  } catch (error) {
    console.error("[auren] Falló la entrega del lead:", error);
    return "failed";
  }
}
