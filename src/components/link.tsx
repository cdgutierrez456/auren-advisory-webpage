"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localize } from "@/lib/i18n";
import { useLang } from "@/lib/use-lang";

/**
 * `next/link` que se queda en el idioma de la página: `href="/servicios"`
 * lleva a `/en/servicios` cuando se lee en inglés. Todo enlace interno del
 * sitio pasa por aquí, así que el contenido escribe rutas sin prefijo.
 */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const lang = useLang();
  return <NextLink {...props} href={typeof href === "string" ? localize(lang, href) : href} />;
}
