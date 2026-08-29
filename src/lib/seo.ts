import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Canónica + Open Graph propio de cada página.
 *
 * Sin esto Next hereda el `openGraph` del layout y toda página interior se
 * anuncia con el título de la home; y sin `canonical` el buscador decide solo
 * cuál URL es la buena cuando llega por parámetros o con/sin barra final.
 */
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  /** Solo para artículos: cambia el tipo de OG y añade fechas. */
  article?: { published: string; modified?: string },
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "es_CO",
      // El openGraph explícito tapa la convención de archivo: hay que nombrarla.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.tagline }],
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
