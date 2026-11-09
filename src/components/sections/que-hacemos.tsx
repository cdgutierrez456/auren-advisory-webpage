import { Cota, Section, SectionHead } from "@/components/ui";
import { dimensions, manifesto } from "@/content/site";
import { Reveal, RevealItem, RevealList } from "@/components/motion";

/**
 * Qué hacemos: la definición de la firma y las cuatro dimensiones de la
 * propuesta de valor como una sola franja. La serif aparece solo en la cita.
 */
export function QueHacemos() {
  return (
    <Section id="que-hacemos" tone="ivory">
      <SectionHead index="01" label="Qué hacemos" aside="Transformación empresarial mediante tecnología" />

      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-20">
        <Reveal as="blockquote">
          <p className="font-serif text-quote text-balance text-fg">{manifesto.quote}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-5 self-end">
          {manifesto.body.map((p) => (
            <p key={p} className="text-pretty leading-relaxed text-fg/75">
              {p}
            </p>
          ))}
        </Reveal>
      </div>

      {/* Las cuatro dimensiones: una forma de trabajar, no un menú. Una sola
          pieza con divisores de 1px, numerada como un plano. */}
      <RevealList
        as="ol"
        className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-4"
      >
        {dimensions.map((d, k) => (
          <RevealItem as="li" key={d.index} className="relative flex flex-col gap-5 bg-surface-2 p-7 md:p-8">
            <div className="flex items-center justify-between">
              <Cota className="text-fg/55">{d.index}</Cota>
              {k < dimensions.length - 1 ? (
                <span aria-hidden className="hidden h-px w-8 bg-line-strong md:block" />
              ) : null}
            </div>
            <h3 className="text-subhead text-fg">{d.title}</h3>
            <p className="text-pretty text-sm leading-relaxed text-fg/70">{d.body}</p>
          </RevealItem>
        ))}
      </RevealList>
    </Section>
  );
}
