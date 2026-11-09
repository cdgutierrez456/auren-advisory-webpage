import { RevealCard } from "@/components/tiles";
import { Section, SectionHead } from "@/components/ui";
import { dimensions, manifesto } from "@/content/site";
import { Reveal, RevealItem, RevealList } from "@/components/motion";

/**
 * Qué hacemos: una frase y cuatro tarjetas que se abren. Lo visible es el
 * nombre de la dimensión y una línea; la explicación aparece al pasar el
 * mouse o al tocar.
 */
export function QueHacemos() {
  return (
    <Section id="que-hacemos" tone="ivory">
      <SectionHead label="Qué hacemos" />

      <Reveal as="blockquote" className="max-w-4xl">
        <p className="font-serif text-quote text-balance text-fg">{manifesto.quote}</p>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg/70">
          Entendemos su negocio, identificamos oportunidades y desarrollamos soluciones que lo
          transforman.
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

/** La línea visible de cada dimensión. Cinco palabras o menos. */
const short: Record<string, string> = {
  "01": "Hacia dónde evolucionar",
  "02": "Cómo funciona la empresa",
  "03": "La herramienta que el problema pide",
  "04": "Que la mejora ocurra y se mida",
};
