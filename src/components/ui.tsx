import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

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
  children,
}: {
  index: string;
  label: string;
  invert?: boolean;
  children?: ReactNode;
}) {
  return (
    <header className="reveal mb-16 md:mb-24">
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
