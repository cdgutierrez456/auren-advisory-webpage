import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Mark } from "@/components/logo";
import {
  Arrow,
  Breadcrumbs,
  CtaBand,
  Headline,
  PageHero,
  Section,
  SectionHead,
} from "@/components/ui";
import { phases, serviceBySlug, services } from "@/content/site";
import { RevealItem, RevealList } from "@/components/motion";

export const metadata: Metadata = pageMetadata(
  "Servicios de transformación digital y automatización",
  "Diagnóstico de procesos, automatización, integración de datos, visión artificial y software a la medida para empresas en Colombia. Un solo método.",
  "/servicios",
);

export default function Servicios() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Servicios", path: "/servicios" }]} />

      <PageHero
        eyebrow="Arquitectura de servicios"
        pad={false}
        title={
          <>
            <span className="block">Un solo sistema. Ocho puertas de entrada.</span>
            <span className="mt-7 block max-w-3xl text-balance text-xl leading-snug tracking-tight text-fg/75 md:text-2xl">
              Diagnóstico de procesos, automatización, datos, visión artificial y software a
              la medida para empresas en Colombia.
            </span>
          </>
        }
        lede="Cada servicio resuelve una etapa distinta del mismo recorrido. Puede empezar por donde su empresa esté hoy: no hace falta contratar todo el camino para obtener valor."
      />

      {/* Ubicar cada servicio dentro del método: contexto antes del catálogo */}
      <Section tone="ivory" className="!py-16">
        <RevealList as="ol" className="grid gap-3 sm:grid-cols-3">
          {phases.map((phase) => (
            <RevealItem as="li" key={phase.index}>
              <Link
                href={`/enfoque#${phase.title.toLowerCase()}`}
                className="glass group flex h-full flex-col gap-2 rounded-card px-6 py-5 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40"
              >
                <span className="label text-fg/40">
                  {phase.index} — {phase.title}
                </span>
                <p className="text-sm text-fg/75">{phase.claim}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      <Section tone="paper" className="!pt-0">
        <RevealList as="ul" className="grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <RevealItem as="li" key={s.slug}>
              <Link
                href={`/servicios/${s.slug}`}
                className="glass group flex h-full flex-col gap-7 rounded-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40 md:p-11"
              >
                <div className="flex items-start justify-between gap-6">
                  <Mark
                    size={26}
                    className="opacity-45 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="label text-fg/40">{s.kind}</span>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="flex flex-col gap-2">
                    <span className="wordmark text-base uppercase text-fg">{s.name}</span>
                    <span className="text-pretty text-lg leading-snug tracking-tight text-fg/90">
                      {s.keyword}
                    </span>
                  </h2>
                  <p className="text-pretty text-sm leading-relaxed text-fg/55">{s.summary}</p>
                </div>

                <dl className="mt-auto grid grid-cols-2 gap-6 border-t border-line pt-6">
                  <div className="flex flex-col gap-1.5">
                    <dt className="label text-fg/40">Entrega</dt>
                    <dd className="text-xs text-fg/75">{s.deliverable}</dd>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <dt className="label text-fg/40">Referencia</dt>
                    <dd className="text-xs text-fg/75">{s.duration}</dd>
                  </div>
                </dl>

                <span className="label flex items-center gap-3 text-fg transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                  Ver servicio <Arrow />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      {/* Ruta de entrada. El listado dice qué existe; esto dice cuál le toca a
          quien está leyendo, que es la pregunta con la que llega. */}
      <Section tone="ivory">
        <SectionHead index="01" label="Cómo elegir">
          <Headline className="text-fg">Empiece por donde está, no por donde debería estar.</Headline>
          <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-fg/55">
            Casi nadie llega sabiendo qué necesita contratar; llega sabiendo qué le
            duele. Estas son las cuatro situaciones con las que más nos buscan y por
            dónde conviene entrar en cada una.
          </p>
        </SectionHead>

        <RevealList as="dl" className="grid gap-4 md:grid-cols-2">
          {[
            {
              situacion: "«Sé que algo no funciona, pero no sé qué»",
              respuesta:
                "Empiece por el diagnóstico. Dos a cuatro semanas para saber con evidencia dónde se pierde tiempo y dinero, cuánto cuesta y qué conviene resolver primero. Es el punto de entrada de la mayoría de los proyectos.",
              slug: "auren-insight",
            },
            {
              situacion: "«Ya sé el problema, necesito el plan y el presupuesto»",
              respuesta:
                "Empiece por el diseño. Define el proceso objetivo, qué se compra, qué se construye, en qué orden y con qué métrica, con el detalle necesario para sustentar la inversión ante junta o socios.",
              slug: "auren-blueprint",
            },
            {
              situacion: "«Tengo gente copiando datos entre sistemas»",
              respuesta:
                "Empiece por automatización. Se toma un flujo, se simplifica y se automatiza con trazabilidad y manejo de excepciones. Es la entrada más rápida a un resultado medible.",
              slug: "auren-flow",
            },
            {
              situacion: "«Cada área reporta cifras distintas del mismo mes»",
              respuesta:
                "Empiece por datos. El problema casi nunca es el tablero: son las definiciones no acordadas y las fuentes sin dueño. Se resuelve antes de pensar en indicadores o en inteligencia artificial.",
              slug: "auren-data",
            },
          ].map((caso) => (
            <RevealItem key={caso.slug} className="glass flex flex-col gap-4 rounded-card p-8 md:p-11">
              <dt className="text-xl leading-snug text-balance tracking-tight text-fg">
                {caso.situacion}
              </dt>
              <dd className="flex flex-col gap-5">
                <p className="text-pretty text-sm leading-relaxed text-fg/55">
                  {caso.respuesta}
                </p>
                <Link
                  href={`/servicios/${caso.slug}`}
                  className="label group inline-flex items-center gap-3 text-fg/55 transition-colors hover:text-fg"
                >
                  {serviceBySlug(caso.slug)?.name}
                  <Arrow className="transition-transform duration-500 ease-out-quint group-hover:translate-x-0.5" />
                </Link>
              </dd>
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      <CtaBand
        title="¿No sabe por cuál empezar?"
        lede="Casi siempre la respuesta es Auren Insight: dos a cuatro semanas para saber con evidencia dónde está la oportunidad. Si su caso es otro, se lo decimos en la primera conversación."
      />
    </>
  );
}
