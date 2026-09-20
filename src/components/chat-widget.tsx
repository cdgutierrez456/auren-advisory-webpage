"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { Mark } from "@/components/logo";
import { site } from "@/content/site";
import { formatear, type Trozo } from "@/lib/chat-format";

/**
 * Asistente de Auren — burbuja flotante en todas las páginas.
 *
 * Habla con el servicio de `bot-page` (FastAPI + Claude), que responde en
 * streaming sobre el contenido real del sitio. Aquí no hay conocimiento
 * alguno: si el bot debe saber algo nuevo, se cambia el texto en `site.ts` y
 * se corre `npm run build:kb`.
 *
 * El texto de la conversación va en `text-base`, el mismo cuerpo con el que se
 * lee la página (16px). En `text-sm` la letra era la misma —Geist, como todo el
 * sitio— pero un 12% más chica, y eso solo se lee como «aquí la tipografía es
 * otra». El chrome (encabezado, chips, pie) sí se queda en los peldaños
 * pequeños: son interfaz, no lectura. De paso, un campo de texto por debajo de
 * 16px hace que Safari en iOS aplique zoom al enfocarlo.
 *
 * **Sin persistencia, igual que la Radiografía.** La conversación vive en el
 * estado de React: sobrevive a la navegación entre páginas (el layout no se
 * desmonta) y muere al recargar. No hay localStorage ni nada que el visitante
 * no haya decidido entregar.
 */

const BOT_URL = process.env.NEXT_PUBLIC_BOT_URL ?? "http://localhost:8000";

type Turno = { role: "user" | "assistant"; content: string };

const SUGERENCIAS = [
  "¿Qué hace exactamente Auren?",
  "¿Cómo sé si necesito automatizar?",
  "¿Qué incluye el diagnóstico?",
] as const;

const BIENVENIDA =
  "Hola, soy Aura, el asistente de Auren. Estoy para ayudarte a entender cómo trabajamos y si tu empresa tiene una oportunidad de mejora. Cuéntame en qué andas o pregúntame lo que quieras.";

/** Pinta los trozos de una línea: negritas y enlaces que se pueden tocar. */
function Linea({ trozos }: { trozos: readonly Trozo[] }) {
  return (
    <>
      {trozos.map((t, i) => {
        if (t.tipo === "negrita") {
          return (
            <strong key={i} className="font-medium text-fg">
              {t.texto}
            </strong>
          );
        }
        if (t.tipo === "texto") return <span key={i}>{t.texto}</span>;

        // `fuerte` viene de haber absorbido una negrita: «**Auren Insight**
        // (/servicios/auren-insight)» se funde en un solo enlace, y el peso
        // que el bot le dio al nombre no se pierde por el camino.
        const estilo = `text-accent underline decoration-line-strong underline-offset-2 transition-colors hover:decoration-lime ${
          t.fuerte ? "font-medium" : ""
        }`;
        // Las rutas del sitio van por <Link>: navegan sin recargar, así que el
        // chat sigue abierto y con su conversación cuando la persona llega.
        return t.externo ? (
          <a key={i} href={t.href} target="_blank" rel="noopener noreferrer" className={estilo}>
            {t.texto}
          </a>
        ) : (
          <Link key={i} href={t.href} className={estilo}>
            {t.texto}
          </Link>
        );
      })}
    </>
  );
}

/** La respuesta del bot, ya formateada. */
function Respuesta({ texto }: { texto: string }) {
  return (
    <>
      {formatear(texto).map((bloque, i) =>
        bloque.tipo === "lista" ? (
          bloque.ordenada ? (
            <ol key={i} className="ml-1 list-decimal space-y-1.5 pl-5 marker:text-fg/40">
              {bloque.items.map((item, j) => (
                <li key={j}>
                  <Linea trozos={item} />
                </li>
              ))}
            </ol>
          ) : (
            <ul key={i} className="ml-1 list-disc space-y-1.5 pl-4 marker:text-fg/40">
              {bloque.items.map((item, j) => (
                <li key={j}>
                  <Linea trozos={item} />
                </li>
              ))}
            </ul>
          )
        ) : (
          <p key={i}>
            <Linea trozos={bloque.trozos} />
          </p>
        ),
      )}
    </>
  );
}

export function ChatWidget() {
  const [abierto, setAbierto] = useState(false);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [borrador, setBorrador] = useState("");
  const [cargando, setCargando] = useState(false);

  const hilo = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLTextAreaElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // El hilo sigue al último mensaje mientras el texto llega en streaming.
  useEffect(() => {
    hilo.current?.scrollTo({ top: hilo.current.scrollHeight, behavior: "smooth" });
  }, [turnos, cargando]);

  useEffect(() => {
    if (abierto) campo.current?.focus();
  }, [abierto]);

  // Escape cierra. Un panel flotante que solo se cierra con el ratón deja
  // atrapado a quien navega con teclado.
  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  }, [abierto]);

  async function enviar(texto: string) {
    const pregunta = texto.trim();
    if (!pregunta || cargando) return;

    const historial: Turno[] = [...turnos, { role: "user", content: pregunta }];
    setTurnos([...historial, { role: "assistant", content: "" }]);
    setBorrador("");
    setCargando(true);

    // Escribe el último turno (el del asistente) conforme llegan los trozos.
    const escribir = (fn: (previo: string) => string) =>
      setTurnos((t) => t.map((turno, i) => (i === t.length - 1 ? { ...turno, content: fn(turno.content) } : turno)));

    try {
      const respuesta = await fetch(`${BOT_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historial }),
      });

      if (!respuesta.ok || !respuesta.body) {
        throw new Error(
          respuesta.status === 429
            ? "Demasiadas preguntas seguidas. Espere un minuto."
            : "No pude conectarme.",
        );
      }

      // SSE a mano: son eventos `data: {...}` separados por línea en blanco.
      // EventSource no sirve porque solo hace GET, y esto es un POST.
      const lector = respuesta.body.getReader();
      const decodificador = new TextDecoder();
      let resto = "";

      for (;;) {
        const { done, value } = await lector.read();
        if (done) break;

        resto += decodificador.decode(value, { stream: true });
        const bloques = resto.split("\n\n");
        resto = bloques.pop() ?? ""; // el último puede venir cortado a la mitad

        for (const bloque of bloques) {
          const linea = bloque.split("\n").find((l) => l.startsWith("data: "));
          if (!linea) continue;

          const evento = JSON.parse(linea.slice(6));
          if (evento.type === "delta") escribir((previo) => previo + evento.text);
          else if (evento.type === "error") escribir(() => evento.message);
        }
      }
    } catch (e) {
      escribir(
        () =>
          `${e instanceof Error ? e.message : "Algo falló"} Escríbanos por WhatsApp al ${site.whatsappDisplay} y le respondemos.`,
      );
    } finally {
      setCargando(false);
      campo.current?.focus();
    }
  }

  const vacio = turnos.length === 0;

  return (
    <>
      {/* Disparador. El símbolo de la marca, no un icono de robot: el manual
          prohíbe iconografía de IA, y el Vértice sobre lima ya es una pieza
          del sistema (tono `lime-bg`). */}
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-label={abierto ? "Cerrar el asistente" : "Abrir el asistente de Auren"}
        className="shadow-float fixed bottom-21 right-6 z-50 inline-flex size-14 items-center justify-center rounded-pill bg-lime text-ink transition-all duration-300 ease-out-quint hover:-translate-y-0.5 hover:shadow-[0_0_44px_-6px_var(--color-lime)] active:scale-[0.97] md:bottom-24 md:right-9"
      >
        {abierto ? (
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
          </svg>
        ) : (
          <Mark size={26} tone="lime-bg" />
        )}
      </button>

      {abierto && (
        <div
          ref={panel}
          role="dialog"
          aria-modal="false"
          aria-label="Asistente de Auren Advisory"
          className="panel shadow-float fixed inset-x-4 bottom-38 z-50 flex max-h-[min(34rem,72vh)] flex-col overflow-hidden rounded-card md:inset-x-auto md:bottom-41 md:right-9 md:w-[26rem]"
        >
          <header className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <p className="label text-fg/55">Asistente</p>
              <p className="mt-1.5 text-sm text-fg/90">Preguntas sobre Auren</p>
            </div>
            <button
              type="button"
              onClick={() => setTurnos([])}
              disabled={vacio || cargando}
              className="label text-fg/40 transition-colors duration-300 hover:text-accent disabled:pointer-events-none disabled:opacity-0"
            >
              Limpiar
            </button>
          </header>

          <div ref={hilo} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            <p className="text-base leading-relaxed text-fg/75">{BIENVENIDA}</p>

            {vacio && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGERENCIAS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => enviar(s)}
                    className="rounded-pill border border-line-strong px-3.5 py-2 text-left text-xs text-fg/75 transition-colors duration-300 hover:border-lime hover:text-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* `aria-live` para que un lector de pantalla anuncie la respuesta
                sin que la persona tenga que ir a buscarla. */}
            <div aria-live="polite" className="space-y-4">
              {turnos.map((t, i) =>
                t.role === "user" ? (
                  <p
                    key={i}
                    className="ml-auto w-fit max-w-[85%] rounded-card bg-surface-3 px-4 py-2.5 text-base leading-relaxed text-fg/90"
                  >
                    {t.content}
                  </p>
                ) : (
                  <div key={i} className="max-w-[92%] space-y-3 text-base leading-relaxed text-fg/75">
                    <Respuesta texto={t.content} />
                    {cargando && i === turnos.length - 1 && (
                      <span className="-mt-3 ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-lime align-middle" />
                    )}
                  </div>
                ),
              )}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              enviar(borrador);
            }}
            className="flex items-end gap-2 border-t border-line px-4 py-3"
          >
            <label className="sr-only" htmlFor="chat-pregunta">
              Su pregunta
            </label>
            <textarea
              id="chat-pregunta"
              ref={campo}
              rows={1}
              value={borrador}
              maxLength={2000}
              onChange={(e) => setBorrador(e.target.value)}
              onKeyDown={(e) => {
                // Enter envía, Mayús+Enter salta de línea: lo que espera
                // cualquiera que haya usado un chat.
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  enviar(borrador);
                }
              }}
              placeholder="Escriba su pregunta…"
              className="max-h-28 flex-1 resize-none bg-transparent py-2.5 text-base text-fg placeholder:text-fg/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!borrador.trim() || cargando}
              aria-label="Enviar pregunta"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-pill bg-lime text-ink transition-all duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-30"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h13M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
