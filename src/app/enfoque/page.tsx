import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Breadcrumbs, CtaBand, Headline, PageHero, Section, SectionHead } from "@/components/ui";
import { method, phases, serviceBySlug } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Reveal, RevealItem, RevealList } from "@/components/motion";

export const metadata: Metadata = pageMetadata(
  "Metodología de transformación empresarial",
  "Ver, entender y transformar: cómo diagnosticamos una operación, cuantificamos la fricción y decidimos qué tecnología implementar, en ese orden.",
  "/enfoque",
);

/**
 * Cómo trabajamos. Tres fases, cada una en una pantalla: la palabra, la
 * pregunta que responde, qué hacemos y con qué termina. El razonamiento largo
 * está plegado.
 */
export default function Enfoque() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Cómo trabajamos", path: "/enfoque" }]} />

      <PageHero
        eyebrow="Cómo trabajamos"
        title={
          <>
            <span className="block">{method.title}</span>
            <span className="mt-5 block max-w-3xl text-balance text-lg leading-snug tracking-tight text-fg/75 md:text-xl">
              {method.headline}
            </span>
          </>
        }
        lede="Mirar antes de opinar, entender antes de proponer, medir antes de celebrar."
      >
        <ol className="grid gap-2 sm:grid-cols-3">
          {phases.map((phase) => (
            <li key={phase.index}>
              <a
                href={`#${phase.title.toLowerCase()}`}
                className="card flex h-full flex-col gap-1.5 rounded-card px-5 py-4 transition-colors hover:bg-surface-3"
              >
                <span className="cota text-fg/45">{phase.index}</span>
                <span className="text-lg text-fg">{phase.title}</span>
                <span className="text-sm text-fg/60">{phase.claim}</span>
              </a>
            </li>
          ))}
        </ol>
      </PageHero>

      {phases.map((phase, i) => (
        <Section
          key={phase.index}
          id={phase.title.toLowerCase()}
          tone={i % 2 === 0 ? "ivory" : "paper"}
          className="scroll-mt-20 border-b border-line"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
              <span className="cota text-fg/45">{phase.index} / 03</span>
              <h2 className="text-display leading-none text-fg">{phase.title}</h2>
              <p className="font-serif text-2xl italic leading-snug text-balance text-fg/85">
                {phase.question}
              </p>
            </Reveal>

            <div className="flex flex-col gap-10">
              <Reveal className="flex flex-col gap-3">
                <p className="text-pretty text-xl leading-snug text-fg">{phase.claim}</p>
                <p className="text-pretty leading-relaxed text-fg/70">{phase.detail}</p>
              </Reveal>

              <Reveal className="flex flex-col gap-4">
                <span className="label text-fg/50">Qué hacemos</span>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {phase.points.map((point) => (
                    <li key={point} className="card flex gap-3 rounded-lg px-4 py-3 text-sm text-fg/85">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-lime" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="flex flex-col gap-3 border-l-2 border-lime pl-6">
                <span className="label text-fg/50">Con qué termina</span>
                <p className="text-pretty text-lg leading-snug text-fg">{phase.output}</p>
              </Reveal>

              <Reveal className="flex flex-wrap items-center gap-2">
                <span className="label mr-2 text-fg/50">Servicios de esta fase</span>
                {phase.services.map((slug) => {
                  const service = serviceBySlug(slug);
                  if (!service) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/servicios/${slug}`}
                      className="inline-flex items-center gap-2 rounded-pill border border-line-strong px-4 py-2 text-xs text-fg/80 transition-colors hover:border-fg hover:text-fg"
                    >
                      {service.name} <Arrow />
                    </Link>
                  );
                })}
              </Reveal>

              <Reveal>
                <details className="group card rounded-card">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm text-fg [&::-webkit-details-marker]:hidden">
                    Por qué esta fase se hace así
                    <span
                      aria-hidden
                      className="flex size-7 shrink-0 items-center justify-center rounded-pill border border-line text-fg/60 transition-transform duration-300 group-open:rotate-45"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="flex flex-col gap-4 border-t border-line px-6 py-6">
                    {phase.body.map((p) => (
                      <p key={p} className="text-pretty text-sm leading-relaxed text-fg/75">
                        {p}
                      </p>
                    ))}
                  </div>
                </details>
              </Reveal>
            </div>
          </div>
        </Section>
      ))}

      <Section tone="ivory">
        <SectionHead label="Por qué el orden no se negocia">
          <Headline>Los tres errores que salen más caros.</Headline>
        </SectionHead>
        <RevealList as="ul" className="grid gap-4 md:grid-cols-3">
          {method.avoids.map((a, i) => (
            <RevealItem as="li" key={a.title} className="card flex flex-col gap-4 rounded-card p-7">
              <span className="cota text-fg/45">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-balance text-xl leading-tight tracking-tight text-fg">{a.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-fg/65">{a.body}</p>
            </RevealItem>
          ))}
        </RevealList>
        <Reveal className="mt-8 max-w-2xl">
          <p className="text-pretty text-sm leading-relaxed text-fg/65">{method.order.body[2]}</p>
        </Reveal>
      </Section>

      <CtaBand
        title="El método empieza mirando. Empecemos por ahí."
        lede="Una primera conversación de treinta minutos sobre cómo funciona su empresa hoy."
      />
    </>
  );
}
