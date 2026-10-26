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
  useDato,
  useFormato,
} from "@/components/demo-ui";
import { KM_MANTENIMIENTO, vehiculos } from "@/content/demo-data";
import {
  DOCUMENTOS,
  type Estado,
  PALABRA,
  PALABRA_EN,
  UMBRALES,
  estadoDe,
  estadoVehiculo,
  porUrgencia,
  resumenFlota,
} from "@/lib/demos";
import { useLang, useT } from "@/lib/use-lang";

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
  const t = useT();
  const en = useLang() === "en";
  const dato = useDato();
  const { numero } = useFormato();
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
          <p className="text-balance font-serif text-4xl leading-tight text-fg md:text-5xl">
            {en
              ? `${r.enRiesgo} of ${r.total} vehicles shouldn't be on the road today`
              : r.frase}
            .
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Cifra valor={r.vencidos} etiqueta={t("Con documento vencido", "With an expired document")} tono="alerta" />
            <Cifra valor={r.enRiesgo} etiqueta={t("En riesgo hoy", "At risk today")} tono="aviso" />
            <Cifra valor={r.mantenimiento} etiqueta={t("Mantenimiento pasado", "Maintenance overdue")} tono="aviso" />
            <Cifra valor={r.total} etiqueta={t("Vehículos en flota", "Vehicles in fleet")} />
          </div>
        </div>

        <div className="flex flex-col gap-7 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="label text-fg/40">{t("Umbrales del semáforo", "Traffic-light thresholds")}</p>
          <Deslizador
            etiqueta={t("Crítico desde", "Critical from")}
            valor={umbrales.critico}
            sufijo={t(" días", " days")}
            min={5}
            max={60}
            paso={5}
            onCambio={(v) =>
              setUmbrales((u) => ({ critico: v, proximo: Math.max(v + 5, u.proximo) }))
            }
          />
          <Deslizador
            etiqueta={t("Próximo desde", "Upcoming from")}
            valor={umbrales.proximo}
            sufijo={t(" días", " days")}
            min={15}
            max={180}
            paso={5}
            onCambio={(v) =>
              setUmbrales((u) => ({ critico: Math.min(u.critico, v - 5), proximo: v }))
            }
          />
          <p className="text-sm leading-relaxed text-fg/55">
            {t(
              "Muévalos y mire cambiar la cifra de arriba. En el piloto estos umbrales son de la empresa, no del proveedor.",
              "Move them and watch the figure above change. In the pilot these thresholds belong to the company, not the vendor.",
            )}
          </p>
        </div>
      </div>

      <div className="mt-14">
        <Tabla
          head={t(
            ["Vehículo", "Conductor", "SOAT", "Tecnomecánica", "Licencia", "Mantenimiento", "Estado"],
            ["Vehicle", "Driver", "SOAT", "Inspection", "License", "Maintenance", "Status"],
          )}
        >
          {lista.map((v) => {
            const { peor, kmRestantes } = estadoVehiculo(v, hoy, umbrales);
            return (
              <Fila key={v.placa}>
                <Celda className="whitespace-nowrap">
                  <span className="font-mono text-base text-fg">{v.placa}</span>
                  <span className="ml-3 text-fg/40 capitalize">{dato(v.tipo)}</span>
                </Celda>
                <Celda className="whitespace-nowrap">{v.conductor}</Celda>
                {DOCUMENTOS.map((d) => (
                  <Doc key={d.campo} fecha={v[d.campo]} hoy={hoy} umbrales={umbrales} />
                ))}
                <Celda className="whitespace-nowrap">
                  {kmRestantes <= 0 ? (
                    <span className="text-alerta">
                      {t(`${numero(Math.abs(kmRestantes))} km pasado`, `${numero(Math.abs(kmRestantes))} km over`)}
                    </span>
                  ) : (
                    <span className="text-fg/75">
                      {t(`faltan ${numero(kmRestantes)} km`, `${numero(kmRestantes)} km to go`)}
                    </span>
                  )}
                </Celda>
                <Celda>
                  <Pill tono={TONO[peor.estado]}>{(en ? PALABRA_EN : PALABRA)[peor.estado]}</Pill>
                </Celda>
              </Fila>
            );
          })}
        </Tabla>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Aviso titulo={t("Por qué la tabla no tiene filtros", "Why the table has no filters")}>
          {t(
            "Viene ordenada por urgencia: lo vencido primero. Un tablero que obliga a filtrar para encontrar el problema es un tablero que nadie abre el segundo día.",
            "It comes sorted by urgency: expired first. A dashboard that makes you filter to find the problem is a dashboard nobody opens on day two.",
          )}
        </Aviso>
        <Aviso titulo={t("Mantenimiento por kilometraje", "Mileage-based maintenance")}>
          {t(
            `Es el mismo semáforo con otra unidad: cada ${numero(KM_MANTENIMIENTO)} km en vez de cada N días. Cambiar la unidad es un parámetro, no un desarrollo nuevo.`,
            `It's the same traffic light with a different unit: every ${numero(KM_MANTENIMIENTO)} km instead of every N days. Changing the unit is a parameter, not new development.`,
          )}
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
  const t = useT();
  const { fechaCorta } = useFormato();
  const { estado, dias } = estadoDe(fecha, hoy, umbrales);
  const color =
    estado === "vencido" ? "text-alerta" : estado === "critico" ? "text-aviso" : "text-fg/75";

  return (
    <Celda className="whitespace-nowrap">
      <span className={color}>
        {dias < 0
          ? t(`venció hace ${Math.abs(dias)} d`, `expired ${Math.abs(dias)} d ago`)
          : dias === 0
            ? t("vence hoy", "expires today")
            : t(`en ${dias} d`, `in ${dias} d`)}
      </span>
      <span className="ml-3 text-fg/40">{fechaCorta(fecha)}</span>
    </Celda>
  );
}
