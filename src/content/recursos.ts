import type { Faq, Figure } from "./site";

/**
 * Artículos de /recursos.
 *
 * Existe por una razón concreta: las páginas de servicio solo responden a
 * quien ya sabe que necesita el servicio. Nadie busca «Auren Flow»; sí busca
 * «cómo saber si mi empresa necesita automatización». Cada artículo persigue
 * una de esas búsquedas, la responde completa —no como anzuelo— y enlaza al
 * servicio que la resuelve.
 *
 * Para publicar: una entrada aquí. La ruta, el listado, el sitemap y el
 * JSON-LD salen solos. `services` y `related` deben existir.
 */

export type Section = {
  heading: string;
  body: readonly string[];
  /** Lista al final del bloque. Opcional: la mayoría de secciones no la usa. */
  list?: readonly string[];
};

export type Post = {
  slug: string;
  /** H1 y título del listado. Que contenga la búsqueda, no un juego de palabras. */
  title: string;
  /** <title> cuando el H1 queda largo para los 60 caracteres del buscador. */
  seoTitle?: string;
  /** Meta description. Máx. ~160 caracteres. */
  description: string;
  /** La búsqueda que este artículo persigue. Una, no cinco. */
  keyword: string;
  /** ISO. Se muestra y va al JSON-LD. */
  published: string;
  updated?: string;
  /** Minutos de lectura. A mano: un contador automático no vale una dependencia. */
  minutes: number;
  lede: string;
  sections: readonly Section[];
  faqs: readonly Faq[];
  /** Servicios que resuelven lo que el artículo describe. */
  services: readonly string[];
  /** Otros artículos. Slugs de este mismo array. */
  related: readonly string[];
  image?: Figure;
};

export const posts: readonly Post[] = [
  {
    slug: "senales-de-que-su-empresa-necesita-automatizacion",
    title: "Siete señales de que su empresa ya necesita automatizar procesos",
    seoTitle: "Cómo saber si su empresa necesita automatización",
    description:
      "Siete señales medibles para saber si su empresa necesita automatizar procesos, cómo cuantificar el costo actual y por dónde conviene empezar.",
    keyword: "cómo saber si mi empresa necesita automatización",
    published: "2026-08-12",
    minutes: 8,
    lede: "Casi ninguna empresa decide automatizar porque leyó un artículo. Decide cuando alguien pone en una hoja cuántas horas al mes se van en trabajo que ninguna persona debería estar haciendo. Estas son las siete señales que aparecen antes de esa hoja, y cómo ponerles número.",
    sections: [
      {
        heading: "Primero: automatizar no es comprar software",
        body: [
          "Vale la pena aclararlo antes de la lista, porque casi todos los proyectos que fracasan se saltan esta distinción. Automatizar un proceso es lograr que una secuencia de pasos ocurra sin que alguien tenga que empujarla: sin copiar datos de un sistema a otro, sin perseguir una aprobación por WhatsApp, sin armar el mismo informe cada lunes.",
          "Eso a veces se consigue con una herramienta nueva. Otras veces se consigue conectando dos sistemas que la empresa ya paga. Y con una frecuencia incómoda se consigue eliminando el paso, porque existía solo para corregir un error que otro paso ya no comete. La herramienta es la última decisión, no la primera.",
        ],
      },
      {
        heading: "1. Hay personas cuyo trabajo es mover datos entre sistemas",
        body: [
          "Es la señal más clara y la más fácil de cuantificar. Alguien exporta de un sistema, ajusta en Excel y sube a otro. A veces es media hora al día; a veces es una persona completa. Si además esa persona es la única que sabe hacerlo, la empresa no tiene un proceso: tiene una dependencia.",
          "Para ponerle número basta con una pregunta a quien lo hace: cuántas veces por semana y cuánto se demora cada vez. Multiplique por cuatro y tendrá las horas al mes. Es una cifra que suele sorprender hacia arriba, sobre todo cuando se suman tres o cuatro tareas parecidas repartidas entre áreas distintas.",
        ],
      },
      {
        heading: "2. Nadie puede decir en qué punto va una solicitud sin preguntar",
        body: [
          "Si para saber el estado de un pedido, una orden de compra o una solicitud de cliente hay que llamar a alguien, el proceso no tiene trazabilidad. El costo no es solo la llamada: es que los problemas se descubren cuando ya son tarde, porque nadie estaba mirando el punto donde se atascó.",
          "Esta señal tiene un síntoma característico: reuniones de seguimiento cuyo único propósito es que cada área diga en qué va. Esa reunión es un informe que el sistema debería estar produciendo solo.",
        ],
      },
      {
        heading: "3. Las aprobaciones viven en el correo o en el chat",
        body: [
          "Un descuento aprobado por WhatsApp no deja rastro utilizable. Cuando seis meses después alguien pregunta quién autorizó ese precio, la respuesta es una búsqueda en un chat, si es que la persona sigue en la empresa.",
          "Aquí el costo tiene dos caras: el tiempo que se va persiguiendo la firma —que suele ser el cuello de botella real del proceso, no el trabajo en sí— y el riesgo de no poder demostrar la autorización cuando toca. En sectores regulados la segunda cara es la cara cara.",
        ],
      },
      {
        heading: "4. El mismo dato se digita más de una vez",
        body: [
          "Los datos del cliente se escriben en la cotización, se vuelven a escribir en el pedido y se escriben una tercera vez en la factura. Cada digitación es una oportunidad de error, y el error se descubre al final: en el despacho equivocado o en la factura rechazada.",
          "Una regla práctica: cuente cuántas veces aparece el mismo dato escrito a mano en el recorrido completo. Si aparece más de una, hay reproceso garantizado y probablemente ya lo esté pagando en notas crédito.",
        ],
      },
      {
        heading: "5. Los informes de gerencia se arman a mano",
        body: [
          "Si consolidar el informe mensual toma dos días de alguien copiando celdas, hay dos problemas y no uno. El primero es evidente: esos días. El segundo es peor: como cuesta tanto producirlo, nadie pide el dato entre cierres, y las decisiones se toman sobre información de hace tres semanas.",
          "La señal que confirma este punto es familiar en cualquier comité: dos áreas presentan cifras distintas del mismo mes y la reunión se va en discutir cuál está bien. Eso no se arregla con un tablero nuevo; se arregla acordando definiciones y trazando de dónde sale cada número.",
        ],
      },
      {
        heading: "6. Los errores se detectan tarde y siempre por el mismo lado",
        body: [
          "Si el cliente es quien avisa que el pedido salió mal, el control está afuera. Los procesos manuales fallan de forma silenciosa: no hay alerta, no hay excepción, solo un caso que siguió avanzando con el dato equivocado hasta que chocó con alguien.",
          "Vale la pena listar los últimos cinco errores que costaron dinero y preguntarse en qué paso se originaron y en qué paso se descubrieron. La distancia entre esos dos puntos es lo que la automatización acorta.",
        ],
      },
      {
        heading: "7. El conocimiento del proceso vive en una sola persona",
        body: [
          "Hay alguien que sabe cómo se hace realmente, qué excepciones existen y a quién hay que llamar cuando algo se sale de lo normal. Cuando esa persona sale a vacaciones, el proceso se vuelve lento; cuando renuncia, se vuelve caótico.",
          "Automatizar bien obliga a escribir esas reglas, y ese ejercicio tiene valor incluso si al final no se automatiza nada. Un proceso que solo existe en la cabeza de alguien no se puede mejorar, ni auditar, ni delegar.",
        ],
      },
      {
        heading: "Cómo ponerle cifra antes de pedir presupuesto",
        body: [
          "Ninguna de las siete señales justifica por sí sola una inversión. Lo que la justifica es la suma, y la suma se calcula con una tabla sencilla que cualquier jefe de área puede llenar en una tarde: por cada tarea manual identificada, cuántas veces al mes ocurre, cuánto dura y cuánto vale la hora de quien la hace.",
          "A esa cifra súmele lo que cuestan los reprocesos: notas crédito, despachos repetidos, horas extra de cierre. Y añada el riesgo de cumplimiento cuando aplique, que en sectores regulados suele pesar más que todo lo anterior junto.",
          "Con ese número sobre la mesa la conversación cambia de tono. Deja de ser «deberíamos modernizarnos» y pasa a ser «esto cuesta tanto al mes y resolverlo cuesta tanto». La primera versión es una discusión de opiniones; la segunda es una decisión.",
        ],
        list: [
          "Frecuencia mensual de cada tarea manual identificada",
          "Duración promedio y costo por hora de quien la ejecuta",
          "Reprocesos: cuántos al mes y qué cuesta cada uno",
          "Exposición por incumplimiento, cuando el proceso es regulado",
        ],
      },
      {
        heading: "Por dónde empezar sin comprometer medio presupuesto",
        body: [
          "Empiece por un solo flujo, y que no sea el más complicado. El objetivo del primero no es el ahorro máximo: es demostrarle al equipo que esto funciona y aprender cómo reacciona su operación al cambio. Un proceso repetitivo, de reglas estables y volumen alto es el candidato ideal.",
          "Antes de automatizarlo, rediséñelo. La pregunta no es cómo hacer más rápido lo que hoy se hace, sino qué pasos dejarían de hacer falta si el proceso se pensara desde cero. Automatizar sobre un proceso mal diseñado solo consigue que los errores ocurran más rápido y en mayor volumen.",
          "Y defina de antemano cómo va a saber si sirvió. Una métrica, medida antes de empezar. Sin línea base, al final del proyecto nadie va a poder demostrar qué mejoró, y la siguiente inversión volverá a ser una discusión de opiniones.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuántas de estas señales justifican automatizar?",
        a: "Tres suelen bastar para que el número dé, pero lo que decide no es la cantidad de señales sino el costo acumulado. Una sola tarea que consume veinte horas al mes justifica más que cuatro señales de bajo impacto.",
      },
      {
        q: "¿Se puede automatizar sin cambiar de sistema?",
        a: "En la mayoría de los casos sí. Buena parte del trabajo consiste en conectar herramientas que la empresa ya paga y usa a medias. Reemplazar el sistema central es la opción más cara y la que más rompe la operación: se evalúa de últimas, no de primeras.",
      },
      {
        q: "¿Cuánto se demora automatizar un proceso?",
        a: "Un flujo acotado va de tres a ocho semanas, incluido el rediseño previo. Los proyectos que se anuncian de seis meses casi siempre están agrupando varios flujos que convendría entregar por separado.",
      },
    ],
    services: ["auren-flow", "auren-insight"],
    related: ["que-es-la-transformacion-digital-para-pymes", "software-a-la-medida-o-saas"],
  },
  {
    slug: "que-es-la-transformacion-digital-para-pymes",
    title: "Qué es la transformación digital para pymes (y qué no es)",
    seoTitle: "Qué es la transformación digital para pymes",
    description:
      "Qué significa realmente transformación digital en una empresa mediana colombiana, qué no es, cuánto cuesta equivocarse y cómo se aborda por fases.",
    keyword: "qué es la transformación digital para pymes",
    published: "2026-08-19",
    minutes: 9,
    lede: "El término se usa para vender cosas muy distintas entre sí: un software contable, una página web, un curso de innovación y un proyecto de inteligencia artificial. Vale la pena separar qué es, qué no es y qué cambia en la práctica dentro de una empresa mediana en Colombia.",
    sections: [
      {
        heading: "Una definición que sirve para decidir",
        body: [
          "Transformación digital es cambiar cómo funciona un proceso del negocio usando tecnología, de modo que produzca un resultado medible distinto: menos tiempo, menos error, más control o información que antes no existía.",
          "Las tres partes importan. Si no cambia el proceso, es una compra de software. Si no hay tecnología de por medio, es mejora de procesos —igual de válida, pero otra cosa—. Y si el resultado no se puede medir, no hay forma de saber si sirvió, que es exactamente el estado en el que termina la mayoría de estos proyectos.",
          "Bajo esa definición, digitalizar un formato de papel en un PDF que se sigue llenando a mano y archivando en una carpeta no es transformación digital: es el mismo proceso con otro soporte. En cambio, convertir esa inspección en un formulario móvil que bloquea la salida del vehículo cuando falla un ítem crítico sí lo es, porque cambió lo que ocurre.",
        ],
      },
      {
        heading: "Qué no es",
        body: [
          "Vale la pena nombrar las confusiones más caras, porque cada una tiene un vendedor asociado.",
          "No es comprar un ERP. Un ERP es una herramienta, y en una empresa con procesos mal definidos amplifica el desorden con licencias mensuales. Tampoco es tener presencia digital: una página web y redes sociales son canales de mercadeo, no transformación de la operación.",
          "No es un proyecto de innovación con tableros de post-its. Los talleres sirven para alinear, pero lo que cambia una operación es alguien implementando y midiendo. Y no es, definitivamente, aplicar inteligencia artificial. La IA es una técnica entre varias; en la mayoría de las pymes colombianas hay tres o cuatro problemas más rentables antes de llegar a ella.",
        ],
        list: [
          "Comprar un ERP, un CRM o cualquier plataforma antes de definir el proceso objetivo",
          "Confundir presencia digital —web, redes, comercio electrónico— con transformación de la operación",
          "Talleres de innovación sin nadie asignado a implementar lo que salga de ahí",
          "Empezar por inteligencia artificial cuando los datos todavía no cuadran entre áreas",
        ],
      },
      {
        heading: "Por qué en una pyme es distinto",
        body: [
          "Una empresa grande puede darse el lujo de un proyecto de dos años con un equipo dedicado. Una empresa de sesenta personas no: quien va a liderar el cambio también tiene que sacar la operación del mes. Esa restricción no es un defecto, es el dato de diseño más importante del proyecto.",
          "De ahí salen tres consecuencias prácticas. El proyecto debe entregar valor por partes, porque nadie va a sostener dieciocho meses de fe. El alcance de cada parte debe caber en la capacidad real del equipo, no en la ideal. Y la solución tiene que poder operarse sin un área de sistemas de diez personas, porque no existe.",
          "La ventaja compensa: en una empresa mediana las decisiones se toman rápido, el gerente conoce la operación de primera mano y un cambio bien elegido se siente en semanas, no en trimestres.",
        ],
      },
      {
        heading: "Cómo se ve en la práctica: tres ejemplos concretos",
        body: [
          "En manufactura, el caso típico no es un robot: es que el registro de producción deje de llenarse en papel y empiece a alimentar un tablero donde el costo por lote aparece el mismo día y no en el cierre del mes. Con eso, la conversación sobre merma cambia de anecdótica a factual.",
          "En transporte, es que los vencimientos de SOAT y tecnomecánica dejen de vivir en una hoja de cálculo y avisen solos con treinta días de anticipación, y que el preoperacional deje evidencia utilizable en una auditoría del PESV.",
          "En una empresa de servicios, es que la solicitud del cliente tenga un estado consultable y un responsable visible, en vez de un hilo de correo donde nadie sabe si alguien ya respondió. Ninguno de los tres es espectacular. Los tres cambian el día de alguien.",
        ],
      },
      {
        heading: "El orden que evita los errores caros",
        body: [
          "El patrón de fracaso es siempre parecido: alguien ve una demostración, compra la herramienta y después intenta acomodar la operación. Seis meses más tarde el sistema se usa a medias, el Excel volvió y la conclusión de la empresa es que «la tecnología no funcionó».",
          "El orden que lo evita no tiene misterio. Primero mirar cómo funciona hoy la operación, con las personas que la ejecutan y en el puesto donde ocurre. Después entender qué causa la fricción y cuánto cuesta, en cifras. Solo entonces decidir qué se construye, en qué orden y con qué métrica.",
          "Ese orden también sirve para parar a tiempo. Si al terminar el análisis resulta que el problema se resuelve cambiando un procedimiento, se cambia el procedimiento y no se compra nada. Ahorrar una compra innecesaria es un resultado tan válido como una implementación exitosa.",
        ],
      },
      {
        heading: "Cuánto cuesta y cómo se presupuesta sin apostar",
        body: [
          "La pregunta llega siempre, y la respuesta honesta es que depende del alcance. Lo que sí se puede acotar es el primer paso: un diagnóstico de dos a cuatro semanas que devuelve el costo actual de la fricción y una lista priorizada de qué resolver primero.",
          "Ese entregable convierte el presupuesto en una comparación en vez de una apuesta: esto cuesta tanto al mes, resolverlo cuesta tanto, se recupera en tanto tiempo. Es también lo que permite sustentar la inversión ante una junta sin apoyarse en las promesas del folleto de un proveedor.",
          "Y permite decidir escalonado. Se aprueba la primera fase, se mide, y la segunda se aprueba con evidencia propia y no con proyecciones. Es más lento en el papel y bastante más rápido en la realidad, porque no hay que deshacer nada.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Por dónde empieza una pyme que nunca ha hecho esto?",
        a: "Por un diagnóstico acotado de uno o dos procesos críticos, no por una transformación de toda la compañía. El objetivo del primer paso es tener una cifra del costo actual y una prioridad clara; con eso las decisiones siguientes dejan de ser intuición.",
      },
      {
        q: "¿Cuánto tiempo toma ver resultados?",
        a: "Con un alcance bien partido, el primer cambio en producción se ve entre la semana seis y la diez. Si el plan que le presentan no entrega nada útil antes de seis meses, probablemente está agrupando cosas que se pueden entregar por separado.",
      },
      {
        q: "¿Necesito contratar personal de sistemas para sostenerlo?",
        a: "No siempre. Depende de qué se implemente: hay soluciones que un equipo administrativo opera sin problema y otras que exigen perfil técnico. Esa pregunta se responde durante el diseño, porque cambia qué conviene construir.",
      },
      {
        q: "¿Sirve si mi empresa es familiar y los procesos no están documentados?",
        a: "Sirve, y es el escenario más común. La falta de documentación no impide el trabajo: el proceso real se levanta observando y entrevistando. De hecho, la documentación existente suele contradecir lo que ocurre en el puesto de trabajo.",
      },
    ],
    services: ["auren-insight", "auren-blueprint"],
    related: [
      "senales-de-que-su-empresa-necesita-automatizacion",
      "software-a-la-medida-o-saas",
    ],
  },
  {
    slug: "software-a-la-medida-o-saas",
    title: "Software a la medida o SaaS: cómo decidir sin arrepentirse",
    seoTitle: "Software a la medida vs. SaaS: cómo decidir",
    description:
      "Cuándo conviene comprar software de suscripción y cuándo construir a la medida: criterios de decisión, costo total y los errores que salen caros.",
    keyword: "software a medida vs SaaS",
    published: "2026-08-26",
    minutes: 8,
    lede: "La decisión se suele tomar por precio de lista y se termina pagando por costo total. Estos son los criterios que de verdad separan un caso del otro, y las tres situaciones donde la respuesta obvia es la equivocada.",
    sections: [
      {
        heading: "La pregunta correcta no es cuál es mejor",
        body: [
          "Es cuál encaja con este proceso, en esta empresa, con este horizonte. Comprar una suscripción y construir a la medida son decisiones con perfiles de riesgo distintos, y ninguna de las dos es intrínsecamente más barata.",
          "Conviene además descartar el falso dilema: la respuesta más frecuente en la práctica es mixta. Se compra el estándar para lo estándar —contabilidad, nómina, facturación electrónica— y se construye solo la pieza que no existe en el mercado, integrada con lo demás.",
        ],
      },
      {
        heading: "Cuándo gana comprar",
        body: [
          "Cuando el proceso es estándar y regulado, comprar gana casi siempre. La facturación electrónica en Colombia cambia con la normativa, y mantener eso al día es trabajo permanente que un proveedor especializado hace mejor y más barato que cualquier equipo interno.",
          "También gana cuando se necesita algo funcionando este mes y no el próximo trimestre, cuando el volumen de usuarios es bajo —las licencias por puesto son baratas hasta cierto punto— y cuando el proceso no es un diferencial competitivo. Nadie gana clientes por tener una nómina distinta.",
        ],
        list: [
          "El proceso es estándar: contabilidad, nómina, facturación, firma electrónica",
          "La normativa cambia y alguien más debe encargarse de seguirla",
          "Se necesita operar en semanas, no en meses",
          "Pocos usuarios: el costo por licencia todavía no pesa",
        ],
      },
      {
        heading: "Cuándo gana construir",
        body: [
          "Cuando el proceso es justamente la ventaja de la empresa. Si su forma de programar la producción, rutear los despachos o liquidar a los proveedores es parte de por qué le va bien, meterla a la fuerza en un producto genérico es renunciar a ella para ahorrarse una suscripción.",
          "También cuando ya evaluó tres herramientas y ninguna encaja sin trabajo pesado de configuración; cuando paga licencias por usuario para gente que usa dos pantallas; y cuando lleva años adaptando la operación al software en vez de al revés. Esa última señal es la más costosa y la que menos se nota, porque el costo se paga en pequeñas incomodidades diarias que nadie factura.",
        ],
        list: [
          "El proceso es el diferencial del negocio y ningún producto lo modela bien",
          "Muchos usuarios ocasionales pagando licencia completa",
          "Se está deformando la operación para caber en la herramienta",
          "La integración con lo que ya existe es la mitad del problema",
        ],
      },
      {
        heading: "El número que casi nadie calcula",
        body: [
          "La comparación válida no es precio de licencia contra precio de desarrollo. Es costo total en un horizonte de tres a cinco años, y ahí entran cosas que no aparecen en ninguna cotización.",
          "Del lado de la suscripción: licencias por usuario proyectadas al crecimiento esperado, módulos que se cobran aparte, el costo de la implementación inicial, las integraciones y —el rubro olvidado— cuánto costaría salir de ahí en el año cuatro si el proveedor sube el precio o cierra.",
          "Del lado de la medida: el desarrollo inicial, la infraestructura mensual, el mantenimiento correctivo y la evolución. Ese último rubro es el que se subestima; un software propio sin presupuesto de evolución envejece hasta volverse el problema que vino a resolver.",
        ],
        list: [
          "Licencias proyectadas al número de usuarios que tendrá en tres años",
          "Implementación, integraciones y migración de datos, en ambos casos",
          "Infraestructura y mantenimiento mensual del software propio",
          "Costo de salida: qué pasa si en el año cuatro hay que cambiar de proveedor",
        ],
      },
      {
        heading: "Tres situaciones donde la respuesta obvia falla",
        body: [
          "La primera: «es más barato comprar». Suele serlo el primer año y dejar de serlo cuando el número de usuarios crece o cuando la personalización necesaria termina costando más que el desarrollo que se quería evitar. Vale la pena revisar cuánto de la implementación es configuración pesada.",
          "La segunda: «nosotros somos únicos». Casi todas las empresas creen que su proceso es especial, y en la mayoría de los casos lo especial es un diez por ciento del flujo. La pregunta útil es si ese diez por ciento es lo que le hace ganar dinero. Si no lo es, cámbielo y compre.",
          "La tercera: «lo desarrollamos internamente». Es viable con un equipo técnico estable y con capacidad libre. Es riesgoso cuando queda dependiendo de una sola persona: el conocimiento se va con ella, y recuperar un sistema sin documentación cuesta más que haberlo comprado.",
        ],
      },
      {
        heading: "Qué preguntar antes de firmar, en cualquiera de los dos casos",
        body: [
          "La mayoría de los arrepentimientos no vienen de haber elegido mal entre comprar y construir, sino de no haber preguntado cuatro cosas a tiempo. Sirven igual para un contrato de suscripción que para uno de desarrollo.",
          "Primero, cómo salgo. Pida ver una exportación real de sus datos, no la promesa de que existe: formato, alcance y si incluye los adjuntos y el histórico. Segundo, qué pasa con las integraciones cuando la otra parte cambie: quién asume el ajuste y con qué tiempo de respuesta.",
          "Tercero, qué se cobra aparte. Módulos, usuarios adicionales, ambientes de prueba, horas de soporte, cambios de alcance: la lista de lo que no está incluido dice más del costo real que el precio de la portada. Y cuarto, quién queda sabiendo cómo funciona esto dentro de su empresa, con nombre propio y con tiempo asignado.",
        ],
        list: [
          "Exportación completa de datos: formato, histórico y adjuntos, demostrada",
          "Responsable y tiempo de respuesta cuando una integración se rompa",
          "Lista explícita de lo que se cobra por fuera del precio base",
          "Quién queda entrenado internamente, con nombre y con tiempo asignado",
        ],
      },
      {
        heading: "Cómo decidir en una tarde",
        body: [
          "Escriba el proceso en pasos. Marque cuáles son estándar y cuáles son propios de su negocio. Si lo propio es marginal, compre y ajuste el proceso. Si lo propio es el corazón del asunto, construya esa parte y compre el resto.",
          "Después haga el número a tres años, con las dos opciones al mismo nivel de detalle e incluyendo integración y salida. Y por último pregúntese quién va a operar y evolucionar lo que quede: si la respuesta es «alguien lo verá», la opción de menor riesgo es la que menos dependa de que ese alguien aparezca.",
          "Una advertencia final sobre quién le está aconsejando. Un proveedor que revende licencias tiene incentivo para recomendar la compra, y una fábrica de software tiene incentivo para recomendar el desarrollo. Vale la pena preguntar de frente cómo gana dinero quien le está dando el consejo.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es más barato el software a la medida?",
        a: "No de entrada; suele serlo a mediano plazo cuando hay muchos usuarios o cuando la personalización del producto comprado es pesada. Con pocos usuarios y un proceso estándar, comprar gana con claridad.",
      },
      {
        q: "¿Puedo empezar con SaaS y migrar después a la medida?",
        a: "Sí, y es una ruta sensata para validar el proceso antes de invertir. La condición es cuidar desde el inicio la salida de sus datos: verifique que puede exportarlos completos y en un formato utilizable antes de firmar.",
      },
      {
        q: "¿De quién es el código de un desarrollo a la medida?",
        a: "Debe ser suyo, y conviene dejarlo escrito en el contrato junto con la entrega de documentación. Un desarrollo cuya propiedad queda en el proveedor combina lo peor de las dos opciones: paga como desarrollo y queda amarrado como suscripción.",
      },
    ],
    services: ["auren-studio", "auren-blueprint"],
    related: [
      "que-es-la-transformacion-digital-para-pymes",
      "senales-de-que-su-empresa-necesita-automatizacion",
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

/** Más recientes primero. El listado y el sitemap leen de aquí. */
export const postsByDate = [...posts].sort((a, b) => b.published.localeCompare(a.published));

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/**
 * Fecha legible desde el ISO.
 *
 * A mano y no con `toLocaleDateString`: `new Date("2026-08-12")` se interpreta
 * como medianoche UTC y en Colombia (UTC-5) se imprime como el 11. La fecha de
 * publicación no tiene hora ni zona; es un dato de calendario.
 */
export const fechaLarga = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
};
