import Link from "next/link";
import { Arrow, Button, Cota, Headline, Section, SectionHead } from "@/components/ui";
import { method, phases } from "@/content/site";
import { RevealItem, RevealList } from "@/components/motion";

/**
 * Cómo trabajamos: Ver · Entender · Transformar como tres estaciones de un
 * mismo recorrido, con lo que produce cada una. Banda `inverse`: es la
 * declaración de método de la firma. El desarrollo completo vive en /enfoque.
 */
export function Metodo() {
  return (
    <Section id="metodo" tone="deep">
      <SectionHead index="04" label={method.eyebrow} aside="Ver · Entender · Transformar">
        <Headline>{method.title}</Headline>
        <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-fg/70">{method.lede}</p>
      </SectionHead>

      <RevealList
        as="ol"
        className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3"
      >
        {phases.map((phase, k) => (
          <RevealItem as="li" key={phase.index}>
            <Link
              href={`/enfoque#${phase.title.toLowerCase()}`}
              className="group flex h-full flex-col gap-8 bg-surface-2 p-8 transition-colors duration-300 hover:bg-surface-3 md:p-10"
            >
              <div className="flex items-center justify-between">
                <Cota className="text-accent">
                  {phase.index} / 03
                </Cota>
                {k < phases.length - 1 ? (
                  <Arrow className="rotate-45 text-fg/40" />
                ) : (
                  <span aria-hidden className="h-2 w-2 rounded-pill bg-lime" />
                )}
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-4xl tracking-tight text-fg md:text-5xl">{phase.title}</h3>
                <p className="text-pretty text-lg leading-snug text-fg/90">{phase.claim}</p>
                <p className="text-pretty text-sm leading-relaxed text-fg/60">{phase.detail}</p>
              </div>

              <div className="mt-auto flex flex-col gap-2 border-t border-line pt-6">
                <Cota className="text-fg/45">Con qué termina</Cota>
                <p className="text-pretty text-sm leading-relaxed text-fg/85">{phase.output}</p>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealList>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Button href="/enfoque" variant="outline">
          Ver el método completo <Arrow />
        </Button>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-fg/60">
          Si al terminar «Entender» el problema se resuelve cambiando un procedimiento, se cambia el
          procedimiento. Ese también es un resultado.
        </p>
      </div>
    </Section>
  );
}
