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
            <span className="mt-7 block max-w-3xl text-balance text-xl leading-snug tracking-tight text-deep/70 md:text-2xl">
              {method.headline}
            </span>
          </>
        }
        lede={method.lede}
      >
        {/* Índice del recorrido: se ve de una la secuencia completa */}
        <ol className="mt-4 grid gap-px border-t border-rule sm:grid-cols-3">
          {phases.map((phase) => (
            <li key={phase.index}>
              <a
                href={`#${phase.title.toLowerCase()}`}
                className="group flex flex-col gap-2 py-6 pr-8 transition-opacity hover:opacity-60"
              >
                <span className="label text-deep/40">
                  {phase.index} — {phase.title}
                </span>
                <span className="text-sm text-deep/80">{phase.claim}</span>
              </a>
            </li>
          ))}
        </ol>
      </PageHero>

      {/* Por qué el orden importa */}
      <Section tone="paper">
        <div className="grid gap-16 md:grid-cols-[1fr_1.15fr] md:gap-24">
          <Headline className="self-start text-deep">{method.order.title}</Headline>
          <div className="flex flex-col gap-6">
            {method.order.body.map((p) => (
              <p key={p} className="text-pretty leading-relaxed text-deep/75">
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
              <span className="font-mono text-xs tracking-widest text-lime">{phase.index}</span>
              <h2 className="text-display leading-none font-normal">{phase.title}</h2>
              <p className="text-lede text-pretty text-ivory/85">{phase.question}</p>
            </div>

            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                {phase.body.map((p) => (
                  <p key={p} className="text-pretty leading-relaxed text-ivory/75">
                    {p}
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                <span className="label text-ivory/45">Qué hacemos</span>
                <ul className="grid gap-px bg-rule-invert sm:grid-cols-2">
                  {phase.points.map((point) => (
                    <li
                      key={point}
                      className={`flex gap-3.5 py-4 pr-6 text-sm text-ivory/80 ${
                        i % 2 === 0 ? "bg-ink" : "bg-deep"
                      }`}
                    >
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-lime" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 border-l-2 border-lime pl-7">
                <span className="label text-lime">Con qué termina</span>
                <p className="text-pretty text-lg leading-snug">{phase.output}</p>
              </div>

              <div className="flex flex-col gap-5">
                <span className="label text-ivory/45">Servicios de esta fase</span>
                <ul className="flex flex-wrap gap-2.5">
                  {phase.services.map((slug) => {
                    const service = serviceBySlug(slug);
                    if (!service) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/servicios/${slug}`}
                          className="label inline-flex items-center gap-2.5 border border-rule-invert px-4 py-3 text-ivory/70 transition-colors hover:border-lime hover:text-ivory"
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
          <Headline className="text-deep">
            Los tres errores que salen más caros.
          </Headline>
        </SectionHead>

        <ul className="grid gap-px border border-rule bg-rule md:grid-cols-3">
          {method.avoids.map((a, i) => (
            <li key={a.title} className="reveal flex flex-col gap-5 bg-ivory p-8 md:p-10">
              <span className="font-mono text-xs text-deep/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-balance text-xl leading-tight tracking-tight text-deep">
                {a.title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-deep/65">{a.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="El método empieza mirando. Empecemos por ahí."
        lede="Una conversación de diagnóstico, sin compromiso. Si al final el problema no necesita tecnología, se lo vamos a decir igual."
      />
    </>
  );
}
