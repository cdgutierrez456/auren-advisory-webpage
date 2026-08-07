import { Mark } from "@/components/logo";
import { Headline, Section, SectionHead } from "@/components/ui";
import { products } from "@/content/site";

export function Productos() {
  return (
    <Section id="productos" tone="paper">
      <SectionHead index="03" label="Arquitectura de servicios">
        <Headline className="text-deep">
          Un solo sistema. Ocho puertas de entrada.
        </Headline>
        <p className="mt-6 max-w-xl text-pretty leading-relaxed text-deep/65">
          Cada servicio resuelve una etapa distinta, pero todos pertenecen a la misma
          firma y comparten método, lenguaje y forma de medir.
        </p>
      </SectionHead>

      <div className="grid gap-px border-y border-rule bg-rule">
        {products.map((p) => (
          <article
            key={p.name}
            className="reveal group grid gap-6 bg-paper py-9 transition-colors duration-500 hover:bg-ivory md:grid-cols-[auto_15rem_1fr_auto] md:items-baseline md:gap-10 md:px-6"
          >
            <Mark
              size={22}
              className="shrink-0 opacity-30 transition-opacity duration-500 group-hover:opacity-100"
            />
            <h3 className="wordmark text-sm text-deep uppercase">{p.name}</h3>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-deep/65">
              {p.description}
            </p>
            <span className="label whitespace-nowrap text-deep/40">{p.kind}</span>
          </article>
        ))}
      </div>
    </Section>
  );
}
