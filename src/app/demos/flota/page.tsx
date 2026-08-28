"use client";

import { useState } from "react";
import {
  Aviso,
  Celda,
  Cifra,
  DemoHeader,
  Deslizador,
  Fila,
  Pill,
  SoloCliente,
  Tabla,
  type Tono,
  fechaCorta,
  numero,
} from "@/components/demo-ui";
import { KM_MANTENIMIENTO, vehiculos } from "@/content/demo-data";
import {
  DOCUMENTOS,
  type Estado,
  PALABRA,
  UMBRALES,
  estadoDe,
  estadoVehiculo,
  porUrgencia,
  resumenFlota,
} from "@/lib/demos";

/** El semáforo nunca es solo color: cada estado lleva su palabra al lado. */
const TONO: Record<Estado, Tono> = {
  vencido: "alerta",
  critico: "aviso",
  proximo: "neutro",
  vigente: "ok",
};

export default function Flota() {
  return (
    <>
      <DemoHeader slug="flota" />
      <SoloCliente>
        <Tablero />
      </SoloCliente>
    </>
  );
}

function Tablero() {
  const hoy = new Date();
  // Los umbrales son estado de la pantalla: el cliente siempre quiere moverlos
  // ("para nosotros 30 días ya es crítico") y moverlos en vivo es la demo.
  const [umbrales, setUmbrales] = useState(UMBRALES);

  const r = resumenFlota(vehiculos, hoy, umbrales);
  const lista = porUrgencia(vehiculos, hoy, umbrales);

  return (
    <section className="pt-14">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <p className="text-balance font-serif text-4xl leading-tight text-deep md:text-5xl">
            {r.frase}.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Cifra valor={r.vencidos} etiqueta="Con documento vencido" tono="alerta" />
            <Cifra valor={r.enRiesgo} etiqueta="En riesgo hoy" tono="aviso" />
            <Cifra valor={r.mantenimiento} etiqueta="Mantenimiento pasado" tono="aviso" />
            <Cifra valor={r.total} etiqueta="Vehículos en flota" />
          </div>
        </div>

        <div className="flex flex-col gap-7 border-t border-rule pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="label text-deep/45">Umbrales del semáforo</p>
          <Deslizador
            etiqueta="Crítico desde"
            valor={umbrales.critico}
            sufijo=" días"
            min={5}
            max={60}
            paso={5}
            onCambio={(v) =>
              setUmbrales((u) => ({ critico: v, proximo: Math.max(v + 5, u.proximo) }))
            }
          />
          <Deslizador
            etiqueta="Próximo desde"
            valor={umbrales.proximo}
            sufijo=" días"
            min={15}
            max={180}
            paso={5}
            onCambio={(v) =>
              setUmbrales((u) => ({ critico: Math.min(u.critico, v - 5), proximo: v }))
            }
          />
          <p className="text-sm leading-relaxed text-deep/55">
            Muévalos y mire cambiar la cifra de arriba. En el piloto estos
            umbrales son de la empresa, no del proveedor.
          </p>
        </div>
      </div>

      <div className="mt-14">
        <Tabla
          head={["Vehículo", "Conductor", "SOAT", "Tecnomecánica", "Licencia", "Mantenimiento", "Estado"]}
        >
          {lista.map((v) => {
            const { peor, kmRestantes } = estadoVehiculo(v, hoy, umbrales);
            return (
              <Fila key={v.placa}>
                <Celda className="whitespace-nowrap">
                  <span className="font-mono text-base text-deep">{v.placa}</span>
                  <span className="ml-3 text-deep/45 capitalize">{v.tipo}</span>
                </Celda>
                <Celda className="whitespace-nowrap">{v.conductor}</Celda>
                {DOCUMENTOS.map((d) => (
                  <Doc key={d.campo} fecha={v[d.campo]} hoy={hoy} umbrales={umbrales} />
                ))}
                <Celda className="whitespace-nowrap">
                  {kmRestantes <= 0 ? (
                    <span className="text-alerta">
                      {numero(Math.abs(kmRestantes))} km pasado
                    </span>
                  ) : (
                    <span className="text-deep/70">faltan {numero(kmRestantes)} km</span>
                  )}
                </Celda>
                <Celda>
                  <Pill tono={TONO[peor.estado]}>{PALABRA[peor.estado]}</Pill>
                </Celda>
              </Fila>
            );
          })}
        </Tabla>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Aviso titulo="Por qué la tabla no tiene filtros">
          Viene ordenada por urgencia: lo vencido primero. Un tablero que
          obliga a filtrar para encontrar el problema es un tablero que nadie
          abre el segundo día.
        </Aviso>
        <Aviso titulo="Mantenimiento por kilometraje">
          Es el mismo semáforo con otra unidad: cada {numero(KM_MANTENIMIENTO)}{" "}
          km en vez de cada N días. Cambiar la unidad es un parámetro, no un
          desarrollo nuevo.
        </Aviso>
      </div>
    </section>
  );
}

function Doc({
  fecha,
  hoy,
  umbrales,
}: {
  fecha: string;
  hoy: Date;
  umbrales: typeof UMBRALES;
}) {
  const { estado, dias } = estadoDe(fecha, hoy, umbrales);
  const color =
    estado === "vencido" ? "text-alerta" : estado === "critico" ? "text-aviso" : "text-deep/70";

  return (
    <Celda className="whitespace-nowrap">
      <span className={color}>
        {dias < 0 ? `venció hace ${Math.abs(dias)} d` : dias === 0 ? "vence hoy" : `en ${dias} d`}
      </span>
      <span className="ml-3 text-deep/40">{fechaCorta(fecha)}</span>
    </Celda>
  );
}
