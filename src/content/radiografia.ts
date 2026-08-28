/**
 * Radiografía Auren — auto-diagnóstico de 12 preguntas.
 *
 * Vive fuera de `site.ts` porque tiene forma propia (ejes, preguntas, bandas)
 * y no es una variante de los arrays del sitio. Misma regla: para cambiar una
 * pregunta o un texto de resultado NO se toca JSX, se edita este archivo.
 *
 * Voz: se trata de «usted», como el resto del sitio.
 */

/** Las opciones van de menor a mayor fuga: el índice ES el puntaje (0–3). */
export type Question = {
  id: string;
  axis: AxisId;
  prompt: string;
  options: [string, string, string, string];
};

export type AxisId =
  | "manuales"
  | "dispersa"
  | "comunicacion"
  | "indicadores"
  | "comercial"
  | "dependencia"
  | "control"
  | "decisiones";

/** `gain` es lo que la empresa gana al cerrar esa fuga, no el problema. */
export const axes: Record<AxisId, { name: string; gain: string }> = {
  manuales: {
    name: "Procesos manuales",
    gain: "Cada hora que hoy se va en copiar y pegar es una hora que vuelve a la operación.",
  },
  dispersa: {
    name: "Información dispersa",
    gain: "Una sola fuente de verdad: dejar de buscar el dato para empezar a usarlo.",
  },
  comunicacion: {
    name: "Comunicación operativa",
    gain: "Sacar la operación crítica del chat: que ningún pedido dependa de que alguien no borre una conversación.",
  },
  indicadores: {
    name: "Visibilidad de indicadores",
    gain: "Ver los números del mes sin pelearlos, y enterarse de los problemas mientras todavía son pequeños.",
  },
  comercial: {
    name: "Seguimiento comercial",
    gain: "Que ninguna oportunidad se caiga por falta de seguimiento.",
  },
  dependencia: {
    name: "Dependencia de personas clave",
    gain: "Que la operación no se detenga cuando falta quien sabe cómo se hace.",
  },
  control: {
    name: "Control operativo",
    gain: "Medir en vez de intuir: inventario, producción y calidad con dato encima.",
  },
  decisiones: {
    name: "Decisiones",
    gain: "Decidir con números propios y dejar de invertir en tecnología que después nadie usa.",
  },
};

export const questions: Question[] = [
  {
    id: "q1",
    axis: "manuales",
    prompt:
      "¿Cuánto de la operación diaria depende de que alguien copie, pegue o retranscriba información a mano?",
    options: ["Casi nada", "Algo", "Bastante", "Es el pan de cada día"],
  },
  {
    id: "q2",
    axis: "manuales",
    prompt: "Un reporte que necesita cada semana, ¿cómo aparece?",
    options: [
      "Automático",
      "Alguien lo arma en minutos",
      "Alguien pierde horas armándolo",
      "No lo tenemos porque cuesta mucho hacerlo",
    ],
  },
  {
    id: "q3",
    axis: "dispersa",
    prompt:
      "Si le pregunto un dato clave del negocio ahora mismo, ¿en cuántos lugares distintos tendría que buscarlo?",
    options: ["En uno", "En dos", "En tres o más", "Nadie sabe con certeza"],
  },
  {
    id: "q4",
    axis: "dispersa",
    prompt: "¿Cuántas versiones del «mismo» Excel circulan en su empresa?",
    options: [
      "Una fuente única",
      "Pocas y controladas",
      "Varias",
      "Un caos de versiones",
    ],
  },
  {
    id: "q5",
    axis: "comunicacion",
    prompt:
      "¿Qué tanto de la operación crítica —pedidos, instrucciones, aprobaciones— vive en chats de WhatsApp?",
    options: ["Nada", "Poco", "Bastante", "Si se pierde el chat, se pierde el negocio"],
  },
  {
    id: "q6",
    axis: "indicadores",
    prompt: "¿Conoce sus números importantes del mes sin tener que pelearlos?",
    options: [
      "Al instante",
      "Con algo de trabajo",
      "Toca armarlos",
      "Prácticamente no los veo",
    ],
  },
  {
    id: "q7",
    axis: "indicadores",
    prompt: "Cuando algo va mal en la operación, ¿cuánto tarda en enterarse?",
    options: ["De inmediato", "El mismo día", "Días después", "Cuando ya es un problema"],
  },
  {
    id: "q8",
    axis: "comercial",
    prompt: "¿Cómo le hacen seguimiento a clientes y oportunidades de venta?",
    options: [
      "Con un sistema dedicado",
      "Con un Excel ordenado",
      "Con la memoria de alguien",
      "Se nos escapan cosas",
    ],
  },
  {
    id: "q9",
    axis: "dependencia",
    prompt: "Si mañana falta la persona que «sabe cómo se hace X», ¿qué pasa?",
    options: [
      "Nada, está documentado",
      "Se complica un poco",
      "Se para medio proceso",
      "Sería una crisis",
    ],
  },
  {
    id: "q10",
    axis: "control",
    prompt: "Inventario, producción o calidad: ¿qué tan a ciegas operan?",
    options: ["Todo medido", "Medido a medias", "Más intuición que dato", "A ciegas"],
  },
  {
    id: "q11",
    axis: "decisiones",
    prompt: "Las decisiones importantes del mes, ¿en qué se basan?",
    options: [
      "En datos claros",
      "En datos incompletos",
      "Sobre todo en experiencia",
      "En intuición pura",
    ],
  },
  {
    id: "q12",
    axis: "decisiones",
    prompt:
      "¿Cuántas veces han invertido en tecnología o software que después no se usó como esperaban?",
    options: ["Nunca", "Una vez", "Varias", "Es lo normal aquí"],
  },
];

/** Bandas por puntaje total. `min` ascendente y sin huecos: cubren 0–36. */
export const bands = [
  {
    min: 0,
    name: "Base sólida",
    verdict: "Su operación está más ordenada que la de la mayoría.",
    body: "Las fugas visibles son pocas. El siguiente salto no es un proyecto grande: es afinar dos o tres puntos concretos y ganar velocidad donde hoy ya funciona bien.",
  },
  {
    min: 12,
    name: "Oportunidad clara",
    verdict: "Hay dos o tres focos donde se recupera tiempo y dinero rápido.",
    body: "Es el punto donde una transformación bien ordenada se paga sola: lo suficiente por arreglar para que se note, lo suficientemente sano para hacerlo sin frenar la operación.",
  },
  {
    min: 24,
    name: "Alta oportunidad",
    verdict: "Varios procesos están drenando tiempo al mismo tiempo.",
    body: "La buena noticia: cuando hay tanto por ordenar, los primeros arreglos son los que más se sienten. Lo valioso aquí no es la tecnología — es el orden en que se hace.",
  },
] as const;

export const radiografia = {
  eyebrow: "Radiografía Auren",
  title: "Descubra en 3 minutos dónde su empresa pierde tiempo y dinero.",
  lede: "Doce preguntas en lenguaje de dueño, no de ingeniero. Al terminar verá su puntaje, las fugas que más le cuestan hoy y por dónde conviene empezar. Gratis, sin registro y sin que nadie lo llame si usted no lo pide.",
  promises: [
    { k: "Toma", v: "3 minutos" },
    { k: "Cuesta", v: "Nada" },
    { k: "Pide", v: "Ningún dato suyo" },
  ],
  /** Aparece antes de responder: qué se lleva la persona. */
  value: {
    title: "Es el mismo criterio con el que diagnosticamos una empresa, reducido a un auto-test.",
    points: [
      "Un puntaje de 0 a 36 que ubica su operación con honestidad.",
      "Los dos o tres focos que más le están costando hoy, nombrados.",
      "Qué gana su empresa al cerrar cada uno.",
    ],
  },
  scale:
    "Cada opción lleva su puntaje: 0 es sin fuga, 3 es fuga alta. El total va de 0 a 36.",
  progress: {
    label: "Preguntas respondidas",
    pending: "Responda las 12 para ver su radiografía completa.",
  },
  result: {
    eyebrow: "Su radiografía",
    focusTitle: "Sus focos hoy",
    focusNone:
      "No aparece ninguna fuga marcada. Es poco común: vale la pena confirmarlo con una mirada externa.",
    closing:
      "Esto es una radiografía: le muestra dónde mirar. El Auren Insight es la resonancia — en pocos días le mostramos exactamente cuánto le cuesta cada foco y cuál transformar primero, con números de su propia operación. Si quiere, le leemos su resultado en una llamada de 20 minutos, sin compromiso.",
    cta: "Que me lean el resultado",
    reset: "Empezar de nuevo",
  },
} as const;
