import { Lamina } from "@/components/laminas";
import { HoverTile } from "@/components/tiles";
import { Arrow, Button, Headline, Section, SectionHead } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { RevealItem, RevealList } from "@/components/motion";

/**
 * Las cinco soluciones como tarjetas visuales: imagen, nombre y una línea.
 * Al pasar el mouse se abre lo que obtiene el cliente. El detalle completo
 * vive en /soluciones.
 */
export async function Soluciones() {
  const [{ solutions }, t] = await Promise.all([getContent(), getT()]);
  return (
    <Section id="soluciones" tone="paper">
      <SectionHead
        label={t("Soluciones", "Solutions")}
        aside={t("Pase el mouse sobre cada tarjeta", "Hover over each card")}
      >
        <Headline>
          {t(
            "Lo que su empresa necesita, no la tecnología que usamos.",
            "What your company needs, not the technology we use.",
          )}
        </Headline>
      </SectionHead>

      <RevealList as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((s, k) => (
          <RevealItem
            as="li"
            key={s.slug}
            // La primera ocupa dos columnas: es la puerta de entrada habitual.
            className={k === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
          >
            <HoverTile
              href={`/soluciones#${s.slug}`}
              index={String(k + 1).padStart(2, "0")}
              title={s.title}
              tagline={s.tagline}
              image={s.image}
              visual={<Lamina kind={s.glyph} />}
              cta={t("Ver solución", "See solution")}
              ratio={k === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[32rem]" : "aspect-[4/3]"}
            >
              <ul className="flex flex-col gap-1.5">
                {s.outcomes.map((o) => (
                  <li key={o} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-lime" />
                    {o}
                  </li>
                ))}
              </ul>
            </HoverTile>
          </RevealItem>
        ))}
      </RevealList>

      <div className="mt-10">
        <Button href="/soluciones" variant="solid">
          {t("Todas las soluciones", "All solutions")} <Arrow />
        </Button>
      </div>
    </Section>
  );
}
