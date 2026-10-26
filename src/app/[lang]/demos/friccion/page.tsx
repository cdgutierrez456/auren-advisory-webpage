"use client";

import { useState } from "react";
import {
  Aviso,
  Boton,
  DemoHeader,
  Deslizador,
  SoloCliente,
  useFormato,
} from "@/components/demo-ui";
import { site } from "@/content/site";
import { BASE, costoAnual } from "@/lib/demos";
import { useT } from "@/lib/use-lang";

/**
 * Bonus — Calculadora de costo de la fricción.
 *
 * Demo de Auren Insight y pieza de captación en la misma pantalla: el
 * resultado se convierte en un mensaje de WhatsApp con la cifra dentro. El
 * lead es la conversación, no un registro en una base de datos que nadie mira.
 */
export default function Friccion() {
  return (
    <>
      <DemoHeader slug="friccion" />
      <SoloCliente>
        <Calculadora />
      </SoloCliente>
    </>
  );
}

function Calculadora() {
  const t = useT();
  const { numero, pesos } = useFormato();
  const [tarea, setTarea] = useState(() =>
    t("consolidar reportes en Excel", "consolidating reports in Excel"),
  );
  const [personas, setPersonas] = useState(3);
  const [horasSemana, setHorasSemana] = useState(6);
  const [salarioMensual, setSalarioMensual] = useState(2_800_000);

  const r = costoAnual({ personas, horasSemana, salarioMensual });

  const mensaje = encodeURIComponent(
    t(
      [
        `Hola ${site.name}, calculé el costo de una tarea manual con su calculadora.`,
        "",
        `Tarea: ${tarea}`,
        `Personas: ${personas} · Horas por semana c/u: ${horasSemana}`,
        `Costo estimado al año: ${pesos(r.anual)}`,
        `Equivale a ${r.equivalente} personas a tiempo completo.`,
        "",
        "Quiero ver qué se puede quitar de ahí.",
      ],
      [
        `Hi ${site.name}, I calculated the cost of a manual task with your calculator.`,
        "",
        `Task: ${tarea}`,
        `People: ${personas} · Hours per week each: ${horasSemana}`,
        `Estimated cost per year: ${pesos(r.anual)}`,
        `Equivalent to ${r.equivalente} full-time people.`,
        "",
        "I'd like to see what can be taken out of it.",
      ],
    ).join("\n"),
  );

  return (
    <section className="grid gap-14 pt-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
      <div className="flex flex-col gap-9">
        <label className="flex flex-col gap-2.5">
          <span className="label text-fg/40">{t("La tarea que se repite", "The recurring task")}</span>
          <input
            value={tarea}
            onChange={(e) => setTarea(e.target.value)}
            className="w-full border-b border-line-strong bg-transparent py-3.5 text-fg outline-none transition-colors focus:border-lime"
          />
        </label>

        <Deslizador
          etiqueta={t("Personas que la hacen", "People who do it")}
          valor={personas}
          min={1}
          max={40}
          onCambio={setPersonas}
        />
        <Deslizador
          etiqueta={t("Horas por semana, cada una", "Hours per week, each")}
          valor={horasSemana}
          sufijo=" h"
          min={1}
          max={40}
          onCambio={setHorasSemana}
        />
        <Deslizador
          etiqueta={t("Salario mensual promedio", "Average monthly salary")}
          valor={salarioMensual / 1_000_000}
          sufijo=" M"
          min={1.4}
          max={12}
          paso={0.1}
          onCambio={(v) => setSalarioMensual(Math.round(v * 1_000_000))}
        />

        <div className="border-t border-line pt-6">
          <p className="label text-fg/40">{t("Base de cálculo, a la vista", "Calculation basis, in plain view")}</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-fg/55">
            <li>{t(`${BASE.semanasMes} semanas por mes.`, `${BASE.semanasMes} weeks per month.`)}</li>
            <li>
              {t(
                `${BASE.horasMes} horas mensuales para el valor de la hora.`,
                `${BASE.horasMes} monthly hours for the hourly rate.`,
              )}
            </li>
            <li>
              {t(
                `${numero(BASE.horasAnoPersona)} horas al año por persona a tiempo completo.`,
                `${numero(BASE.horasAnoPersona)} hours a year per full-time person.`,
              )}
            </li>
            <li className="text-fg/55">
              {t("Valor de la hora resultante:", "Resulting hourly rate:")} {pesos(r.valorHora)}.
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="glass rounded-card p-10 text-fg">
          <p className="label text-accent">
            {t("Costo anual de", "Annual cost of")} {tarea}
          </p>
          <p className="tnum mt-6 font-serif text-6xl leading-none text-accent [text-shadow:0_0_44px_rgba(200,241,105,0.4)]">{pesos(r.anual)}</p>
          <p className="mt-6 text-pretty leading-relaxed text-fg/60">
            {t(
              <>
                Son {numero(r.horasAnuales)} horas al año — el equivalente a{" "}
                <b className="text-fg">{r.equivalente} personas a tiempo completo</b> dedicadas solo
                a eso.
              </>,
              <>
                That's {numero(r.horasAnuales)} hours a year — the equivalent of{" "}
                <b className="text-fg">{r.equivalente} full-time people</b> doing nothing else.
              </>,
            )}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-8">
            <div>
              <p className="font-serif text-3xl">{pesos(r.mensual)}</p>
              <p className="label mt-2 text-fg/55">{t("Al mes", "Per month")}</p>
            </div>
            <div>
              <p className="font-serif text-3xl">{numero(r.horasMes)} h</p>
              <p className="label mt-2 text-fg/55">{t("Al mes", "Per month")}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Boton
            variante="lima"
            onClick={() =>
              window.open(
                `https://wa.me/${site.whatsapp}?text=${mensaje}`,
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            {t("Enviar esta cifra por WhatsApp", "Send this figure via WhatsApp")}
          </Boton>
          <span className="text-sm text-fg/55">
            {t("Abre el chat con el cálculo dentro.", "Opens the chat with the calculation inside.")}
          </span>
        </div>

        <Aviso titulo={t("La cifra que falta es mayor", "The missing figure is bigger")}>
          {t(
            "Esto solo cuenta el tiempo. No incluye los reprocesos, los errores que se detectan tarde ni las decisiones que se toman con el dato viejo. Cuando el cliente dice «pero es que además…», ahí empieza el diagnóstico.",
            "This only counts time. It doesn't include rework, errors caught late or decisions made on stale data. When the client says “but on top of that…”, that's where the diagnosis begins.",
          )}
        </Aviso>
      </div>
    </section>
  );
}
