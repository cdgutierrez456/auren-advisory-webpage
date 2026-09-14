import { ContactForm } from "@/components/contact-form";
import { Mark } from "@/components/logo";
import { Card, SectionHead } from "@/components/ui";
import { Ambient } from "@/components/vertex-art";
import { contact, site } from "@/content/site";
import { Reveal } from "@/components/motion";

export function Contacto() {
  return (
    <section id="contacto" className="relative isolate overflow-hidden bg-surface-4 py-section text-fg">
      <Ambient />
      <Mark
        size={620}
        tone="invert"
        className="pointer-events-none absolute -bottom-40 -left-40 opacity-[0.04]"
      />
      <div className="shell relative grid gap-16 md:grid-cols-[1fr_1.15fr] md:gap-24">
        <Reveal className="flex flex-col gap-8">
          <SectionHead index="08" label="Contacto" invert />
          <h2 className="text-headline font-normal text-balance">{contact.title}</h2>
          <p className="text-pretty leading-relaxed text-fg/60">{contact.lede}</p>
          <div className="mt-2 flex flex-col items-start gap-4">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit border-b border-lime pb-1 text-lg text-fg transition-opacity hover:opacity-70"
            >
              {site.whatsappDisplay}
            </a>
            {site.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="w-fit border-b border-line pb-1 text-fg/75 transition-colors hover:border-lime hover:text-fg"
              >
                {email}
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="p-8 md:p-10">
            <ContactForm />
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
