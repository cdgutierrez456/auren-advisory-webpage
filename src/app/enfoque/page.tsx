import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import {
  Arrow,
  Breadcrumbs,
  CtaBand,
  Headline,
  PageHero,
  Section,
  SectionHead,
} from "@/components/ui";
import { method, phases, serviceBySlug } from "@/content/site";
import { RevealItem, RevealList } from "@/components/motion";

export const metadata: Metadata = pageMetadata(
  "Metodología de transformación empresarial",
  "Ver, entender y transformar: cómo diagnosticamos una operación, cuantificamos la fricción y decidimos qué tecnología implementar, en ese orden.",
  "/enfoque",
);

export default function Enfoque() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Enfoque", path: "/enfoque" }]} />

      <PageHero
        eyebrow={method.eyebrow}
        pad={false}
        title={
          <>
            <span className="block">{method.title}</span>
            <span className="mt-7 block max-w-3xl text-balance text-xl leading-snug tracking-tight text-fg/75 md:text-2xl">
              {method.headline}
            </span>
          </>
        }
        lede={method.lede}
      >
        {/* Índice del recorrido: se ve de una la secuencia completa */}
        <RevealList as="ol" className="mt-2 grid gap-3 sm:grid-cols-3">
          {phases.map((phase) => (
            <RevealItem as="li" key={phase.index}>
              <a
                href={`#${phase.title.toLowerCase()}`}
                className="glass group flex flex-col gap-2 rounded-card px-6 py-5 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40"
              >
                <span className="label text-fg/40">
                  {phase.index} — {phase.title}
                </span>
                <span className="text-sm text-fg/90">{phase.claim}</span>
              </a>
            </RevealItem>
          ))}
        </RevealList>
      </PageHero>

      {/* Por qué el orden importa */}
      <Section tone="paper">
        <div className="grid gap-16 md:grid-cols-[1fr_1.15fr] md:gap-24">
          <Headline className="self-start text-fg">{method.order.title}</Headline>
          <div className="flex flex-col gap-6">
            {method.order.body.map((p) => (
              <p key={p} className="text-pretty leading-relaxed text-fg/75">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Las tres fases, en detalle */}
      {phases.map((phase, i) => (
        <Section
          key={phase.index}
          id={phase.title.toLowerCase()}
          tone={i % 2 === 0 ? "ink" : "deep"}
          className="scroll-mt-20"
        >
          <div className="grid gap-14 md:grid-cols-[1fr_1.35fr] md:gap-24">
            <div className="flex flex-col gap-6 self-start md:sticky md:top-32">
              <span className="font-mono text-xs tracking-widest text-accent">{phase.index}</span>
              <h2 className="text-display leading-none font-normal">{phase.title}</h2>
              <p className="text-lede text-pretty text-fg/90">{phase.question}</p>
            </div>

            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                {phase.body.map((p) => (
                  <p key={p} className="text-pretty leading-relaxed text-fg/75">
                    {p}
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                <span className="label text-fg/45">Qué hacemos</span>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {phase.points.map((point) => (
                    <li
                      key={point}
                      className="glass flex gap-3.5 rounded-lg px-5 py-4 text-sm text-fg/90"
                    >
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-lime" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 border-l-2 border-lime pl-7">
                <span className="label text-accent">Con qué termina</span>
                <p className="text-pretty text-lg leading-snug">{phase.output}</p>
              </div>

              <div className="flex flex-col gap-5">
                <span className="label text-fg/45">Servicios de esta fase</span>
                <ul className="flex flex-wrap gap-2.5">
                  {phase.services.map((slug) => {
                    const service = serviceBySlug(slug);
                    if (!service) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/servicios/${slug}`}
                          className="label inline-flex items-center gap-2.5 rounded-pill border border-line-strong px-5 py-3 text-fg/75 transition-colors hover:border-lime hover:text-accent"
                        >
                          {service.name} <Arrow />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* Qué previene este orden */}
      <Section tone="ivory">
        <SectionHead index="04" label="Lo que este orden previene">
          <Headline className="text-fg">
            Los tres errores que salen más caros.
          </Headline>
        </SectionHead>

        <RevealList as="ul" className="grid gap-4 md:grid-cols-3">
          {method.avoids.map((a, i) => (
            <RevealItem as="li" key={a.title} className="glass flex flex-col gap-5 rounded-card p-8 md:p-10">
              <span className="font-mono text-xs text-fg/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-balance text-xl leading-tight tracking-tight text-fg">
                {a.title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-fg/55">{a.body}</p>
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      <CtaBand
        title="El método empieza mirando. Empecemos por ahí."
        lede="Una conversación de diagnóstico, sin compromiso. Si al final el problema no necesita tecnología, se lo vamos a decir igual."
      />
    </>
  );
}
