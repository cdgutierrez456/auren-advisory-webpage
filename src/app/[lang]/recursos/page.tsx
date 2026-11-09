import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/link";
import { Arrow, Breadcrumbs, CtaBand, PageHero, Section } from "@/components/ui";
import type { Figure } from "@/content/site";
import { getContent, getT } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { RevealItem, RevealList } from "@/components/motion";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata(
    t("Guías y herramientas para decidir con criterio", "Guides and tools to decide with judgment"),
    t(
      "Guías sobre automatización de procesos, transformación digital y decisiones de tecnología para empresas medianas en Colombia, junto con la Radiografía Auren y los demos.",
      "Guides on process automation, digital transformation and technology decisions for mid-sized companies in Colombia, along with the Auren X-Ray and the demos.",
    ),
    "/recursos",
  );
}

/**
 * Recursos, como galería. Cada pieza es una imagen con su título; la tarjeta
 * completa lleva a donde corresponde. Las guías se leen como documento; la
 * Radiografía y los demos son herramientas y se presentan en la misma rejilla.
 */

type Pieza = {
  href: string;
  kind: string;
  title: string;
  meta: string;
  image?: Figure;
};

function Tarjeta({ pieza, priority = false }: { pieza: Pieza; priority?: boolean }) {
  return (
    <Link
      href={pieza.href}
      className="group relative isolate block overflow-hidden rounded-card border border-line bg-deep text-ivory"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {pieza.image ? (
          <Image
            src={pieza.image.src}
            alt={pieza.image.alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-deep to-deep-900" />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-deep-900/90 via-deep-900/30 to-transparent"
        />
        <span className="label absolute left-5 top-5 rounded-pill border border-ivory/25 bg-deep-900/50 px-3 py-1.5 text-ivory/85 backdrop-blur-sm">
          {pieza.kind}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
        <h2 className="text-balance text-xl leading-snug tracking-tight text-ivory md:text-2xl">
          {pieza.title}
        </h2>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-ivory/65">{pieza.meta}</span>
          <Arrow className="shrink-0 text-lime transition-transform duration-500 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}

export default async function Recursos() {
  const [{ fechaLarga, postsByDate }, t] = await Promise.all([getContent(), getT()]);

  const herramientas: readonly Pieza[] = [
    {
      href: "/radiografia",
      kind: t("Herramienta", "Tool"),
      title: t("Radiografía Auren", "Auren X-Ray"),
      meta: t("12 preguntas · 10 minutos · sin registro", "12 questions · 10 minutes · no sign-up"),
      image: {
        src: "/images/recursos/radiografia.jpg",
        alt: t(
          "Gerente responde un cuestionario corto en una tableta frente a una ventana amplia",
          "A manager answers a short questionnaire on a tablet by a wide window",
        ),
        width: 1680,
        height: 944,
      },
    },
    {
      href: "/demos",
      kind: t("Herramienta", "Tool"),
      title: t("Demos que funcionan", "Demos that work"),
      meta: t("8 piezas en el navegador · datos sintéticos", "8 pieces in the browser · synthetic data"),
      image: {
        src: "/images/recursos/demos.jpg",
        alt: t(
          "Portátil sobre una mesa en una bodega con un tablero de indicadores en pantalla",
          "A laptop on a table in a warehouse showing a dashboard",
        ),
        width: 1680,
        height: 944,
      },
    },
  ];

  const guias: Pieza[] = postsByDate.map((post) => ({
    href: `/recursos/${post.slug}`,
    kind: t("Guía", "Guide"),
    title: post.title,
    meta: `${fechaLarga(post.published)} · ${post.minutes} ${t("min de lectura", "min read")}`,
    image: post.image,
  }));

  return (
    <>
      <Breadcrumbs trail={[{ name: t("Recursos", "Resources"), path: "/recursos" }]} />

      <PageHero
        eyebrow={t("Recursos", "Resources")}
        title={t("Criterio antes de la cotización.", "Judgment before the quote.")}
        lede={t(
          "Guías que responden completa una pregunta frecuente, y dos herramientas para probar antes de hablar con alguien.",
          "Guides that fully answer a common question, and two tools to try before talking to anyone.",
        )}
      />

      <Section tone="paper">
        <RevealList as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guias.map((p, k) => (
            <RevealItem as="li" key={p.href}>
              <Tarjeta pieza={p} priority={k === 0} />
            </RevealItem>
          ))}
          {herramientas.map((p) => (
            <RevealItem as="li" key={p.href}>
              <Tarjeta pieza={p} />
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      <CtaBand
        title={t(
          "Si ninguna guía responde el caso, queda la conversación.",
          "If no guide answers your case, there's still the conversation.",
        )}
        lede={t(
          "Una llamada de veinte minutos suele bastar para saber si hay algo que resolver y si Auren es quien debe resolverlo.",
          "A twenty-minute call is usually enough to know whether there's something to solve and whether Auren is the one who should solve it.",
        )}
      />
    </>
  );
}
