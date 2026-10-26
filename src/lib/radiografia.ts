// Import relativo (no `@/`): este módulo también corre bajo el runner de Node,
// que no conoce el alias del tsconfig. Misma razón que en `lead.ts`.
import * as es from "../content/radiografia.ts";
import type { AxisId, Question } from "../content/radiografia.ts";
import { site } from "../content/site.ts";
import type { Lang } from "./i18n.ts";

/**
 * Puntaje de la Radiografía Auren (v2).
 *
 * Módulo puro: entra el mapa de respuestas, sale el resultado. Sin estado, sin
 * red y sin persistencia — el cálculo existe solo mientras la pestaña está
 * abierta, que es exactamente lo que se prometió en la página.
 *
 * Maneja «No aplica» (NA):
 * - Un eje con UNA pregunta NA: su puntaje es el de la otra × 2.
 * - Un eje con las DOS NA: se excluye y el total se escala a los ejes vivos.
 * - 5 o más NA en total: no se muestra banda (la operación se sale del patrón).
 *
 * Los textos (nombre de eje, banda) llegan en `dict`: el de la página. Los
 * ids, el orden de las opciones y los cortes son los mismos en los dos
 * idiomas, así que el puntaje no depende de en cuál se responda.
 */

export type Band = {
  min: number;
  name: string;
  verdict: string;
  body: string;
  insightBridge: boolean;
};

/** Lo que el puntaje necesita del contenido. Por defecto, el español. */
export type Dict = {
  axes: Record<AxisId, { name: string; priority: number; phrase: string }>;
  bands: readonly Band[];
  questions: readonly Question[];
};

/** Valor de una respuesta: el índice de la opción (0–3) o «NA». */
export type AnswerValue = number | "NA";
export type Answers = Record<string, AnswerValue>;

/** Contexto comercial (C1/C2). No puntúa; viaja al mensaje de la llamada. */
export type Context = { operacion?: string; tamano?: string };

export type Focus = { id: AxisId; name: string; phrase: string; score: number; max: number };

export type Result = {
  /** Cuántas de las 12 llevan respuesta (número o NA). */
  answered: number;
  complete: boolean;
  /** Cuántas se marcaron «No aplica». */
  naCount: number;
  /** 5 o más NA: la operación se sale del patrón, no se puntúa. */
  offScale: boolean;
  total: number;
  max: number;
  /** Null solo cuando `offScale`. */
  band: Band | null;
  /** Los ejes foco, de mayor a menor. Vacío si no hay ninguno. */
  focuses: Focus[];
  /** Puntaje de la P1 (0–3) si es numérico; null si NA o sin responder. Para el costo en horas. */
  p1: number | null;
};

export const TOTAL_QUESTIONS = es.questions.length;
export const MAX_SCORE = 36;
const AXIS_MAX = 6;

/** Índice de opción válido (0–3). La entrada viene del DOM. */
function isScore(value: AnswerValue | undefined): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 3;
}
function isAnswered(value: AnswerValue | undefined): boolean {
  return isScore(value) || value === "NA";
}

export function scoreRadiografia(answers: Answers, dict: Dict = es): Result {
  const { axes, questions } = dict;
  const questionsByAxis = (axis: AxisId) => questions.filter((q) => q.axis === axis);
  const axisIds = Object.keys(axes) as AxisId[];

  let answered = 0;
  let naCount = 0;
  for (const q of questions) {
    const v = answers[q.id];
    if (isAnswered(v)) answered += 1;
    if (v === "NA") naCount += 1;
  }

  // Puntaje por eje, con la regla de NA. `null` = eje excluido (dos NA).
  const perAxis: { id: AxisId; score: number }[] = [];
  for (const id of axisIds) {
    const [a, b] = questionsByAxis(id).map((q) => answers[q.id]);
    const aOk = isScore(a);
    const bOk = isScore(b);

    let score: number | null;
    if (aOk && bOk) score = a + b;
    else if (aOk && b === "NA") score = a * 2;
    else if (bOk && a === "NA") score = b * 2;
    else if (a === "NA" && b === "NA") score = null; // excluido
    else score = (aOk ? a : 0) + (bOk ? b : 0); // parcial (aún respondiendo)

    if (score !== null) perAxis.push({ id, score });
  }

  const rawSum = perAxis.reduce((sum, a) => sum + a.score, 0);
  const includedCount = perAxis.length || 1;
  // Escala a 0–36 según ejes vivos: si hay ejes excluidos, se reparte su peso.
  const total = Math.min(MAX_SCORE, Math.round((rawSum * AXIS_MAX) / includedCount));

  const offScale = naCount >= 5;
  const p1 = isScore(answers.q1) ? answers.q1 : null;

  return {
    answered,
    complete: answered === questions.length,
    naCount,
    offScale,
    total,
    max: MAX_SCORE,
    band: offScale ? null : bandFor(total, dict.bands),
    focuses: offScale ? [] : focusesFrom(perAxis, axes),
    p1,
  };
}

/** La última banda cuyo `min` no supera el puntaje. */
export function bandFor(total: number, bands: readonly Band[] = es.bands): Band {
  let match = bands[0];
  for (const band of bands) if (total >= band.min) match = band;
  return match;
}

/**
 * Focos: los dos ejes con mayor puntaje, más cualquier eje con 5 o 6 que no
 * haya quedado entre los dos primeros. Máximo tres. Desempate por `priority`
 * (menor gana): dispersa, repetido, visibilidad, seguimiento, dependencia,
 * decisiones. Todos los ejes valen máx. 6, así que ordenar por crudo es justo.
 */
function focusesFrom(perAxis: { id: AxisId; score: number }[], axes: Dict["axes"]): Focus[] {
  const scored = perAxis
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score || axes[a.id].priority - axes[b.id].priority);

  const top = scored.slice(0, 2);
  const extras = scored.slice(2).filter((a) => a.score >= 5);

  return [...top, ...extras].slice(0, 3).map((a) => ({
    id: a.id,
    name: axes[a.id].name,
    phrase: axes[a.id].phrase,
    score: a.score,
    max: AXIS_MAX,
  }));
}

/** Enlace para agendar la lectura de resultados con el contexto ya en la mano. */
export function callUrl(result: Result, context: Context = {}, lang: Lang = "es"): string {
  const en = lang === "en";
  const focuses =
    result.focuses.map((f) => f.name).join(", ") || (en ? "none flagged" : "ninguno marcado");
  const puntaje = result.offScale
    ? en
      ? "My operation falls outside the X-ray's pattern"
      : "Mi operación se sale del patrón de la radiografía"
    : `${result.total} ${en ? "of" : "de"} ${result.max} — ${result.band?.name}`;

  const text = [
    en
      ? `Hi ${site.name}, I just took the X-Ray.`
      : `Hola ${site.name}, acabo de hacer la Radiografía.`,
    "",
    context.operacion ? `${en ? "Operation" : "Operación"}: ${context.operacion}` : null,
    context.tamano ? `${en ? "Size" : "Tamaño"}: ${context.tamano}` : null,
    `${en ? "Score" : "Puntaje"}: ${puntaje}`,
    `${en ? "Leaks" : "Focos"}: ${focuses}`,
    "",
    en
      ? "I'd like to book the 30-minute results reading."
      : "Quiero agendar la lectura de resultados de 30 minutos.",
  ]
    .filter((line) => line !== null)
    .join("\n");

  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
