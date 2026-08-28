import { FESTIVOS, TERMINOS, type Radicado } from "../content/terminos.ts";

/**
 * Días hábiles y semáforo de términos: la única pieza de lógica difícil de
 * todo el catálogo.
 *
 * Contar días hábiles con festivos colombianos —móviles, y corridos al lunes
 * siguiente— es donde este demo se gana o se pierde la credibilidad frente a
 * un funcionario que los cuenta a mano todos los días. Por eso está aislado,
 * es puro, y tiene pruebas.
 */

/** Fecha local en ISO. `toISOString()` convierte a UTC y a partir de cierta
 *  hora devuelve el día equivocado; aquí el día es el del calendario de quien
 *  mira la pantalla. */
export const iso = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const truncar = (d: Date): Date => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const feriadosDe = (...anios: number[]): Set<string> =>
  new Set(anios.flatMap((y) => FESTIVOS[y] ?? []));

export const esHabil = (d: Date, feriados: Set<string>): boolean => {
  const dow = d.getDay();
  if (dow === 0 || dow === 6) return false;
  return !feriados.has(iso(d));
};

/** Suma N días hábiles a una fecha. El día de radicación no cuenta: el
 *  término empieza a correr al día hábil siguiente. */
export function sumarHabiles(desde: Date, n: number): Date {
  const d = truncar(desde);
  const feriados = feriadosDe(d.getFullYear(), d.getFullYear() + 1);
  let restantes = n;
  while (restantes > 0) {
    d.setDate(d.getDate() + 1);
    if (esHabil(d, feriados)) restantes--;
  }
  return d;
}

/** Días hábiles del intervalo (desde, hasta]. Negativo si `hasta` ya pasó. */
export function habilesEntre(desde: Date, hasta: Date): number {
  const a = truncar(desde);
  const b = truncar(hasta);
  const signo = +b >= +a ? 1 : -1;
  const cursor = signo > 0 ? a : b;
  const fin = signo > 0 ? b : a;
  const feriados = feriadosDe(
    Math.min(a.getFullYear(), b.getFullYear()),
    Math.max(a.getFullYear(), b.getFullYear()),
  );

  let n = 0;
  while (+cursor < +fin) {
    cursor.setDate(cursor.getDate() + 1);
    if (esHabil(cursor, feriados)) n++;
  }
  return n * signo;
}

export type Semaforo = "vencido" | "critico" | "atencion" | "en-termino" | "cerrado";

/** Umbrales del semáforo, en días hábiles restantes. Exportados porque el
 *  cliente siempre quiere moverlos y moverlos en vivo es parte de la demo. */
export const UMBRALES_TERMINO = { critico: 2, atencion: 5 };

export const PALABRA_TERMINO: Record<Semaforo, string> = {
  vencido: "Vencido",
  critico: "Crítico",
  atencion: "Atención",
  "en-termino": "En término",
  cerrado: "Cerrado",
};

export function evaluarRadicado(
  r: Radicado,
  hoy = new Date(),
  umbrales = UMBRALES_TERMINO,
) {
  const limite = sumarHabiles(new Date(r.radicadoEn), TERMINOS[r.tipo].dias);

  if (r.respondidoEn) {
    return {
      semaforo: "cerrado" as Semaforo,
      restantes: habilesEntre(new Date(r.respondidoEn), limite),
      limite,
      sinResponsable: false,
      diasUsados: habilesEntre(new Date(r.radicadoEn), new Date(r.respondidoEn)),
    };
  }

  const restantes = habilesEntre(hoy, limite);
  const semaforo: Semaforo =
    restantes < 0
      ? "vencido"
      : restantes <= umbrales.critico
        ? "critico"
        : restantes <= umbrales.atencion
          ? "atencion"
          : "en-termino";

  return {
    semaforo,
    restantes,
    limite,
    sinResponsable: r.responsable === null,
    diasUsados: habilesEntre(new Date(r.radicadoEn), hoy),
  };
}

const ORDEN: Semaforo[] = ["vencido", "critico", "atencion", "en-termino", "cerrado"];

/** Bandeja ordenada por urgencia. Nadie tiene que filtrar para ver el problema. */
export function porTermino(lista: readonly Radicado[], hoy = new Date()): Radicado[] {
  return [...lista].sort((a, b) => {
    const ea = evaluarRadicado(a, hoy);
    const eb = evaluarRadicado(b, hoy);
    const d = ORDEN.indexOf(ea.semaforo) - ORDEN.indexOf(eb.semaforo);
    return d !== 0 ? d : ea.restantes - eb.restantes;
  });
}

/** Los dos números del tablero, más el de gestión. */
export function resumenBandeja(lista: readonly Radicado[], hoy = new Date()) {
  const evaluados = lista.map((r) => ({ r, e: evaluarRadicado(r, hoy) }));
  const abiertos = evaluados.filter(({ e }) => e.semaforo !== "cerrado");
  const cerrados = evaluados.filter(({ e }) => e.semaforo === "cerrado");
  const promedio = cerrados.length
    ? cerrados.reduce((s, { e }) => s + e.diasUsados, 0) / cerrados.length
    : 0;

  const porDependencia = new Map<string, { total: number; vencidos: number; sinResponsable: number }>();
  for (const { r, e } of abiertos) {
    const d = porDependencia.get(r.dependencia) ?? { total: 0, vencidos: 0, sinResponsable: 0 };
    d.total++;
    if (e.semaforo === "vencido") d.vencidos++;
    if (e.sinResponsable) d.sinResponsable++;
    porDependencia.set(r.dependencia, d);
  }

  return {
    total: lista.length,
    abiertos: abiertos.length,
    vencidos: abiertos.filter(({ e }) => e.semaforo === "vencido").length,
    criticos: abiertos.filter(({ e }) => e.semaforo === "critico").length,
    /** El dato que ninguna entidad tiene hoy y el que más incomoda en la reunión. */
    sinResponsable: abiertos.filter(({ e }) => e.sinResponsable).length,
    cerrados: cerrados.length,
    promedioDias: +promedio.toFixed(1),
    porDependencia: [...porDependencia.entries()]
      .map(([dependencia, v]) => ({ dependencia, ...v }))
      .sort((a, b) => b.vencidos - a.vencidos || b.total - a.total),
  };
}

/** Consecutivo del siguiente radicado. En el piloto lo da el gestor documental. */
export function siguienteNumero(lista: readonly Radicado[]): string {
  const anio = new Date().getFullYear();
  const max = lista.reduce((m, r) => {
    const n = Number(r.numero.split("-")[1]);
    return Number.isFinite(n) && n > m ? n : m;
  }, 0);
  return `${anio}-${String(max + 1).padStart(5, "0")}`;
}
