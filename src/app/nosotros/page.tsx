import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Breadcrumbs, CtaBand, Figura, Headline, PageHero, Section, SectionHead } from "@/components/ui";
import { about, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Reveal, RevealItem, RevealList } from "@/components/motion";

export const metadata: Metadata = pageMetadata(
  "Consultora de transformación digital en Manizales",
  "Auren Advisory nació en Manizales en 2026, de la sociedad entre dos emprendedores que veían empresas capaces atrapadas en procesos manuales.",
  "/nosotros",
);

/**
 * Nosotros, en tres pantallas: de dónde venimos, quién responde y qué no
 * hacemos. Lo demás (disciplinas, territorio, manual de marca) va compacto.
 */
export default function NosotrosPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Nosotros", path: "/nosotros" }]} />

      <PageHero
        eyebrow="Nosotros"
        title={
          <>
            <span className="block">{about.title}</span>
            <span className="mt-5 block max-w-3xl text-balance text-lg leading-snug tracking-tight text-fg/75 md:text-xl">
              {about.headline}
            </span>
          </>
        }
        lede={about.lede}
      />

      {/* Origen: un párrafo y los hechos. */}
      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <Reveal as="dl" className="grid gap-2 self-start">
            {about.facts.map((f) => (
              <div key={f.k} className="card flex flex-col gap-1 rounded-card px-5 py-4">
                <dt className="label text-fg/45">{f.k}</dt>
                <dd className="text-sm text-fg/90">{f.v}</dd>
              </div>
            ))}
          </Reveal>
          <Reveal className="flex flex-col gap-6">
            <p className="text-pretty text-lg leading-relaxed text-fg/85">{about.origin[0]}</p>
            <p className="text-pretty leading-relaxed text-fg/70">{about.origin[2]}</p>
            <Figura figure={about.photo} />
          </Reveal>
        </div>
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

        <RevealList as="ol" className="mt-4 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
          {about.disciplines.map((d) => (
            <RevealItem as="li" key={d.index} className="flex flex-col gap-3 bg-surface-2 p-7">
              <span className="cota text-fg/45">{d.index}</span>
              <h3 className="text-subhead text-fg">{d.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-fg/65">{d.body}</p>
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      {/* Lo que no hacemos. */}
      <Section tone="deep">
        <SectionHead label="Lo que no hacemos">
          <Headline>Tres límites que filtran mejor que cualquier promesa.</Headline>
        </SectionHead>
        <RevealList as="ul" className="grid gap-4 md:grid-cols-3">
          {about.boundaries.map((b, i) => (
            <RevealItem as="li" key={b} className="flex flex-col gap-4 border-t border-line pt-6">
              <span className="cota text-accent">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-pretty text-lg leading-snug text-fg/90">{b}</p>
            </RevealItem>
          ))}
        </RevealList>
        <Reveal className="mt-12 flex flex-col gap-3 border-t border-line pt-8 md:flex-row md:items-baseline md:justify-between">
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-fg/65">{about.region.body}</p>
          <Link
            href="/marca"
            className="label flex shrink-0 items-center gap-3 text-fg/60 transition-colors hover:text-fg"
          >
            Sistema de identidad de {site.name} <Arrow />
          </Link>
        </Reveal>
      </Section>

      <CtaBand
        title="Empecemos por ver cómo funciona su empresa hoy."
        lede="Una primera conversación de treinta minutos. Salimos de ella con una lectura honesta de dónde hay oportunidad real."
      />
    </>
  );
}
