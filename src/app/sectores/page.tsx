import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Breadcrumbs, Cota, CtaBand, PageHero, Section } from "@/components/ui";
import { demoBySlug } from "@/content/demos";
import { sectors, serviceBySlug } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Reveal, RevealItem, RevealList } from "@/components/motion";

export const metadata: Metadata = pageMetadata(
  "Sectores y aplicaciones de transformación digital",
  "Problemas y oportunidades de transformación en manufactura, transporte y logística, servicios y salud, y entidades públicas. Con demos que puede probar en su navegador.",
  "/sectores",
);

/**
 * Sectores y aplicaciones: el mismo método en cuatro entornos distintos, con
 * el vocabulario de cada uno, las oportunidades que suelen aparecer y los
 * demos que se pueden probar. Es la página que un gerente de transporte o un
 * secretario de gobierno necesita para reconocerse antes de escribir.
 */
export default function Sectores() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Sectores", path: "/sectores" }]} />

      <PageHero
        eyebrow="Sectores y aplicaciones"
        pad={false}
        title={
          <>
            <span className="block">El mismo método. Fricciones distintas.</span>
            <span className="mt-6 block max-w-3xl text-balance text-lg leading-snug tracking-tight text-fg/75 md:text-xl">
              Transformación digital en manufactura, transporte y logística, servicios y salud, y
              entidades públicas.
            </span>
          </>
        }
        lede="Nadie se reconoce en «automatización de procesos». Se reconoce en el preoperacional en papel, en el término que se vence un viernes o en el manómetro que alguien anota tres veces al día. Aquí está cada sector en su propio vocabulario."
      >
        <RevealList as="ol" className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s, k) => (
            <RevealItem as="li" key={s.id}>
              <a
                href={`#${s.id}`}
                className="flex h-full flex-col gap-3 bg-surface-2 px-5 py-5 transition-colors hover:bg-surface-3"
              >
                <Cota className="text-fg/45">{String(k + 1).padStart(2, "0")}</Cota>
                <span className="text-sm leading-snug text-fg">{s.title}</span>
              </a>
            </RevealItem>
          ))}
        </RevealList>
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
            <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
              <div className="flex flex-col gap-6 self-start lg:sticky lg:top-28">
                <Cota className="text-fg/55">
                  {String(k + 1).padStart(2, "0")} / {String(sectors.length).padStart(2, "0")}
                </Cota>
                <h2 className="text-headline text-balance text-fg">{sector.title}</h2>
                <p className="text-pretty leading-relaxed text-fg/75">{sector.body}</p>
                <p className="border-l-2 border-lime pl-5 font-serif text-2xl italic leading-snug text-balance text-fg/90">
                  {sector.question}
                </p>
              </div>

              <div className="flex flex-col gap-12">
                <div className="grid gap-10 md:grid-cols-2">
                  <Reveal className="flex flex-col gap-5">
                    <Cota className="text-fg/55">Dónde entramos</Cota>
                    <ul className="flex flex-col gap-3">
                      {sector.cases.map((c) => (
                        <li key={c} className="flex gap-3.5 text-pretty text-sm leading-relaxed text-fg/80">
                          <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.08} className="flex flex-col gap-5">
                    <Cota className="text-fg/55">Oportunidades frecuentes</Cota>
                    <ul className="flex flex-col gap-3">
                      {sector.opportunities.map((o) => (
                        <li key={o} className="flex gap-3.5 text-pretty text-sm leading-relaxed text-fg/80">
                          <span aria-hidden className="mt-2 h-0.5 w-3 shrink-0 bg-lime" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>

                {demos.length ? (
                  <Reveal className="flex flex-col gap-5">
                    <Cota className="text-fg/55">Pruébelo ahora</Cota>
                    <ul className="card grid divide-y divide-line overflow-hidden rounded-card">
                      {demos.map((d) => (
                        <li key={d.slug}>
                          <Link
                            href={`/demos/${d.slug}`}
                            className="group grid gap-2 px-5 py-5 transition-colors hover:bg-fg/[0.03] md:grid-cols-[14rem_1fr_auto] md:items-center md:gap-8 md:px-6"
                          >
                            <span className="text-fg">{d.nombre}</span>
                            <span className="text-pretty text-sm leading-relaxed text-fg/65">{d.resumen}</span>
                            <span className="cota flex items-center gap-2.5 whitespace-nowrap text-fg/50 transition-colors group-hover:text-fg">
                              Abrir demo <Arrow />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="text-pretty text-xs leading-relaxed text-fg/55">
                      Datos sintéticos, sin servidor. Lo que corre en los demos de cámara no sale de su
                      equipo.
                    </p>
                  </Reveal>
                ) : null}

                <div className="flex flex-col gap-3 border-t border-line pt-6">
                  <Cota className="text-fg/45">Servicios que suelen aplicar</Cota>
                  <ul className="flex flex-wrap gap-2">
                    {sector.services.map((slug) => {
                      const service = serviceBySlug(slug);
                      if (!service) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/servicios/${slug}`}
                            className="inline-flex items-center gap-2 rounded-pill border border-line-strong px-4 py-2 text-xs text-fg/80 transition-colors hover:border-fg hover:text-fg"
                          >
                            {service.name} <Arrow />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <CtaBand
        title="¿Su sector no está aquí? El método es el mismo."
        lede="Cuéntenos qué hace su organización y dónde se le va el tiempo. En treinta minutos sabemos si tiene sentido seguir hablando."
      />
    </>
  );
}
