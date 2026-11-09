import type { Metadata } from "next";
import Link from "@/components/link";
import { notFound } from "next/navigation";
import {
  Arrow,
  Breadcrumbs,
  CtaBand,
  FaqList,
  Figura,
  Headline,
  NumberedList,
  PageHero,
  Section,
  SectionHead,
} from "@/components/ui";
import { services } from "@/content/site";
import { getContent, getLang, getT } from "@/lib/i18n-server";
import { faqPage, JsonLd, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { Reveal, RevealItem, RevealList } from "@/components/motion";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { serviceBySlug } = await getContent();
  const service = serviceBySlug((await params).slug);
  if (!service) return {};
  // El nombre de marca no se busca; `keyword` sí. Va delante en el <title>
  // porque el buscador corta por la derecha alrededor de los 60 caracteres.
  return pageMetadata(
    `${service.keyword} | ${service.name}`,
    service.summary,
    `/servicios/${service.slug}`,
  );
}

/**
 * Página de servicio, en cinco pasos legibles: qué es y cuándo tiene sentido
 * → cómo trabajamos → qué incluye y qué se mide → preguntas → qué sigue.
 * El contenido SEO se conserva completo; lo que cambió es el orden y el aire.
 */
export default async function ServicioDetalle({ params }: Params) {
  const [{ posts, serviceBySlug }, lang, t] = await Promise.all([getContent(), getLang(), getT()]);
  const service = serviceBySlug((await params).slug);
  if (!service) notFound();

  const next = serviceBySlug(service.next);
  const lecturas = posts.filter((p) => p.services.includes(service.slug));

  return (
    <>
      <JsonLd data={serviceSchema(service, lang)} />
      <JsonLd data={faqPage(service.faqs)} />

      <Breadcrumbs
        trail={[
          { name: t("Soluciones", "Solutions"), path: "/soluciones" },
          { name: service.name, path: `/servicios/${service.slug}` },
        ]}
      />

      <PageHero
        eyebrow={`${service.name} · ${service.kind}`}
        title={
          <>
            {/* La necesidad va primero y la marca después: nadie busca «Auren
                Flow», busca «automatización de procesos». */}
            <span className="block">{service.keyword}</span>
            <span className="mt-5 block max-w-3xl text-balance text-lg leading-snug tracking-tight text-fg/75 md:text-xl">
              {service.headline}
            </span>
          </>
        }
        lede={service.lede}
      >
        <dl className="grid gap-2 sm:grid-cols-3">
          {[
            [t("Entrega", "Deliverable"), service.deliverable],
            [t("Duración de referencia", "Reference duration"), service.duration],
            [t("Paso siguiente", "Next step"), next?.name ?? "—"],
          ].map(([k, v]) => (
            <div key={k} className="card flex flex-col gap-1 rounded-card px-5 py-4">
              <dt className="label text-fg/45">{k}</dt>
              <dd className="text-sm text-fg/90">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* 1 · Qué es y cuándo tiene sentido */}
      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <Reveal className="flex flex-col gap-5">
            {service.body.map((p) => (
              <p key={p} className="text-pretty text-lg leading-relaxed text-fg/85">
                {p}
              </p>
            ))}
            <Figura figure={service.image} />
          </Reveal>
          <Reveal className="flex flex-col gap-4 self-start border-l-2 border-lime pl-6">
            <span className="label text-fg/50">{t("Tiene sentido si", "It makes sense if")}</span>
            <ul className="flex flex-col gap-3">
              {service.signals.map((s) => (
                <li key={s} className="text-pretty leading-snug text-fg/90">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 2 · Cómo trabajamos */}
      <Section tone="ivory">
        <SectionHead label={t("Cómo trabajamos", "How we work")}>
          <Headline>
            {service.keyword}, {t("paso a paso.", "step by step.")}
          </Headline>
        </SectionHead>
        <Reveal>
          <NumberedList items={service.steps} />
        </Reveal>
      </Section>

      {/* 3 · Qué obtiene, qué incluye y cómo se demuestra */}
      <Section tone="deep">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          <Reveal className="flex flex-col gap-5">
            <span className="label text-fg/50">{t("Con qué se queda", "What you keep")}</span>
            <ul className="flex flex-col gap-4">
              {service.outcome.map((o) => (
                <li key={o} className="flex gap-3 text-pretty text-lg leading-snug text-fg/90">
                  <span aria-hidden className="mt-3 h-0.5 w-4 shrink-0 bg-lime" />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="flex flex-col gap-5">
            <span className="label text-fg/50">{t("Qué incluye", "What's included")}</span>
            <ol className="flex flex-col gap-3">
              {service.includes.map((item, i) => (
                <li key={item} className="flex gap-3 text-pretty text-sm leading-relaxed text-fg/80">
                  <span className="cota mt-1 shrink-0 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="flex flex-col gap-5">
            <span className="label text-fg/50">{t("Cómo se demuestra", "How it's proven")}</span>
            <ul className="flex flex-col gap-3">
              {service.measures.map((m) => (
                <li key={m} className="flex gap-3 text-pretty text-sm leading-relaxed text-fg/80">
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 4 · Dónde aplica, compacto */}
      <Section tone="paper">
        <SectionHead label={t("Dónde aplica", "Where it applies")}>
          <Headline>
            {t("El mismo servicio, en el lenguaje de cada sector.", "The same service, in each sector's language.")}
          </Headline>
        </SectionHead>
        <RevealList as="ul" className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
          {service.industries.map((ind) => (
            <RevealItem as="li" key={ind.sector} className="flex flex-col gap-3 bg-surface-2 p-7">
              <h3 className="text-lg leading-snug text-balance text-fg">{ind.sector}</h3>
              <p className="text-pretty text-sm leading-relaxed text-fg/65">{ind.body}</p>
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      {/* 5 · Preguntas */}
      <Section tone="ivory">
        <SectionHead label={t("Preguntas frecuentes", "Frequently asked questions")}>
          <Headline>{t("Lo que se pregunta antes de contratar.", "What people ask before hiring.")}</Headline>
        </SectionHead>
        <FaqList faqs={service.faqs} />

        {/* Qué sigue + lectura, en una sola fila al pie. */}
        <div className="mt-14 grid gap-4 border-t border-line pt-10 md:grid-cols-2">
          {next ? (
            <Link
              href={`/servicios/${next.slug}`}
              className="card group flex flex-col gap-3 rounded-card p-7 transition-colors hover:bg-surface-3"
            >
              <span className="label text-fg/50">{t("Paso siguiente", "Next step")}</span>
              <span className="text-xl tracking-tight text-fg">{next.keyword}</span>
              <span className="text-sm text-fg/60">{next.name}</span>
              <span className="label mt-2 flex items-center gap-2.5 text-fg/60 transition-colors group-hover:text-fg">
                {t("Ver servicio", "See service")} <Arrow />
              </span>
            </Link>
          ) : null}
          {lecturas.length ? (
            <div className="card flex flex-col gap-3 rounded-card p-7">
              <span className="label text-fg/50">{t("Para leer antes de decidir", "Reading before deciding")}</span>
              <ul className="flex flex-col divide-y divide-line">
                {lecturas.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/recursos/${post.slug}`}
                      className="group flex items-baseline justify-between gap-4 py-3 text-sm text-fg transition-colors hover:text-accent"
                    >
                      {post.title}
                      <span className="label flex shrink-0 items-center gap-2 text-fg/45">
                        {post.minutes} min <Arrow />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Section>

      <CtaBand
        title={t(
          `Hablemos de si ${service.keyword.toLowerCase()} es lo que su empresa necesita.`,
          `Let's talk about whether ${service.keyword.toLowerCase()} is what your company needs.`,
        )}
        lede={t(
          "Si el problema se resuelve con otro servicio, o sin tecnología, también se lo vamos a decir.",
          "If the problem is solved by another service, or without technology, we'll tell you that too.",
        )}
      />
    </>
  );
}
