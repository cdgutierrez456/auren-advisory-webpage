import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Primitivas compartidas. Todo lo que se repite en más de dos secciones vive
 * aquí; nada más. Sin variantes especulativas.
 *
 * Lenguaje: superficie oscura (Auren Deep), tarjetas glass, esquinas
 * redondeadas y lima como resplandor de acento. Marfil para el texto.
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
  // Todos los tonos son oscuros ahora; el nombre se conserva por compatibilidad.
  const tones = {
    ivory: "bg-deep-900 text-ivory",
    paper: "bg-deep-700 text-ivory",
    ink: "bg-ink text-ivory",
    deep: "bg-deep text-ivory",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} py-section ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

/** Encabezado de sección: trazo lima que se dibuja + etiqueta + titular. */
export function SectionHead({
  label,
  tight = false,
  children,
}: {
  index?: string;
  label: string;
  invert?: boolean;
  tight?: boolean;
  children?: ReactNode;
}) {
  return (
    <header className={`reveal ${tight ? "mb-8" : "mb-14 md:mb-20"}`}>
      <div className="flex items-center gap-4">
        <span className="draw-rule h-px w-10 shrink-0 bg-lime" />
        <span className="label text-ivory/55">{label}</span>
      </div>
      {children ? <div className="mt-7 max-w-3xl">{children}</div> : null}
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

/**
 * Énfasis editorial: una o dos palabras del titular en serif itálica. Junto al
 * manifiesto, el único lugar donde aparece la serif — la firma tipográfica.
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

/** Tarjeta glass reutilizable: superficie translúcida con desenfoque y borde. */
export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`glass rounded-card ${className}`}>{children}</div>;
}

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "solid" | "outline" | "lime";
};

export function Button({ variant = "solid", className = "", ...props }: ButtonProps) {
  const variants = {
    // Acción primaria: relleno lima con resplandor al pasar el cursor.
    solid:
      "bg-lime text-ink hover:shadow-[0_0_40px_-6px_var(--color-lime)] hover:-translate-y-0.5",
    // Acción secundaria: fantasma sobre oscuro.
    outline:
      "border border-hairline-strong text-ivory hover:border-lime hover:text-lime hover:-translate-y-0.5",
    lime: "bg-lime text-ink hover:shadow-[0_0_40px_-6px_var(--color-lime)] hover:-translate-y-0.5",
  } as const;

  return (
    <Link
      {...props}
      className={`label inline-flex items-center gap-3 rounded-pill px-7 py-4 transition-all duration-300 ${variants[variant]} ${className}`}
    />
  );
}

/** Apertura de página interior: eyebrow, título grande y bajada. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-deep-900 pt-32 md:pt-40">
      <div className="shell flex flex-col gap-10 border-b border-hairline pb-14 md:pb-20">
        <div className="flex items-center gap-4">
          <span className="h-0.5 w-8 bg-lime" />
          <span className="label text-ivory/60">{eyebrow}</span>
        </div>
        <h1 className="text-display max-w-4xl text-balance font-normal text-ivory">{title}</h1>
        {lede ? (
          <p className="text-lede max-w-2xl text-pretty text-ivory/70">{lede}</p>
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
    <section className="relative isolate overflow-hidden bg-ink py-section text-ivory">
      <div
        aria-hidden
        className="glow breathe pointer-events-none absolute -top-24 right-[8%] h-72 w-72 bg-lime"
      />
      <div className="shell relative flex flex-col items-start gap-8">
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
