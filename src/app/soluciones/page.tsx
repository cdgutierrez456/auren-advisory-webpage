import type { Metadata } from "next";
import Link from "next/link";
import { Lamina } from "@/components/laminas";
import { Arrow, Breadcrumbs, Button, CtaBand, Figura, PageHero, Section } from "@/components/ui";
import { serviceBySlug, solutions } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = pageMetadata(
  "Soluciones de transformación empresarial",
  "Estrategia y diagnóstico, automatización e inteligencia artificial, soluciones digitales a la medida, datos e inteligencia de negocio y sistemas inteligentes para empresas en Colombia.",
  "/soluciones",
);

/**
 * Las cinco soluciones. Cada una en un bloque corto: imagen, la pregunta que
 * responde, qué obtiene y cómo empezar. El detalle (síntomas, qué hacemos,
 * servicios) está plegado: se abre solo si alguien lo quiere leer.
 */
export default function Soluciones() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Soluciones", path: "/soluciones" }]} />

      <PageHero
        eyebrow="Soluciones"
        title="Cinco formas de hacer que su empresa funcione mejor."
        lede="Organizadas por lo que necesita, no por la tecnología que usamos. Reconozca la situación y empecemos por ahí."
      >
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {solutions.map((s, k) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="card flex h-full items-start gap-3 rounded-card px-4 py-4 text-sm leading-snug text-fg transition-colors hover:bg-surface-3"
              >
                <span className="cota mt-0.5 text-fg/45">{String(k + 1).padStart(2, "0")}</span>
                {s.short}
              </a>
            </li>
          ))}
        </ol>
      </PageHero>

      {solutions.map((s, k) => (
        <Section
          key={s.slug}
          id={s.slug}
          tone={k % 2 === 0 ? "ivory" : "paper"}
          className="scroll-mt-20 border-b border-line"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-card border border-line lg:sticky lg:top-28 lg:self-start">
              {s.image ? (
                <Figura figure={s.image} />
              ) : (
                <div className="absolute inset-0">
                  <Lamina kind={s.glyph} />
                </div>
              )}
            </Reveal>

            <div className="flex flex-col gap-8">
              <Reveal className="flex flex-col gap-4">
                <span className="label text-fg/50">
                  {String(k + 1).padStart(2, "0")} · {s.short}
                </span>
                <h2 className="text-headline text-balance text-fg">{s.title}</h2>
                <p className="font-serif text-2xl italic leading-snug text-balance text-fg/85">
                  {s.question}
                </p>
              </Reveal>

              <Reveal className="grid gap-8 sm:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <span className="label text-fg/50">Qué obtiene</span>
                  <ul className="flex flex-col gap-3">
                    {s.outcomes.map((o) => (
                      <li key={o} className="flex gap-3 text-pretty leading-snug text-fg/90">
                        <span aria-hidden className="mt-2.5 h-0.5 w-4 shrink-0 bg-lime" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="label text-fg/50">Cómo empezar</span>
                  <p className="text-pretty text-sm leading-relaxed text-fg/75">{s.start}</p>
                  <Button href="/contacto" variant="solid" className="w-fit">
                    Iniciar una conversación <Arrow />
                  </Button>
                </div>
              </Reveal>

              {/* El detalle, plegado: quien quiere saber exactamente qué hacemos
                  lo abre; quien no, sigue de largo. */}
              <Reveal>
                <details className="group card rounded-card">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm text-fg [&::-webkit-details-marker]:hidden">
                    Qué hacemos exactamente y con qué servicios
                    <span
                      aria-hidden
                      className="flex size-7 shrink-0 items-center justify-center rounded-pill border border-line text-fg/60 transition-transform duration-300 group-open:rotate-45"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="grid gap-8 border-t border-line px-6 py-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-3">
                      <span className="label text-fg/50">Lo reconoce si</span>
                      <ul className="flex flex-col gap-2">
                        {s.symptoms.map((x) => (
                          <li key={x} className="flex gap-3 text-sm leading-relaxed text-fg/75">
                            <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                      <span className="label text-fg/50">Qué hacemos</span>
                      <ol className="flex flex-col gap-2">
                        {s.work.map((w, j) => (
                          <li key={w} className="flex gap-3 text-sm leading-relaxed text-fg/75">
                            <span className="cota mt-1 shrink-0 text-fg/45">{String(j + 1).padStart(2, "0")}</span>
                            {w}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="flex flex-col gap-3 sm:col-span-2">
                      <span className="label text-fg/50">Lo entregamos con</span>
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
                </details>
              </Reveal>
            </div>
          </div>
        </Section>
      ))}

      <CtaBand
        title="Si no está claro cuál corresponde, esa es la primera conversación."
        lede="Treinta minutos para entender la situación y definir por dónde empezar."
      />
    </>
  );
}
