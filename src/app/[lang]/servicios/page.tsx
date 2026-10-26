import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "@/components/link";
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
import { getContent, getT } from "@/lib/i18n-server";
import { RevealItem, RevealList } from "@/components/motion";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata(
    t("Servicios de transformación digital y automatización", "Digital transformation and automation services"),
    t(
      "Diagnóstico de procesos, automatización, integración de datos, visión artificial y software a la medida para empresas en Colombia. Un solo método.",
      "Process assessment, automation, data integration, computer vision and custom software for companies in Colombia. One method.",
    ),
    "/servicios",
  );
}

export default async function Servicios() {
  const [{ phases, serviceBySlug, services }, t] = await Promise.all([getContent(), getT()]);
  return (
    <>
      <Breadcrumbs trail={[{ name: t("Servicios", "Services"), path: "/servicios" }]} />

      <PageHero
        eyebrow={t("Arquitectura de servicios", "Service architecture")}
        pad={false}
        title={
          <>
            <span className="block">
              {t("Un solo sistema. Ocho puertas de entrada.", "One system. Eight ways in.")}
            </span>
            <span className="mt-7 block max-w-3xl text-balance text-xl leading-snug tracking-tight text-fg/75 md:text-2xl">
              {t(
                "Diagnóstico de procesos, automatización, datos, visión artificial y software a la medida para empresas en Colombia.",
                "Process assessment, automation, data, computer vision and custom software for companies in Colombia.",
              )}
            </span>
          </>
        }
        lede={t(
          "Cada servicio resuelve una etapa distinta del mismo recorrido. Puede empezar por donde su empresa esté hoy: no hace falta contratar todo el camino para obtener valor.",
          "Each service solves a different stage of the same journey. You can start wherever your company is today: you don't need to hire the whole path to get value.",
        )}
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
                    <dt className="label text-fg/40">{t("Entrega", "Deliverable")}</dt>
                    <dd className="text-xs text-fg/75">{s.deliverable}</dd>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <dt className="label text-fg/40">{t("Referencia", "Typical length")}</dt>
                    <dd className="text-xs text-fg/75">{s.duration}</dd>
                  </div>
                </dl>

                <span className="label flex items-center gap-3 text-fg transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                  {t("Ver servicio", "View service")} <Arrow />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      {/* Ruta de entrada. El listado dice qué existe; esto dice cuál le toca a
          quien está leyendo, que es la pregunta con la que llega. */}
      <Section tone="ivory">
        <SectionHead index="01" label={t("Cómo elegir", "How to choose")}>
          <Headline className="text-fg">
            {t(
              "Empiece por donde está, no por donde debería estar.",
              "Start where you are, not where you think you should be.",
            )}
          </Headline>
          <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-fg/55">
            {t(
              "Casi nadie llega sabiendo qué necesita contratar; llega sabiendo qué le duele. Estas son las cuatro situaciones con las que más nos buscan y por dónde conviene entrar en cada una.",
              "Almost nobody arrives knowing what they need to hire; they arrive knowing what hurts. These are the four situations people most often come to us with, and where it makes sense to start in each.",
            )}
          </p>
        </SectionHead>

        <RevealList as="dl" className="grid gap-4 md:grid-cols-2">
          {[
            {
              situacion: t(
                "«Sé que algo no funciona, pero no sé qué»",
                "“I know something isn't working, but I don't know what”",
              ),
              respuesta: t(
                "Empiece por el diagnóstico. Dos a cuatro semanas para saber con evidencia dónde se pierde tiempo y dinero, cuánto cuesta y qué conviene resolver primero. Es el punto de entrada de la mayoría de los proyectos.",
                "Start with the diagnosis. Two to four weeks to know, with evidence, where time and money are lost, what it costs and what's worth solving first. It's the entry point for most projects.",
              ),
              slug: "auren-insight",
            },
            {
              situacion: t(
                "«Ya sé el problema, necesito el plan y el presupuesto»",
                "“I know the problem, I need the plan and the budget”",
              ),
              respuesta: t(
                "Empiece por el diseño. Define el proceso objetivo, qué se compra, qué se construye, en qué orden y con qué métrica, con el detalle necesario para sustentar la inversión ante junta o socios.",
                "Start with design. It defines the target process, what gets bought, what gets built, in what order and with which metric, in enough detail to justify the investment to the board or partners.",
              ),
              slug: "auren-blueprint",
            },
            {
              situacion: t(
                "«Tengo gente copiando datos entre sistemas»",
                "“I have people copying data between systems”",
              ),
              respuesta: t(
                "Empiece por automatización. Se toma un flujo, se simplifica y se automatiza con trazabilidad y manejo de excepciones. Es la entrada más rápida a un resultado medible.",
                "Start with automation. One flow is taken, simplified and automated with traceability and exception handling. It's the fastest way to a measurable result.",
              ),
              slug: "auren-flow",
            },
            {
              situacion: t(
                "«Cada área reporta cifras distintas del mismo mes»",
                "“Each department reports different figures for the same month”",
              ),
              respuesta: t(
                "Empiece por datos. El problema casi nunca es el tablero: son las definiciones no acordadas y las fuentes sin dueño. Se resuelve antes de pensar en indicadores o en inteligencia artificial.",
                "Start with data. The problem is almost never the dashboard: it's unagreed definitions and sources without an owner. It gets solved before thinking about KPIs or artificial intelligence.",
              ),
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
        title={t("¿No sabe por cuál empezar?", "Not sure where to start?")}
        lede={t(
          "Casi siempre la respuesta es Auren Insight: dos a cuatro semanas para saber con evidencia dónde está la oportunidad. Si su caso es otro, se lo decimos en la primera conversación.",
          "The answer is almost always Auren Insight: two to four weeks to know, with evidence, where the opportunity is. If your case is different, we'll tell you in the first conversation.",
        )}
      />
    </>
  );
}
