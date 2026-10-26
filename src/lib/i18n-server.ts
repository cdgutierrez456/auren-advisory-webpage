import { lang as rootLang } from "next/root-params";
import { content } from "@/content";
import { isLang, translator, type Lang } from "@/lib/i18n";

/**
 * El idioma de la página, leído del segmento `[lang]` desde cualquier Server
 * Component o `generateMetadata`, sin pasarlo de mano en mano.
 */
export async function getLang(): Promise<Lang> {
  const value = await rootLang();
  return isLang(value) ? value : "es";
}

export const getT = async () => translator(await getLang());

export const getContent = async () => content(await getLang());
