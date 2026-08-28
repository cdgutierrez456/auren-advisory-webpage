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
  fechaCorta,
} from "@/components/demo-ui";
import { TERMINOS, type Radicado, entidad, radicados } from "@/content/terminos";
import { useDemoStore } from "@/lib/demo-store";
import {
  PALABRA_TERMINO,
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

export default function Bandeja() {
  return (
    <>
      <header className="border-b border-rule pb-10">
        <span className="label text-deep/45">Demo · PQRSD</span>
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-normal tracking-tight text-deep md:text-5xl">
          Bandeja con semáforo de términos
        </h1>
        <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-deep/70">
          Ordenada por urgencia, no por fecha de radicación. Los días que se
          muestran son hábiles: descuentan fines de semana y festivos
          colombianos. Toque cualquier fila para asignarla o responderla.
        </p>
        <div className="mt-8 flex flex-wrap gap-8">
          <Paso href="/demos/pqrsd">Radicar una solicitud nueva</Paso>
          <Paso href="/demos/pqrsd/tablero">Ver el tablero de gestión</Paso>
        </div>
      </header>

      <SoloCliente>
        <Contenido />
      </SoloCliente>
    </>
  );
}

const ESTADOS = [
  { valor: "todos", texto: "Todos los estados" },
  { valor: "vencido", texto: "Vencidos" },
  { valor: "critico", texto: "Críticos" },
  { valor: "atencion", texto: "En atención" },
  { valor: "en-termino", texto: "En término" },
  { valor: "cerrado", texto: "Cerrados" },
  { valor: "sin-responsable", texto: "Sin responsable" },
];

function Contenido() {
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
        <Cifra valor={resumen.vencidos} etiqueta="Radicados vencidos" tono="alerta" />
        <Cifra valor={resumen.criticos} etiqueta="Vencen en 2 días o menos" tono="aviso" />
        <Cifra
          valor={resumen.sinResponsable}
          etiqueta="Sin responsable asignado"
          tono="aviso"
          nota="El dato que ninguna entidad tiene hoy"
        />
        <Cifra valor={resumen.abiertos} etiqueta="Abiertos en total" />
      </div>

      <div className="mt-12 grid gap-8 border-t border-rule pt-8 sm:grid-cols-2 lg:w-2/3">
        <Seleccion
          etiqueta="Dependencia"
          value={dependencia}
          onChange={(e) => setDependencia(e.target.value)}
          opciones={[
            { valor: "todas", texto: "Todas las dependencias" },
            ...entidad.dependencias.map((d) => ({ valor: d, texto: d })),
          ]}
        />
        <Seleccion
          etiqueta="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          opciones={ESTADOS}
        />
      </div>

      <div className="mt-10 grid gap-12 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0">
          <Tabla head={["Radicado", "Asunto", "Dependencia", "Responsable", "Vence", "Restan", "Estado"]}>
            {lista.map((r) => {
              const e = evaluarRadicado(r, hoy);
              return (
                <Fila
                  key={r.numero}
                  activa={r.numero === activo}
                  onClick={() => setActivo(r.numero === activo ? null : r.numero)}
                >
                  <Celda className="whitespace-nowrap font-mono text-deep">{r.numero}</Celda>
                  <Celda className="max-w-72">
                    <span className="line-clamp-1">{r.asunto}</span>
                    <span className="text-xs text-deep/45">{TERMINOS[r.tipo].etiqueta}</span>
                  </Celda>
                  <Celda className="whitespace-nowrap text-deep/60">{r.dependencia}</Celda>
                  <Celda className="whitespace-nowrap">
                    {r.responsable ?? <span className="text-aviso">Sin asignar</span>}
                  </Celda>
                  <Celda className="whitespace-nowrap text-deep/60">
                    {fechaCorta(e.limite.toISOString())}
                  </Celda>
                  <Celda className="whitespace-nowrap">
                    {e.semaforo === "cerrado" ? (
                      <span className="text-deep/40">—</span>
                    ) : (
                      <span
                        className={
                          e.restantes < 0 ? "text-alerta" : e.restantes <= 5 ? "text-aviso" : "text-deep/70"
                        }
                      >
                        {e.restantes < 0
                          ? `${Math.abs(e.restantes)} d de mora`
                          : `${e.restantes} d hábiles`}
                      </span>
                    )}
                  </Celda>
                  <Celda>
                    <Pill tono={TONO[e.semaforo]}>{PALABRA_TERMINO[e.semaforo]}</Pill>
                  </Celda>
                </Fila>
              );
            })}
          </Tabla>
          {lista.length === 0 ? (
            <p className="py-10 text-sm text-deep/50">Ningún radicado con ese filtro.</p>
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
            <div className="border border-rule bg-paper p-8">
              <p className="label text-deep/45">Detalle del radicado</p>
              <p className="mt-5 text-sm leading-relaxed text-deep/70">
                Toque una fila para ver su trazabilidad, asignarle responsable
                y registrar la respuesta. Empiece por una fila roja: son las
                que ya están incumplidas.
              </p>
            </div>
          )}

          <Aviso titulo="Umbrales configurables">
            Crítico son 2 días hábiles o menos y atención son 5. Son constantes
            en un archivo, no reglas del proveedor: la entidad que quiera
            seguimiento desde el día 8 lo cambia en una línea.
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
  const e = evaluarRadicado(radicado, hoy);
  const cerrado = e.semaforo === "cerrado";

  return (
    <div className="border-t-2 border-deep bg-paper p-8">
      <p className="font-mono text-2xl text-deep">{radicado.numero}</p>
      <p className="mt-3 text-pretty leading-relaxed text-deep/80">{radicado.asunto}</p>

      <dl className="mt-8 flex flex-col gap-3 text-sm">
        {[
          ["Tipo", TERMINOS[radicado.tipo].etiqueta],
          ["Peticionario", radicado.peticionario],
          ["Canal", radicado.canal],
          ["Dependencia", radicado.dependencia],
          ["Radicado el", fechaCorta(radicado.radicadoEn)],
          ["Término", `${TERMINOS[radicado.tipo].dias} días hábiles`],
          ["Vence el", fechaCorta(e.limite.toISOString())],
          [
            cerrado ? "Respondido el" : "Estado",
            cerrado
              ? `${fechaCorta(radicado.respondidoEn ?? "")} · ${e.diasUsados} días hábiles`
              : `${PALABRA_TERMINO[e.semaforo]} · ${e.restantes} días hábiles`,
          ],
          radicado.prorrogado ? ["Prórroga", "Registrada (el nuevo plazo es alcance de piloto)"] : null,
        ]
          .filter((x): x is string[] => x !== null)
          .map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 border-b border-rule pb-2.5">
              <dt className="label text-deep/45">{k}</dt>
              <dd className="text-right capitalize text-deep/80">{v}</dd>
            </div>
          ))}
      </dl>

      {cerrado ? (
        <p className="mt-8 text-sm text-deep/60">
          Cerrado. Sale de la bandeja activa y entra al promedio de tiempo de
          respuesta del tablero.
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          <Seleccion
            etiqueta="Responsable"
            value={radicado.responsable ?? ""}
            onChange={(ev) => onAsignar(ev.target.value)}
            opciones={[
              { valor: "", texto: "Sin asignar" },
              ...responsables.map((r) => ({ valor: r, texto: r })),
            ]}
          />
          <Boton variante="lima" onClick={onResponder} disabled={!radicado.responsable}>
            Registrar respuesta
          </Boton>
          {radicado.responsable ? null : (
            <p className="text-sm text-aviso">
              Sin responsable no se puede cerrar: alguien tiene que firmar la
              respuesta. Asígnelo arriba.
            </p>
          )}
          <p className="text-xs leading-relaxed text-deep/50">
            En el piloto esto adjunta el oficio de respuesta y lo notifica al
            peticionario. Aquí solo cierra el término, que es lo que se está
            demostrando.
          </p>
        </div>
      )}
    </div>
  );
}
