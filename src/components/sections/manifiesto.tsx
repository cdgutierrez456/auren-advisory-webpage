import { Section } from "@/components/ui";
import { manifesto } from "@/content/site";
import { Reveal } from "@/components/motion";

/** Recurso editorial: la serif aparece solo aquí y en el norte creativo. */
export function Manifiesto() {
  return (
    <Section tone="paper">
      <div className="grid gap-16 md:grid-cols-[1.15fr_1fr] md:gap-24">
        <Reveal as="blockquote">
          <p className="font-serif text-quote text-balance text-fg">
            {manifesto.quote}
          </p>
        </Reveal>
        <Reveal delay={0.12} className="flex flex-col gap-6 self-end border-l border-lime pl-8 md:pl-10">
          {manifesto.body.map((p) => (
            <p key={p} className="text-pretty leading-relaxed text-fg/75">
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
