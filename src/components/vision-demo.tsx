"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Boton, Pill } from "@/components/demo-ui";
import {
  type Guia,
  type ModoVision,
  type Resultado,
  abrirCamara,
  camaras,
  contextoSeguro,
  correr,
} from "@/lib/vision/shell";

/**
 * Pantalla de cámara compartida por los tres modos de visión.
 *
 * Todo lo que hace fallar una demo de cámara en vivo está resuelto aquí y no
 * en cada modo: contexto seguro, permiso denegado, cámara equivocada,
 * fotogramas encolados y —sobre todo— el stream que queda abierto al salir.
 */
export function VisionDemo({
  modo,
  controles,
  onLectura,
  children,
}: {
  modo: ModoVision;
  /** Controles propios del modo (calibración, número de dígitos…). */
  controles?: ReactNode;
  /** Se llama solo con lecturas por encima del umbral de confianza. */
  onLectura?: (r: Resultado) => void;
  children?: ReactNode;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const cerrarCamara = useRef<(() => void) | null>(null);
  const pararBucle = useRef<(() => void) | null>(null);

  const [estado, setEstado] = useState<"apagada" | "preparando" | "encendida" | "error">("apagada");
  const [mensaje, setMensaje] = useState("");
  const [vivo, setVivo] = useState<Resultado | null>(null);
  const [ultima, setUltima] = useState<Resultado | null>(null);
  const [dispositivos, setDispositivos] = useState<MediaDeviceInfo[]>([]);
  const [dispositivo, setDispositivo] = useState("");
  const [tamano, setTamano] = useState({ w: 1280, h: 720 });

  const apagar = useCallback(() => {
    pararBucle.current?.();
    cerrarCamara.current?.();
    pararBucle.current = null;
    cerrarCamara.current = null;
    modo.liberar();
    setEstado("apagada");
    setVivo(null);
  }, [modo]);

  // El cleanup del efecto es la única garantía de que el led se apaga al
  // cambiar de demo. Sin esto la cámara sigue viva en segundo plano.
  useEffect(() => apagar, [apagar]);

  async function encender() {
    if (!contextoSeguro()) {
      setEstado("error");
      setMensaje(
        "El navegador solo entrega la cámara sobre HTTPS o en localhost. Abra el demo desde la URL segura.",
      );
      return;
    }

    setEstado("preparando");
    setMensaje("");
    try {
      await modo.preparar(setMensaje);
      const v = video.current;
      if (!v) return;

      cerrarCamara.current = await abrirCamara(v, dispositivo || undefined);
      setTamano({ w: v.videoWidth, h: v.videoHeight });
      // Las etiquetas de los dispositivos solo aparecen con permiso ya dado.
      setDispositivos(await camaras());
      pararBucle.current = correr(v, modo, (r) => {
        setVivo(r);
        if (r && r.valor && r.confianza >= modo.umbral) {
          setUltima(r);
          onLectura?.(r);
        }
      });
      setEstado("encendida");
    } catch (e) {
      setEstado("error");
      setMensaje(explicar(e));
    }
  }

  const listo = Boolean(ultima) && estado === "encendida";
  const midiendo = estado === "encendida" && (!vivo || vivo.confianza < modo.umbral);

  return (
    <section className="pt-14">
      <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <div className="relative overflow-hidden bg-ink">
            <video
              ref={video}
              muted
              playsInline
              onLoadedMetadata={(e) =>
                setTamano({ w: e.currentTarget.videoWidth, h: e.currentTarget.videoHeight })
              }
              className="block w-full"
            />

            {estado === "encendida" ? (
              <div
                aria-hidden
                style={estiloGuia(modo.guia, tamano.w, tamano.h)}
                className={`pointer-events-none absolute border-2 border-lime/80 ${
                  modo.guia.forma === "circulo" ? "rounded-full" : ""
                }`}
              />
            ) : null}

            {estado !== "encendida" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-10 text-center">
                <p className="label text-ivory/50">
                  {estado === "preparando" ? "Preparando…" : "Cámara apagada"}
                </p>
                <p className="max-w-md text-pretty text-sm leading-relaxed text-ivory/70">
                  {mensaje ||
                    "El video se procesa en este equipo. No hay servidor al que enviar los fotogramas: no existe el endpoint."}
                </p>
              </div>
            ) : null}

            {estado === "encendida" ? (
              <div className="absolute left-4 top-4">
                <Pill tono={listo && !midiendo ? "ok" : "aviso"}>
                  {midiendo ? "Acercando…" : "Lectura estable"}
                </Pill>
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            {estado === "encendida" ? (
              <Boton variante="contorno" onClick={apagar}>
                Apagar cámara
              </Boton>
            ) : (
              <Boton variante="lima" onClick={encender} disabled={estado === "preparando"}>
                {estado === "preparando" ? "Preparando…" : "Encender cámara"}
              </Boton>
            )}

            {dispositivos.length > 1 ? (
              <label className="flex items-center gap-3">
                <span className="label text-deep/45">Cámara</span>
                <select
                  value={dispositivo}
                  onChange={(e) => {
                    setDispositivo(e.target.value);
                    if (estado === "encendida") apagar();
                  }}
                  className="border-b border-rule-strong bg-transparent py-2 text-sm text-deep outline-none"
                >
                  <option value="">Predeterminada</option>
                  {dispositivos.map((d) => (
                    <option key={d.deviceId} value={d.deviceId}>
                      {d.label || "Cámara sin nombre"}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>

          {estado === "error" ? (
            <p className="mt-5 border-l-2 border-alerta bg-alerta-suave p-5 text-sm leading-relaxed text-deep/80">
              {mensaje}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-10">
          <div className="border-t-2 border-deep bg-paper p-8">
            <p className="label text-deep/45">Lectura</p>
            <p className="mt-5 break-all font-mono text-5xl leading-none text-deep">
              {ultima?.valor || "—"}
            </p>
            <p className="mt-5 text-sm text-deep/60">
              {estado !== "encendida"
                ? "Encienda la cámara para empezar."
                : midiendo
                  ? vivo?.nota || "Sin certeza suficiente: no se muestra ningún número."
                  : `${Math.round((ultima?.confianza ?? 0) * 100)}% de confianza · ${ultima?.nota ?? ""}`}
            </p>
          </div>

          {controles ? (
            <div className="flex flex-col gap-7 border border-rule bg-ivory p-8">{controles}</div>
          ) : null}

          {children}

          <div className="border-l-2 border-lime bg-paper p-6">
            <p className="label text-deep/45">Regla de oro del modo cámara</p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-deep/75">
              Si la confianza está por debajo del umbral, la pantalla dice
              «acercando…» y no muestra ningún número. Un número equivocado
              destruye la credibilidad de toda la línea; un «todavía no puedo
              leerlo» la construye.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** La guía en pantalla tiene que coincidir con el recorte que procesa el
 *  modo, incluida la corrección a cuadrado de los modos circulares. */
function estiloGuia(g: Guia, vw: number, vh: number): React.CSSProperties {
  if (g.forma !== "circulo") {
    return {
      left: `${g.x * 100}%`,
      top: `${g.y * 100}%`,
      width: `${g.w * 100}%`,
      height: `${g.h * 100}%`,
    };
  }
  const lado = Math.min(g.w * vw, g.h * vh);
  const w = lado / vw;
  const h = lado / vh;
  return {
    left: `${(g.x + (g.w - w) / 2) * 100}%`,
    top: `${(g.y + (g.h - h) / 2) * 100}%`,
    width: `${w * 100}%`,
    height: `${h * 100}%`,
  };
}

/** Un fallo mudo de cámara arruina la reunión; una instrucción, no. */
function explicar(e: unknown): string {
  const nombre = e instanceof Error ? e.name : "";
  if (nombre === "NotAllowedError")
    return "El navegador tiene bloqueada la cámara para este sitio. Abra el candado de la barra de direcciones, permita la cámara y vuelva a encender.";
  if (nombre === "NotFoundError") return "Este equipo no reporta ninguna cámara disponible.";
  if (nombre === "NotReadableError")
    return "Otra aplicación está usando la cámara. Cierre la videollamada y vuelva a intentar.";
  return e instanceof Error ? e.message : "No fue posible abrir la cámara.";
}
