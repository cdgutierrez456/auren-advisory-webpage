import { Section } from "@/components/ui";
import { manifesto } from "@/content/site";

/** Recurso editorial: la serif aparece solo aquí y en el norte creativo. */
export function Manifiesto() {
  return (
    <Section tone="paper">
      <div className="grid gap-16 md:grid-cols-[1.15fr_1fr] md:gap-24">
        <blockquote className="reveal">
          <p className="font-serif text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.12] text-balance text-deep">
            {manifesto.quote}
          </p>
        </blockquote>
        <div className="reveal flex flex-col gap-6 self-end border-l border-lime pl-8">
          {manifesto.body.map((p) => (
            <p key={p} className="text-pretty leading-relaxed text-deep/70">
              {p}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
