"use client";

import { useEffect, useState } from "react";

/**
 * Interruptor de tema.
 *
 * Hasta que alguien lo toca, el tema lo decide el sistema operativo; a partir
 * de ahí manda la elección y se recuerda en localStorage. El atributo vive en
 * <html> porque el CSS lee `:root[data-theme]` — no hay contexto de React ni
 * provider: una línea de dataset hace el mismo trabajo.
 *
 * El primer render es siempre el mismo en servidor y cliente (oscuro); el
 * estado real se lee al montar. Sin eso, el HTML del servidor y el del
 * navegador no coincidirían.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [claro, setClaro] = useState(false);

  useEffect(() => {
    const elegido = document.documentElement.dataset.theme;
    setClaro(
      elegido === "light" ||
        (!elegido && window.matchMedia("(prefers-color-scheme: light)").matches),
    );
  }, []);

  function alternar() {
    const siguiente = claro ? "dark" : "light";
    document.documentElement.dataset.theme = siguiente;
    try {
      localStorage.setItem("tema", siguiente);
    } catch {
      // ponytail: modo privado sin storage. El tema funciona igual, solo no
      // sobrevive a la recarga. No vale un aviso en pantalla.
    }
    setClaro(!claro);
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={claro}
      aria-label={claro ? "Cambiar a tema oscuro" : "Cambiar a tema claro"}
      title={claro ? "Tema oscuro" : "Tema claro"}
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-pill border border-line text-fg/55 transition-all duration-300 hover:border-lime hover:text-fg active:scale-95 ${className}`}
    >
      {/* Círculo mitad lleno: contraste, que es de lo que trata el tema.
          Geometría, no iconografía. */}
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 1a7 7 0 0 0 0 14z" fill="currentColor" />
      </svg>
    </button>
  );
}
