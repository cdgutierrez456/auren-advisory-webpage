// Import relativo con extensión: este módulo también corre bajo el runner de
// Node, que no conoce el alias del tsconfig.
import {
  KM_MANTENIMIENTO,
  checklist,
  type Inspeccion,
  type Respuesta,
  type Vehiculo,
} from "../content/demo-data.ts";
import { iso } from "./terminos.ts";

/**
 * Lógica de los demos que no dependen de días hábiles (eso vive en
 * `terminos.ts`). Tres bloques: semáforo de vencimientos, regla del
 * preoperacional y costo de la fricción.
 *
 * Todo es puro y recibe `hoy` como parámetro: así se puede probar sin
 * congelar el reloj y sin sembrar fechas literales.
 */

/* ===========================================================================
   1 · SEMÁFORO DE VENCIMIENTOS
   Cinco demos del catálogo son este mismo semáforo con otro sustantivo:
   documentos de flota, calibración de equipos, insumos hospitalarios,
   mantenimiento por km. Por eso se escribe una vez.
   =========================================================================== */

export type Estado = "vencido" | "critico" | "proximo" | "vigente";

/** Umbrales en días. Se exportan porque el cliente siempre pide moverlos
 *  ("para nosotros 30 días ya es crítico") y moverlos en vivo es parte de la
 *  demostración. */
export const UMBRALES = { critico: 15, proximo: 45 };

export function estadoDe(
  fechaISO: string,
  hoy = new Date(),
  umbrales = UMBRALES,
): { estado: Estado; dias: number } {
  const f = new Date(`${fechaISO}T00:00:00`);
  const base = new Date(hoy);
  base.setHours(0, 0, 0, 0);
  const dias = Math.round((+f - +base) / 86_400_000);

  if (dias < 0) return { estado: "vencido", dias };
  if (dias <= umbrales.critico) return { estado: "critico", dias };
  if (dias <= umbrales.proximo) return { estado: "proximo", dias };
  return { estado: "vigente", dias };
}

/** El semáforo nunca es solo color: cada fila lleva también esta palabra.
 *  Un tablero que solo distingue por color falla con daltonismo y también
 *  proyectado en un videobeam malo. */
export const PALABRA: Record<Estado, string> = {
  vencido: "Vencido",
  critico: "Crítico",
  proximo: "Próximo",
  vigente: "Vigente",
};

export const DOCUMENTOS = [
  { campo: "soat", etiqueta: "SOAT" },
  { campo: "tecnomecanica", etiqueta: "Tecnomecánica" },
  { campo: "licenciaConductor", etiqueta: "Licencia" },
] as const;

/** Estado del vehículo = el peor de sus documentos. */
export function estadoVehiculo(v: Vehiculo, hoy = new Date(), umbrales = UMBRALES) {
  const orden: Estado[] = ["vencido", "critico", "proximo", "vigente"];
  const docs = DOCUMENTOS.map((d) => ({
    ...d,
    ...estadoDe(v[d.campo], hoy, umbrales),
  }));
  const peor = docs.reduce((a, b) =>
    orden.indexOf(a.estado) <= orden.indexOf(b.estado) ? a : b,
  );
  return { docs, peor, kmRestantes: kmParaMantenimiento(v) };
}

/** Mantenimiento por kilometraje: el mismo semáforo con otra unidad. */
export function kmParaMantenimiento(v: Vehiculo) {
  return v.kmUltimoMantenimiento + KM_MANTENIMIENTO - v.kmActual;
}

/** El número que se dice en voz alta en la reunión. */
export function resumenFlota(
  flota: readonly Vehiculo[],
  hoy = new Date(),
  umbrales = UMBRALES,
) {
  const enRiesgo = flota.filter((v) => {
    const e = estadoVehiculo(v, hoy, umbrales).peor.estado;
    return e === "vencido" || e === "critico";
  });
  const vencidos = flota.filter(
    (v) => estadoVehiculo(v, hoy, umbrales).peor.estado === "vencido",
  );
  return {
    total: flota.length,
    enRiesgo: enRiesgo.length,
    vencidos: vencidos.length,
    mantenimiento: flota.filter((v) => kmParaMantenimiento(v) <= 0).length,
    frase: `${enRiesgo.length} de ${flota.length} vehículos no deberían estar rodando hoy`,
  };
}

/** Ordena por urgencia: lo vencido primero, sin que nadie tenga que filtrar. */
export function porUrgencia(
  flota: readonly Vehiculo[],
  hoy = new Date(),
  umbrales = UMBRALES,
): readonly Vehiculo[] {
  return [...flota].sort(
    (a, b) =>
      estadoVehiculo(a, hoy, umbrales).peor.dias - estadoVehiculo(b, hoy, umbrales).peor.dias,
  );
}

/* ===========================================================================
   2 · PREOPERACIONAL
   Una sola regla de negocio, y toda la venta está en ella.
   =========================================================================== */

const porId = new Map(checklist.map((i) => [i.id, i]));
export const CRITICOS = new Set(checklist.filter((i) => i.critico).map((i) => i.id));

export function evaluar(respuestas: readonly Respuesta[]) {
  const malos = respuestas.filter((r) => r.estado === "malo");
  const fallas = malos.filter((r) => CRITICOS.has(r.itemId));

  // Sin foto en un ítem que la exige, la inspección no se puede cerrar: la
  // evidencia es la mitad del valor del control.
  const sinFoto = malos.filter((r) => porId.get(r.itemId)?.exigeFoto && !r.foto);
  const sinResponder = checklist.filter(
    (i) => !respuestas.some((r) => r.itemId === i.id),
  );

  return {
    resultado: fallas.length ? ("bloqueado" as const) : ("aprobado" as const),
    fallas: fallas.map((f) => f.itemId),
    sinFoto: sinFoto.map((f) => f.itemId),
    sinResponder: sinResponder.map((i) => i.id),
    incompleta: sinFoto.length > 0 || sinResponder.length > 0,
  };
}

/** Agregación del tablero: cumplimiento del día e ítems que más fallan. */
export function resumenInspecciones(lista: readonly Inspeccion[], hoy = new Date()) {
  const dia = iso(hoy);
  const deHoy = lista.filter((i) => i.fecha.slice(0, 10) === dia);
  const conteo = new Map<string, number>();

  for (const i of lista) {
    for (const r of i.respuestas) {
      if (r.estado === "malo") conteo.set(r.itemId, (conteo.get(r.itemId) ?? 0) + 1);
    }
  }

  const ranking = [...conteo.entries()]
    .map(([itemId, veces]) => ({
      itemId,
      veces,
      texto: porId.get(itemId)?.texto ?? itemId,
      critico: CRITICOS.has(itemId),
    }))
    .sort((a, b) => b.veces - a.veces);

  return {
    hoy: deHoy.length,
    bloqueadosHoy: deHoy.filter((i) => i.resultado === "bloqueado").length,
    total: lista.length,
    bloqueados: lista.filter((i) => i.resultado === "bloqueado").length,
    ranking: ranking.slice(0, 6),
  };
}

/* ===========================================================================
   3 · COSTO DE LA FRICCIÓN
   =========================================================================== */

export type EntradaFriccion = {
  /** Cuántas personas hacen la tarea. */
  personas: number;
  /** Horas por persona por semana. */
  horasSemana: number;
  /** Salario mensual promedio, en pesos. */
  salarioMensual: number;
};

/** 4,33 semanas por mes; 192 horas mensuales (jornada legal de referencia);
 *  1.920 horas al año por persona. Los divisores se exponen porque el cliente
 *  siempre discute la base de cálculo — y discutirla en vivo es parte de la
 *  venta, no un problema. */
export const BASE = { semanasMes: 4.33, horasMes: 192, horasAnoPersona: 1_920 };

export function costoAnual(e: EntradaFriccion) {
  const valorHora = e.salarioMensual / BASE.horasMes;
  const horasMes = e.personas * e.horasSemana * BASE.semanasMes;
  const mensual = horasMes * valorHora;
  return {
    valorHora: Math.round(valorHora),
    horasMes: Math.round(horasMes),
    horasAnuales: Math.round(horasMes * 12),
    mensual: Math.round(mensual),
    anual: Math.round(mensual * 12),
    /** El equivalente que hace ruido en la reunión. */
    equivalente: ((horasMes * 12) / BASE.horasAnoPersona).toFixed(1),
  };
}
