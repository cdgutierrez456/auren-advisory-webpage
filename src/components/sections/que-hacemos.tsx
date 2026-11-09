import { RevealCard } from "@/components/tiles";
import { Section, SectionHead } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { Reveal, RevealItem, RevealList } from "@/components/motion";

/**
 * Qué hacemos: una frase y cuatro tarjetas que se abren. Lo visible es el
 * nombre de la dimensión y una línea; la explicación aparece al pasar el
 * mouse o al tocar.
 */
export async function QueHacemos() {
  const [{ dimensions, manifesto }, t] = await Promise.all([getContent(), getT()]);
  /** La línea visible de cada dimensión. Cinco palabras o menos. */
  const short: Record<string, string> = {
    "01": t("Hacia dónde evolucionar", "Where to evolve"),
    "02": t("Cómo funciona la empresa", "How the company works"),
    "03": t("La herramienta que el problema pide", "The tool the problem calls for"),
    "04": t("Que la mejora ocurra y se mida", "Improvement that happens and is measured"),
  };
  return (
    <Section id="que-hacemos" tone="ivory">
      <SectionHead label={t("Qué hacemos", "What we do")} />

      <Reveal as="blockquote" className="max-w-4xl">
        <p className="font-serif text-quote text-balance text-fg">{manifesto.quote}</p>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg/70">
          {t(
            "Auren entiende el negocio, identifica oportunidades y desarrolla soluciones que lo transforman.",
            "Auren understands the business, identifies opportunities and builds solutions that transform it.",
          )}
        </p>
      </Reveal>

      <RevealList
        as="ol"
        className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
      >
        {dimensions.map((d) => (
          <RevealItem as="li" key={d.index}>
            <RevealCard index={d.index} title={d.title} tagline={short[d.index]}>
              {d.body}
            </RevealCard>
          </RevealItem>
        ))}
      </RevealList>
    </Section>
  );
}
