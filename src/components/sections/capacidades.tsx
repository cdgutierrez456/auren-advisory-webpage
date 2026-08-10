import type { CSSProperties } from "react";
import { Em, Headline, Section, SectionHead } from "@/components/ui";
import { capabilities } from "@/content/site";

export function Capacidades() {
  return (
    <Section id="capacidades" tone="ivory">
      <SectionHead index="02" label="Capacidades">
        <Headline className="text-deep">
          La tecnología es el medio. Elegimos la que el <Em>problema</Em> pide.
        </Headline>
      </SectionHead>

      <ul className="reveal-stagger grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <li
            key={c.id}
            style={{ "--i": i } as CSSProperties}
            className="group relative flex flex-col gap-4 bg-ivory p-8 transition-colors duration-500 hover:bg-paper md:p-10"
          >
            <span className="font-mono text-xs text-deep/35">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl tracking-tight text-deep">{c.title}</h3>
            <p className="text-sm leading-relaxed text-pretty text-deep/65">{c.description}</p>
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-0.5 w-0 bg-lime transition-all duration-700 ease-out-quint group-hover:w-full"
            />
          </li>
        ))}
        {/* Celda de cierre: ocupa el resto de la fila para que no quede hueco */}
        <li className="flex flex-col justify-end gap-4 bg-deep p-8 text-ivory md:p-10 lg:col-span-2">
          <span className="h-0.5 w-8 bg-lime" />
          <p className="text-pretty text-lg leading-snug">
            Si el problema no necesita ninguna de estas, se lo decimos.
          </p>
        </li>
      </ul>
    </Section>
  );
}
