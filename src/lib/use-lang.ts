"use client";

import { useParams } from "next/navigation";
import { isLang, translator, type Lang } from "@/lib/i18n";

/** El idioma en un componente cliente: el mismo `[lang]` de la ruta. */
export function useLang(): Lang {
  const { lang } = useParams<{ lang?: string }>();
  return isLang(lang) ? lang : "es";
}

export const useT = () => translator(useLang());
