import Link from "@/components/link";
import { MethodStage } from "@/components/method-stage";
import { Arrow, Headline, Section, SectionHead } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";

/**
 * Cómo trabajamos: el método en escena. Tres paneles en perspectiva; al pasar
 * el mouse se endereza el paso y despliega su texto. El mismo escenario vive
 * en /nosotros#metodo, con la firma alrededor.
 */
export async function Metodo() {
  const [{ method, phases }, t] = await Promise.all([getContent(), getT()]);
  return (
    <Section id="metodo" tone="deep">
      <SectionHead
        label={t("Cómo trabajamos", "How we work")}
        aside={t("Pase el mouse sobre cada paso", "Hover over each step")}
      >
        <Headline>{method.title}</Headline>
      </SectionHead>

      <MethodStage phases={phases} />

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-md text-pretty text-sm leading-relaxed text-fg/60">
          {t(
            "Si al entender el problema resulta que no hace falta tecnología, el diagnóstico lo indicará.",
            "If understanding the problem shows that technology isn't needed, the diagnosis will say so.",
          )}
        </p>
        <Link
          href="/nosotros"
          className="label flex items-center gap-3 text-fg/60 transition-colors hover:text-fg"
        >
          {t("Quiénes somos", "Who we are")} <Arrow />
        </Link>
      </div>
    </Section>
  );
}
