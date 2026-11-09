import Link from "@/components/link";
import { Arrow, Headline, Section, SectionHead } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { RevealItem, RevealList } from "@/components/motion";

/**
 * «¿Le suena?» — seis situaciones en la voz del cliente. Es la puerta de
 * entrada por problema: cada una enlaza con la solución que la resuelve.
 */
export async function Problemas() {
  const [{ problems, solutionBySlug }, t] = await Promise.all([getContent(), getT()]);
  return (
    <Section id="problemas" tone="paper">
      <SectionHead label={t("Situaciones frecuentes", "Common situations")}>
        <Headline>
          {t(
            "Las situaciones que con más frecuencia motivan una consulta.",
            "The situations that most often lead to a consultation.",
          )}
        </Headline>
        <p className="mt-6 max-w-xl text-pretty leading-relaxed text-fg/65">
          {t(
            "Cada una enlaza con la solución que la resuelve.",
            "Each one links to the solution that addresses it.",
          )}
        </p>
      </SectionHead>

      <RevealList as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((p) => {
          const sol = solutionBySlug(p.solution);
          if (!sol) return null;
          return (
            <RevealItem as="li" key={p.quote}>
              <Link
                href={`/soluciones#${sol.slug}`}
                className="card group flex h-full flex-col gap-7 rounded-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-fg/40 md:p-8"
              >
                <p className="text-pretty text-xl leading-snug tracking-tight text-fg">
                  {t(`«${p.quote}»`, `“${p.quote}”`)}
                </p>
                <div className="mt-auto flex flex-col gap-2.5 border-t border-line pt-5">
                  <span className="cota flex items-center gap-2 text-fg/55 transition-colors group-hover:text-fg">
                    <Arrow className="shrink-0" />
                    {sol.short}
                  </span>
                  <span className="text-pretty text-sm leading-relaxed text-fg/70">{p.hint}</span>
                </div>
              </Link>
            </RevealItem>
          );
        })}
      </RevealList>
    </Section>
  );
}
