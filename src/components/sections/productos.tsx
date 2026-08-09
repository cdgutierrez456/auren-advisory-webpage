import type { CSSProperties } from "react";
import Link from "next/link";
import { Mark } from "@/components/logo";
import { Arrow, Button, Headline, Section, SectionHead } from "@/components/ui";
import { phases, services } from "@/content/site";

/** Fase a la que pertenece cada servicio (la primera que lo referencia). */
const phaseOf = (slug: string) =>
  phases.find((p) => p.services.includes(slug))?.title ?? "";

export function Productos() {
  return (
    <Section id="servicios" tone="paper">
      <SectionHead label="Servicios">
        <Headline className="text-deep">Un solo sistema. Ocho puertas de entrada.</Headline>
        <p className="mt-6 max-w-xl text-pretty leading-relaxed text-deep/65">
          Cada servicio resuelve una etapa distinta, pero todos pertenecen a la misma firma y
          comparten método, lenguaje y forma de medir. Entra por donde su empresa lo necesita.
        </p>
      </SectionHead>

      <div className="reveal-stagger grid gap-px border-y border-rule bg-rule">
        {services.map((s, i) => (
          <Link
            key={s.slug}
            href={`/servicios/${s.slug}`}
            style={{ "--i": i } as CSSProperties}
            className="group grid gap-x-8 gap-y-4 bg-paper py-8 transition-colors duration-500 hover:bg-ivory md:grid-cols-[3.5rem_15rem_1fr_11rem] md:items-baseline md:px-6"
          >
            <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-4">
              <span className="tnum font-mono text-xs text-deep/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Mark
                size={20}
                className="shrink-0 opacity-25 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="wordmark text-sm uppercase text-deep">{s.name}</h3>
              <span className="label text-deep/40">{s.kind}</span>
            </div>

            <p className="max-w-xl text-pretty text-sm leading-relaxed text-deep/65">
              {s.summary}
            </p>

            <div className="flex items-baseline justify-between gap-4 md:flex-col md:items-end md:gap-2">
              <span className="label whitespace-nowrap text-deep/45 transition-colors group-hover:text-deep">
                {phaseOf(s.slug)}
              </span>
              <span className="flex items-center gap-2 text-xs text-deep/45">
                {s.duration}
                <Arrow className="-translate-x-1 opacity-0 transition-all duration-500 ease-out-quint group-hover:translate-x-0 group-hover:opacity-100" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Button href="/servicios" variant="outline">
          Ver todos los servicios <Arrow />
        </Button>
      </div>
    </Section>
  );
}
