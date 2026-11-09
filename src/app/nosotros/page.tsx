import type { Metadata } from "next";
import Image from "next/image";
import { MethodStage } from "@/components/method-stage";
import { Breadcrumbs, CtaBand, Headline, PageHero, Section, SectionHead } from "@/components/ui";
import { about, method, phases } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Reveal, RevealItem, RevealList } from "@/components/motion";

export const metadata: Metadata = pageMetadata(
  "Quiénes somos y cómo trabajamos",
  "Auren Advisory nació en Manizales en 2026. Dos socios, un método en tres movimientos —ver, entender, transformar— y tres límites que no negociamos.",
  "/nosotros",
);

/**
 * Nosotros, en cuatro pantallas: quiénes somos, cómo trabajamos (el método
 * como escenario en perspectiva), quién responde y lo que no hacemos. Antes
 * el método tenía página propia (/enfoque); ahora vive aquí, porque es la
 * identidad de la firma, no un anexo.
 */
export default function NosotrosPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Nosotros", path: "/nosotros" }]} />

      <PageHero
        eyebrow="Nosotros"
        title={about.title}
        lede={about.origin[0]}
      >
        {about.image ? (
          <div className="relative mt-2 aspect-[16/7] overflow-hidden rounded-card border border-line">
            <Image
              src={about.image.src}
              alt={about.image.alt}
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover"
            />
            <dl className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-px border-t border-ivory/15 bg-ivory/15 sm:grid-cols-4">
              {about.facts.map((f) => (
                <div key={f.k} className="flex flex-col gap-1 bg-deep-900/70 px-5 py-4 backdrop-blur-sm">
                  <dt className="label text-ivory/55">{f.k}</dt>
                  <dd className="text-sm text-ivory">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <dl className="grid gap-2 sm:grid-cols-4">
            {about.facts.map((f) => (
              <div key={f.k} className="card flex flex-col gap-1 rounded-card px-5 py-4">
                <dt className="label text-fg/45">{f.k}</dt>
                <dd className="text-sm text-fg/90">{f.v}</dd>
              </div>
            ))}
          </dl>
        )}
      </PageHero>

      {/* Cómo trabajamos: el método en escena. */}
      <Section id="metodo" tone="deep" className="scroll-mt-20">
        <SectionHead label="Cómo trabajamos" aside="Pase el mouse sobre cada paso">
          <Headline>{method.title}</Headline>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-fg/70">
            Mirar antes de opinar, entender antes de proponer, medir antes de celebrar. Si al
            entender el problema resulta que no hace falta tecnología, se lo decimos.
          </p>
        </SectionHead>
        <MethodStage phases={phases} />
      </Section>

      {/* Quién responde. */}
      <Section tone="ivory">
        <SectionHead label="Quién responde">
          <Headline>Dos socios, con nombre y correo directo.</Headline>
        </SectionHead>
        <RevealList as="ul" className="grid gap-4 md:grid-cols-2">
          {about.founders.map((f) => (
            <RevealItem as="li" key={f.email} className="card flex flex-col gap-3 rounded-card p-7">
              <p className="text-2xl tracking-tight text-fg">{f.name}</p>
              <p className="text-pretty text-sm leading-relaxed text-fg/60">{f.role}</p>
              <a
                href={`mailto:${f.email}`}
                className="mt-2 w-fit break-all text-sm text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-current"
              >
                {f.email}
              </a>
            </RevealItem>
          ))}
        </RevealList>
        <Reveal className="mt-6 max-w-3xl">
          <p className="text-pretty leading-relaxed text-fg/70">{about.origin[2]}</p>
        </Reveal>
      </Section>

      {/* Lo que no hacemos. */}
      <Section tone="paper">
        <SectionHead label="Lo que no hacemos">
          <Headline>Tres límites que filtran mejor que cualquier promesa.</Headline>
        </SectionHead>
        <RevealList as="ul" className="grid gap-4 md:grid-cols-3">
          {about.boundaries.map((b, i) => (
            <RevealItem as="li" key={b} className="flex flex-col gap-4 border-t border-line-strong pt-6">
              <span className="cota text-fg/45">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-pretty text-lg leading-snug text-fg/90">{b}</p>
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      <CtaBand
        title="Empecemos por ver cómo funciona su empresa hoy."
        lede="Una primera conversación de treinta minutos. Salimos de ella con una lectura honesta de dónde hay oportunidad real."
      />
    </>
  );
}
