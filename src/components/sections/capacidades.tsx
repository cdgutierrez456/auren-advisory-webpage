import type { CSSProperties } from "react";
import { Em, Headline, Section, SectionHead } from "@/components/ui";
import { capabilities } from "@/content/site";

export function Capacidades() {
  return (
    <Section id="capacidades" tone="ivory">
      <SectionHead label="Capacidades">
        <Headline className="text-ivory">
          La tecnología es el medio. Elegimos la que el <Em className="text-lime">problema</Em> pide.
        </Headline>
      </SectionHead>

      <ul className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <li
            key={c.id}
            style={{ "--i": i } as CSSProperties}
            className="glass group relative flex flex-col gap-4 overflow-hidden rounded-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40 md:p-9"
          >
            <span className="tnum font-mono text-xs text-lime/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl tracking-tight text-ivory">{c.title}</h3>
            <p className="text-sm leading-relaxed text-pretty text-ivory/60">{c.description}</p>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px w-0 bg-lime transition-all duration-700 ease-out-quint group-hover:w-full"
            />
          </li>
        ))}

        {/* Celda de cierre bento: acento lima, ocupa el resto de la fila. */}
        <li className="relative flex flex-col justify-end gap-4 overflow-hidden rounded-card bg-lime p-8 text-ink md:p-9 lg:col-span-2">
          <span className="h-0.5 w-8 bg-ink/70" />
          <p className="text-pretty text-lg leading-snug">
            Si el problema no necesita ninguna de estas, se lo decimos.
          </p>
        </li>
      </ul>
    </Section>
  );
}
