import type { Metadata } from "next";
import { RadiografiaForm } from "@/components/radiografia-form";
import { Breadcrumbs, CtaBand, PageHero, Section } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata(
    t("Autodiagnóstico de procesos empresariales", "Business process self-assessment"),
    t(
      "Auto-diagnóstico gratuito de 12 preguntas: descubra en 3 minutos dónde su empresa pierde tiempo y dinero, y qué conviene transformar primero.",
      "A free 12-question self-assessment: find out in 3 minutes where your company is losing time and money, and what to transform first.",
    ),
    "/radiografia",
  );
}

export default async function Radiografia() {
  const [{ radiografia }, t] = await Promise.all([getContent(), getT()]);
  return (
    <>
      <Breadcrumbs trail={[{ name: t("Radiografía", "X-Ray"), path: "/radiografia" }]} />

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

      <Section tone="paper" className="!pt-0 !pb-24 md:!pb-32">
        <RadiografiaForm />
      </Section>

      <CtaBand
        title={t(
          "¿Prefiere que miremos su operación con usted?",
          "Would you rather we looked at your operation with you?",
        )}
        lede={t(
          "El Auren Insight le pone números propios a cada foco y le dice cuál transformar primero.",
          "Auren Insight puts your own numbers on each leak and tells you which one to transform first.",
        )}
        action={{ label: t("Ver Auren Insight", "See Auren Insight"), href: "/servicios/auren-insight" }}
      />
    </>
  );
}
