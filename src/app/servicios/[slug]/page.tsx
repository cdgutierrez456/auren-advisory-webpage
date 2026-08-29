import type { Metadata } from "next";
import Link from "next/link";
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
import { posts } from "@/content/recursos";
import { serviceBySlug, services } from "@/content/site";
import { faqPage, JsonLd, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
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
  const service = serviceBySlug((await params).slug);
  if (!service) notFound();

  const next = serviceBySlug(service.next);
  const others = services.filter((s) => s.slug !== service.slug && s.slug !== next?.slug);
  const lecturas = posts.filter((p) => p.services.includes(service.slug));

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqPage(service.faqs)} />

      <Breadcrumbs
        trail={[
          { name: "Servicios", path: "/servicios" },
          { name: service.name, path: `/servicios/${service.slug}` },
        ]}
      />

      <PageHero
        eyebrow={service.kind}
        pad={false}
        title={
          <>
            <span className="block">{service.name}</span>
            <span className="mt-7 block max-w-3xl text-balance text-xl leading-snug tracking-tight text-deep/70 md:text-2xl">
              {service.headline}
            </span>
          </>
        }
        lede={service.lede}
      >
        <dl className="mt-4 grid gap-px border-t border-rule sm:grid-cols-3">
          <div className="flex flex-col gap-2 py-6 pr-8">
            <dt className="label text-deep/40">Entrega</dt>
            <dd className="text-sm text-deep/80">{service.deliverable}</dd>
          </div>
          <div className="flex flex-col gap-2 py-6 pr-8">
            <dt className="label text-deep/40">Duración de referencia</dt>
            <dd className="text-sm text-deep/80">{service.duration}</dd>
          </div>
          <div className="flex flex-col gap-2 py-6">
            <dt className="label text-deep/40">Etapa</dt>
            <dd className="text-sm text-deep/80">{service.kind}</dd>
          </div>
        </dl>
      </PageHero>

      {/* Qué es + cuándo tiene sentido */}
      <Section tone="paper">
        <div className="grid gap-16 md:grid-cols-[1.15fr_1fr] md:gap-24">
          <div className="flex flex-col gap-6">
            {service.body.map((p) => (
              <p key={p} className="text-pretty leading-relaxed text-deep/75">
                {p}
              </p>
            ))}
            <Figura figure={service.image} />
          </div>

          <div className="flex flex-col gap-7 self-start border-l border-lime pl-8">
            <span className="label text-deep/50">Cuándo tiene sentido</span>
            <ul className="flex flex-col gap-4">
              {service.signals.map((s) => (
                <li key={s} className="flex gap-3.5 text-pretty text-sm leading-relaxed text-deep/70">
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-deep/30" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* El trabajo, paso a paso. Responde «y ustedes qué hacen exactamente». */}
      <Section tone="ivory">
        <SectionHead index="01" label="Cómo trabajamos">
          <Headline className="text-deep">{service.keyword}, paso a paso.</Headline>
        </SectionHead>
        <ol className="grid gap-px border-y border-rule bg-rule">
          {service.steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal grid gap-4 bg-ivory py-9 md:grid-cols-[4rem_18rem_1fr] md:gap-10 md:py-11"
            >
              <span className="font-mono text-xs text-deep/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl leading-snug tracking-tight text-balance text-deep">
                {step.title}
              </h3>
              <p className="max-w-2xl text-pretty leading-relaxed text-deep/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Qué incluye + con qué se queda */}
      <Section tone="ink">
        <div className="grid gap-16 md:grid-cols-[1.3fr_1fr] md:gap-24">
          <div className="flex flex-col">
            <SectionHead index="02" label="Qué incluye" invert tight />
            <ol className="grid gap-px bg-rule-invert">
              {service.includes.map((item, i) => (
                <li key={item} className="flex gap-6 bg-ink py-5">
                  <span className="font-mono text-xs text-lime">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-pretty text-ivory/85">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col">
            <SectionHead index="03" label="Con qué se queda" invert tight />
            <ul className="flex flex-col gap-6">
              {service.outcome.map((o) => (
                <li key={o} className="flex flex-col gap-3">
                  <span className="h-0.5 w-6 bg-lime" />
                  <span className="text-pretty leading-snug text-ivory/85">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Dónde aplica: el mismo servicio en el lenguaje de cada industria. */}
      <Section tone="paper">
        <SectionHead index="04" label="Dónde aplica">
          <Headline className="text-deep">¿En qué sectores aplica {service.name}?</Headline>
          <p className="mt-6 text-pretty leading-relaxed text-deep/65">
            El método no cambia entre sectores; la fricción sí. Así se ve este servicio
            según dónde se aplique.
          </p>
        </SectionHead>
        <div className="grid gap-px border border-rule bg-rule md:grid-cols-3">
          {service.industries.map((ind) => (
            <article key={ind.sector} className="reveal flex flex-col gap-4 bg-paper p-8 md:p-10">
              <span className="h-0.5 w-8 bg-lime" />
              <h3 className="text-lg leading-snug text-balance text-deep">{ind.sector}</h3>
              <p className="text-pretty text-sm leading-relaxed text-deep/65">{ind.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Qué se mide. La métrica se acuerda antes de empezar, no al final. */}
      <Section tone="ivory" className="!py-20">
        <SectionHead index="05" label="Qué medimos">
          <Headline className="text-deep">Cómo se demuestra el resultado.</Headline>
          <p className="mt-6 text-pretty leading-relaxed text-deep/65">
            Se acuerdan al inicio, con la línea base tomada antes de tocar nada. Sin
            punto de partida medido no hay forma de demostrar el resultado después.
          </p>
        </SectionHead>
        <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
          {service.measures.map((m) => (
            <li key={m} className="flex gap-4 bg-ivory p-7">
              <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-lime" />
              <span className="text-pretty text-sm leading-relaxed text-deep/75">{m}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Preguntas frecuentes: objeciones de venta y búsquedas de cola larga. */}
      <Section tone="ink">
        <SectionHead index="06" label="Preguntas frecuentes" invert>
          <h2 className="text-headline text-balance font-normal">
            Lo que se pregunta antes de contratar {service.name}.
          </h2>
        </SectionHead>
        <FaqList faqs={service.faqs} invert />
      </Section>

      {/* Paso siguiente + resto del sistema */}
      <Section tone="ivory">
        <SectionHead index="07" label="Dentro del sistema Auren">
          <Headline className="text-deep">Qué sigue después de {service.name}.</Headline>
        </SectionHead>

        {next ? (
          <Link
            href={`/servicios/${next.slug}`}
            className="group flex flex-col gap-8 border border-rule bg-paper p-8 transition-colors duration-500 hover:bg-deep hover:text-ivory md:p-12"
          >
            <div className="flex items-center justify-between gap-6">
              <span className="label text-deep/40 group-hover:text-lime">Paso siguiente</span>
              <Arrow className="text-deep/40 transition-transform duration-500 ease-out-quint group-hover:translate-x-1 group-hover:text-lime" />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="wordmark text-xl uppercase text-deep group-hover:text-ivory">
                {next.name}
              </h3>
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-deep/65 group-hover:text-ivory/70">
                {next.summary}
              </p>
            </div>
          </Link>
        ) : null}

        <ul className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug} className="bg-ivory">
              <Link
                href={`/servicios/${s.slug}`}
                className="group flex h-full items-center gap-4 p-6 transition-colors duration-500 hover:bg-paper"
              >
                <Mark
                  size={18}
                  className="shrink-0 opacity-30 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="flex flex-col gap-1">
                  <span className="wordmark text-xs uppercase text-deep">{s.name}</span>
                  <span className="text-xs text-deep/50">{s.kind}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {lecturas.length ? (
          <div className="mt-16 flex flex-col gap-6 border-t border-rule pt-10">
            <span className="label text-deep/40">Para leer antes de decidir</span>
            <ul className="flex flex-col gap-px bg-rule">
              {lecturas.map((post) => (
                <li key={post.slug} className="bg-ivory">
                  <Link
                    href={`/recursos/${post.slug}`}
                    className="group flex items-baseline justify-between gap-6 py-5 transition-opacity hover:opacity-60"
                  >
                    <span className="text-pretty text-deep">{post.title}</span>
                    <span className="label flex shrink-0 items-center gap-3 text-deep/40">
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
        title={`Hablemos de si ${service.name} es lo que su empresa necesita.`}
        lede="Una primera conversación sin compromiso. Si el problema que tiene se resuelve con otro servicio —o sin tecnología— también se lo vamos a decir."
      />
    </>
  );
}
