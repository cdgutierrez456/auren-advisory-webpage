import type { Metadata } from "next";
import Link from "@/components/link";
import { Arrow } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata(
    "Demos",
    t(
      "Piezas demostrables de cada servicio: inspección preoperacional, vencimientos de flota, PQRSD con control de términos, lectura por cámara y costo de la fricción.",
      "Working pieces for each service: pre-trip inspection, fleet expiries, citizen requests with deadline control, camera reading and the cost of friction.",
    ),
    "/demos",
  );
}

export default async function Demos() {
  const [{ demos }, t] = await Promise.all([getContent(), getT()]);
  // El orden de las secciones; el texto es el `segmento` de cada demo en ese idioma.
  const SEGMENTOS = t(
    ["Transporte", "Entidades públicas", "Salud", "Transversal"],
    ["Transport", "Public entities", "Healthcare", "Cross-industry"],
  );
  return (
    <>
      <header className="border-b border-line pb-14">
        <div className="flex items-center gap-4">
          <span className="h-0.5 w-8 bg-lime" />
          <span className="label text-fg/55">{t("Demostraciones", "Demonstrations")}</span>
        </div>
        <h1 className="mt-8 max-w-4xl text-balance text-4xl font-normal tracking-tight text-fg md:text-6xl">
          {t("Cada servicio con algo real detrás.", "Every service with something real behind it.")}
        </h1>
        <p className="text-lede mt-8 max-w-2xl text-pretty text-fg/75">
          {t(
            "Estas pantallas funcionan. Corren en su navegador, con datos sintéticos y sin servidor: el video de las cámaras no sale de este equipo y nada se guarda al cerrar la pestaña.",
            "These screens work. They run in your browser, with synthetic data and no server: camera video never leaves this device and nothing is saved when you close the tab.",
          )}
        </p>
        <p className="mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-fg/55">
          {t(
            "Un demo demuestra el control; el piloto lo pone a operar con sus datos, sus usuarios y su trazabilidad. Cada pantalla dice explícitamente dónde termina.",
            "A demo proves the control; the pilot puts it to work with your data, your users and your traceability. Each screen states explicitly where it ends.",
          )}
        </p>
      </header>

      {SEGMENTOS.map((segmento) => {
        const lista = demos.filter((d: { segmento: string }) => d.segmento === segmento);
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
                    {t("Abrir demo", "Open demo")} <Arrow />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section className="py-12">
        <p className="max-w-2xl text-pretty text-sm leading-relaxed text-fg/55">
          {t(
            "Los tres demos de cámara comparten el mismo motor. Añadir un modo nuevo —conteo de piezas, nivel en tanque, detección de EPP— cuesta uno o dos días porque el shell de cámara, los permisos y el manejo de errores ya están construidos.",
            "The three camera demos share the same engine. Adding a new mode —part counting, tank level, PPE detection— takes a day or two because the camera shell, permissions and error handling are already built.",
          )}
        </p>
      </section>
    </>
  );
}
