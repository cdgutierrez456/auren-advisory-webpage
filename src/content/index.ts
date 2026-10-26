/**
 * El contenido de un idioma, en un solo objeto.
 *
 * El español (`./site`, `./recursos`, …) es la fuente; `./en/*` lo espeja con
 * los mismos slugs y la misma forma — `en.test.ts` lo verifica. Ningún
 * componente importa `./en` directo: pasa por aquí.
 */
import type { Lang } from "@/lib/i18n";
import * as demosEs from "./demos";
import * as demosEn from "./en/demos";
import * as radiografiaEs from "./radiografia";
import * as radiografiaEn from "./en/radiografia";
import * as recursosEs from "./recursos";
import * as recursosEn from "./en/recursos";
import * as siteEs from "./site";
import * as siteEn from "./en/site";

const es = { ...siteEs, ...recursosEs, ...radiografiaEs, ...demosEs };
const en = { ...siteEn, ...recursosEn, ...radiografiaEn, ...demosEn } satisfies Record<
  keyof typeof es,
  unknown
>;

export type Content = typeof es | typeof en;

export const content = (lang: Lang): Content => (lang === "en" ? en : es);
