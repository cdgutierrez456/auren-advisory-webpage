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
  horaCorta,
  numero,
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

/**
 * Demo 1 — Inspección preoperacional.
 *
 * Un solo flujo en cuatro pasos: vehículo → checklist → firma → resultado. Se
 * recorre en 90 segundos y termina en el tablero. La única regla de negocio
 * (un ítem crítico en malo bloquea la salida) vive en `evaluar()`, probada.
 */
export default function Preoperacional() {
  return (
    <>
      <DemoHeader slug="preoperacional">
        <Paso href="/demos/preoperacional/tablero">Ver el tablero de cumplimiento</Paso>
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

const PASOS: { id: PasoFlujo; texto: string }[] = [
  { id: "vehiculo", texto: "Vehículo" },
  { id: "checklist", texto: "Checklist" },
  { id: "firma", texto: "Firma" },
  { id: "resultado", texto: "Resultado" },
];

function Progreso({ paso, vehiculo }: { paso: PasoFlujo; vehiculo: Vehiculo | null }) {
  const actual = PASOS.findIndex((p) => p.id === paso);
  return (
    <div className="mb-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-rule pb-5">
      {PASOS.map((p, i) => (
        <span
          key={p.id}
          className={`label flex items-center gap-3 ${i <= actual ? "text-deep" : "text-deep/30"}`}
        >
          <span className={`h-0.5 w-6 ${i <= actual ? "bg-lime" : "bg-rule-strong"}`} />
          {p.texto}
        </span>
      ))}
      {vehiculo ? (
        <span className="ml-auto font-mono text-sm text-deep/60">
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
  const hoy = iso(new Date());
  const ultima = (placa: string) =>
    hechas.find((i) => i.placa === placa && i.fecha.slice(0, 10) === hoy);

  return (
    <>
      <h2 className="text-2xl font-normal tracking-tight text-deep">
        ¿Qué vehículo va a salir?
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-deep/60">
        Toque cualquiera. Los que ya tienen inspección de hoy la muestran al
        lado — así el jefe de patio ve de una vez quién falta.
      </p>

      <div className="mt-9 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {vehiculos.map((v) => {
          const u = ultima(v.placa);
          return (
            <button
              key={v.placa}
              type="button"
              onClick={() => onElegir(v)}
              className="flex flex-col items-start gap-3 bg-ivory p-6 text-left transition-colors hover:bg-paper"
            >
              <span className="flex w-full items-center justify-between gap-4">
                <span className="font-mono text-lg text-deep">{v.placa}</span>
                {u ? (
                  <Pill tono={u.resultado === "bloqueado" ? "alerta" : "ok"}>
                    {u.resultado === "bloqueado" ? "Bloqueado" : "Aprobado"}
                  </Pill>
                ) : (
                  <Pill tono="aviso">Sin inspección</Pill>
                )}
              </span>
              <span className="text-sm text-deep/70">{v.conductor}</span>
              <span className="text-xs capitalize text-deep/45">
                {v.tipo} · {numero(v.kmActual)} km
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
  const respondidos = checklist.length - veredicto.sinResponder.length;
  const de = (id: string) => respuestas.find((r) => r.itemId === id);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-normal tracking-tight text-deep">
            Revise los 22 ítems
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-deep/60">
            Los marcados con <b className="text-alerta">●</b> son críticos: uno
            solo en «Malo» bloquea la salida del vehículo. Los que exigen foto
            la piden en el momento.
          </p>
        </div>
        <p className="label text-deep/45">
          {respondidos} de {checklist.length} respondidos
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {grupos.map((grupo) => (
          <div key={grupo}>
            <div className="flex items-baseline gap-5">
              <span className="label text-deep/50">{grupo}</span>
              <span className="h-px flex-1 bg-rule" />
            </div>
            <ul className="mt-4 flex flex-col gap-px bg-rule">
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

      <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-rule pt-8">
        <Boton variante="contorno" onClick={onVolver}>
          Cambiar vehículo
        </Boton>
        <Boton onClick={onSeguir} disabled={veredicto.incompleta}>
          Continuar a la firma
        </Boton>
        <p className="text-sm text-deep/60" role="status">
          {veredicto.sinResponder.length > 0
            ? `Faltan ${veredicto.sinResponder.length} ítems por responder.`
            : veredicto.sinFoto.length > 0
              ? "Hay un hallazgo que exige foto y no la tiene."
              : veredicto.resultado === "bloqueado"
                ? "Con estos hallazgos el vehículo quedará BLOQUEADO."
                : "Todo en orden. El vehículo saldrá aprobado."}
        </p>
      </div>
    </>
  );
}

const ESTADOS = [
  { valor: "bueno", texto: "Bueno" },
  { valor: "malo", texto: "Malo" },
  { valor: "na", texto: "N.A." },
] as const;

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
  const malo = respuesta?.estado === "malo";
  const faltaFoto = malo && item.exigeFoto && !respuesta?.foto;

  return (
    <li className="flex flex-col gap-4 bg-ivory p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div className="flex items-start gap-3">
        {item.critico ? (
          <span className="mt-1 text-alerta" title="Ítem crítico: bloquea la salida">
            ●
          </span>
        ) : (
          <span className="mt-1 text-deep/20">○</span>
        )}
        <div>
          <p className="text-deep">{item.texto}</p>
          {malo ? (
            <p className="mt-1.5 text-sm text-alerta">
              {item.critico ? "Bloquea la salida del vehículo. " : ""}
              {item.exigeFoto ? (respuesta?.foto ? "Foto adjunta." : "Exige foto.") : ""}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {faltaFoto ? <CapturaFoto onFoto={onFoto} /> : null}
        {respuesta?.foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={respuesta.foto}
            alt="Evidencia del hallazgo"
            className="h-11 w-11 border border-rule-strong object-cover"
          />
        ) : null}
        <div className="flex gap-px bg-rule-strong">
          {ESTADOS.map((e) => {
            const activo = respuesta?.estado === e.valor;
            const tono =
              e.valor === "malo"
                ? "bg-alerta text-ivory"
                : e.valor === "bueno"
                  ? "bg-ok text-ivory"
                  : "bg-deep text-ivory";
            return (
              <button
                key={e.valor}
                type="button"
                aria-pressed={activo}
                onClick={() => onResponder(e.valor)}
                // 44px de alto mínimo: esto se usa de pie, en el patio, con
                // una mano y a veces con guante.
                className={`label min-h-11 min-w-16 px-4 transition-colors ${
                  activo ? tono : "bg-ivory text-deep/55 hover:bg-paper"
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
function CapturaFoto({ onFoto }: { onFoto: (foto: string) => void }) {
  return (
    <label className="label min-h-11 cursor-pointer border border-alerta px-4 py-3 text-alerta transition-colors hover:bg-alerta-suave">
      Adjuntar foto
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
      g.strokeStyle = "#111414";
    }
    return g;
  };

  return (
    <>
      <h2 className="text-2xl font-normal tracking-tight text-deep">Firma del conductor</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-deep/60">
        Firme con el dedo en el celular o con el mouse en el computador. En el
        demo la firma es una imagen; su valor probatorio es alcance de piloto y
        se dice así de claro.
      </p>

      <div className="mt-9 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <canvas
            ref={canvas}
            width={720}
            height={260}
            // touch-none o el navegador hace scroll en vez de dejar firmar:
            // es el bug clásico de esta pantalla.
            className="w-full touch-none border border-rule-strong bg-paper"
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
              Limpiar firma
            </Boton>
            <span className="text-sm text-deep/55">
              {firma ? "Firma capturada." : "Sin firmar."}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <Campo
            etiqueta="Kilometraje del tablero"
            type="number"
            value={km}
            onChange={(e) => onKm(Number(e.target.value))}
            ayuda={`Registrado en el sistema: ${numero(vehiculo.kmActual)} km`}
          />

          <div className="border-t border-rule pt-6">
            <p className="label text-deep/45">Resultado que va a quedar</p>
            <p
              className={`mt-4 font-serif text-4xl ${
                veredicto.resultado === "bloqueado" ? "text-alerta" : "text-ok"
              }`}
            >
              {veredicto.resultado === "bloqueado" ? "Bloqueado" : "Aprobado"}
            </p>
            {veredicto.fallas.length ? (
              <ul className="mt-4 flex flex-col gap-2 text-sm text-deep/70">
                {veredicto.fallas.map((id) => (
                  <li key={id} className="border-l border-alerta pl-3">
                    {checklist.find((i) => i.id === id)?.texto}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-4">
            <Boton variante="contorno" onClick={onVolver}>
              Volver al checklist
            </Boton>
            <Boton variante="lima" onClick={onCerrar} disabled={!firma}>
              Cerrar inspección
            </Boton>
          </div>
          {!firma ? (
            <p className="text-sm text-deep/55">Falta la firma para cerrar.</p>
          ) : null}
        </div>
      </div>
    </>
  );
}

/* --- Paso 4: resultado -------------------------------------------------- */

function Resultado({ inspeccion, onOtra }: { inspeccion: Inspeccion; onOtra: () => void }) {
  const bloqueado = inspeccion.resultado === "bloqueado";
  const fallas = evaluar(inspeccion.respuestas).fallas;

  return (
    <div
      className={`border-t-2 p-10 ${bloqueado ? "border-alerta bg-alerta-suave" : "border-ok bg-ok-suave"}`}
    >
      <p className="label text-deep/50">
        {inspeccion.placa} · {inspeccion.conductor} · {horaCorta(inspeccion.fecha)}
      </p>
      <p
        className={`mt-6 font-serif text-6xl leading-none ${bloqueado ? "text-alerta" : "text-ok"}`}
      >
        {bloqueado ? "Vehículo bloqueado" : "Vehículo aprobado"}
      </p>
      <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-deep/75">
        {bloqueado
          ? "Falló un ítem crítico. En una operación real esto le llega al jefe de patio y el vehículo no sale hasta que se subsane."
          : "Ningún ítem crítico falló. La inspección queda registrada con la firma del conductor y el kilometraje del tablero."}
      </p>

      {fallas.length ? (
        <ul className="mt-8 flex flex-col gap-2">
          {fallas.map((id) => (
            <li key={id} className="border-l-2 border-alerta pl-4 text-deep/80">
              {checklist.find((i) => i.id === id)?.texto}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-10 grid gap-8 border-t border-rule pt-8 sm:grid-cols-3">
        <Cifra valor={numero(inspeccion.kmTablero)} etiqueta="Km del tablero" />
        <Cifra
          valor={inspeccion.respuestas.filter((r) => r.estado === "malo").length}
          etiqueta="Hallazgos"
          tono={bloqueado ? "alerta" : "neutro"}
        />
        <Cifra valor={inspeccion.firma ? "Sí" : "No"} etiqueta="Firmada" />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <Boton onClick={onOtra}>Hacer otra inspección</Boton>
        <Paso href="/demos/preoperacional/tablero">Ver el tablero con esta inspección</Paso>
      </div>

      <div className="mt-10">
        <Aviso titulo="Lo que acaba de pasar">
          Esta inspección vive en su navegador durante la demostración. En el
          piloto vive en el servidor de la empresa, con usuarios, respaldo y
          trazabilidad de quién firmó qué y cuándo.
        </Aviso>
      </div>
    </div>
  );
}
