"use client";

import { useState } from "react";
import {
  Aviso,
  Boton,
  DemoHeader,
  Deslizador,
  SoloCliente,
  numero,
  pesos,
} from "@/components/demo-ui";
import { site } from "@/content/site";
import { BASE, costoAnual } from "@/lib/demos";

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
  const [tarea, setTarea] = useState("consolidar reportes en Excel");
  const [personas, setPersonas] = useState(3);
  const [horasSemana, setHorasSemana] = useState(6);
  const [salarioMensual, setSalarioMensual] = useState(2_800_000);

  const r = costoAnual({ personas, horasSemana, salarioMensual });

  const mensaje = encodeURIComponent(
    [
      `Hola ${site.name}, calculé el costo de una tarea manual con su calculadora.`,
      "",
      `Tarea: ${tarea}`,
      `Personas: ${personas} · Horas por semana c/u: ${horasSemana}`,
      `Costo estimado al año: ${pesos(r.anual)}`,
      `Equivale a ${r.equivalente} personas a tiempo completo.`,
      "",
      "Quiero ver qué se puede quitar de ahí.",
    ].join("\n"),
  );

  return (
    <section className="grid gap-14 pt-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
      <div className="flex flex-col gap-9">
        <label className="flex flex-col gap-2.5">
          <span className="label text-fg/40">La tarea que se repite</span>
          <input
            value={tarea}
            onChange={(e) => setTarea(e.target.value)}
            className="w-full border-b border-line-strong bg-transparent py-3.5 text-fg outline-none transition-colors focus:border-lime"
          />
        </label>

        <Deslizador
          etiqueta="Personas que la hacen"
          valor={personas}
          min={1}
          max={40}
          onCambio={setPersonas}
        />
        <Deslizador
          etiqueta="Horas por semana, cada una"
          valor={horasSemana}
          sufijo=" h"
          min={1}
          max={40}
          onCambio={setHorasSemana}
        />
        <Deslizador
          etiqueta="Salario mensual promedio"
          valor={salarioMensual / 1_000_000}
          sufijo=" M"
          min={1.4}
          max={12}
          paso={0.1}
          onCambio={(v) => setSalarioMensual(Math.round(v * 1_000_000))}
        />

        <div className="border-t border-line pt-6">
          <p className="label text-fg/40">Base de cálculo, a la vista</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-fg/55">
            <li>{BASE.semanasMes} semanas por mes.</li>
            <li>{BASE.horasMes} horas mensuales para el valor de la hora.</li>
            <li>{numero(BASE.horasAnoPersona)} horas al año por persona a tiempo completo.</li>
            <li className="text-fg/55">Valor de la hora resultante: {pesos(r.valorHora)}.</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="glass rounded-card p-10 text-fg">
          <p className="label text-accent">Costo anual de {tarea}</p>
          <p className="tnum mt-6 font-serif text-6xl leading-none text-accent [text-shadow:0_0_44px_rgba(200,241,105,0.4)]">{pesos(r.anual)}</p>
          <p className="mt-6 text-pretty leading-relaxed text-fg/60">
            Son {numero(r.horasAnuales)} horas al año — el equivalente a{" "}
            <b className="text-fg">{r.equivalente} personas a tiempo completo</b> dedicadas solo
            a eso.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-8">
            <div>
              <p className="font-serif text-3xl">{pesos(r.mensual)}</p>
              <p className="label mt-2 text-fg/55">Al mes</p>
            </div>
            <div>
              <p className="font-serif text-3xl">{numero(r.horasMes)} h</p>
              <p className="label mt-2 text-fg/55">Al mes</p>
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
            Enviar esta cifra por WhatsApp
          </Boton>
          <span className="text-sm text-fg/55">Abre el chat con el cálculo dentro.</span>
        </div>

        <Aviso titulo="La cifra que falta es mayor">
          Esto solo cuenta el tiempo. No incluye los reprocesos, los errores que
          se detectan tarde ni las decisiones que se toman con el dato viejo.
          Cuando el cliente dice «pero es que además…», ahí empieza el
          diagnóstico.
        </Aviso>
      </div>
    </section>
  );
}
