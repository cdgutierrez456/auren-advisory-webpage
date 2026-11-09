import type { CSSProperties } from "react";
import Link from "next/link";
import { TransformDiagram } from "@/components/diagrams";
import { Arrow, Button, Cota, Em } from "@/components/ui";
import { hero, site } from "@/content/site";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * Hero. Superficie `inverse` (Auren Deep en los dos temas): es la declaración
 * de la firma. Entrada en CSS (`.enter`) a propósito: lo que está sobre el
 * pliegue no depende de que cargue un bundle para leerse.
 *
 * La palabra «ver» del titular va en serif: es el eco del método y la única
 * licencia tipográfica de la pantalla.
 */
export function Hero() {
  const [antes, despues] = hero.title.includes(" ver ")
    ? hero.title.split(" ver ")
    : [hero.title, ""];

  return (
    <section className="inverse relative isolate overflow-hidden">
      <div
        aria-hidden
        className="paper-grid pointer-events-none absolute inset-0 text-fg [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]"
      />

      <div className="shell relative grid gap-12 pb-16 pt-14 md:min-h-[calc(100svh-5rem)] md:grid-cols-[1.15fr_1fr] md:items-center md:gap-12 md:pb-20 md:pt-16 lg:gap-16">
        <div className="flex flex-col gap-8">
          <div style={i(0)} className="enter">
            <Cota className="text-accent">{hero.eyebrow}</Cota>
          </div>

          {/* El H1 lleva el titular y la línea que dice a qué se dedica la
              firma: sin la segunda, ni el buscador ni quien llega de un
              enlace saben qué se vende. */}
          <h1 className="font-normal">
            <span style={i(1)} className="enter text-display block max-w-4xl text-balance text-fg">
              {despues ? (
                <>
                  {antes} <Em>ver</Em> {despues}
                </>
              ) : (
                antes
              )}
            </span>
            <span
              style={i(2)}
              className="enter mt-6 block max-w-2xl text-balance text-lg leading-snug tracking-tight text-fg/75 md:text-xl"
            >
              {hero.titleSub}
            </span>
          </h1>

          <p style={i(3)} className="enter text-lede max-w-xl text-pretty text-fg/75">
            {hero.lede}
          </p>

          <div style={i(4)} className="enter flex flex-wrap items-center gap-3">
            <Button href={hero.primary.href} variant="lime" size="lg">
              {hero.primary.label} <Arrow />
            </Button>
            <Button href={hero.secondary.href} variant="outline" size="lg">
              {hero.secondary.label}
            </Button>
          </div>

          <Link
            style={i(5)}
            href={hero.tertiary.href}
            className="enter w-fit text-sm text-fg/60 underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
          >
            {hero.tertiary.label}
          </Link>
        </div>

        {/* El diagrama de transformación: la operación como es, el vértice,
            el flujo rediseñado. Se dibuja solo al cargar. */}
        <div style={i(3)} className="enter relative">
          <TransformDiagram className="w-full text-fg/85" />
        </div>
      </div>

      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
