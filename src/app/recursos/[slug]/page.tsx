import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/logo";
import { Arrow, Breadcrumbs, CtaBand, Section } from "@/components/ui";
import { fechaLarga, postBySlug, posts } from "@/content/recursos";
import { serviceBySlug, site } from "@/content/site";
import { articleSchema, faqPage, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion";

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

/**
 * Un artículo se lee como la página de un documento: una hoja centrada sobre
 * el fondo, con membrete, portada con la fotografía, cuerpo a ancho de
 * lectura, secciones numeradas y un cierre con las preguntas y los servicios
 * relacionados. Lo demás de la pantalla queda en silencio.
 */
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

      <Section tone="ink" className="!pt-28 md:!pt-32">
        <Reveal as="article" className="card mx-auto max-w-4xl overflow-hidden rounded-card shadow-float">
          {/* Membrete */}
          <header className="flex items-center justify-between gap-6 border-b border-line px-8 py-5 md:px-14">
            <Logo size={26} tone="tema" />
            <span className="label text-fg/45">
              Recursos · {fechaLarga(post.published)}
            </span>
          </header>

          {/* Portada */}
          {post.image ? (
            <div className="relative aspect-[16/7] border-b border-line">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="px-8 py-12 md:px-14 md:py-16">
            <div className="mx-auto flex max-w-2xl flex-col gap-6">
              <span className="label text-fg/50">Guía · {post.minutes} min de lectura</span>
              <h1 className="text-headline text-balance text-fg">{post.title}</h1>
              <p className="text-pretty text-lg leading-relaxed text-fg/80">{post.lede}</p>
            </div>

            {/* Cuerpo */}
            <div className="mx-auto mt-14 flex max-w-2xl flex-col gap-12">
              {post.sections.map((section) => (
                <section key={section.heading} className="flex flex-col gap-4">
                  <h2 className="border-t border-line pt-6 text-balance text-2xl leading-snug tracking-tight text-fg">
                    {section.heading}
                  </h2>
                  {section.body.map((p) => (
                    <p key={p} className="text-pretty leading-relaxed text-fg/80">
                      {p}
                    </p>
                  ))}
                  {section.list ? (
                    <ul className="mt-2 flex flex-col gap-2.5 rounded-lg bg-surface-3 px-6 py-5">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-3 text-pretty text-sm leading-relaxed text-fg/80">
                          <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-fg/40" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              {/* Preguntas, dentro del documento */}
              <section className="flex flex-col gap-6 border-t border-line pt-8">
                <span className="label text-fg/50">Preguntas frecuentes</span>
                <dl className="flex flex-col gap-6">
                  {post.faqs.map((f) => (
                    <div key={f.q} className="flex flex-col gap-2">
                      <dt className="text-lg leading-snug text-balance text-fg">{f.q}</dt>
                      <dd className="text-pretty text-sm leading-relaxed text-fg/75">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>

          {/* Pie del documento: con qué se trabaja y qué más leer */}
          <footer className="grid gap-8 border-t border-line bg-surface-3 px-8 py-8 md:grid-cols-2 md:px-14">
            <div className="flex flex-col gap-3">
              <span className="label text-fg/50">Servicios relacionados</span>
              <ul className="flex flex-wrap gap-2">
                {servicios.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/servicios/${s.slug}`}
                      className="inline-flex items-center gap-2 rounded-pill border border-line-strong px-4 py-2 text-xs text-fg/80 transition-colors hover:border-fg hover:text-fg"
                    >
                      {s.keyword} <Arrow />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {relacionados.length ? (
              <div className="flex flex-col gap-3">
                <span className="label text-fg/50">Seguir leyendo</span>
                <ul className="flex flex-col gap-2">
                  {relacionados.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/recursos/${r.slug}`}
                        className="group flex items-baseline justify-between gap-4 text-sm text-fg transition-colors hover:text-accent"
                      >
                        {r.title}
                        <Arrow className="shrink-0 text-fg/40 group-hover:text-accent" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <p className="text-xs text-fg/45 md:col-span-2">
              {site.name} · {site.city}, Colombia · {post.updated ? `Actualizado el ${fechaLarga(post.updated)}` : `Publicado el ${fechaLarga(post.published)}`}
            </p>
          </footer>
        </Reveal>
      </Section>

      <CtaBand
        title="Si algo de esto describe la operación, el siguiente paso es una conversación."
        lede="Veinte minutos para entender qué está pasando. Si hay caso se define por dónde empezar, y si no lo hay también se dice."
      />
    </>
  );
}
