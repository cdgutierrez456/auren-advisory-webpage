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
} from "@/components/demo-ui";
import { type Radicado, entidad, radicados } from "@/content/terminos";
import { useDemoStore } from "@/lib/demo-store";
import { resumenBandeja } from "@/lib/terminos";

/**
 * Tablero de gestión: la pantalla del secretario o el gerente. Dos números
 * mandan —vencidos y sin responsable— y el resto es soporte de esos dos.
 */
export default function TableroPQRSD() {
  return (
    <>
      <header className="border-b border-rule pb-10">
        <span className="label text-deep/45">Demo · PQRSD · {entidad.nombre}</span>
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-normal tracking-tight text-deep md:text-5xl">
          Tablero de gestión
        </h1>
        <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-deep/70">
          Quién está incumpliendo, dónde, y cuántas solicitudes no tienen
          dueño. Un radicado sin responsable es un vencimiento que nadie vio
          venir.
        </p>
        <div className="mt-8">
          <Paso href="/demos/pqrsd/bandeja">Volver a la bandeja</Paso>
        </div>
      </header>

      <SoloCliente>
        <Contenido />
      </SoloCliente>
    </>
  );
}

function Contenido() {
  const store = useDemoStore<Radicado>("pqrsd", radicados);
  const r = resumenBandeja(store.items, new Date());
  const cumplimiento = r.total ? Math.round((r.cerrados / r.total) * 100) : 0;

  return (
    <section className="pt-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Cifra valor={r.vencidos} etiqueta="Vencidos" tono="alerta" />
        <Cifra valor={r.sinResponsable} etiqueta="Sin responsable" tono="aviso" />
        <Cifra valor={`${r.promedioDias} d`} etiqueta="Promedio de respuesta" nota="En días hábiles, sobre los cerrados" />
        <Cifra valor={`${cumplimiento}%`} etiqueta="Respondidos del total" />
      </div>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="min-w-0">
          <div className="flex items-baseline gap-5">
            <span className="label text-deep/50">Abiertos por dependencia</span>
            <span className="h-px flex-1 bg-rule" />
          </div>
          <div className="mt-6">
            <Tabla head={["Dependencia", "Abiertos", "Vencidos", "Sin responsable", "Estado"]}>
              {r.porDependencia.map((d) => (
                <Fila key={d.dependencia}>
                  <Celda className="text-deep">{d.dependencia}</Celda>
                  <Celda>{d.total}</Celda>
                  <Celda className={d.vencidos ? "text-alerta" : ""}>{d.vencidos}</Celda>
                  <Celda className={d.sinResponsable ? "text-aviso" : ""}>{d.sinResponsable}</Celda>
                  <Celda>
                    <Pill tono={d.vencidos ? "alerta" : d.sinResponsable ? "aviso" : "ok"}>
                      {d.vencidos ? "Incumpliendo" : d.sinResponsable ? "En riesgo" : "Al día"}
                    </Pill>
                  </Celda>
                </Fila>
              ))}
            </Tabla>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <Aviso titulo="Por qué «sin responsable» va tan grande">
            Es el dato que ninguna entidad tiene hoy y el que más incomoda en la
            reunión, en el buen sentido. Vencidos ya duele; sin responsable es
            el vencimiento del mes que viene.
          </Aviso>
          <Aviso titulo="El promedio no es el indicador">
            Un promedio de {r.promedioDias} días hábiles puede convivir con
            cuatro radicados vencidos. Por eso el tablero abre con el conteo de
            incumplidos y no con el promedio, que siempre se ve bien.
          </Aviso>
        </div>
      </div>
    </section>
  );
}
