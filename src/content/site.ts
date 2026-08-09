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
  domain: "aurenadvisory.com",
  email: "hola@aurenadvisory.com",
  /** Solo dígitos, con indicativo de país. Formato que exige wa.me. */
  whatsapp: "573206548168",
  whatsappDisplay: "+57 320 654 8168",
  description:
    "Firma de transformación empresarial. Observamos cómo funciona su empresa, entendemos sus necesidades y después decidimos qué tecnología tiene sentido.",
} as const;

export const nav = [
  { label: "Enfoque", href: "/enfoque" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
] as const;

export const hero = {
  eyebrow: "Transformación empresarial",
  title: ["Ver.", "Entender.", "Transformar."],
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

export type Service = {
  slug: string;
  name: string;
  /** Etapa dentro del sistema Auren. Se muestra como etiqueta. */
  kind: string;
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
