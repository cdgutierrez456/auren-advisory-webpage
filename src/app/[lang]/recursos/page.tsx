import type { Metadata } from "next";
import Link from "@/components/link";
import { Arrow, Breadcrumbs, CtaBand, PageHero, Section } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata(
    t("Guías de automatización y transformación digital", "Automation and digital transformation guides"),
    t(
      "Guías prácticas sobre automatización de procesos, transformación digital y decisiones de tecnología para empresas medianas en Colombia.",
      "Practical guides on process automation, digital transformation and technology decisions for mid-sized companies in Colombia.",
    ),
    "/recursos",
  );
}

export default async function Recursos() {
  const [{ fechaLarga, postsByDate }, t] = await Promise.all([getContent(), getT()]);
  return (
    <>
      <Breadcrumbs trail={[{ name: t("Recursos", "Resources"), path: "/recursos" }]} />

      <PageHero
        eyebrow={t("Recursos", "Resources")}
        pad={false}
        title={
          <>
            <span className="block">
              {t("Criterio, antes de la cotización.", "Judgment, before the quote.")}
            </span>
            <span className="mt-7 block max-w-3xl text-balance text-xl leading-snug tracking-tight text-fg/75 md:text-2xl">
              {t(
                "Guías sobre automatización de procesos, transformación digital y decisiones de tecnología para empresas medianas.",
                "Guides on process automation, digital transformation and technology decisions for mid-sized companies.",
              )}
            </span>
          </>
        }
        lede={t(
          "Cada artículo responde completa una pregunta que nos hacen antes de contratar. No son resúmenes que terminan en «escríbanos para saber más»: si alguien resuelve su caso leyendo esto y no nos necesita, el artículo hizo su trabajo.",
          "Each article fully answers a question we get asked before being hired. They aren't summaries ending in “write to us to find out more”: if someone solves their case by reading this and doesn't need us, the article did its job.",
        )}
      />

      <Section tone="paper">
        <ul className="glass grid divide-y divide-line overflow-hidden rounded-card">
          {postsByDate.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/recursos/${post.slug}`}
                className="group grid gap-5 px-7 py-9 transition-colors duration-500 hover:bg-fg/5 md:grid-cols-[1fr_20rem] md:gap-16 md:px-10"
              >
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl leading-snug text-balance tracking-tight text-fg md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="max-w-2xl text-pretty leading-relaxed text-fg/55">
                    {post.lede}
                  </p>
                </div>
                <div className="flex flex-col gap-4 md:items-end md:text-right">
                  <span className="label text-fg/40">
                    {fechaLarga(post.published)} · {post.minutes} min
                  </span>
                  <span className="label flex items-center gap-3 text-fg transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                    {t("Leer", "Read")} <Arrow />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={t("¿Su caso no está en ninguno de estos artículos?", "Your case isn't covered in any of these articles?")}
        lede={t(
          "Escríbanos y lo conversamos. Una llamada de veinte minutos suele bastar para saber si hay algo que resolver y si somos nosotros quienes debemos resolverlo.",
          "Write to us and let's talk it through. A twenty-minute call is usually enough to know whether there's something to solve and whether we're the ones who should solve it.",
        )}
      />
    </>
  );
}
