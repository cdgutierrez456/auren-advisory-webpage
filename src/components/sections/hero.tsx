import type { CSSProperties } from "react";
import { Arrow, Button, Em } from "@/components/ui";
import { ContourField } from "@/components/vertex-art";
import { hero, site } from "@/content/site";

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

      {/* Chips de prueba flotando sobre el telón. Solo en pantallas amplias. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[4vw] top-[38%] z-10 hidden w-72 flex-col gap-4 lg:flex"
      >
        {proof.map((p, i) => (
          <div
            key={p.phase}
            style={{ animationDelay: `${i * -4}s`, marginLeft: `${i * 2.2}rem` }}
            className="drift flex flex-col gap-1.5 border border-rule bg-paper/90 px-5 py-4 shadow-xl shadow-ink/5 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 bg-lime" />
              <span className="label text-deep/45">{p.phase}</span>
            </span>
            <span className="text-sm text-deep/85">{p.claim}</span>
          </div>
        ))}
      </div>

      <div className="shell relative flex min-h-[92svh] flex-col justify-between gap-14 pb-14 pt-28 md:pt-36">
        <div className="flex flex-col gap-10">
          <div className="reveal flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="draw-rule h-px w-10 bg-deep" />
              <span className="label text-deep/60">{hero.eyebrow}</span>
            </div>
            <span className="label hidden text-deep/40 sm:block">Manizales · Colombia</span>
          </div>

          <div className="flex flex-col gap-9">
            <h1 className="reveal text-mega font-normal text-deep">
              <span className="block">Ver.</span>
              <span className="block">Entender.</span>
              <span className="block">
                <Em>Transformar.</Em>
              </span>
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

            <div className="reveal flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
              {trust.map((t) => (
                <span key={t} className="flex items-center gap-2.5">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-lime" />
                  <span className="text-xs text-deep/55">{t}</span>
                </span>
              ))}
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
