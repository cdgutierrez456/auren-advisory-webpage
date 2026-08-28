import type { MetadataRoute } from "next";
import { services, site } from "@/content/site";

/**
 * Las rutas salen de los mismos arrays que el resto del sitio: añadir un
 * servicio a `services` lo mete aquí solo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  // ponytail: sin lastModified — no hay fechas de contenido que reflejar.
  return [
    { url: base, priority: 1 },
    ...["/enfoque", "/servicios", "/radiografia", "/nosotros", "/marca"].map((p) => ({
      url: base + p,
      priority: 0.8,
    })),
    ...services.map((s) => ({
      url: `${base}/servicios/${s.slug}`,
      priority: 0.6,
    })),
  ];
}
