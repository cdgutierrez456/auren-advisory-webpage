import { ContactForm } from "@/components/contact-form";
import { Card, SectionHead } from "@/components/ui";
import { Ambient, ContourField } from "@/components/vertex-art";
import { contact, site } from "@/content/site";

export function Contacto() {
  return (
    <section id="contacto" className="relative isolate overflow-hidden bg-ink py-section text-ivory">
      <Ambient />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[30%] -left-[20%] h-[150%] w-[70%] text-lime/20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      >
        <div className="drift h-full w-full">
          <ContourField className="h-full w-full" />
        </div>
      </div>
      <div className="shell relative grid gap-16 md:grid-cols-[1fr_1.15fr] md:gap-24">
        <div className="flex flex-col gap-8">
          <SectionHead index="05" label="Contacto" invert />
          <h2 className="text-headline font-normal text-balance">{contact.title}</h2>
          <p className="text-pretty leading-relaxed text-muted-invert">{contact.lede}</p>
          <div className="mt-2 flex flex-col items-start gap-4">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit border-b border-lime pb-1 text-lg text-ivory transition-opacity hover:opacity-70"
            >
              {site.whatsappDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="w-fit border-b border-rule-invert pb-1 text-ivory/70 transition-colors hover:border-lime hover:text-ivory"
            >
              {site.email}
            </a>
          </div>
        </div>
        <Card className="reveal p-8 md:p-10">
          <ContactForm />
        </Card>
      </div>
    </section>
  );
}
