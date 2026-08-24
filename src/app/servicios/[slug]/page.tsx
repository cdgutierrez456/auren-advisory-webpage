import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mark } from "@/components/logo";
import { Arrow, CtaBand, PageHero, Section, SectionHead } from "@/components/ui";
import { serviceBySlug, services, site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const service = serviceBySlug((await params).slug);
  if (!service) return {};
  return pageMetadata(
    `${service.name} — ${service.kind}`,
    service.summary,
    `/servicios/${service.slug}`,
  );
}

export default async function ServicioDetalle({ params }: Params) {
  const service = serviceBySlug((await params).slug);
  if (!service) notFound();

  const next = serviceBySlug(service.next);
  const others = services.filter((s) => s.slug !== service.slug && s.slug !== next?.slug);

  return (
    <>
      <PageHero eyebrow={service.kind} title={service.name} lede={service.lede}>
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

      {/* Qué incluye + con qué se queda */}
      <Section tone="ink">
        <div className="grid gap-16 md:grid-cols-[1.3fr_1fr] md:gap-24">
          <div className="flex flex-col">
            <SectionHead index="01" label="Qué incluye" invert tight />
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
            <SectionHead index="02" label="Con qué se queda" invert tight />
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

      {/* Paso siguiente + resto del sistema */}
      <Section tone="ivory">
        <SectionHead index="03" label="Dentro del sistema Auren" />

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
      </Section>

      <CtaBand
        title={`Hablemos de si ${service.name} es lo que su empresa necesita.`}
        lede="Una primera conversación sin compromiso. Si el problema que tiene se resuelve con otro servicio —o sin tecnología— también se lo vamos a decir."
      />
    </>
  );
}
