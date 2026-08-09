import Link from "next/link";
import { Mark } from "@/components/logo";
import { Arrow, Button, Headline, Section, SectionHead } from "@/components/ui";
import { services } from "@/content/site";

export function Productos() {
  return (
    <Section id="servicios" tone="paper">
      <SectionHead index="03" label="Arquitectura de servicios">
        <Headline className="text-deep">Un solo sistema. Ocho puertas de entrada.</Headline>
        <p className="mt-6 max-w-xl text-pretty leading-relaxed text-deep/65">
          Cada servicio resuelve una etapa distinta, pero todos pertenecen a la misma firma y
          comparten método, lenguaje y forma de medir.
        </p>
      </SectionHead>

      <div className="grid gap-px border-y border-rule bg-rule">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/servicios/${s.slug}`}
            className="group grid gap-4 bg-paper py-9 transition-colors duration-500 hover:bg-ivory md:grid-cols-[auto_15rem_1fr_auto] md:items-baseline md:gap-10 md:px-6"
          >
            <Mark
              size={22}
              className="shrink-0 opacity-30 transition-opacity duration-500 group-hover:opacity-100"
            />
            <h3 className="wordmark text-sm uppercase text-deep">{s.name}</h3>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-deep/65">
              {s.summary}
            </p>
            <span className="label flex items-center gap-3 whitespace-nowrap text-deep/40 transition-colors group-hover:text-deep">
              {s.kind}
              <Arrow className="-translate-x-1 opacity-0 transition-all duration-500 ease-out-quint group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
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
