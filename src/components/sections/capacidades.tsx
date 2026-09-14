import { Headline, Section, SectionHead } from "@/components/ui";
import { capabilities } from "@/content/site";
import { RevealItem, RevealList } from "@/components/motion";

export function Capacidades() {
  return (
    <Section id="capacidades" tone="ivory">
      <SectionHead index="02" label="Capacidades">
        <Headline className="text-fg">
          La tecnología es el medio. Elegimos la que el problema pide.
        </Headline>
      </SectionHead>

      <RevealList as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <RevealItem
            as="li"
            key={c.id}
            className="glass group relative flex flex-col gap-4 overflow-hidden rounded-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40 md:p-10"
          >
            <span className="font-mono text-xs text-fg/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl tracking-tight text-fg">{c.title}</h3>
            <p className="text-sm leading-relaxed text-pretty text-fg/55">{c.description}</p>
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-0.5 w-0 bg-lime transition-all duration-700 ease-out-quint group-hover:w-full"
            />
          </RevealItem>
        ))}
        {/* Celda de cierre: ocupa el resto de la fila para que no quede hueco */}
        <li className="flex flex-col justify-end gap-4 rounded-card bg-surface-3 p-8 text-fg md:p-10 lg:col-span-2">
          <span className="h-0.5 w-8 bg-lime" />
          <p className="text-pretty text-lg leading-snug">
            Si el problema no necesita ninguna de estas, se lo decimos.
          </p>
        </li>
      </RevealList>
    </Section>
  );
}
