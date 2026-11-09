import type { Metadata } from "next";
import Link from "next/link";
import { SolutionGlyph } from "@/components/diagrams";
import {
  Arrow,
  Breadcrumbs,
  Button,
  Cota,
  CtaBand,
  Figura,
  PageHero,
  Section,
} from "@/components/ui";
import { serviceBySlug, solutions } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Reveal, RevealItem, RevealList } from "@/components/motion";

export const metadata: Metadata = pageMetadata(
  "Soluciones de transformación empresarial",
  "Estrategia y diagnóstico, automatización e inteligencia artificial, soluciones digitales a la medida, datos e inteligencia de negocio y sistemas inteligentes para empresas en Colombia.",
  "/soluciones",
);

/**
 * Las cinco soluciones, por necesidad empresarial. Cada bloque responde en
 * este orden: qué problema resuelve, qué hacemos, qué obtiene, cómo empezar.
 * Los servicios (`/servicios/*`) son el nivel «cómo lo entregamos».
 */
export default function Soluciones() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Soluciones", path: "/soluciones" }]} />

      <PageHero
        eyebrow="Soluciones"
        pad={false}
        title={
          <>
            <span className="block">Cinco formas de hacer que su empresa funcione mejor.</span>
            <span className="mt-6 block max-w-3xl text-balance text-lg leading-snug tracking-tight text-fg/75 md:text-xl">
              Soluciones de transformación empresarial organizadas por necesidad: estrategia,
              automatización e inteligencia artificial, software a la medida, datos y sistemas
              inteligentes.
            </span>
          </>
        }
        lede="No hace falta saber qué tecnología necesita para empezar. Basta con reconocer la situación. Cada solución explica qué problema resuelve, qué hacemos, qué obtiene y cómo se inicia la conversación."
      >
        {/* Índice: se ve de una la oferta completa y se salta a la que toca. */}
        <RevealList as="ol" className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {solutions.map((s, k) => (
            <RevealItem as="li" key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="group flex h-full flex-col gap-3 bg-surface-2 px-5 py-5 transition-colors hover:bg-surface-3"
              >
                <Cota className="text-fg/45">{String(k + 1).padStart(2, "0")}</Cota>
                <span className="text-sm leading-snug text-fg">{s.short}</span>
              </a>
            </RevealItem>
          ))}
        </RevealList>
      </PageHero>

      {solutions.map((s, k) => (
        <Section
          key={s.slug}
          id={s.slug}
          tone={k % 2 === 0 ? "ivory" : "paper"}
          className="scroll-mt-20 border-b border-line"
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            {/* Columna fija: nombre, pregunta y glifo */}
            <div className="flex flex-col gap-7 self-start lg:sticky lg:top-28">
              <Cota className="text-fg/55">
                {String(k + 1).padStart(2, "0")} / {String(solutions.length).padStart(2, "0")}
              </Cota>
              {s.image ? (
                <Figura figure={s.image} />
              ) : (
                <SolutionGlyph kind={s.glyph} className="w-40 text-fg/85" />
              )}
              <h2 className="text-headline text-balance text-fg">{s.title}</h2>
              <p className="font-serif text-2xl italic leading-snug text-balance text-fg/85">
                {s.question}
              </p>
              <div className="flex flex-col gap-3 border-t border-line pt-6">
                <Cota className="text-fg/45">Lo entregamos con</Cota>
                <ul className="flex flex-wrap gap-2">
                  {s.services.map((slug) => {
                    const service = serviceBySlug(slug);
                    if (!service) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/servicios/${slug}`}
                          className="inline-flex items-center gap-2 rounded-pill border border-line-strong px-4 py-2 text-xs text-fg/80 transition-colors hover:border-fg hover:text-fg"
                        >
                          {service.name} <Arrow />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Columna de contenido: problema → qué hacemos → qué obtiene → cómo empezar */}
            <div className="flex flex-col gap-12">
              <Reveal className="flex flex-col gap-5">
                <Cota className="text-fg/55">El problema</Cota>
                <p className="text-pretty text-lg leading-relaxed text-fg/85">{s.problem}</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {s.symptoms.map((x) => (
                    <li key={x} className="card flex gap-3 rounded-lg px-4 py-3 text-sm text-fg/80">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-line-strong" />
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="flex flex-col gap-5">
                <Cota className="text-fg/55">Qué hacemos</Cota>
                <ol className="card grid divide-y divide-line overflow-hidden rounded-card">
                  {s.work.map((w, j) => (
                    <li key={w} className="flex gap-5 px-5 py-4 md:px-6">
                      <span className="cota mt-1 text-fg/45">{String(j + 1).padStart(2, "0")}</span>
                      <span className="text-pretty text-sm leading-relaxed text-fg/85 md:text-base">{w}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <div className="grid gap-10 md:grid-cols-2">
                <Reveal className="flex flex-col gap-5">
                  <Cota className="text-fg/55">Qué obtiene</Cota>
                  <ul className="flex flex-col gap-4">
                    {s.outcomes.map((o) => (
                      <li key={o} className="flex gap-4 text-pretty leading-snug text-fg/90">
                        <span aria-hidden className="mt-2.5 h-0.5 w-4 shrink-0 bg-lime" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.08} className="flex flex-col gap-5">
                  <Cota className="text-fg/55">Cómo empezar</Cota>
                  <p className="text-pretty text-sm leading-relaxed text-fg/80 md:text-base">{s.start}</p>
                  <Button href="/contacto" variant="solid" className="w-fit">
                    Hablemos de esto <Arrow />
                  </Button>
                </Reveal>
              </div>

              <div className="flex flex-col gap-3 border-t border-line pt-6">
                <Cota className="text-fg/45">Tecnologías que suelen intervenir</Cota>
                <p className="text-pretty text-sm leading-relaxed text-fg/60">
                  {s.technologies.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <CtaBand
        title="¿No sabe cuál es la suya? Esa es exactamente la primera conversación."
        lede="Treinta minutos para entender su situación. Salimos de ahí con la solución que corresponde, o con la noticia de que el problema se resuelve sin nosotros."
      />
    </>
  );
}
