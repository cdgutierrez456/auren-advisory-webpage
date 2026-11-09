import Link from "next/link";
import { Arrow, Button, Headline, Section, SectionHead } from "@/components/ui";
import { sectors } from "@/content/site";
import { RevealItem, RevealList } from "@/components/motion";

/**
 * Sectores, en resumen. Un gerente de transporte no se reconoce en
 * «automatización de procesos»; se reconoce en «preoperacional en papel».
 * El desarrollo (oportunidades y demos) vive en /sectores.
 */
export function Sectores() {
  return (
    <Section id="sectores" tone="paper">
      <SectionHead index="05" label="Sectores">
        <Headline>Dónde trabajamos, y con qué se encuentra uno ahí.</Headline>
        <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-fg/65">
          El método es el mismo en todos; la fricción no. Cuatro entornos donde más hemos visto
          repetirse los mismos costos escondidos.
        </p>
      </SectionHead>

      <RevealList as="ul" className="grid gap-4 md:grid-cols-2">
        {sectors.map((sector) => (
          <RevealItem as="li" key={sector.id}>
            <Link
              href={`/sectores#${sector.id}`}
              className="card group flex h-full flex-col gap-6 rounded-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-fg/40 md:p-9"
            >
              <div className="flex items-start justify-between gap-6">
                <h3 className="text-subhead text-balance text-fg">{sector.title}</h3>
                <Arrow className="mt-2 shrink-0 text-fg/40 transition-colors group-hover:text-fg" />
              </div>
              <p className="text-pretty text-sm leading-relaxed text-fg/70">{sector.body}</p>
              <p className="mt-auto border-t border-line pt-5 font-serif text-xl italic leading-snug text-fg/85">
                {sector.question}
              </p>
            </Link>
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
