/**
 * Todo el contenido editorial del sitio vive aquí.
 *
 * Regla de escalabilidad: para añadir una capacidad, un producto o un caso NO
 * se toca JSX — se añade una entrada a estos arrays. Cuando el volumen lo pida,
 * este módulo se reemplaza por un CMS manteniendo los mismos tipos.
 */

export const site = {
  name: "Auren Advisory",
  tagline: "Ver. Entender. Transformar.",
  domain: "aurenadv.com",
  emails: ["cristiangutierrez@aurenadv.com", "juancalvo@aurenadv.com"],
  /** Solo dígitos, con indicativo de país. Formato que exige wa.me. */
  whatsapp: "573206548168",
  whatsappDisplay: "+57 320 654 8168",
  /** Meta description por defecto. Máx. ~160 caracteres o Google la corta. */
  description:
    "Consultoría en transformación empresarial, automatización e inteligencia artificial en Colombia. Diagnosticamos su operación antes de recomendar tecnología.",
  /** Versión larga, para pie de página y schema. */
  descriptionLong:
    "Firma de transformación empresarial con base en Manizales. Observamos cómo funciona su empresa, medimos el costo de la fricción y solo entonces decidimos qué tecnología —automatización, datos, inteligencia artificial o software a medida— tiene sentido.",
  city: "Manizales",
  region: "Caldas",
  /** Coordenadas del centro de Manizales. Solo para el JSON-LD de negocio local. */
  geo: { lat: 5.0689, lng: -75.5174 },
} as const;

export const nav = [
  { label: "Enfoque", href: "/enfoque" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Radiografía", href: "/radiografia" },
  { label: "Demos", href: "/demos" },
  { label: "Recursos", href: "/recursos" },
] as const;

export const hero = {
  eyebrow: "Transformación empresarial",
  title: ["Ver.", "Entender.", "Transformar."],
  /**
   * Segunda línea del H1. El eslogan solo no le dice al buscador —ni a quien
   * llega de un enlace— a qué se dedica la firma; esto sí, y sin tocar la
   * jerarquía visual del bloque de tres palabras.
   */
  titleSub:
    "Consultoría en transformación empresarial, automatización e inteligencia artificial para empresas en Colombia.",
  lede: "Ayudamos a las organizaciones a identificar oportunidades reales y convertirlas en soluciones a medida. Primero observamos cómo funciona la empresa. La tecnología viene después.",
  primary: { label: "Agendar diagnóstico", href: "/#contacto" },
  secondary: { label: "Cómo trabajamos", href: "/enfoque" },
  meta: [
    { k: "Industria", v: "Manufactura y operaciones" },
    { k: "Servicios", v: "Compañías de servicios" },
    { k: "Tecnología", v: "Producto y plataformas" },
  ],
} as const;

export const manifesto = {
  quote:
    "Auren no es una empresa que vende inteligencia artificial. Es la empresa que sabe cuándo, dónde y cómo usarla.",
  body: [
    "La mayoría de los proyectos de tecnología fracasan antes de escribir una línea de código: se compra una herramienta para un problema que nadie diagnosticó.",
    "Nuestro trabajo empieza en el lado contrario. Entramos a la operación, medimos la fricción real y solo entonces recomendamos —o descartamos— tecnología.",
  ],
} as const;

export type Phase = {
  index: string;
  title: string;
  /** Frase corta: lo que hacemos en esta fase. */
  claim: string;
  /** Una línea de contexto, para resúmenes. */
  detail: string;
  /** La pregunta que la fase responde. */
  question: string;
  body: readonly string[];
  points: readonly string[];
  /** Con qué termina la fase. */
  output: string;
  /** Slugs de `services` que ejecutan esta fase. */
  services: readonly string[];
};

export const phases: readonly Phase[] = [
  {
    index: "01",
    title: "Ver",
    claim: "Observamos la realidad de la empresa.",
    detail:
      "Personas, procesos, herramientas, datos y puntos de fricción. Sin supuestos heredados y sin agenda de producto.",
    question: "¿Cómo funciona realmente esta empresa hoy?",
    body: [
      "Toda operación tiene dos versiones: la documentada y la real. La segunda es la que produce, la que falla y la que hay que entender. Nos sentamos con las personas que ejecutan el proceso y lo recorremos con ellas, en su puesto y con sus herramientas.",
      "No llegamos con una solución en el bolsillo. Llegamos con preguntas: qué se repite, qué se corrige después, qué se hace en Excel porque el sistema no dejaba, qué paso existe solo porque alguien lo pidió hace seis años.",
    ],
    points: [
      "Mapa de procesos y flujos reales",
      "Inventario de sistemas y datos",
      "Entrevistas con operación y dirección",
      "Registro de fricciones y reprocesos",
    ],
    output: "Un mapa de la operación como es, no como está documentada.",
    services: ["auren-insight"],
  },
  {
    index: "02",
    title: "Entender",
    claim: "Interpretamos causas, no síntomas.",
    detail:
      "Cuantificamos costos, riesgos y potencial de transformación para que la decisión de invertir sea una decisión informada.",
    question: "¿Qué está causando la fricción y cuánto está costando?",
    body: [
      "Ver una demora no explica por qué ocurre. Separamos el síntoma de la causa: si las facturas salen tarde, el problema puede estar en el sistema, en la secuencia de aprobaciones o en que dos áreas usan definiciones distintas del mismo dato.",
      "Después le ponemos cifras. Horas al mes, reprocesos, costo de oportunidad, riesgo de incumplimiento. Sin ese número la conversación sobre invertir es una discusión de opiniones, y gana quien hable más fuerte.",
    ],
    points: [
      "Causa raíz por proceso crítico",
      "Costo de la ineficiencia, en cifras",
      "Riesgos operativos y de cumplimiento",
      "Priorización por impacto y esfuerzo",
    ],
    output: "Causas cuantificadas y oportunidades ordenadas por lo que rinden.",
    services: ["auren-insight", "auren-blueprint"],
  },
  {
    index: "03",
    title: "Transformar",
    claim: "Diseñamos, implementamos y medimos.",
    detail:
      "La solución adecuada al problema correcto, entregada por fases, con métricas acordadas antes de empezar.",
    question: "¿Qué construimos, en qué orden y cómo sabremos que sirvió?",
    body: [
      "Recién aquí aparece la tecnología, y aparece elegida: a veces es automatización, a veces un modelo, a veces integrar dos sistemas que ya tiene, y a veces simplemente eliminar un paso que no hacía falta.",
      "Entregamos por incrementos que funcionan por separado, acompañamos al equipo que va a usarlos y medimos contra la métrica que se acordó antes de empezar. Si el número no se movió, lo decimos.",
    ],
    points: [
      "Diseño de solución y arquitectura",
      "Implementación por incrementos",
      "Adopción y acompañamiento al equipo",
      "Medición de impacto post-entrega",
    ],
    output: "La solución operando, adoptada y medida contra lo acordado.",
    services: [
      "auren-transform",
      "auren-flow",
      "auren-data",
      "auren-vision",
      "auren-studio",
      "auren-care",
    ],
  },
];

export const method = {
  eyebrow: "El método",
  title: "Tres movimientos. En este orden, siempre.",
  /** Bajada del H1 de /enfoque: nombra la disciplina, no solo el eslogan. */
  headline:
    "Nuestra metodología de consultoría en transformación digital: diagnóstico de la operación, análisis de causas e implementación medida.",
  lede: "No es una metodología con nombre registrado ni un marco de trabajo de consultoría. Es el orden mínimo para no equivocarse: mirar antes de opinar, entender antes de proponer, medir antes de celebrar.",

  order: {
    title: "Por qué el orden no es negociable",
    body: [
      "Casi todos los proyectos de tecnología que fracasan se saltaron un paso. Se empieza en «Transformar» porque alguien vio una demo, o en «Entender» sobre supuestos que nadie fue a verificar a la planta.",
      "Cada fase produce el insumo de la siguiente. Sin el mapa de la operación no hay causa raíz confiable; sin causa raíz cuantificada no hay forma de priorizar; sin prioridad, la implementación se convierte en una lista de deseos ordenada por quién insistió más.",
      "También sirve para parar a tiempo. Si al terminar «Entender» resulta que el problema se resuelve cambiando un procedimiento, se cambia el procedimiento y no se compra nada. Ese también es un resultado válido.",
    ],
  },

  /** Lo que este orden previene. Concreto, no aspiracional. */
  avoids: [
    {
      title: "Comprar la solución equivocada",
      body: "Herramientas caras adoptadas por moda y abandonadas a los seis meses porque resolvían un problema que la empresa no tenía.",
    },
    {
      title: "Automatizar el desorden",
      body: "Poner tecnología encima de un proceso mal diseñado solo hace que los errores ocurran más rápido y en mayor volumen.",
    },
    {
      title: "No poder demostrar el resultado",
      body: "Proyectos que terminan sin nadie capaz de decir qué mejoró, porque nunca se midió el punto de partida.",
    },
  ],
} as const;

export type Capability = {
  id: string;
  title: string;
  description: string;
};

export const capabilities: readonly Capability[] = [
  {
    id: "ia",
    title: "Inteligencia artificial",
    description:
      "Modelos aplicados a decisiones concretas: clasificación, extracción documental, asistentes internos y predicción.",
  },
  {
    id: "datos",
    title: "Datos",
    description:
      "Integración, calidad y modelado. Convertir registros dispersos en una base sobre la que se pueda decidir.",
  },
  {
    id: "automatizacion",
    title: "Automatización",
    description:
      "Eliminación de tareas repetitivas y traspasos manuales entre áreas, sistemas y proveedores.",
  },
  {
    id: "software",
    title: "Software a medida",
    description:
      "Producto interno cuando el mercado no ofrece la pieza: herramientas hechas para su operación exacta.",
  },
  {
    id: "digitalizacion",
    title: "Digitalización",
    description:
      "Procesos en papel, hojas de cálculo y correo llevados a flujos trazables, auditables y medibles.",
  },
  {
    id: "crm",
    title: "CRM",
    description:
      "Diseño e implementación del proceso comercial: pipeline real, datos limpios y visibilidad de gerencia.",
  },
  {
    id: "vision",
    title: "Visión artificial",
    description:
      "Inspección, conteo, control de calidad y seguridad en planta a partir de cámaras que ya existen.",
  },
];

/** Pregunta y respuesta. Alimenta el bloque visible y el JSON-LD de FAQPage. */
export type Faq = { q: string; a: string };

/**
 * Imagen de apoyo. Opcional a propósito: mientras no exista el archivo el
 * campo se omite y la página no renderiza nada. Especificaciones y textos
 * alternativos sugeridos en IMAGENES.md.
 */
export type Figure = { src: string; alt: string; caption?: string; width: number; height: number };

export type Service = {
  slug: string;
  name: string;
  /** Etapa dentro del sistema Auren. Se muestra como etiqueta. */
  kind: string;
  /**
   * Cómo se llama esto en un buscador. La marca no se busca; el problema sí.
   * Va en el <title>, en el H1 y en el schema. Corto: el title se trunca ~60.
   */
  keyword: string;
  /** Bajada del H1: qué es el servicio en lenguaje de cliente, no de marca. */
  headline: string;
  /** El trabajo, paso a paso. Responde «y ustedes qué hacen exactamente». */
  steps: readonly { title: string; body: string }[];
  /** Dónde aplica, con el vocabulario de cada industria. */
  industries: readonly { sector: string; body: string }[];
  /** Qué se mide para saber si sirvió. Nunca resultados prometidos. */
  measures: readonly string[];
  /** Preguntas frecuentes: búsquedas de cola larga y objeciones de venta. */
  faqs: readonly Faq[];
  /** Imagen de apoyo. Ver IMAGENES.md. */
  image?: Figure;
  /** Una línea, para listados y navegación. */
  summary: string;
  /** Párrafo de apertura de la página del servicio. */
  lede: string;
  body: readonly string[];
  /** Cuándo tiene sentido contratarlo. */
  signals: readonly string[];
  /** Qué incluye el trabajo. */
  includes: readonly string[];
  /** Con qué se queda el cliente al terminar. */
  outcome: readonly string[];
  deliverable: string;
  /** Rango de referencia, no un compromiso comercial. */
  duration: string;
  /** Paso natural siguiente. Debe existir como slug. */
  next: string;
};

/**
 * Arquitectura de servicios. Un solo sistema: todo se lee como Auren.
 *
 * PENDIENTE DE CONFIRMAR ANTES DE PUBLICAR:
 * — Insight, Blueprint y Transform vienen del brand brief. Data, Flow, Vision,
 *   Studio y Care son nombres propuestos.
 * — Los rangos de `duration` son referencias de mercado, no compromisos.
 */
export const services: readonly Service[] = [
  {
    slug: "auren-insight",
    name: "Auren Insight",
    kind: "Diagnóstico",
    summary:
      "Radiografía de la operación: dónde se pierde tiempo, dinero y control, con evidencia y cifras.",
    lede: "El punto de partida de todo. Entramos a la operación, la observamos como es —no como está documentada— y le entregamos una lectura honesta de dónde está la oportunidad real.",
    body: [
      "La mayoría de las empresas sabe que algo no funciona, pero la conversación se queda en percepciones: «el área comercial va lenta», «se pierde información entre bodega y facturación». Insight convierte esas percepciones en hechos medidos.",
      "Recorremos los procesos con las personas que los ejecutan, revisamos los sistemas que ya existen y cuantificamos el costo de la fricción. Al final usted sabe qué duele, cuánto cuesta y qué se puede resolver primero.",
    ],
    signals: [
      "Sospecha que hay reprocesos, pero no puede dimensionarlos",
      "Le han ofrecido software o IA y no sabe si lo necesita",
      "Los datos están repartidos entre sistemas, correos y hojas de cálculo",
      "Va a invertir en tecnología y quiere decidir con evidencia",
    ],
    includes: [
      "Entrevistas con dirección y con quienes ejecutan el proceso",
      "Recorrido en sitio de la operación crítica",
      "Mapa de procesos reales y de los sistemas que los soportan",
      "Cuantificación del costo de la ineficiencia",
      "Presentación de hallazgos a la dirección",
    ],
    outcome: [
      "Un informe con evidencia, no con opiniones",
      "Una lista priorizada de oportunidades por impacto y esfuerzo",
      "Claridad para decidir si invertir —o no— en tecnología",
    ],
    keyword: "Diagnóstico de procesos empresariales",
    headline: "Diagnóstico de procesos y operaciones, con evidencia y cifras",
    steps: [
      {
        title: "Encuadre con la dirección",
        body: "Una sesión para acordar qué duele, qué se intentó antes, qué áreas se pueden intervenir y qué está fuera de alcance. Salimos con la lista de procesos críticos a revisar y con los nombres de quienes hay que entrevistar.",
      },
      {
        title: "Recorrido en sitio",
        body: "Vamos a donde ocurre el trabajo: la planta, la bodega, el mostrador, el puesto de facturación. Un proceso se entiende viéndolo ejecutar, no leyendo el manual que alguien escribió hace tres años.",
      },
      {
        title: "Entrevistas con quien ejecuta",
        body: "Conversaciones cortas con las personas del proceso. Qué reprocesan, qué hacen en Excel porque el sistema no deja, qué paso existe solo porque alguien lo pidió alguna vez y nadie volvió a preguntar.",
      },
      {
        title: "Cuantificación de la fricción",
        body: "Le ponemos números a lo encontrado: horas al mes, frecuencia de reprocesos, costo de las demoras y riesgo de incumplimiento. Sin cifra no hay decisión de inversión, hay opiniones compitiendo.",
      },
      {
        title: "Hallazgos y priorización",
        body: "Presentamos a la dirección lo que encontramos, ordenado por impacto contra esfuerzo, y decimos con franqueza qué se resuelve sin comprar tecnología. Ese también es un resultado del diagnóstico.",
      },
    ],
    industries: [
      {
        sector: "Manufactura y agroindustria",
        body: "Producción, calidad, inventarios y mantenimiento. Suelen convivir un ERP subutilizado, formatos en papel en planta y hojas de cálculo que sostienen la programación real.",
      },
      {
        sector: "Transporte y logística",
        body: "Documentación de flota, preoperacionales, cumplimiento del PESV y liquidación de viajes. Mucha exigencia normativa sostenida en carpetas y en la memoria de una persona.",
      },
      {
        sector: "Servicios profesionales y salud",
        body: "Agendamiento, facturación, cartera y trazabilidad de casos. La fricción aparece en los traspasos entre áreas y en la información que se pide dos veces al mismo paciente o cliente.",
      },
      {
        sector: "Entidades públicas",
        body: "PQRSD, contratación y control de términos legales. El costo de la fricción aquí no es solo tiempo: es un término vencido con consecuencia disciplinaria.",
      },
    ],
    measures: [
      "Horas/mes dedicadas a tareas manuales por proceso crítico",
      "Frecuencia y costo de los reprocesos identificados",
      "Tiempo de ciclo actual, punta a punta, de los procesos revisados",
      "Riesgos de cumplimiento con exposición estimada",
    ],
    faqs: [
      {
        q: "¿Cuánto dura un diagnóstico empresarial?",
        a: "Entre dos y cuatro semanas, según la cantidad de procesos y sedes. La carga para su equipo es baja: entrevistas de 45 minutos y el recorrido en sitio. No pedimos que nos armen informes especiales para el diagnóstico.",
      },
      {
        q: "¿Qué necesito tener listo antes de empezar?",
        a: "Nada preparado. Basta con acceso a las personas del proceso y visibilidad de los sistemas que ya usa. Si tiene documentación la leemos, pero no la asumimos cierta: la contrastamos contra lo que ocurre en el puesto de trabajo.",
      },
      {
        q: "¿Sirve para una empresa pequeña o solo para grandes?",
        a: "Sirve desde unas 15 personas, que es cuando aparecen los traspasos entre áreas y la información deja de caber en la cabeza de una sola persona. En empresas más pequeñas el diagnóstico suele ser más corto y enfocado en uno o dos procesos.",
      },
      {
        q: "¿Y si el diagnóstico concluye que no necesito tecnología?",
        a: "Se lo decimos y ese es el entregable. No vendemos licencias ni recibimos comisión de ningún proveedor, así que no tenemos incentivo para recomendar una compra. Cambiar un procedimiento o eliminar un paso es un resultado válido y bastante frecuente.",
      },
      {
        q: "¿Quedo obligado a contratar la implementación con ustedes?",
        a: "No. El informe y la priorización son suyos, y están escritos para que cualquier equipo —el interno o un tercero— pueda ejecutarlos. La continuidad se decide después, con los hallazgos sobre la mesa.",
      },
    ],
    deliverable: "Informe Auren Insight",
    duration: "2 a 4 semanas",
    next: "auren-blueprint",
  },
  {
    slug: "auren-blueprint",
    name: "Auren Blueprint",
    kind: "Diseño",
    summary:
      "El plan de transformación: qué se hace, en qué orden, con qué tecnología y qué se espera de cada fase.",
    lede: "Un diagnóstico sin plan es un documento bonito. Blueprint traduce los hallazgos en una hoja de ruta ejecutable, con alcance, secuencia, responsables y métricas acordadas antes de empezar.",
    body: [
      "Diseñamos la solución completa antes de escribir código: cómo debería funcionar el proceso, qué piezas tecnológicas lo sostienen, qué se compra, qué se construye y qué simplemente se elimina.",
      "El plan se divide en incrementos que entregan valor por separado. Si después de la primera fase la dirección decide parar, lo entregado ya funciona y ya rinde.",
    ],
    signals: [
      "Ya tiene claro el problema y necesita definir el cómo",
      "Hay varias iniciativas compitiendo por el mismo presupuesto",
      "Necesita sustentar la inversión ante junta o socios",
      "Quiere evitar comprar una herramienta que después nadie usa",
    ],
    includes: [
      "Diseño del proceso objetivo, no solo del sistema",
      "Arquitectura de la solución y decisiones de comprar / construir",
      "Secuencia por fases con dependencias explícitas",
      "Métricas de éxito acordadas por fase",
      "Estimación de esfuerzo y consideraciones de riesgo",
    ],
    outcome: [
      "Una hoja de ruta que su equipo puede ejecutar, con o sin nosotros",
      "Criterios claros para decir que sí y para decir que no",
      "Un caso de inversión defendible ante la dirección",
    ],
    keyword: "Hoja de ruta de transformación digital",
    headline: "Plan de transformación digital: alcance, secuencia y métricas",
    steps: [
      {
        title: "Diseño del proceso objetivo",
        body: "Antes de elegir herramienta definimos cómo debería funcionar el proceso. Muchas veces el rediseño elimina pasos completos, y eso cambia por completo qué tecnología hace falta y cuánto cuesta.",
      },
      {
        title: "Decisión de comprar o construir",
        body: "Evaluamos qué resuelve una herramienta del mercado, qué exige desarrollo a medida y qué se puede resolver integrando lo que ya tiene. Comparamos costo total, dependencia de proveedor y esfuerzo de adopción.",
      },
      {
        title: "Arquitectura de la solución",
        body: "Cómo se conectan los sistemas, dónde vive cada dato, quién responde por él y qué pasa cuando algo falla. El nivel de detalle es el que necesita un equipo técnico para cotizar y ejecutar sin adivinar.",
      },
      {
        title: "Secuencia por fases",
        body: "Partimos el plan en incrementos que entregan valor por separado, con dependencias explícitas. Si después de la fase uno la dirección decide parar, lo entregado ya funciona y ya rinde.",
      },
      {
        title: "Métricas y caso de inversión",
        body: "Cada fase se amarra a una métrica acordada antes de empezar y a una estimación de esfuerzo. Con eso se sustenta la inversión ante junta o socios sin recurrir a promesas de proveedor.",
      },
    ],
    industries: [
      {
        sector: "Empresas con varias iniciativas en competencia",
        body: "Cuando sistemas, comercial y operaciones piden presupuesto a la vez, el plan ordena por impacto y no por quién insistió más en el comité.",
      },
      {
        sector: "Empresas a punto de comprar un ERP o un CRM",
        body: "El momento más caro para equivocarse. Diseñar el proceso objetivo antes de firmar evita pagar años de licencias por un ajuste que el negocio nunca adoptó.",
      },
      {
        sector: "Equipos técnicos internos sin capacidad de diseño",
        body: "Áreas de sistemas que pueden ejecutar pero están absorbidas por soporte. El plan les da el qué y el orden; la ejecución puede ser suya.",
      },
    ],
    measures: [
      "Métrica de éxito definida por fase, con línea base medida",
      "Estimación de esfuerzo y de costo total de propiedad por opción",
      "Dependencias y riesgos explícitos antes de comprometer presupuesto",
    ],
    faqs: [
      {
        q: "¿Puedo contratar Blueprint sin haber hecho el diagnóstico?",
        a: "Sí, cuando el problema ya está claramente delimitado y hay evidencia de por medio. Si el punto de partida son percepciones, empezar por el diseño es construir sobre supuestos: en ese caso recomendamos primero Auren Insight, aunque sea acotado.",
      },
      {
        q: "¿El plan sirve si lo ejecuta otro proveedor?",
        a: "Está escrito para eso. Incluye alcance, arquitectura y criterios de aceptación con el detalle necesario para cotizar y contratar a terceros. No dejamos piezas ambiguas que solo nosotros podamos interpretar.",
      },
      {
        q: "¿Recomiendan herramientas específicas?",
        a: "Sí, con nombre propio y con las razones técnicas y económicas detrás. No somos revendedores ni recibimos comisión, así que la recomendación incluye también cuándo conviene la opción más barata o quedarse con lo que ya tiene.",
      },
      {
        q: "¿Qué diferencia hay entre esto y una cotización de software?",
        a: "Una cotización parte de que usted ya sabe qué comprar. El plan define primero cómo debe funcionar el proceso y recién después qué tecnología lo sostiene, incluida la posibilidad de que la respuesta sea comprar menos de lo que pensaba.",
      },
      {
        q: "¿Cuánto se demora?",
        a: "Entre tres y cinco semanas para un alcance de dos a cuatro procesos. Un plan de transformación de toda la compañía se aborda por dominios, no en un solo entregable gigante que nadie termina de leer.",
      },
    ],
    deliverable: "Hoja de ruta priorizada",
    duration: "3 a 5 semanas",
    next: "auren-transform",
  },
  {
    slug: "auren-transform",
    name: "Auren Transform",
    kind: "Implementación",
    summary:
      "Ejecución del plan por incrementos, con acompañamiento a los equipos que van a usar la solución.",
    lede: "Llevamos el plan a producción por fases. Cada incremento se entrega funcionando, se mide contra lo acordado y se ajusta con retroalimentación de quienes lo usan todos los días.",
    body: [
      "La mitad del trabajo es técnica; la otra mitad es adopción. Una solución que el equipo no entiende o no confía en ella es una solución que se abandona en tres meses.",
      "Por eso trabajamos junto a las personas de la operación desde el primer incremento: capacitación, documentación y ajustes sobre uso real, no sobre supuestos.",
    ],
    signals: [
      "Tiene un plan definido y necesita quién lo ejecute",
      "Intentos anteriores de implementación se quedaron a medias",
      "El equipo interno no da abasto o le falta una especialidad",
      "Necesita resultados medibles en meses, no en años",
    ],
    includes: [
      "Implementación por incrementos con entregas funcionales",
      "Integración con los sistemas que ya usa la empresa",
      "Capacitación y documentación para el equipo",
      "Medición contra las métricas acordadas en Blueprint",
      "Transferencia de conocimiento al cierre",
    ],
    outcome: [
      "La solución operando en producción, no en piloto eterno",
      "El equipo capaz de usarla y sostenerla",
      "Evidencia medida del impacto conseguido",
    ],
    keyword: "Implementación de software empresarial",
    headline: "Implementación de soluciones tecnológicas por incrementos medibles",
    steps: [
      {
        title: "Arranque del incremento",
        body: "Definimos el alcance de la primera entrega: la más pequeña que ya sirva sola en producción. Acordamos criterios de aceptación y la métrica contra la que se va a evaluar.",
      },
      {
        title: "Construcción e integración",
        body: "Desarrollo, configuración e integración con lo que la empresa ya usa: ERP, CRM, facturación electrónica, nómina o el sistema de la operación. Preferimos conectar antes que reemplazar.",
      },
      {
        title: "Prueba con usuarios reales",
        body: "El incremento se prueba con las personas que lo van a usar, en su contexto y con sus casos raros. Es donde aparecen las excepciones que ningún requerimiento escrito contempló.",
      },
      {
        title: "Adopción y capacitación",
        body: "Capacitación práctica, documentación breve y acompañamiento en las primeras semanas de uso. Una solución que el equipo no entiende o en la que no confía se abandona en tres meses.",
      },
      {
        title: "Medición y siguiente incremento",
        body: "Comparamos contra la línea base acordada. Si el número se movió, seguimos con la fase siguiente; si no se movió, lo decimos y ajustamos antes de invertir más.",
      },
    ],
    industries: [
      {
        sector: "Manufactura y agroindustria",
        body: "Digitalización de planta, control de producción, trazabilidad de lote y conexión entre lo que pasa en piso y lo que ve la gerencia.",
      },
      {
        sector: "Transporte y logística",
        body: "Preoperacionales, control documental de flota, programación y liquidación de viajes con evidencia auditable para el cumplimiento del PESV.",
      },
      {
        sector: "Servicios y comercio",
        body: "Procesos comerciales, facturación, cartera y postventa: donde el reproceso se paga en tiempo de personas calificadas haciendo trabajo de digitación.",
      },
    ],
    measures: [
      "Tiempo de ciclo del proceso, antes y después de cada incremento",
      "Horas manuales eliminadas y reprocesos evitados al mes",
      "Adopción real: porcentaje de casos que pasan por la solución nueva",
      "Estabilidad en operación: incidencias y tiempo de respuesta",
    ],
    faqs: [
      {
        q: "¿Cuánto tarda en verse el primer resultado?",
        a: "El primer incremento entra a producción típicamente entre la semana seis y la diez. No trabajamos con entregas únicas al final del proyecto: si algo va a salir mal, preferimos descubrirlo con un alcance pequeño y barato.",
      },
      {
        q: "¿Trabajan con los sistemas que ya tenemos?",
        a: "Sí, y es lo primero que evaluamos. Reemplazar un sistema que funciona rara vez se justifica; conectar bien lo que ya existe suele costar una fracción y romper mucho menos la operación.",
      },
      {
        q: "¿Qué pasa con el equipo interno durante la implementación?",
        a: "Trabaja con nosotros, no debajo de nosotros. Definimos desde el arranque qué partes asume su equipo para que al cierre puedan sostener y evolucionar la solución sin depender de un contrato de soporte permanente.",
      },
      {
        q: "¿Cómo manejan los cambios de alcance a mitad de camino?",
        a: "Con incrementos cortos el cambio entra en la siguiente entrega en vez de renegociar todo el proyecto. Lo que sí exigimos es que cada cambio diga a qué métrica responde; si no responde a ninguna, normalmente no vale la pena.",
      },
      {
        q: "¿Y si el resultado no aparece?",
        a: "Lo decimos con los datos en la mano y revisamos la causa: puede ser el diseño, la adopción o que la métrica elegida no era la correcta. Es preferible parar en la fase dos que sostener por inercia un proyecto que no rinde.",
      },
    ],
    deliverable: "Solución en producción",
    duration: "Por fases, desde 6 semanas",
    next: "auren-care",
  },
  {
    slug: "auren-data",
    name: "Auren Data",
    kind: "Datos",
    summary:
      "Integración y modelado de la información dispersa en una capa confiable de consulta y análisis.",
    lede: "Antes de analizar hay que poder confiar. Unificamos la información que hoy vive repartida entre el ERP, el CRM, hojas de cálculo y correos, y la convertimos en una base sobre la que sí se puede decidir.",
    body: [
      "El síntoma habitual es conocido: dos áreas presentan cifras distintas del mismo mes y la reunión se va en discutir cuál está bien. Eso no es un problema de tableros, es un problema de modelo.",
      "Definimos de dónde sale cada cifra, cómo se calcula y quién responde por ella. Los tableros vienen después, y entonces sí sirven para tomar decisiones.",
    ],
    signals: [
      "Cada área reporta números distintos para lo mismo",
      "Consolidar un informe toma días de trabajo manual",
      "La información existe, pero nadie la puede consultar a tiempo",
      "Quiere aplicar IA y primero necesita datos ordenados",
    ],
    includes: [
      "Inventario de fuentes y evaluación de calidad del dato",
      "Integración de sistemas y consolidación",
      "Modelo de datos con definiciones acordadas por área",
      "Tableros de gerencia sobre los indicadores que importan",
      "Documentación de linaje: de dónde sale cada cifra",
    ],
    outcome: [
      "Una sola versión de la verdad, acordada entre áreas",
      "Informes que se generan solos en vez de armarse a mano",
      "La base técnica que cualquier proyecto de IA necesita",
    ],
    keyword: "Integración de datos y tableros de gestión",
    headline: "Integración de datos, indicadores y tableros para decidir con cifras",
    steps: [
      {
        title: "Inventario de fuentes",
        body: "Dónde vive hoy la información: ERP, CRM, facturación, hojas de cálculo, formularios y correos. Evaluamos calidad y confiabilidad de cada fuente antes de conectar nada.",
      },
      {
        title: "Acuerdo de definiciones",
        body: "Qué cuenta como venta, cuándo se considera cerrada, qué entra en costo. La mayoría de las discrepancias entre áreas no son errores de sistema: son definiciones distintas del mismo indicador.",
      },
      {
        title: "Integración y consolidación",
        body: "Conectamos las fuentes y construimos el modelo: una capa donde cada cifra tiene un origen rastreable y una regla de cálculo escrita, no una fórmula escondida en una celda.",
      },
      {
        title: "Tableros de gerencia",
        body: "Los indicadores que la dirección efectivamente usa para decidir, no cuarenta gráficas que nadie abre. Cada tablero responde una pregunta concreta del negocio.",
      },
      {
        title: "Linaje y mantenimiento",
        body: "Documentamos de dónde sale cada número y quién responde por él, y dejamos alertas cuando una fuente deja de actualizarse. Un tablero silenciosamente desactualizado es peor que no tenerlo.",
      },
    ],
    industries: [
      {
        sector: "Manufactura y agroindustria",
        body: "Costo real por lote, merma, rendimiento por línea y cumplimiento del plan de producción con cifras que cuadran con contabilidad.",
      },
      {
        sector: "Comercio y distribución",
        body: "Rotación, margen por producto y cliente, cartera y comportamiento de compra. Consolidación de puntos de venta o sedes que hoy reportan por separado.",
      },
      {
        sector: "Empresas que quieren aplicar inteligencia artificial",
        body: "Ningún modelo compensa datos inconsistentes. Esta es la base técnica que hace viable —o descarta a tiempo— cualquier proyecto de IA.",
      },
    ],
    measures: [
      "Días de trabajo manual eliminados en la consolidación de informes",
      "Diferencia entre áreas para un mismo indicador, antes y después",
      "Frescura del dato: cuánto se demora un hecho en llegar al tablero",
      "Indicadores con linaje documentado y responsable asignado",
    ],
    faqs: [
      {
        q: "¿Necesito comprar una herramienta de BI?",
        a: "No necesariamente. Evaluamos qué alcanza con lo que ya tiene, incluidas opciones sin costo de licencia. La herramienta es la parte barata del problema; el modelo y las definiciones acordadas son la parte que realmente cuesta y la que hace que los tableros se usen.",
      },
      {
        q: "Mis datos están en Excel. ¿Sirve igual?",
        a: "Sirve, y es el punto de partida más común. Las hojas de cálculo suelen contener la lógica real del negocio, la que nunca llegó al sistema. Ese conocimiento se rescata y se formaliza, no se descarta.",
      },
      {
        q: "¿Por qué cada área reporta un número distinto?",
        a: "Casi siempre por definiciones no acordadas y por cortes de fecha diferentes, no por fallas del software. Por eso el acuerdo de definiciones es un paso del trabajo y no un anexo: sin él, el tablero nuevo simplemente agrega una versión más a la discusión.",
      },
      {
        q: "¿Cuánto tarda tener el primer tablero funcionando?",
        a: "El alcance completo va de cuatro a diez semanas según cuántas fuentes haya. El primer tablero útil —un dominio, un puñado de indicadores— suele estar operando bastante antes, y es el que valida que las definiciones quedaron bien.",
      },
      {
        q: "¿Quién mantiene esto después?",
        a: "Su equipo, si así lo prefiere: dejamos el modelo documentado y la lógica visible. Cuando no hay perfil interno disponible, Auren Care cubre el monitoreo y la evolución con revisión periódica.",
      },
    ],
    deliverable: "Modelo de datos y tableros",
    duration: "4 a 10 semanas",
    next: "auren-flow",
  },
  {
    slug: "auren-flow",
    name: "Auren Flow",
    kind: "Automatización",
    summary:
      "Flujos automatizados entre sistemas y áreas, con trazabilidad y control de excepciones.",
    lede: "Todo lo que hoy se mueve por correo, por WhatsApp o copiando de un sistema a otro es tiempo pagado que no agrega valor. Flow elimina esos traspasos manuales y deja el rastro de lo que pasó.",
    body: [
      "Automatizar no es poner un robot encima de un proceso malo: primero simplificamos el flujo, después lo automatizamos. Muchas veces el mayor ahorro está en los pasos que se eliminan, no en los que se aceleran.",
      "Cada flujo queda con manejo explícito de excepciones. Cuando algo se sale de lo previsto, alguien se entera; no se pierde en silencio.",
    ],
    signals: [
      "Hay personas dedicadas a copiar datos entre sistemas",
      "Las aprobaciones se persiguen por correo o por chat",
      "Nadie sabe en qué punto va una solicitud sin preguntar",
      "Los errores se detectan tarde y cuestan reprocesos",
    ],
    includes: [
      "Rediseño del flujo antes de automatizarlo",
      "Automatización entre los sistemas existentes",
      "Reglas de excepción y alertas a los responsables",
      "Trazabilidad completa de cada caso",
      "Medición del tiempo y los reprocesos ahorrados",
    ],
    outcome: [
      "Horas del equipo devueltas a trabajo que sí agrega valor",
      "Visibilidad de en qué punto está cada solicitud",
      "Menos errores, y los que ocurren se detectan a tiempo",
    ],
    keyword: "Automatización de procesos empresariales",
    headline: "Automatización de procesos y flujos de trabajo entre áreas y sistemas",
    steps: [
      {
        title: "Mapa del flujo real",
        body: "Seguimos una solicitud de punta a punta: quién la crea, por cuántas manos pasa, dónde espera y dónde se pierde. El flujo documentado y el flujo real casi nunca coinciden.",
      },
      {
        title: "Simplificación antes de automatizar",
        body: "Eliminamos pasos, aprobaciones duplicadas y datos que se piden dos veces. El mayor ahorro suele estar en lo que se deja de hacer, no en hacerlo más rápido.",
      },
      {
        title: "Automatización entre sistemas",
        body: "Conectamos las herramientas que ya usa para que los datos viajen solos: sin copiar y pegar, sin exportar a Excel para volver a subir, sin reenviar correos con adjuntos.",
      },
      {
        title: "Reglas de excepción y alertas",
        body: "Definimos qué pasa cuando algo se sale de lo previsto y a quién se le avisa. Una automatización sin manejo de excepciones falla en silencio, que es la peor forma de fallar.",
      },
      {
        title: "Trazabilidad y medición",
        body: "Cada caso queda con su rastro: quién hizo qué y cuándo. Con eso se responde «¿en qué va mi solicitud?» sin llamar a nadie, y se mide el tiempo que realmente se ahorró.",
      },
    ],
    industries: [
      {
        sector: "Transporte y logística",
        body: "Inspecciones preoperacionales, control de vencimientos de SOAT y tecnomecánica, novedades de ruta y liquidación de viajes con evidencia para auditoría.",
      },
      {
        sector: "Entidades públicas",
        body: "Radicación y control de términos de PQRSD en días hábiles, ruteo por dependencia y alertas antes del vencimiento legal, no después.",
      },
      {
        sector: "Administración y finanzas",
        body: "Órdenes de compra, aprobaciones, causación de facturas y conciliaciones: los procesos donde el correo hace de sistema y nadie sabe en qué punto va cada caso.",
      },
    ],
    measures: [
      "Horas/mes de digitación y traspaso manual eliminadas",
      "Tiempo de ciclo de la solicitud, de radicación a cierre",
      "Porcentaje de casos que se resuelven sin intervención manual",
      "Excepciones detectadas a tiempo frente a hallazgos tardíos",
    ],
    faqs: [
      {
        q: "¿Qué procesos conviene automatizar primero?",
        a: "Los repetitivos, de reglas estables y volumen alto: los que hoy consumen horas de alguien copiando información entre sistemas. Los procesos que cambian cada mes o que dependen de criterio experto se estabilizan antes de automatizarlos.",
      },
      {
        q: "¿Automatizar significa reemplazar personas?",
        a: "En la práctica significa devolverle horas al equipo. Lo que se automatiza es la digitación, el seguimiento y el traspaso entre áreas; lo que queda para las personas es lo que exige criterio, negociación o trato con el cliente.",
      },
      {
        q: "¿Sirve si mis sistemas son viejos y no tienen integración?",
        a: "Casi siempre hay camino: exportaciones programadas, bases intermedias o automatización sobre la interfaz existente. Cuando de verdad no lo hay, lo decimos antes de cobrar el descubrimiento.",
      },
      {
        q: "¿Cuánto cuesta mantener una automatización?",
        a: "Poco si está bien construida, pero nunca cero: los procesos cambian y las integraciones se rompen cuando un proveedor actualiza su sistema. Lo dejamos monitoreado y con alertas, y ese costo se dice de frente desde el inicio.",
      },
      {
        q: "¿En cuánto tiempo se automatiza un flujo?",
        a: "Entre tres y ocho semanas por flujo, incluida la etapa de rediseño. Empezamos por uno solo: sirve para validar el enfoque con su gente antes de comprometer más presupuesto.",
      },
    ],
    deliverable: "Procesos automatizados",
    duration: "3 a 8 semanas por flujo",
    next: "auren-transform",
  },
  {
    slug: "auren-vision",
    name: "Auren Vision",
    kind: "Visión artificial",
    summary:
      "Analítica sobre imagen y video para inspección, conteo y control en entornos operativos.",
    lede: "En planta y en bodega hay información que nadie está capturando y que las cámaras ya están viendo. Vision la convierte en datos: conteo, inspección de calidad, cumplimiento y seguridad.",
    body: [
      "Empezamos con la infraestructura que ya existe. En la mayoría de los casos no hace falta reemplazar cámaras: hace falta procesar bien lo que graban.",
      "Definimos primero qué decisión va a cambiar con esa información. Un sistema que detecta defectos pero no avisa a nadie a tiempo no sirve de nada.",
    ],
    signals: [
      "La inspección de calidad depende del criterio de cada turno",
      "El conteo o el inventario se hace manual y con diferencias",
      "Necesita evidencia de cumplimiento en la operación",
      "Ya tiene cámaras instaladas y solo se usan para grabar",
    ],
    includes: [
      "Evaluación de viabilidad con imágenes reales de su operación",
      "Prueba de concepto medida antes de comprometer la inversión",
      "Modelo de visión ajustado a su producto y condiciones",
      "Integración con la operación: alertas, tableros o paradas",
      "Plan de mantenimiento del modelo en el tiempo",
    ],
    outcome: [
      "Criterio de inspección constante entre turnos y personas",
      "Datos de operación que antes no existían",
      "Detección temprana en vez de hallazgo tardío",
    ],
    keyword: "Visión artificial para inspección y control",
    headline: "Visión artificial e inspección automatizada con las cámaras que ya tiene",
    steps: [
      {
        title: "Definición de la decisión",
        body: "Antes de mirar imágenes definimos qué decisión va a cambiar: parar una línea, rechazar un lote, avisar a un supervisor. Un sistema que detecta y no le avisa a nadie no cambia nada.",
      },
      {
        title: "Viabilidad con imágenes reales",
        body: "Evaluamos con material de su operación, no con ejemplos de laboratorio. Iluminación, ángulo, velocidad de línea y variabilidad del producto deciden si el caso es viable antes de invertir.",
      },
      {
        title: "Prueba de concepto medida",
        body: "Construimos un piloto acotado y medimos su precisión contra la inspección humana. La comparación es explícita: qué detecta, qué se le escapa y en qué condiciones falla.",
      },
      {
        title: "Integración con la operación",
        body: "Conectamos el resultado con lo que ya usa: alerta al supervisor, registro en el sistema de calidad, tablero de turno o parada de línea. Aquí es donde el piloto se vuelve herramienta.",
      },
      {
        title: "Mantenimiento del modelo",
        body: "Los productos cambian, las cámaras se mueven y la luz de la planta no es la misma en enero que en julio. Dejamos plan de recalibración y monitoreo de deriva del modelo.",
      },
    ],
    industries: [
      {
        sector: "Manufactura y alimentos",
        body: "Inspección de calidad, presencia y posición de componentes, conteo en línea, verificación de etiquetado y detección de defectos superficiales.",
      },
      {
        sector: "Bodegas y logística",
        body: "Lectura de placas en portería, conteo de estibas, verificación de cargue y evidencia visual asociada al despacho.",
      },
      {
        sector: "Seguridad y cumplimiento en planta",
        body: "Uso de elementos de protección, ocupación de zonas restringidas y lectura automática de medidores análogos que hoy alguien anota en una planilla.",
      },
    ],
    measures: [
      "Precisión del modelo contra inspección humana, medida en su operación",
      "Cobertura: porcentaje de piezas o eventos inspeccionados frente al muestreo actual",
      "Tiempo entre el defecto y el aviso a quien puede corregirlo",
      "Variabilidad del criterio entre turnos, antes y después",
    ],
    faqs: [
      {
        q: "¿Necesito comprar cámaras nuevas?",
        a: "En la mayoría de los casos no. Se empieza evaluando lo instalado; a veces basta con reubicar una cámara o mejorar la iluminación, que es mucho más barato que renovar el parque. Si hace falta hardware, lo decimos con la evaluación de viabilidad en la mano.",
      },
      {
        q: "¿Qué tan preciso es comparado con una persona?",
        a: "Depende del caso, y por eso el piloto se mide antes de comprometer inversión. En tareas repetitivas y de criterio estable suele superar a la inspección humana sostenida en el tiempo, sobre todo al final del turno; en tareas de criterio complejo funciona mejor como apoyo que como reemplazo.",
      },
      {
        q: "¿Las imágenes salen de mi empresa?",
        a: "Se define desde el diseño. Hay casos que corren enteramente en su red, sin que el video salga de la planta. Cuando se usa nube, se acuerda explícitamente qué se envía, cuánto se retiene y quién accede.",
      },
      {
        q: "¿Qué pasa si cambia el producto o la línea?",
        a: "El modelo se reentrena con material del producto nuevo. Ese trabajo se estima desde el inicio: un sistema de visión no es una compra única, es una capacidad que se mantiene.",
      },
      {
        q: "¿Cuánto tarda saber si mi caso es viable?",
        a: "La evaluación de viabilidad toma días, no meses, porque se hace con imágenes que usted ya tiene. La prueba de concepto medida va de tres a seis semanas, y de ahí sale la decisión de escalar o no.",
      },
    ],
    deliverable: "Sistema de visión en operación",
    duration: "Prueba de concepto en 3 a 6 semanas",
    next: "auren-transform",
  },
  {
    slug: "auren-studio",
    name: "Auren Studio",
    kind: "Software",
    summary:
      "Desarrollo de producto interno cuando la solución correcta no existe en el mercado.",
    lede: "A veces la herramienta que su operación necesita no se vende. Studio la construye: software hecho para su proceso exacto, sin pagar por funciones que nunca va a usar ni deformar la operación para caber en un producto ajeno.",
    body: [
      "Construir a la medida no siempre es la respuesta correcta, y lo decimos cuando no lo es. Si existe una herramienta del mercado que resuelve el 90%, conviene comprarla.",
      "Cuando sí tiene sentido, entregamos software que su equipo puede mantener: código documentado, decisiones explicadas y sin dependencias que lo aten a nosotros.",
    ],
    signals: [
      "Evaluó herramientas del mercado y ninguna encaja",
      "Su ventaja competitiva está justamente en ese proceso",
      "Paga licencias por funciones que nadie usa",
      "Está adaptando la operación al software en vez de al revés",
    ],
    includes: [
      "Definición de alcance mínimo que ya sirva en producción",
      "Diseño de producto y de interfaz sobre el uso real",
      "Desarrollo, pruebas y despliegue",
      "Integración con los sistemas existentes",
      "Código, documentación y traspaso al equipo",
    ],
    outcome: [
      "Una herramienta que encaja con cómo trabaja la empresa",
      "Propiedad del código y libertad de proveedor",
      "Costo operativo previsible, sin licencias por usuario",
    ],
    keyword: "Desarrollo de software a la medida",
    headline: "Desarrollo de software a la medida para procesos que no caben en un producto",
    steps: [
      {
        title: "Validación de la decisión",
        body: "Primero revisamos el mercado. Si existe una herramienta que resuelve el noventa por ciento, conviene comprarla y se lo decimos, aunque eso signifique un proyecto más pequeño para nosotros.",
      },
      {
        title: "Alcance mínimo útil",
        body: "Definimos la versión más pequeña que ya sirva en producción. Toda función que no entra en esa primera versión queda anotada, priorizada y visible, no descartada.",
      },
      {
        title: "Diseño sobre el uso real",
        body: "Diseñamos las pantallas con las personas que van a trabajar en ellas ocho horas al día. Un formulario mal ordenado se paga en errores de digitación durante años.",
      },
      {
        title: "Desarrollo, pruebas y despliegue",
        body: "Construcción por incrementos, pruebas automatizadas en la lógica que importa e integración con los sistemas existentes. Se despliega temprano y se corrige sobre uso real.",
      },
      {
        title: "Traspaso al equipo",
        body: "Código, documentación y decisiones explicadas. El objetivo es que otro equipo pueda tomar el proyecto sin arqueología: la propiedad del software es suya, incluida la libertad de cambiar de proveedor.",
      },
    ],
    industries: [
      {
        sector: "Operaciones con proceso propio",
        body: "Cuando el proceso es justamente la ventaja competitiva y ningún producto del mercado lo refleja sin deformarlo.",
      },
      {
        sector: "Portales de cliente y proveedor",
        body: "Radicación, seguimiento y autogestión: quitar del correo y del teléfono lo que el cliente puede resolver solo, con trazabilidad.",
      },
      {
        sector: "Herramientas internas de operación",
        body: "Programación, control de piso, liquidaciones y aplicaciones móviles para trabajo en campo, incluida operación sin conexión.",
      },
    ],
    measures: [
      "Adopción: porcentaje de la operación que ya pasa por la herramienta",
      "Errores de captura y reprocesos frente al proceso anterior",
      "Costo operativo total contra la alternativa de licencias por usuario",
      "Tiempo de respuesta a un cambio solicitado por la operación",
    ],
    faqs: [
      {
        q: "¿Cuándo conviene software a medida y cuándo comprar?",
        a: "Comprar gana cuando el proceso es estándar y hay producto maduro: contabilidad, nómina, facturación electrónica. La medida gana cuando el proceso es su diferencial, cuando está pagando licencias por funciones que nadie usa, o cuando lleva años deformando la operación para caber en una herramienta ajena.",
      },
      {
        q: "¿De quién es el código?",
        a: "Suyo. Se entrega con documentación y sin dependencias que lo aten a nosotros. No trabajamos con esquemas donde el cliente pierde la herramienta si termina el contrato.",
      },
      {
        q: "¿Cuánto cuesta mantener software propio?",
        a: "Existe un costo real de infraestructura y evolución, y se estima desde el principio en vez de aparecer después. En operaciones con muchos usuarios suele quedar por debajo de las licencias por puesto; en equipos pequeños hay que hacer el número con cuidado, y a veces da que conviene comprar.",
      },
      {
        q: "¿Cuánto tarda la primera versión?",
        a: "De ocho a catorce semanas para una primera versión que ya opera con usuarios reales. Si el alcance planteado no cabe ahí, lo partimos: preferimos algo pequeño funcionando a algo grande en construcción indefinida.",
      },
      {
        q: "¿Puede integrarse con mi ERP?",
        a: "Es lo habitual, y se evalúa antes de comprometer alcance. La integración se diseña para que el ERP siga siendo la fuente de verdad de lo que le corresponde: la herramienta a medida cubre el proceso que el ERP no modela bien, no lo duplica.",
      },
    ],
    deliverable: "Software a medida",
    duration: "Primera versión útil en 8 a 14 semanas",
    next: "auren-care",
  },
  {
    slug: "auren-care",
    name: "Auren Care",
    kind: "Continuidad",
    summary:
      "Soporte, evolución y medición continua de lo implementado. La transformación no termina en la entrega.",
    lede: "Los procesos cambian, los datos se degradan y los modelos pierden precisión. Care mantiene vivo lo que se implementó y lo va ajustando conforme la empresa cambia.",
    body: [
      "El punto no es dejarlo dependiendo de un proveedor. Es que alguien responda cuando algo falla y que las mejoras no se queden en la lista de deseos del área de sistemas.",
      "Cada trimestre revisamos qué está rindiendo, qué se desvió de la métrica acordada y qué conviene ajustar o retirar.",
    ],
    signals: [
      "Ya implementó algo y no tiene quién lo sostenga",
      "El equipo interno apaga incendios y no alcanza a mejorar",
      "Quiere saber si lo invertido sigue rindiendo",
      "Los modelos o automatizaciones se degradaron con el tiempo",
    ],
    includes: [
      "Soporte con tiempos de respuesta acordados",
      "Monitoreo de las automatizaciones y los modelos en operación",
      "Mejoras incrementales priorizadas con la dirección",
      "Revisión trimestral de impacto contra lo acordado",
    ],
    outcome: [
      "Continuidad operativa sin depender de héroes internos",
      "Evidencia periódica de que la inversión sigue rindiendo",
      "Un camino ordenado para lo que sigue",
    ],
    keyword: "Soporte y evolución de soluciones",
    headline: "Soporte, monitoreo y evolución continua de lo implementado",
    steps: [
      {
        title: "Línea base de operación",
        body: "Documentamos qué está corriendo, de qué depende, qué se rompe cuando falla cada pieza y a quién hay que avisar. Sin ese mapa el soporte es adivinanza costosa.",
      },
      {
        title: "Monitoreo y soporte",
        body: "Vigilamos automatizaciones, integraciones y modelos en operación, con tiempos de respuesta acordados. Preferimos enterarnos por una alerta y no por una llamada de la operación.",
      },
      {
        title: "Mejoras priorizadas",
        body: "Las solicitudes del día a día se ordenan con la dirección por impacto, no por antigüedad en la lista. Lo que no aporta se retira: dejar funciones muertas también cuesta.",
      },
      {
        title: "Revisión trimestral de impacto",
        body: "Cada trimestre contrastamos contra la métrica acordada: qué sigue rindiendo, qué se desvió y qué conviene ajustar. Si algo dejó de aportar, la recomendación es apagarlo.",
      },
    ],
    industries: [
      {
        sector: "Empresas sin área de sistemas propia",
        body: "Cuando lo implementado quedó dependiendo de una sola persona que además tiene otras cuatro funciones.",
      },
      {
        sector: "Equipos internos absorbidos por soporte",
        body: "Áreas que apagan incendios y nunca alcanzan a mejorar. Care asume la operación de lo entregado para liberar esa capacidad.",
      },
      {
        sector: "Modelos y automatizaciones en producción",
        body: "Lo que aprende de datos se degrada solo. Sin monitoreo, la pérdida de precisión aparece como desconfianza del usuario mucho antes que como reporte.",
      },
    ],
    measures: [
      "Disponibilidad de las automatizaciones e integraciones críticas",
      "Tiempo de respuesta y de resolución frente a lo acordado",
      "Deriva de los modelos en operación respecto de su línea base",
      "Impacto sostenido contra la métrica original, revisado cada trimestre",
    ],
    faqs: [
      {
        q: "¿Puedo contratar soporte de algo que implementó otro proveedor?",
        a: "Sí, previa revisión técnica. Necesitamos entender qué está corriendo y en qué estado está antes de comprometer tiempos de respuesta: asumir la operación de algo que no conocemos sería prometer lo que no podemos sostener.",
      },
      {
        q: "¿Esto me deja amarrado a ustedes?",
        a: "No es el objetivo. La documentación y el conocimiento se mantienen actualizados justamente para que pueda llevarse la operación a un equipo interno cuando lo decida. Care existe para cubrir un vacío, no para crear una dependencia.",
      },
      {
        q: "¿Qué incluye exactamente el servicio mensual?",
        a: "Monitoreo, soporte con tiempos acordados, mejoras incrementales dentro de un cupo definido y la revisión trimestral de impacto. Lo que exceda ese cupo se cotiza aparte y se dice antes, no en la factura.",
      },
      {
        q: "¿Por qué se degrada un modelo o una automatización?",
        a: "Porque el mundo alrededor cambia: un proveedor actualiza su sistema, la operación empieza a registrar distinto, el producto cambia de presentación. Nada de eso avisa; por eso se monitorea.",
      },
    ],
    deliverable: "Servicio gestionado",
    duration: "Mensual, con revisión trimestral",
    next: "auren-insight",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
/**
 * Nosotros.
 * PENDIENTE: nombres y perfiles de los dos socios fundadores.
 */
export const about = {
  eyebrow: "Nosotros",
  title: "Nacimos viendo el mismo problema una y otra vez.",
  /** Bajada del H1 de /nosotros: quiénes somos en términos de búsqueda. */
  headline:
    "Consultora de transformación empresarial, automatización e inteligencia artificial con base en Manizales, Caldas.",
  lede: "Auren Advisory nació en Manizales, en 2026, de la sociedad entre dos emprendedores que llevaban años trabajando con empresas de la región y encontrándose siempre con la misma escena: equipos capaces dedicando la mitad del día a tareas tediosas que ningún negocio debería seguir haciendo a mano.",

  origin: [
    "Facturas que se digitan dos veces. Inventarios que se cuadran a las once de la noche. Reportes que existen porque alguien los arma cada lunes copiando celdas. No eran empresas mal gestionadas: eran empresas buenas cargando procesos que nadie había vuelto a revisar en años.",
    "Al mismo tiempo veíamos la reacción contraria y igual de costosa: comprar una herramienta cara para un problema que nadie había diagnosticado, y dejarla sin usar a los seis meses. Entre no hacer nada y comprar por moda faltaba alguien que primero mirara.",
    "Auren existe para ocupar ese lugar. Entramos a ver cómo funciona realmente la empresa, entendemos qué está costando esa fricción y solo entonces decidimos qué tecnología —o qué simplificación sin tecnología— tiene sentido.",
  ],

  /** El enfoque: tres tipos de conocimiento que rara vez se combinan. */
  disciplines: [
    {
      index: "01",
      title: "Técnico",
      body: "Ingeniería de software, datos, automatización y modelos. Sabemos qué se puede construir, qué cuesta sostenerlo y cuándo la respuesta correcta es no construir nada.",
    },
    {
      index: "02",
      title: "Práctico",
      body: "Conocimiento de operación: cómo se mueve una orden, dónde se traba una aprobación, por qué el turno de la noche hace las cosas distinto. Sin eso, cualquier solución se diseña en el vacío.",
    },
    {
      index: "03",
      title: "Empírico",
      body: "Lo que aprendimos en implementaciones reales, incluidas las que no salieron como esperábamos. Medimos antes y después porque la intuición sola se equivoca con frecuencia.",
    },
  ],

  facts: [
    { k: "Fundada", v: "2026" },
    { k: "Origen", v: "Manizales, Colombia" },
    { k: "Estructura", v: "Dos socios fundadores" },
    { k: "Cobertura", v: "Presencial en el Eje Cafetero, remoto en el resto del país" },
  ],

  /** Decir qué no hacemos filtra mejor que decir qué hacemos. */
  boundaries: [
    "No vendemos licencias ni recibimos comisión de ningún proveedor de software. Si recomendamos una herramienta es porque encaja.",
    "No empezamos por la tecnología. Si el diagnóstico dice que el problema se resuelve cambiando un procedimiento, eso es lo que le vamos a decir.",
    "No dejamos cajas negras. El equipo se queda con la documentación, el conocimiento y, cuando aplica, el código.",
  ],

  /**
   * Foto de los socios. Es la pieza de confianza que más falta hace en una
   * firma nueva: una consultora sin cara es una consultora sin referencias.
   * Especificaciones en IMAGENES.md; mientras no exista, no se renderiza.
   */
  photo: undefined as Figure | undefined,

  region: {
    title: "Por qué Manizales importa en esto",
    body: "El Eje Cafetero concentra manufactura, agroindustria y compañías de servicios con operaciones complejas y equipos pequeños: exactamente el perfil donde una automatización bien elegida cambia el día a día de una empresa entera. Trabajamos en sitio con nuestros clientes de la región y de forma remota con el resto del país.",
  },
} as const;
export type Principle = { title: string; body: string };

export const principles: readonly Principle[] = [
  {
    title: "El diagnóstico va primero",
    body: "No proponemos tecnología antes de entender el proceso. Si el problema no la necesita, lo decimos.",
  },
  {
    title: "El impacto se mide",
    body: "Cada fase se acuerda con una métrica. Si no se puede medir, no se puede defender ante la dirección.",
  },
  {
    title: "El equipo se queda con la solución",
    body: "Documentamos y transferimos. El objetivo no es que dependan de nosotros indefinidamente.",
  },
];

export const contact = {
  title: "Empecemos por ver.",
  lede: "Una conversación de diagnóstico, sin compromiso: entendemos su operación y le decimos con franqueza dónde hay oportunidad real.",
} as const;

/**
 * Sectores donde trabajamos.
 *
 * Existe por dos razones que apuntan al mismo lado: quien busca «automatización
 * para transporte» necesita leer su propio vocabulario antes de creer que
 * entendemos su operación, y el buscador necesita ver el sitio asociado a esos
 * términos. `services` apunta a slugs de `services`.
 */
export type Sector = {
  id: string;
  title: string;
  /** El dolor típico del sector, en su lenguaje. */
  body: string;
  /** Procesos concretos donde entramos. */
  cases: readonly string[];
  services: readonly string[];
};

export const sectors: readonly Sector[] = [
  {
    id: "manufactura",
    title: "Manufactura y agroindustria",
    body: "Plantas donde el ERP se usa a medias, la programación real vive en una hoja de cálculo y el control de calidad depende del criterio de cada turno. El costo se esconde en la merma, el reproceso y las horas de alguien cuadrando cifras de noche.",
    cases: [
      "Control de producción y trazabilidad de lote",
      "Inspección de calidad por visión artificial",
      "Costo real por lote y por línea",
      "Mantenimiento y paradas no programadas",
    ],
    services: ["auren-insight", "auren-vision", "auren-data"],
  },
  {
    id: "transporte",
    title: "Transporte y logística",
    body: "Operaciones con alta exigencia normativa sostenidas en papel: preoperacionales que nadie lee, vencimientos de SOAT y tecnomecánica que se descubren tarde y liquidaciones que se arman a mano viaje por viaje.",
    cases: [
      "Inspección preoperacional digital con evidencia",
      "Control documental de flota y alertas de vencimiento",
      "Cumplimiento del PESV con rastro auditable",
      "Liquidación de viajes y control de costos",
    ],
    services: ["auren-flow", "auren-studio", "auren-data"],
  },
  {
    id: "servicios",
    title: "Servicios, salud y comercio",
    body: "Empresas donde el margen se pierde en los traspasos: información que se pide dos veces, aprobaciones que se persiguen por chat y cartera que se descubre vencida cuando ya no hay con quién hablar.",
    cases: [
      "Proceso comercial y CRM con datos limpios",
      "Agendamiento, facturación y cartera",
      "Portales de autogestión para clientes",
      "Postventa y trazabilidad de casos",
    ],
    services: ["auren-flow", "auren-data", "auren-studio"],
  },
  {
    id: "publico",
    title: "Entidades públicas",
    body: "Donde la fricción no cuesta solo tiempo: un término vencido tiene consecuencia disciplinaria. El control suele estar en un Excel que una sola persona entiende y que nadie revisa los viernes.",
    cases: [
      "PQRSD con control de términos en días hábiles",
      "Ruteo por dependencia y alertas antes del vencimiento",
      "Tableros de cumplimiento para control interno",
      "Digitalización de expedientes y radicación",
    ],
    services: ["auren-flow", "auren-insight", "auren-studio"],
  },
];

/**
 * Preguntas frecuentes de la home.
 *
 * Son las preguntas que un gerente escribe en Google antes de contactar a
 * nadie. Se responden aquí completas —no como anzuelo— y alimentan el
 * JSON-LD de FAQPage. Las de cada servicio viven en `services[].faqs`.
 */
export const homeFaqs: readonly Faq[] = [
  {
    q: "¿Qué hace exactamente una firma de transformación empresarial?",
    a: "Analiza cómo opera realmente una empresa, identifica dónde se pierde tiempo, dinero y control, y convierte eso en un plan de cambio ejecutable. En nuestro caso incluye implementar lo que se decidió —automatización, datos, software a medida o visión artificial— y medir si funcionó. No es solo un informe con recomendaciones.",
  },
  {
    q: "¿Cómo sé si mi empresa necesita automatizar procesos?",
    a: "Las señales son concretas: personas dedicadas a copiar datos entre sistemas, aprobaciones que se persiguen por correo o WhatsApp, informes que se arman a mano cada semana, y nadie capaz de decir en qué punto va una solicitud sin preguntar. Si reconoce tres o más, hay caso. La Radiografía Auren de esta página se lo estima en diez minutos y sin registro.",
  },
  {
    q: "¿Cuánto cuesta un proyecto de transformación digital?",
    a: "Depende del alcance, y por eso empezamos por el diagnóstico: entre dos y cuatro semanas para saber con evidencia dónde está la oportunidad y cuánto vale resolverla. Con esa cifra en la mano la conversación de presupuesto deja de ser una apuesta. Nunca cotizamos una implementación sin haber visto la operación.",
  },
  {
    q: "¿Trabajan con pymes o solo con empresas grandes?",
    a: "Trabajamos con empresas medianas y pymes con operación compleja, que es donde una automatización bien elegida cambia el día completo de un equipo. Desde unas quince personas ya aparecen los traspasos entre áreas que justifican el trabajo. El tamaño importa menos que la complejidad del proceso.",
  },
  {
    q: "¿Necesito inteligencia artificial en mi empresa?",
    a: "Probablemente no todavía, y decirlo es parte de nuestro trabajo. La IA rinde sobre datos ordenados y procesos estables; aplicada sobre información inconsistente produce respuestas convincentes y equivocadas. Primero se ordena el dato y se simplifica el proceso. Cuando el caso lo justifica, la aplicamos y lo medimos.",
  },
  {
    q: "¿Atienden fuera de Manizales y del Eje Cafetero?",
    a: "Sí. Trabajamos presencialmente en Manizales, Pereira, Armenia y el Eje Cafetero, y de forma remota con el resto de Colombia. El recorrido en sitio del diagnóstico se hace presencial siempre: hay cosas de una operación que no se ven por videollamada.",
  },
];
