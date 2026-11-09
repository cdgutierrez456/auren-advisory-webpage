import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/link";
import { ContactForm } from "@/components/contact-form";
import { Arrow, Breadcrumbs, Card, Cota, FaqList, Headline, PageHero, Section, SectionHead } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { faqPage, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata(
    t("Contacto", "Contact"),
    t(
      "Formulario, WhatsApp y correo directo de los socios de Auren Advisory. Respuesta en un día hábil. Manizales y todo Colombia.",
      "Form, WhatsApp and direct email to the partners of Auren Advisory. Reply within one business day. Manizales and all of Colombia.",
    ),
    "/contacto",
  );
}

/**
 * Contacto. Una sola página con las tres cosas que hacen falta: el
 * formulario (que abre WhatsApp con el mensaje listo, sin servidor), los
 * canales directos, y qué pasa después de escribir, que es lo que ningún
 * formulario cuenta.
 */
export default async function Contacto() {
  const [{ about, contact, homeFaqs, site }, t] = await Promise.all([getContent(), getT()]);
  return (
    <>
      {/* Las preguntas están visibles abajo; el JSON-LD solo se las declara
          al buscador. Nunca marcar aquí algo que no esté en la página. */}
      <JsonLd data={faqPage(homeFaqs)} />
      <Breadcrumbs trail={[{ name: t("Contacto", "Contact"), path: "/contacto" }]} />

      <PageHero
        eyebrow={t("Contacto", "Contact")}
        title={
          <>
            <span className="block">{contact.title}</span>
            <span className="mt-6 block max-w-3xl text-balance text-lg leading-snug tracking-tight text-fg/75 md:text-xl">
              {t(
                "Una primera conversación sobre su operación, con los socios de la firma.",
                "A first conversation about your operation, with the firm's partners.",
              )}
            </span>
          </>
        }
        lede={contact.lede}
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <Card className="p-7 md:p-10">
              <div className="mb-8 flex flex-col gap-2">
                <Cota className="text-fg/55">{t("Formulario", "Form")}</Cota>
                <p className="text-pretty text-sm leading-relaxed text-fg/65">
                  {t(
                    "El formulario arma el mensaje y abre WhatsApp. Nada se guarda en ningún servidor: el mensaje sale del teléfono o del computador de quien escribe.",
                    "The form drafts the message and opens WhatsApp. Nothing is stored on any server: the message leaves from the sender's own phone or computer.",
                  )}
                </p>
              </div>
              <ContactForm />
            </Card>
          </Reveal>

          <div className="flex flex-col gap-4">
            {contact.image ? (
              <Reveal className="relative aspect-[16/9] overflow-hidden rounded-card border border-line">
                <Image
                  src={contact.image.src}
                  alt={contact.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </Reveal>
            ) : null}
            <Reveal delay={0.06} className="card flex flex-col gap-6 rounded-card p-7 md:p-8">
              <Cota className="text-fg/55">{t("Directo", "Direct")}</Cota>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-t border-line py-4 text-fg transition-colors hover:text-accent"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-lg">{site.whatsappDisplay}</span>
                  <span className="cota text-fg/45">WhatsApp</span>
                </span>
                <Arrow className="shrink-0" />
              </a>
              <ul className="flex flex-col">
                {about.founders.map((f) => (
                  <li key={f.email} className="flex flex-col gap-1 border-t border-line py-4">
                    <span className="text-fg">{f.name}</span>
                    <span className="text-pretty text-xs leading-relaxed text-fg/55">{f.role}</span>
                    <a
                      href={`mailto:${f.email}`}
                      className="mt-1 w-fit break-all text-sm text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-current"
                    >
                      {f.email}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2 border-t border-line pt-5">
                {contact.promises.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-fg/75">
                    <span aria-hidden className="mt-2 h-0.5 w-3 shrink-0 bg-lime" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12} className="card flex flex-col gap-6 rounded-card p-7 md:p-8">
              <Cota className="text-fg/55">{t("Qué pasa después", "What happens next")}</Cota>
              <ol className="flex flex-col">
                {contact.steps.map((s, k) => (
                  <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line py-4">
                    <span className="cota mt-1 text-fg/45">{String(k + 1).padStart(2, "0")}</span>
                    <span className="flex flex-col gap-1.5">
                      <span className="text-fg">{s.title}</span>
                      <span className="text-pretty text-sm leading-relaxed text-fg/65">{s.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="border-t border-line pt-5 text-pretty text-sm leading-relaxed text-fg/65">
                {t("¿Prefiere una estimación antes de hablar con alguien? La", "Would you rather get an estimate before talking to anyone? The")}{" "}
                <Link href="/radiografia" className="text-fg underline underline-offset-4">
                  {t("Radiografía Auren", "Auren X-Ray")}
                </Link>{" "}
                {t("son doce preguntas, diez minutos y sin registro.", "is twelve questions, ten minutes, no sign-up.")}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Lo que nos preguntan antes de escribir. Viven aquí, no en la home,
          para que la portada muestre poco y esto se lea completo. */}
      <Section tone="ivory">
        <SectionHead index="01" label={t("Antes de escribir", "Before writing")}>
          <Headline>
            {t("Lo que nos preguntan antes de la primera reunión.", "What we get asked before the first meeting.")}
          </Headline>
        </SectionHead>
        <FaqList faqs={homeFaqs} />
      </Section>
    </>
  );
}
