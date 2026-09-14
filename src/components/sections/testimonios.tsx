import Link from "next/link";
import { Arrow, Em, Headline, Section, SectionHead } from "@/components/ui";
import { serviceBySlug, testimonials } from "@/content/site";
import { RevealItem, RevealList } from "@/components/motion";

/**
 * Testimonios. Los marcados como `borrador` son texto de ejemplo y lo dicen en
 * pantalla: sin el distintivo serían citas falsas atribuidas a alguien real.
 * Ver `testimonials` en `site.ts` para reemplazarlos.
 */
export function Testimonios() {
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonios" tone="paper">
      <SectionHead index="05" label="Lo que dicen">
        <Headline className="text-fg">
          La conversación que <Em className="text-accent">no</Em> esperaban tener.
        </Headline>
      </SectionHead>

      <RevealList as="ul" className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => {
          const service = t.service ? serviceBySlug(t.service) : undefined;
          return (
            <RevealItem
              as="li"
              key={t.quote}
              className="glass flex flex-col gap-7 rounded-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40 md:p-10"
            >
              {t.borrador ? (
                <span className="label w-fit rounded-pill border border-line-strong px-3 py-1.5 text-fg/40">
                  Texto de ejemplo
                </span>
              ) : null}

              <blockquote className="font-serif text-2xl leading-snug text-balance text-fg md:text-[1.75rem]">
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
                    className="label group inline-flex w-fit items-center gap-2.5 text-fg/55 transition-colors hover:text-accent"
                  >
                    {service.name}
                    <Arrow className="transition-transform duration-500 ease-out-quint group-hover:translate-x-0.5" />
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
