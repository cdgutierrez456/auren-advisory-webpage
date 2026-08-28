import { diasHora } from "./demo-data.ts";

/**
 * Configuración normativa del demo de PQRSD y los radicados sembrados.
 *
 * Los términos van en una tabla, nunca quemados en el código: las
 * resoluciones se mueven, y el sitio donde se revisa qué se está afirmando
 * tiene que ser obvio.
 */

export type TipoPQRSD =
  | "peticion"
  | "queja"
  | "reclamo"
  | "sugerencia"
  | "denuncia"
  | "informacion"
  | "consulta";

/**
 * ⚠ VERIFICAR VIGENCIA ANTES DE CADA REUNIÓN.
 *
 * Estos valores son el punto de partida, no una fuente normativa. Confirmar
 * contra la norma vigente y contra el reglamento interno de la entidad antes
 * de mostrarlos a un cliente o de imprimirlos en material comercial. Un dato
 * normativo desactualizado en la primera reunión cuesta la credibilidad
 * completa: el funcionario cuenta términos todos los días.
 */
export const TERMINOS: Record<TipoPQRSD, { dias: number; base: "habiles"; etiqueta: string }> = {
  peticion: { dias: 15, base: "habiles", etiqueta: "Petición de interés general o particular" },
  queja: { dias: 15, base: "habiles", etiqueta: "Queja" },
  reclamo: { dias: 15, base: "habiles", etiqueta: "Reclamo" },
  sugerencia: { dias: 15, base: "habiles", etiqueta: "Sugerencia" },
  denuncia: { dias: 15, base: "habiles", etiqueta: "Denuncia" },
  informacion: { dias: 10, base: "habiles", etiqueta: "Petición de documentos o información" },
  consulta: { dias: 30, base: "habiles", etiqueta: "Consulta" },
};

/**
 * Festivos colombianos (Ley 51 de 1983: los movibles se corren al lunes
 * siguiente; Semana Santa depende de la Pascua).
 *
 * ponytail: tabla estática 2026–2029 en vez de calcular la Pascua en runtime.
 * Son cuatro años de demo y 18 fechas por año. Si esto pasa a piloto se
 * implementa el cómputo o —mejor— se usa el calendario oficial de la entidad,
 * que además trae sus días de cierre administrativo.
 */
export const FESTIVOS: Record<number, readonly string[]> = {
  2026: ["2026-01-01", "2026-01-12", "2026-03-23", "2026-04-02", "2026-04-03", "2026-05-01",
    "2026-05-18", "2026-06-08", "2026-06-15", "2026-06-29", "2026-07-20", "2026-08-07",
    "2026-08-17", "2026-10-12", "2026-11-02", "2026-11-16", "2026-12-08", "2026-12-25"],
  2027: ["2027-01-01", "2027-01-11", "2027-03-22", "2027-03-25", "2027-03-26", "2027-05-01",
    "2027-05-10", "2027-05-31", "2027-06-07", "2027-07-05", "2027-07-20", "2027-08-07",
    "2027-08-16", "2027-10-18", "2027-11-01", "2027-11-15", "2027-12-08", "2027-12-25"],
  2028: ["2028-01-01", "2028-01-10", "2028-03-20", "2028-04-13", "2028-04-14", "2028-05-01",
    "2028-05-29", "2028-06-19", "2028-06-26", "2028-07-03", "2028-07-20", "2028-08-07",
    "2028-08-21", "2028-10-16", "2028-11-06", "2028-11-13", "2028-12-08", "2028-12-25"],
  2029: ["2029-01-01", "2029-01-08", "2029-03-19", "2029-03-29", "2029-03-30", "2029-05-01",
    "2029-05-14", "2029-06-04", "2029-06-11", "2029-07-02", "2029-07-20", "2029-08-07",
    "2029-08-20", "2029-10-15", "2029-11-05", "2029-11-12", "2029-12-08", "2029-12-25"],
};

/**
 * Lo único que cambia entre alcaldía, hospital, ESE y empresa de servicios.
 * Personalizar el demo para un prospecto = editar este objeto. Cuesta cinco
 * minutos y cambia por completo cómo se recibe la demostración.
 */
export const entidad = {
  nombre: "Alcaldía de Municipio Demo",
  tipo: "alcaldia" as "alcaldia" | "hospital" | "ese" | "servicios",
  dependencias: [
    "Secretaría de Gobierno",
    "Secretaría de Hacienda",
    "Secretaría de Infraestructura",
    "Secretaría de Salud",
    "Servicios Públicos",
  ],
} as const;

export type Radicado = {
  numero: string;
  tipo: TipoPQRSD;
  asunto: string;
  peticionario: string;
  canal: "web" | "presencial" | "telefonico" | "correo";
  dependencia: string;
  /** null = sin asignar. El peor caso, y el que ninguna entidad tiene medido. */
  responsable: string | null;
  /** ISO con hora. */
  radicadoEn: string;
  respondidoEn: string | null;
  prorrogado: boolean;
};

/** Consecutivo del año en curso: el demo no envejece de un enero al otro. */
const rad = (n: number) => `${new Date().getFullYear()}-${String(n).padStart(5, "0")}`;

/**
 * 30 radicados con distribución diseñada: 4 vencidos, 4 críticos, 4 en
 * atención, 7 sin responsable asignado y 6 ya cerrados. La bandeja arranca
 * con algo que duele, no con una tabla en verde.
 */
export const radicados: readonly Radicado[] = [
  { numero: rad(387), tipo: "peticion", asunto: "Reparación de vía en el barrio San Antonio", peticionario: "María C. Aguirre", canal: "presencial", dependencia: "Secretaría de Infraestructura", responsable: null, radicadoEn: diasHora(-30, "08:20"), respondidoEn: null, prorrogado: false },
  { numero: rad(391), tipo: "queja", asunto: "Demora en la atención del punto de recaudo", peticionario: "Jorge E. Patiño", canal: "web", dependencia: "Secretaría de Hacienda", responsable: "D. Salazar", radicadoEn: diasHora(-27, "10:05"), respondidoEn: null, prorrogado: false },
  { numero: rad(394), tipo: "reclamo", asunto: "Cobro duplicado en el impuesto predial", peticionario: "Luz D. Morales", canal: "correo", dependencia: "Secretaría de Hacienda", responsable: null, radicadoEn: diasHora(-26, "14:40"), respondidoEn: null, prorrogado: false },
  { numero: rad(402), tipo: "informacion", asunto: "Copia del contrato de alumbrado público 2025", peticionario: "Andrés F. Rincón", canal: "web", dependencia: "Secretaría de Gobierno", responsable: "M. Cifuentes", radicadoEn: diasHora(-18, "09:12"), respondidoEn: null, prorrogado: false },
  { numero: rad(398), tipo: "peticion", asunto: "Poda de árboles en el parque principal", peticionario: "Comité Cívico El Bosque", canal: "presencial", dependencia: "Servicios Públicos", responsable: "R. Ocampo", radicadoEn: diasHora(-21, "11:30"), respondidoEn: null, prorrogado: false },
  { numero: rad(404), tipo: "queja", asunto: "Ruido de establecimiento nocturno sin control", peticionario: "Sandra P. Rojas", canal: "telefonico", dependencia: "Secretaría de Gobierno", responsable: null, radicadoEn: diasHora(-20, "16:55"), respondidoEn: null, prorrogado: false },
  { numero: rad(407), tipo: "denuncia", asunto: "Presunta irregularidad en contratación de obra", peticionario: "Anónimo", canal: "web", dependencia: "Secretaría de Gobierno", responsable: "M. Cifuentes", radicadoEn: diasHora(-19, "07:45"), respondidoEn: null, prorrogado: false },
  { numero: rad(412), tipo: "informacion", asunto: "Estadísticas de vacunación del último trimestre", peticionario: "Universidad Regional", canal: "correo", dependencia: "Secretaría de Salud", responsable: "C. Betancourt", radicadoEn: diasHora(-13, "08:00"), respondidoEn: null, prorrogado: false },
  { numero: rad(409), tipo: "peticion", asunto: "Instalación de reductores de velocidad en la calle 14", peticionario: "Junta de Acción Comunal", canal: "presencial", dependencia: "Secretaría de Infraestructura", responsable: "T. Villegas", radicadoEn: diasHora(-17, "13:20"), respondidoEn: null, prorrogado: false },
  { numero: rad(415), tipo: "reclamo", asunto: "Facturación del acueducto sin lectura de medidor", peticionario: "Hernán Gutiérrez", canal: "web", dependencia: "Servicios Públicos", responsable: null, radicadoEn: diasHora(-16, "15:10"), respondidoEn: null, prorrogado: false },
  { numero: rad(418), tipo: "sugerencia", asunto: "Ampliar el horario de atención de la ventanilla única", peticionario: "Comerciantes del Centro", canal: "correo", dependencia: "Secretaría de Gobierno", responsable: "M. Cifuentes", radicadoEn: diasHora(-15, "09:50"), respondidoEn: null, prorrogado: false },
  { numero: rad(423), tipo: "informacion", asunto: "Presupuesto ejecutado en el programa de vivienda", peticionario: "Veeduría Ciudadana", canal: "web", dependencia: "Secretaría de Hacienda", responsable: "D. Salazar", radicadoEn: diasHora(-11, "10:30"), respondidoEn: null, prorrogado: true },
  { numero: rad(426), tipo: "peticion", asunto: "Subsidio de transporte escolar zona rural", peticionario: "Rectoría I.E. La Esperanza", canal: "presencial", dependencia: "Secretaría de Gobierno", responsable: null, radicadoEn: diasHora(-10, "08:35"), respondidoEn: null, prorrogado: false },
  { numero: rad(429), tipo: "queja", asunto: "Trato inadecuado en el puesto de salud", peticionario: "Beatriz Londoño", canal: "telefonico", dependencia: "Secretaría de Salud", responsable: "C. Betancourt", radicadoEn: diasHora(-9, "11:15"), respondidoEn: null, prorrogado: false },
  { numero: rad(431), tipo: "peticion", asunto: "Certificado de estratificación del predio", peticionario: "Inmobiliaria del Centro", canal: "web", dependencia: "Secretaría de Hacienda", responsable: "D. Salazar", radicadoEn: diasHora(-8, "14:05"), respondidoEn: null, prorrogado: false },
  { numero: rad(434), tipo: "reclamo", asunto: "Recolección de basuras suspendida hace dos semanas", peticionario: "Edificio Miramar P.H.", canal: "web", dependencia: "Servicios Públicos", responsable: "R. Ocampo", radicadoEn: diasHora(-7, "16:20"), respondidoEn: null, prorrogado: false },
  { numero: rad(437), tipo: "consulta", asunto: "Concepto sobre uso del suelo para local comercial", peticionario: "Óscar J. Ramírez", canal: "presencial", dependencia: "Secretaría de Infraestructura", responsable: null, radicadoEn: diasHora(-30, "09:00"), respondidoEn: null, prorrogado: false },
  { numero: rad(440), tipo: "peticion", asunto: "Mantenimiento de luminarias en la vereda El Alto", peticionario: "Asociación de Usuarios", canal: "correo", dependencia: "Servicios Públicos", responsable: "R. Ocampo", radicadoEn: diasHora(-6, "07:55"), respondidoEn: null, prorrogado: false },
  { numero: rad(443), tipo: "queja", asunto: "Obra sin señalización en la carrera 8", peticionario: "Camilo A. Duarte", canal: "web", dependencia: "Secretaría de Infraestructura", responsable: "T. Villegas", radicadoEn: diasHora(-5, "10:40"), respondidoEn: null, prorrogado: false },
  { numero: rad(446), tipo: "informacion", asunto: "Actas del Concejo del mes anterior", peticionario: "Prensa Local", canal: "web", dependencia: "Secretaría de Gobierno", responsable: null, radicadoEn: diasHora(-4, "12:15"), respondidoEn: null, prorrogado: false },
  { numero: rad(449), tipo: "peticion", asunto: "Inclusión en el programa de adulto mayor", peticionario: "Rosa E. Cardona", canal: "presencial", dependencia: "Secretaría de Salud", responsable: "C. Betancourt", radicadoEn: diasHora(-3, "08:10"), respondidoEn: null, prorrogado: false },
  { numero: rad(452), tipo: "sugerencia", asunto: "Habilitar pago en línea del impuesto de industria y comercio", peticionario: "Cámara de Comercio", canal: "correo", dependencia: "Secretaría de Hacienda", responsable: "D. Salazar", radicadoEn: diasHora(-3, "15:30"), respondidoEn: null, prorrogado: false },
  { numero: rad(455), tipo: "reclamo", asunto: "Daño en vivienda por rotura de tubería matriz", peticionario: "Gloria I. Sánchez", canal: "telefonico", dependencia: "Servicios Públicos", responsable: null, radicadoEn: diasHora(-2, "09:25"), respondidoEn: null, prorrogado: false },
  { numero: rad(458), tipo: "peticion", asunto: "Permiso para evento comunitario en la plaza", peticionario: "Fundación Raíces", canal: "web", dependencia: "Secretaría de Gobierno", responsable: "M. Cifuentes", radicadoEn: diasHora(-1, "11:00"), respondidoEn: null, prorrogado: false },
  { numero: rad(461), tipo: "denuncia", asunto: "Vertimiento de aguas residuales a la quebrada", peticionario: "Anónimo", canal: "web", dependencia: "Servicios Públicos", responsable: null, radicadoEn: diasHora(0, "07:40"), respondidoEn: null, prorrogado: false },
  { numero: rad(360), tipo: "peticion", asunto: "Copia del plan de desarrollo municipal", peticionario: "Juan D. Ortiz", canal: "web", dependencia: "Secretaría de Gobierno", responsable: "M. Cifuentes", radicadoEn: diasHora(-40, "09:00"), respondidoEn: diasHora(-29, "16:10"), prorrogado: false },
  { numero: rad(364), tipo: "reclamo", asunto: "Corrección de nombre en el recibo del predial", peticionario: "Elena Vargas", canal: "presencial", dependencia: "Secretaría de Hacienda", responsable: "D. Salazar", radicadoEn: diasHora(-38, "10:20"), respondidoEn: diasHora(-25, "11:45"), prorrogado: false },
  { numero: rad(371), tipo: "queja", asunto: "Semáforo fuera de servicio en la glorieta", peticionario: "Transportadores Unidos", canal: "telefonico", dependencia: "Secretaría de Infraestructura", responsable: "T. Villegas", radicadoEn: diasHora(-35, "08:15"), respondidoEn: diasHora(-22, "14:30"), prorrogado: false },
  { numero: rad(376), tipo: "informacion", asunto: "Listado de beneficiarios del programa nutricional", peticionario: "Contraloría Departamental", canal: "correo", dependencia: "Secretaría de Salud", responsable: "C. Betancourt", radicadoEn: diasHora(-33, "13:00"), respondidoEn: diasHora(-24, "17:00"), prorrogado: false },
  { numero: rad(381), tipo: "peticion", asunto: "Reubicación de vendedores informales", peticionario: "Sindicato de Vendedores", canal: "presencial", dependencia: "Secretaría de Gobierno", responsable: "M. Cifuentes", radicadoEn: diasHora(-31, "09:35"), respondidoEn: diasHora(-16, "10:00"), prorrogado: true },
];
