"use client";

import { useState } from "react";
import { Aviso, DemoHeader, Deslizador, SoloCliente } from "@/components/demo-ui";
import { VisionDemo } from "@/components/vision-demo";
import { configSegmentos, sieteSegmentos } from "@/lib/vision/modos/siete-segmentos";
import { useT } from "@/lib/use-lang";

/**
 * Modo C — el más barato del catálogo y el que se construye primero: valida
 * el shell de cámara completo sin depender de ningún motor externo.
 */
export default function SieteSegmentos() {
  return (
    <>
      <DemoHeader slug="vision/siete-segmentos" />
      <SoloCliente>
        <Pantalla />
      </SoloCliente>
    </>
  );
}

function Pantalla() {
  const t = useT();
  const [digitos, setDigitos] = useState(configSegmentos.digitos);

  return (
    <VisionDemo
      modo={sieteSegmentos}
      controles={
        <>
          <p className="label text-fg/40">{t("Ajuste del display", "Display settings")}</p>
          <Deslizador
            etiqueta={t("Dígitos del display", "Display digits")}
            valor={digitos}
            min={1}
            max={6}
            onCambio={(v) => {
              setDigitos(v);
              // El modo lee la configuración en cada fotograma: cambiarla en
              // vivo no exige reiniciar la cámara.
              configSegmentos.digitos = v;
            }}
          />
          <p className="text-sm leading-relaxed text-fg/55">
            {t(
              "Encuadre el display de modo que los dígitos llenen el recuadro de lado a lado. El recuadro se divide en partes iguales: si el display tiene cuatro dígitos, ponga cuatro.",
              "Frame the display so the digits fill the box from side to side. The box is split into equal parts: if the display has four digits, set four.",
            )}
          </p>
        </>
      }
    >
      <Aviso titulo={t("Sin modelo, sin descargas, sin internet", "No model, no downloads, no internet")}>
        {t(
          "Siete regiones binarias por dígito y una tabla de verdad de diez entradas. Funciona igual con LED rojo sobre fondo negro que con LCD negro sobre fondo gris, porque el trazo se detecta como la clase minoritaria de la imagen y no por su color.",
          "Seven binary regions per digit and a ten-entry truth table. It works the same with red LEDs on black as with a black LCD on grey, because the stroke is detected as the image's minority class, not by its color.",
        )}
      </Aviso>
    </VisionDemo>
  );
}
