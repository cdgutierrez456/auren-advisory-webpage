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
  horaCorta,
  numero,
} from "@/components/demo-ui";
import { type Inspeccion, inspecciones, vehiculos } from "@/content/demo-data";
import { resumenInspecciones } from "@/lib/demos";
import { useDemoStore } from "@/lib/demo-store";
import { iso } from "@/lib/terminos";

/**
 * Tablero de cumplimiento. Lee el mismo store que el flujo de inspección: la
 * inspección que el cliente acaba de hacer aparece aquí, y ese es el momento
 * en que entiende que no es una maqueta.
 */
export default function TableroPreoperacional() {
  return (
    <>
      <header className="border-b border-rule pb-10">
        <span className="label text-deep/45">Demo · Preoperacional</span>
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-normal tracking-tight text-deep md:text-5xl">
          Tablero de cumplimiento
        </h1>
        <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-deep/70">
          Lo que el gerente no puede ver hoy en la carpeta de papel: cuántas
          inspecciones se hicieron de verdad, qué ítem falla siempre y qué
          vehículos quedaron bloqueados.
        </p>
        <div className="mt-8">
          <Paso href="/demos/preoperacional">Volver a hacer una inspección</Paso>
        </div>
      </header>

      <SoloCliente>
        <Contenido />
      </SoloCliente>
    </>
  );
}

function Contenido() {
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
          etiqueta="Inspeccionados hoy"
          tono={r.hoy < vehiculos.length ? "aviso" : "ok"}
          nota={`${sinInspeccion.length} vehículos sin inspección`}
        />
        <Cifra valor={r.bloqueadosHoy} etiqueta="Bloqueados hoy" tono="alerta" />
        <Cifra valor={r.total} etiqueta="Inspecciones registradas" />
        <Cifra
          valor={`${Math.round((r.hoy / vehiculos.length) * 100)}%`}
          etiqueta="Cumplimiento del día"
        />
      </div>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="min-w-0">
          <div className="flex items-baseline gap-5">
            <span className="label text-deep/50">Inspecciones de hoy</span>
            <span className="h-px flex-1 bg-rule" />
          </div>
          <div className="mt-6">
            <Tabla head={["Hora", "Vehículo", "Conductor", "Hallazgos", "Resultado"]}>
              {deHoy.map((i) => (
                <Fila key={i.id}>
                  <Celda className="whitespace-nowrap font-mono">{horaCorta(i.fecha)}</Celda>
                  <Celda className="whitespace-nowrap font-mono text-deep">{i.placa}</Celda>
                  <Celda className="whitespace-nowrap">{i.conductor}</Celda>
                  <Celda>{i.respuestas.filter((x) => x.estado === "malo").length}</Celda>
                  <Celda>
                    <Pill tono={i.resultado === "bloqueado" ? "alerta" : "ok"}>
                      {i.resultado === "bloqueado" ? "Bloqueado" : "Aprobado"}
                    </Pill>
                  </Celda>
                </Fila>
              ))}
            </Tabla>
          </div>

          {sinInspeccion.length ? (
            <p className="mt-6 text-sm leading-relaxed text-deep/60">
              <span className="text-aviso">Sin inspección hoy:</span>{" "}
              {sinInspeccion.map((v) => v.placa).join(", ")}.
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <div className="flex items-baseline gap-5">
              <span className="label text-deep/50">Ítems que más fallan</span>
              <span className="h-px flex-1 bg-rule" />
            </div>
            <ul className="mt-6 flex flex-col gap-4">
              {r.ranking.map((x) => (
                <li key={x.itemId} className="flex items-center gap-4">
                  <span className="w-8 font-serif text-2xl text-deep">{x.veces}</span>
                  <span className="flex-1 text-sm text-deep/75">{x.texto}</span>
                  {x.critico ? <Pill tono="alerta">Crítico</Pill> : null}
                </li>
              ))}
              {r.ranking.length === 0 ? (
                <li className="text-sm text-deep/50">Sin hallazgos registrados.</li>
              ) : null}
            </ul>
          </div>

          <Aviso titulo="El patrón que el papel esconde">
            El mismo ítem repitiéndose en el mismo vehículo no es un hallazgo:
            es un mantenimiento que no se hizo. Ese ranking es imposible de
            sacar de una carpeta con {numero(600)} hojas.
          </Aviso>
        </div>
      </div>
    </section>
  );
}
