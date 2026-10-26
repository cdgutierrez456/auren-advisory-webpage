/**
 * English for the demos' seeded data (`../demo-data.ts`, `../terminos.ts`).
 *
 * Keyed by the Spanish text, not by id: the data stays in one place in
 * Spanish and the screen asks `dato(texto)` for its English. A missing key
 * falls back to the Spanish — `en.test.ts` checks there are none.
 *
 * Names of people, plates and case numbers are not translated.
 */
export const DATOS_EN: Record<string, string> = {
  // Checklist groups
  Documentos: "Documents",
  Luces: "Lights",
  Frenos: "Brakes",
  Llantas: "Tires",
  Fluidos: "Fluids",
  Seguridad: "Safety",

  // Checklist items
  "SOAT vigente a bordo": "Valid mandatory insurance (SOAT) on board",
  "Tecnomecánica vigente": "Valid vehicle inspection certificate",
  "Licencia de conducción vigente": "Valid driver's license",
  "Tarjeta de propiedad a bordo": "Vehicle registration on board",
  "Luces de freno funcionan": "Brake lights work",
  "Direccionales funcionan": "Turn signals work",
  "Luces altas y bajas funcionan": "High and low beams work",
  "Luz de reversa funciona": "Reverse light works",
  "Freno de servicio responde": "Service brake responds",
  "Freno de mano sostiene": "Parking brake holds",
  "Nivel de líquido de frenos en rango": "Brake fluid level within range",
  "Labrado sobre el testigo de desgaste": "Tread above the wear indicator",
  "Presión de inflado correcta": "Correct tire pressure",
  "Llanta de repuesto en condiciones": "Spare tire in good condition",
  "Rines sin fisuras ni golpes": "Rims free of cracks or dents",
  "Nivel de aceite en rango": "Oil level within range",
  "Nivel de refrigerante en rango": "Coolant level within range",
  "Sin fugas visibles bajo el vehículo": "No visible leaks under the vehicle",
  "Extintor cargado y vigente": "Fire extinguisher charged and valid",
  "Botiquín completo": "First-aid kit complete",
  "Cinturones de seguridad funcionan": "Seat belts work",
  "Kit de carretera completo": "Roadside kit complete",

  // Vehicle types
  camion: "truck",
  van: "van",
  bus: "bus",
  camioneta: "pickup",

  // Fleet documents
  SOAT: "SOAT",
  Tecnomecánica: "Inspection",
  Licencia: "License",

  // PQRSD request types
  "Petición de interés general o particular": "Petition (general or particular interest)",
  Queja: "Complaint",
  Reclamo: "Claim",
  Sugerencia: "Suggestion",
  Denuncia: "Report of wrongdoing",
  "Petición de documentos o información": "Request for documents or information",
  Consulta: "Inquiry",

  // Demo entity
  "Alcaldía de Municipio Demo": "Demo Municipality City Hall",
  "Secretaría de Gobierno": "Department of Government",
  "Secretaría de Hacienda": "Department of Finance",
  "Secretaría de Infraestructura": "Department of Infrastructure",
  "Secretaría de Salud": "Department of Health",
  "Servicios Públicos": "Public Utilities",

  // Filing channels
  web: "web",
  presencial: "in person",
  telefonico: "phone",
  correo: "email",

  // Seeded requests
  "Reparación de vía en el barrio San Antonio": "Road repair in the San Antonio neighborhood",
  "Demora en la atención del punto de recaudo": "Delays at the payment collection point",
  "Cobro duplicado en el impuesto predial": "Duplicate charge on the property tax",
  "Copia del contrato de alumbrado público 2025": "Copy of the 2025 street-lighting contract",
  "Poda de árboles en el parque principal": "Tree pruning in the main park",
  "Ruido de establecimiento nocturno sin control": "Uncontrolled noise from a nightclub",
  "Presunta irregularidad en contratación de obra": "Alleged irregularity in a public-works contract",
  "Estadísticas de vacunación del último trimestre": "Vaccination statistics for the last quarter",
  "Instalación de reductores de velocidad en la calle 14": "Speed bumps on 14th Street",
  "Facturación del acueducto sin lectura de medidor": "Water bill issued without a meter reading",
  "Ampliar el horario de atención de la ventanilla única": "Extend the opening hours of the one-stop window",
  "Presupuesto ejecutado en el programa de vivienda": "Budget spent on the housing program",
  "Subsidio de transporte escolar zona rural": "School transport subsidy for the rural area",
  "Trato inadecuado en el puesto de salud": "Improper treatment at the health post",
  "Certificado de estratificación del predio": "Property socioeconomic-stratum certificate",
  "Recolección de basuras suspendida hace dos semanas": "Garbage collection suspended two weeks ago",
  "Concepto sobre uso del suelo para local comercial": "Opinion on land use for a commercial unit",
  "Mantenimiento de luminarias en la vereda El Alto": "Streetlight maintenance in the El Alto village",
  "Obra sin señalización en la carrera 8": "Unsigned roadworks on 8th Avenue",
  "Actas del Concejo del mes anterior": "Minutes of last month's Council sessions",
  "Inclusión en el programa de adulto mayor": "Enrollment in the senior-citizen program",
  "Habilitar pago en línea del impuesto de industria y comercio":
    "Enable online payment of the business tax",
  "Daño en vivienda por rotura de tubería matriz": "Home damaged by a burst water main",
  "Permiso para evento comunitario en la plaza": "Permit for a community event in the square",
  "Vertimiento de aguas residuales a la quebrada": "Wastewater being dumped into the creek",
  "Copia del plan de desarrollo municipal": "Copy of the municipal development plan",
  "Corrección de nombre en el recibo del predial": "Name correction on the property-tax bill",
  "Semáforo fuera de servicio en la glorieta": "Traffic light out of service at the roundabout",
  "Listado de beneficiarios del programa nutricional": "List of beneficiaries of the nutrition program",
  "Reubicación de vendedores informales": "Relocation of street vendors",
};
