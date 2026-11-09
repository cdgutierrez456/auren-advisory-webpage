"use client";

import Image from "next/image";
import { useState } from "react";
import type { Phase } from "@/content/site";

/**
 * El método como escenario en perspectiva: tres paneles —Ver, Entender,
 * Transformar— en una sola fila, inclinados como las hojas de un plano. Al
 * pasar el mouse (o tocar, en pantalla táctil) el panel se endereza, viene al
 * frente y despliega su texto con animación; los otros dos retroceden. Los
 * tres se quedan siempre en el mismo sitio: nada salta.
 *
 * Sin JavaScript el escenario se ve plano y con los textos visibles.
 */
export function MethodStage({ phases, className = "" }: { phases: readonly Phase[]; className?: string }) {
  const [active, setActive] = useState<number | null>(null);

  // Inclinación de reposo por posición: izquierda mira a la derecha, derecha
  // a la izquierda, centro ligeramente hundido.
  const rest = ["rotateY(14deg) translateZ(-40px)", "translateZ(-70px)", "rotateY(-14deg) translateZ(-40px)"];

  return (
    <div
      className={`[perspective:1600px] ${className}`}
      onMouseLeave={() => setActive(null)}
    >
      <ol className="grid gap-4 md:grid-cols-3 md:gap-5 [transform-style:preserve-3d]">
        {phases.map((phase, k) => {
          const on = active === k;
          const dim = active !== null && !on;
          return (
            <li
              key={phase.index}
              className="relative md:[transform-style:preserve-3d]"
              style={{
                transform: on
                  ? "rotateY(0deg) translateZ(60px) scale(1.03)"
                  : active !== null
                    ? `${rest[k]} scale(0.97)`
                    : rest[k],
                transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s",
                opacity: dim ? 0.72 : 1,
                zIndex: on ? 2 : 1,
              }}
            >
              <button
                type="button"
                aria-expanded={on}
                onMouseEnter={() => setActive(k)}
                onFocus={() => setActive(k)}
                onClick={() => setActive(on ? null : k)}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-card border border-line bg-deep text-left text-ivory outline-none focus-visible:ring-2 focus-visible:ring-lime md:aspect-[4/5]"
              >
                {/* Fondo: fotografía del paso o degradado Deep. */}
                {phase.image ? (
                  <Image
                    src={phase.image.src}
                    alt={phase.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
                    style={{ transform: on ? "scale(1.05)" : undefined }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-deep to-deep-900" />
                )}
                <div
                  aria-hidden
                  className="absolute inset-0 transition-colors duration-500"
                  style={{
                    background: on
                      ? "linear-gradient(to top, rgb(7 21 24 / 0.96) 0%, rgb(7 21 24 / 0.82) 55%, rgb(7 21 24 / 0.25) 100%)"
                      : "linear-gradient(to top, rgb(7 21 24 / 0.9) 0%, rgb(7 21 24 / 0.35) 50%, rgb(7 21 24 / 0.1) 100%)",
                  }}
                />

                {/* Índice y regla que se enciende al activar. */}
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                  <span className="cota text-lime">
                    {phase.index} / 0{phases.length}
                  </span>
                  <span
                    aria-hidden
                    className="h-0.5 bg-lime transition-all duration-700 ease-out-quint"
                    style={{ width: on ? "3rem" : "0.75rem" }}
                  />
                </div>

                {/* Título, claim y el texto que se despliega. */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-7">
                  <h3 className="text-4xl tracking-tight text-ivory md:text-5xl">{phase.title}</h3>
                  <p className="text-pretty text-base leading-snug text-ivory/90">{phase.claim}</p>
                  <div
                    className="grid transition-[grid-template-rows] duration-700 ease-out-quint"
                    style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="flex flex-col gap-4 pt-3 transition-all duration-500 ease-out-quint"
                        style={{
                          opacity: on ? 1 : 0,
                          transform: on ? "translateY(0)" : "translateY(10px)",
                          transitionDelay: on ? "150ms" : "0ms",
                        }}
                      >
                        <p className="text-pretty text-sm leading-relaxed text-ivory/75">{phase.detail}</p>
                        <p className="text-pretty text-sm leading-relaxed text-ivory/90">
                          <span className="cota mr-2 text-lime">Termina con</span>
                          {phase.output}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
      {/* Sin JavaScript: los tres textos visibles de entrada. */}
      <noscript>
        <style>{`[aria-expanded] [style*="grid-template-rows: 0fr"]{grid-template-rows:1fr!important}`}</style>
      </noscript>
    </div>
  );
}
