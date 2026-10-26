import { FaqList, Headline, Section, SectionHead } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";

/**
 * Preguntas frecuentes de la home. Son las que un gerente escribe en Google
 * antes de escribirle a nadie; se responden completas aquí y alimentan el
 * JSON-LD de FAQPage que declara `app/page.tsx`.
 */
export async function Preguntas() {
  const [{ homeFaqs }, t] = await Promise.all([getContent(), getT()]);
  return (
    <Section id="preguntas" tone="ivory">
      <SectionHead index="07" label={t("Preguntas frecuentes", "Frequently asked questions")}>
        <Headline className="text-fg">
          {t(
            "Lo que nos preguntan antes de la primera reunión.",
            "What people ask us before the first meeting.",
          )}
        </Headline>
      </SectionHead>
      <FaqList faqs={homeFaqs} />
    </Section>
  );
}
