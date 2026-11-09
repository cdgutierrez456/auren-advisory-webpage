import Link from "next/link";
import { Arrow, Button, Cota, Headline, Section, SectionHead } from "@/components/ui";
import { demos } from "@/content/demos";
import { about } from "@/content/site";
import { RevealItem, RevealList } from "@/components/motion";

/**
 * Por qué creer, en una sola fila: piezas que funcionan, quién responde y
 * lo que la firma no hace. Nada aquí es un testimonio de ejemplo.
 */
export function Confianza() {
  return (
    <Section id="confianza" tone="paper">
      <SectionHead index="05" label="Por qué creer" aside="Fundada en 2026 · Manizales">
        <Headline>Sin casos que mostrar todavía. Con cosas que puede probar hoy.</Headline>
      </SectionHead>

      <RevealList className="grid gap-4 lg:grid-cols-3">
        <RevealItem className="card flex flex-col gap-6 rounded-card p-7">
          <Cota className="text-fg/55">Demos que funcionan</Cota>
          <p className="text-pretty text-lg leading-snug text-fg">
            Ocho piezas reales en su navegador. Datos sintéticos, sin servidor.
          </p>
          <ul className="flex flex-wrap gap-2">
            {demos.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/demos/${d.slug}`}
                  className="inline-flex items-center gap-2 rounded-pill border border-line-strong px-3.5 py-1.5 text-xs text-fg/80 transition-colors hover:border-fg hover:text-fg"
                >
                  {d.corto} <Arrow />
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/demos" variant="outline" className="mt-auto w-fit">
            Probar los demos <Arrow />
          </Button>
        </RevealItem>

        <RevealItem className="card flex flex-col gap-6 rounded-card p-7">
          <Cota className="text-fg/55">Quién responde</Cota>
          <ul className="flex flex-col">
            {about.founders.map((f) => (
              <li key={f.email} className="flex flex-col gap-1 border-t border-line py-4">
                <p className="text-fg">{f.name}</p>
                <p className="text-pretty text-sm leading-relaxed text-fg/60">{f.role}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/nosotros"
            className="cota mt-auto flex w-fit items-center gap-3 text-fg/60 transition-colors hover:text-fg"
          >
            Conocer la firma <Arrow />
          </Link>
        </RevealItem>

        <RevealItem className="card flex flex-col gap-6 rounded-card p-7">
          <Cota className="text-fg/55">Lo que no hacemos</Cota>
          <ul className="flex flex-col gap-4">
            {about.boundaries.map((b) => (
              <li key={b} className="flex gap-4 text-pretty text-sm leading-relaxed text-fg/75">
                <span aria-hidden className="mt-2 h-0.5 w-4 shrink-0 bg-lime" />
                {b}
              </li>
            ))}
          </ul>
        </RevealItem>
      </RevealList>
    </Section>
  );
}
