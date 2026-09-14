import type { Metadata } from "next";
import { RadiografiaForm } from "@/components/radiografia-form";
import { Breadcrumbs, CtaBand, PageHero, Section } from "@/components/ui";
import { radiografia } from "@/content/radiografia";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = pageMetadata(
  "Autodiagnóstico de procesos empresariales",
  "Auto-diagnóstico gratuito de 12 preguntas: descubra en 3 minutos dónde su empresa pierde tiempo y dinero, y qué conviene transformar primero.",
  "/radiografia",
);

export default function Radiografia() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Radiografía", path: "/radiografia" }]} />

      <PageHero
        eyebrow={radiografia.eyebrow}
        pad={false}
        title={radiografia.title}
        lede={radiografia.lede}
      >
        <dl className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
          {radiografia.promises.map((p) => (
            <div
              key={p.k}
              className="glass flex flex-col gap-3 rounded-card px-6 py-5 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40"
            >
              <dt className="label text-accent/80">{p.k}</dt>
              <dd className="text-xl tracking-tight text-fg">{p.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section tone="paper" className="!py-16 md:!py-20">
        <Reveal className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <h2 className="text-balance font-serif text-3xl leading-tight text-fg md:text-4xl">
            {radiografia.value.title}
          </h2>
          <ul className="flex flex-col gap-5">
            {radiografia.value.points.map((point) => (
              <li key={point} className="flex gap-4 text-pretty leading-relaxed text-fg/75">
                <span aria-hidden className="mt-2.5 h-0.5 w-5 shrink-0 bg-lime" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section className="!pt-0">
        <RadiografiaForm />
      </Section>

      <CtaBand
        title="¿Prefiere que miremos su operación con usted?"
        lede="El Auren Insight le pone números propios a cada foco y le dice cuál transformar primero."
        action={{ label: "Ver Auren Insight", href: "/servicios/auren-insight" }}
      />
    </>
  );
}
