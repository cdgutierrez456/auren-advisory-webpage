"use client";

import { useMemo, useState } from "react";
import {
  Aviso,
  Boton,
  Celda,
  Cifra,
  Fila,
  Paso,
  Pill,
  Seleccion,
  SoloCliente,
  Tabla,
  type Tono,
  useDato,
  useFormato,
} from "@/components/demo-ui";
import { TERMINOS, type Radicado, entidad, radicados } from "@/content/terminos";
import { useDemoStore } from "@/lib/demo-store";
import { useLang, useT } from "@/lib/use-lang";
import {
  PALABRA_TERMINO,
  PALABRA_TERMINO_EN,
  type Semaforo,
  evaluarRadicado,
  porTermino,
  resumenBandeja,
} from "@/lib/terminos";

/**
 * Bandeja del funcionario. Es la pantalla con la que se abre la reunión: tres
 * filas en rojo y la pregunta "¿quién responde por esta?".
 */
const TONO: Record<Semaforo, Tono> = {
  vencido: "alerta",
  critico: "aviso",
  atencion: "aviso",
  "en-termino": "neutro",
  cerrado: "ok",
};

/** La palabra del semáforo en el idioma de la página. Estado = color MÁS palabra. */
const usePalabra = () => (useLang() === "en" ? PALABRA_TERMINO_EN : PALABRA_TERMINO);

export default function Bandeja() {
  const t = useT();
  return (
    <>
      <header className="border-b border-line pb-10">
        <span className="label text-fg/40">Demo · PQRSD</span>
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-normal tracking-tight text-fg md:text-5xl">
          {t("Bandeja con semáforo de términos", "Inbox with a deadline traffic light")}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-fg/75">
          {t(
            "Ordenada por urgencia, no por fecha de radicación. Los días que se muestran son hábiles: descuentan fines de semana y festivos colombianos. Toque cualquier fila para asignarla o responderla.",
            "Sorted by urgency, not by filing date. The days shown are business days: weekends and Colombian holidays are excluded. Tap any row to assign it or respond to it.",
          )}
        </p>
        <div className="mt-8 flex flex-wrap gap-8">
          <Paso href="/demos/pqrsd">{t("Radicar una solicitud nueva", "File a new request")}</Paso>
          <Paso href="/demos/pqrsd/tablero">
            {t("Ver el tablero de gestión", "See the management dashboard")}
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
  const palabra = usePalabra();
  const { fechaCorta } = useFormato();
  const ESTADOS = [
    { valor: "todos", texto: t("Todos los estados", "All statuses") },
    { valor: "vencido", texto: t("Vencidos", "Overdue") },
    { valor: "critico", texto: t("Críticos", "Critical") },
    { valor: "atencion", texto: t("En atención", "Attention") },
    { valor: "en-termino", texto: t("En término", "On time") },
    { valor: "cerrado", texto: t("Cerrados", "Closed") },
    { valor: "sin-responsable", texto: t("Sin responsable", "No owner") },
  ];
  const store = useDemoStore<Radicado>("pqrsd", radicados);
  const hoy = new Date();
  const [dependencia, setDependencia] = useState("todas");
  const [estado, setEstado] = useState("todos");
  const [activo, setActivo] = useState<string | null>(null);

  const responsables = useMemo(
    () => [...new Set(radicados.map((r) => r.responsable).filter((x): x is string => x !== null))],
    [],
  );

  const resumen = resumenBandeja(store.items, hoy);
  const lista = porTermino(store.items, hoy).filter((r) => {
    if (dependencia !== "todas" && r.dependencia !== dependencia) return false;
    if (estado === "todos") return true;
    const e = evaluarRadicado(r, hoy);
    if (estado === "sin-responsable") return e.sinResponsable && e.semaforo !== "cerrado";
    return e.semaforo === estado;
  });

  const seleccionado = store.items.find((r) => r.numero === activo) ?? null;

  return (
    <section className="pt-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Cifra valor={resumen.vencidos} etiqueta={t("Radicados vencidos", "Overdue requests")} tono="alerta" />
        <Cifra
          valor={resumen.criticos}
          etiqueta={t("Vencen en 2 días o menos", "Due in 2 days or less")}
          tono="aviso"
        />
        <Cifra
          valor={resumen.sinResponsable}
          etiqueta={t("Sin responsable asignado", "No owner assigned")}
          tono="aviso"
          nota={t("El dato que ninguna entidad tiene hoy", "The figure no entity has today")}
        />
        <Cifra valor={resumen.abiertos} etiqueta={t("Abiertos en total", "Open in total")} />
      </div>

      <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:w-2/3">
        <Seleccion
          etiqueta={t("Dependencia", "Department")}
          value={dependencia}
          onChange={(e) => setDependencia(e.target.value)}
          opciones={[
            { valor: "todas", texto: t("Todas las dependencias", "All departments") },
            ...entidad.dependencias.map((d) => ({ valor: d, texto: dato(d) })),
          ]}
        />
        <Seleccion
          etiqueta={t("Estado", "Status")}
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          opciones={ESTADOS}
        />
      </div>

      <div className="mt-10 grid gap-12 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0">
          <Tabla
            head={t(
              ["Radicado", "Asunto", "Dependencia", "Responsable", "Vence", "Restan", "Estado"],
              ["Request", "Subject", "Department", "Owner", "Due", "Left", "Status"],
            )}
          >
            {lista.map((r) => {
              const e = evaluarRadicado(r, hoy);
              return (
                <Fila
                  key={r.numero}
                  activa={r.numero === activo}
                  onClick={() => setActivo(r.numero === activo ? null : r.numero)}
                >
                  <Celda className="whitespace-nowrap font-mono text-fg">{r.numero}</Celda>
                  <Celda className="max-w-72">
                    <span className="line-clamp-1">{dato(r.asunto)}</span>
                    <span className="text-xs text-fg/40">{dato(TERMINOS[r.tipo].etiqueta)}</span>
                  </Celda>
                  <Celda className="whitespace-nowrap text-fg/55">{dato(r.dependencia)}</Celda>
                  <Celda className="whitespace-nowrap">
                    {r.responsable ?? <span className="text-aviso">{t("Sin asignar", "Unassigned")}</span>}
                  </Celda>
                  <Celda className="whitespace-nowrap text-fg/55">
                    {fechaCorta(e.limite.toISOString())}
                  </Celda>
                  <Celda className="whitespace-nowrap">
                    {e.semaforo === "cerrado" ? (
                      <span className="text-fg/40">—</span>
                    ) : (
                      <span
                        className={
                          e.restantes < 0 ? "text-alerta" : e.restantes <= 5 ? "text-aviso" : "text-fg/75"
                        }
                      >
                        {e.restantes < 0
                          ? t(`${Math.abs(e.restantes)} d de mora`, `${Math.abs(e.restantes)} d late`)
                          : t(`${e.restantes} d hábiles`, `${e.restantes} business d`)}
                      </span>
                    )}
                  </Celda>
                  <Celda>
                    <Pill tono={TONO[e.semaforo]}>{palabra[e.semaforo]}</Pill>
                  </Celda>
                </Fila>
              );
            })}
          </Tabla>
          {lista.length === 0 ? (
            <p className="py-10 text-sm text-fg/55">
              {t("Ningún radicado con ese filtro.", "No requests match that filter.")}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-8">
          {seleccionado ? (
            <Detalle
              radicado={seleccionado}
              responsables={responsables}
              hoy={hoy}
              onAsignar={(responsable) =>
                store.actualizar((r) => r.numero === seleccionado.numero, { responsable })
              }
              onResponder={() =>
                store.actualizar((r) => r.numero === seleccionado.numero, {
                  respondidoEn: new Date().toISOString(),
                })
              }
            />
          ) : (
            <div className="glass rounded-card p-8">
              <p className="label text-fg/40">{t("Detalle del radicado", "Request details")}</p>
              <p className="mt-5 text-sm leading-relaxed text-fg/75">
                {t(
                  "Toque una fila para ver su trazabilidad, asignarle responsable y registrar la respuesta. Empiece por una fila roja: son las que ya están incumplidas.",
                  "Tap a row to see its trail, assign an owner and record the response. Start with a red row: those are already past due.",
                )}
              </p>
            </div>
          )}

          <Aviso titulo={t("Umbrales configurables", "Configurable thresholds")}>
            {t(
              "Crítico son 2 días hábiles o menos y atención son 5. Son constantes en un archivo, no reglas del proveedor: la entidad que quiera seguimiento desde el día 8 lo cambia en una línea.",
              "Critical is 2 business days or less and attention is 5. They're constants in a file, not vendor rules: an entity that wants follow-up from day 8 changes it in one line.",
            )}
          </Aviso>
        </div>
      </div>
    </section>
  );
}

function Detalle({
  radicado,
  responsables,
  hoy,
  onAsignar,
  onResponder,
}: {
  radicado: Radicado;
  responsables: string[];
  hoy: Date;
  onAsignar: (responsable: string) => void;
  onResponder: () => void;
}) {
  const t = useT();
  const dato = useDato();
  const palabra = usePalabra();
  const { fechaCorta } = useFormato();
  const e = evaluarRadicado(radicado, hoy);
  const cerrado = e.semaforo === "cerrado";
  const habiles = t("días hábiles", "business days");

  return (
    <div className="glass rounded-card p-8">
      <p className="font-mono text-2xl text-fg">{radicado.numero}</p>
      <p className="mt-3 text-pretty leading-relaxed text-fg/90">{dato(radicado.asunto)}</p>

      <dl className="mt-8 flex flex-col gap-3 text-sm">
        {[
          [t("Tipo", "Type"), dato(TERMINOS[radicado.tipo].etiqueta)],
          [t("Peticionario", "Petitioner"), radicado.peticionario],
          [t("Canal", "Channel"), dato(radicado.canal)],
          [t("Dependencia", "Department"), dato(radicado.dependencia)],
          [t("Radicado el", "Filed on"), fechaCorta(radicado.radicadoEn)],
          [t("Término", "Deadline"), `${TERMINOS[radicado.tipo].dias} ${habiles}`],
          [t("Vence el", "Due"), fechaCorta(e.limite.toISOString())],
          [
            cerrado ? t("Respondido el", "Answered on") : t("Estado", "Status"),
            cerrado
              ? `${fechaCorta(radicado.respondidoEn ?? "")} · ${e.diasUsados} ${habiles}`
              : `${palabra[e.semaforo]} · ${e.restantes} ${habiles}`,
          ],
          radicado.prorrogado
            ? [
                t("Prórroga", "Extension"),
                t(
                  "Registrada (el nuevo plazo es alcance de piloto)",
                  "Recorded (the new deadline is pilot scope)",
                ),
              ]
            : null,
        ]
          .filter((x): x is string[] => x !== null)
          .map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 border-b border-line pb-2.5">
              <dt className="label text-fg/40">{k}</dt>
              <dd className="text-right capitalize text-fg/90">{v}</dd>
            </div>
          ))}
      </dl>

      {cerrado ? (
        <p className="mt-8 text-sm text-fg/55">
          {t(
            "Cerrado. Sale de la bandeja activa y entra al promedio de tiempo de respuesta del tablero.",
            "Closed. It leaves the active inbox and goes into the dashboard's average response time.",
          )}
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          <Seleccion
            etiqueta={t("Responsable", "Owner")}
            value={radicado.responsable ?? ""}
            onChange={(ev) => onAsignar(ev.target.value)}
            opciones={[
              { valor: "", texto: t("Sin asignar", "Unassigned") },
              ...responsables.map((r) => ({ valor: r, texto: r })),
            ]}
          />
          <Boton variante="lima" onClick={onResponder} disabled={!radicado.responsable}>
            {t("Registrar respuesta", "Record response")}
          </Boton>
          {radicado.responsable ? null : (
            <p className="text-sm text-aviso">
              {t(
                "Sin responsable no se puede cerrar: alguien tiene que firmar la respuesta. Asígnelo arriba.",
                "It can't be closed without an owner: someone has to sign the response. Assign one above.",
              )}
            </p>
          )}
          <p className="text-xs leading-relaxed text-fg/55">
            {t(
              "En el piloto esto adjunta el oficio de respuesta y lo notifica al peticionario. Aquí solo cierra el término, que es lo que se está demostrando.",
              "In the pilot this attaches the response letter and notifies the petitioner. Here it only closes the deadline, which is what's being demonstrated.",
            )}
          </p>
        </div>
      )}
    </div>
  );
}
