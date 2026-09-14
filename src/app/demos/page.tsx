import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/ui";
import { demos } from "@/content/demos";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Demos",
  "Piezas demostrables de cada servicio: inspección preoperacional, vencimientos de flota, PQRSD con control de términos, lectura por cámara y costo de la fricción.",
  "/demos",
);

const SEGMENTOS = ["Transporte", "Entidades públicas", "Salud", "Transversal"] as const;

export default function Demos() {
  return (
    <>
      <header className="border-b border-line pb-14">
        <div className="flex items-center gap-4">
          <span className="h-0.5 w-8 bg-lime" />
          <span className="label text-fg/55">Demostraciones</span>
        </div>
        <h1 className="mt-8 max-w-4xl text-balance text-4xl font-normal tracking-tight text-fg md:text-6xl">
          Cada servicio con algo real detrás.
        </h1>
        <p className="text-lede mt-8 max-w-2xl text-pretty text-fg/75">
          Estas pantallas funcionan. Corren en su navegador, con datos
          sintéticos y sin servidor: el video de las cámaras no sale de este
          equipo y nada se guarda al cerrar la pestaña.
        </p>
        <p className="mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-fg/55">
          Un demo demuestra el control; el piloto lo pone a operar con sus
          datos, sus usuarios y su trazabilidad. Cada pantalla dice
          explícitamente dónde termina.
        </p>
      </header>

      {SEGMENTOS.map((segmento) => {
        const lista = demos.filter((d) => d.segmento === segmento);
        if (!lista.length) return null;

        return (
          <section key={segmento} className="border-b border-line py-12 md:py-16">
            <div className="flex items-baseline gap-5">
              <span className="label text-fg/55">{segmento}</span>
              <span className="h-px flex-1 bg-line" />
              <span className="label text-fg/40">{lista.length}</span>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {lista.map((d) => (
                <Link
                  key={d.slug}
                  href={`/demos/${d.slug}`}
                  className="glass group flex flex-col gap-5 rounded-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-lime/40"
                >
                  <span className="label text-fg/40">{d.servicioNombre}</span>
                  <span className="text-2xl font-normal tracking-tight text-fg">{d.nombre}</span>
                  <span className="text-pretty text-sm leading-relaxed text-fg/55">
                    {d.resumen}
                  </span>
                  <span className="label mt-auto inline-flex items-center gap-3 pt-4 text-fg/55 transition-colors group-hover:text-fg">
                    Abrir demo <Arrow />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section className="py-12">
        <p className="max-w-2xl text-pretty text-sm leading-relaxed text-fg/55">
          Los tres demos de cámara comparten el mismo motor. Añadir un modo
          nuevo —conteo de piezas, nivel en tanque, detección de EPP— cuesta
          uno o dos días porque el shell de cámara, los permisos y el manejo de
          errores ya están construidos.
        </p>
      </section>
    </>
  );
}
