import type { Metadata } from "next";
import { RadiografiaForm } from "@/components/radiografia-form";
import { Breadcrumbs, CtaBand, PageHero, Section } from "@/components/ui";
import { radiografia } from "@/content/radiografia";
import { pageMetadata } from "@/lib/seo";

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
        <dl className="grid grid-cols-2 gap-8 pt-4 sm:grid-cols-3 sm:gap-12">
          {radiografia.promises.map((p) => (
            <div key={p.k} className="flex flex-col gap-3 border-t border-rule pt-5">
              <dt className="label text-deep/45">{p.k}</dt>
              <dd className="text-xl tracking-tight text-deep">{p.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section tone="paper" className="!py-16 md:!py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <h2 className="text-balance font-serif text-3xl leading-tight text-deep md:text-4xl">
            {radiografia.value.title}
          </h2>
          <ul className="flex flex-col gap-5">
            {radiografia.value.points.map((point) => (
              <li key={point} className="flex gap-4 text-pretty leading-relaxed text-deep/75">
                <span aria-hidden className="mt-2.5 h-0.5 w-5 shrink-0 bg-lime" />
                {point}
              </li>
            ))}
          </ul>
        </div>
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
