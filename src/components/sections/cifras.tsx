import type { CSSProperties } from "react";
import { Em, Headline, Section, SectionHead } from "@/components/ui";
import { about, services } from "@/content/site";

/**
 * Banda de cifras — al estilo del "stat block" de Raven, pero con datos
 * verdaderos y verificables desde el contenido, no métricas inventadas.
 */
const stats = [
  {
    n: String(about.disciplines.length),
    label: "disciplinas que rara vez conviven en una misma firma: técnica, práctica y empírica.",
  },
  {
    n: String(services.length),
    label: "servicios en un solo sistema, con un mismo método, lenguaje y forma de medir.",
  },
  {
    n: "0",
    label: "comisiones de proveedores de software. Si recomendamos una herramienta, es porque encaja.",
  },
];

export function Cifras() {
  return (
    <Section tone="deep">
      <SectionHead label="La firma en corto" invert>
        <Headline>
          Una firma, no un <Em className="text-lime">catálogo</Em> de herramientas.
        </Headline>
      </SectionHead>

      <dl className="reveal-stagger grid gap-px bg-rule-invert sm:grid-cols-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{ "--i": i } as CSSProperties}
            className="flex flex-col gap-5 bg-deep pt-10 md:gap-7"
          >
            <dt className="tnum text-mega font-normal leading-none tracking-tight text-ivory">
              {s.n}
            </dt>
            <dd className="max-w-xs text-pretty text-sm leading-relaxed text-ivory/70">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
