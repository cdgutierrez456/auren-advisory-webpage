import { Arrow, Button, Section, SectionHead } from "@/components/ui";
import { Ambient } from "@/components/vertex-art";
import { about } from "@/content/site";
import { Reveal } from "@/components/motion";

/** Adelanto en la home. La versión completa vive en /nosotros. */
export function Nosotros() {
  return (
    <Section tone="deep" className="relative isolate overflow-hidden">
      <Ambient />
      <SectionHead index="06" label={about.eyebrow} invert />

      <div className="relative grid gap-14 md:grid-cols-[1.2fr_1fr] md:gap-24">
        <Reveal className="flex flex-col gap-8">
          <h2 className="text-headline text-balance font-normal">{about.title}</h2>
          <p className="text-lede text-pretty text-fg/75">{about.lede}</p>
          <Button href="/nosotros" variant="lime" className="mt-2 w-fit">
            Conocer la firma <Arrow />
          </Button>
        </Reveal>

        <Reveal as="dl" delay={0.1} className="grid content-start gap-3 self-center">
          {about.facts.map((f) => (
            <div key={f.k} className="glass flex flex-col gap-2 rounded-card px-7 py-6">
              <dt className="label text-accent">{f.k}</dt>
              <dd className="text-pretty text-fg/90">{f.v}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
