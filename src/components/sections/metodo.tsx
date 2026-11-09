import Link from "next/link";
import { MethodStage } from "@/components/method-stage";
import { Arrow, Headline, Section, SectionHead } from "@/components/ui";
import { method, phases } from "@/content/site";

/**
 * Cómo trabajamos: el método en escena. Tres paneles en perspectiva; al pasar
 * el mouse se endereza el paso y despliega su texto. El mismo escenario vive
 * en /nosotros#metodo, con la firma alrededor.
 */
export function Metodo() {
  return (
    <Section id="metodo" tone="deep">
      <SectionHead label="Cómo trabajamos" aside="Pase el mouse sobre cada paso">
        <Headline>{method.title}</Headline>
      </SectionHead>

      <MethodStage phases={phases} />

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-md text-pretty text-sm leading-relaxed text-fg/60">
          Si al entender el problema resulta que no hace falta tecnología, se lo decimos.
        </p>
        <Link
          href="/nosotros"
          className="label flex items-center gap-3 text-fg/60 transition-colors hover:text-fg"
        >
          Quiénes somos <Arrow />
        </Link>
      </div>
    </Section>
  );
}
