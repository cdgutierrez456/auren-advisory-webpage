"use client";

import { useEffect, useState } from "react";
import { Aviso, DemoHeader, Pill, SoloCliente, useDato, useFormato } from "@/components/demo-ui";
import { VisionDemo } from "@/components/vision-demo";
import { type Vehiculo, vehiculos } from "@/content/demo-data";
import { PALABRA, PALABRA_EN, estadoVehiculo } from "@/lib/demos";
import { useLang, useT } from "@/lib/use-lang";
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
  const t = useT();
  const [placa, setPlaca] = useState("");
  const vehiculo = vehiculos.find((v) => v.placa === placa) ?? null;

  // El motor de OCR se conserva mientras se esté en la ruta y se libera al
  // salir: recrearlo son diez segundos en blanco delante del cliente.
  useEffect(() => () => void liberarOCR(), []);

  return (
    <VisionDemo modo={placas} onLectura={(r) => setPlaca(r.valor)}>
      {placa ? <Cruce placa={placa} vehiculo={vehiculo} /> : null}
      <Aviso titulo={t("Guion honesto", "An honest script")}>
        {t(
          "Se demuestra con placas impresas en papel y con fotos en el celular, no con el carro del cliente en contraluz. Y se dice en voz alta: en el patio real esto va con la cámara fija que ya tienen, encuadre controlado, y ahí la precisión es otra.",
          "It's demonstrated with plates printed on paper and photos on a phone, not with the client's car against the light. And it's said out loud: in a real yard this runs on the fixed camera they already have, with controlled framing, and there the accuracy is different.",
        )}
      </Aviso>
    </VisionDemo>
  );
}

function Cruce({ placa, vehiculo }: { placa: string; vehiculo: Vehiculo | null }) {
  const t = useT();
  const en = useLang() === "en";
  const dato = useDato();
  const { numero } = useFormato();
  if (!vehiculo) {
    return (
      <div className="rounded-card border-t-2 border-aviso bg-aviso-suave p-8">
        <p className="label text-fg/55">{t("Cruce con la flota", "Fleet check")}</p>
        <p className="mt-4 font-mono text-2xl text-fg">{placa}</p>
        <p className="mt-4 text-sm leading-relaxed text-fg/75">
          {t(
            "No está en la flota registrada. En el patio real esto dispara el aviso al portero: vehículo ajeno en zona de cargue.",
            "It isn't in the registered fleet. In a real yard this triggers an alert to the gatekeeper: an outside vehicle in the loading area.",
          )}
        </p>
      </div>
    );
  }

  const { docs, peor } = estadoVehiculo(vehiculo);
  const tono = peor.estado === "vencido" ? "alerta" : peor.estado === "critico" ? "aviso" : "ok";

  return (
    <div
      className={`rounded-card border-t-2 p-8 ${
        tono === "alerta" ? "border-alerta bg-alerta-suave" : tono === "aviso" ? "border-aviso bg-aviso-suave" : "border-ok bg-ok-suave"
      }`}
    >
      <p className="label text-fg/55">{t("Cruce con la flota", "Fleet check")}</p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <p className="font-mono text-2xl text-fg">{vehiculo.placa}</p>
        <Pill tono={tono}>{(en ? PALABRA_EN : PALABRA)[peor.estado]}</Pill>
      </div>
      <p className="mt-3 text-sm text-fg/75">
        {vehiculo.conductor} · <span className="capitalize">{dato(vehiculo.tipo)}</span> ·{" "}
        {numero(vehiculo.kmActual)} km
      </p>

      <dl className="mt-6 flex flex-col gap-2.5 text-sm">
        {docs.map((d) => (
          <div key={d.campo} className="flex justify-between gap-6 border-b border-line pb-2">
            <dt className="label text-fg/40">{dato(d.etiqueta)}</dt>
            <dd
              className={
                d.estado === "vencido" ? "text-alerta" : d.estado === "critico" ? "text-aviso" : "text-fg/75"
              }
            >
              {d.dias < 0
                ? t(`venció hace ${Math.abs(d.dias)} días`, `expired ${Math.abs(d.dias)} days ago`)
                : t(`vence en ${d.dias} días`, `expires in ${d.dias} days`)}
            </dd>
          </div>
        ))}
      </dl>

      {peor.estado === "vencido" ? (
        <p className="mt-6 text-sm leading-relaxed text-fg/90">
          {t(
            "Este vehículo no debería estar entrando. La cámara acaba de detectar en dos segundos lo que hoy nadie revisa en la portería.",
            "This vehicle shouldn't be coming in. The camera just detected in two seconds what nobody checks at the gate today.",
          )}
        </p>
      ) : null}
    </div>
  );
}
