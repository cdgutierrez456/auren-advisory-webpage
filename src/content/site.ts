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
  description:
    "Firma de transformación empresarial. Observamos cómo funciona su empresa, entendemos sus necesidades y después decidimos qué tecnología tiene sentido.",
} as const;

export const nav = [
  { label: "Enfoque", href: "/#enfoque" },
  { label: "Capacidades", href: "/#capacidades" },
  { label: "Productos", href: "/#productos" },
  { label: "Marca", href: "/marca" },
] as const;

export const hero = {
  eyebrow: "Transformación empresarial",
  title: ["Ver.", "Entender.", "Transformar."],
  lede: "Ayudamos a las organizaciones a identificar oportunidades reales y convertirlas en soluciones a medida. Primero observamos cómo funciona la empresa. La tecnología viene después.",
  primary: { label: "Agendar diagnóstico", href: "/#contacto" },
  secondary: { label: "Cómo trabajamos", href: "/#enfoque" },
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
  claim: string;
  detail: string;
  points: readonly string[];
};

export const phases: readonly Phase[] = [
  {
    index: "01",
    title: "Ver",
    claim: "Observamos la realidad de la empresa.",
    detail:
      "Personas, procesos, herramientas, datos y puntos de fricción. Sin supuestos heredados y sin agenda de producto.",
    points: [
      "Mapa de procesos y flujos reales",
      "Inventario de sistemas y datos",
      "Entrevistas con operación y dirección",
      "Registro de fricciones y reprocesos",
    ],
  },
  {
    index: "02",
    title: "Entender",
    claim: "Interpretamos causas, no síntomas.",
    detail:
      "Cuantificamos costos, riesgos y potencial de transformación para que la decisión de invertir sea una decisión informada.",
    points: [
      "Causa raíz por proceso crítico",
      "Costo de la ineficiencia, en cifras",
      "Riesgos operativos y de cumplimiento",
      "Priorización por impacto y esfuerzo",
    ],
  },
  {
    index: "03",
    title: "Transformar",
    claim: "Diseñamos, implementamos y medimos.",
    detail:
      "La solución adecuada al problema correcto, entregada por fases, con métricas acordadas antes de empezar.",
    points: [
      "Diseño de solución y arquitectura",
      "Implementación por incrementos",
      "Adopción y acompañamiento al equipo",
      "Medición de impacto post-entrega",
    ],
  },
];

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

export type Product = {
  name: string;
  kind: string;
  description: string;
  deliverable: string;
};

/**
 * Arquitectura de marca. Un solo sistema visual: todo se lee como Auren.
 * NOTA: Insight, Blueprint y Transform están confirmados en el brand brief.
 * El resto son nombres propuestos — confirmar antes de publicar.
 */
export const products: readonly Product[] = [
  {
    name: "Auren Insight",
    kind: "Diagnóstico",
    description:
      "Radiografía de la operación: dónde se pierde tiempo, dinero y control, con evidencia y cifras.",
    deliverable: "Informe Insight",
  },
  {
    name: "Auren Blueprint",
    kind: "Diseño",
    description:
      "El plan de transformación: qué se hace, en qué orden, con qué tecnología y qué se espera de cada fase.",
    deliverable: "Hoja de ruta priorizada",
  },
  {
    name: "Auren Transform",
    kind: "Implementación",
    description:
      "Ejecución del plan por incrementos, con acompañamiento a los equipos que van a usar la solución.",
    deliverable: "Solución en producción",
  },
  {
    name: "Auren Data",
    kind: "Datos",
    description:
      "Integración y modelado de la información dispersa en una capa confiable de consulta y análisis.",
    deliverable: "Modelo de datos y tableros",
  },
  {
    name: "Auren Flow",
    kind: "Automatización",
    description:
      "Flujos automatizados entre sistemas y áreas, con trazabilidad y control de excepciones.",
    deliverable: "Procesos automatizados",
  },
  {
    name: "Auren Vision",
    kind: "Visión artificial",
    description:
      "Analítica sobre imagen y video para inspección, conteo y control en entornos operativos.",
    deliverable: "Sistema de visión en planta",
  },
  {
    name: "Auren Studio",
    kind: "Software",
    description:
      "Desarrollo de producto interno cuando la solución correcta no existe en el mercado.",
    deliverable: "Software a medida",
  },
  {
    name: "Auren Care",
    kind: "Continuidad",
    description:
      "Soporte, evolución y medición continua de lo implementado. La transformación no termina en la entrega.",
    deliverable: "Servicio gestionado",
  },
];

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
