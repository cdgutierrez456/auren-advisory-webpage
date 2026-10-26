import type { Metadata } from "next";
import { site } from "@/content/site";
import { localize, OG_LOCALE } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";

/**
 * Canónica + Open Graph propio de cada página, en el idioma de la ruta.
 *
 * Sin esto Next hereda el `openGraph` del layout y toda página interior se
 * anuncia con el título de la home; y sin `canonical` el buscador decide solo
 * cuál URL es la buena cuando llega por parámetros o con/sin barra final.
 *
 * `path` va sin prefijo de idioma: de aquí salen la canónica de cada versión
 * y el par `hreflang` que le dice al buscador que son la misma página.
 */
export async function pageMetadata(
  title: string,
  description: string,
  path: string,
  /** Solo para artículos: cambia el tipo de OG y añade fechas. */
  article?: { published: string; modified?: string },
): Promise<Metadata> {
  const lang = await getLang();
  const url = localize(lang, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: path, en: localize("en", path), "x-default": path },
    },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: OG_LOCALE[lang],
      // El openGraph explícito tapa la convención de archivo: hay que nombrarla.
      images: [
        { url: localize(lang, "/opengraph-image"), width: 1200, height: 630, alt: site.name },
      ],
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.published,
            modifiedTime: article.modified ?? article.published,
          }
        : { type: "website" as const }),
    },
  };
}
