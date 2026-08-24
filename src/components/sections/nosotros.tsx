import type { CSSProperties } from "react";
import { Arrow, Button, Section, SectionHead } from "@/components/ui";
import { about } from "@/content/site";

/** Adelanto en la home. La versión completa vive en /nosotros. */
export function Nosotros() {
  return (
    <Section tone="deep">
      <SectionHead index="04" label={about.eyebrow} invert />

      <div className="grid gap-14 md:grid-cols-[1.2fr_1fr] md:gap-24">
        <div className="reveal flex flex-col gap-8">
          <h2 className="text-headline text-balance font-normal">{about.title}</h2>
          <p className="text-lede text-pretty text-ivory/80">{about.lede}</p>
          <Button href="/nosotros" variant="lime" className="mt-2 w-fit">
            Conocer la firma <Arrow />
          </Button>
        </div>

        <dl className="reveal-stagger grid content-start gap-3 self-center sm:grid-cols-2">
          {about.facts.map((f, i) => (
            <div
              key={f.k}
              style={{ "--i": i } as CSSProperties}
              className="glass flex flex-col gap-2 rounded-card px-6 py-6"
            >
              <dt className="label text-lime">{f.k}</dt>
              <dd className="text-pretty text-ivory/85">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
