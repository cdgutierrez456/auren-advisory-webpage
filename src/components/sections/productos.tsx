import Link from "@/components/link";
import { Mark } from "@/components/logo";
import { Arrow, Button, Headline, Section, SectionHead } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { Reveal } from "@/components/motion";

export async function Productos() {
  const [{ services }, t] = await Promise.all([getContent(), getT()]);
  return (
    <Section id="servicios" tone="paper">
      <SectionHead index="03" label={t("Arquitectura de servicios", "Service architecture")}>
        <Headline className="text-fg">
          {t("Un solo sistema. Ocho puertas de entrada.", "One system. Eight ways in.")}
        </Headline>
        <p className="mt-6 max-w-xl text-pretty leading-relaxed text-fg/55">
          {t(
            "Cada servicio resuelve una etapa distinta, pero todos pertenecen a la misma firma y comparten método, lenguaje y forma de medir.",
            "Each service solves a different stage, but they all belong to the same firm and share one method, one language and one way of measuring.",
          )}
        </p>
      </SectionHead>

      <Reveal className="glass grid divide-y divide-line overflow-hidden rounded-card">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/servicios/${s.slug}`}
            className="group grid gap-4 px-7 py-8 transition-colors duration-500 hover:bg-fg/5 md:grid-cols-[auto_15rem_1fr_auto] md:items-baseline md:gap-10 md:px-9"
          >
            <Mark
              size={22}
              className="shrink-0 opacity-40 transition-opacity duration-500 group-hover:opacity-100"
            />
            <h3 className="wordmark text-sm uppercase text-fg">{s.name}</h3>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-fg/55">
              {s.summary}
            </p>
            <span className="label flex items-center gap-3 whitespace-nowrap text-fg/40 transition-colors group-hover:text-fg">
              {s.kind}
              <Arrow className="-translate-x-1 opacity-0 transition-all duration-500 ease-out-quint group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </Link>
        ))}
      </Reveal>

      <div className="mt-12">
        <Button href="/servicios" variant="outline">
          {t("Ver todos los servicios", "See all services")} <Arrow />
        </Button>
      </div>
    </Section>
  );
}
