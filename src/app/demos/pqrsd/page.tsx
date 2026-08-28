"use client";

import { type FormEvent, useState } from "react";
import {
  AreaTexto,
  Aviso,
  Boton,
  Campo,
  DemoHeader,
  Paso,
  Seleccion,
  SoloCliente,
  fechaCorta,
} from "@/components/demo-ui";
import { TERMINOS, type Radicado, type TipoPQRSD, entidad, radicados } from "@/content/terminos";
import { useDemoStore } from "@/lib/demo-store";
import { siguienteNumero, sumarHabiles } from "@/lib/terminos";

/**
 * Demo 2 — Radicación ciudadana.
 *
 * La reunión no empieza aquí: empieza en la bandeja, con tres filas en rojo.
 * Este formulario se muestra después, cuando el funcionario ya quiere saber
 * cómo entra la petición y desde cuándo corre el término.
 */
export default function PQRSD() {
  return (
    <>
      <DemoHeader slug="pqrsd">
        <div className="flex flex-wrap gap-8">
          <Paso href="/demos/pqrsd/bandeja">Ir a la bandeja del funcionario</Paso>
          <Paso href="/demos/pqrsd/tablero">Ver el tablero de gestión</Paso>
        </div>
      </DemoHeader>
      <SoloCliente>
        <Formulario />
      </SoloCliente>
    </>
  );
}

const TIPOS = (Object.keys(TERMINOS) as TipoPQRSD[]).map((t) => ({
  valor: t,
  texto: `${TERMINOS[t].etiqueta} · ${TERMINOS[t].dias} días hábiles`,
}));

const CANALES = [
  { valor: "web", texto: "Portal web" },
  { valor: "presencial", texto: "Ventanilla presencial" },
  { valor: "telefonico", texto: "Telefónico" },
  { valor: "correo", texto: "Correo electrónico" },
] as const;

function Formulario() {
  const store = useDemoStore<Radicado>("pqrsd", radicados);
  const [tipo, setTipo] = useState<TipoPQRSD>("peticion");
  const [acuse, setAcuse] = useState<Radicado | null>(null);
  const [error, setError] = useState("");

  function radicar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    const asunto = String(datos.get("asunto") ?? "").trim();
    const peticionario = String(datos.get("peticionario") ?? "").trim();

    if (asunto.length < 5 || peticionario.length < 3) {
      setError("Indique quién radica y de qué se trata: son los dos datos que el término necesita.");
      return;
    }

    const nuevo: Radicado = {
      numero: siguienteNumero(store.items),
      tipo,
      asunto,
      peticionario,
      canal: String(datos.get("canal") ?? "web") as Radicado["canal"],
      dependencia: String(datos.get("dependencia") ?? entidad.dependencias[0]),
      // Sin asignar a propósito: así es como entra de verdad, y así es como se
      // vence sin que nadie lo vea venir.
      responsable: null,
      radicadoEn: new Date().toISOString(),
      respondidoEn: null,
      prorrogado: false,
    };

    store.agregar(nuevo);
    setAcuse(nuevo);
    setError("");
    e.currentTarget.reset();
  }

  const limite = sumarHabiles(new Date(), TERMINOS[tipo].dias);

  return (
    <section className="grid gap-14 pt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
      <div>
        <p className="label text-deep/45">{entidad.nombre}</p>
        <h2 className="mt-5 text-3xl font-normal tracking-tight text-deep">
          Radique su petición, queja, reclamo, sugerencia o denuncia
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-deep/60">
          El término empieza a correr el día hábil siguiente al de radicación.
          Aquí abajo se ve, antes de enviar, hasta cuándo tiene la entidad para
          responder.
        </p>

        <form onSubmit={radicar} className="mt-10 flex flex-col gap-8">
          <Seleccion
            etiqueta="Tipo de solicitud"
            name="tipo"
            opciones={TIPOS}
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoPQRSD)}
          />
          <Campo etiqueta="Nombre del peticionario" name="peticionario" autoComplete="name" />
          <Campo etiqueta="Asunto" name="asunto" placeholder="De qué se trata, en una línea" />
          <AreaTexto etiqueta="Descripción" name="detalle" placeholder="El detalle de la solicitud." />
          <div className="grid gap-8 sm:grid-cols-2">
            <Seleccion
              etiqueta="Dependencia"
              name="dependencia"
              opciones={entidad.dependencias.map((d) => ({ valor: d, texto: d }))}
            />
            <Seleccion etiqueta="Canal de radicación" name="canal" opciones={CANALES} />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Boton type="submit" variante="lima">
              Radicar
            </Boton>
            <p className="text-sm text-deep/60" role="status">
              {error || `Vence el ${fechaCorta(limite.toISOString())}.`}
            </p>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-8">
        {acuse ? (
          <div className="border-t-2 border-ok bg-ok-suave p-8">
            <p className="label text-deep/50">Acuse de recibo</p>
            <p className="mt-5 font-mono text-4xl text-deep">{acuse.numero}</p>
            <dl className="mt-8 flex flex-col gap-4 text-sm">
              {[
                ["Tipo", TERMINOS[acuse.tipo].etiqueta],
                ["Término", `${TERMINOS[acuse.tipo].dias} días hábiles`],
                [
                  "Vence el",
                  fechaCorta(sumarHabiles(new Date(acuse.radicadoEn), TERMINOS[acuse.tipo].dias).toISOString()),
                ],
                ["Dependencia", acuse.dependencia],
                ["Responsable", "Sin asignar"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-rule pb-3">
                  <dt className="label text-deep/45">{k}</dt>
                  <dd className="text-right text-deep/80">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <Paso href="/demos/pqrsd/bandeja">Ver este radicado en la bandeja</Paso>
            </div>
          </div>
        ) : (
          <div className="border border-rule bg-paper p-8">
            <p className="label text-deep/45">Qué va a pasar al radicar</p>
            <ol className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-deep/75">
              <li className="border-l border-rule-strong pl-4">
                Se genera el consecutivo del año y se muestra el acuse en pantalla.
              </li>
              <li className="border-l border-rule-strong pl-4">
                El término se calcula en días hábiles, descontando fines de
                semana y festivos colombianos.
              </li>
              <li className="border-l border-rule-strong pl-4">
                Entra a la bandeja <b>sin responsable asignado</b>, arriba del
                todo. Así entra en la realidad.
              </li>
            </ol>
          </div>
        )}

        <Aviso titulo="Lo que este demo no afirma">
          No dice cuál es el término legal aplicable a un caso concreto: dice
          cuál es el término <em>configurado</em> y cuántos días hábiles
          quedan. Los valores están en un solo archivo, marcados para
          verificar su vigencia antes de cada reunión.
        </Aviso>
      </div>
    </section>
  );
}
