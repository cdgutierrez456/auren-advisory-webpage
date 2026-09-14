import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { DrawRule, Reveal, RevealItem, RevealList } from "@/components/motion";
import type { Faq, Figure as FigureType } from "@/content/site";
import { breadcrumb, JsonLd } from "@/lib/schema";

/**
 * Primitivas compartidas. Todo lo que se repite en más de dos secciones vive
 * aquí; nada más. Sin variantes especulativas.
 *
 * Lenguaje: superficie oscura (la familia Auren Deep), tarjetas glass, esquinas
 * redondeadas y lima como resplandor de acento. Marfil para el texto. DESIGN.md
 * tiene la escala de valores y el presupuesto del lima.
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
  // Los cuatro tonos son oscuros: escalones de la misma familia, de menor a
  // mayor contraste contra el marfil. Los nombres se conservan para no tocar
  // cada llamada; ninguno "significa" algo, solo dan ritmo a la página.
  const tones = {
    ivory: "bg-surface text-fg",
    paper: "bg-surface-2 text-fg",
    ink: "bg-surface-4 text-fg",
    deep: "bg-surface-3 text-fg",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} py-section ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

/** Encabezado de sección: trazo lima que se dibuja + índice, etiqueta y regla. */
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
    <Reveal as="header" className={tight ? "mb-8" : "mb-14 md:mb-20"}>
      <div className="flex items-baseline gap-5">
        <DrawRule className="h-px w-10 shrink-0 translate-y-[-0.3em] bg-lime" />
        <span className={`label ${invert ? "text-accent" : "text-fg/55"}`}>
          {index} — {label}
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>
      {children ? <div className="mt-8 max-w-3xl">{children}</div> : null}
    </Reveal>
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

/** Tarjeta glass: superficie translúcida con desenfoque y borde de luz. */
export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`glass rounded-card transition-all duration-500 ${className}`}>{children}</div>
  );
}

/**
 * Énfasis editorial: una o dos palabras en serif itálica. Es la firma
 * tipográfica de la marca — nunca un párrafo, nunca interfaz.
 */
export function Em({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <em className={`font-serif font-normal italic tracking-normal ${className}`}>{children}</em>
  );
}

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "solid" | "outline" | "lime";
};

export function Button({ variant = "solid", className = "", ...props }: ButtonProps) {
  const variants = {
    // Acción primaria: relleno lima con resplandor al pasar el cursor.
    solid:
      "bg-lime text-ink hover:-translate-y-0.5 hover:shadow-[0_0_40px_-6px_var(--color-lime)]",
    // Acción secundaria: fantasma sobre la superficie.
    outline:
      "border border-line-strong text-fg hover:-translate-y-0.5 hover:border-lime hover:text-accent",
    lime: "bg-lime text-ink hover:-translate-y-0.5 hover:shadow-[0_0_40px_-6px_var(--color-lime)]",
  } as const;

  // La flecha que venga como hijo se mueve con el botón: un solo lugar la
  // anima en vez de repetir `group-hover:` en cada llamada.
  const microinteraccion =
    "transition-all duration-300 ease-out-quint active:translate-y-0 active:scale-[0.97] [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5";

  return (
    <Link
      {...props}
      className={`label inline-flex items-center gap-3 rounded-pill px-7 py-4 ${microinteraccion} ${variants[variant]} ${className}`}
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
    <section className={`bg-surface ${pad ? "pt-32 md:pt-40" : "pt-12 md:pt-14"}`}>
      <div className="shell flex flex-col gap-10 border-b border-line pb-14 md:pb-20">
        <div className="flex items-center gap-4">
          <span className="h-0.5 w-8 bg-lime" />
          <span className="label text-fg/55">{eyebrow}</span>
        </div>
        <h1 className="text-display max-w-4xl text-balance font-normal text-fg">{title}</h1>
        {lede ? (
          <p className="text-lede max-w-2xl text-pretty text-fg/75">{lede}</p>
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
    <section className="relative isolate overflow-hidden bg-surface-4 py-section text-fg">
      <div
        aria-hidden
        className="glow breathe pointer-events-none absolute -top-24 right-[8%] h-72 w-72 bg-lime"
      />
      <div className="shell relative flex flex-col items-start gap-8">
        <h2 className="text-headline max-w-3xl text-balance font-normal">{title}</h2>
        {lede ? (
          <p className="max-w-xl text-pretty leading-relaxed text-fg/60">{lede}</p>
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
        <ol className="label flex flex-wrap items-center gap-x-3 gap-y-2 text-fg/40">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-3">
                {last ? (
                  <span aria-current="page" className="text-fg/75">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="transition-colors hover:text-fg">
                      {item.name}
                    </Link>
                    <span aria-hidden className="h-px w-3 bg-line" />
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
export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <RevealList as="dl" className="grid gap-4 md:grid-cols-2">
      {faqs.map((f) => (
        <RevealItem key={f.q} className="glass flex flex-col gap-4 rounded-card p-8 md:p-9">
          <dt className="text-lg leading-snug text-balance text-fg">{f.q}</dt>
          <dd className="text-pretty text-sm leading-relaxed text-fg/75">{f.a}</dd>
        </RevealItem>
      ))}
    </RevealList>
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
        className="h-auto w-full rounded-card border border-line object-cover"
      />
      {figure.caption ? (
        <figcaption className="text-xs leading-relaxed text-fg/55">{figure.caption}</figcaption>
      ) : null}
    </figure>
  );
}
