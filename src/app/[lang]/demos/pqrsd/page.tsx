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
  useDato,
  useFormato,
} from "@/components/demo-ui";
import { TERMINOS, type Radicado, type TipoPQRSD, entidad, radicados } from "@/content/terminos";
import { useDemoStore } from "@/lib/demo-store";
import { siguienteNumero, sumarHabiles } from "@/lib/terminos";
import { useT } from "@/lib/use-lang";

/**
 * Demo 2 — Radicación ciudadana.
 *
 * La reunión no empieza aquí: empieza en la bandeja, con tres filas en rojo.
 * Este formulario se muestra después, cuando el funcionario ya quiere saber
 * cómo entra la petición y desde cuándo corre el término.
 */
export default function PQRSD() {
  const t = useT();
  return (
    <>
      <DemoHeader slug="pqrsd">
        <div className="flex flex-wrap gap-8">
          <Paso href="/demos/pqrsd/bandeja">
            {t("Ir a la bandeja del funcionario", "Go to the officer's inbox")}
          </Paso>
          <Paso href="/demos/pqrsd/tablero">
            {t("Ver el tablero de gestión", "See the management dashboard")}
          </Paso>
        </div>
      </DemoHeader>
      <SoloCliente>
        <Formulario />
      </SoloCliente>
    </>
  );
}

function Formulario() {
  const t = useT();
  const dato = useDato();
  const { fechaCorta } = useFormato();
  const habiles = t("días hábiles", "business days");
  const TIPOS = (Object.keys(TERMINOS) as TipoPQRSD[]).map((tipo) => ({
    valor: tipo,
    texto: `${dato(TERMINOS[tipo].etiqueta)} · ${TERMINOS[tipo].dias} ${habiles}`,
  }));
  const CANALES = [
    { valor: "web", texto: t("Portal web", "Web portal") },
    { valor: "presencial", texto: t("Ventanilla presencial", "In-person window") },
    { valor: "telefonico", texto: t("Telefónico", "Phone") },
    { valor: "correo", texto: t("Correo electrónico", "Email") },
  ];

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
      setError(
        t(
          "Indique quién radica y de qué se trata: son los dos datos que el término necesita.",
          "Enter who is filing and what it's about: those are the two pieces of data the deadline needs.",
        ),
      );
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
        <p className="label text-fg/40">{dato(entidad.nombre)}</p>
        <h2 className="mt-5 text-3xl font-normal tracking-tight text-fg">
          {t(
            "Radique su petición, queja, reclamo, sugerencia o denuncia",
            "File your petition, complaint, claim, suggestion or report",
          )}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg/55">
          {t(
            "El término empieza a correr el día hábil siguiente al de radicación. Aquí abajo se ve, antes de enviar, hasta cuándo tiene la entidad para responder.",
            "The deadline starts running on the business day after filing. Below you can see, before sending, how long the entity has to respond.",
          )}
        </p>

        <form onSubmit={radicar} className="mt-10 flex flex-col gap-8">
          <Seleccion
            etiqueta={t("Tipo de solicitud", "Request type")}
            name="tipo"
            opciones={TIPOS}
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoPQRSD)}
          />
          <Campo
            etiqueta={t("Nombre del peticionario", "Petitioner's name")}
            name="peticionario"
            autoComplete="name"
          />
          <Campo
            etiqueta={t("Asunto", "Subject")}
            name="asunto"
            placeholder={t("De qué se trata, en una línea", "What it's about, in one line")}
          />
          <AreaTexto
            etiqueta={t("Descripción", "Description")}
            name="detalle"
            placeholder={t("El detalle de la solicitud.", "The details of the request.")}
          />
          <div className="grid gap-8 sm:grid-cols-2">
            <Seleccion
              etiqueta={t("Dependencia", "Department")}
              name="dependencia"
              opciones={entidad.dependencias.map((d) => ({ valor: d, texto: dato(d) }))}
            />
            <Seleccion etiqueta={t("Canal de radicación", "Filing channel")} name="canal" opciones={CANALES} />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Boton type="submit" variante="lima">
              {t("Radicar", "File")}
            </Boton>
            <p className="text-sm text-fg/55" role="status">
              {error || t(`Vence el ${fechaCorta(limite.toISOString())}.`, `Due ${fechaCorta(limite.toISOString())}.`)}
            </p>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-8">
        {acuse ? (
          <div className="rounded-card border-t-2 border-ok bg-ok-suave p-8">
            <p className="label text-fg/55">{t("Acuse de recibo", "Acknowledgment of receipt")}</p>
            <p className="mt-5 font-mono text-4xl text-fg">{acuse.numero}</p>
            <dl className="mt-8 flex flex-col gap-4 text-sm">
              {[
                [t("Tipo", "Type"), dato(TERMINOS[acuse.tipo].etiqueta)],
                [t("Término", "Deadline"), `${TERMINOS[acuse.tipo].dias} ${habiles}`],
                [
                  t("Vence el", "Due"),
                  fechaCorta(sumarHabiles(new Date(acuse.radicadoEn), TERMINOS[acuse.tipo].dias).toISOString()),
                ],
                [t("Dependencia", "Department"), dato(acuse.dependencia)],
                [t("Responsable", "Owner"), t("Sin asignar", "Unassigned")],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-line pb-3">
                  <dt className="label text-fg/40">{k}</dt>
                  <dd className="text-right text-fg/90">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <Paso href="/demos/pqrsd/bandeja">
                {t("Ver este radicado en la bandeja", "See this request in the inbox")}
              </Paso>
            </div>
          </div>
        ) : (
          <div className="glass rounded-card p-8">
            <p className="label text-fg/40">{t("Qué va a pasar al radicar", "What happens when you file")}</p>
            <ol className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-fg/75">
              <li className="border-l border-line-strong pl-4">
                {t(
                  "Se genera el consecutivo del año y se muestra el acuse en pantalla.",
                  "The year's sequential number is generated and the acknowledgment is shown on screen.",
                )}
              </li>
              <li className="border-l border-line-strong pl-4">
                {t(
                  "El término se calcula en días hábiles, descontando fines de semana y festivos colombianos.",
                  "The deadline is calculated in business days, excluding weekends and Colombian holidays.",
                )}
              </li>
              <li className="border-l border-line-strong pl-4">
                {t(
                  <>
                    Entra a la bandeja <b>sin responsable asignado</b>, arriba del todo. Así entra en la
                    realidad.
                  </>,
                  <>
                    It lands at the top of the inbox <b>with no owner assigned</b>. That's how it comes
                    in for real.
                  </>,
                )}
              </li>
            </ol>
          </div>
        )}

        <Aviso titulo={t("Lo que este demo no afirma", "What this demo doesn't claim")}>
          {t(
            <>
              No dice cuál es el término legal aplicable a un caso concreto: dice cuál es el término{" "}
              <em>configurado</em> y cuántos días hábiles quedan. Los valores están en un solo archivo,
              marcados para verificar su vigencia antes de cada reunión.
            </>,
            <>
              It doesn't say which legal deadline applies to a specific case: it says what the{" "}
              <em>configured</em> deadline is and how many business days are left. The values live in a
              single file, flagged to be checked for validity before every meeting.
            </>,
          )}
        </Aviso>
      </div>
    </section>
  );
}
