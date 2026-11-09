import type { Metadata } from "next";
import Image from "next/image";
import { MethodStage } from "@/components/method-stage";
import { Breadcrumbs, CtaBand, Headline, PageHero, Section, SectionHead } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { Reveal, RevealItem, RevealList } from "@/components/motion";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata(
    t("Quiénes somos y cómo trabajamos", "Who we are and how we work"),
    t(
      "Auren Advisory nació en Manizales en 2026. Dos socios, un método en tres movimientos (ver, entender, transformar) y tres límites que no se negocian.",
      "Auren Advisory was founded in Manizales in 2026. Two partners, a method in three moves (see, understand, transform) and three non-negotiable limits.",
    ),
    "/nosotros",
  );
}

/**
 * Nosotros, en cuatro pantallas: quiénes somos, cómo trabajamos (el método
 * como escenario en perspectiva), quién responde y lo que no hacemos. Antes
 * el método tenía página propia (/enfoque); ahora vive aquí, porque es la
 * identidad de la firma, no un anexo.
 */
export default async function NosotrosPage() {
  const [{ about, method, phases }, t] = await Promise.all([getContent(), getT()]);
  return (
    <>
      <Breadcrumbs trail={[{ name: t("Nosotros", "About"), path: "/nosotros" }]} />

      <PageHero
        eyebrow={t("Nosotros", "About")}
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
        <SectionHead
          label={t("Cómo trabajamos", "How we work")}
          aside={t("Pase el mouse sobre cada paso", "Hover over each step")}
        >
          <Headline>{method.title}</Headline>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-fg/70">
            {t(
              "Mirar antes de opinar, entender antes de proponer, medir antes de celebrar. Si al entender el problema resulta que no hace falta tecnología, el diagnóstico lo indicará.",
              "Look before giving an opinion, understand before proposing, measure before celebrating. If understanding the problem shows that technology isn't needed, the diagnosis will say so.",
            )}
          </p>
        </SectionHead>
        <MethodStage phases={phases} />
      </Section>

      {/* Quién responde. */}
      <Section tone="ivory">
        <SectionHead label={t("Quién responde", "Who answers")}>
          <Headline>{t("Dos socios, con nombre y correo directo.", "Two partners, with names and direct email.")}</Headline>
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
        <SectionHead label={t("Lo que no hacemos", "What we don't do")}>
          <Headline>
            {t("Tres límites que filtran mejor que cualquier promesa.", "Three limits that filter better than any promise.")}
          </Headline>
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
        title={t("El primer paso es ver cómo funciona la empresa hoy.", "The first step is to see how the company works today.")}
        lede={t(
          "Una primera conversación de treinta minutos, de la que sale una lectura honesta de dónde hay oportunidad real.",
          "A first thirty-minute conversation that yields an honest reading of where the real opportunity is.",
        )}
      />
    </>
  );
}
