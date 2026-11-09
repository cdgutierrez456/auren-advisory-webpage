import { Lamina, type LaminaKind } from "@/components/laminas";
import { HoverTile } from "@/components/tiles";
import { Arrow, Button, Headline, Section, SectionHead } from "@/components/ui";
import { sectors } from "@/content/site";
import { RevealItem, RevealList } from "@/components/motion";

/**
 * Sectores como tarjetas visuales. Lo visible: el sector y una línea en su
 * vocabulario; al pasar el mouse, las oportunidades. El detalle y los demos
 * viven en /sectores.
 */
export function Sectores() {
  return (
    <Section id="sectores" tone="ivory">
      <SectionHead index="04" label="Sectores" aside="El mismo método, fricciones distintas">
        <Headline>Dónde trabajamos.</Headline>
      </SectionHead>

      <RevealList as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sectors.map((sector) => (
          <RevealItem as="li" key={sector.id}>
            <HoverTile
              href={`/sectores#${sector.id}`}
              title={sector.title}
              tagline={sector.tagline}
              image={sector.image}
              visual={<Lamina kind={sector.id as LaminaKind} />}
              cta="Ver sector y demos"
              ratio="aspect-[3/4]"
            >
              <ul className="flex flex-col gap-1.5">
                {sector.opportunities.slice(0, 3).map((o) => (
                  <li key={o} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-lime" />
                    {o}
                  </li>
                ))}
              </ul>
            </HoverTile>
          </RevealItem>
        ))}
      </RevealList>

      <div className="mt-10">
        <Button href="/sectores" variant="outline">
          Ver sectores y aplicaciones <Arrow />
        </Button>
      </div>
    </Section>
  );
}
