import { type ModoVision, type Resultado, grises, mascaraTinta } from "../shell.ts";

/**
 * Modo A — Lectura de placas (ALPR).
 *
 * El modo que más se pide y el que más disciplina exige: una lectura errada
 * delante del cliente cuesta más que no tener el modo. Por eso hay dos
 * filtros después del OCR —formato válido y votación temporal— y por eso, si
 * no hay certeza, la pantalla no muestra ningún número.
 */

/** Formato de placa colombiana. Lo que no calce, se descarta sin mostrarlo. */
const FORMATOS = [
  /^[A-Z]{3}\d{3}$/, // particular
  /^[A-Z]{3}\d{2}[A-Z]$/, // motocicleta
];

const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/** El tipo del worker sin importar el paquete: `typeof import()` en posición
 *  de tipo se borra al compilar, así que tesseract.js no entra al bundle
 *  común. Abrir /demos/pqrsd no debe descargar un motor de OCR. */
type Worker = Awaited<ReturnType<typeof import("tesseract.js").createWorker>>;

let worker: Worker | null = null;

/** Votación temporal: se acepta la placa que aparezca igual en 3 de los
 *  últimos 5 fotogramas. Esto es lo que convierte un OCR nervioso en una
 *  lectura que se ve firme. */
const votos: string[] = [];
const VENTANA = 5;
const MINIMO = 3;

export const placas: ModoVision = {
  id: "placas",
  // ~3 fotogramas por segundo: sobra para un carro entrando a un patio.
  intervaloMs: 350,
  guia: { forma: "rect", x: 0.14, y: 0.38, w: 0.72, h: 0.22 },
  umbral: 0.5,

  async preparar(avisar) {
    votos.length = 0;
    if (worker) return;

    avisar("Descargando el motor de OCR (~2 MB, solo la primera vez)…");
    const { createWorker } = await import("tesseract.js");
    worker = await createWorker("eng");
    await worker.setParameters({
      tessedit_char_whitelist: LETRAS,
      // Una sola línea de texto: sin esto intenta encontrar párrafos.
      tessedit_pageseg_mode: "7",
    } as never);
    avisar("");
  },

  async procesar(ctx, canvas): Promise<Resultado | null> {
    if (!worker) return null;

    // Normalización de polaridad: Tesseract espera texto oscuro sobre fondo
    // claro. La máscara de tinta deja así tanto la placa amarilla con letras
    // negras como una blanca sobre fondo oscuro.
    const px = ctx.getImageData(0, 0, canvas.width, canvas.height);
    grises(px);
    const tinta = mascaraTinta(px);
    for (let i = 0; i < tinta.length; i++) {
      const v = tinta[i] ? 0 : 255;
      px.data[i * 4] = v;
      px.data[i * 4 + 1] = v;
      px.data[i * 4 + 2] = v;
    }
    ctx.putImageData(px, 0, 0);

    const { data } = await worker.recognize(canvas);
    const texto = data.text.replace(/[^A-Z0-9]/gi, "").toUpperCase();
    if (!FORMATOS.some((f) => f.test(texto))) return null;

    votos.push(texto);
    if (votos.length > VENTANA) votos.shift();
    const veces = votos.filter((v) => v === texto).length;
    if (veces < MINIMO) {
      return { valor: "", confianza: 0, nota: `confirmando… ${veces}/${MINIMO}` };
    }

    return {
      valor: texto,
      confianza: Math.max(data.confidence / 100, 0.5),
      nota: `${veces} de los últimos ${VENTANA} fotogramas coinciden`,
    };
  },

  liberar() {
    votos.length = 0;
    // El worker se conserva entre encendidos: recrearlo vuelve a descargar el
    // motor y en una demostración eso son diez segundos en blanco.
  },
};

/** Se llama al salir de la ruta, no al apagar la cámara. */
export async function liberarOCR() {
  await worker?.terminate();
  worker = null;
}
