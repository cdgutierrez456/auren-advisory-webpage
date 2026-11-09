# Auren Advisory V2 — rediseño estratégico, creativo y técnico

Rama: `redesign/auren-v2` (nace de `radiografia-v2`, que contiene todo lo
publicado más la Radiografía v2). La versión anterior sigue intacta en `main`.

Este documento recoge los cuatro entregables del encargo: diagnóstico,
conceptualización, desarrollo y validación. Las dos primeras partes se
escribieron antes de tocar código; las dos últimas, al terminar.

---

## ENTREGABLE 1 — DIAGNÓSTICO

### 1.1 Qué se auditó

- **Sitio desplegado** `https://aurenadv.com` (home, /servicios, vista móvil y
  de escritorio, estados de scroll). Nota: producción sirve una revisión que no
  está en este repositorio (tiene un conmutador ES/EN que ningún commit trae).
  El contenido y el diseño son, por lo demás, los de `main`.
- **Repositorio completo**: Next.js 16 (App Router), React 19, Tailwind v4,
  Motion. 11.150 líneas de código propio, 91 pruebas, build limpio.

### 1.2 Lo que ya está bien (y se conserva)

Hay más valor construido del que la portada deja ver:

| Activo | Por qué importa |
|---|---|
| `src/content/site.ts` con 8 servicios de 950–1.100 palabras, pasos, sectores, métricas y FAQ | Es la base comercial y SEO. No se reescribe: se reordena cómo se presenta. |
| Método **Ver · Entender · Transformar** con fases, entregables y preguntas | Es el verdadero diferencial narrativo. Hoy está enterrado en la tercera pantalla. |
| **Radiografía Auren** (12 preguntas, sin registro, sin persistencia) | Lead magnet honesto. |
| **8 demos funcionales** en el navegador (preoperacional, flota, PQRSD, visión…) | Es la única prueba tangible que tiene una firma fundada en 2026. Hoy vive en `noindex`, en el sexto ítem del menú. |
| Infraestructura SEO: `pageMetadata`, JSON-LD con `@id` único, sitemap derivado, títulos verificados por test | Se conserva intacta y se extiende a las páginas nuevas. |
| Sistema de tokens semánticos y dos temas | Permite cambiar la dirección visual sin tocar cada componente. |
| Contacto sin backend (wa.me), chat con el bot, formato seguro del texto del bot | Funcionan. |
| Honestidad editorial: testimonios marcados «texto de ejemplo», nada inventado | Se mantiene como regla. |

### 1.3 Problemas de **posicionamiento**

1. **El hero no dice qué hace Auren.** El H1 visual es «Ver. Entender.
   Transformar.» —tres verbos que un empresario no puede traducir— y la línea
   que lo explica dice «Consultoría en transformación empresarial,
   automatización e inteligencia artificial». Esa frase posiciona exactamente
   lo que el brief pide evitar: una consultora tecnológica / de IA.
2. **La marca se define por negación.** El manifiesto abre con «Auren no es
   una empresa que vende inteligencia artificial». Decir «no somos de IA» en
   serif a 50 px fija el marco «IA» en la cabeza del lector.
3. **La promesa es defensiva, no transformadora.** El relato dominante es
   «primero miramos, la tecnología viene después», «si no la necesita se lo
   decimos». Es honesto y vale conservarlo como principio, pero como mensaje
   central vende cautela, no capacidad de llevar una empresa a otro nivel.
4. **El cliente debe aprender el vocabulario de Auren para entender la
   oferta:** «Un solo sistema. Ocho puertas de entrada.» → Insight, Blueprint,
   Transform, Data, Flow, Vision, Studio, Care. Ocho nombres propios antes de
   una sola necesidad empresarial.

### 1.4 Problemas de **comunicación**

1. **La home es un catálogo de tecnologías.** La sección «Capacidades» (IA,
   Datos, Automatización, Software, Digitalización, CRM, Visión) es exactamente
   la lista que el brief prohíbe como eje. Y es redundante con «Servicios».
2. **Tres capas que dicen lo mismo:** Capacidades (7) + Servicios (8) +
   Sectores (4) + Método (3) = 22 tarjetas para explicar una oferta. Once
   secciones y ~1.450 palabras antes del formulario.
3. **Ningún problema está escrito en la voz del cliente** en la primera
   pantalla. Las situaciones reconocibles («gente copiando datos entre
   sistemas», «cada área reporta cifras distintas») existen, pero en
   `/servicios`, al final.
4. **Los chips «de prueba» del hero no prueban nada** («Operación mapeada»,
   «Impacto medido») y los tres datos «Industria / Servicios / Tecnología» no
   tienen significado para nadie.
5. **El CTA principal promete un «diagnóstico sin compromiso»** sin que exista
   un servicio gratuito definido. Hay que reencuadrarlo como una primera
   conversación.

### 1.5 Problemas de **diseño**

1. **Plantilla «dark SaaS»:** fondo teal casi negro, tarjetas *glass* con
   `backdrop-filter` en todas las secciones, blobs de luz lima que «respiran».
   Es la estética de un producto de desarrolladores o de cripto, no de una
   firma que entra a plantas, alcaldías y hospitales.
2. **Monotonía compositiva.** Todas las secciones son `encabezado + rejilla de
   tarjetas glass`. No hay un solo diagrama, ilustración o composición que
   explique el método o una transformación.
3. **Lima como protagonista.** El brief lo limita al ~10 %; en el tema oscuro
   el lima es el color de los títulos, los botones, las reglas, los glows y los
   chips. Cansa y encandila.
4. **El tema claro existe pero es secundario** y nadie lo ve: el oscuro es el
   predeterminado.
5. **Sin imágenes** de ningún tipo (está documentado en `IMAGENES.md`, y se
   conserva la estructura), pero el diseño tampoco construyó un recurso
   gráfico propio que supla esa ausencia.

### 1.6 Problemas de **experiencia de usuario**

1. **El contenido aparece tarde.** Las animaciones de *reveal* (opacidad 0 +
   desenfoque 10 px + 0,75 s) hacen que al bajar rápido, en móvil o en una
   captura, media pantalla esté vacía o borrosa. Se observó en producción.
2. **Menú de seis ítems** (Enfoque, Servicios, Nosotros, Radiografía, Demos,
   Recursos) + Contacto + tema. Dos de ellos (Radiografía, Demos) son
   herramientas, no secciones de un sitio corporativo.
3. **Nada guía al visitante por su problema.** La ruta es «lea todo y deduzca».
4. **Móvil:** el hero ocupa `92svh` con texto a 3,25 rem en bloques de una
   palabra; los chips de prueba desaparecen; el primer contenido útil queda a
   dos pantallas.

### 1.7 Problemas **técnicos**

| Hallazgo | Impacto |
|---|---|
| `npm test` ejecuta **0 pruebas en Windows**: el glob `'src/**/*.test.ts'` no se expande en `cmd`. Con `bash` corren las 91. | Un desarrollador en Windows cree que todo pasa. Se arregla en `package.json`. |
| Producción redirige `aurenadv.com → 308 → www` mientras canónica, sitemap y JSON-LD usan el dominio desnudo (verificado con `curl` el 7-nov-2026). | Señales SEO divididas. Está documentado en `SEO.md`; se arregla en Vercel, no en código. **Pendiente del propietario.** |
| El despliegue no corresponde al repositorio (conmutador ES/EN). | Riesgo de perder trabajo al desplegar esta rama. **Confirmar con el propietario** de dónde sale producción. |
| Motion deja `opacity: 0` hasta que el observador dispara. | Contenido invisible ante cualquier fallo de JS parcial; `<noscript>` cubre solo el caso sin JS. |
| `/demos` fuera del sitemap a propósito, pero tampoco enlazado desde ningún lugar persuasivo. | Prueba desperdiciada. |

### 1.8 Oportunidades comerciales no aprovechadas

- **Los demos como prueba.** «Pruébelo en su navegador» vale más que un
  testimonio de ejemplo.
- **Los socios con nombre.** Existen en `/nosotros`; en la home solo hay
  «Dos socios fundadores».
- **Entrada por problema.** Seis situaciones reconocibles que enruten a la
  solución correcta.
- **Sectores con opportunidades concretas** (el `GUION-COMERCIAL.md` tiene
  material riquísimo que el sitio no usa).
- **Un contacto que explique qué pasa después** de escribir (hoy es un
  formulario al pie de la home).

### 1.9 Diagnóstico estratégico: las ocho preguntas

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | ¿Se entiende qué hace Auren en < 10 s? | **No.** Se entiende el eslogan y la palabra «consultoría». |
| 2 | ¿Se comprende que vendemos transformación empresarial mediante tecnología? | **Parcialmente.** Se lee «consultoría en automatización e IA». |
| 3 | ¿Se identifican los problemas empresariales que resolvemos? | **Tarde.** Aparecen en Sectores (pantalla 7) y en `/servicios`. |
| 4 | ¿Los servicios están organizados de manera comprensible? | **No para un primerizo.** Ocho marcas + siete tecnologías. |
| 5 | ¿Transmite confianza? | **A medias.** Texto honesto y sólido; cero caras, testimonios «de ejemplo», estética de startup. |
| 6 | ¿Hay diferenciación frente a otras consultoras tecnológicas? | **En el texto sí** (método, honestidad, demos). **En lo visual no.** |
| 7 | ¿La experiencia facilita el contacto? | **Sí**, pero al final de una página muy larga y con una promesa ambigua. |
| 8 | ¿Transmite visión y capacidad de crecimiento? | **No.** El relato es de prudencia, no de ambición. |

### 1.10 Las cinco debilidades principales

1. **Posicionamiento:** el sitio se presenta como consultora de automatización
   e IA, no como firma de transformación empresarial.
2. **Arquitectura comercial:** la oferta es un catálogo de ocho marcas y siete
   tecnologías; el cliente no encuentra su necesidad.
3. **Dirección de arte:** plantilla oscura genérica, sin un recurso gráfico que
   explique nada; el lima excede su papel de acento.
4. **Experiencia:** home de once secciones, contenido oculto por animación,
   menú con herramientas mezcladas con secciones.
5. **Confianza:** sin rostro, sin prueba visible; la prueba que existe (demos,
   socios) está escondida.

---

## ENTREGABLE 2 — CONCEPTUALIZACIÓN

### 2.1 Estrategia de marca

**Definición** (fija, viene del brief): *Transformación empresarial mediante
tecnología.*

**Lo que el visitante debe pensar:** «Esta firma puede ayudarme a ver lo que
no estoy viendo en mi empresa y a convertirlo en mejoras reales con
tecnología».

**Tesis de comunicación:** la tecnología no se vende como catálogo sino como
**resultado de haber entendido el negocio**. El orden de lectura de toda
página es: *problema que reconoce el cliente → qué hacemos → qué obtiene →
cómo empezar*.

**Lo que cambia en el tono:** de «primero miramos, la tecnología viene
después» (cautela) a «su empresa puede funcionar mejor; nosotros encontramos
dónde y lo construimos» (capacidad). La honestidad se conserva como
*principio* («si no hace falta tecnología se lo decimos»), no como titular.

**Ver. Entender. Transformar.** deja de ser el H1 y pasa a ser la firma del
sistema: estructura el método, titula los capítulos, aparece en el pie y en el
diagrama del hero. Es más presente que antes, pero ya no tiene que cargar con
explicar qué vendemos.

### 2.2 Nueva arquitectura comercial

Cinco **soluciones** organizadas por necesidad empresarial. Los ocho servicios
existentes no se eliminan: son el nivel «cómo lo entregamos» y conservan sus
URL, su contenido y su SEO.

| Solución (lo que el cliente necesita) | Pregunta que responde | Servicios que la ejecutan |
|---|---|---|
| **Estrategia y diagnóstico de transformación** | ¿Dónde está la oportunidad y por dónde empezar? | Auren Insight, Auren Blueprint |
| **Automatización e inteligencia artificial** | ¿Cómo dejamos de hacer a mano lo que no agrega valor? | Auren Flow (+ IA aplicada) |
| **Soluciones digitales a la medida** | ¿Qué hacemos cuando ningún software del mercado encaja? | Auren Studio, Auren Transform |
| **Datos e inteligencia de negocio** | ¿Cómo decidimos con cifras en las que todos confían? | Auren Data |
| **Sistemas inteligentes y tecnologías conectadas** | ¿Cómo convertimos lo que pasa en planta, patio o sala en datos? | Auren Vision (+ IoT, sistemas embebidos) |

Auren Care (continuidad) es transversal: aparece como «qué pasa después» en
todas las soluciones.

Cada solución explica, en este orden: **problema → qué hacemos → qué obtiene
→ cómo empezar**.

### 2.3 Nueva arquitectura de información

| Ruta | Propósito | Estado |
|---|---|---|
| `/` | Propuesta de valor, problemas, soluciones, método, prueba, contacto | **Rediseñada** |
| `/soluciones` | Las cinco soluciones por necesidad | **Nueva** |
| `/enfoque` | Cómo trabajamos (Ver · Entender · Transformar) | Reescrita visualmente |
| `/sectores` | Problemas y oportunidades por tipo de organización, con los demos de cada sector | **Nueva** |
| `/nosotros` | Filosofía, socios, lo que no hacemos | Reescrita visualmente |
| `/contacto` | Una conversación: formulario, canales directos y qué pasa después | **Nueva** (antes era un ancla al pie de la home) |
| `/servicios`, `/servicios/[slug]` | Catálogo detallado (8), nivel «cómo lo entregamos» | Se conservan; se re-visten y se jerarquiza *necesidad > marca* |
| `/recursos`, `/recursos/[slug]` | Guías | Se conservan |
| `/radiografia` | Autodiagnóstico | Se conserva, enlazada desde CTA secundarios |
| `/demos/*` | Prueba funcional | Se conserva en `noindex`; se enlaza desde home y sectores |
| `/marca` | Manual | Se conserva y documenta el sistema nuevo |

**Menú:** Soluciones · Cómo trabajamos · Sectores · Nosotros · Recursos ·
**Hablemos** (botón). Radiografía y Demos salen del menú principal y entran
en los lugares donde convencen (CTA, sectores, pie).

### 2.4 Narrativa de la home

1. **Hero** — titular, qué es Auren, dos CTA, diagrama de transformación.
2. **Qué hacemos** — la definición y las cuatro dimensiones (estrategia,
   procesos, tecnología, transformación) como una sola franja, no cuatro
   tarjetas. Frase estratégica: «No vendemos tecnología por vender tecnología».
3. **¿Le suena?** — seis situaciones en voz del cliente que enrutan a la
   solución.
4. **Soluciones** — las cinco, con problema y resultado.
5. **Cómo trabajamos** — Ver · Entender · Transformar como diagrama de
   proceso con entregables.
6. **Sectores** — cuatro, en su vocabulario.
7. **Por qué creer** — demos que funcionan, los dos socios con nombre, los
   tres principios (lo que no hacemos). Los testimonios de ejemplo **no** se
   muestran en la home: un «texto de ejemplo» en portada resta más de lo que
   suma. El componente sigue listo para citas reales.
8. **Preguntas frecuentes** — las seis (conservan su JSON-LD).
9. **Cierre** — «Hablemos de su empresa» → `/contacto`, con la Radiografía
   como alternativa de diez minutos.

### 2.5 Mensajes principales (alternativas exploradas y elección)

Titulares explorados para el hero:

1. «Transformamos cómo funciona su empresa.» — claro, pero genérico.
2. «Vemos lo que su operación no le está mostrando.» — bonito, demasiado
   críptico.
3. «La tecnología correcta empieza por entender su negocio.» — vuelve a vender
   tecnología.
4. «Su empresa puede funcionar mejor. Empecemos por ver dónde.» — promesa +
   acción + eco del método.
5. «Transformación empresarial mediante tecnología.» — la definición, literal.

**Elegido:** el 4 como titular, con el 5 como línea descriptiva dentro del
mismo H1 (requisito SEO ya establecido en `SEO.md`):

> **Su empresa puede funcionar mejor. Empecemos por ver dónde.**
> Transformación empresarial mediante tecnología: estrategia, procesos,
> automatización, datos e inteligencia aplicada.

Bajada: «Entendemos cómo funciona su negocio, identificamos las oportunidades
que no está viendo y las convertimos en soluciones que lo transforman. La
tecnología es nuestro instrumento; el resultado es una empresa que opera
mejor.»

CTA primario: **Hablemos de su empresa** (→ `/contacto`).
CTA secundario: **Cómo trabajamos** (→ `/enfoque`).
Línea de apoyo: «O haga la Radiografía: 12 preguntas, 10 minutos, sin registro».

### 2.6 Tres direcciones creativas

#### Dirección A — «Lente» · consultoría estratégica contemporánea

- **Idea central:** la claridad como lujo. Marfil, aire, serif grande.
- **Personalidad:** McKinsey Digital / IDEO. Sobria, editorial, institucional.
- **Paleta:** marfil `#F2F1EA` base, tinta `#111414` texto, Auren Deep para
  bloques, lima solo en reglas finas.
- **Tipografía:** Instrument Serif en titulares grandes, Geist en cuerpo.
- **Composición:** columnas editoriales, capítulos numerados, mucho blanco.
- **Fotografía:** retratos y operación real en blanco y negro.
- **Iconografía:** ninguna; solo numerales y reglas.
- **Hero:** titular serif a media pantalla sobre marfil, retrato de los socios
  a la derecha.
- **Tarjetas:** listas con divisores, casi sin cajas.
- **Recurso distintivo:** numeración de capítulos tipo informe.
- **Referentes:** mckinsey.com/capabilities, ideo.com, pentagram.com.
- **Riesgo:** se parece a cualquier consultora seria; pierde la precisión
  técnica que diferencia a Auren; serif en titulares choca con la regla de
  marca «serif solo en frases estratégicas».

#### Dirección B — «Plano» · firma tecnológica editorial y precisa

- **Idea central:** *Ver. Entender. Transformar* como un plano de obra. Auren
  lee la operación como un ingeniero lee un plano: la ve entera, entiende cómo
  funciona y la rediseña. La tecnología es precisión, no decoración.
- **Personalidad:** Thoughtworks + Instrument + un estudio de ingeniería.
  Premium, exacta, cercana porque explica.
- **Paleta:** la de marca, con los papeles invertidos respecto de hoy: marfil
  es la superficie de lectura, Auren Deep es la superficie de declaración
  (hero, capítulos), tinta para texto, lima al ~5 % (cotas, marcas, un botón
  por pantalla).
- **Tipografía:** Geist (texto e interfaz), Instrument Serif itálica solo en
  una o dos palabras por sección, Geist Mono para cotas, índices y datos.
- **Composición:** retícula de papel técnico (líneas finas), bloques a sangre,
  márgenes generosos, capítulos numerados «01 / 02 / 03».
- **Fotografía:** operación real, color natural, encuadrada dentro de la
  retícula como una lámina. Mientras no haya fotos, los diagramas ocupan su
  lugar sin que falte nada.
- **Iconografía:** ninguna. Diagramas de línea (1–1,5 px) con nodos,
  flechas y cotas. Nada de cerebros ni circuitos.
- **Hero:** Deep a sangre. A la izquierda el titular; a la derecha el
  **diagrama de transformación**: un proceso enredado (nodos y líneas
  cruzadas) que pasa por el vértice y sale como un flujo ordenado, con las
  tres fases como cotas. Se dibuja solo al cargar (CSS, sin JS).
- **Tarjetas:** planas, borde de 1 px, radio pequeño. Las listas son paneles
  con divisores. Sin *glass*, sin *glow*.
- **Recursos distintivos:** diagrama de transformación, «cotas» (regla con
  ticks + etiqueta mono) como sistema de etiquetado, franja de cuatro
  dimensiones, diagrama antes/después por solución, trazado del método.
- **Referentes:** thoughtworks.com (jerarquía y diagramas), instrument.com
  (bloques y escala), accenture.com (claridad de titulares), collins.us
  (sistema gráfico propio).

#### Dirección C — «Señal» · innovación con identidad experimental

- **Idea central:** la empresa como campo de señales que Auren ordena.
- **Personalidad:** laboratorio, cinética, audaz.
- **Paleta:** tinta `#111414` + lima a gran escala, marfil mínimo.
- **Tipografía:** Geist a tamaños enormes, mono como voz principal.
- **Composición:** tipografía cinética, lienzo generativo que reacciona al
  cursor, scroll con escenas.
- **Fotografía:** ninguna; todo generativo.
- **Hero:** campo de partículas que se ordena en una rejilla al pasar el ratón.
- **Tarjetas:** sin tarjetas; superficies negras a sangre con texto lima.
- **Recurso distintivo:** canvas generativo.
- **Referentes:** instrument.com (motion), active-theory.net, resn.co.nz.
- **Riesgo:** rompe la regla del lima al 10 %, acerca la marca a una startup
  de IA, exige WebGL y castiga el móvil; difícil de leer para un gerente.

#### Evaluación

| Criterio | A Lente | B Plano | C Señal |
|---|:-:|:-:|:-:|
| Coherencia con el posicionamiento | 3 | **5** | 2 |
| Diferenciación | 2 | **5** | 4 |
| Elegancia | 4 | **5** | 3 |
| Claridad | 4 | **5** | 2 |
| Confianza | 4 | **5** | 2 |
| Potencial de crecimiento (nuevas capacidades, sectores) | 3 | **5** | 3 |
| **Total / 30** | 20 | **30** | 16 |

**Dirección elegida: B — «Plano».** Es la única que traduce la filosofía de la
marca a un sistema gráfico propio (ver = plano, entender = cotas, transformar
= antes/después), respeta cada regla del brand brief (lima al 10 %, serif
estratégica, nada de iconografía de IA, símbolo intacto) y resuelve el
problema central del sitio actual: hoy nada *explica*; en «Plano» todo
recurso gráfico explica algo.

### 2.7 Sistema visual preliminar

| Elemento | Decisión |
|---|---|
| Tema por defecto | **Claro** (marfil). El oscuro sigue siendo completo y se elige con el interruptor o por el sistema. Razón: el oscuro + lima + glass era la causa principal de la lectura «startup de IA». |
| Superficies | `surface` (marfil / deep-900), `surface-2` (papel / deep-700), **`inverse`** (Deep en los dos temas: hero y bandas de capítulo) |
| Tarjeta | plana: `border-line` 1 px, `rounded-card` (1 rem), sin desenfoque |
| Lima | cotas, marca del vértice, un botón primario sobre Deep, foco de teclado. Nunca texto sobre marfil (`text-accent` sigue resolviendo a Deep en claro). |
| Retícula | fondo de papel técnico a 4 rem, opacidad 4 %, solo en hero y aperturas |
| Diagramas | SVG propios en `components/diagrams.tsx`, `currentColor`, trazo 1–1,5, dibujado con CSS `stroke-dashoffset` |
| Movimiento | entrada CSS; el *reveal* de Motion se mantiene pero **sin desenfoque, 14 px y 0,5 s**, y el contenido nunca arranca invisible en el primer viewport |
| Escala | se conservan los tokens (`mega`, `display`, `headline`, `subhead`, `lede`); el hero usa `display`, no `mega` |
| Botones | `solid` (Deep sobre claro / marfil sobre Deep), `lime` (solo sobre Deep), `outline` |
| Etiquetas | `.label` se conserva; se añade `.cota` (mono 11 px con tick) |

---

## ENTREGABLE 3 — DESARROLLO

### 3.1 Qué se construyó

| Pieza | Archivos | Qué cambió |
|---|---|---|
| **Contenido** | `src/content/site.ts` | `hero` nuevo (titular + definición), `manifesto` con el mensaje central del brief, `dimensions` (4), `problems` (6 situaciones en voz del cliente), `solutions` (5, con problema / qué hacemos / qué obtiene / cómo empezar / servicios), `sectors` ampliados (pregunta, oportunidades, demos), `contact` con «qué pasa después» y compromisos, `nav` + `navCta`. Los 8 `services`, `phases`, `method`, `about`, `homeFaqs` y `testimonials` se conservan intactos. |
| **Sistema visual** | `src/app/globals.css` | Tema claro por defecto; `inverse` (superficie de declaración); `card` plana; `cota`; `paper-grid`; animaciones `enter` sin desenfoque y `draw` para diagramas; `glass`/`panel` como alias, `glow` no-op. |
| **Diagramas** | `src/components/diagrams.tsx` (nuevo) | `TransformDiagram` (hero), `SolutionGlyph` ×5, `BeforeAfter`. SVG propio, `currentColor`, lima solo en el trazo que se mide, trazado con CSS. |
| **Primitivas** | `src/components/ui.tsx` | `Section` (tono `deep` = `inverse`), `SectionHead` con cota y regla, `Cota`, `Card`, `Button` (`solid`/`lime`/`outline`, dos tamaños), `PageHero` sobre papel técnico, `CtaBand` con acción secundaria, `FaqList` como lista numerada, `NumberedList`. |
| **Navegación** | `nav.tsx`, `footer.tsx` | Cinco secciones + «Hablemos»; pie con soluciones, servicios y la firma. |
| **Home** | `sections/hero, que-hacemos, problemas, soluciones, metodo, sectores, confianza, testimonios, preguntas` + `page.tsx` | Nueve bloques en la secuencia definida. Eliminados: `capacidades` (catálogo de tecnologías), `productos`, `manifiesto`, `nosotros`, `contacto` (pasó a `/contacto`), `vertex-art` (telones y glows). Testimonios de ejemplo fuera de la portada. |
| **Páginas nuevas** | `app/soluciones`, `app/sectores`, `app/contacto` | Soluciones por necesidad; sectores con oportunidades y demos; contacto con formulario, canales y pasos. |
| **Páginas re-vestidas** | `enfoque`, `servicios`, `servicios/[slug]`, `nosotros`, `recursos`, `recursos/[slug]`, `radiografia`, `marca` | Tarjeta plana, cotas, sin bandas oscuras alternas. En servicios la **necesidad va antes que la marca** (H1 = `keyword`). `/marca` documenta el sistema «Plano». |
| **Motion** | `motion.tsx` | *Reveal* de 14 px, 0,5 s, sin desenfoque. |
| **Formulario** | `contact-form.tsx` | Botón `solid`; sin resplandor. Lógica intacta (`lead.ts`). |
| **Bot** | `scripts/build-kb.ts`, `lib/chat-format.ts` | El conocimiento incluye soluciones, dimensiones y situaciones; el chat enlaza `/soluciones`, `/sectores`, `/contacto`. |
| **SEO** | `sitemap.ts`, `layout.tsx`, `opengraph-image.tsx`, `seo.ts` | Tres rutas nuevas en el sitemap; título por defecto y OG con la definición de la firma. |
| **Pruebas** | `src/content/solutions.test.ts` (nuevo), `package.json` | 10 pruebas nuevas (soluciones, situaciones, sectores→demos, dimensiones, hero sin «gratis», menú). El glob de `npm test` ahora corre en Windows. |
| **Documentación** | `CLAUDE.md`, `DESIGN.md`, `README.md`, este archivo | Reescritos para el sistema nuevo. |

### 3.2 Lo que se conservó a propósito

Los ocho servicios con sus URL, los tres artículos, la Radiografía, los demos,
el chat, el formulario sin backend, el JSON-LD con `@id` único, el interruptor
de tema (ahora claro por defecto) y la regla de no inventar testimonios,
clientes ni cifras.

### 3.3 Cómo ejecutar

```bash
git checkout redesign/auren-v2
npm install
npm run dev        # http://localhost:3000
npm test           # 101 pruebas
npm run build      # build de producción
npm run build:kb   # requiere ../bot-page; regenera el conocimiento del bot
```

---

## ENTREGABLE 4 — VALIDACIÓN

### 4.1 Pruebas

| Verificación | Resultado |
|---|---|
| `npm test` | **101 / 101** (91 anteriores + 10 nuevas) |
| `npx tsc --noEmit` | sin errores |
| `npm run build` | correcto; 33 rutas estáticas, 11 prerenderizadas por `generateStaticParams` |
| Consola del navegador | sin errores en `/`, `/soluciones`, `/sectores`, `/contacto`, `/enfoque`, `/servicios/auren-flow`, `/nosotros`, `/radiografia`, `/demos/flota`, `/marca` |
| Desbordamiento horizontal en móvil (375 px) | ninguno (`scrollWidth` = `innerWidth`) en `/` y `/soluciones` |
| Menú móvil | abre, lista las cinco secciones y el botón; se cierra al navegar |
| Tema oscuro | completo; el hero y las bandas `inverse` no cambian, el resto reasigna |
| Vistas revisadas | escritorio 1280 px y móvil 375 px, claro y oscuro |

### 4.2 Problemas detectados y corregidos durante la validación

- El hero a 1280 px rompía en cinco líneas: `text-display` bajó a
  `clamp(2.5rem, 5vw, 4.75rem)` y la columna de texto ganó proporción.
- `npm test` ejecutaba 0 pruebas en Windows (glob entre comillas simples):
  corregido en `package.json`.
- `scrollIntoView` a anclas desde el menú y las tarjetas exigía
  `scroll-mt-20` en las secciones nuevas: añadido.
- Los archivos del repositorio mezclan CRLF y LF; los parches respetan el final
  de línea de cada archivo.

### 4.3 Evaluación

| Criterio | Peso | Nota | Justificación |
|---|---:|---:|---|
| Claridad del posicionamiento y propuesta de valor | 20 | **18** | El H1 dice qué es Auren y para qué sirve; las cuatro dimensiones y el mensaje central están en la segunda pantalla; la oferta se lee por necesidad. Falta la prueba social que ninguna redacción reemplaza. |
| Calidad visual y dirección artística | 20 | **17** | Sistema propio y coherente (plano, cotas, diagramas, una superficie de declaración), sin plantilla reconocible. Resta la ausencia de fotografía real y que los glifos de solución piden una segunda iteración con un ilustrador. |
| Experiencia de usuario | 15 | **13** | Entrada por problema, menú de cinco, contacto con «qué pasa después», contenido visible sin esperar animaciones. La home sigue siendo larga (nueve bloques) por exigencia SEO de las FAQ. |
| Comunicación comercial y conversión | 15 | **13** | CTA único y honesto («Hablemos de su empresa»), alternativa de diez minutos, demos como prueba. Sin casos ni testimonios reales el cierre depende de la conversación. |
| Diferenciación de marca | 10 | **9** | Ver · Entender · Transformar como sistema gráfico; nadie en el segmento se presenta con un plano. |
| Diseño responsive | 10 | **9** | Sin desbordamientos; rejillas que colapsan bien; menú nativo. El chat y el botón «subir» se superponen al CTA en pantallas muy bajas. |
| Calidad técnica y rendimiento | 10 | **9** | Todo estático, sin dependencias nuevas, diagramas en SVG inline, pruebas ampliadas. El *reveal* de Motion sigue dependiendo de JavaScript (cubierto por `<noscript>`). |
| **Total** | **100** | **88** | |

### 4.4 Oportunidades de mejora restantes

1. **Fotografía real** de los socios y de dos o tres operaciones (ver
   `IMAGENES.md`): es la pieza de confianza que más falta hace.
2. **Primer caso medido** → página de casos con el patrón de `posts`.
3. **Testimonios reales** con nombre y cargo: la sección aparece sola.
4. Segunda iteración de los **glifos de solución** con dirección de arte.
5. Un **vídeo de 60 s** del diagrama de transformación para redes.
6. Analítica respetuosa (sin cookies, fuera de `/radiografia`) para medir la
   conversión real del nuevo CTA.

### 4.5 Información comercial pendiente (no inventada)

- Nombres de servicio Data, Flow, Vision, Studio y Care: propuestos, no
  confirmados (ya estaba marcado en `site.ts`).
- Duraciones de referencia: rangos de mercado, no compromisos.
- Casos, cifras de resultado y clientes: **no existen todavía** y el sitio no
  los simula.
- Confirmar que «respondemos en un día hábil» es un compromiso que la firma
  quiere asumir (`contact.promises`).

### 4.6 Pendientes del propietario (fuera del código)

1. **Vercel**: invertir la redirección (`www` → ápice) o cambiar `site.domain`
   a `www`. Hoy producción contradice la canónica.
2. **Confirmar de dónde se despliega producción**: el sitio publicado tiene un
   conmutador ES/EN que no está en ningún commit de este repositorio.
3. Correr `npm run build:kb` donde exista `../bot-page` y reiniciar el bot.
4. Revisar y aprobar los textos nuevos (hero, soluciones, situaciones,
   contacto) antes de publicar.
5. **No se hizo push ni despliegue.** La rama `redesign/auren-v2` está solo en
   local; `main` y `radiografia-v2` siguen como estaban.

### 4.7 Archivos modificados

Nuevos: `src/components/diagrams.tsx`, `src/components/sections/que-hacemos.tsx`,
`problemas.tsx`, `soluciones.tsx`, `confianza.tsx`, `src/app/soluciones/page.tsx`,
`src/app/sectores/page.tsx`, `src/app/contacto/page.tsx`,
`src/content/solutions.test.ts`, `.claude/launch.json`, `REDISENO-V2.md`.

Reescritos: `globals.css`, `ui.tsx`, `nav.tsx`, `footer.tsx`, `sections/hero.tsx`,
`metodo.tsx`, `sectores.tsx`, `testimonios.tsx`, `preguntas.tsx`, `app/page.tsx`,
`CLAUDE.md`, `DESIGN.md`.

Modificados: `site.ts`, `motion.tsx`, `theme-toggle.tsx`, `contact-form.tsx`,
`radiografia-form.tsx`, `layout.tsx`, `sitemap.ts`, `opengraph-image.tsx`,
`enfoque/page.tsx`, `servicios/page.tsx`, `servicios/[slug]/page.tsx`,
`nosotros/page.tsx`, `recursos/*`, `radiografia/page.tsx`, `marca/page.tsx`,
`scripts/build-kb.ts`, `lib/chat-format.ts`, `package.json`, `README.md`.

Eliminados: `sections/capacidades.tsx`, `productos.tsx`, `manifiesto.tsx`,
`nosotros.tsx`, `contacto.tsx`, `components/vertex-art.tsx`.
