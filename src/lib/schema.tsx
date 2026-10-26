import type { Post } from "@/content/recursos";
import { services, site, type Faq, type Service } from "@/content/site";
import { HTML_LANG, localize, type Lang } from "@/lib/i18n";

/**
 * Datos estructurados (JSON-LD).
 *
 * Un solo módulo para que las entidades se referencien entre sí en vez de
 * repetirse: la firma se declara una vez en el layout con un `@id`, y cada
 * servicio o artículo la apunta con ese id. Duplicar el bloque de la
 * organización en cada página le da al buscador varias entidades parecidas
 * en lugar de una sola con más señales.
 *
 * La firma se declara en español en las dos versiones del sitio: es una sola
 * entidad. Lo que cambia por idioma es la página (`inLanguage`, URL, textos).
 */

const base = `https://${site.domain}`;
export const abs = (path: string) => `${base}${path === "/" ? "" : path}`;

/** @id de la firma. Estable: si cambia, se rompen las referencias cruzadas. */
export const ORG_ID = `${base}/#organizacion`;

/**
 * El contenido es nuestro, pero un `</script>` dentro de un texto cerraría la
 * etiqueta antes de tiempo. Escapar `<` cuesta una línea.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/**
 * La firma: organización y negocio local a la vez. `ProfessionalService`
 * hereda de LocalBusiness, que es lo que habilita la ficha con ciudad y
 * cobertura; `Organization` es lo que asocia el dominio a la entidad.
 */
export const organization = () => ({
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: site.name,
  url: base,
  logo: `${base}/icon.svg`,
  image: `${base}/opengraph-image`,
  description: site.descriptionLong,
  slogan: site.tagline,
  foundingDate: "2026",
  email: site.emails,
  telephone: `+${site.whatsapp}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: "CO",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: [
    { "@type": "Country", name: "Colombia" },
    { "@type": "AdministrativeArea", name: "Eje Cafetero" },
    { "@type": "City", name: "Manizales" },
  ],
  knowsAbout: [
    "Transformación digital",
    "Automatización de procesos empresariales",
    "Inteligencia artificial aplicada",
    "Integración de datos e indicadores",
    "Desarrollo de software a la medida",
    "Visión artificial industrial",
    "Consultoría en procesos",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Auren",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${s.name} — ${s.keyword}`,
        url: abs(`/servicios/${s.slug}`),
      },
    })),
  },
});

/** Sitio, para que el buscador entienda el dominio como una publicación. */
export const website = (lang: Lang = "es") => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${base}/#sitio`,
  url: base,
  name: site.name,
  inLanguage: HTML_LANG[lang],
  publisher: { "@id": ORG_ID },
});

/** Ruta de migas. El primer nivel siempre es la home. */
export const breadcrumb = (trail: readonly { name: string; path: string }[], lang: Lang = "es") => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: lang === "en" ? "Home" : "Inicio", path: "/" }, ...trail].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: abs(localize(lang, item.path)),
  })),
});

export const faqPage = (faqs: readonly Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceSchema = (s: Service, lang: Lang = "es") => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${s.name} — ${s.keyword}`,
  serviceType: s.keyword,
  description: s.summary,
  url: abs(localize(lang, `/servicios/${s.slug}`)),
  inLanguage: HTML_LANG[lang],
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "Colombia" },
  audience: {
    "@type": "BusinessAudience",
    audienceType: lang === "en" ? "Companies and public entities" : "Empresas y entidades",
  },
  serviceOutput: s.deliverable,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: lang === "en" ? `What ${s.name} includes` : `Qué incluye ${s.name}`,
    itemListElement: s.includes.map((item) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: item },
    })),
  },
});

export const articleSchema = (post: Post, lang: Lang = "es") => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.description,
  url: abs(localize(lang, `/recursos/${post.slug}`)),
  mainEntityOfPage: abs(localize(lang, `/recursos/${post.slug}`)),
  datePublished: post.published,
  dateModified: post.updated ?? post.published,
  inLanguage: HTML_LANG[lang],
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  about: post.keyword,
  image: post.image ? abs(post.image.src) : abs(localize(lang, "/opengraph-image")),
});
