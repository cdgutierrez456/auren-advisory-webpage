/**
 * Radiografía Auren — auto-diagnóstico (v2).
 *
 * Vive fuera de `site.ts` porque tiene forma propia (ejes, preguntas, bandas)
 * y no es una variante de los arrays del sitio. Misma regla: para cambiar una
 * pregunta o un texto de resultado NO se toca JSX, se edita este archivo.
 *
 * Voz: se trata de «usted», tratamiento consistente en toda la pieza.
 *
 * v2 (2026): 6 ejes de 2 preguntas, vocabulario neutro con opciones ancladas
 * en horas/veces/lugares, dos preguntas de contexto que personalizan el
 * lenguaje, opción «No aplica» y bandas recalibradas hacia arriba.
 */

export type AxisId =
  | "repetido"
  | "dispersa"
  | "visibilidad"
  | "seguimiento"
  | "dependencia"
  | "decisiones";

/** Tipo de operación (pregunta de contexto C1). Personaliza {unidad}/{cliente}. */
export type OperationType = "produce" | "servicios" | "personas" | "comercializa";

/**
 * Diccionario de variables. Tres preguntas insertan un término que cambia
 * según C1. Si no se respondió C1, se usa la forma larga neutra.
 */
export const operationTypes: {
  id: OperationType;
  label: string;
  unidad: string;
  cliente: string;
}[] = [
  {
    id: "produce",
    label: "Producimos o transformamos algo físico",
    unidad: "un pedido o un lote",
    cliente: "cliente",
  },
  {
    id: "servicios",
    label: "Prestamos servicios a otras empresas",
    unidad: "un proyecto o una entrega",
    cliente: "cliente",
  },
  {
    id: "personas",
    label: "Atendemos personas (pacientes, estudiantes, beneficiarios)",
    unidad: "un caso o una cita",
    cliente: "cliente o beneficiario",
  },
  {
    id: "comercializa",
    label: "Comercializamos o distribuimos productos",
    unidad: "un pedido o un despacho",
    cliente: "cliente",
  },
];

export const DEFAULT_UNIDAD = "un pedido, un proyecto o un caso";
export const DEFAULT_CLIENTE = "cliente";

/** Tamaño de la organización (C2). Define el rango de precio en la conversación. */
export const sizes = ["Menos de 10", "10 a 30", "31 a 80", "81 a 200", "Más de 200"] as const;

/**
 * Ejes. `priority` ordena los desempates (menor gana): Información dispersa,
 * Trabajo repetido, Visibilidad, Seguimiento, Dependencia, Decisiones.
 * `phrase` es la lectura que se muestra cuando el eje es foco: descriptiva,
 * en voz Auren, sin regaño.
 */
export const axes: Record<
  AxisId,
  { name: string; priority: number; phrase: string }
> = {
  dispersa: {
    name: "Información dispersa",
    priority: 0,
    phrase:
      "La información de su operación existe, pero vive en varios lugares a la vez. Eso encarece cada decisión y cada consulta.",
  },
  repetido: {
    name: "Trabajo repetido",
    priority: 1,
    phrase:
      "Hay horas de su equipo que se están yendo en mover información de un lado a otro. Ese es de los focos que más rápido se recuperan.",
  },
  visibilidad: {
    name: "Visibilidad",
    priority: 2,
    phrase:
      "Su operación funciona, pero enterarse de cómo va cuesta trabajo. Eso hace que los problemas se vean tarde.",
  },
  seguimiento: {
    name: "Seguimiento",
    priority: 3,
    phrase:
      "Lo que pasa con cada cliente depende de quién lo atiende. Ahí es donde más silenciosamente se pierden oportunidades.",
  },
  dependencia: {
    name: "Dependencia de personas",
    priority: 4,
    phrase:
      "Hay conocimiento clave que hoy vive en personas y no en la organización. Es un riesgo que no se nota hasta que se nota.",
  },
  decisiones: {
    name: "Decisiones y tecnología",
    priority: 5,
    phrase:
      "Las decisiones se están tomando con menos información de la que la empresa realmente tiene disponible.",
  },
};

/** Las opciones van de menor a mayor fuga: el índice ES el puntaje (0–3). */
export type Question = {
  id: string;
  axis: AxisId;
  prompt: string;
  hint?: string;
  options: [string, string, string, string];
};

export const questions: Question[] = [
  {
    id: "q1",
    axis: "repetido",
    prompt:
      "En una semana normal, ¿cuánto tiempo se le va a su equipo pasando información de un lado a otro a mano?",
    hint: "De un correo a un Excel, de un WhatsApp a un sistema, de un papel a un computador.",
    options: [
      "Menos de una hora en toda la organización",
      "Entre una y cinco horas",
      "Entre cinco y quince horas",
      "Más de quince horas, o nunca lo hemos medido",
    ],
  },
  {
    id: "q2",
    axis: "repetido",
    prompt:
      "Piense en un reporte o resumen que alguien prepara cada semana o cada mes. ¿Cómo se produce?",
    options: [
      "Sale solo del sistema, nadie lo arma",
      "Alguien lo arma en menos de media hora",
      "Alguien dedica varias horas a armarlo",
      "No lo tenemos, porque armarlo costaría demasiado tiempo",
    ],
  },
  {
    id: "q3",
    axis: "dispersa",
    prompt:
      "Si necesita un número importante del negocio ahora mismo (lo vendido este mes, lo entregado, lo atendido), ¿en cuántos lugares distintos tendría que buscarlo?",
    options: [
      "En uno solo",
      "En dos",
      "En tres o más",
      "Tendría que preguntarle a varias personas para poder armarlo",
    ],
  },
  {
    id: "q4",
    axis: "dispersa",
    prompt:
      "¿Qué parte de la operación importante (instrucciones, aprobaciones, pedidos, compromisos) queda registrada únicamente en chats de WhatsApp o en correos sueltos?",
    options: [
      "Nada, todo queda en un sistema",
      "Una parte pequeña",
      "Buena parte",
      "Casi todo pasa por ahí",
    ],
  },
  {
    id: "q5",
    axis: "visibilidad",
    prompt:
      "Para saber en qué estado va {unidad} en este momento, ¿qué tiene que hacer?",
    options: [
      "Lo veo en pantalla al instante",
      "Lo consulto en un archivo o sistema, me toma unos minutos",
      "Le pregunto a la persona encargada",
      "Toca reconstruirlo preguntando en varios lados",
    ],
  },
  {
    id: "q6",
    axis: "visibilidad",
    prompt: "¿Qué tan rápido puede saber cómo va el mes sin pedirle nada a nadie?",
    options: [
      "En cualquier momento, está disponible",
      "El mismo día que lo pida",
      "Toca esperar a que alguien lo prepare",
      "Solo lo veo cuando cierra el mes",
    ],
  },
  {
    id: "q7",
    axis: "seguimiento",
    prompt:
      "¿Dónde queda registrado lo que pasa con cada {cliente} a lo largo del tiempo (conversaciones, acuerdos, pendientes)?",
    options: [
      "En un sistema que cualquiera del equipo puede consultar",
      "En un archivo compartido y ordenado",
      "Repartido entre los archivos y correos de cada persona",
      "Sobre todo en la memoria de quien lo atiende",
    ],
  },
  {
    id: "q8",
    axis: "seguimiento",
    prompt:
      "En los últimos tres meses, ¿con qué frecuencia se les ha pasado algo por falta de seguimiento (un cobro, una respuesta, un compromiso, una entrega)?",
    options: [
      "No recuerdo ningún caso",
      "Una o dos veces",
      "Varias veces",
      "Pasa con cierta regularidad",
    ],
  },
  {
    id: "q9",
    axis: "dependencia",
    prompt:
      "Si la persona que mejor conoce un proceso clave falta dos semanas sin avisar, ¿qué pasa?",
    options: [
      "Otra persona lo toma sin problema, está documentado",
      "Se complica un poco, pero sale adelante",
      "Ese proceso se atrasa de forma notoria",
      "Ese proceso prácticamente se detiene",
    ],
  },
  {
    id: "q10",
    axis: "dependencia",
    prompt:
      "Cuando entra alguien nuevo a un cargo operativo, ¿cuánto tarda en trabajar sin que le tengan que explicar?",
    options: [
      "Menos de una semana, hay material de apoyo",
      "Dos o tres semanas",
      "Uno o dos meses",
      "Varios meses, o depende de que alguien le enseñe sobre la marcha",
    ],
  },
  {
    id: "q11",
    axis: "decisiones",
    prompt:
      "La última decisión importante sobre la operación (contratar, comprar, cambiar algo), ¿en qué se apoyó?",
    options: [
      "En números que ya tenía a la mano",
      "En números que tocó armar para la ocasión",
      "Sobre todo en experiencia y criterio",
      "En lo que se percibía en ese momento",
    ],
  },
  {
    id: "q12",
    axis: "decisiones",
    prompt: "¿Han comprado software o herramientas que después se usaron mucho menos de lo esperado?",
    options: [
      "No nos ha pasado",
      "Una vez",
      "Varias veces",
      "Hoy tenemos herramientas pagadas que casi nadie usa",
    ],
  },
];

/**
 * Bandas por puntaje total (0–36). `min` ascendente y sin huecos.
 * `verdict` es la frase de reconocimiento (serif); `body` la sigue en sans.
 * `insightBridge` decide si se muestra el puente al Auren Insight.
 *
 * ponytail: subidas respecto a la v1 (0–11 / 12–23 / 24–36) porque las
 * opciones extremas ahora sí se marcan. Revisar con las primeras 20 respuestas:
 * si más del 60% cae en «Alta oportunidad», subir de nuevo los cortes.
 */
export const bands = [
  {
    min: 0,
    name: "Base sólida",
    verdict: "Su operación está más ordenada que la mayoría.",
    body: "Honestamente, un diagnóstico completo probablemente no sea lo que más le sirve hoy. Si hay algo puntual que le está incomodando, escríbanos y le damos nuestra lectura sin que medie un proyecto.",
    insightBridge: false,
  },
  {
    min: 14,
    name: "Oportunidad clara",
    verdict:
      "Su operación funciona. Eso es justamente lo que hace difícil ver dónde se está fugando.",
    body: "Las empresas que llegan a este puntaje casi siempre tienen dos o tres focos que se recuperan rápido. El trabajo está en saber cuál mueve la aguja antes de gastar un peso.",
    insightBridge: true,
  },
  {
    min: 26,
    name: "Alta oportunidad",
    verdict: "Nada de lo que acaba de leer le sorprendió.",
    body: "Usted ya sabía dónde se le va el tiempo. Lleva meses sabiéndolo. La pregunta que sigue es cuánto le está costando exactamente, y cuál de esos focos mueve primero.",
    insightBridge: true,
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
  value: {
    title:
      "Es el mismo criterio con el que diagnosticamos una empresa, reducido a un auto-test.",
    points: [
      "Un puntaje de 0 a 36 que ubica su operación con honestidad.",
      "Los dos o tres focos que más le están costando hoy, nombrados.",
      "Qué gana su empresa al cerrar cada uno, y por dónde empezar.",
    ],
  },
  /** Preguntas de contexto (no puntúan). Van antes de las doce. */
  context: {
    intro: "Antes de empezar, dos preguntas para hablarle en sus términos.",
    c1: {
      id: "c1",
      prompt: "¿Cómo describiría lo que hace su organización?",
    },
    c2: {
      id: "c2",
      prompt: "¿Cuántas personas trabajan en la organización?",
    },
  },
  scale:
    "Cada opción lleva su puntaje: 0 es sin fuga, 3 es fuga alta. El total va de 0 a 36.",
  naLabel: "No aplica a mi organización",
  nav: {
    back: "Atrás",
    next: "Siguiente",
    finish: "Ver mi radiografía",
    start: "Empezar",
    step: "Pregunta",
    of: "de",
    context: "Contexto",
  },
  progress: {
    label: "Avance de la radiografía",
    pending: "Responda las 12 para ver su radiografía completa.",
  },
  result: {
    eyebrow: "Su radiografía",
    focusTitle: "Sus focos hoy",
    focusNone:
      "No aparece ninguna fuga marcada. Es poco común: vale la pena confirmarlo con una mirada externa.",
    /** Bloque 1 — el costo en horas, según la respuesta a P1 (1, 2 o 3). */
    hoursByScore: {
      1: "Según lo que respondió, su equipo dedica cerca de 150 horas al año a mover información a mano. Es casi un mes completo de una persona de tiempo completo.",
      2: "Según lo que respondió, su equipo dedica cerca de 480 horas al año a mover información a mano. Son tres meses de una persona de tiempo completo.",
      3: "Según lo que respondió, su equipo dedica más de 700 horas al año a mover información a mano. Son cuatro meses y medio de una persona de tiempo completo.",
    } as Record<number, string>,
    /** Bloque 3 — el puente al Insight (solo bandas media y alta). */
    bridge:
      "El Auren Insight toma estos focos y les pone números de su propia operación. Tres visitas a su empresa en unas tres semanas, y al final queda con un documento que dice qué transformar, en qué orden, cuánto cuesta cada cosa y cuánto le devuelve. Con eso usted decide: puede construirlo con nosotros o con quien quiera. El criterio ya lo tiene.",
    /** Bloque 4 — qué pasa en la llamada. */
    call: {
      title: "La llamada dura 30 minutos y esto es lo que pasa:",
      points: [
        "Le leemos su resultado y le decimos qué vimos que usted todavía no vio.",
        "Le damos una primera estimación de lo que le está costando el foco principal.",
        "Si tiene sentido un Insight, se lo decimos. Si no, también.",
      ],
      cta: "Agendar mi lectura de resultados",
      ctaSub: "30 minutos · por videollamada · con uno de los dos socios",
    },
    /** CTA suave para la banda «Base sólida». */
    ctaSoft: "Escribirnos por WhatsApp",
    /** Bloque 5 — capacidad. ponytail: solo publicar si es verdad; ajustar el número. */
    capacity:
      "Hacemos tres diagnósticos al mes. Es el techo real de dos personas trabajando a fondo en cada uno.",
    /** 5 o más «No aplica»: se sale del patrón que mide la radiografía. */
    offScale: {
      title: "Su operación se sale del patrón que mide esta radiografía.",
      body: "Eso normalmente significa que vale más una conversación que un puntaje. Con gusto la miramos con usted en una llamada corta.",
    },
    /** Salida secundaria para quien no agenda. */
    secondary: "¿Prefiere pensarlo? Comparta su resultado con su equipo y vuelva cuando quiera.",
    reset: "Empezar de nuevo",
  },
} as const;
