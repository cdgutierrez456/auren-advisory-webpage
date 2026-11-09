import Link from "next/link";
import { Lamina } from "@/components/laminas";
import { HoverTile } from "@/components/tiles";
import { Arrow, Button, Headline, Section, SectionHead } from "@/components/ui";
import { solutions } from "@/content/site";
import { RevealItem, RevealList } from "@/components/motion";

/**
 * Las cinco soluciones como tarjetas visuales: imagen, nombre y una línea.
 * Al pasar el mouse se abre lo que obtiene el cliente. El detalle completo
 * vive en /soluciones.
 */
export function Soluciones() {
  return (
    <Section id="soluciones" tone="paper">
      <SectionHead label="Soluciones" aside="Pase el mouse sobre cada tarjeta">
        <Headline>Lo que su empresa necesita, no la tecnología que usamos.</Headline>
      </SectionHead>

      <RevealList as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((s, k) => (
          <RevealItem
            as="li"
            key={s.slug}
            // La primera ocupa dos columnas: es la puerta de entrada habitual.
            className={k === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
          >
            <HoverTile
              href={`/soluciones#${s.slug}`}
              index={String(k + 1).padStart(2, "0")}
              title={s.title}
              tagline={s.tagline}
              image={s.image}
              visual={<Lamina kind={s.glyph} />}
              cta="Ver solución"
              ratio={k === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[32rem]" : "aspect-[4/3]"}
            >
              <ul className="flex flex-col gap-1.5">
                {s.outcomes.map((o) => (
                  <li key={o} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-lime" />
                    {o}
                  </li>
                ))}
              </ul>
            </HoverTile>
          </RevealItem>
        ))}
        {/* Celda de cierre: el camino hacia los servicios. */}
        <RevealItem as="li">
          <Link
            href="/servicios"
            className="card group flex h-full min-h-[14rem] flex-col justify-between gap-6 rounded-card p-7 transition-colors duration-500 hover:bg-surface-3"
          >
            <span className="cota text-fg/55">Cómo lo entregamos</span>
            <div className="flex flex-col gap-3">
              <p className="text-subhead text-balance text-fg">Ocho servicios, un solo método.</p>
              <p className="text-sm text-fg/65">
                Del diagnóstico al soporte continuo, con alcance y entregable definidos.
              </p>
            </div>
            <span className="cota flex items-center gap-2.5 text-fg/60 transition-colors group-hover:text-fg">
              Ver los servicios <Arrow />
            </span>
          </Link>
        </RevealItem>
      </RevealList>

      <div className="mt-10">
        <Button href="/soluciones" variant="solid">
          Todas las soluciones <Arrow />
        </Button>
      </div>
    </Section>
  );
}
