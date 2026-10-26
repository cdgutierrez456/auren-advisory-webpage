"use client";

import {
  Aviso,
  Celda,
  Cifra,
  Fila,
  Paso,
  Pill,
  SoloCliente,
  Tabla,
  useDato,
  useFormato,
} from "@/components/demo-ui";
import { type Inspeccion, inspecciones, vehiculos } from "@/content/demo-data";
import { resumenInspecciones } from "@/lib/demos";
import { useDemoStore } from "@/lib/demo-store";
import { iso } from "@/lib/terminos";
import { useT } from "@/lib/use-lang";

/**
 * Tablero de cumplimiento. Lee el mismo store que el flujo de inspección: la
 * inspección que el cliente acaba de hacer aparece aquí, y ese es el momento
 * en que entiende que no es una maqueta.
 */
export default function TableroPreoperacional() {
  const t = useT();
  return (
    <>
      <header className="border-b border-line pb-10">
        <span className="label text-fg/40">Demo · {t("Preoperacional", "Pre-trip")}</span>
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-normal tracking-tight text-fg md:text-5xl">
          {t("Tablero de cumplimiento", "Compliance dashboard")}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-fg/75">
          {t(
            "Lo que el gerente no puede ver hoy en la carpeta de papel: cuántas inspecciones se hicieron de verdad, qué ítem falla siempre y qué vehículos quedaron bloqueados.",
            "What the manager can't see today in the paper folder: how many inspections were actually done, which item always fails and which vehicles were blocked.",
          )}
        </p>
        <div className="mt-8">
          <Paso href="/demos/preoperacional">
            {t("Volver a hacer una inspección", "Do another inspection")}
          </Paso>
        </div>
      </header>

      <SoloCliente>
        <Contenido />
      </SoloCliente>
    </>
  );
}

function Contenido() {
  const t = useT();
  const dato = useDato();
  const { horaCorta, numero } = useFormato();
  const store = useDemoStore<Inspeccion>("preoperacional", inspecciones);
  const hoy = new Date();
  const r = resumenInspecciones(store.items, hoy);
  const dia = iso(hoy);
  const deHoy = store.items
    .filter((i) => i.fecha.slice(0, 10) === dia)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
  const sinInspeccion = vehiculos.filter(
    (v) => !deHoy.some((i) => i.placa === v.placa),
  );

  return (
    <section className="pt-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Cifra
          valor={`${r.hoy}/${vehiculos.length}`}
          etiqueta={t("Inspeccionados hoy", "Inspected today")}
          tono={r.hoy < vehiculos.length ? "aviso" : "ok"}
          nota={t(
            `${sinInspeccion.length} vehículos sin inspección`,
            `${sinInspeccion.length} vehicles not inspected`,
          )}
        />
        <Cifra valor={r.bloqueadosHoy} etiqueta={t("Bloqueados hoy", "Blocked today")} tono="alerta" />
        <Cifra valor={r.total} etiqueta={t("Inspecciones registradas", "Inspections recorded")} />
        <Cifra
          valor={`${Math.round((r.hoy / vehiculos.length) * 100)}%`}
          etiqueta={t("Cumplimiento del día", "Today's compliance")}
        />
      </div>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="min-w-0">
          <div className="flex items-baseline gap-5">
            <span className="label text-fg/55">{t("Inspecciones de hoy", "Today's inspections")}</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="mt-6">
            <Tabla
              head={t(
                ["Hora", "Vehículo", "Conductor", "Hallazgos", "Resultado"],
                ["Time", "Vehicle", "Driver", "Findings", "Result"],
              )}
            >
              {deHoy.map((i) => (
                <Fila key={i.id}>
                  <Celda className="whitespace-nowrap font-mono">{horaCorta(i.fecha)}</Celda>
                  <Celda className="whitespace-nowrap font-mono text-fg">{i.placa}</Celda>
                  <Celda className="whitespace-nowrap">{i.conductor}</Celda>
                  <Celda>{i.respuestas.filter((x) => x.estado === "malo").length}</Celda>
                  <Celda>
                    <Pill tono={i.resultado === "bloqueado" ? "alerta" : "ok"}>
                      {i.resultado === "bloqueado" ? t("Bloqueado", "Blocked") : t("Aprobado", "Approved")}
                    </Pill>
                  </Celda>
                </Fila>
              ))}
            </Tabla>
          </div>

          {sinInspeccion.length ? (
            <p className="mt-6 text-sm leading-relaxed text-fg/55">
              <span className="text-aviso">{t("Sin inspección hoy:", "Not inspected today:")}</span>{" "}
              {sinInspeccion.map((v) => v.placa).join(", ")}.
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <div className="flex items-baseline gap-5">
              <span className="label text-fg/55">{t("Ítems que más fallan", "Most frequently failed items")}</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <ul className="mt-6 flex flex-col gap-4">
              {r.ranking.map((x) => (
                <li key={x.itemId} className="flex items-center gap-4">
                  <span className="w-8 font-serif text-2xl text-fg">{x.veces}</span>
                  <span className="flex-1 text-sm text-fg/75">{dato(x.texto)}</span>
                  {x.critico ? <Pill tono="alerta">{t("Crítico", "Critical")}</Pill> : null}
                </li>
              ))}
              {r.ranking.length === 0 ? (
                <li className="text-sm text-fg/55">{t("Sin hallazgos registrados.", "No findings recorded.")}</li>
              ) : null}
            </ul>
          </div>

          <Aviso titulo={t("El patrón que el papel esconde", "The pattern paper hides")}>
            {t(
              `El mismo ítem repitiéndose en el mismo vehículo no es un hallazgo: es un mantenimiento que no se hizo. Ese ranking es imposible de sacar de una carpeta con ${numero(600)} hojas.`,
              `The same item repeating on the same vehicle isn't a finding: it's maintenance that wasn't done. That ranking is impossible to pull out of a folder with ${numero(600)} sheets.`,
            )}
          </Aviso>
        </div>
      </div>
    </section>
  );
}
