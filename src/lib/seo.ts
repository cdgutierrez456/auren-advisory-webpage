import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Canónica + Open Graph propio de cada página.
 *
 * Sin esto Next hereda el `openGraph` del layout y toda página interior se
 * anuncia con el título de la home; y sin `canonical` el buscador decide solo
 * cuál URL es la buena cuando llega por parámetros o con/sin barra final.
 */
export function pageMetadata(title: string, description: string, path: string): Metadata {
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
      type: "website",
      // El openGraph explícito tapa la convención de archivo: hay que nombrarla.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.tagline }],
    },
  };
}
