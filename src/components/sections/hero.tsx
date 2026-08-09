import type { CSSProperties } from "react";
import { Arrow, Button } from "@/components/ui";
import { ContourField } from "@/components/vertex-art";
import { hero, site } from "@/content/site";

/**
 * Apertura. El posicionamiento se lee en una línea, el lema ocupa la escala
 * mayor de la página y la acción vive arriba, a la vista. El telón es un eco
 * topográfico del símbolo El Vértice: deriva despacio (drift) y se rezaga al
 * hacer scroll (parallax). Sin fotos, sin decoración de IA.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory">
      <div
        aria-hidden
        className="grid-layer pointer-events-none absolute inset-0 text-deep [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="parallax absolute inset-0">
          <div className="drift absolute -top-[22%] right-[-16%] h-[135%] w-[78%] text-deep/70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
            <ContourField className="h-full w-full" />
          </div>
        </div>
      </div>

      <div className="shell relative flex min-h-[92svh] flex-col justify-between gap-16 pb-14 pt-28 md:pt-36">
        <div className="flex flex-col gap-11">
          <div className="reveal flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="draw-rule h-px w-10 bg-deep" />
              <span className="label text-deep/60">{hero.eyebrow}</span>
            </div>
            <span className="label hidden text-deep/40 sm:block">Manizales · Colombia</span>
          </div>

          <div className="flex flex-col gap-9">
            <h1 className="reveal text-mega font-normal text-deep">
              {hero.title.map((word, i) => (
                <span key={word} className="flex items-center gap-6">
                  <span className="block">{word}</span>
                  {i === hero.title.length - 1 ? (
                    <span aria-hidden className="hidden h-3 w-3 shrink-0 bg-deep sm:block" />
                  ) : null}
                </span>
              ))}
            </h1>

            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
              <p className="reveal text-lede max-w-2xl text-pretty text-deep/75">{hero.lede}</p>
              <div className="reveal flex flex-wrap gap-3">
                <Button href={hero.primary.href}>
                  {hero.primary.label} <Arrow />
                </Button>
                <Button href={hero.secondary.href} variant="outline">
                  {hero.secondary.label}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <dl className="reveal-stagger grid border-t border-rule sm:grid-cols-3">
          {hero.meta.map((m, i) => (
            <div
              key={m.k}
              style={{ "--i": i } as CSSProperties}
              className={`flex flex-col gap-2.5 py-7 pr-8 ${
                i > 0 ? "border-rule sm:border-l sm:pl-8" : ""
              }`}
            >
              <dt className="label text-deep/45">{m.k}</dt>
              <dd className="text-sm text-deep/80">{m.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
