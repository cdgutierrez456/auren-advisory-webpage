import { RevealCard } from "@/components/tiles";
import { Arrow, Button, Headline, Section, SectionHead } from "@/components/ui";
import { method, phases } from "@/content/site";
import { DrawRule, RevealItem, RevealList } from "@/components/motion";

/**
 * Cómo trabajamos: tres estaciones, una línea que se dibuja entre ellas y la
 * explicación al pasar el mouse. El desarrollo completo vive en /enfoque.
 */
export function Metodo() {
  return (
    <Section id="metodo" tone="deep">
      <SectionHead index="03" label={method.eyebrow} aside="Ver · Entender · Transformar">
        <Headline>{method.title}</Headline>
      </SectionHead>

      <div className="relative">
        <DrawRule className="absolute left-0 right-0 top-0 hidden h-0.5 bg-lime md:block" />
        <RevealList
          as="ol"
          className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3"
        >
          {phases.map((phase) => (
            <RevealItem as="li" key={phase.index}>
              <RevealCard
                index={`${phase.index} / 03`}
                title={phase.title}
                tagline={phase.claim}
                href={`/enfoque#${phase.title.toLowerCase()}`}
              >
                <p>{phase.detail}</p>
                <p className="mt-3 text-fg/90">
                  <span className="cota mr-2 text-accent">Termina con</span>
                  {phase.output}
                </p>
              </RevealCard>
            </RevealItem>
          ))}
        </RevealList>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Button href="/enfoque" variant="outline">
          Ver el método completo <Arrow />
        </Button>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-fg/60">
          Si al entender el problema resulta que no hace falta tecnología, se lo decimos.
        </p>
      </div>
    </Section>
  );
}
