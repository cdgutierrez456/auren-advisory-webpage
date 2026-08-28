/**
 * Datos sembrados de TODOS los demos. Sintéticos, con fechas relativas.
 *
 * Regla que hace que el demo no caduque: ninguna fecha literal. El error
 * clásico es quemar el 14 de marzo y que a las tres semanas todo aparezca
 * vencido y la reunión empiece con una disculpa. Aquí todo se siembra con
 * `dias(n)` y el tablero se ve recién hecho en cualquier momento del año.
 *
 * La distribución está diseñada: ~15% en rojo, ~25% en amarillo, el resto en
 * verde. Si todo está bien no hay nada que mostrar; si todo está mal parece
 * un error del sistema.
 *
 * Las placas y los nombres son inventados. Nunca una placa real: puede ser la
 * del carro de alguien en la sala.
 */

/** Días desde hoy, en ISO `yyyy-mm-dd`. Negativo = pasado. */
export const dias = (n: number): string => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** Igual que `dias`, con hora, para lo que se radica a una hora concreta. */
export const diasHora = (n: number, hora = "09:15"): string => `${dias(n)}T${hora}:00`;

/* ===========================================================================
   FLOTA — demos 1 (preoperacional) y 1b (vencimientos)
   =========================================================================== */

export type Vehiculo = {
  placa: string;
  tipo: "camion" | "van" | "bus" | "camioneta";
  conductor: string;
  /** ISO yyyy-mm-dd */
  soat: string;
  tecnomecanica: string;
  licenciaConductor: string;
  kmActual: number;
  kmUltimoMantenimiento: number;
};

/** Cada cuántos km toca mantenimiento. Se expone porque el cliente lo discute. */
export const KM_MANTENIMIENTO = 10_000;

export const vehiculos: readonly Vehiculo[] = [
  { placa: "WGT481", tipo: "camion", conductor: "J. Ramírez", soat: dias(-12), tecnomecanica: dias(21), licenciaConductor: dias(340), kmActual: 148_200, kmUltimoMantenimiento: 138_900 },
  { placa: "SNR902", tipo: "van", conductor: "L. Ospina", soat: dias(9), tecnomecanica: dias(160), licenciaConductor: dias(45), kmActual: 92_400, kmUltimoMantenimiento: 88_100 },
  { placa: "KTM334", tipo: "bus", conductor: "M. Betancur", soat: dias(210), tecnomecanica: dias(-4), licenciaConductor: dias(120), kmActual: 210_500, kmUltimoMantenimiento: 205_000 },
  { placa: "HVD716", tipo: "camioneta", conductor: "C. Arango", soat: dias(55), tecnomecanica: dias(88), licenciaConductor: dias(12), kmActual: 64_300, kmUltimoMantenimiento: 61_200 },
  { placa: "PLZ208", tipo: "camion", conductor: "D. Molina", soat: dias(130), tecnomecanica: dias(33), licenciaConductor: dias(400), kmActual: 178_900, kmUltimoMantenimiento: 171_000 },
  { placa: "RQF853", tipo: "van", conductor: "A. Cardona", soat: dias(26), tecnomecanica: dias(300), licenciaConductor: dias(250), kmActual: 41_200, kmUltimoMantenimiento: 39_000 },
  { placa: "TBN147", tipo: "camion", conductor: "S. Zapata", soat: dias(-31), tecnomecanica: dias(-9), licenciaConductor: dias(60), kmActual: 265_700, kmUltimoMantenimiento: 252_000 },
  { placa: "JMC629", tipo: "camioneta", conductor: "P. Gil", soat: dias(180), tecnomecanica: dias(240), licenciaConductor: dias(190), kmActual: 33_400, kmUltimoMantenimiento: 31_000 },
  { placa: "XDR470", tipo: "bus", conductor: "N. Herrera", soat: dias(14), tecnomecanica: dias(95), licenciaConductor: dias(520), kmActual: 154_000, kmUltimoMantenimiento: 149_800 },
  { placa: "GVL395", tipo: "camion", conductor: "R. Salazar", soat: dias(320), tecnomecanica: dias(41), licenciaConductor: dias(75), kmActual: 122_600, kmUltimoMantenimiento: 118_300 },
  { placa: "BFT082", tipo: "van", conductor: "E. Quintero", soat: dias(75), tecnomecanica: dias(150), licenciaConductor: dias(33), kmActual: 58_900, kmUltimoMantenimiento: 55_200 },
  { placa: "MYS514", tipo: "camioneta", conductor: "L. Duque", soat: dias(240), tecnomecanica: dias(270), licenciaConductor: dias(610), kmActual: 27_800, kmUltimoMantenimiento: 24_500 },
  { placa: "CZP761", tipo: "camion", conductor: "F. Marín", soat: dias(100), tecnomecanica: dias(6), licenciaConductor: dias(210), kmActual: 199_300, kmUltimoMantenimiento: 188_000 },
  { placa: "ANW238", tipo: "bus", conductor: "G. Osorio", soat: dias(400), tecnomecanica: dias(380), licenciaConductor: dias(290), kmActual: 88_700, kmUltimoMantenimiento: 86_400 },
  { placa: "QHB905", tipo: "camion", conductor: "T. Vargas", soat: dias(62), tecnomecanica: dias(110), licenciaConductor: dias(160), kmActual: 143_500, kmUltimoMantenimiento: 141_900 },
  { placa: "LKE327", tipo: "van", conductor: "V. Restrepo", soat: dias(290), tecnomecanica: dias(205), licenciaConductor: dias(95), kmActual: 47_600, kmUltimoMantenimiento: 45_100 },
  { placa: "DSO684", tipo: "camioneta", conductor: "I. Mesa", soat: dias(38), tecnomecanica: dias(340), licenciaConductor: dias(430), kmActual: 71_200, kmUltimoMantenimiento: 66_800 },
  { placa: "UFA193", tipo: "camion", conductor: "O. Naranjo", soat: dias(145), tecnomecanica: dias(175), licenciaConductor: dias(350), kmActual: 231_000, kmUltimoMantenimiento: 226_500 },
  { placa: "YRC540", tipo: "bus", conductor: "B. Agudelo", soat: dias(215), tecnomecanica: dias(260), licenciaConductor: dias(48), kmActual: 105_400, kmUltimoMantenimiento: 99_700 },
  { placa: "EJT876", tipo: "camion", conductor: "H. Londoño", soat: dias(500), tecnomecanica: dias(420), licenciaConductor: dias(480), kmActual: 12_900, kmUltimoMantenimiento: 9_000 },
];

/* ===========================================================================
   CHECKLIST PREOPERACIONAL
   El checklist es dato, no JSX: cambiarlo para un cliente en la reunión es
   editar una lista, no tocar un componente.
   =========================================================================== */

export type Grupo = "Documentos" | "Luces" | "Frenos" | "Llantas" | "Fluidos" | "Seguridad";

export type ItemChecklist = {
  id: string;
  grupo: Grupo;
  texto: string;
  /** Crítico = si falla, el vehículo no sale. Es LA regla de negocio. */
  critico: boolean;
  /** Exige foto obligatoria cuando el resultado es "malo". */
  exigeFoto: boolean;
};

export const checklist: readonly ItemChecklist[] = [
  { id: "doc-soat", grupo: "Documentos", texto: "SOAT vigente a bordo", critico: true, exigeFoto: false },
  { id: "doc-tecno", grupo: "Documentos", texto: "Tecnomecánica vigente", critico: true, exigeFoto: false },
  { id: "doc-licencia", grupo: "Documentos", texto: "Licencia de conducción vigente", critico: true, exigeFoto: false },
  { id: "doc-tarjeta", grupo: "Documentos", texto: "Tarjeta de propiedad a bordo", critico: false, exigeFoto: false },
  { id: "luz-stop", grupo: "Luces", texto: "Luces de freno funcionan", critico: true, exigeFoto: false },
  { id: "luz-direccional", grupo: "Luces", texto: "Direccionales funcionan", critico: true, exigeFoto: false },
  { id: "luz-principal", grupo: "Luces", texto: "Luces altas y bajas funcionan", critico: true, exigeFoto: false },
  { id: "luz-reversa", grupo: "Luces", texto: "Luz de reversa funciona", critico: false, exigeFoto: false },
  { id: "fre-servicio", grupo: "Frenos", texto: "Freno de servicio responde", critico: true, exigeFoto: true },
  { id: "fre-mano", grupo: "Frenos", texto: "Freno de mano sostiene", critico: true, exigeFoto: false },
  { id: "fre-liquido", grupo: "Frenos", texto: "Nivel de líquido de frenos en rango", critico: false, exigeFoto: false },
  { id: "lla-labrado", grupo: "Llantas", texto: "Labrado sobre el testigo de desgaste", critico: true, exigeFoto: true },
  { id: "lla-presion", grupo: "Llantas", texto: "Presión de inflado correcta", critico: false, exigeFoto: false },
  { id: "lla-repuesto", grupo: "Llantas", texto: "Llanta de repuesto en condiciones", critico: false, exigeFoto: false },
  { id: "lla-rines", grupo: "Llantas", texto: "Rines sin fisuras ni golpes", critico: true, exigeFoto: true },
  { id: "flu-aceite", grupo: "Fluidos", texto: "Nivel de aceite en rango", critico: false, exigeFoto: false },
  { id: "flu-refrigerante", grupo: "Fluidos", texto: "Nivel de refrigerante en rango", critico: false, exigeFoto: false },
  { id: "flu-fugas", grupo: "Fluidos", texto: "Sin fugas visibles bajo el vehículo", critico: true, exigeFoto: true },
  { id: "seg-extintor", grupo: "Seguridad", texto: "Extintor cargado y vigente", critico: true, exigeFoto: false },
  { id: "seg-botiquin", grupo: "Seguridad", texto: "Botiquín completo", critico: false, exigeFoto: false },
  { id: "seg-cinturones", grupo: "Seguridad", texto: "Cinturones de seguridad funcionan", critico: true, exigeFoto: false },
  { id: "seg-kit", grupo: "Seguridad", texto: "Kit de carretera completo", critico: false, exigeFoto: false },
];

export const grupos: readonly Grupo[] = [
  "Documentos",
  "Luces",
  "Frenos",
  "Llantas",
  "Fluidos",
  "Seguridad",
];

export type Respuesta = {
  itemId: string;
  estado: "bueno" | "malo" | "na";
  /** dataURL en memoria. Nunca sale del navegador. */
  foto?: string;
  nota?: string;
};

export type Inspeccion = {
  id: string;
  placa: string;
  conductor: string;
  /** ISO con hora. */
  fecha: string;
  kmTablero: number;
  respuestas: Respuesta[];
  /** dataURL del canvas de firma. */
  firma: string;
  resultado: "aprobado" | "bloqueado";
};

/** Inspecciones de hoy y ayer: el tablero no puede arrancar vacío. */
export const inspecciones: readonly Inspeccion[] = [
  { id: "insp-01", placa: "EJT876", conductor: "H. Londoño", fecha: diasHora(0, "05:12"), kmTablero: 12_900, respuestas: [], firma: "", resultado: "aprobado" },
  { id: "insp-02", placa: "ANW238", conductor: "G. Osorio", fecha: diasHora(0, "05:31"), kmTablero: 88_700, respuestas: [{ itemId: "lla-presion", estado: "malo" }], firma: "", resultado: "aprobado" },
  { id: "insp-03", placa: "TBN147", conductor: "S. Zapata", fecha: diasHora(0, "05:44"), kmTablero: 265_700, respuestas: [{ itemId: "doc-soat", estado: "malo" }, { itemId: "lla-labrado", estado: "malo" }], firma: "", resultado: "bloqueado" },
  { id: "insp-04", placa: "MYS514", conductor: "L. Duque", fecha: diasHora(0, "06:02"), kmTablero: 27_800, respuestas: [], firma: "", resultado: "aprobado" },
  { id: "insp-05", placa: "QHB905", conductor: "T. Vargas", fecha: diasHora(0, "06:15"), kmTablero: 143_500, respuestas: [{ itemId: "luz-stop", estado: "malo" }], firma: "", resultado: "bloqueado" },
  { id: "insp-06", placa: "LKE327", conductor: "V. Restrepo", fecha: diasHora(0, "06:28"), kmTablero: 47_600, respuestas: [{ itemId: "flu-aceite", estado: "malo" }], firma: "", resultado: "aprobado" },
  { id: "insp-07", placa: "JMC629", conductor: "P. Gil", fecha: diasHora(0, "06:40"), kmTablero: 33_400, respuestas: [], firma: "", resultado: "aprobado" },
  { id: "insp-08", placa: "BFT082", conductor: "E. Quintero", fecha: diasHora(0, "06:55"), kmTablero: 58_900, respuestas: [{ itemId: "lla-labrado", estado: "malo" }], firma: "", resultado: "bloqueado" },
  { id: "insp-09", placa: "UFA193", conductor: "O. Naranjo", fecha: diasHora(-1, "05:20"), kmTablero: 230_800, respuestas: [], firma: "", resultado: "aprobado" },
  { id: "insp-10", placa: "YRC540", conductor: "B. Agudelo", fecha: diasHora(-1, "05:38"), kmTablero: 105_100, respuestas: [{ itemId: "seg-botiquin", estado: "malo" }], firma: "", resultado: "aprobado" },
  { id: "insp-11", placa: "GVL395", conductor: "R. Salazar", fecha: diasHora(-1, "05:52"), kmTablero: 122_300, respuestas: [{ itemId: "lla-labrado", estado: "malo" }], firma: "", resultado: "bloqueado" },
  { id: "insp-12", placa: "CZP761", conductor: "F. Marín", fecha: diasHora(-1, "06:10"), kmTablero: 199_000, respuestas: [{ itemId: "flu-fugas", estado: "malo" }], firma: "", resultado: "bloqueado" },
];
