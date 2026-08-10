import type { CSSProperties } from "react";
import { Em, Headline, Section, SectionHead } from "@/components/ui";
import { Ambient } from "@/components/vertex-art";
import { about, services } from "@/content/site";

/**
 * Banda de cifras — al estilo del "stat block" de referencia, pero con datos
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
    <Section tone="deep" className="relative isolate overflow-hidden">
      <Ambient />
      <div className="relative">
        <SectionHead label="La firma en corto">
          <Headline>
            Una firma, no un <Em className="text-lime">catálogo</Em> de herramientas.
          </Headline>
        </SectionHead>

        <dl className="reveal-stagger grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{ "--i": i } as CSSProperties}
              className="glass flex flex-col gap-5 rounded-card p-8 md:gap-7 md:p-9"
            >
              <dt className="tnum text-mega font-normal leading-none tracking-tight text-lime [text-shadow:0_0_44px_rgba(200,241,105,0.45)]">
                {s.n}
              </dt>
              <dd className="text-pretty text-sm leading-relaxed text-ivory/70">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
