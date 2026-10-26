import type { Metadata } from "next";
import Link from "@/components/link";
import { notFound } from "next/navigation";
import { Mark } from "@/components/logo";
import {
  Arrow,
  Breadcrumbs,
  CtaBand,
  FaqList,
  Figura,
  Headline,
  PageHero,
  Section,
  SectionHead,
} from "@/components/ui";
import { services } from "@/content/site";
import { getContent, getLang, getT } from "@/lib/i18n-server";
import { faqPage, JsonLd, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { DrawRule, Reveal, RevealItem, RevealList } from "@/components/motion";

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

export default async function ServicioDetalle({ params }: Params) {
  const [{ posts, serviceBySlug, services }, lang, t] = await Promise.all([
    getContent(),
    getLang(),
    getT(),
  ]);
  const service = serviceBySlug((await params).slug);
  if (!service) notFound();

  const next = serviceBySlug(service.next);
  const others = services.filter((s) => s.slug !== service.slug && s.slug !== next?.slug);
  const lecturas = posts.filter((p) => p.services.includes(service.slug));

  return (
    <>
      <JsonLd data={serviceSchema(service, lang)} />
      <JsonLd data={faqPage(service.faqs)} />

      <Breadcrumbs
        trail={[
          { name: t("Servicios", "Services"), path: "/servicios" },
          { name: service.name, path: `/servicios/${service.slug}` },
        ]}
      />

      <PageHero
        eyebrow={service.kind}
        pad={false}
        title={
          <>
            <span className="block">{service.name}</span>
            <span className="mt-7 block max-w-3xl text-balance text-xl leading-snug tracking-tight text-fg/75 md:text-2xl">
              {service.headline}
            </span>
          </>
        }
        lede={service.lede}
      >
        <dl className="mt-2 grid gap-3 sm:grid-cols-3">
          <div className="glass flex flex-col gap-2 rounded-card px-6 py-5">
            <dt className="label text-accent/80">{t("Entrega", "Deliverable")}</dt>
            <dd className="text-sm text-fg/90">{service.deliverable}</dd>
          </div>
          <div className="glass flex flex-col gap-2 rounded-card px-6 py-5">
            <dt className="label text-accent/80">{t("Duración de referencia", "Typical length")}</dt>
            <dd className="text-sm text-fg/90">{service.duration}</dd>
          </div>
          <div className="glass flex flex-col gap-2 rounded-card px-6 py-5">
            <dt className="label text-accent/80">{t("Etapa", "Stage")}</dt>
            <dd className="text-sm text-fg/90">{service.kind}</dd>
          </div>
        </dl>
      </PageHero>

      {/* Qué es + cuándo tiene sentido */}
      <Section tone="paper">
        <div className="grid gap-16 md:grid-cols-[1.15fr_1fr] md:gap-24">
          <div className="flex flex-col gap-6">
            {service.body.map((p) => (
              <p key={p} className="text-pretty leading-relaxed text-fg/75">
                {p}
              </p>
            ))}
            <Figura figure={service.image} />
          </div>

          <div className="flex flex-col gap-7 self-start border-l border-lime pl-8">
            <span className="label text-fg/55">{t("Cuándo tiene sentido", "When it makes sense")}</span>
            <ul className="flex flex-col gap-4">
              {service.signals.map((s) => (
                <li key={s} className="flex gap-3.5 text-pretty text-sm leading-relaxed text-fg/75">
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* El trabajo, paso a paso. Responde «y ustedes qué hacen exactamente». */}
      <Section tone="ivory">
        <SectionHead index="01" label={t("Cómo trabajamos", "How we work")}>
          <Headline className="text-fg">
            {service.keyword}, {t("paso a paso.", "step by step.")}
          </Headline>
        </SectionHead>
        <Reveal as="ol" className="glass grid divide-y divide-line overflow-hidden rounded-card">
          {service.steps.map((step, i) => (
            <li
              key={step.title}
              className="grid gap-4 px-7 py-8 md:grid-cols-[4rem_18rem_1fr] md:gap-10 md:px-10 md:py-10"
            >
              <span className="font-mono text-xs text-fg/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl leading-snug tracking-tight text-balance text-fg">
                {step.title}
              </h3>
              <p className="max-w-2xl text-pretty leading-relaxed text-fg/75">{step.body}</p>
            </li>
          ))}
        </Reveal>
      </Section>

      {/* Qué incluye + con qué se queda */}
      <Section tone="ink">
        <div className="grid gap-16 md:grid-cols-[1.3fr_1fr] md:gap-24">
          <div className="flex flex-col">
            <SectionHead index="02" label={t("Qué incluye", "What it includes")} invert tight />
            <ol className="grid gap-3">
              {service.includes.map((item, i) => (
                <li key={item} className="glass flex gap-6 rounded-card px-6 py-5">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-pretty text-fg/90">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col">
            <SectionHead index="03" label={t("Con qué se queda", "What you keep")} invert tight />
            <ul className="flex flex-col gap-6">
              {service.outcome.map((o) => (
                <li key={o} className="flex flex-col gap-3">
                  <DrawRule className="h-0.5 w-6 bg-lime" />
                  <span className="text-pretty leading-snug text-fg/90">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Dónde aplica: el mismo servicio en el lenguaje de cada industria. */}
      <Section tone="paper">
        <SectionHead index="04" label={t("Dónde aplica", "Where it applies")}>
          <Headline className="text-fg">
            {t(`¿En qué sectores aplica ${service.name}?`, `Which sectors is ${service.name} for?`)}
          </Headline>
          <p className="mt-6 text-pretty leading-relaxed text-fg/55">
            {t(
              "El método no cambia entre sectores; la fricción sí. Así se ve este servicio según dónde se aplique.",
              "The method doesn't change between sectors; the friction does. This is what the service looks like depending on where it's applied.",
            )}
          </p>
        </SectionHead>
        <RevealList className="grid gap-4 md:grid-cols-3">
          {service.industries.map((ind) => (
            <RevealItem
              as="article"
              key={ind.sector}
              className="glass flex flex-col gap-4 rounded-card p-8 md:p-10"
            >
              <DrawRule className="h-0.5 w-8 bg-lime" />
              <h3 className="text-lg leading-snug text-balance text-fg">{ind.sector}</h3>
              <p className="text-pretty text-sm leading-relaxed text-fg/55">{ind.body}</p>
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      {/* Qué se mide. La métrica se acuerda antes de empezar, no al final. */}
      <Section tone="ivory" className="!py-20">
        <SectionHead index="05" label={t("Qué medimos", "What we measure")}>
          <Headline className="text-fg">
            {t("Cómo se demuestra el resultado.", "How the result is proven.")}
          </Headline>
          <p className="mt-6 text-pretty leading-relaxed text-fg/55">
            {t(
              "Se acuerdan al inicio, con la línea base tomada antes de tocar nada. Sin punto de partida medido no hay forma de demostrar el resultado después.",
              "They're agreed at the start, with the baseline taken before touching anything. Without a measured starting point there's no way to prove the result afterwards.",
            )}
          </p>
        </SectionHead>
        <RevealList as="ul" className="grid gap-4 sm:grid-cols-2">
          {service.measures.map((m) => (
            <RevealItem as="li" key={m} className="glass flex gap-4 rounded-card p-7">
              <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-lime" />
              <span className="text-pretty text-sm leading-relaxed text-fg/75">{m}</span>
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      {/* Preguntas frecuentes: objeciones de venta y búsquedas de cola larga. */}
      <Section tone="ink">
        <SectionHead index="06" label={t("Preguntas frecuentes", "Frequently asked questions")} invert>
          <h2 className="text-headline text-balance font-normal">
            {t(
              `Lo que se pregunta antes de contratar ${service.name}.`,
              `What people ask before hiring ${service.name}.`,
            )}
          </h2>
        </SectionHead>
        <FaqList faqs={service.faqs} />
      </Section>

      {/* Paso siguiente + resto del sistema */}
      <Section tone="ivory">
        <SectionHead index="07" label={t("Dentro del sistema Auren", "Within the Auren system")}>
          <Headline className="text-fg">
            {t(`Qué sigue después de ${service.name}.`, `What comes after ${service.name}.`)}
          </Headline>
        </SectionHead>

        {next ? (
          <Link
            href={`/servicios/${next.slug}`}
            className="glass group flex flex-col gap-8 rounded-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40 md:p-12"
          >
            <div className="flex items-center justify-between gap-6">
              <span className="label text-fg/40 transition-colors duration-500 group-hover:text-accent">
                {t("Paso siguiente", "Next step")}
              </span>
              <Arrow className="text-fg/40 transition-transform duration-500 ease-out-quint group-hover:translate-x-1 group-hover:text-accent" />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="wordmark text-xl uppercase text-fg">
                {next.name}
              </h3>
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-fg/55 transition-colors duration-500 group-hover:text-fg/75">
                {next.summary}
              </p>
            </div>
          </Link>
        ) : null}

        <RevealList as="ul" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <RevealItem as="li" key={s.slug}>
              <Link
                href={`/servicios/${s.slug}`}
                className="glass group flex h-full items-center gap-4 rounded-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40"
              >
                <Mark
                  size={18}
                  className="shrink-0 opacity-45 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="flex flex-col gap-1">
                  <span className="wordmark text-xs uppercase text-fg">{s.name}</span>
                  <span className="text-xs text-fg/55">{s.kind}</span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealList>

        {lecturas.length ? (
          <div className="mt-16 flex flex-col gap-6 border-t border-line pt-10">
            <span className="label text-fg/40">{t("Para leer antes de decidir", "Read before you decide")}</span>
            <ul className="glass flex flex-col divide-y divide-line overflow-hidden rounded-card">
              {lecturas.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/recursos/${post.slug}`}
                    className="group flex items-baseline justify-between gap-6 px-6 py-5 transition-colors hover:bg-fg/5"
                  >
                    <span className="text-pretty text-fg">{post.title}</span>
                    <span className="label flex shrink-0 items-center gap-3 text-fg/40 transition-colors group-hover:text-accent">
                      {post.minutes} min <Arrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      <CtaBand
        title={t(
          `Hablemos de si ${service.name} es lo que su empresa necesita.`,
          `Let's talk about whether ${service.name} is what your company needs.`,
        )}
        lede={t(
          "Una primera conversación sin compromiso. Si el problema que tiene se resuelve con otro servicio —o sin tecnología— también se lo vamos a decir.",
          "A first, no-commitment conversation. If your problem is solved by another service —or without technology— we'll tell you that too.",
        )}
      />
    </>
  );
}
