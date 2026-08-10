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

/**
 * Encabezado de sección: etiqueta con trazo lima y titular. El titular manda;
 * ya no hay numerito de sección (era ruido, no información).
 * `index` se mantiene en el tipo por compatibilidad de llamadas, sin renderizarse.
 */
export function SectionHead({
  label,
  invert = false,
  /** Para encabezados dentro de una columna, donde el aire de sección sobra. */
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
        <span className={`h-px w-10 shrink-0 ${invert ? "bg-lime" : "bg-deep"}`} />
        <span className={`label ${invert ? "text-lime" : "text-deep/55"}`}>{label}</span>
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
 * Énfasis editorial: una o dos palabras del titular en serif itálica. Es el
 * único lugar, junto al manifiesto, donde aparece la serif. Se usa DENTRO de un
 * titular en grotesca para crear contraste —la firma tipográfica de la home.
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
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-ivory pt-32 md:pt-40">
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
