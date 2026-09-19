/**
 * Convierte la respuesta del bot en bloques que el chat puede pintar.
 *
 * El bot escribe texto con marcas mínimas (`**negrita**`, viñetas con `- `,
 * rutas del sitio y URLs). Sin esto el panel muestra los asteriscos tal cual y
 * las rutas quedan como texto muerto que nadie puede tocar.
 *
 * Devuelve datos, no JSX, por dos razones: aquí vive la lógica que puede
 * romperse —y por eso tiene prueba— y el widget se queda solo con el pintado.
 * Nada de `dangerouslySetInnerHTML`: esto formatea texto de un modelo, y el
 * camino seguro es construir nodos, no inyectar HTML.
 */

export type Trozo =
  | { tipo: "texto"; texto: string }
  | { tipo: "negrita"; texto: string }
  | { tipo: "enlace"; texto: string; href: string; externo: boolean; fuerte?: boolean };

export type Bloque =
  | { tipo: "parrafo"; trozos: readonly Trozo[] }
  | { tipo: "lista"; ordenada: boolean; items: readonly (readonly Trozo[])[] };

/**
 * Raíces de ruta que se convierten en enlace. La lista es explícita a
 * propósito: con un `/\w+/` cualquiera, un «24/7» o un «y/o» se volverían
 * enlaces rotos. Si nace una sección nueva en el sitio, se añade aquí.
 */
const RAICES = ["radiografia", "servicios", "demos", "recursos", "enfoque", "nosotros", "marca"];

const RUTA = new RegExp(`^(?:/(?:${RAICES.join("|")})(?:/[a-z0-9-]+)*/?|/#[a-z-]+)$`);

const INLINE = new RegExp(
  [
    "\\[([^\\]\n]+)\\]\\(([^)\\s]+)\\)", // 1,2 · [etiqueta](destino)
    "\\*\\*([^*\n]+)\\*\\*", //                3 · **negrita**
    "(https?://[^\\s<>()\\[\\]]+)", //            4 · URL pelada
    `(/(?:${RAICES.join("|")})(?:/[a-z0-9-]+)*/?|/#[a-z-]+)`, // 5 · ruta pelada
  ].join("|"),
  "g",
);

/**
 * Cómo se llama un destino cuando el bot lo escribe pelado.
 *
 * «/servicios/auren-insight» en mitad de una frase la corta: nadie lee rutas.
 * Lo ideal es que el bot mande la etiqueta él mismo —y el prompt se la pide—
 * pero si se le olvida, esto la repone en vez de dejar la ruta cruda.
 */
const ETIQUETAS: Record<string, string> = {
  "/": "la página principal",
  "/radiografia": "Radiografía Auren",
  "/servicios": "los servicios",
  "/demos": "los demos",
  "/recursos": "los recursos",
  "/enfoque": "el enfoque",
  "/nosotros": "nosotros",
  "/marca": "la marca",
  "/#contacto": "el formulario de contacto",
};

function etiquetar(href: string): string {
  const limpio = href.replace(/\/$/, "") || "/";
  if (ETIQUETAS[limpio]) return ETIQUETAS[limpio];

  // /servicios/auren-insight → «Auren Insight»
  const servicio = /^\/servicios\/(.+)$/.exec(limpio);
  if (servicio) {
    return servicio[1]
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  if (/^https?:\/\//.test(limpio)) {
    const host = limpio.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
    return host === "wa.me" ? "WhatsApp" : host;
  }

  return limpio;
}

/** Un punto o un paréntesis pegados al final de una URL son puntuación, no parte de ella. */
function limpiarCola(url: string): { href: string; sobra: string } {
  const recortado = url.replace(/[.,;:!?)\]]+$/, "");
  return { href: recortado, sobra: url.slice(recortado.length) };
}

const esExterno = (href: string) => /^https?:\/\//.test(href);

/** Como `Trozo`, más la marca de si la etiqueta la puso el bot o la pusimos aquí. */
type Pieza = Trozo & { auto?: boolean };

/** Normaliza para comparar nombres: sin tildes, sin mayúsculas, sin artículo. */
function clave(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(el|la|los|las|un|una)\s+/, "");
}

/**
 * ¿La cola de `antes` ya dice lo mismo que `etiqueta`? Si sí, devuelve el texto
 * sin esa cola y con qué etiqueta quedarse.
 *
 * Resuelve «escribir por WhatsApp (WhatsApp)» → «escribir por WhatsApp», y
 * «datos en el formulario (el formulario de contacto)» → «datos en el
 * formulario de contacto», que es la versión que más dice de las dos.
 */
function absorber(antes: string, etiqueta: string): { resto: string; usar: string } | null {
  const objetivo = clave(etiqueta);
  if (!objetivo) return null;

  const palabras = antes.trimEnd().split(/\s+/);
  const maximo = Math.min(palabras.length, etiqueta.split(/\s+/).length + 1);

  for (let n = maximo; n >= 1; n--) {
    const cola = palabras.slice(-n).join(" ");
    const k = clave(cola);
    if (!k) continue;

    // Igual («WhatsApp» / «WhatsApp») o la etiqueta amplía a la cola
    // («formulario» → «el formulario de contacto»).
    const igual = k === objetivo;
    const amplia = objetivo.startsWith(k + " ");
    if (!igual && !amplia) continue;

    let resto = palabras.slice(0, palabras.length - n).join(" ");
    let usar = amplia ? etiqueta : cola;

    // El artículo se queda FUERA del enlace: se subraya «formulario de
    // contacto», no «el formulario de contacto». El «el» sigue en la frase.
    const articulo = /^(el|la|los|las|un|una)\s+/i.exec(usar);
    if (articulo) {
      usar = usar.slice(articulo[0].length);
      // `trimEnd` y no `trim`: el espacio de la IZQUIERDA separa este trozo del
      // enlace anterior, y recortarlo pega dos palabras («WhatsApp» + «o»).
      const previo = resto.trimEnd();
      resto = previo ? `${previo} ${articulo[0].trim()}` : articulo[0].trim();
    }

    return { resto, usar };
  }
  return null;
}

/**
 * Quita el paréntesis redundante que deja el bot al escribir
 * «Auren Insight (/servicios/auren-insight)»: nuestra etiqueta automática
 * repone «Auren Insight» y el resultado se lee «Auren Insight (Auren Insight)».
 *
 * Solo toca enlaces con etiqueta automática y entre paréntesis: si el bot
 * escribió él la etiqueta, es intencional y se respeta.
 */
function fusionarRedundancia(lista: Pieza[]): Trozo[] {
  const salida: Pieza[] = [];

  for (let i = 0; i < lista.length; i++) {
    const t = lista[i];
    const sig = lista[i + 1];
    const previo = salida[salida.length - 1];

    const enParentesis =
      t.tipo === "enlace" &&
      t.auto &&
      previo?.tipo === "texto" &&
      previo.texto.trimEnd().endsWith("(") &&
      sig?.tipo === "texto" &&
      sig.texto.startsWith(")");

    if (!enParentesis || t.tipo !== "enlace") {
      salida.push(t);
      continue;
    }

    // Texto antes del «(»; si solo queda espacio, el nombre está en el trozo
    // anterior (típico de una negrita: «**Auren Insight** (…)»).
    const antesDelParen = previo.texto.trimEnd().slice(0, -1);
    const anterior = salida[salida.length - 2];
    const fuente = antesDelParen.trim() ? previo : anterior;
    if (!fuente || fuente.tipo === "enlace") {
      salida.push(t);
      continue;
    }

    const crudo = fuente === previo ? antesDelParen : fuente.texto;
    const fusion = absorber(crudo, t.texto);
    if (!fusion) {
      salida.push(t);
      continue;
    }

    // Se consume el «(» y la parte duplicada; el enlace hereda la negrita.
    salida.pop();
    if (fuente !== previo) salida.pop();
    if (fusion.resto.trim()) {
      salida.push({ tipo: "texto", texto: fusion.resto + " " });
    }
    salida.push({ ...t, texto: fusion.usar, fuerte: fuente.tipo === "negrita" || undefined });

    // Se salta el «)» del trozo siguiente.
    lista[i + 1] = { tipo: "texto", texto: sig.texto.slice(1) };
  }

  return salida.filter((t) => t.tipo !== "texto" || t.texto !== "").map(({ auto: _a, ...t }) => t as Trozo);
}

function trozos(linea: string): Trozo[] {
  const salida: Pieza[] = [];
  let cursor = 0;

  const empujar = (texto: string) => {
    if (texto) salida.push({ tipo: "texto", texto });
  };

  for (const m of linea.matchAll(INLINE)) {
    const [entero, etiqueta, destino, negrita, url, ruta] = m;
    empujar(linea.slice(cursor, m.index));
    cursor = m.index + entero.length;

    if (etiqueta !== undefined) {
      // [texto](destino). Si el destino no existe en el sitio, el texto se
      // queda pero el enlace no: un 404 desde el chat es peor que texto plano.
      const { href, sobra } = limpiarCola(destino);
      if (esExterno(href) || RUTA.test(href)) {
        salida.push({ tipo: "enlace", texto: etiqueta, href, externo: esExterno(href) });
      } else {
        empujar(etiqueta);
      }
      empujar(sobra);
    } else if (negrita !== undefined) {
      salida.push({ tipo: "negrita", texto: negrita });
    } else {
      const { href, sobra } = limpiarCola(url ?? ruta);
      salida.push({ tipo: "enlace", texto: etiquetar(href), href, externo: url !== undefined, auto: true });
      empujar(sobra);
    }
  }

  empujar(linea.slice(cursor));
  return fusionarRedundancia(salida);
}

const VINETA = /^\s*[-*•]\s+/;
// El modelo también enumera con «1. », «2) »… Sin reconocerlo, esas líneas
// caerían en el mismo párrafo y saldrían como un bloque corrido.
const NUMERO = /^\s*\d+[.)]\s+/;

export function formatear(respuesta: string): Bloque[] {
  const bloques: Bloque[] = [];
  let lista: { ordenada: boolean; items: Trozo[][] } | null = null;
  let parrafo: string[] = [];

  const cerrarParrafo = () => {
    if (parrafo.length) {
      bloques.push({ tipo: "parrafo", trozos: trozos(parrafo.join(" ")) });
      parrafo = [];
    }
  };
  const cerrarLista = () => {
    if (lista) {
      bloques.push({ tipo: "lista", ordenada: lista.ordenada, items: lista.items });
      lista = null;
    }
  };

  const abrirItem = (linea: string, marca: RegExp, ordenada: boolean) => {
    cerrarParrafo();
    // Una lista de otro tipo cierra la anterior: no se mezclan viñetas y números.
    if (lista && lista.ordenada !== ordenada) cerrarLista();
    (lista ??= { ordenada, items: [] }).items.push(trozos(linea.replace(marca, "")));
  };

  for (const linea of respuesta.split("\n")) {
    if (VINETA.test(linea)) {
      abrirItem(linea, VINETA, false);
      continue;
    }
    if (NUMERO.test(linea)) {
      abrirItem(linea, NUMERO, true);
      continue;
    }

    cerrarLista();
    // Una línea en blanco separa párrafos; dentro de uno, los saltos sueltos
    // se unen: el modelo corta líneas donde le cabe, no donde hay sentido.
    if (linea.trim()) parrafo.push(linea.trim());
    else cerrarParrafo();
  }

  cerrarLista();
  cerrarParrafo();
  return bloques;
}
