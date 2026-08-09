import Link from "next/link";
import { Arrow, Button, Headline, Section, SectionHead } from "@/components/ui";
import { method, phases } from "@/content/site";

/** Adelanto en la home. El desarrollo completo vive en /enfoque. */
export function Metodo() {
  return (
    <Section tone="ink">
      <SectionHead index="01" label={method.eyebrow} invert>
        <Headline>{method.title}</Headline>
      </SectionHead>

      <ol className="grid gap-px bg-rule-invert md:grid-cols-3">
        {phases.map((phase) => (
          <li key={phase.index}>
            <Link
              href={`/enfoque#${phase.title.toLowerCase()}`}
              className="group flex h-full flex-col gap-8 bg-ink p-8 transition-colors duration-500 hover:bg-deep-900 md:p-10 md:pb-14"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs tracking-widest text-lime">{phase.index}</span>
                <span className="h-0.5 w-0 bg-lime transition-all duration-700 ease-out-quint group-hover:w-12" />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none tracking-tight">
                  {phase.title}
                </h3>
                <p className="text-balance text-lg leading-snug text-ivory/90">{phase.claim}</p>
                <p className="text-pretty text-sm leading-relaxed text-muted-invert">
                  {phase.detail}
                </p>
              </div>

              <span className="mt-auto flex items-center gap-3 border-t border-rule-invert pt-7 text-sm text-ivory/60 transition-colors group-hover:text-lime">
                {phase.question}
                <Arrow className="shrink-0" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <Button href="/enfoque" variant="lime">
          Ver el método completo <Arrow />
        </Button>
      </div>
    </Section>
  );
}
