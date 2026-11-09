import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Reveal, RevealItem, RevealList } from "@/components/motion";
import type { Faq, Figure as FigureType } from "@/content/site";
import { breadcrumb, JsonLd } from "@/lib/schema";

/**
 * Primitivas compartidas del sistema «Plano». Todo lo que se repite en más de
 * dos secciones vive aquí; nada más. Sin variantes especulativas.
 *
 * Lenguaje: marfil como superficie de lectura, Auren Deep (`inverse`) como
 * superficie de declaración, tarjetas planas con filo de 1 px, cotas en mono
 * y un solo acento. DESIGN.md tiene el diccionario completo.
 */

export function Section({
  id,
  tone = "ivory",
  className = "",
  children,
}: {
  id?: string;
  /** ivory = base · paper = segundo escalón · deep = banda Auren Deep (inverse) · ink = tercer escalón */
  tone?: "ivory" | "paper" | "ink" | "deep";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    ivory: "bg-surface text-fg",
    paper: "bg-surface-2 text-fg",
    ink: "bg-surface-3 text-fg",
    deep: "inverse",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} py-section ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

/** Cota: etiqueta técnica con tick. Índices, capítulos, metadatos. */
export function Cota({
  children,
  className = "",
  tick = false,
}: {
  children: ReactNode;
  className?: string;
  tick?: boolean;
}) {
  return (
    <span className={`cota ${className}`}>
      {tick ? <span aria-hidden className="cota-tick" /> : null}
      {children}
    </span>
  );
}

/** Encabezado de sección: regla superior, cota de capítulo y titular. */
export function SectionHead({
  index,
  label,
  /** Para encabezados dentro de una columna, donde el aire de sección sobra. */
  tight = false,
  /** Texto corto a la derecha de la regla (opcional). */
  aside,
  children,
}: {
  index?: string;
  label: string;
  /** @deprecated El color lo decide la superficie (`inverse`). Se acepta por compatibilidad. */
  invert?: boolean;
  tight?: boolean;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Reveal as="header" className={tight ? "mb-8" : "mb-12 md:mb-16"}>
      <div className="flex items-center justify-between gap-6 border-t border-line pt-4">
        <span className="label text-fg/55">{label}</span>
        {aside ? <span className="label hidden text-fg/40 sm:block">{aside}</span> : null}
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
    <h2 className={`text-headline text-balance font-normal text-fg ${className}`}>{children}</h2>
  );
}

/** Tarjeta plana: la única superficie elevada del sistema. */
export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`card rounded-card ${className}`}>{children}</div>;
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
  size?: "md" | "lg";
};

/**
 * Botón. `solid` invierte la superficie (tinta sobre marfil, marfil sobre
 * Deep); `lime` es el acento y va a lo sumo una vez por pantalla, preferible
 * sobre `inverse`; `outline` es la acción secundaria.
 */
export function Button({ variant = "solid", size = "md", className = "", ...props }: ButtonProps) {
  const variants = {
    solid: "bg-fg text-surface hover:opacity-90",
    outline: "border border-line-strong text-fg hover:border-fg",
    lime: "bg-lime text-ink hover:brightness-105",
  } as const;
  const sizes = {
    md: "px-6 py-3.5 text-[0.75rem]",
    lg: "px-7 py-4 text-[0.8125rem]",
  } as const;

  // La flecha que venga como hijo se mueve con el botón: un solo lugar la
  // anima en vez de repetir `group-hover:` en cada llamada.
  const micro =
    "transition-all duration-300 ease-out-quint hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5";

  return (
    <Link
      {...props}
      className={`inline-flex items-center gap-3 rounded-pill font-medium uppercase tracking-[0.18em] ${sizes[size]} ${micro} ${variants[variant]} ${className}`}
    />
  );
}

/** Apertura de página interior: cota, título grande y bajada sobre papel técnico. */
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
    <section className={`relative bg-surface ${pad ? "pt-28 md:pt-36" : "pt-10 md:pt-12"}`}>
      <div className="shell relative flex flex-col gap-7 border-b border-line pb-12 md:pb-16">
        <span className="label text-fg/50">{eyebrow}</span>
        <h1 className="text-display max-w-5xl text-balance font-normal text-fg">{title}</h1>
        {lede ? <p className="text-lede max-w-2xl text-pretty text-fg/75">{lede}</p> : null}
        {children}
      </div>
    </section>
  );
}

/** Cierre de página interior. Toda ruta termina invitando a la conversación. */
export function CtaBand({
  title,
  lede,
  action = { label: "Hablemos de su empresa", href: "/contacto" },
  secondary = { label: "O haga la Radiografía: 10 minutos, sin registro", href: "/radiografia" },
}: {
  title: string;
  lede?: string;
  action?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="inverse relative isolate overflow-hidden py-section">
      <div aria-hidden className="paper-grid pointer-events-none absolute inset-0 text-fg [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div className="shell relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div className="flex flex-col gap-6">
          <h2 className="text-headline max-w-3xl text-balance font-normal">{title}</h2>
          {lede ? <p className="max-w-xl text-pretty leading-relaxed text-fg/70">{lede}</p> : null}
        </div>
        <div className="flex flex-col items-start gap-5 md:items-end">
          <Button href={action.href} variant="lime" size="lg">
            {action.label} <Arrow />
          </Button>
          {secondary ? (
            <Link
              href={secondary.href}
              className="text-sm text-fg/60 underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
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
  // V2.2: la ruta ya no se pinta. En la cabecera competía con el título y no
  // aportaba nada que el menú no diera. El dato estructurado se conserva.
  return <JsonLd data={breadcrumb(trail)} />;
}

/**
 * Preguntas frecuentes. Abiertas siempre: son la respuesta a una búsqueda, no
 * un acordeón que esconde el texto por el que la persona llegó. El JSON-LD de
 * FAQPage lo pone la página, que es quien sabe si es la única de la ruta.
 */
export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <RevealList as="dl" className="grid gap-x-12 md:grid-cols-2">
      {faqs.map((f) => (
        <RevealItem key={f.q} className="flex flex-col gap-3 border-t border-line py-7">
          <dt className="text-lg leading-snug text-balance text-fg">{f.q}</dt>
          <dd className="text-pretty text-sm leading-relaxed text-fg/70">{f.a}</dd>
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
        <figcaption className="cota text-fg/55">{figure.caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** Lista numerada en una tarjeta con divisores: pasos, incluye, principios. */
export function NumberedList({
  items,
  className = "",
}: {
  items: readonly { title: string; body?: string }[];
  className?: string;
}) {
  return (
    <ol className={`card grid divide-y divide-line overflow-hidden rounded-card ${className}`}>
      {items.map((item, j) => (
        <li
          key={item.title}
          className="grid gap-3 px-6 py-6 md:grid-cols-[3.5rem_16rem_1fr] md:gap-8 md:px-8 md:py-7"
        >
          <span className="cota text-fg/45">{String(j + 1).padStart(2, "0")}</span>
          <h3 className="text-lg leading-snug tracking-tight text-balance text-fg">{item.title}</h3>
          {item.body ? (
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-fg/70 md:text-base">
              {item.body}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
