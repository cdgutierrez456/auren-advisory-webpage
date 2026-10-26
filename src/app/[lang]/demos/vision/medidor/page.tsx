"use client";

import { useState } from "react";
import { Aviso, Campo, DemoHeader, Deslizador, SoloCliente } from "@/components/demo-ui";
import { VisionDemo } from "@/components/vision-demo";
import { calibracion, medidor } from "@/lib/vision/modos/medidor";
import { useT } from "@/lib/use-lang";

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
  const t = useT();
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
          <p className="label text-fg/40">{t("Calibración del instrumento", "Instrument calibration")}</p>
          <Deslizador
            etiqueta={t("Ángulo del cero", "Zero angle")}
            valor={c.anguloMin}
            sufijo="°"
            min={90}
            max={315}
            paso={5}
            onCambio={(v) => ajustar({ anguloMin: v })}
          />
          <Deslizador
            etiqueta={t("Ángulo del fondo de escala", "Full-scale angle")}
            valor={c.anguloMax}
            sufijo="°"
            min={-135}
            max={90}
            paso={5}
            onCambio={(v) => ajustar({ anguloMax: v })}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <Campo
              etiqueta={t("Valor mínimo", "Minimum value")}
              type="number"
              value={c.valorMin}
              onChange={(e) => ajustar({ valorMin: Number(e.target.value) })}
            />
            <Campo
              etiqueta={t("Valor máximo", "Maximum value")}
              type="number"
              value={c.valorMax}
              onChange={(e) => ajustar({ valorMax: Number(e.target.value) })}
            />
          </div>
          <Campo
            etiqueta={t("Unidad", "Unit")}
            value={c.unidad}
            onChange={(e) => ajustar({ unidad: e.target.value })}
            ayuda={t(
              "bar, PSI, m³/h, kg… la que diga el instrumento.",
              "bar, PSI, m³/h, kg… whatever the instrument says.",
            )}
          />
          <Deslizador
            etiqueta={t("Corrección fina (offset)", "Fine correction (offset)")}
            valor={c.offset}
            min={-2}
            max={2}
            paso={0.1}
            onCambio={(v) => ajustar({ offset: v })}
          />
        </>
      }
    >
      <Aviso
        titulo={t(
          "Calibrar delante del cliente ES la demostración",
          "Calibrating in front of the client IS the demo",
        )}
      >
        {t(
          "Cada manómetro tiene su escala, su cero mecánico y su aguja torcida. Ajustar los dos ángulos con su instrumento en la mano, y ver que el número coincide con lo que él lee, es exactamente el momento en que deja de ser un truco de software.",
          "Every pressure gauge has its own scale, its own mechanical zero and its own bent needle. Adjusting the two angles with their instrument in hand, and seeing the number match what they read, is exactly the moment it stops being a software trick.",
        )}
      </Aviso>
    </VisionDemo>
  );
}
