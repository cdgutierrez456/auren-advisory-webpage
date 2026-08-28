"use client";

import { useState } from "react";
import { Aviso, Campo, DemoHeader, Deslizador, SoloCliente } from "@/components/demo-ui";
import { VisionDemo } from "@/components/vision-demo";
import { calibracion, medidor } from "@/lib/vision/modos/medidor";

/**
 * Modo B — el cruce mecánica ↔ software. El mismo motor sirve en planta, en
 * el tanque de oxígeno del hospital y en la báscula del transportador: lo
 * único que cambia es la calibración.
 */
export default function Medidor() {
  return (
    <>
      <DemoHeader slug="vision/medidor" />
      <SoloCliente>
        <Pantalla />
      </SoloCliente>
    </>
  );
}

function Pantalla() {
  const [c, setC] = useState({ ...calibracion });

  /** La calibración es un objeto vivo que el modo lee en cada fotograma. */
  function ajustar(cambios: Partial<typeof c>) {
    Object.assign(calibracion, cambios);
    setC((prev) => ({ ...prev, ...cambios }));
  }

  return (
    <VisionDemo
      modo={medidor}
      controles={
        <>
          <p className="label text-deep/45">Calibración del instrumento</p>
          <Deslizador
            etiqueta="Ángulo del cero"
            valor={c.anguloMin}
            sufijo="°"
            min={90}
            max={315}
            paso={5}
            onCambio={(v) => ajustar({ anguloMin: v })}
          />
          <Deslizador
            etiqueta="Ángulo del fondo de escala"
            valor={c.anguloMax}
            sufijo="°"
            min={-135}
            max={90}
            paso={5}
            onCambio={(v) => ajustar({ anguloMax: v })}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <Campo
              etiqueta="Valor mínimo"
              type="number"
              value={c.valorMin}
              onChange={(e) => ajustar({ valorMin: Number(e.target.value) })}
            />
            <Campo
              etiqueta="Valor máximo"
              type="number"
              value={c.valorMax}
              onChange={(e) => ajustar({ valorMax: Number(e.target.value) })}
            />
          </div>
          <Campo
            etiqueta="Unidad"
            value={c.unidad}
            onChange={(e) => ajustar({ unidad: e.target.value })}
            ayuda="bar, PSI, m³/h, kg… la que diga el instrumento."
          />
          <Deslizador
            etiqueta="Corrección fina (offset)"
            valor={c.offset}
            min={-2}
            max={2}
            paso={0.1}
            onCambio={(v) => ajustar({ offset: v })}
          />
        </>
      }
    >
      <Aviso titulo="Calibrar delante del cliente ES la demostración">
        Cada manómetro tiene su escala, su cero mecánico y su aguja torcida.
        Ajustar los dos ángulos con su instrumento en la mano, y ver que el
        número coincide con lo que él lee, es exactamente el momento en que
        deja de ser un truco de software.
      </Aviso>
    </VisionDemo>
  );
}
