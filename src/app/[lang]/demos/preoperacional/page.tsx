"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Aviso,
  Boton,
  Campo,
  Cifra,
  DemoHeader,
  Paso,
  Pill,
  SoloCliente,
  useDato,
  useFormato,
} from "@/components/demo-ui";
import {
  type Inspeccion,
  type ItemChecklist,
  type Respuesta,
  type Vehiculo,
  checklist,
  grupos,
  inspecciones,
  vehiculos,
} from "@/content/demo-data";
import { evaluar } from "@/lib/demos";
import { useDemoStore } from "@/lib/demo-store";
import { iso } from "@/lib/terminos";
import { useT } from "@/lib/use-lang";

/**
 * Demo 1 — Inspección preoperacional.
 *
 * Un solo flujo en cuatro pasos: vehículo → checklist → firma → resultado. Se
 * recorre en 90 segundos y termina en el tablero. La única regla de negocio
 * (un ítem crítico en malo bloquea la salida) vive en `evaluar()`, probada.
 */
export default function Preoperacional() {
  const t = useT();
  return (
    <>
      <DemoHeader slug="preoperacional">
        <Paso href="/demos/preoperacional/tablero">
          {t("Ver el tablero de cumplimiento", "See the compliance dashboard")}
        </Paso>
      </DemoHeader>
      <SoloCliente>
        <Flujo />
      </SoloCliente>
    </>
  );
}

type PasoFlujo = "vehiculo" | "checklist" | "firma" | "resultado";

function Flujo() {
  const store = useDemoStore<Inspeccion>("preoperacional", inspecciones);
  const [paso, setPaso] = useState<PasoFlujo>("vehiculo");
  const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [km, setKm] = useState(0);
  const [firma, setFirma] = useState("");
  const [cerrada, setCerrada] = useState<Inspeccion | null>(null);

  const veredicto = useMemo(() => evaluar(respuestas), [respuestas]);

  // Cada paso empieza arriba. Sin esto, al salir del checklist —que es largo—
  // la pantalla siguiente aparece a media altura y parece que no pasó nada.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [paso]);

  function empezar(v: Vehiculo) {
    setVehiculo(v);
    setRespuestas([]);
    setKm(v.kmActual);
    setFirma("");
    setCerrada(null);
    setPaso("checklist");
  }

  function responder(item: ItemChecklist, estado: Respuesta["estado"]) {
    setRespuestas((prev) => {
      const otras = prev.filter((r) => r.itemId !== item.id);
      // Al volver a "bueno" se descarta la foto: no tiene sentido guardar
      // evidencia de un hallazgo que ya no existe.
      return [...otras, { itemId: item.id, estado }];
    });
  }

  function adjuntar(itemId: string, foto: string) {
    setRespuestas((prev) => prev.map((r) => (r.itemId === itemId ? { ...r, foto } : r)));
  }

  function cerrar() {
    if (!vehiculo) return;
    const inspeccion: Inspeccion = {
      id: `insp-${Date.now()}`,
      placa: vehiculo.placa,
      conductor: vehiculo.conductor,
      fecha: new Date().toISOString(),
      kmTablero: km,
      respuestas,
      firma,
      resultado: veredicto.resultado,
    };
    store.agregar(inspeccion);
    setCerrada(inspeccion);
    setPaso("resultado");
  }

  return (
    <section className="pt-14">
      <Progreso paso={paso} vehiculo={vehiculo} />

      {paso === "vehiculo" ? (
        <SeleccionVehiculo inspecciones={store.items} onElegir={empezar} />
      ) : null}

      {paso === "checklist" && vehiculo ? (
        <Checklist
          respuestas={respuestas}
          veredicto={veredicto}
          onResponder={responder}
          onFoto={adjuntar}
          onVolver={() => setPaso("vehiculo")}
          onSeguir={() => setPaso("firma")}
        />
      ) : null}

      {paso === "firma" && vehiculo ? (
        <FirmaYCierre
          vehiculo={vehiculo}
          km={km}
          onKm={setKm}
          firma={firma}
          onFirma={setFirma}
          veredicto={veredicto}
          onVolver={() => setPaso("checklist")}
          onCerrar={cerrar}
        />
      ) : null}

      {paso === "resultado" && cerrada ? (
        <Resultado inspeccion={cerrada} onOtra={() => setPaso("vehiculo")} />
      ) : null}
    </section>
  );
}

/* --- Paso 0: dónde estoy ------------------------------------------------ */

function Progreso({ paso, vehiculo }: { paso: PasoFlujo; vehiculo: Vehiculo | null }) {
  const t = useT();
  const PASOS: { id: PasoFlujo; texto: string }[] = [
    { id: "vehiculo", texto: t("Vehículo", "Vehicle") },
    { id: "checklist", texto: "Checklist" },
    { id: "firma", texto: t("Firma", "Signature") },
    { id: "resultado", texto: t("Resultado", "Result") },
  ];
  const actual = PASOS.findIndex((p) => p.id === paso);
  return (
    <div className="mb-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-line pb-5">
      {PASOS.map((p, i) => (
        <span
          key={p.id}
          className={`label flex items-center gap-3 ${i <= actual ? "text-fg" : "text-fg/40"}`}
        >
          <span className={`h-0.5 w-6 ${i <= actual ? "bg-lime" : "bg-line-strong"}`} />
          {p.texto}
        </span>
      ))}
      {vehiculo ? (
        <span className="ml-auto font-mono text-sm text-fg/55">
          {vehiculo.placa} · {vehiculo.conductor}
        </span>
      ) : null}
    </div>
  );
}

/* --- Paso 1: vehículo --------------------------------------------------- */

function SeleccionVehiculo({
  inspecciones: hechas,
  onElegir,
}: {
  inspecciones: readonly Inspeccion[];
  onElegir: (v: Vehiculo) => void;
}) {
  const t = useT();
  const dato = useDato();
  const { horaCorta, numero } = useFormato();
  const hoy = iso(new Date());
  const ultima = (placa: string) =>
    hechas.find((i) => i.placa === placa && i.fecha.slice(0, 10) === hoy);

  return (
    <>
      <h2 className="text-2xl font-normal tracking-tight text-fg">
        {t("¿Qué vehículo va a salir?", "Which vehicle is going out?")}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg/55">
        {t(
          "Toque cualquiera. Los que ya tienen inspección de hoy la muestran al lado — así el jefe de patio ve de una vez quién falta.",
          "Tap any of them. The ones already inspected today show it alongside — so the yard manager sees at a glance who's missing.",
        )}
      </p>

      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {vehiculos.map((v) => {
          const u = ultima(v.placa);
          return (
            <button
              key={v.placa}
              type="button"
              onClick={() => onElegir(v)}
              className="glass flex flex-col items-start gap-3 rounded-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-lime/40"
            >
              <span className="flex w-full items-center justify-between gap-4">
                <span className="font-mono text-lg text-fg">{v.placa}</span>
                {u ? (
                  <Pill tono={u.resultado === "bloqueado" ? "alerta" : "ok"}>
                    {u.resultado === "bloqueado" ? t("Bloqueado", "Blocked") : t("Aprobado", "Approved")}
                  </Pill>
                ) : (
                  <Pill tono="aviso">{t("Sin inspección", "Not inspected")}</Pill>
                )}
              </span>
              <span className="text-sm text-fg/75">{v.conductor}</span>
              <span className="text-xs capitalize text-fg/40">
                {dato(v.tipo)} · {numero(v.kmActual)} km
                {u ? ` · ${horaCorta(u.fecha)}` : ""}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

/* --- Paso 2: checklist -------------------------------------------------- */

type Veredicto = ReturnType<typeof evaluar>;

function Checklist({
  respuestas,
  veredicto,
  onResponder,
  onFoto,
  onVolver,
  onSeguir,
}: {
  respuestas: Respuesta[];
  veredicto: Veredicto;
  onResponder: (i: ItemChecklist, e: Respuesta["estado"]) => void;
  onFoto: (itemId: string, foto: string) => void;
  onVolver: () => void;
  onSeguir: () => void;
}) {
  const t = useT();
  const dato = useDato();
  const respondidos = checklist.length - veredicto.sinResponder.length;
  const de = (id: string) => respuestas.find((r) => r.itemId === id);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-normal tracking-tight text-fg">
            {t("Revise los 22 ítems", "Check all 22 items")}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg/55">
            {t(
              <>
                Los marcados con <b className="text-alerta">●</b> son críticos: uno solo en «Malo»
                bloquea la salida del vehículo. Los que exigen foto la piden en el momento.
              </>,
              <>
                Items marked <b className="text-alerta">●</b> are critical: a single one marked
                “Bad” blocks the vehicle from leaving. The ones that require a photo ask for it
                on the spot.
              </>,
            )}
          </p>
        </div>
        <p className="label text-fg/40">
          {respondidos} {t("de", "of")} {checklist.length} {t("respondidos", "answered")}
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {grupos.map((grupo) => (
          <div key={grupo}>
            <div className="flex items-baseline gap-5">
              <span className="label text-fg/55">{dato(grupo)}</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {checklist
                .filter((i) => i.grupo === grupo)
                .map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    respuesta={de(item.id)}
                    onResponder={(e) => onResponder(item, e)}
                    onFoto={(f) => onFoto(item.id, f)}
                  />
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-line pt-8">
        <Boton variante="contorno" onClick={onVolver}>
          {t("Cambiar vehículo", "Change vehicle")}
        </Boton>
        <Boton onClick={onSeguir} disabled={veredicto.incompleta}>
          {t("Continuar a la firma", "Continue to signature")}
        </Boton>
        <p className="text-sm text-fg/55" role="status">
          {veredicto.sinResponder.length > 0
            ? t(
                `Faltan ${veredicto.sinResponder.length} ítems por responder.`,
                `${veredicto.sinResponder.length} items left to answer.`,
              )
            : veredicto.sinFoto.length > 0
              ? t("Hay un hallazgo que exige foto y no la tiene.", "A finding requires a photo and doesn't have one.")
              : veredicto.resultado === "bloqueado"
                ? t("Con estos hallazgos el vehículo quedará BLOQUEADO.", "With these findings the vehicle will be BLOCKED.")
                : t("Todo en orden. El vehículo saldrá aprobado.", "All in order. The vehicle will be approved.")}
        </p>
      </div>
    </>
  );
}


function Item({
  item,
  respuesta,
  onResponder,
  onFoto,
}: {
  item: ItemChecklist;
  respuesta?: Respuesta;
  onResponder: (e: Respuesta["estado"]) => void;
  onFoto: (foto: string) => void;
}) {
  const t = useT();
  const dato = useDato();
  const ESTADOS = [
    { valor: "bueno", texto: t("Bueno", "Good") },
    { valor: "malo", texto: t("Malo", "Bad") },
    { valor: "na", texto: t("N.A.", "N/A") },
  ] as const;
  const malo = respuesta?.estado === "malo";
  const faltaFoto = malo && item.exigeFoto && !respuesta?.foto;

  return (
    <li className="glass flex flex-col gap-4 rounded-card p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div className="flex items-start gap-3">
        {item.critico ? (
          <span
            className="mt-1 text-alerta"
            title={t("Ítem crítico: bloquea la salida", "Critical item: blocks departure")}
          >
            ●
          </span>
        ) : (
          <span className="mt-1 text-fg/40">○</span>
        )}
        <div>
          <p className="text-fg">{dato(item.texto)}</p>
          {malo ? (
            <p className="mt-1.5 text-sm text-alerta">
              {item.critico ? t("Bloquea la salida del vehículo. ", "Blocks the vehicle from leaving. ") : ""}
              {item.exigeFoto
                ? respuesta?.foto
                  ? t("Foto adjunta.", "Photo attached.")
                  : t("Exige foto.", "Photo required.")
                : ""}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {faltaFoto ? <CapturaFoto onFoto={onFoto} label={t("Adjuntar foto", "Attach photo")} /> : null}
        {respuesta?.foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={respuesta.foto}
            alt={t("Evidencia del hallazgo", "Evidence of the finding")}
            className="h-11 w-11 rounded-lg border border-line-strong object-cover"
          />
        ) : null}
        <div className="flex gap-1.5">
          {ESTADOS.map((e) => {
            const activo = respuesta?.estado === e.valor;
            const tono =
              e.valor === "malo"
                ? "bg-alerta text-surface"
                : e.valor === "bueno"
                  ? "bg-ok text-surface"
                  : "bg-fg/15 text-fg";
            return (
              <button
                key={e.valor}
                type="button"
                aria-pressed={activo}
                onClick={() => onResponder(e.valor)}
                // 44px de alto mínimo: esto se usa de pie, en el patio, con
                // una mano y a veces con guante.
                className={`label min-h-11 min-w-16 rounded-lg px-4 transition-colors ${
                  activo ? tono : "border border-line-strong text-fg/55 hover:border-lime/40 hover:text-fg"
                }`}
              >
                {e.texto}
              </button>
            );
          })}
        </div>
      </div>
    </li>
  );
}

/** El navegador ya trae la cámara: en móvil `capture` abre la trasera y en
 *  escritorio cae al selector de archivo. No hace falta getUserMedia para una
 *  foto suelta. */
function CapturaFoto({ onFoto, label }: { onFoto: (foto: string) => void; label: string }) {
  return (
    <label className="label min-h-11 cursor-pointer rounded-lg border border-alerta px-4 py-3 text-alerta transition-colors hover:bg-alerta-suave">
      {label}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) onFoto(await reducir(file, 900));
        }}
      />
    </label>
  );
}

/** Se reduce antes de guardar: una foto de 12 MP revienta la cuota de
 *  sessionStorage (~5 MB) en la tercera inspección. */
async function reducir(file: File, lado: number): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const escala = Math.min(1, lado / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * escala);
  canvas.height = Math.round(bitmap.height * escala);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.7);
}

/* --- Paso 3: firma ------------------------------------------------------ */

function FirmaYCierre({
  vehiculo,
  km,
  onKm,
  firma,
  onFirma,
  veredicto,
  onVolver,
  onCerrar,
}: {
  vehiculo: Vehiculo;
  km: number;
  onKm: (n: number) => void;
  firma: string;
  onFirma: (f: string) => void;
  veredicto: Veredicto;
  onVolver: () => void;
  onCerrar: () => void;
}) {
  const t = useT();
  const dato = useDato();
  const { numero } = useFormato();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [trazando, setTrazando] = useState(false);

  const punto = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (c.width / r.width),
      y: (e.clientY - r.top) * (c.height / r.height),
    };
  };

  const ctx = () => {
    const c = canvas.current;
    if (!c) return null;
    const g = c.getContext("2d");
    if (g) {
      g.lineWidth = 2.4;
      g.lineCap = "round";
      g.lineJoin = "round";
      g.strokeStyle = "#f2f1ea";
    }
    return g;
  };

  return (
    <>
      <h2 className="text-2xl font-normal tracking-tight text-fg">
        {t("Firma del conductor", "Driver's signature")}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg/55">
        {t(
          "Firme con el dedo en el celular o con el mouse en el computador. En el demo la firma es una imagen; su valor probatorio es alcance de piloto y se dice así de claro.",
          "Sign with your finger on a phone or with the mouse on a computer. In the demo the signature is an image; its legal weight is pilot scope, and we say so plainly.",
        )}
      </p>

      <div className="mt-9 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <canvas
            ref={canvas}
            width={720}
            height={260}
            // touch-none o el navegador hace scroll en vez de dejar firmar:
            // es el bug clásico de esta pantalla.
            className="glass w-full touch-none rounded-card"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              const g = ctx();
              if (!g) return;
              const p = punto(e);
              g.beginPath();
              g.moveTo(p.x, p.y);
              setTrazando(true);
            }}
            onPointerMove={(e) => {
              if (!trazando) return;
              const g = ctx();
              if (!g) return;
              const p = punto(e);
              g.lineTo(p.x, p.y);
              g.stroke();
            }}
            onPointerUp={(e) => {
              setTrazando(false);
              onFirma(e.currentTarget.toDataURL("image/png"));
            }}
          />
          <div className="mt-4 flex flex-wrap items-center gap-5">
            <Boton
              variante="contorno"
              onClick={() => {
                const c = canvas.current;
                c?.getContext("2d")?.clearRect(0, 0, c.width, c.height);
                onFirma("");
              }}
            >
              {t("Limpiar firma", "Clear signature")}
            </Boton>
            <span className="text-sm text-fg/55">
              {firma ? t("Firma capturada.", "Signature captured.") : t("Sin firmar.", "Not signed.")}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <Campo
            etiqueta={t("Kilometraje del tablero", "Odometer reading")}
            type="number"
            value={km}
            onChange={(e) => onKm(Number(e.target.value))}
            ayuda={t(
              `Registrado en el sistema: ${numero(vehiculo.kmActual)} km`,
              `Recorded in the system: ${numero(vehiculo.kmActual)} km`,
            )}
          />

          <div className="border-t border-line pt-6">
            <p className="label text-fg/40">{t("Resultado que va a quedar", "Result to be recorded")}</p>
            <p
              className={`mt-4 font-serif text-4xl ${
                veredicto.resultado === "bloqueado" ? "text-alerta" : "text-ok"
              }`}
            >
              {veredicto.resultado === "bloqueado" ? t("Bloqueado", "Blocked") : t("Aprobado", "Approved")}
            </p>
            {veredicto.fallas.length ? (
              <ul className="mt-4 flex flex-col gap-2 text-sm text-fg/75">
                {veredicto.fallas.map((id) => (
                  <li key={id} className="border-l border-alerta pl-3">
                    {dato(checklist.find((i) => i.id === id)?.texto ?? id)}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-4">
            <Boton variante="contorno" onClick={onVolver}>
              {t("Volver al checklist", "Back to checklist")}
            </Boton>
            <Boton variante="lima" onClick={onCerrar} disabled={!firma}>
              {t("Cerrar inspección", "Close inspection")}
            </Boton>
          </div>
          {!firma ? (
            <p className="text-sm text-fg/55">
              {t("Falta la firma para cerrar.", "A signature is needed to close.")}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

/* --- Paso 4: resultado -------------------------------------------------- */

function Resultado({ inspeccion, onOtra }: { inspeccion: Inspeccion; onOtra: () => void }) {
  const t = useT();
  const dato = useDato();
  const { horaCorta, numero } = useFormato();
  const bloqueado = inspeccion.resultado === "bloqueado";
  const fallas = evaluar(inspeccion.respuestas).fallas;

  return (
    <div
      className={`rounded-card border-t-2 p-10 ${bloqueado ? "border-alerta bg-alerta-suave" : "border-ok bg-ok-suave"}`}
    >
      <p className="label text-fg/55">
        {inspeccion.placa} · {inspeccion.conductor} · {horaCorta(inspeccion.fecha)}
      </p>
      <p
        className={`mt-6 font-serif text-6xl leading-none ${bloqueado ? "text-alerta" : "text-ok"}`}
      >
        {bloqueado ? t("Vehículo bloqueado", "Vehicle blocked") : t("Vehículo aprobado", "Vehicle approved")}
      </p>
      <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-fg/75">
        {bloqueado
          ? t(
              "Falló un ítem crítico. En una operación real esto le llega al jefe de patio y el vehículo no sale hasta que se subsane.",
              "A critical item failed. In a real operation this goes to the yard manager and the vehicle doesn't leave until it's fixed.",
            )
          : t(
              "Ningún ítem crítico falló. La inspección queda registrada con la firma del conductor y el kilometraje del tablero.",
              "No critical item failed. The inspection is recorded with the driver's signature and the odometer reading.",
            )}
      </p>

      {fallas.length ? (
        <ul className="mt-8 flex flex-col gap-2">
          {fallas.map((id) => (
            <li key={id} className="border-l-2 border-alerta pl-4 text-fg/90">
              {dato(checklist.find((i) => i.id === id)?.texto ?? id)}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
        <Cifra valor={numero(inspeccion.kmTablero)} etiqueta={t("Km del tablero", "Odometer km")} />
        <Cifra
          valor={inspeccion.respuestas.filter((r) => r.estado === "malo").length}
          etiqueta={t("Hallazgos", "Findings")}
          tono={bloqueado ? "alerta" : "neutro"}
        />
        <Cifra
          valor={inspeccion.firma ? t("Sí", "Yes") : "No"}
          etiqueta={t("Firmada", "Signed")}
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <Boton onClick={onOtra}>{t("Hacer otra inspección", "Do another inspection")}</Boton>
        <Paso href="/demos/preoperacional/tablero">
          {t("Ver el tablero con esta inspección", "See the dashboard with this inspection")}
        </Paso>
      </div>

      <div className="mt-10">
        <Aviso titulo={t("Lo que acaba de pasar", "What just happened")}>
          {t(
            "Esta inspección vive en su navegador durante la demostración. En el piloto vive en el servidor de la empresa, con usuarios, respaldo y trazabilidad de quién firmó qué y cuándo.",
            "This inspection lives in your browser during the demo. In the pilot it lives on the company's server, with users, backups and a trail of who signed what and when.",
          )}
        </Aviso>
      </div>
    </div>
  );
}
