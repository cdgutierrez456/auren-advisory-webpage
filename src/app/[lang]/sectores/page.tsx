import type { Metadata } from "next";
import Link from "@/components/link";
import { Lamina, type LaminaKind } from "@/components/laminas";
import { Arrow, Breadcrumbs, CtaBand, Figura, PageHero, Section } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata(
    t("Sectores y aplicaciones de transformación digital", "Digital transformation sectors and applications"),
    t(
      "Problemas y oportunidades de transformación en manufactura, transporte y logística, servicios y salud, y entidades públicas. Con demos que puede probar en su navegador.",
      "Transformation problems and opportunities in manufacturing, transport and logistics, services and health, and public entities. With demos you can try in your browser.",
    ),
    "/sectores",
  );
}

/**
 * Sectores. Cada uno en un bloque corto: imagen, la pregunta con la que
 * abrimos la conversación, las oportunidades frecuentes y los demos que se
 * pueden probar. Nada más.
 */
export default async function Sectores() {
  const [{ demoBySlug, sectors }, t] = await Promise.all([getContent(), getT()]);
  return (
    <>
      <Breadcrumbs trail={[{ name: t("Sectores", "Sectors"), path: "/sectores" }]} />

      <PageHero
        eyebrow={t("Sectores", "Sectors")}
        title={t("El mismo método. Fricciones distintas.", "The same method. Different frictions.")}
        lede={t(
          "Cuatro entornos donde más se repiten los mismos costos escondidos, cada uno en su propio vocabulario.",
          "Four settings where the same hidden costs repeat most often, each in its own vocabulary.",
        )}
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
                  <span className="label text-fg/50">{t("Lo que suele aparecer", "What usually shows up")}</span>
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
                    <span className="label text-fg/50">{t("Demos disponibles", "Available demos")}</span>
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
                      {t(
                        "Datos sintéticos, sin servidor: nada sale de su equipo.",
                        "Synthetic data, no server: nothing leaves your device.",
                      )}
                    </p>
                  </Reveal>
                ) : null}
              </div>
            </div>
          </Section>
        );
      })}

      <CtaBand
        title={t("¿Su sector no está aquí? El método es el mismo.", "Your sector isn't here? The method is the same.")}
        lede={t(
          "Una conversación sobre qué hace la organización y dónde se va el tiempo basta para saber si tiene sentido continuar.",
          "One conversation about what the organization does and where the time goes is enough to know whether it makes sense to continue.",
        )}
      />
    </>
  );
}
