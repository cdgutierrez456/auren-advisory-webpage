import type { CSSProperties } from "react";
import { Arrow, Button, Em } from "@/components/ui";
import { Ambient, ContourField } from "@/components/vertex-art";
import { hero, site } from "@/content/site";
import { DrawRule, ParallaxY } from "@/components/motion";

/** Chips de prueba: las tres fases del método, no cifras inventadas. */
const proof = [
  { phase: "Fase 01 — Ver", claim: "Operación mapeada" },
  { phase: "Fase 02 — Entender", claim: "Costo de la fricción, en cifras" },
  { phase: "Fase 03 — Transformar", claim: "Impacto medido" },
];

const trust = [
  "Sin comisiones de proveedores",
  "Diagnóstico sin compromiso",
  "Manizales · Colombia",
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-surface">
      <Ambient />
      {/* Telón: ecos del símbolo, a ritmo más lento que el contenido. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <ParallaxY className="absolute inset-0">
          <div className="drift absolute -top-[20%] right-[-14%] h-[135%] w-[72%] text-accent/20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
            <ContourField className="h-full w-full" />
          </div>
        </ParallaxY>
      </div>

      {/* Chips de prueba flotando sobre el telón. Solo en pantallas amplias. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[4vw] top-[34%] z-10 hidden w-72 flex-col gap-4 lg:flex"
      >
        {proof.map((p, i) => (
          <div
            key={p.phase}
            style={{ animationDelay: `${i * -4}s`, marginLeft: `${i * 2.2}rem` }}
            className="glass drift shadow-float flex flex-col gap-1.5 rounded-card px-5 py-4"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime shadow-[0_0_12px_var(--color-lime)]" />
              <span className="label text-fg/55">{p.phase}</span>
            </span>
            <span className="text-sm text-fg/90">{p.claim}</span>
          </div>
        ))}
      </div>

      <div className="shell relative flex min-h-[92svh] flex-col justify-between gap-14 pb-14 pt-28 md:pt-36">
        <div className="flex flex-col gap-10">
          <div className="enter flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <DrawRule className="h-px w-10 bg-lime" />
              <span className="label text-fg/55">{hero.eyebrow}</span>
            </div>
            <span className="label hidden text-fg/40 sm:block">Manizales · Colombia</span>
          </div>

          <div className="flex flex-col gap-9">
            {/* El eslogan manda visualmente, pero el H1 incluye la línea que dice
                a qué se dedica la firma: sin ella, ni el buscador ni quien llega
                de un enlace saben qué se vende. */}
            <h1 className="font-normal">
              <span className="text-mega block text-fg">
                {hero.title.map((word, i) => (
                  // Las tres palabras entran escalonadas: el eslogan se lee en
                  // el orden en que se dice.
                  <span key={word} style={{ "--i": i + 1 } as CSSProperties} className="enter block">
                    {/* La última palabra en serif lima: la firma tipográfica. */}
                    {i === hero.title.length - 1 ? (
                      <Em className="text-accent">{word}</Em>
                    ) : (
                      word
                    )}
                  </span>
                ))}
              </span>
              <span
                style={{ "--i": 4 } as CSSProperties}
                className="enter mt-8 block max-w-3xl text-balance text-xl leading-snug tracking-tight text-fg/75 md:text-2xl"
              >
                {hero.titleSub}
              </span>
            </h1>

            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
              <p
                style={{ "--i": 5 } as CSSProperties}
                className="enter text-lede max-w-2xl text-pretty text-fg/75"
              >
                {hero.lede}
              </p>
              <div style={{ "--i": 6 } as CSSProperties} className="enter flex flex-wrap gap-3">
                <Button href={hero.primary.href}>
                  {hero.primary.label} <Arrow />
                </Button>
                <Button href={hero.secondary.href} variant="outline">
                  {hero.secondary.label}
                </Button>
              </div>
            </div>

            <div
              style={{ "--i": 7 } as CSSProperties}
              className="enter flex flex-wrap items-center gap-x-6 gap-y-2 pt-2"
            >
              {trust.map((t) => (
                <span key={t} className="flex items-center gap-2.5">
                  <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-lime" />
                  <span className="text-xs text-fg/55">{t}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <dl className="grid gap-3 sm:grid-cols-3">
          {hero.meta.map((m, i) => (
            <div
              key={m.k}
              style={{ "--i": i + 8 } as CSSProperties}
              className="enter glass flex flex-col gap-2.5 rounded-card px-6 py-6 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40"
            >
              <dt className="label text-accent/80">{m.k}</dt>
              <dd className="text-sm text-fg/90">{m.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
