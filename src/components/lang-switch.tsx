"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { LANGS, localize, unlocalize } from "@/lib/i18n";
import { useLang } from "@/lib/use-lang";

/**
 * ES / EN: la misma página en el otro idioma. Mismo filo que el interruptor
 * de tema, para que los dos controles se lean como un par.
 *
 * `next/link` directo (no `@/components/link`): aquí el idioma de destino es
 * justamente el que NO es el de la página.
 */
export function LangSwitch({ className = "" }: { className?: string }) {
  const lang = useLang();
  const path = unlocalize(usePathname());

  return (
    <div
      role="group"
      aria-label={lang === "en" ? "Language" : "Idioma"}
      className={`label inline-flex h-10 shrink-0 items-center rounded-pill border border-line p-1 ${className}`}
    >
      {LANGS.map((l) => (
        <NextLink
          key={l}
          href={localize(l, path)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          aria-label={l === "es" ? "Español" : "English"}
          className={`flex h-full items-center rounded-pill px-2.5 transition-colors duration-300 ${
            l === lang ? "bg-fg/10 text-fg" : "text-fg/55 hover:text-fg"
          }`}
        >
          {l.toUpperCase()}
        </NextLink>
      ))}
    </div>
  );
}
