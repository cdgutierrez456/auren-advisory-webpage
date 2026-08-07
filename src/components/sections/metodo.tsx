import { Headline, Section, SectionHead } from "@/components/ui";
import { phases } from "@/content/site";

export function Metodo() {
  return (
    <Section id="enfoque" tone="ink">
      <SectionHead index="01" label="El método" invert>
        <Headline>
          Tres movimientos. En este orden, siempre.
        </Headline>
      </SectionHead>

      <ol className="grid gap-px bg-rule-invert md:grid-cols-3">
        {phases.map((phase) => (
          <li
            key={phase.index}
            className="reveal group flex flex-col gap-8 bg-ink p-8 transition-colors duration-500 hover:bg-deep-900 md:p-10 md:pb-14"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs tracking-widest text-lime">{phase.index}</span>
              <span className="h-0.5 w-0 bg-lime transition-all duration-700 ease-out-quint group-hover:w-12" />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none tracking-tight">
                {phase.title}
              </h3>
              <p className="text-lg leading-snug text-balance text-ivory/90">{phase.claim}</p>
              <p className="text-sm leading-relaxed text-pretty text-muted-invert">
                {phase.detail}
              </p>
            </div>

            <ul className="mt-auto flex flex-col gap-3 border-t border-rule-invert pt-7">
              {phase.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3.5 text-sm text-ivory/65"
                >
                  <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-lime" />
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
