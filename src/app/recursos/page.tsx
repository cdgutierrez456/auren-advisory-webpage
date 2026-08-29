import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Breadcrumbs, CtaBand, PageHero, Section } from "@/components/ui";
import { fechaLarga, postsByDate } from "@/content/recursos";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Guías de automatización y transformación digital",
  "Guías prácticas sobre automatización de procesos, transformación digital y decisiones de tecnología para empresas medianas en Colombia.",
  "/recursos",
);

export default function Recursos() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Recursos", path: "/recursos" }]} />

      <PageHero
        eyebrow="Recursos"
        pad={false}
        title={
          <>
            <span className="block">Criterio, antes de la cotización.</span>
            <span className="mt-7 block max-w-3xl text-balance text-xl leading-snug tracking-tight text-deep/70 md:text-2xl">
              Guías sobre automatización de procesos, transformación digital y decisiones
              de tecnología para empresas medianas.
            </span>
          </>
        }
        lede="Cada artículo responde completa una pregunta que nos hacen antes de contratar. No son resúmenes que terminan en «escríbanos para saber más»: si alguien resuelve su caso leyendo esto y no nos necesita, el artículo hizo su trabajo."
      />

      <Section tone="paper">
        <ul className="grid gap-px border-y border-rule bg-rule">
          {postsByDate.map((post) => (
            <li key={post.slug} className="bg-paper">
              <Link
                href={`/recursos/${post.slug}`}
                className="group grid gap-5 py-10 transition-colors duration-500 hover:bg-ivory md:grid-cols-[1fr_20rem] md:gap-16 md:px-6"
              >
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl leading-snug text-balance tracking-tight text-deep md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="max-w-2xl text-pretty leading-relaxed text-deep/65">
                    {post.lede}
                  </p>
                </div>
                <div className="flex flex-col gap-4 md:items-end md:text-right">
                  <span className="label text-deep/40">
                    {fechaLarga(post.published)} · {post.minutes} min
                  </span>
                  <span className="label flex items-center gap-3 text-deep transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                    Leer <Arrow />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="¿Su caso no está en ninguno de estos artículos?"
        lede="Escríbanos y lo conversamos. Una llamada de veinte minutos suele bastar para saber si hay algo que resolver y si somos nosotros quienes debemos resolverlo."
      />
    </>
  );
}
