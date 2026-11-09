import Link from "next/link";
import { SolutionGlyph } from "@/components/diagrams";
import { Arrow, Button, Cota, Headline, Section, SectionHead } from "@/components/ui";
import { solutions } from "@/content/site";
import { Reveal } from "@/components/motion";

/**
 * Las cinco soluciones, organizadas por necesidad. Un solo panel con
 * divisores: cada fila es una solución; el detalle vive en /soluciones.
 */
export function Soluciones() {
  return (
    <Section id="soluciones" tone="ivory">
      <SectionHead index="03" label="Soluciones" aside="Cinco frentes · un solo método">
        <Headline>
          Organizadas por lo que su empresa necesita, no por la tecnología que usamos.
        </Headline>
      </SectionHead>

      <Reveal as="ol" className="card grid divide-y divide-line overflow-hidden rounded-card">
        {solutions.map((s, k) => (
          <li key={s.slug}>
            <Link
              href={`/soluciones#${s.slug}`}
              className="group grid gap-6 px-6 py-8 transition-colors duration-300 hover:bg-fg/[0.03] md:grid-cols-[8rem_1.2fr_1fr_auto] md:items-center md:gap-10 md:px-8 md:py-9"
            >
              <SolutionGlyph kind={s.glyph} className="w-28 text-fg/80 md:w-full" />

              <div className="flex flex-col gap-2.5">
                <Cota className="text-fg/45">{String(k + 1).padStart(2, "0")}</Cota>
                <h3 className="text-subhead text-balance text-fg">{s.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-fg/60">{s.question}</p>
              </div>

              <ul className="flex flex-col gap-2 border-l border-line pl-5">
                {s.outcomes.map((o) => (
                  <li key={o} className="text-pretty text-sm leading-relaxed text-fg/75">
                    {o}
                  </li>
                ))}
              </ul>

              <span className="cota flex items-center gap-3 whitespace-nowrap text-fg/55 transition-colors group-hover:text-fg">
                Ver solución
                <Arrow className="transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </Reveal>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Button href="/soluciones" variant="solid">
          Todas las soluciones <Arrow />
        </Button>
        <Link
          href="/servicios"
          className="text-sm text-fg/65 underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
        >
          Ver los ocho servicios con los que las entregamos
        </Link>
      </div>
    </Section>
  );
}
