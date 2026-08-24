import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Mark } from "@/components/logo";
import { Arrow, CtaBand, PageHero, Section } from "@/components/ui";
import { phases, services } from "@/content/site";

export const metadata: Metadata = pageMetadata(
  "Servicios",
  "Ocho servicios que comparten un solo método: diagnóstico, diseño, implementación, datos, automatización, visión artificial, software a medida y continuidad.",
  "/servicios",
);

export default function Servicios() {
  return (
    <>
      <PageHero
        eyebrow="Arquitectura de servicios"
        title="Un solo sistema. Ocho puertas de entrada."
        lede="Cada servicio resuelve una etapa distinta del mismo recorrido. Puede empezar por donde su empresa esté hoy: no hace falta contratar todo el camino para obtener valor."
      />

      {/* Ubicar cada servicio dentro del método: contexto antes del catálogo */}
      <Section tone="ivory" className="!py-16">
        <ol className="grid gap-px bg-rule sm:grid-cols-3">
          {phases.map((phase) => (
            <li key={phase.index} className="bg-ivory">
              <Link
                href={`/enfoque#${phase.title.toLowerCase()}`}
                className="group flex flex-col gap-2 py-6 transition-opacity hover:opacity-60 sm:pr-8"
              >
                <span className="label text-deep/40">
                  {phase.index} — {phase.title}
                </span>
                <p className="text-sm text-deep/70">{phase.claim}</p>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper" className="!pt-0">
        <ul className="grid gap-px border border-rule bg-rule md:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug} className="bg-paper">
              <Link
                href={`/servicios/${s.slug}`}
                className="group flex h-full flex-col gap-7 p-8 transition-colors duration-500 hover:bg-ivory md:p-11"
              >
                <div className="flex items-start justify-between gap-6">
                  <Mark
                    size={26}
                    className="opacity-35 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="label text-deep/40">{s.kind}</span>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="wordmark text-base uppercase text-deep">{s.name}</h2>
                  <p className="text-pretty text-sm leading-relaxed text-deep/65">{s.summary}</p>
                </div>

                <dl className="mt-auto grid grid-cols-2 gap-6 border-t border-rule pt-6">
                  <div className="flex flex-col gap-1.5">
                    <dt className="label text-deep/35">Entrega</dt>
                    <dd className="text-xs text-deep/70">{s.deliverable}</dd>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <dt className="label text-deep/35">Referencia</dt>
                    <dd className="text-xs text-deep/70">{s.duration}</dd>
                  </div>
                </dl>

                <span className="label flex items-center gap-3 text-deep transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                  Ver servicio <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="¿No sabe por cuál empezar?"
        lede="Casi siempre la respuesta es Auren Insight: dos a cuatro semanas para saber con evidencia dónde está la oportunidad. Si su caso es otro, se lo decimos en la primera conversación."
      />
    </>
  );
}
