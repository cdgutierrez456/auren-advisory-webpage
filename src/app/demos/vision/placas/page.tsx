"use client";

import { useEffect, useState } from "react";
import { Aviso, DemoHeader, Pill, SoloCliente, numero } from "@/components/demo-ui";
import { VisionDemo } from "@/components/vision-demo";
import { type Vehiculo, vehiculos } from "@/content/demo-data";
import { PALABRA, estadoVehiculo } from "@/lib/demos";
import { liberarOCR, placas } from "@/lib/vision/modos/placas";

/**
 * Modo A — ALPR. La lectura sola no vende: lo que vende es cruzarla contra la
 * flota y descubrir en la puerta que el vehículo que está entrando tiene el
 * SOAT vencido.
 */
export default function Placas() {
  return (
    <>
      <DemoHeader slug="vision/placas" />
      <SoloCliente>
        <Pantalla />
      </SoloCliente>
    </>
  );
}

function Pantalla() {
  const [placa, setPlaca] = useState("");
  const vehiculo = vehiculos.find((v) => v.placa === placa) ?? null;

  // El motor de OCR se conserva mientras se esté en la ruta y se libera al
  // salir: recrearlo son diez segundos en blanco delante del cliente.
  useEffect(() => () => void liberarOCR(), []);

  return (
    <VisionDemo modo={placas} onLectura={(r) => setPlaca(r.valor)}>
      {placa ? <Cruce placa={placa} vehiculo={vehiculo} /> : null}
      <Aviso titulo="Guion honesto">
        Se demuestra con placas impresas en papel y con fotos en el celular, no
        con el carro del cliente en contraluz. Y se dice en voz alta: en el
        patio real esto va con la cámara fija que ya tienen, encuadre
        controlado, y ahí la precisión es otra.
      </Aviso>
    </VisionDemo>
  );
}

function Cruce({ placa, vehiculo }: { placa: string; vehiculo: Vehiculo | null }) {
  if (!vehiculo) {
    return (
      <div className="border-t-2 border-aviso bg-aviso-suave p-8">
        <p className="label text-deep/50">Cruce con la flota</p>
        <p className="mt-4 font-mono text-2xl text-deep">{placa}</p>
        <p className="mt-4 text-sm leading-relaxed text-deep/75">
          No está en la flota registrada. En el patio real esto dispara el
          aviso al portero: vehículo ajeno en zona de cargue.
        </p>
      </div>
    );
  }

  const { docs, peor } = estadoVehiculo(vehiculo);
  const tono = peor.estado === "vencido" ? "alerta" : peor.estado === "critico" ? "aviso" : "ok";

  return (
    <div
      className={`border-t-2 p-8 ${
        tono === "alerta" ? "border-alerta bg-alerta-suave" : tono === "aviso" ? "border-aviso bg-aviso-suave" : "border-ok bg-ok-suave"
      }`}
    >
      <p className="label text-deep/50">Cruce con la flota</p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <p className="font-mono text-2xl text-deep">{vehiculo.placa}</p>
        <Pill tono={tono}>{PALABRA[peor.estado]}</Pill>
      </div>
      <p className="mt-3 text-sm text-deep/70">
        {vehiculo.conductor} · <span className="capitalize">{vehiculo.tipo}</span> ·{" "}
        {numero(vehiculo.kmActual)} km
      </p>

      <dl className="mt-6 flex flex-col gap-2.5 text-sm">
        {docs.map((d) => (
          <div key={d.campo} className="flex justify-between gap-6 border-b border-rule pb-2">
            <dt className="label text-deep/45">{d.etiqueta}</dt>
            <dd
              className={
                d.estado === "vencido" ? "text-alerta" : d.estado === "critico" ? "text-aviso" : "text-deep/70"
              }
            >
              {d.dias < 0 ? `venció hace ${Math.abs(d.dias)} días` : `vence en ${d.dias} días`}
            </dd>
          </div>
        ))}
      </dl>

      {peor.estado === "vencido" ? (
        <p className="mt-6 text-sm leading-relaxed text-deep/80">
          Este vehículo no debería estar entrando. La cámara acaba de detectar
          en dos segundos lo que hoy nadie revisa en la portería.
        </p>
      ) : null}
    </div>
  );
}
