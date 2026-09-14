import Link from "next/link";
import { Arrow, Button, Headline, Section, SectionHead } from "@/components/ui";
import { HairlineField } from "@/components/vertex-art";
import { method, phases } from "@/content/site";
import { RevealItem, RevealList } from "@/components/motion";

/** Adelanto en la home. El desarrollo completo vive en /enfoque. */
export function Metodo() {
  return (
    <Section tone="ink" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-accent/40 [mask-image:linear-gradient(120deg,black,transparent_55%)]"
      >
        <HairlineField className="h-full w-full" />
      </div>

      <SectionHead index="01" label={method.eyebrow} invert>
        <Headline>{method.title}</Headline>
      </SectionHead>

      <RevealList as="ol" className="relative grid gap-4 md:grid-cols-3">
        {phases.map((phase) => (
          <RevealItem as="li" key={phase.index}>
            <Link
              href={`/enfoque#${phase.title.toLowerCase()}`}
              className="glass group flex h-full flex-col gap-8 rounded-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40 md:p-10 md:pb-14"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs tracking-widest text-accent">{phase.index}</span>
                <span className="h-0.5 w-0 bg-lime transition-all duration-700 ease-out-quint group-hover:w-12" />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none tracking-tight">
                  {phase.title}
                </h3>
                <p className="text-balance text-lg leading-snug text-fg/90">{phase.claim}</p>
                <p className="text-pretty text-sm leading-relaxed text-fg/60">
                  {phase.detail}
                </p>
              </div>

              <span className="mt-auto flex items-center gap-3 border-t border-line pt-7 text-sm text-fg/55 transition-colors group-hover:text-accent">
                {phase.question}
                <Arrow className="shrink-0" />
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealList>

      <div className="relative mt-12">
        <Button href="/enfoque" variant="lime">
          Ver el método completo <Arrow />
        </Button>
      </div>
    </Section>
  );
}
