# SEO — qué se hizo, qué falta y qué se decidió no hacer

Respuesta a la auditoría del 29 de agosto de 2026 (Search Console + revisión
on-page). Cada punto de la auditoría aparece aquí con lo que se implementó, y
al final está lo que no se hizo, con la razón.

---

## 1. Canónica www vs no-www — **resuelto en código, falta confirmar en el hosting**

`next.config.ts` redirige con **301 permanente** cualquier ruta de
`www.aurenadv.com` al dominio desnudo, que es a donde ya apuntaban la canónica
y el sitemap.

```ts
has: [{ type: "host", value: "www.aurenadv.com" }] → https://aurenadv.com/:path*
```

> **Acción pendiente suya.** Esa regla la ejecuta el servidor de Next. Si el
> sitio se sirve en Vercel o con `npm start`, ya funciona. Si está detrás de un
> CDN estático (Netlify sin adaptador, S3 + CloudFront, cPanel), hay que
> replicarla allá: la petición nunca llega a Next.
>
> Comprobación, una vez desplegado:
> ```bash
> curl -sI https://www.aurenadv.com/servicios | head -3
> # esperado: HTTP/2 301 · location: https://aurenadv.com/servicios
> ```
>
> Y en Search Console: mantenga la propiedad de dominio, y si tiene una
> propiedad de prefijo de URL con `www`, déjela para vigilar que las
> impresiones migren.

## 2. Contenido delgado — **resuelto**

Cada página de servicio pasó de ~369 palabras a **950–1.100**, con secciones que
además sirven para vender, no solo para el buscador:

| Sección nueva | Qué responde | Dónde se edita |
|---|---|---|
| **Cómo trabajamos** | «¿Y ustedes qué hacen exactamente?» — 4 o 5 pasos con descripción | `services[].steps` |
| **Dónde aplica** | El servicio en el vocabulario de cada industria | `services[].industries` |
| **Qué medimos** | Con qué se demuestra el resultado | `services[].measures` |
| **Preguntas frecuentes** | 4 o 5 objeciones reales, respondidas completas | `services[].faqs` |

La home pasó de ~746 a **~1.450 palabras**, con dos secciones nuevas:
**Sectores** (`sectors`) y **Preguntas frecuentes** (`homeFaqs`). `/servicios`
ganó un bloque «Cómo elegir» que enruta cuatro situaciones típicas al servicio
que corresponde.

Ninguna de esas secciones es relleno: son las preguntas del guion comercial
puestas por escrito. No se inventaron cifras de resultados; `measures` dice
**qué se mide**, no qué se promete.

## 3. Blog / recursos — **creado, con tres artículos reales**

Nueva ruta `/recursos`, enlazada desde la navegación principal, el pie de
página y las páginas de servicio relacionadas.

| Artículo | Búsqueda que persigue | Palabras |
|---|---|---|
| `/recursos/senales-de-que-su-empresa-necesita-automatizacion` | cómo saber si mi empresa necesita automatización | ~1.400 |
| `/recursos/que-es-la-transformacion-digital-para-pymes` | qué es la transformación digital para pymes | ~1.250 |
| `/recursos/software-a-la-medida-o-saas` | software a medida vs saas | ~1.200 |

Son artículos escritos, no plantillas: cada uno responde la pregunta completa y
enlaza a los servicios que la resuelven. Se pueden publicar tal como están.

**Para publicar el siguiente:** una entrada en `posts`, en
`src/content/recursos.ts`. La ruta, el listado, el sitemap, el JSON-LD de
`Article`, las migas de pan y los enlaces desde cada servicio salen solos.
`npm test` verifica que el slug sea único, que los servicios y los artículos
relacionados existan, que la fecha sea válida y que el cuerpo pase de 900
palabras.

Ritmo recomendado por la auditoría: 2 a 4 al mes. Candidatos siguientes, por
orden de valor: **«Cómo elegir un CRM para una pyme colombiana»**, **«Cuánto
cuesta automatizar un proceso»**, **«PESV: qué exige y qué se puede
digitalizar»** (mucha búsqueda, poca competencia buena en español), y **«Cómo
saber si su empresa está lista para inteligencia artificial»**.

## 4. H1 no descriptivo — **resuelto sin romper la marca**

«Ver. Entender. Transformar.» sigue siendo lo primero y al mismo tamaño. Lo que
cambió es que ahora es la **primera línea de un H1 de dos**, y la segunda dice a
qué se dedica la firma:

> **Ver. Entender. Transformar.**
> Consultoría en transformación empresarial, automatización e inteligencia
> artificial para empresas en Colombia.

El mismo patrón se aplicó en `/servicios`, `/enfoque`, `/nosotros` y en cada
página de servicio (nombre de marca + frase descriptiva). Los textos están en
`hero.titleSub`, `method.headline`, `about.headline` y `services[].headline`.

## 5. Schema markup — **resuelto**

Todo el JSON-LD vive en `src/lib/schema.tsx`, con una regla: **la firma se
declara una sola vez** en el layout con un `@id`, y el resto la referencia. Un
bloque de organización repetido en cada página le da al buscador varias
entidades parecidas en vez de una sola con más señales.

| Tipo | Dónde | Qué añade |
|---|---|---|
| `Organization` + `ProfessionalService` | layout, todas las páginas | Dirección, coordenadas, cobertura, `knowsAbout` y catálogo de los 8 servicios |
| `WebSite` | layout | Asocia el dominio a la publicación |
| `Service` | cada página de servicio | Tipo de servicio, entregable, proveedor, público |
| `FAQPage` | home, servicios, artículos | Candidato a resultado enriquecido |
| `BreadcrumbList` | todas las páginas interiores | Ruta visible en el resultado de búsqueda |
| `Article` | cada artículo | Fechas de publicación y actualización, autor, tema |

Las migas de pan son visibles **y** marcadas: el enlace y el JSON-LD salen del
mismo array, así que no se pueden desincronizar. Ninguna pregunta marcada como
`FAQPage` está oculta en un acordeón — están todas visibles en la página, que
es la condición que Google exige.

Verificación tras desplegar: <https://search.google.com/test/rich-results>.

## 6. Imágenes — **el código está listo; faltan los archivos**

El sitio sigue sin `<img>` porque no hay fotografías. La estructura está puesta:
componente `Figura`, campo `image` opcional en servicios, artículos y en la
página de los socios. Mientras el campo no exista no se renderiza nada.

**Ver `IMAGENES.md`**: tiene las doce ranuras con ruta exacta, medidas, peso
máximo, el `alt` sugerido para cada una y el fragmento de código a pegar.

La más importante es la foto de los dos socios en `/nosotros`. Una firma
fundada en 2026 no tiene trayectoria que mostrar; lo que puede mostrar es quién
responde.

## 7. Palabras clave en URLs y títulos — **resuelto en títulos; las URLs se conservan**

Los `<title>` ahora **empiezan por la búsqueda** y terminan por la marca,
porque el buscador corta por la derecha:

```
Automatización de procesos empresariales | Auren Flow — Auren Advisory
Diagnóstico de procesos empresariales | Auren Insight — Auren Advisory
Desarrollo de software a la medida | Auren Studio — Auren Advisory
```

Las URLs `/servicios/auren-flow` **no se cambiaron**, y es una decisión
deliberada: la auditoría misma ofrece esta alternativa. Renombrarlas hoy
obligaría a redirigir las ocho rutas, reiniciaría el poco historial que existe
en Search Console y rompería el sistema de marca completo (`/servicios`, el
pie de página, los demos y el guion comercial nombran los servicios así). El
beneficio de tener la palabra clave en la ruta es real pero menor que el del
título y el H1, que ya se capturó. Donde sí importa —los artículos— las URLs
son descriptivas desde el principio.

`npm test` verifica que ningún `<title>` compuesto se pase de 75 caracteres y
que ninguna meta description pase de 160.

## 8. Fundamentos técnicos — **conservados y ampliados**

Sitemap y robots siguen derivándose de los arrays de contenido; ahora incluyen
`/recursos` y los artículos, con `lastModified` real en estos últimos. Las
prioridades quedaron ordenadas (home 1.0, secciones 0.8, servicios 0.7,
artículos 0.6, `/marca` 0.4).

`/demos` **sigue en `noindex` a propósito**: son piezas de venta con datos
sintéticos que se comparten por enlace directo. No entran al sitemap.

---

## Pendientes que no son de código

En orden de impacto:

1. **Confirmar el 301 de www en el hosting** (punto 1). Es el único hallazgo
   crítico que puede quedar a medias.
2. **Google Business Profile.** Ficha con dirección en Manizales, categoría
   «Consultor de negocios» o «Servicio de consultoría en TI», horario, teléfono
   y las mismas descripciones. Es la vía más rápida a las búsquedas locales
   («empresa de tecnología Manizales»), y hoy no existe. Los datos deben
   coincidir exactamente con los del JSON-LD de `layout.tsx`.
3. **Reenviar el sitemap** en Search Console después del despliegue y pedir
   indexación manual de `/recursos` y de los tres artículos.
4. **Las fotos** (`IMAGENES.md`).
5. **Enlaces entrantes.** Cámara de Comercio de Manizales, universidades de la
   región, gremios sectoriales, medios locales. Un artículo firmado en un medio
   del Eje Cafetero vale más que veinte directorios.
6. **Perfiles sociales.** Cuando existan (LinkedIn de la firma, sobre todo),
   añadirlos al array `sameAs` del JSON-LD en `schema.tsx`. Hoy se omite el
   campo en vez de dejarlo vacío.
7. **Nombres y perfiles de los socios.** Siguen marcados como `PENDIENTE` en
   `site.ts`. Con ellos se puede añadir schema de tipo `Person` vinculado a la
   organización, que es señal directa de E-E-A-T. No se inventaron.

## Lo que se decidió no hacer, y por qué

- **No se creó una página de «Casos de éxito».** La auditoría la pide y tiene
  razón en el principio, pero la firma se fundó en 2026 y no hay resultados
  medidos que publicar. Inventarlos es el tipo de contenido que Google penaliza
  y que además destruye la propuesta de la marca, que es precisamente decir la
  verdad sobre lo que se puede medir. La sección `/demos` ya cumple el papel de
  prueba mientras tanto: son piezas funcionales, honestas sobre su alcance.
  Cuando haya el primer proyecto medido, la página vale la pena y el patrón
  está listo (`posts` sirve tal cual para casos).
- **No se instaló Google Analytics 4.** Es un conflicto real, no un olvido:
  `/radiografia` promete «sin registro» y el diseño no envía nada a ninguna red.
  Un GA4 global rompe esa promesa en la página que la hace. Dos salidas
  razonables: (a) usar solo Search Console, que ya da consultas, impresiones y
  posiciones sin cookies; o (b) instalar analítica en todo el sitio **excepto**
  `/radiografia`. Si prefiere (b), dígalo y se implementa; el sitio no debería
  medir a la gente sin decirlo, así que también haría falta una nota en el pie.
- **No se añadió contenido en inglés.** Duplicaría todo el sitio y exige
  `hreflang` y mantenimiento doble. Vale la pena cuando exista una intención
  comercial fuera de Colombia, no antes.

## Qué vigilar en Search Console

Con seis días de historial, lo que importa las próximas ocho semanas no son los
clics sino la cobertura:

- **Páginas indexadas**: las 18 rutas del sitemap deberían estar indexadas en
  tres o cuatro semanas. Si alguna queda «Descubierta, actualmente sin
  indexar», suele ser señal de contenido delgado.
- **Impresiones de `/recursos/*`**: son las que primero deberían moverse; los
  artículos compiten por búsquedas informativas, mucho menos disputadas que
  «consultoría transformación digital».
- **Consultas nuevas**: si empiezan a aparecer «automatizar procesos», «software
  a la medida» o «diagnóstico de procesos», el cambio de títulos y H1 funcionó.
- **La posición media va a empeorar antes de mejorar**, y es normal: aparecer en
  más búsquedas nuevas en posición 40 baja el promedio que hoy sostienen tres
  búsquedas de marca en posición 2.
