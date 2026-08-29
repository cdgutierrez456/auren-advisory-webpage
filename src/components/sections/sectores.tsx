import Link from "next/link";
import { Arrow, Headline, Section, SectionHead } from "@/components/ui";
import { sectors, serviceBySlug } from "@/content/site";

/**
 * Sectores. Un gerente de transporte no se reconoce en «automatización de
 * procesos»; se reconoce en «preoperacional en papel». Esta sección traduce
 * los servicios al vocabulario de cada industria y enlaza a la página que
 * corresponde.
 */
export function Sectores() {
  return (
    <Section id="sectores" tone="ivory">
      <SectionHead index="04" label="Sectores">
        <Headline className="text-deep">Dónde trabajamos, y con qué se encuentra uno ahí.</Headline>
        <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-deep/65">
          El método es el mismo en todos, pero la fricción no. Estos son los cuatro
          entornos donde más hemos visto repetirse los mismos costos escondidos.
        </p>
      </SectionHead>

      <div className="grid gap-px border border-rule bg-rule md:grid-cols-2">
        {sectors.map((sector) => (
          <article
            key={sector.id}
            className="reveal flex flex-col gap-7 bg-ivory p-8 md:p-11"
          >
            <div className="flex flex-col gap-4">
              <span className="h-0.5 w-8 bg-lime" />
              <h3 className="text-2xl tracking-tight text-balance text-deep">{sector.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-deep/65">{sector.body}</p>
            </div>

            <ul className="flex flex-col gap-3 border-t border-rule pt-6">
              {sector.cases.map((c) => (
                <li key={c} className="flex gap-3.5 text-pretty text-sm leading-relaxed text-deep/75">
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-deep/30" />
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-2">
              {sector.services.map((slug) => {
                const service = serviceBySlug(slug);
                if (!service) return null;
                return (
                  <Link
                    key={slug}
                    href={`/servicios/${slug}`}
                    className="label group inline-flex items-center gap-2.5 text-deep/50 transition-colors hover:text-deep"
                  >
                    {service.name}
                    <Arrow className="transition-transform duration-500 ease-out-quint group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
