"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, type ReactNode, useState } from "react";
import type { Figure } from "@/content/site";
import { Arrow } from "@/components/ui";

/**
 * Tarjeta interactiva: imagen (o lámina dibujada) con el nombre y una línea
 * corta; al pasar el mouse —o al tocar, en pantalla táctil— sube un panel
 * con la explicación y el enlace. Es la pieza que reemplaza los párrafos:
 * la portada muestra poco y abre lo demás bajo demanda.
 *
 * Accesible: el panel también aparece con el foco de teclado
 * (`focus-within`) y el enlace es un <Link> real. En táctil, el primer toque
 * abre; el segundo navega.
 */
export function HoverTile({
  href,
  index,
  title,
  tagline,
  image,
  visual,
  children,
  cta = "Ver más",
  ratio = "aspect-[4/3]",
  className = "",
}: {
  href: string;
  index?: string;
  title: string;
  tagline: string;
  /** Fotografía. Tiene prioridad sobre `visual`. */
  image?: Figure;
  /** Lámina dibujada cuando no hay foto. */
  visual?: ReactNode;
  /** El contenido del panel que se abre. */
  children: ReactNode;
  cta?: string;
  ratio?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    // En táctil no hay hover: el primer toque abre el panel, el segundo navega.
    if (!open && typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      setOpen(true);
    }
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      onBlur={() => setOpen(false)}
      data-open={open || undefined}
      className={`group relative isolate block overflow-hidden rounded-card border border-line bg-surface-4 text-ivory outline-none ${ratio} ${className}`}
    >
      {/* Capa visual: foto o lámina. Se acerca un 4 % al pasar el mouse. */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out-quint group-hover:scale-[1.04] group-data-[open]:scale-[1.04]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          visual
        )}
      </div>
      {/* Velo para que el texto se lea sobre cualquier imagen. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-deep-900/90 via-deep-900/35 to-deep-900/10 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Nombre y línea corta: lo único visible en reposo. */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 transition-all duration-500 ease-out-quint group-hover:-translate-y-2 group-hover:opacity-0 group-focus-within:opacity-0 group-data-[open]:opacity-0 md:p-7">
        {index ? <span className="cota text-lime">{index}</span> : null}
        <h3 className="text-2xl leading-tight tracking-tight text-balance text-ivory">{title}</h3>
        <p className="text-sm text-ivory/75">{tagline}</p>
      </div>

      {/* Panel que sube con la explicación. */}
      <div className="absolute inset-x-0 bottom-0 flex translate-y-full flex-col gap-4 bg-deep p-6 transition-transform duration-500 ease-out-quint group-hover:translate-y-0 group-focus-within:translate-y-0 group-data-[open]:translate-y-0 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg leading-tight tracking-tight text-ivory">{title}</h3>
          {index ? <span className="cota text-lime">{index}</span> : null}
        </div>
        <div className="text-sm leading-relaxed text-ivory/80">{children}</div>
        <span className="cota flex items-center gap-2.5 text-lime">
          {cta} <Arrow />
        </span>
      </div>
    </Link>
  );
}

/**
 * Tarjeta de texto que se abre: para las dimensiones y las fases, donde no
 * hay foto. Mismo gesto (hover / toque / foco), sobre superficie clara.
 */
export function RevealCard({
  index,
  title,
  tagline,
  children,
  href,
  className = "",
}: {
  index: string;
  title: string;
  tagline: string;
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const body = (
    <>
      <div className="flex items-center justify-between gap-4">
        <span className="cota text-fg/55">{index}</span>
        <span
          aria-hidden
          className="flex size-7 items-center justify-center rounded-pill border border-line text-fg/50 transition-all duration-500 group-hover:rotate-45 group-hover:border-fg group-hover:text-fg group-data-[open]:rotate-45"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
      </div>
      <h3 className="text-subhead text-fg">{title}</h3>
      <p className="text-sm text-fg/60">{tagline}</p>
      {/* La explicación ocupa altura solo al abrirse: la rejilla no salta. */}
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out-quint group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] group-data-[open]:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="pt-4 text-pretty text-sm leading-relaxed text-fg/75 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100 group-focus-within:opacity-100 group-data-[open]:opacity-100">
            {children}
          </div>
        </div>
      </div>
    </>
  );
  const classes = `group flex h-full flex-col gap-4 bg-surface-2 p-7 text-left outline-none transition-colors duration-500 hover:bg-surface-3 md:p-8 ${className}`;

  return href ? (
    <Link href={href} className={classes} data-open={open || undefined} onBlur={() => setOpen(false)}>
      {body}
    </Link>
  ) : (
    <button
      type="button"
      className={classes}
      data-open={open || undefined}
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      onBlur={() => setOpen(false)}
    >
      {body}
    </button>
  );
}
