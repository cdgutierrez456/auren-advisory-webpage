import type { MetadataRoute } from "next";
import { posts } from "@/content/recursos";
import { services, site } from "@/content/site";
import { LANGS, localize, type Lang } from "@/lib/i18n";

/**
 * Las rutas salen de los mismos arrays que el resto del sitio: añadir un
 * servicio a `services` o un artículo a `posts` los mete aquí solos.
 *
 * Cada página entra una vez por idioma, y cada entrada declara a su gemela
 * (`alternates.languages`): es lo que le dice al buscador que `/servicios` y
 * `/en/servicios` son la misma página en dos idiomas, no contenido duplicado.
 *
 * `/demos` no entra: su layout las marca `noindex` a propósito.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const url = (path: string, lang: Lang) => base + localize(lang, path).replace(/^\/$/, "");

  const pages: { path: string; priority: number; lastModified?: Date }[] = [
    { path: "/", priority: 1 },
    ...["/servicios", "/enfoque", "/recursos", "/radiografia", "/nosotros", "/marca"].map((p) => ({
      path: p,
      priority: p === "/marca" ? 0.4 : 0.8,
    })),
    ...services.map((s) => ({ path: `/servicios/${s.slug}`, priority: 0.7 })),
    // Los artículos sí tienen fecha de contenido que reflejar.
    ...posts.map((p) => ({
      path: `/recursos/${p.slug}`,
      lastModified: new Date(`${p.updated ?? p.published}T12:00:00-05:00`),
      priority: 0.6,
    })),
  ];

  return pages.flatMap(({ path, ...rest }) =>
    LANGS.map((lang) => ({
      url: url(path, lang),
      ...rest,
      alternates: { languages: { es: url(path, "es"), en: url(path, "en") } },
    })),
  );
}
