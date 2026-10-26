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
} from "@/components/demo-ui";
import { type Radicado, entidad, radicados } from "@/content/terminos";
import { useDemoStore } from "@/lib/demo-store";
import { resumenBandeja } from "@/lib/terminos";
import { useT } from "@/lib/use-lang";

/**
 * Tablero de gestión: la pantalla del secretario o el gerente. Dos números
 * mandan —vencidos y sin responsable— y el resto es soporte de esos dos.
 */
export default function TableroPQRSD() {
  const t = useT();
  const dato = useDato();
  return (
    <>
      <header className="border-b border-line pb-10">
        <span className="label text-fg/40">Demo · PQRSD · {dato(entidad.nombre)}</span>
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-normal tracking-tight text-fg md:text-5xl">
          {t("Tablero de gestión", "Management dashboard")}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-fg/75">
          {t(
            "Quién está incumpliendo, dónde, y cuántas solicitudes no tienen dueño. Un radicado sin responsable es un vencimiento que nadie vio venir.",
            "Who is missing deadlines, where, and how many requests have no owner. A request without an owner is a missed deadline nobody saw coming.",
          )}
        </p>
        <div className="mt-8">
          <Paso href="/demos/pqrsd/bandeja">{t("Volver a la bandeja", "Back to the inbox")}</Paso>
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
  const store = useDemoStore<Radicado>("pqrsd", radicados);
  const r = resumenBandeja(store.items, new Date());
  const cumplimiento = r.total ? Math.round((r.cerrados / r.total) * 100) : 0;

  return (
    <section className="pt-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Cifra valor={r.vencidos} etiqueta={t("Vencidos", "Overdue")} tono="alerta" />
        <Cifra valor={r.sinResponsable} etiqueta={t("Sin responsable", "No owner")} tono="aviso" />
        <Cifra
          valor={`${r.promedioDias} d`}
          etiqueta={t("Promedio de respuesta", "Average response")}
          nota={t("En días hábiles, sobre los cerrados", "In business days, over closed requests")}
        />
        <Cifra valor={`${cumplimiento}%`} etiqueta={t("Respondidos del total", "Answered of total")} />
      </div>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="min-w-0">
          <div className="flex items-baseline gap-5">
            <span className="label text-fg/55">{t("Abiertos por dependencia", "Open by department")}</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="mt-6">
            <Tabla
              head={t(
                ["Dependencia", "Abiertos", "Vencidos", "Sin responsable", "Estado"],
                ["Department", "Open", "Overdue", "No owner", "Status"],
              )}
            >
              {r.porDependencia.map((d) => (
                <Fila key={d.dependencia}>
                  <Celda className="text-fg">{dato(d.dependencia)}</Celda>
                  <Celda>{d.total}</Celda>
                  <Celda className={d.vencidos ? "text-alerta" : ""}>{d.vencidos}</Celda>
                  <Celda className={d.sinResponsable ? "text-aviso" : ""}>{d.sinResponsable}</Celda>
                  <Celda>
                    <Pill tono={d.vencidos ? "alerta" : d.sinResponsable ? "aviso" : "ok"}>
                      {d.vencidos
                        ? t("Incumpliendo", "Missing deadlines")
                        : d.sinResponsable
                          ? t("En riesgo", "At risk")
                          : t("Al día", "Up to date")}
                    </Pill>
                  </Celda>
                </Fila>
              ))}
            </Tabla>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <Aviso titulo={t("Por qué «sin responsable» va tan grande", "Why “no owner” is shown so large")}>
            {t(
              "Es el dato que ninguna entidad tiene hoy y el que más incomoda en la reunión, en el buen sentido. Vencidos ya duele; sin responsable es el vencimiento del mes que viene.",
              "It's the figure no entity has today and the one that makes the meeting most uncomfortable, in a good way. Overdue already hurts; no owner is next month's missed deadline.",
            )}
          </Aviso>
          <Aviso titulo={t("El promedio no es el indicador", "The average isn't the indicator")}>
            {t(
              `Un promedio de ${r.promedioDias} días hábiles puede convivir con cuatro radicados vencidos. Por eso el tablero abre con el conteo de incumplidos y no con el promedio, que siempre se ve bien.`,
              `An average of ${r.promedioDias} business days can coexist with four overdue requests. That's why the dashboard opens with the count of missed deadlines and not with the average, which always looks good.`,
            )}
          </Aviso>
        </div>
      </div>
    </section>
  );
}
