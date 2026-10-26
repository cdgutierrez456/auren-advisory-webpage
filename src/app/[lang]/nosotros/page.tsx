import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "@/components/link";
import { Mark } from "@/components/logo";
import {
  Arrow,
  Breadcrumbs,
  CtaBand,
  Figura,
  PageHero,
  Section,
  SectionHead,
} from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { RevealItem, RevealList } from "@/components/motion";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata(
    t("Consultora de transformación digital en Manizales", "Digital transformation consultancy in Manizales"),
    t(
      "Auren Advisory nació en Manizales en 2026, de la sociedad entre dos emprendedores que veían empresas capaces atrapadas en procesos manuales.",
      "Auren Advisory was founded in Manizales, Colombia, in 2026 by two entrepreneurs who kept seeing capable companies trapped in manual processes.",
    ),
    "/nosotros",
  );
}

export default async function NosotrosPage() {
  const [{ about, principles, site }, t] = await Promise.all([getContent(), getT()]);
  return (
    <>
      <Breadcrumbs trail={[{ name: t("Nosotros", "About"), path: "/nosotros" }]} />

      <PageHero
        eyebrow={about.eyebrow}
        pad={false}
        title={
          <>
            <span className="block">{about.title}</span>
            <span className="mt-7 block max-w-3xl text-balance text-xl leading-snug tracking-tight text-fg/75 md:text-2xl">
              {about.headline}
            </span>
          </>
        }
        lede={about.lede}
      />

      {/* Origen */}
      <Section tone="paper">
        <div className="grid gap-16 md:grid-cols-[1fr_1.15fr] md:gap-24">
          <div className="flex flex-col self-start">
            <SectionHead index="01" label={t("Origen", "Origin")} tight />
            <dl className="grid gap-3">
              {about.facts.map((f) => (
                <div key={f.k} className="glass flex flex-col gap-1.5 rounded-card px-6 py-5">
                  <dt className="label text-fg/40">{f.k}</dt>
                  <dd className="text-pretty text-sm text-fg/90">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-6 md:pt-4">
            {about.origin.map((p) => (
              <p key={p} className="text-pretty leading-relaxed text-fg/75">
                {p}
              </p>
            ))}
            <Figura figure={about.photo} />

            {/* Los socios, con nombre y correo directo. En una firma nueva
                esta es la pieza de confianza: quién responde del trabajo. */}
            <ul className="mt-2 grid gap-4 sm:grid-cols-2">
              {about.founders.map((f) => (
                <li key={f.email} className="glass flex flex-col gap-2 rounded-card px-6 py-5">
                  <p className="text-pretty text-base text-fg">{f.name}</p>
                  <p className="text-pretty text-sm leading-relaxed text-fg/55">{f.role}</p>
                  <a
                    href={`mailto:${f.email}`}
                    className="mt-1 text-sm break-all text-accent underline decoration-line-strong underline-offset-2 transition-colors hover:decoration-lime"
                  >
                    {f.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* El enfoque: técnico, práctico, empírico */}
      <Section tone="ink">
        <SectionHead index="02" label={t("El enfoque", "The approach")} invert>
          <h2 className="text-headline text-balance font-normal">
            {t(
              "Tres tipos de conocimiento que rara vez se combinan.",
              "Three kinds of knowledge that rarely come together.",
            )}
          </h2>
        </SectionHead>

        <RevealList as="ol" className="grid gap-4 md:grid-cols-3">
          {about.disciplines.map((d) => (
            <RevealItem
              as="li"
              key={d.index}
              className="glass flex flex-col gap-6 rounded-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40 md:p-10 md:pb-14"
            >
              <span className="font-mono text-xs tracking-widest text-accent">{d.index}</span>
              <h3 className="text-subhead">
                {d.title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-fg/60">{d.body}</p>
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      {/* Cómo trabajamos */}
      <Section tone="ivory">
        <SectionHead index="03" label={t("Cómo trabajamos", "How we work")} />
        <RevealList className="grid gap-12 md:grid-cols-3 md:gap-16">
          {principles.map((p, i) => (
            <RevealItem key={p.title} className="flex flex-col gap-5">
              <span className="font-mono text-xs text-fg/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-balance text-2xl leading-tight tracking-tight text-fg">
                {p.title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-fg/55">{p.body}</p>
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      {/* Lo que no hacemos + territorio */}
      <Section tone="paper">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <div className="flex flex-col">
            <SectionHead index="04" label={t("Lo que no hacemos", "What we don't do")} tight />
            <ul className="flex flex-col gap-3">
              {about.boundaries.map((b) => (
                <li key={b} className="glass flex gap-5 rounded-card px-6 py-5">
                  <span aria-hidden className="mt-2.5 h-0.5 w-5 shrink-0 bg-lime" />
                  <p className="text-pretty text-sm leading-relaxed text-fg/75">{b}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <SectionHead index="05" label={t("Territorio", "Territory")} tight />
            <div className="glass flex flex-col gap-6 rounded-card p-8 md:p-11">
              <Mark size={30} className="opacity-40" />
              <h3 className="text-balance text-2xl leading-tight tracking-tight text-fg">
                {about.region.title}
              </h3>
              <p className="text-pretty leading-relaxed text-fg/75">{about.region.body}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* La identidad como parte de la firma */}
      <Section tone="ivory" className="!py-20">
        <Link
          href="/marca"
          className="glass group flex flex-col justify-between gap-8 rounded-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40 md:flex-row md:items-center md:p-11"
        >
          <div className="flex flex-col gap-3">
            <span className="label text-fg/40 transition-colors duration-500 group-hover:text-accent">
              {t("Sistema de identidad", "Identity system")}
            </span>
            <p className="max-w-xl text-pretty leading-relaxed text-fg/75">
              {t(
                <>
                  El símbolo <em className="not-italic text-fg">El Vértice</em>, la paleta y las
                  reglas tipográficas de {site.name}, documentadas y abiertas.
                </>,
                <>
                  The <em className="not-italic text-fg">El Vértice</em> symbol, the palette and the
                  typographic rules of {site.name}, documented and open.
                </>,
              )}
            </p>
          </div>
          <span className="label flex items-center gap-3 whitespace-nowrap text-fg transition-colors duration-500 group-hover:text-accent">
            {t("Ver el manual", "View the manual")} <Arrow />
          </span>
        </Link>
      </Section>

      <CtaBand
        title={t(
          "Empecemos por ver cómo funciona su empresa hoy.",
          "Let's start by seeing how your company works today.",
        )}
        lede={t(
          "Una conversación de diagnóstico, sin compromiso. Salimos de ella con una lectura honesta de dónde hay oportunidad real.",
          "A no-commitment diagnostic conversation. We come out of it with an honest reading of where the real opportunity is.",
        )}
      />
    </>
  );
}
