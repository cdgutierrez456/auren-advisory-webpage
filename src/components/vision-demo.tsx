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
import type { T } from "@/lib/i18n";
import { useLang, useT } from "@/lib/use-lang";

/**
 * Las notas de lectura salen de los modos (`lib/vision/modos`), que son puros
 * y están en español. Son cuatro frases con números dentro; se traducen aquí,
 * al pintarlas.
 *
 * ponytail: patrones a mano. Si un modo nuevo trae nota, va también aquí, o
 * en inglés se verá en español.
 */
const NOTAS_EN: [RegExp, string][] = [
  [/^aguja en (-?\d+)°$/, "needle at $1°"],
  [/^confirmando… (\d+)\/(\d+)$/, "confirming… $1/$2"],
  [/^(\d+) de los últimos (\d+) fotogramas coinciden$/, "$1 of the last $2 frames match"],
  [/^(\d+) dígitos · tabla de verdad, sin modelo$/, "$1 digits · truth table, no model"],
  [/^Descargando el motor de OCR \(~2 MB, solo la primera vez\)…$/, "Downloading the OCR engine (~2 MB, first time only)…"],
];
const notaEn = (nota: string) => {
  const hit = NOTAS_EN.find(([re]) => re.test(nota));
  return hit ? nota.replace(hit[0], hit[1]) : nota;
};

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
  const t = useT();
  const en = useLang() === "en";
  const nota = (s: string) => (en ? notaEn(s) : s);
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
        t(
          "El navegador solo entrega la cámara sobre HTTPS o en localhost. Abra el demo desde la URL segura.",
          "The browser only grants the camera over HTTPS or on localhost. Open the demo from the secure URL.",
        ),
      );
      return;
    }

    setEstado("preparando");
    setMensaje("");
    try {
      await modo.preparar((m) => setMensaje(nota(m)));
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
      setMensaje(explicar(e, t));
    }
  }

  const listo = Boolean(ultima) && estado === "encendida";
  const midiendo = estado === "encendida" && (!vivo || vivo.confianza < modo.umbral);

  return (
    <section className="pt-14">
      <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <div className="relative overflow-hidden rounded-card bg-ink">
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
                <p className="label text-fg/55">
                  {estado === "preparando" ? t("Preparando…", "Preparing…") : t("Cámara apagada", "Camera off")}
                </p>
                <p className="max-w-md text-pretty text-sm leading-relaxed text-fg/75">
                  {mensaje ||
                    t(
                      "El video se procesa en este equipo. No hay servidor al que enviar los fotogramas: no existe el endpoint.",
                      "The video is processed on this device. There's no server to send frames to: the endpoint doesn't exist.",
                    )}
                </p>
              </div>
            ) : null}

            {estado === "encendida" ? (
              <div className="absolute left-4 top-4">
                <Pill tono={listo && !midiendo ? "ok" : "aviso"}>
                  {midiendo ? t("Acercando…", "Focusing…") : t("Lectura estable", "Stable reading")}
                </Pill>
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            {estado === "encendida" ? (
              <Boton variante="contorno" onClick={apagar}>
                {t("Apagar cámara", "Turn camera off")}
              </Boton>
            ) : (
              <Boton variante="lima" onClick={encender} disabled={estado === "preparando"}>
                {estado === "preparando" ? t("Preparando…", "Preparing…") : t("Encender cámara", "Turn camera on")}
              </Boton>
            )}

            {dispositivos.length > 1 ? (
              <label className="flex items-center gap-3">
                <span className="label text-fg/40">{t("Cámara", "Camera")}</span>
                <select
                  value={dispositivo}
                  onChange={(e) => {
                    setDispositivo(e.target.value);
                    if (estado === "encendida") apagar();
                  }}
                  className="border-b border-line-strong bg-transparent py-2 text-sm text-fg outline-none"
                >
                  <option value="">{t("Predeterminada", "Default")}</option>
                  {dispositivos.map((d) => (
                    <option key={d.deviceId} value={d.deviceId}>
                      {d.label || t("Cámara sin nombre", "Unnamed camera")}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>

          {estado === "error" ? (
            <p className="mt-5 rounded-lg border-l-2 border-alerta bg-alerta-suave p-5 text-sm leading-relaxed text-fg/90">
              {mensaje}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-10">
          <div className="glass rounded-card p-8">
            <p className="label text-fg/40">{t("Lectura", "Reading")}</p>
            <p className="mt-5 break-all font-mono text-5xl leading-none text-fg">
              {ultima?.valor || "—"}
            </p>
            <p className="mt-5 text-sm text-fg/55">
              {estado !== "encendida"
                ? t("Encienda la cámara para empezar.", "Turn on the camera to start.")
                : midiendo
                  ? (vivo?.nota && nota(vivo.nota)) ||
                    t(
                      "Sin certeza suficiente: no se muestra ningún número.",
                      "Not certain enough: no number is shown.",
                    )
                  : `${Math.round((ultima?.confianza ?? 0) * 100)}% ${t("de confianza", "confidence")} · ${nota(ultima?.nota ?? "")}`}
            </p>
          </div>

          {controles ? (
            <div className="glass flex flex-col gap-7 rounded-card p-8">{controles}</div>
          ) : null}

          {children}

          <div className="glass rounded-card border-l-2 border-l-lime p-6">
            <p className="label text-fg/40">{t("Regla de oro del modo cámara", "The camera mode's golden rule")}</p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-fg/75">
              {t(
                "Si la confianza está por debajo del umbral, la pantalla dice «acercando…» y no muestra ningún número. Un número equivocado destruye la credibilidad de toda la línea; un «todavía no puedo leerlo» la construye.",
                "If confidence is below the threshold, the screen says “focusing…” and shows no number. A wrong number destroys the credibility of the whole line; an “I can't read it yet” builds it.",
              )}
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
function explicar(e: unknown, t: T): string {
  const nombre = e instanceof Error ? e.name : "";
  if (nombre === "NotAllowedError")
    return t(
      "El navegador tiene bloqueada la cámara para este sitio. Abra el candado de la barra de direcciones, permita la cámara y vuelva a encender.",
      "The browser is blocking the camera for this site. Open the padlock in the address bar, allow the camera and turn it on again.",
    );
  if (nombre === "NotFoundError")
    return t("Este equipo no reporta ninguna cámara disponible.", "This device reports no available camera.");
  if (nombre === "NotReadableError")
    return t(
      "Otra aplicación está usando la cámara. Cierre la videollamada y vuelva a intentar.",
      "Another app is using the camera. Close the video call and try again.",
    );
  return e instanceof Error ? e.message : t("No fue posible abrir la cámara.", "The camera couldn't be opened.");
}
