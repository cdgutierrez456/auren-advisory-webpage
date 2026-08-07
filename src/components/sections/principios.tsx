import { Section, SectionHead } from "@/components/ui";
import { principles } from "@/content/site";

export function Principios() {
  return (
    <Section tone="deep">
      <SectionHead index="04" label="Cómo trabajamos" invert />
      <div className="grid gap-12 md:grid-cols-3 md:gap-16">
        {principles.map((p, i) => (
          <div key={p.title} className="reveal flex flex-col gap-5">
            <span className="font-mono text-xs text-lime">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-2xl leading-tight tracking-tight text-balance">{p.title}</h3>
            <p className="text-sm leading-relaxed text-pretty text-ivory/65">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
