import { ContactForm } from "@/components/contact-form";
import { Mark } from "@/components/logo";
import { SectionHead } from "@/components/ui";
import { contact, site } from "@/content/site";

export function Contacto() {
  return (
    <section id="contacto" className="relative isolate overflow-hidden bg-ink py-section text-ivory">
      <Mark
        size={620}
        tone="invert"
        className="pointer-events-none absolute -bottom-40 -left-40 opacity-[0.04]"
      />
      <div className="shell relative grid gap-16 md:grid-cols-[1fr_1.15fr] md:gap-24">
        <div className="flex flex-col gap-8">
          <SectionHead index="05" label="Contacto" invert />
          <h2 className="text-headline font-normal text-balance">{contact.title}</h2>
          <p className="text-pretty leading-relaxed text-muted-invert">{contact.lede}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 w-fit border-b border-lime pb-1 text-lg text-ivory transition-opacity hover:opacity-70"
          >
            {site.email}
          </a>
        </div>
        <div className="md:pt-4">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
