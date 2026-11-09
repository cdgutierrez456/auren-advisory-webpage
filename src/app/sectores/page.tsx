import type { Metadata } from "next";
import Link from "next/link";
import { Lamina, type LaminaKind } from "@/components/laminas";
import { Arrow, Breadcrumbs, CtaBand, Figura, PageHero, Section } from "@/components/ui";
import { demoBySlug } from "@/content/demos";
import { sectors } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = pageMetadata(
  "Sectores y aplicaciones de transformación digital",
  "Problemas y oportunidades de transformación en manufactura, transporte y logística, servicios y salud, y entidades públicas. Con demos que puede probar en su navegador.",
  "/sectores",
);

/**
 * Sectores. Cada uno en un bloque corto: imagen, la pregunta con la que
 * abrimos la conversación, las oportunidades frecuentes y los demos que se
 * pueden probar. Nada más.
 */
export default function Sectores() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Sectores", path: "/sectores" }]} />

      <PageHero
        eyebrow="Sectores"
        title="El mismo método. Fricciones distintas."
        lede="Cuatro entornos donde más se repiten los mismos costos escondidos, cada uno en su propio vocabulario."
      >
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s, k) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="card flex h-full items-start gap-3 rounded-card px-4 py-4 text-sm leading-snug text-fg transition-colors hover:bg-surface-3"
              >
                <span className="cota mt-0.5 text-fg/45">{String(k + 1).padStart(2, "0")}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </PageHero>

      {sectors.map((sector, k) => {
        const demos = sector.demos.map(demoBySlug).filter((d) => d !== undefined);
        return (
          <Section
            key={sector.id}
            id={sector.id}
            tone={k % 2 === 0 ? "ivory" : "paper"}
            className="scroll-mt-20 border-b border-line"
          >
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <Reveal className="relative aspect-[3/4] overflow-hidden rounded-card border border-line lg:sticky lg:top-28 lg:self-start">
                {sector.image ? (
                  <Figura figure={sector.image} />
                ) : (
                  <div className="absolute inset-0">
                    <Lamina kind={sector.id as LaminaKind} />
                  </div>
                )}
              </Reveal>

              <div className="flex flex-col gap-10">
                <Reveal className="flex flex-col gap-4">
                  <span className="label text-fg/50">
                    {String(k + 1).padStart(2, "0")} · {sector.tagline}
                  </span>
                  <h2 className="text-headline text-balance text-fg">{sector.title}</h2>
                  <p className="text-pretty leading-relaxed text-fg/75">{sector.body}</p>
                  <p className="border-l-2 border-lime pl-5 font-serif text-2xl italic leading-snug text-balance text-fg/90">
                    {sector.question}
                  </p>
                </Reveal>

                <Reveal className="flex flex-col gap-4">
                  <span className="label text-fg/50">Lo que suele aparecer</span>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {sector.opportunities.map((o) => (
                      <li key={o} className="flex gap-3 text-pretty text-sm leading-relaxed text-fg/85">
                        <span aria-hidden className="mt-2 h-0.5 w-3 shrink-0 bg-lime" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {demos.length ? (
                  <Reveal className="flex flex-col gap-4">
                    <span className="label text-fg/50">Pruébelo ahora</span>
                    <ul className="card grid divide-y divide-line overflow-hidden rounded-card">
                      {demos.map((d) => (
                        <li key={d.slug}>
                          <Link
                            href={`/demos/${d.slug}`}
                            className="group flex items-center justify-between gap-6 px-5 py-4 transition-colors hover:bg-fg/[0.03]"
                          >
                            <span className="flex flex-col gap-1">
                              <span className="text-fg">{d.nombre}</span>
                              <span className="text-xs leading-relaxed text-fg/55">{d.resumen}</span>
                            </span>
                            <Arrow className="shrink-0 text-fg/40 transition-colors group-hover:text-fg" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs leading-relaxed text-fg/50">
                      Datos sintéticos, sin servidor: nada sale de su equipo.
                    </p>
                  </Reveal>
                ) : null}
              </div>
            </div>
          </Section>
        );
      })}

      <CtaBand
        title="¿Su sector no está aquí? El método es el mismo."
        lede="Cuéntenos qué hace su organización y dónde se le va el tiempo."
      />
    </>
  );
}
