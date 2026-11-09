import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, Breadcrumbs, CtaBand, PageHero, Section } from "@/components/ui";
import { fechaLarga, postsByDate } from "@/content/recursos";
import type { Figure } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { RevealItem, RevealList } from "@/components/motion";

export const metadata: Metadata = pageMetadata(
  "Guías y herramientas para decidir con criterio",
  "Guías sobre automatización de procesos, transformación digital y decisiones de tecnología para empresas medianas en Colombia, junto con la Radiografía Auren y los demos.",
  "/recursos",
);

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

const herramientas: readonly Pieza[] = [
  {
    href: "/radiografia",
    kind: "Herramienta",
    title: "Radiografía Auren",
    meta: "12 preguntas · 10 minutos · sin registro",
    image: {
      src: "/images/recursos/radiografia.jpg",
      alt: "Gerente responde un cuestionario corto en una tableta frente a una ventana amplia",
      width: 1680,
      height: 944,
    },
  },
  {
    href: "/demos",
    kind: "Herramienta",
    title: "Demos que funcionan",
    meta: "8 piezas en el navegador · datos sintéticos",
    image: {
      src: "/images/recursos/demos.jpg",
      alt: "Portátil sobre una mesa en una bodega con un tablero de indicadores en pantalla",
      width: 1680,
      height: 944,
    },
  },
];

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

export default function Recursos() {
  const guias: Pieza[] = postsByDate.map((post) => ({
    href: `/recursos/${post.slug}`,
    kind: "Guía",
    title: post.title,
    meta: `${fechaLarga(post.published)} · ${post.minutes} min de lectura`,
    image: post.image,
  }));

  return (
    <>
      <Breadcrumbs trail={[{ name: "Recursos", path: "/recursos" }]} />

      <PageHero
        eyebrow="Recursos"
        title="Criterio antes de la cotización."
        lede="Guías que responden completa una pregunta frecuente, y dos herramientas para probar antes de hablar con alguien."
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
        title="Si ninguna guía responde el caso, queda la conversación."
        lede="Una llamada de veinte minutos suele bastar para saber si hay algo que resolver y si Auren es quien debe resolverlo."
      />
    </>
  );
}
