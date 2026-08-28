// Import relativo (no `@/`): este módulo también corre bajo el runner de Node,
// que no conoce el alias del tsconfig. Misma razón que en `lead.ts`.
import { axes, bands, questions, type AxisId } from "../content/radiografia.ts";
import { site } from "../content/site.ts";

/**
 * Puntaje de la Radiografía Auren.
 *
 * Módulo puro: entra el mapa de respuestas, sale el resultado. Sin estado, sin
 * red y sin persistencia — el cálculo existe solo mientras la pestaña está
 * abierta, que es exactamente lo que se prometió en la página.
 */

/** Respuestas por id de pregunta. El valor es el índice de la opción (0–3). */
export type Answers = Record<string, number>;

export type Focus = { id: AxisId; name: string; gain: string; score: number; max: number };

export type Result = {
  /** Cuántas de las 12 llevan respuesta. */
  answered: number;
  complete: boolean;
  total: number;
  max: number;
  band: (typeof bands)[number];
  /** Los ejes con más fuga, de mayor a menor. Vacío si no hay ninguna. */
  focuses: Focus[];
};

export const TOTAL_QUESTIONS = questions.length;
export const MAX_SCORE = questions.length * 3;

/** Descarta lo que no sea un índice de opción válido: la entrada viene del DOM. */
function valid(value: number | undefined): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 3;
}

export function scoreRadiografia(answers: Answers): Result {
  const perAxis = new Map<AxisId, { score: number; max: number }>();
  let total = 0;
  let answered = 0;

  for (const q of questions) {
    const bucket = perAxis.get(q.axis) ?? { score: 0, max: 0 };
    bucket.max += 3;

    const value = answers[q.id];
    if (valid(value)) {
      total += value;
      bucket.score += value;
      answered += 1;
    }

    perAxis.set(q.axis, bucket);
  }

  return {
    answered,
    complete: answered === questions.length,
    total,
    max: MAX_SCORE,
    band: bandFor(total),
    focuses: focusesFrom(perAxis),
  };
}

/** La última banda cuyo `min` no supera el puntaje. */
export function bandFor(total: number): (typeof bands)[number] {
  let match: (typeof bands)[number] = bands[0];
  for (const band of bands) if (total >= band.min) match = band;
  return match;
}

/**
 * ponytail: ordena por proporción de fuga (`score / max`), no por puntos
 * crudos — hay ejes de dos preguntas (máx. 6) y de una (máx. 3), y ordenar por
 * crudo escondería siempre a los de una. Empate: gana el de más puntos.
 */
function focusesFrom(perAxis: Map<AxisId, { score: number; max: number }>): Focus[] {
  return [...perAxis]
    .filter(([, v]) => v.score > 0)
    .map(([id, v]) => ({ id, name: axes[id].name, gain: axes[id].gain, ...v }))
    .sort((a, b) => b.score / b.max - a.score / a.max || b.score - a.score)
    .slice(0, 3);
}

/** Enlace para pedir la llamada de 20 minutos con el resultado ya en la mano. */
export function callUrl(result: Result): string {
  const focuses = result.focuses.map((f) => f.name).join(", ") || "ninguno marcado";
  const text = [
    `Hola ${site.name}, acabo de hacer la Radiografía.`,
    "",
    `Puntaje: ${result.total} de ${result.max} — ${result.band.name}`,
    `Focos: ${focuses}`,
    "",
    "Quiero la llamada de 20 minutos para que me lean el resultado.",
  ].join("\n");

  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
