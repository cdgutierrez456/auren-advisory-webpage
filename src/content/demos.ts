/**
 * Catálogo de demos. Un demo que no se pueda amarrar a un servicio de
 * `site.ts` no entra aquí: sirve para demostrar el servicio, no para lucirse.
 *
 * Para añadir un demo se agrega una entrada y se crea la ruta. El índice, la
 * navegación y los contadores salen solos de este array.
 */

export type Demo = {
  /** Ruta bajo /demos. */
  slug: string;
  nombre: string;
  /** Etiqueta corta para la barra de navegación de los demos. */
  corto: string;
  /** Slug del servicio en `site.ts` que este demo demuestra. */
  servicio: string;
  servicioNombre: string;
  segmento: "Transporte" | "Entidades públicas" | "Salud" | "Transversal";
  /** Qué se ve en pantalla. Una frase, sin adjetivos. */
  resumen: string;
  /** Por qué al cliente le importa. El dolor, no la funcionalidad. */
  dolor: string;
  /** Qué mirar durante la demostración. Se imprime dentro del demo. */
  pasos: readonly string[];
  /** Lo que este demo NO hace. Se dice antes de que el cliente lo descubra. */
  limite: string;
};

export const demos: readonly Demo[] = [
  {
    slug: "preoperacional",
    corto: "Preoperacional",
    nombre: "Inspección preoperacional",
    servicio: "auren-flow",
    servicioNombre: "Auren Flow",
    segmento: "Transporte",
    resumen:
      "Checklist de 22 ítems en el celular, con foto del hallazgo, firma del conductor y bloqueo automático de salida.",
    dolor:
      "Hoy se hace en papel y se archiva en una carpeta que nadie lee. Es exigencia del PESV y del SG-SST, y si falla un ítem crítico el vehículo no debería salir.",
    pasos: [
      "Elija un vehículo de la flota.",
      "Marque «Malo» en un ítem crítico (los marcados con ●) y verá que exige foto.",
      "Firme con el dedo o el mouse y cierre la inspección.",
      "El resultado sale BLOQUEADO y queda en el tablero de cumplimiento.",
    ],
    limite:
      "Sin usuarios reales, sin almacenamiento de fotos y sin valor probatorio de la firma: eso es alcance de piloto.",
  },
  {
    slug: "flota",
    corto: "Vencimientos",
    nombre: "Vencimientos de flota",
    servicio: "auren-flow",
    servicioNombre: "Auren Flow",
    segmento: "Transporte",
    resumen:
      "SOAT, tecnomecánica, licencias y mantenimiento por kilometraje, con semáforo y días restantes.",
    dolor:
      "Nadie sabe cuántos vehículos están rodando hoy con documentos vencidos. La sanción es directa y la aseguradora objeta el siniestro.",
    pasos: [
      "Lea la cifra grande: cuántos vehículos no deberían estar rodando hoy.",
      "La tabla viene ordenada por urgencia, sin filtrar nada.",
      "Mueva los umbrales: lo que para usted es «crítico» puede ser 30 días, no 15.",
    ],
    limite:
      "Los datos son sintéticos y no hay alertas automáticas. En el piloto se carga su flota real y el aviso sale antes, no cuando ya venció.",
  },
  {
    slug: "pqrsd",
    corto: "PQRSD",
    nombre: "PQRSD con control de términos",
    servicio: "auren-flow",
    servicioNombre: "Auren Flow",
    segmento: "Entidades públicas",
    resumen:
      "Radicación ciudadana, bandeja con semáforo de días hábiles restantes y tablero de gestión por dependencia.",
    dolor:
      "El término corre desde que se radica, se cuenta en días hábiles y con festivos. Hoy se controla en un Excel que nadie mira los viernes.",
    pasos: [
      "Abra la bandeja: las filas rojas ya están vencidas.",
      "Mire la columna «Responsable»: los que dicen «sin asignar» son los que se vencen sin que nadie lo vea venir.",
      "Radique una petición nueva y véala aparecer arriba en la bandeja.",
      "El tablero resume vencidos por dependencia.",
    ],
    limite:
      "Los términos son configurables y hay que verificar su vigencia contra la norma. No calcula prórrogas ni suspensiones, y no reemplaza el gestor documental.",
  },
  {
    slug: "vision/siete-segmentos",
    corto: "7 segmentos",
    nombre: "Lectura de display de 7 segmentos",
    servicio: "auren-vision",
    servicioNombre: "Auren Vision",
    segmento: "Transversal",
    resumen:
      "La cámara lee el número de una báscula, una balanza o cualquier equipo con display LED.",
    dolor:
      "Ese número hoy lo copia una persona a mano en una planilla, tres veces por turno, y se transcribe otra vez al Excel.",
    pasos: [
      "Encienda la cámara y encuadre el display dentro del recuadro.",
      "Ajuste cuántos dígitos tiene el display.",
      "Si no está seguro de la lectura, el demo no muestra número: dice «acercando…».",
    ],
    limite:
      "Corre en el navegador de este equipo. Para 24/7 con cámara fija, la inferencia se muda a un equipo en sitio.",
  },
  {
    slug: "vision/medidor",
    corto: "Medidor",
    nombre: "Lectura de medidor análogo",
    servicio: "auren-vision",
    servicioNombre: "Auren Vision",
    segmento: "Transversal",
    resumen:
      "La cámara lee la aguja de un manómetro o un contador y la convierte en un valor con unidades.",
    dolor:
      "Hay instrumentación de 30 años en cada planta, hospital y acueducto que hoy alguien anota en una planilla. Retrofit por cámara: sin cambiar el equipo.",
    pasos: [
      "Encuadre el dial dentro del círculo.",
      "Calibre: ángulo del cero, ángulo del fondo de escala y los dos valores.",
      "Mueva la aguja (o el papel) y vea cambiar el valor.",
    ],
    limite:
      "La calibración es por instrumento. Es una propiedad del mundo físico, no una limitación del demo: cada manómetro tiene su cero mecánico.",
  },
  {
    slug: "vision/placas",
    corto: "Placas",
    nombre: "Lectura de placas (ALPR)",
    servicio: "auren-vision",
    servicioNombre: "Auren Vision",
    segmento: "Transporte",
    resumen:
      "La cámara lee la placa del vehículo que entra y la contrasta contra la flota registrada.",
    dolor:
      "Los tiempos de permanencia en patio hoy los anota un portero en un cuaderno, cuando los anota.",
    pasos: [
      "Encienda la cámara y ponga una placa impresa dentro de la franja.",
      "La lectura solo se acepta si el formato es válido y se repite en 3 de los últimos 5 fotogramas.",
      "Si la placa está en la flota sembrada, el demo la reconoce y muestra el vehículo.",
    ],
    limite:
      "Con encuadre de mano y luz de oficina la precisión es la que se ve. En patio real va con cámara fija, encuadre controlado e iluminación propia.",
  },
  {
    slug: "friccion",
    corto: "Fricción",
    nombre: "Costo de la fricción",
    servicio: "auren-insight",
    servicioNombre: "Auren Insight",
    segmento: "Transversal",
    resumen:
      "Cuánto cuesta al año una tarea manual, en pesos y en personas a tiempo completo.",
    dolor:
      "«Nos toma un rato» no mueve a nadie. «Son 47 millones al año» sí.",
    pasos: [
      "Ponga cuántas personas hacen la tarea y cuántas horas le dedican por semana.",
      "Ajuste el salario promedio.",
      "El equivalente en personas a tiempo completo es la cifra que se repite en la reunión.",
    ],
    limite:
      "Es una estimación con la base de cálculo a la vista. No incluye reprocesos, errores ni costo de oportunidad — que suelen ser mayores.",
  },
];

export const demoBySlug = (slug: string) => demos.find((d) => d.slug === slug);
