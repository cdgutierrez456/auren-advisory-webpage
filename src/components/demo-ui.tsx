"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { Arrow } from "@/components/ui";
import { demoBySlug, demos } from "@/content/demos";
import { reiniciarTodo } from "@/lib/demo-store";

/**
 * Primitivas de los demos. Todas viven aquí porque cada pantalla de demo es
 * un componente cliente de todos modos: no hay nada que ganar partiendo el
 * archivo.
 *
 * Regla de claridad, que es el requisito del proyecto: ninguna pantalla se
 * presenta sola. Todas abren con qué se está viendo, qué probar y qué NO hace
 * el demo. Si hay que explicar un paso de viva voz, ese paso está mal hecho.
 */

/* --- Guardia de cliente ------------------------------------------------ */

/**
 * Renderiza sus hijos solo después de montar en el navegador.
 *
 * Los demos dependen de dos cosas que el servidor no puede conocer: la fecha
 * de hoy (los datos están sembrados en días relativos) y el sessionStorage.
 * Prerenderizarlos produciría una pantalla con las fechas del día en que se
 * compiló. Este guardia es la razón por la que el demo se ve recién hecho en
 * cualquier momento del año.
 */
export function SoloCliente({ children }: { children: ReactNode }) {
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  if (!montado) {
    return (
      <p className="label py-20 text-deep/40" role="status">
        Cargando datos del demo…
      </p>
    );
  }
  return <>{children}</>;
}

/* --- Encabezado de demo ------------------------------------------------ */

/** Apertura de cada demo: servicio, qué es, qué probar y qué no hace. */
export function DemoHeader({ slug, children }: { slug: string; children?: ReactNode }) {
  const demo = demoBySlug(slug);
  if (!demo) return null;

  return (
    <header className="border-b border-rule pb-12">
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={`/servicios/${demo.servicio}`}
          className="label bg-deep px-3.5 py-2 text-ivory transition-colors hover:bg-deep-700"
        >
          {demo.servicioNombre}
        </Link>
        <span className="label text-deep/45">{demo.segmento}</span>
      </div>

      <h1 className="mt-7 max-w-3xl text-balance text-4xl font-normal tracking-tight text-deep md:text-5xl">
        {demo.nombre}
      </h1>
      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-deep/70">
        {demo.resumen}
      </p>

      <div className="mt-10 grid gap-px bg-rule md:grid-cols-[1.15fr_1fr]">
        <div className="bg-paper p-7">
          <p className="label text-deep/45">Qué probar</p>
          <ol className="mt-5 flex flex-col gap-3">
            {demo.pasos.map((paso, i) => (
              <li key={paso} className="flex gap-4 text-pretty leading-relaxed text-deep/80">
                <span className="label mt-1 shrink-0 text-deep/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {paso}
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-6 bg-ivory p-7">
          <div>
            <p className="label text-deep/45">Por qué importa</p>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-deep/70">{demo.dolor}</p>
          </div>
          <div className="border-t border-rule pt-5">
            <p className="label text-deep/45">Hasta dónde llega el demo</p>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-deep/70">{demo.limite}</p>
          </div>
        </div>
      </div>

      {children ? <div className="mt-8">{children}</div> : null}
    </header>
  );
}

/* --- Bloques de dato --------------------------------------------------- */

export type Tono = "alerta" | "aviso" | "ok" | "neutro";

const TONOS: Record<Tono, string> = {
  alerta: "bg-alerta-suave text-alerta",
  aviso: "bg-aviso-suave text-aviso",
  ok: "bg-ok-suave text-ok",
  neutro: "bg-ivory text-deep/70",
};

/** Estado como pastilla. Siempre lleva palabra, nunca solo color. */
export function Pill({ tono = "neutro", children }: { tono?: Tono; children: ReactNode }) {
  return (
    <span
      className={`label inline-flex items-center whitespace-nowrap px-2.5 py-1.5 ${TONOS[tono]}`}
    >
      {children}
    </span>
  );
}

/** Una cifra grande. Todo lo demás en la pantalla es soporte de este número. */
export function Cifra({
  valor,
  etiqueta,
  tono = "neutro",
  nota,
}: {
  valor: ReactNode;
  etiqueta: string;
  tono?: Tono;
  nota?: string;
}) {
  const color =
    tono === "alerta" ? "text-alerta" : tono === "aviso" ? "text-aviso" : tono === "ok" ? "text-ok" : "text-deep";
  return (
    <div className="flex flex-col gap-2 border-t border-rule pt-5">
      <span className={`font-serif text-5xl leading-none ${color}`}>{valor}</span>
      <span className="label text-deep/50">{etiqueta}</span>
      {nota ? <span className="text-sm text-deep/55">{nota}</span> : null}
    </div>
  );
}

export function Tabla({ head, children }: { head: readonly string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-rule-strong">
            {head.map((h) => (
              <th key={h} className="label whitespace-nowrap py-4 pr-6 font-medium text-deep/45">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Fila({ children, onClick, activa = false }: { children: ReactNode; onClick?: () => void; activa?: boolean }) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-rule align-middle ${
        onClick ? "cursor-pointer transition-colors hover:bg-paper" : ""
      } ${activa ? "bg-paper" : ""}`}
    >
      {children}
    </tr>
  );
}

export function Celda({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`py-4 pr-6 text-deep/80 ${className}`}>{children}</td>;
}

export function Aviso({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-lime bg-paper p-6">
      <p className="label text-deep/45">{titulo}</p>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-deep/75">{children}</p>
    </div>
  );
}

/* --- Controles --------------------------------------------------------- */

type BotonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: "solido" | "contorno" | "lima";
};

/** El equivalente de <Button> del sitio, que es un <Link> y aquí no sirve:
 *  en los demos casi todo es acción, no navegación. */
export function Boton({ variante = "solido", className = "", ...props }: BotonProps) {
  const variantes = {
    solido: "bg-deep text-ivory hover:bg-deep-700 disabled:bg-deep/25",
    contorno: "border border-rule-strong text-deep hover:border-deep disabled:text-deep/30",
    lima: "bg-lime text-ink hover:bg-deep hover:text-ivory disabled:bg-lime/40",
  } as const;
  return (
    <button
      {...props}
      className={`label inline-flex items-center justify-center gap-3 px-6 py-4 transition-colors duration-200 disabled:cursor-not-allowed ${variantes[variante]} ${className}`}
    />
  );
}

const campo =
  "w-full border-b border-rule-strong bg-transparent py-3.5 text-deep outline-none transition-colors placeholder:text-deep/30 focus:border-deep";

export function Campo({
  etiqueta,
  ayuda,
  ...props
}: { etiqueta: string; ayuda?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="label text-deep/45">{etiqueta}</span>
      <input aria-label={etiqueta} className={campo} {...props} />
      {ayuda ? <span className="text-xs text-deep/50">{ayuda}</span> : null}
    </label>
  );
}

export function Seleccion({
  etiqueta,
  opciones,
  ...props
}: {
  etiqueta: string;
  opciones: readonly { valor: string; texto: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="label text-deep/45">{etiqueta}</span>
      <select aria-label={etiqueta} className={`${campo} cursor-pointer`} {...props}>
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.texto}
          </option>
        ))}
      </select>
    </label>
  );
}

export function AreaTexto({
  etiqueta,
  ...props
}: { etiqueta: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="label text-deep/45">{etiqueta}</span>
      <textarea aria-label={etiqueta} rows={4} className={`${campo} resize-none`} {...props} />
    </label>
  );
}

/** Deslizador con su valor a la vista: los umbrales se mueven en la reunión. */
export function Deslizador({
  etiqueta,
  valor,
  sufijo = "",
  onCambio,
  min,
  max,
  paso = 1,
}: {
  etiqueta: string;
  valor: number;
  sufijo?: string;
  onCambio: (v: number) => void;
  min: number;
  max: number;
  paso?: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline justify-between gap-4">
        <span className="label text-deep/45">{etiqueta}</span>
        <span className="font-mono text-sm text-deep">
          {valor}
          {sufijo}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={paso}
        value={valor}
        onChange={(e) => onCambio(Number(e.target.value))}
        className="w-full accent-deep"
      />
    </label>
  );
}

/** Enlace de paso a otra pantalla del mismo demo. */
export function Paso({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="label inline-flex items-center gap-3 border-b border-rule-strong py-3 text-deep transition-colors hover:border-deep"
    >
      {children} <Arrow />
    </Link>
  );
}

/* --- Formato ----------------------------------------------------------- */

export const pesos = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

export const numero = (n: number) => new Intl.NumberFormat("es-CO").format(n);

export const fechaCorta = (iso: string) =>
  new Date(iso.length > 10 ? iso : `${iso}T00:00:00`).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const horaCorta = (iso: string) =>
  new Date(iso).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

/* --- Barra de la sección ----------------------------------------------- */

/**
 * Navegación entre demos + el distintivo que nunca puede faltar.
 *
 * El comercial abre un solo enlace y salta entre demos delante del cliente sin
 * cambiar de pestaña. El botón de reinicio se usa en vivo, cuando el cliente
 * pide ver el flujo otra vez.
 */
export function BarraDemos() {
  const ruta = usePathname();
  const activo = (slug: string) => ruta === `/demos/${slug}` || ruta.startsWith(`/demos/${slug}/`);

  return (
    <div className="sticky top-20 z-40 border-b border-rule bg-ivory/95 backdrop-blur-md">
      <div className="shell flex h-14 items-center gap-6">
        <Link
          href="/demos"
          className={`label shrink-0 ${ruta === "/demos" ? "text-deep" : "text-deep/45 hover:text-deep"}`}
        >
          Demos
        </Link>

        <nav className="flex flex-1 items-center gap-5 overflow-x-auto">
          {demos.map((d) => (
            <Link
              key={d.slug}
              href={`/demos/${d.slug}`}
              aria-current={activo(d.slug) ? "page" : undefined}
              className={`label relative shrink-0 py-2 transition-colors ${
                activo(d.slug) ? "text-deep" : "text-deep/45 hover:text-deep"
              }`}
            >
              {d.corto}
              {activo(d.slug) ? (
                <span aria-hidden className="absolute bottom-0 left-0 h-0.5 w-full bg-lime" />
              ) : null}
            </Link>
          ))}
        </nav>

        <span className="label inline-flex shrink-0 bg-lime px-3 py-1.5 text-ink">
          Demo<span className="hidden sm:inline">&nbsp;· datos sintéticos</span>
        </span>
        <button
          type="button"
          onClick={reiniciarTodo}
          className="label shrink-0 text-deep/45 underline-offset-4 transition-colors hover:text-deep hover:underline"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
