import assert from "node:assert/strict";
import { test } from "node:test";
import { anguloAValor, calibracion, medidor } from "./modos/medidor.ts";
import { SEGMENTOS, TABLA, configSegmentos, sieteSegmentos } from "./modos/siete-segmentos.ts";

/**
 * Los dos modos de visión que son geometría pura se pueden probar sin
 * navegador y sin cámara: se les pinta la imagen que deberían ver y se
 * comprueba qué leen. El de placas no está aquí porque depende del motor de
 * OCR, y probar Tesseract no es nuestro trabajo.
 *
 * Los modos solo usan `getImageData` y el tamaño del canvas, así que un
 * objeto plano basta para hacerles de lienzo.
 */

type Lienzo = { data: Uint8ClampedArray; width: number; height: number };

function lienzo(width: number, height: number): Lienzo {
  const data = new Uint8ClampedArray(width * height * 4).fill(255);
  return { data, width, height };
}

function pintar(img: Lienzo, x: number, y: number) {
  const i = (Math.round(y) * img.width + Math.round(x)) * 4;
  if (i < 0 || i >= img.data.length) return;
  img.data[i] = 0;
  img.data[i + 1] = 0;
  img.data[i + 2] = 0;
}

function rect(img: Lienzo, x: number, y: number, w: number, h: number) {
  for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) pintar(img, i, j);
}

/** Le pasa el lienzo al modo como si viniera de la cámara. */
const procesarCon = (modo: typeof sieteSegmentos, img: Lienzo) =>
  modo.procesar(
    { getImageData: () => img } as unknown as CanvasRenderingContext2D,
    { width: img.width, height: img.height } as unknown as HTMLCanvasElement,
  );

/* --- Display de 7 segmentos ------------------------------------------- */

/** Dibuja un número como lo haría una báscula: segmentos encendidos en negro. */
function display(texto: string, ancho = 400, alto = 160): Lienzo {
  const img = lienzo(ancho, alto);
  const paso = ancho / texto.length;

  texto.split("").forEach((caracter, n) => {
    const bits = Object.entries(TABLA).find(([, v]) => v === caracter)?.[0];
    if (!bits) throw new Error(`sin patrón para "${caracter}"`);
    SEGMENTOS.forEach(([x, y, w, h], s) => {
      if (bits[s] === "1")
        rect(img, Math.round((n + x) * paso), Math.round(y * alto), Math.round(w * paso), Math.round(h * alto));
    });
  });
  return img;
}

test("lee un display de cuatro dígitos", async () => {
  configSegmentos.digitos = 4;
  const r = await procesarCon(sieteSegmentos, display("1234"));
  assert.equal(r?.valor, "1234");
  assert.equal(r?.confianza, 1);
});

test("lee todos los dígitos, no solo los fáciles", async () => {
  configSegmentos.digitos = 5;
  assert.equal((await procesarCon(sieteSegmentos, display("05678")))?.valor, "05678");
  assert.equal((await procesarCon(sieteSegmentos, display("90123")))?.valor, "90123");
  configSegmentos.digitos = 4;
});

test("un display apagado no inventa un número", async () => {
  configSegmentos.digitos = 4;
  assert.equal(await procesarCon(sieteSegmentos, lienzo(400, 160)), null);
});

/* --- Medidor análogo --------------------------------------------------- */

/** Dial con la aguja en un ángulo dado (0° a la derecha, positivo antihorario). */
function dial(grados: number, lado = 300): Lienzo {
  const img = lienzo(lado, lado);
  const c = lado / 2;
  const rad = (grados * Math.PI) / 180;
  for (let r = lado * 0.05; r < lado * 0.44; r += 0.5) {
    for (let g = -1.5; g <= 1.5; g += 0.5) {
      pintar(img, c + r * Math.cos(rad) + g, c - r * Math.sin(rad));
      pintar(img, c + r * Math.cos(rad), c - r * Math.sin(rad) + g);
    }
  }
  return img;
}

test("la conversión de ángulo a valor respeta la calibración", () => {
  const c = { anguloMin: 225, anguloMax: -45, valorMin: 0, valorMax: 10, unidad: "bar", offset: 0 };
  assert.equal(anguloAValor(225, c), 0);
  assert.equal(anguloAValor(-45, c), 10);
  assert.equal(anguloAValor(90, c), 5);
  // El offset es la corrección fina contra la lectura real del instrumento.
  assert.equal(anguloAValor(90, { ...c, offset: 0.4 }), 5.4);
});

test("lee la aguja de un manómetro con la calibración por defecto", async () => {
  await medidor.preparar(() => {});
  const r = await procesarCon(medidor as typeof sieteSegmentos, dial(90));
  assert.ok(r, "debería leer algo con una aguja tan marcada");
  const valor = Number.parseFloat(r.valor);
  // 90° es la mitad del recorrido 225°→−45°: 5 bar, con holgura de medio paso.
  assert.ok(Math.abs(valor - 5) < 0.3, `esperaba ~5 bar y leyó ${r.valor}`);
  assert.equal(calibracion.unidad, "bar");
});

test("la lectura sigue a la aguja", async () => {
  await medidor.preparar(() => {});
  const a = await procesarCon(medidor as typeof sieteSegmentos, dial(180));
  await medidor.preparar(() => {});
  const b = await procesarCon(medidor as typeof sieteSegmentos, dial(0));
  assert.ok(Number.parseFloat(a?.valor ?? "") < Number.parseFloat(b?.valor ?? ""));
});

test("sin aguja no hay lectura: prefiere «acercando…» a un número inventado", async () => {
  await medidor.preparar(() => {});
  assert.equal(await procesarCon(medidor as typeof sieteSegmentos, lienzo(300, 300)), null);
});
