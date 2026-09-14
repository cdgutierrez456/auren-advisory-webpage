import Link from "next/link";
import { Mark } from "@/components/logo";
import { Arrow, Button, Headline, Section, SectionHead } from "@/components/ui";
import { services } from "@/content/site";
import { Reveal } from "@/components/motion";

export function Productos() {
  return (
    <Section id="servicios" tone="paper">
      <SectionHead index="03" label="Arquitectura de servicios">
        <Headline className="text-fg">Un solo sistema. Ocho puertas de entrada.</Headline>
        <p className="mt-6 max-w-xl text-pretty leading-relaxed text-fg/55">
          Cada servicio resuelve una etapa distinta, pero todos pertenecen a la misma firma y
          comparten método, lenguaje y forma de medir.
        </p>
      </SectionHead>

      <Reveal className="glass grid divide-y divide-line overflow-hidden rounded-card">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/servicios/${s.slug}`}
            className="group grid gap-4 px-7 py-8 transition-colors duration-500 hover:bg-fg/5 md:grid-cols-[auto_15rem_1fr_auto] md:items-baseline md:gap-10 md:px-9"
          >
            <Mark
              size={22}
              className="shrink-0 opacity-40 transition-opacity duration-500 group-hover:opacity-100"
            />
            <h3 className="wordmark text-sm uppercase text-fg">{s.name}</h3>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-fg/55">
              {s.summary}
            </p>
            <span className="label flex items-center gap-3 whitespace-nowrap text-fg/40 transition-colors group-hover:text-fg">
              {s.kind}
              <Arrow className="-translate-x-1 opacity-0 transition-all duration-500 ease-out-quint group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </Link>
        ))}
      </Reveal>

      <div className="mt-12">
        <Button href="/servicios" variant="outline">
          Ver todos los servicios <Arrow />
        </Button>
      </div>
    </Section>
  );
}
