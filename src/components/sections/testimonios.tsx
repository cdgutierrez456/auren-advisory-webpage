import Link from "@/components/link";
import { Arrow, Headline, Section, SectionHead } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { RevealItem, RevealList } from "@/components/motion";

/**
 * Testimonios. Solo se muestran los reales (sin `borrador`): un «texto de
 * ejemplo» en la portada resta más confianza de la que suma. Mientras no haya
 * ninguno, la sección no se renderiza; el día que exista uno con nombre y
 * cargo, aparece sola. `npm test` impide publicar uno sin atribución.
 */
export async function Testimonios() {
  const [{ serviceBySlug, testimonials }, tr] = await Promise.all([getContent(), getT()]);
  const reales = testimonials.filter((t) => !t.borrador);
  if (reales.length === 0) return null;

  return (
    <Section id="testimonios" tone="paper">
      <SectionHead index="07" label={tr("Lo que dicen", "What they say")}>
        <Headline>
          {tr("La conversación que no esperaban tener.", "The conversation they didn't expect to have.")}
        </Headline>
      </SectionHead>

      <RevealList as="ul" className="grid gap-4 md:grid-cols-3">
        {reales.map((t) => {
          const service = t.service ? serviceBySlug(t.service) : undefined;
          return (
            <RevealItem as="li" key={t.quote} className="card flex flex-col gap-7 rounded-card p-8 md:p-10">
              <blockquote className="font-serif text-2xl leading-snug text-balance text-fg md:text-3xl">
                {t.quote}
              </blockquote>
              <div className="mt-auto flex flex-col gap-3 border-t border-line pt-6">
                <span className="text-sm text-fg/75">
                  {t.name ? `${t.name} · ` : ""}
                  {t.role}
                </span>
                {service ? (
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="cota inline-flex w-fit items-center gap-2.5 text-fg/55 transition-colors hover:text-fg"
                  >
                    {service.name}
                    <Arrow />
                  </Link>
                ) : null}
              </div>
            </RevealItem>
          );
        })}
      </RevealList>
    </Section>
  );
}
