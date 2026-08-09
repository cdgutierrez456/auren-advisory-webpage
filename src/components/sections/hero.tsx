import { Mark } from "@/components/logo";
import { Arrow, Button } from "@/components/ui";
import { hero, site } from "@/content/site";

/**
 * Apertura. El posicionamiento se lee en una línea, el lema ocupa la escala
 * mayor de la página y la acción vive arriba, a la vista. El símbolo El Vértice
 * entra sobredimensionado y recortado: perspectiva, no decoración.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory">
      <div
        aria-hidden
        className="grid-layer pointer-events-none absolute inset-0 text-deep [mask-image:linear-gradient(to_bottom,black,transparent_72%)]"
      />
      <Mark
        size={820}
        tone="lime-bg"
        className="pointer-events-none absolute -right-48 -top-40 opacity-[0.06] md:-right-28"
      />

      <div className="shell relative flex min-h-[92svh] flex-col justify-between gap-16 pb-14 pt-28 md:pt-36">
        <div className="flex flex-col gap-11">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-deep" />
              <span className="label text-deep/60">{hero.eyebrow}</span>
            </div>
            <span className="label hidden text-deep/40 sm:block">Manizales · Colombia</span>
          </div>

          <div className="flex flex-col gap-9">
            <h1 className="text-mega font-normal text-deep">
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
              <p className="text-lede max-w-2xl text-pretty text-deep/75">{hero.lede}</p>
              <div className="flex flex-wrap gap-3">
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

        <dl className="grid border-t border-rule sm:grid-cols-3">
          {hero.meta.map((m, i) => (
            <div
              key={m.k}
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
