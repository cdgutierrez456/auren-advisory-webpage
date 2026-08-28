/**
 * Shell de cámara: abre el video, corre el bucle y entrega recortes.
 *
 * No sabe nada de placas ni de manómetros — eso lo pone el modo. Un modo
 * nuevo no toca el shell, ni el layout, ni los permisos, ni el manejo de
 * errores: implementa cuatro métodos y se registra. Esa es la decisión que
 * convierte diez demos de visión en diez archivos de cien líneas.
 *
 * Todo corre en el navegador. No hay endpoint al que mandar el frame: que el
 * video no salga del equipo no es una promesa contractual, es una propiedad
 * de la arquitectura.
 */

export type Resultado = {
  /** Lo que se muestra: "WGT481", "4.2 bar", "128.5". */
  valor: string;
  /** 0–1. Por debajo del umbral del modo NO se muestra ningún número. */
  confianza: number;
  nota?: string;
};

/** Región de interés, en fracción del fotograma. También es la guía que ve
 *  el operario: encuadrar es parte del trabajo, no un defecto del demo. */
export type Guia = {
  forma: "rect" | "circulo";
  x: number;
  y: number;
  w: number;
  h: number;
};

export interface ModoVision {
  id: string;
  guia: Guia;
  /** Presupuesto de tiempo por fotograma de ESTE modo. */
  intervaloMs: number;
  /** Confianza mínima para mostrar el valor. Debajo: "acercando…". */
  umbral: number;
  /** Carga perezosa de lo que haga falta. Se llama una vez al encender. */
  preparar(avisar: (m: string) => void): Promise<void>;
  /** Recibe el recorte ya hecho, en su propio canvas. */
  procesar(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): Promise<Resultado | null>;
  liberar(): void;
}

/* --- Cámara ------------------------------------------------------------ */

export const contextoSeguro = () =>
  typeof window !== "undefined" && window.isSecureContext;

export async function camaras(): Promise<MediaDeviceInfo[]> {
  const todos = await navigator.mediaDevices.enumerateDevices();
  return todos.filter((d) => d.kind === "videoinput");
}

/** Abre la cámara y devuelve la función que la cierra. Llamarla SIEMPRE al
 *  desmontar: el led encendido después de cerrar la pestaña es pésima señal
 *  delante de un cliente. */
export async function abrirCamara(video: HTMLVideoElement, deviceId?: string) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      // 720p basta y triplica los FPS frente a la resolución completa.
      width: { ideal: 1280 },
      height: { ideal: 720 },
      ...(deviceId ? { deviceId: { exact: deviceId } } : { facingMode: { ideal: "environment" } }),
    },
    audio: false,
  });
  video.srcObject = stream;
  await video.play();
  return () => {
    for (const t of stream.getTracks()) t.stop();
    video.srcObject = null;
  };
}

/**
 * Bucle con presupuesto de tiempo: si el modo tarda más que su intervalo se
 * saltan fotogramas en vez de encolarlos. Un demo a 3 FPS estables se ve
 * mejor que uno a 15 con tirones.
 */
export function correr(
  video: HTMLVideoElement,
  modo: ModoVision,
  onResultado: (r: Resultado | null) => void,
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  let vivo = true;
  let ocupado = false;
  let ultimo = 0;

  const tick = async (t: number) => {
    if (!vivo) return;
    requestAnimationFrame(tick);
    if (!ctx || ocupado || t - ultimo < modo.intervaloMs) return;
    if (!video.videoWidth) return;

    ocupado = true;
    ultimo = t;
    try {
      const { sx, sy, sw, sh } = recorte(modo.guia, video.videoWidth, video.videoHeight);
      canvas.width = sw;
      canvas.height = sh;
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);
      onResultado(await modo.procesar(ctx, canvas));
    } finally {
      ocupado = false;
    }
  };

  requestAnimationFrame(tick);
  return () => {
    vivo = false;
  };
}

/** El recorte circular se fuerza cuadrado: un dial es redondo, y la
 *  geometría polar del modo medidor se escribe una vez, sin elipses. */
function recorte(g: Guia, ancho: number, alto: number) {
  let sw = Math.round(g.w * ancho);
  let sh = Math.round(g.h * alto);
  let sx = Math.round(g.x * ancho);
  let sy = Math.round(g.y * alto);

  if (g.forma === "circulo") {
    const lado = Math.min(sw, sh);
    sx += Math.round((sw - lado) / 2);
    sy += Math.round((sh - lado) / 2);
    sw = lado;
    sh = lado;
  }
  return { sx, sy, sw, sh };
}

/* --- Utilidades de imagen compartidas por los modos -------------------- */

/** Escala de grises en sitio, sobre el canal de luminancia. */
export function grises(px: ImageData) {
  const d = px.data;
  for (let i = 0; i < d.length; i += 4) {
    const y = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) | 0;
    d[i] = y;
    d[i + 1] = y;
    d[i + 2] = y;
  }
}

/** Umbral global por Otsu. Sobra para un recorte pequeño y encuadrado; el
 *  umbral adaptativo por bloques solo hace falta con sombra parcial, y para
 *  eso está la guía en pantalla. */
export function otsu(px: ImageData): number {
  const hist = new Array(256).fill(0);
  const d = px.data;
  for (let i = 0; i < d.length; i += 4) hist[d[i]]++;

  const total = px.width * px.height;
  let suma = 0;
  for (let i = 0; i < 256; i++) suma += i * hist[i];

  let sumaB = 0;
  let pesoB = 0;
  let mejor = 0;
  let umbral = 128;

  for (let i = 0; i < 256; i++) {
    pesoB += hist[i];
    if (pesoB === 0) continue;
    const pesoF = total - pesoB;
    if (pesoF === 0) break;
    sumaB += i * hist[i];
    const entre = pesoB * pesoF * ((sumaB / pesoB - (suma - sumaB) / pesoF) ** 2);
    if (entre > mejor) {
      mejor = entre;
      umbral = i;
    }
  }
  return umbral;
}

/**
 * Máscara de "tinta": 1 donde está el trazo, sea oscuro sobre claro (placa,
 * manómetro) o claro sobre oscuro (display LED). Se asume que el trazo es la
 * clase minoritaria, que es cierto en los tres modos y ahorra un selector de
 * polaridad que el operario no sabría contestar.
 */
export function mascaraTinta(px: ImageData): Uint8Array {
  const u = otsu(px);
  const n = px.width * px.height;
  const m = new Uint8Array(n);
  let oscuros = 0;

  // `<= u`: en Otsu el umbral pertenece a la clase oscura. Con `<` una imagen
  // perfectamente bimodal (un display encendido, por ejemplo) devuelve una
  // máscara vacía y el modo no lee nada.
  for (let i = 0; i < n; i++) {
    if (px.data[i * 4] <= u) {
      m[i] = 1;
      oscuros++;
    }
  }
  if (oscuros > n / 2) for (let i = 0; i < n; i++) m[i] = m[i] ? 0 : 1;
  return m;
}

/** Fracción de tinta dentro de un rectángulo en píxeles. */
export function densidad(
  m: Uint8Array,
  ancho: number,
  x: number,
  y: number,
  w: number,
  h: number,
): number {
  const x0 = Math.max(0, Math.round(x));
  const y0 = Math.max(0, Math.round(y));
  const x1 = Math.round(x + w);
  const y1 = Math.round(y + h);
  let n = 0;
  let total = 0;

  for (let j = y0; j < y1; j++) {
    for (let i = x0; i < x1; i++) {
      total++;
      if (m[j * ancho + i]) n++;
    }
  }
  return total ? n / total : 0;
}

/** Mediana sin ordenar el arreglo original. Se usa para suavizar lecturas:
 *  elimina el salto por reflejo sin introducir retardo perceptible. */
export function mediana(xs: readonly number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
}
