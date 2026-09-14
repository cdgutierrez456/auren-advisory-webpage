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
import { fechaLarga, postBySlug, posts } from "@/content/recursos";
import { serviceBySlug } from "@/content/site";
import { articleSchema, faqPage, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { RevealItem, RevealList } from "@/components/motion";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = postBySlug((await params).slug);
  if (!post) return {};
  return pageMetadata(
    post.seoTitle ?? post.title,
    post.description,
    `/recursos/${post.slug}`,
    { published: post.published, modified: post.updated },
  );
}

export default async function Articulo({ params }: Params) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();

  const servicios = post.services.map(serviceBySlug).filter((s) => s !== undefined);
  const relacionados = post.related.map(postBySlug).filter((p) => p !== undefined);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={faqPage(post.faqs)} />

      <Breadcrumbs
        trail={[
          { name: "Recursos", path: "/recursos" },
          { name: post.title, path: `/recursos/${post.slug}` },
        ]}
      />

      <PageHero eyebrow="Recursos" pad={false} title={post.title} lede={post.lede}>
        <dl className="mt-4 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-6">
          <div className="flex flex-col gap-2">
            <dt className="label text-fg/40">Publicado</dt>
            <dd className="text-sm text-fg/90">
              <time dateTime={post.published}>{fechaLarga(post.published)}</time>
            </dd>
          </div>
          {post.updated ? (
            <div className="flex flex-col gap-2">
              <dt className="label text-fg/40">Actualizado</dt>
              <dd className="text-sm text-fg/90">
                <time dateTime={post.updated}>{fechaLarga(post.updated)}</time>
              </dd>
            </div>
          ) : null}
          <div className="flex flex-col gap-2">
            <dt className="label text-fg/40">Lectura</dt>
            <dd className="text-sm text-fg/90">{post.minutes} minutos</dd>
          </div>
        </dl>
      </PageHero>

      <Section tone="paper">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,44rem)_1fr] lg:gap-24">
          {/* La columna del artículo. Ancho de lectura, no de pantalla. */}
          <article className="flex flex-col gap-14">
            <Figura figure={post.image} priority />
            {post.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-5">
                <h2 className="text-2xl leading-snug text-balance tracking-tight text-fg md:text-3xl">
                  {section.heading}
                </h2>
                {section.body.map((p) => (
                  <p key={p} className="text-pretty leading-relaxed text-fg/75">
                    {p}
                  </p>
                ))}
                {section.list ? (
                  <ul className="mt-2 flex flex-col gap-3 border-l border-lime pl-7">
                    {section.list.map((item) => (
                      <li key={item} className="text-pretty leading-relaxed text-fg/75">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>

          {/* Los servicios que resuelven lo que el artículo describe. */}
          <aside className="flex flex-col gap-6 self-start lg:sticky lg:top-28">
            <span className="label text-fg/40">Con esto trabajamos</span>
            <ul className="flex flex-col gap-3">
              {servicios.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="glass group flex flex-col gap-3 rounded-card px-6 py-5 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40"
                  >
                    <span className="flex items-center gap-3">
                      <Mark size={16} className="shrink-0 opacity-40" />
                      <span className="wordmark text-xs uppercase text-fg">{s.name}</span>
                    </span>
                    <span className="text-pretty text-sm leading-relaxed text-fg/55">
                      {s.summary}
                    </span>
                    <span className="label flex items-center gap-2.5 text-fg/40 transition-colors group-hover:text-accent">
                      Ver servicio <Arrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="border-t border-line pt-6 text-pretty text-sm leading-relaxed text-fg/55">
              ¿Prefiere una estimación antes de hablar con alguien? La{" "}
              <Link href="/radiografia" className="text-fg underline underline-offset-4">
                Radiografía Auren
              </Link>{" "}
              son doce preguntas, diez minutos y sin registro.
            </p>
          </aside>
        </div>
      </Section>

      <Section tone="ink">
        <SectionHead index="01" label="Preguntas frecuentes" invert>
          <Headline>Preguntas frecuentes sobre {post.keyword}.</Headline>
        </SectionHead>
        <FaqList faqs={post.faqs} />
      </Section>

      {relacionados.length ? (
        <Section tone="ivory">
          <SectionHead index="02" label="Seguir leyendo">
            <Headline className="text-fg">Seguir leyendo.</Headline>
          </SectionHead>
          <RevealList as="ul" className="grid gap-4 md:grid-cols-2">
            {relacionados.map((r) => (
              <RevealItem as="li" key={r.slug}>
                <Link
                  href={`/recursos/${r.slug}`}
                  className="glass group flex h-full flex-col gap-4 rounded-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40 md:p-10"
                >
                  <span className="label text-fg/40">{r.minutes} min de lectura</span>
                  <h3 className="text-xl leading-snug text-balance tracking-tight text-fg">
                    {r.title}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-fg/55">
                    {r.description}
                  </p>
                  <span className="label mt-auto flex items-center gap-3 pt-4 text-fg/40 transition-colors group-hover:text-fg">
                    Leer <Arrow />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealList>
        </Section>
      ) : null}

      <CtaBand
        title="Si algo de esto le suena a su operación, hablemos."
        lede="Veinte minutos para contarnos qué está pasando. Si hay caso lo decimos, y si no lo hay también."
      />
    </>
  );
}
