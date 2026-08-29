import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Faq, Figure as FigureType } from "@/content/site";
import { breadcrumb, JsonLd } from "@/lib/schema";

/**
 * Primitivas compartidas. Todo lo que se repite en más de dos secciones vive
 * aquí; nada más. Sin variantes especulativas.
 */

export function Section({
  id,
  tone = "ivory",
  className = "",
  children,
}: {
  id?: string;
  tone?: "ivory" | "paper" | "ink" | "deep";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    ivory: "bg-ivory text-ink",
    paper: "bg-paper text-ink",
    ink: "bg-ink text-ivory",
    deep: "bg-deep text-ivory",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} py-section ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

/** Encabezado de sección: índice, título y regla, como en el manual de marca. */
export function SectionHead({
  index,
  label,
  invert = false,
  /** Para encabezados dentro de una columna, donde el aire de sección sobra. */
  tight = false,
  children,
}: {
  index: string;
  label: string;
  invert?: boolean;
  tight?: boolean;
  children?: ReactNode;
}) {
  return (
    <header className={`reveal ${tight ? "mb-8" : "mb-16 md:mb-24"}`}>
      <div className="flex items-baseline gap-5">
        <span className={`label ${invert ? "text-lime" : "text-deep/50"}`}>
          {index} — {label}
        </span>
        <span className={`h-px flex-1 ${invert ? "bg-rule-invert" : "bg-rule"}`} />
      </div>
      {children ? <div className="mt-8 max-w-3xl">{children}</div> : null}
    </header>
  );
}

export function Headline({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`text-headline text-balance font-normal ${className}`}>{children}</h2>
  );
}

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "solid" | "outline" | "lime";
};

export function Button({ variant = "solid", className = "", ...props }: ButtonProps) {
  const variants = {
    solid: "bg-deep text-ivory hover:bg-deep-700",
    outline: "border border-rule-strong text-deep hover:border-deep hover:bg-deep hover:text-ivory",
    lime: "bg-lime text-ink hover:bg-ivory",
  } as const;

  return (
    <Link
      {...props}
      className={`label inline-flex items-center gap-3 px-7 py-4 transition-colors duration-300 ${variants[variant]} ${className}`}
    />
  );
}

/** Apertura de página interior: eyebrow, título grande y bajada. */
export function PageHero({
  eyebrow,
  title,
  lede,
  /** false cuando arriba ya van migas de pan, que traen su propio aire. */
  pad = true,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  pad?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`bg-ivory ${pad ? "pt-32 md:pt-40" : "pt-12 md:pt-14"}`}>
      <div className="shell flex flex-col gap-10 border-b border-rule pb-14 md:pb-20">
        <div className="flex items-center gap-4">
          <span className="h-0.5 w-8 bg-lime" />
          <span className="label text-deep/60">{eyebrow}</span>
        </div>
        <h1 className="text-display max-w-4xl text-balance font-normal text-deep">{title}</h1>
        {lede ? (
          <p className="text-lede max-w-2xl text-pretty text-deep/70">{lede}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/** Cierre de página interior. Toda ruta termina invitando a la conversación. */
export function CtaBand({
  title,
  lede,
  action = { label: "Agendar diagnóstico", href: "/#contacto" },
}: {
  title: string;
  lede?: string;
  action?: { label: string; href: string };
}) {
  return (
    <section className="bg-ink py-section text-ivory">
      <div className="shell flex flex-col items-start gap-8">
        <h2 className="text-headline max-w-3xl text-balance font-normal">{title}</h2>
        {lede ? (
          <p className="max-w-xl text-pretty leading-relaxed text-muted-invert">{lede}</p>
        ) : null}
        <Button href={action.href} variant="lime" className="mt-2">
          {action.label} <Arrow />
        </Button>
      </div>
    </section>
  );
}

/** Flecha diagonal: dirección y movimiento, el gesto gráfico del sistema. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M1 10L10 1M10 1H2.5M10 1V8.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/**
 * Migas de pan: el enlace visible y el JSON-LD salen del mismo array, para que
 * no se puedan desincronizar. `trail` no incluye «Inicio»: se pone solo.
 */
export function Breadcrumbs({ trail }: { trail: readonly { name: string; path: string }[] }) {
  const items = [{ name: "Inicio", path: "/" }, ...trail];
  return (
    <>
      <JsonLd data={breadcrumb(trail)} />
      <nav aria-label="Ruta de navegación" className="shell pt-24 md:pt-28">
        <ol className="label flex flex-wrap items-center gap-x-3 gap-y-2 text-deep/45">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-3">
                {last ? (
                  <span aria-current="page" className="text-deep/70">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="transition-colors hover:text-deep">
                      {item.name}
                    </Link>
                    <span aria-hidden className="h-px w-3 bg-deep/20" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/**
 * Preguntas frecuentes. Abiertas siempre: son la respuesta a una búsqueda, no
 * un acordeón que esconde el texto por el que la persona llegó. El JSON-LD de
 * FAQPage lo pone la página, que es quien sabe si es la única de la ruta.
 */
export function FaqList({ faqs, invert = false }: { faqs: readonly Faq[]; invert?: boolean }) {
  return (
    <dl className={`grid gap-px ${invert ? "bg-rule-invert" : "bg-rule"} md:grid-cols-2`}>
      {faqs.map((f) => (
        <div
          key={f.q}
          className={`flex flex-col gap-4 ${invert ? "bg-ink" : "bg-ivory"} py-8 pr-8 md:pr-12`}
        >
          <dt className={`text-lg leading-snug text-balance ${invert ? "text-ivory" : "text-deep"}`}>
            {f.q}
          </dt>
          <dd
            className={`text-pretty text-sm leading-relaxed ${
              invert ? "text-ivory/70" : "text-deep/70"
            }`}
          >
            {f.a}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Imagen editorial. Se omite mientras el archivo no exista, que es el estado
 * de casi todo el sitio hoy: ver IMAGENES.md para las especificaciones y el
 * texto alternativo de cada una.
 */
export function Figura({ figure, priority = false }: { figure?: FigureType; priority?: boolean }) {
  if (!figure) return null;
  return (
    <figure className="flex flex-col gap-3">
      <Image
        src={figure.src}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 60vw"
        className="h-auto w-full border border-rule object-cover"
      />
      {figure.caption ? (
        <figcaption className="text-xs leading-relaxed text-deep/50">{figure.caption}</figcaption>
      ) : null}
    </figure>
  );
}
