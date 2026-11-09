import Link from "next/link";
import { Arrow, Button, Cota, Headline, Section, SectionHead } from "@/components/ui";
import { demos } from "@/content/demos";
import { about } from "@/content/site";
import { Reveal } from "@/components/motion";

/**
 * Por qué creerle a una firma nueva. Sin casos publicados, la confianza se
 * construye con tres cosas verificables: piezas que funcionan y se pueden
 * probar, las personas que responden del trabajo, y los límites que la firma
 * se impone. Nada aquí es un testimonio de ejemplo.
 */
export function Confianza() {
  return (
    <Section id="confianza" tone="ivory">
      <SectionHead index="06" label="Por qué creer" aside="Fundada en 2026 · Manizales">
        <Headline>Sin casos que mostrar todavía. Con cosas que puede probar hoy.</Headline>
        <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-fg/65">
          Una firma recién fundada no tiene trayectoria que exhibir. Tiene algo mejor que una
          promesa: piezas que funcionan, nombres propios y reglas que se cumplen.
        </p>
      </SectionHead>

      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <Reveal className="card flex flex-col gap-8 rounded-card p-7 md:p-10">
          <Cota className="text-fg/55">Demos que funcionan</Cota>
          <div className="flex flex-col gap-4">
            <h3 className="text-subhead text-balance text-fg">
              Ocho piezas reales corriendo en su navegador.
            </h3>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-fg/70 md:text-base">
              Inspección preoperacional, vencimientos de flota, PQRSD con términos de ley, lectura
              de medidores y placas por cámara, costo de la fricción. Datos sintéticos, sin
              servidor: nada sale de su equipo y nada queda guardado.
            </p>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {demos.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/demos/${d.slug}`}
                  className="group flex items-center justify-between gap-4 border-t border-line py-3.5 text-sm text-fg/80 transition-colors hover:text-fg"
                >
                  <span className="flex flex-col">
                    <span>{d.nombre}</span>
                    <span className="cota mt-1 text-fg/45" aria-hidden>
                      {d.segmento}
                    </span>
                  </span>
                  <Arrow className="shrink-0 text-fg/40 transition-colors group-hover:text-fg" />
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <Button href="/demos" variant="outline">
              Probar los demos <Arrow />
            </Button>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          <Reveal delay={0.08} className="card flex flex-col gap-6 rounded-card p-7 md:p-9">
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
              className="cota flex w-fit items-center gap-3 text-fg/60 transition-colors hover:text-fg"
            >
              Conocer la firma <Arrow />
            </Link>
          </Reveal>

          <Reveal delay={0.14} className="card flex flex-col gap-6 rounded-card p-7 md:p-9">
            <Cota className="text-fg/55">Lo que no hacemos</Cota>
            <ul className="flex flex-col gap-4">
              {about.boundaries.map((b) => (
                <li key={b} className="flex gap-4 text-pretty text-sm leading-relaxed text-fg/75">
                  <span aria-hidden className="mt-2 h-0.5 w-4 shrink-0 bg-lime" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
