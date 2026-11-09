import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "@/components/link";
import { TransformDiagram } from "@/components/diagrams";
import { Arrow, Button, Cota, Em } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * Hero. Poco texto: titular, una línea que dice qué es Auren, dos botones.
 * A la derecha, la fotografía (si existe) con el diagrama de transformación
 * encima como lámina; sin foto, el diagrama solo. Entrada en CSS (`.enter`):
 * lo que está sobre el pliegue no depende de que cargue un bundle.
 */
export async function Hero() {
  const [{ hero, phases, site }, t] = await Promise.all([getContent(), getT()]);
  // La palabra que va en serif: «ver» es la filosofía de la firma.
  const ver = t("ver", "see");
  const [antes, despues] = hero.title.includes(` ${ver} `)
    ? hero.title.split(` ${ver} `)
    : [hero.title, ""];

  return (
    <section className="inverse relative isolate overflow-hidden">
      <div
        aria-hidden
        className="paper-grid pointer-events-none absolute inset-0 text-fg [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]"
      />

      <div className="shell relative grid gap-10 pb-14 pt-12 md:min-h-[calc(100svh-5rem)] md:grid-cols-[1fr_1.05fr] md:items-center md:gap-12 md:pb-16 md:pt-12 lg:gap-16">
        <div className="flex flex-col gap-7">
          <div style={i(0)} className="enter">
            <Cota className="text-accent">{hero.eyebrow}</Cota>
          </div>

          <h1 className="font-normal">
            <span style={i(1)} className="enter text-display block max-w-2xl text-balance text-fg">
              {despues ? (
                <>
                  {antes} <Em>{ver}</Em> {despues}
                </>
              ) : (
                antes
              )}
            </span>
            <span
              style={i(2)}
              className="enter mt-5 block max-w-xl text-balance text-lg leading-snug text-fg/75 md:text-xl"
            >
              {hero.titleSub}
            </span>
          </h1>

          <div style={i(3)} className="enter flex flex-wrap items-center gap-3 pt-2">
            <Button href={hero.primary.href} variant="lime" size="lg">
              {hero.primary.label} <Arrow />
            </Button>
            <Button href={hero.secondary.href} variant="outline" size="lg">
              {hero.secondary.label}
            </Button>
          </div>

          <Link
            style={i(4)}
            href={hero.tertiary.href}
            className="enter w-fit text-sm text-fg/60 underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
          >
            {hero.tertiary.label}
          </Link>
        </div>

        {/* Lámina del hero: la fotografía con las tres fases encima. */}
        <div style={i(2)} className="enter relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line bg-surface-2 md:aspect-[5/4]">
            {hero.image ? (
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center p-6 md:p-10">
                <TransformDiagram className="w-full text-fg/85" />
              </div>
            )}
            {hero.image ? (
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-deep-900/85 via-deep-900/10 to-transparent"
              />
            ) : null}
            {/* Las tres fases, como cotas sobre la imagen. */}
            <ol className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-px border-t border-line bg-line">
              {phases.map((p, k) => (
                <li
                  key={p.index}
                  style={i(5 + k)}
                  className="enter flex flex-col gap-1.5 bg-deep-900/70 px-4 py-4 backdrop-blur-sm md:px-5"
                >
                  <span className="cota text-lime">{p.index}</span>
                  <span className="text-base tracking-tight text-ivory md:text-lg">{p.title}</span>
                  <span className="hidden text-xs leading-snug text-ivory/65 md:block">{p.claim}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
