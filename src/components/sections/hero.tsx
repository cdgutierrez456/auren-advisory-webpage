import { Mark } from "@/components/logo";
import { Arrow, Button } from "@/components/ui";
import { hero, site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory">
      {/* Capa de análisis: decorativa, se desvanece hacia el contenido */}
      <div
        aria-hidden
        className="grid-layer pointer-events-none absolute inset-0 text-deep [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
      />
      {/* El símbolo, sobredimensionado y recortado por el borde: perspectiva */}
      <Mark
        size={760}
        tone="lime-bg"
        className="pointer-events-none absolute -right-40 -top-32 opacity-[0.055] md:-right-24"
      />

      <div className="shell relative flex min-h-[88svh] flex-col justify-between gap-20 pb-16 pt-24 md:pt-32">
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-4">
            <span className="h-0.5 w-8 bg-lime" />
            <span className="label text-deep/60">{hero.eyebrow}</span>
          </div>

          <h1 className="text-display font-normal">
            {hero.title.map((word) => (
              <span key={word} className="block">
                {word}
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

        <dl className="grid gap-px border-t border-rule pt-px sm:grid-cols-3">
          {hero.meta.map((m) => (
            <div key={m.k} className="flex flex-col gap-2 py-7 pr-8">
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
