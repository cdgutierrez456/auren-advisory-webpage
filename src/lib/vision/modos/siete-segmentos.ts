import {
  type ModoVision,
  type Resultado,
  densidad,
  grises,
  mascaraTinta,
} from "../shell.ts";

/**
 * Modo C — Display de 7 segmentos (báscula, balanza, equipo viejo con LED).
 *
 * Un dígito de siete segmentos es un problema resuelto desde 1970: se mira si
 * cada uno de los siete trazos está encendido y se busca la combinación en la
 * tabla. Meterle una red neuronal a esto es exactamente el error que este
 * proyecto no comete.
 *
 * Es el modo más barato del catálogo y el que se construye primero: valida el
 * shell de cámara completo —permisos, bucle, guía, liberación del stream—
 * antes de meterse con OCR.
 */

/** Configuración que el operario ajusta en pantalla. */
export const configSegmentos = { digitos: 4 };

//                        a b c d e f g
export const TABLA: Record<string, string> = {
  "1111110": "0",
  "0110000": "1",
  "1101101": "2",
  "1111001": "3",
  "0110011": "4",
  "1011011": "5",
  "1011111": "6",
  "1110000": "7",
  "1111111": "8",
  "1111011": "9",
  "0000000": " ",
  "0000001": "-",
};

/** Posición relativa de cada segmento dentro de la caja del dígito. */
export const SEGMENTOS: [x: number, y: number, w: number, h: number][] = [
  [0.22, 0.02, 0.56, 0.13], // a — superior
  [0.80, 0.10, 0.14, 0.35], // b — superior derecho
  [0.80, 0.55, 0.14, 0.35], // c — inferior derecho
  [0.22, 0.85, 0.56, 0.13], // d — inferior
  [0.06, 0.55, 0.14, 0.35], // e — inferior izquierdo
  [0.06, 0.10, 0.14, 0.35], // f — superior izquierdo
  [0.22, 0.44, 0.56, 0.12], // g — central
];

/** Encendido si más del 40% del área del segmento tiene tinta. */
const ENCENDIDO = 0.4;

export const sieteSegmentos: ModoVision = {
  id: "siete-segmentos",
  intervaloMs: 220,
  guia: { forma: "rect", x: 0.2, y: 0.36, w: 0.6, h: 0.26 },
  umbral: 0.6,

  async preparar() {
    // Sin dependencias y sin pesos que descargar: por eso este modo funciona
    // aunque el WiFi del hospital esté caído.
  },

  async procesar(ctx, canvas): Promise<Resultado | null> {
    const px = ctx.getImageData(0, 0, canvas.width, canvas.height);
    grises(px);
    const tinta = mascaraTinta(px);

    const n = configSegmentos.digitos;
    const ancho = canvas.width / n;
    let texto = "";
    let legibles = 0;

    for (let i = 0; i < n; i++) {
      const bits = SEGMENTOS.map(([x, y, w, h]) =>
        densidad(
          tinta,
          canvas.width,
          i * ancho + x * ancho,
          y * canvas.height,
          w * ancho,
          h * canvas.height,
        ) > ENCENDIDO
          ? "1"
          : "0",
      ).join("");

      const digito = TABLA[bits];
      if (digito === undefined) {
        texto += "?";
      } else {
        texto += digito;
        legibles++;
      }
    }

    const valor = texto.trim();
    if (!valor) return null;

    return {
      valor,
      confianza: legibles / n,
      nota: `${n} dígitos · tabla de verdad, sin modelo`,
    };
  },

  liberar() {
    // Nada que liberar: no hay worker ni pesos cargados.
  },
};
