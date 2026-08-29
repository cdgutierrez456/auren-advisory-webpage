import { FaqList, Headline, Section, SectionHead } from "@/components/ui";
import { homeFaqs } from "@/content/site";

/**
 * Preguntas frecuentes de la home. Son las que un gerente escribe en Google
 * antes de escribirle a nadie; se responden completas aquí y alimentan el
 * JSON-LD de FAQPage que declara `app/page.tsx`.
 */
export function Preguntas() {
  return (
    <Section id="preguntas" tone="ivory">
      <SectionHead index="06" label="Preguntas frecuentes">
        <Headline className="text-deep">Lo que nos preguntan antes de la primera reunión.</Headline>
      </SectionHead>
      <FaqList faqs={homeFaqs} />
    </Section>
  );
}
