/**
 * Idiomas del sitio.
 *
 * El español vive en las URLs de siempre (`/servicios`); el inglés, bajo
 * `/en` (`/en/servicios`). Internamente las dos cuelgan de `app/[lang]`:
 * `src/proxy.ts` reescribe lo que no lleva prefijo a `/es/...`, así que las
 * canónicas, el sitemap y los enlaces viejos en español no cambian.
 *
 * Módulo puro: lo usan el servidor, el cliente y el runner de Node.
 */

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (value: unknown): value is Lang => value === "es" || value === "en";

/** `lang` de `<html>` y de los datos estructurados. */
export const HTML_LANG: Record<Lang, string> = { es: "es-CO", en: "en" };
export const OG_LOCALE: Record<Lang, string> = { es: "es_CO", en: "en_US" };

/**
 * Ruta pública de una página en un idioma. Solo toca rutas internas de página:
 * externas, `mailto:`, archivos (`/icon.svg`) y lo ya prefijado pasan igual.
 */
export function localize(lang: Lang, href: string): string {
  if (lang === "es" || !href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/en" || href.startsWith("/en/") || href.startsWith("/en#")) return href;
  if (/\.\w+$/.test(href.split(/[?#]/)[0])) return href;
  if (href === "/") return "/en";
  if (href.startsWith("/#") || href.startsWith("/?")) return `/en${href.slice(1)}`;
  return `/en${href}`;
}

/** Quita el prefijo de idioma: la misma página, sin importar en cuál se lee. */
export const unlocalize = (path: string) => path.replace(/^\/(es|en)(?=\/|$|#|\?)/, "") || "/";

/**
 * Traductor de interfaz: los dos textos van juntos en la llamada, así que no
 * hay un diccionario aparte que se desincronice. El contenido largo
 * (servicios, artículos, preguntas) vive en `src/content/en/`.
 */
export const translator =
  (lang: Lang) =>
  <T>(es: T, en: T): T =>
    lang === "en" ? en : es;

export type T = ReturnType<typeof translator>;

/**
 * La misma forma que el contenido en español, con cualquier texto: los
 * módulos en español van `as const` y sus literales no los puede repetir el
 * inglés.
 */
export type Loc<T> = T extends string
  ? string
  : T extends (...args: never[]) => unknown
    ? T
    : T extends readonly (infer U)[]
      ? readonly Loc<U>[]
      : T extends object
        ? { readonly [K in keyof T]: Loc<T[K]> }
        : T;
