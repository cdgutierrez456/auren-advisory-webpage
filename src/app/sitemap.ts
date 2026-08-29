import type { MetadataRoute } from "next";
import { posts } from "@/content/recursos";
import { services, site } from "@/content/site";

/**
 * Las rutas salen de los mismos arrays que el resto del sitio: añadir un
 * servicio a `services` o un artículo a `posts` los mete aquí solos.
 *
 * `/demos` no entra: su layout las marca `noindex` a propósito.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  return [
    { url: base, priority: 1 },
    ...["/servicios", "/enfoque", "/recursos", "/radiografia", "/nosotros", "/marca"].map((p) => ({
      url: base + p,
      priority: p === "/marca" ? 0.4 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${base}/servicios/${s.slug}`,
      priority: 0.7,
    })),
    // Los artículos sí tienen fecha de contenido que reflejar.
    ...posts.map((p) => ({
      url: `${base}/recursos/${p.slug}`,
      lastModified: new Date(`${p.updated ?? p.published}T12:00:00-05:00`),
      priority: 0.6,
    })),
  ];
}
