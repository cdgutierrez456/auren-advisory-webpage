import {
  type ModoVision,
  type Resultado,
  grises,
  mascaraTinta,
  mediana,
} from "../shell.ts";

/**
 * Modo B — Medidor análogo (manómetro, contador, báscula de aguja).
 *
 * Geometría pura, sin modelo entrenado: se busca el ángulo donde hay más
 * trazo entre el 30% y el 90% del radio, y ese ángulo es la aguja.
 *
 * ponytail: en vez de detectar el dial con transformada de Hough, el operario
 * lo encuadra dentro del círculo de la guía. Ya tiene que calibrar tocando el
 * cero y el fondo de escala, así que encuadrar es un gesto más y no un
 * algoritmo más. Hough entra si el piloto necesita cámara fija sin operario.
 */

/**
 * El mundo físico no es el diagrama: cada manómetro tiene su escala, su cero
 * mecánico y su aguja torcida. La calibración NO se elimina por simplicidad —
 * es lo que hace que la lectura sirva. Calibrar delante del cliente, con SU
 * manómetro, ES la demostración.
 */
export type Calibracion = {
  /** Grados del cero de la escala. Convención: 0° a la derecha, positivo
   *  antihorario. Un manómetro típico va de 225° a −45°. */
  anguloMin: number;
  anguloMax: number;
  valorMin: number;
  valorMax: number;
  unidad: string;
  /** Corrección fina contra la lectura real del instrumento. */
  offset: number;
};

export const calibracion: Calibracion = {
  anguloMin: 225,
  anguloMax: -45,
  valorMin: 0,
  valorMax: 10,
  unidad: "bar",
  offset: 0,
};

export function anguloAValor(grados: number, c: Calibracion): number {
  const recorrido = c.anguloMin - c.anguloMax; // 270° típico
  const avance = (c.anguloMin - grados) / recorrido; // 0–1
  return +(c.valorMin + avance * (c.valorMax - c.valorMin) + c.offset).toFixed(2);
}

/** Últimas lecturas, para suavizar. Cinco es suficiente a 5 FPS. */
const ultimas: number[] = [];

export const medidor: ModoVision = {
  id: "medidor",
  intervaloMs: 200,
  guia: { forma: "circulo", x: 0.28, y: 0.08, w: 0.44, h: 0.84 },
  umbral: 0.5,

  async preparar() {
    ultimas.length = 0;
  },

  async procesar(ctx, canvas): Promise<Resultado | null> {
    const px = ctx.getImageData(0, 0, canvas.width, canvas.height);
    grises(px);
    const tinta = mascaraTinta(px);

    const lado = canvas.width;
    const c = lado / 2;
    const rInterior = lado * 0.15;
    const rExterior = lado * 0.45;

    // Barrido radial de 0 a 360° en pasos de 0,5°.
    const pasos = 720;
    const puntaje = new Float32Array(pasos);
    for (let k = 0; k < pasos; k++) {
      const rad = (k * 0.5 * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sen = Math.sin(rad);
      let suma = 0;
      for (let r = rInterior; r < rExterior; r += 1) {
        const x = Math.round(c + r * cos);
        // El eje Y de la pantalla crece hacia abajo; los grados, hacia arriba.
        const y = Math.round(c - r * sen);
        if (x < 0 || y < 0 || x >= lado || y >= lado) continue;
        suma += tinta[y * lado + x];
      }
      puntaje[k] = suma;
    }

    let mejor = 0;
    let indice = 0;
    for (let k = 0; k < pasos; k++) {
      if (puntaje[k] > mejor) {
        mejor = puntaje[k];
        indice = k;
      }
    }

    // Si el máximo no destaca sobre el resto del barrido no hay aguja: hay
    // ruido, reflejo o un encuadre malo. Mejor no mostrar nada.
    const base = Math.max(mediana(Array.from(puntaje)), 1);
    const relacion = mejor / base;
    if (relacion < 1.6) return null;

    const grados = indice * 0.5;
    const valor = anguloAValor(grados, calibracion);

    ultimas.push(valor);
    if (ultimas.length > 5) ultimas.shift();
    const suavizado = mediana(ultimas);

    return {
      valor: `${suavizado.toFixed(2)} ${calibracion.unidad}`,
      confianza: Math.min(1, relacion / 3),
      nota: `aguja en ${grados.toFixed(0)}°`,
    };
  },

  liberar() {
    ultimas.length = 0;
  },
};
