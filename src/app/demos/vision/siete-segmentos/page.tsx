"use client";

import { useState } from "react";
import { Aviso, DemoHeader, Deslizador, SoloCliente } from "@/components/demo-ui";
import { VisionDemo } from "@/components/vision-demo";
import { configSegmentos, sieteSegmentos } from "@/lib/vision/modos/siete-segmentos";

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
  const [digitos, setDigitos] = useState(configSegmentos.digitos);

  return (
    <VisionDemo
      modo={sieteSegmentos}
      controles={
        <>
          <p className="label text-deep/45">Ajuste del display</p>
          <Deslizador
            etiqueta="Dígitos del display"
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
          <p className="text-sm leading-relaxed text-deep/60">
            Encuadre el display de modo que los dígitos llenen el recuadro de
            lado a lado. El recuadro se divide en partes iguales: si el display
            tiene cuatro dígitos, ponga cuatro.
          </p>
        </>
      }
    >
      <Aviso titulo="Sin modelo, sin descargas, sin internet">
        Siete regiones binarias por dígito y una tabla de verdad de diez
        entradas. Funciona igual con LED rojo sobre fondo negro que con LCD
        negro sobre fondo gris, porque el trazo se detecta como la clase
        minoritaria de la imagen y no por su color.
      </Aviso>
    </VisionDemo>
  );
}
