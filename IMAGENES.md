# Imágenes — qué hace falta y cómo se agrega

El sitio hoy no tiene una sola etiqueta `<img>`. Eso le cuesta tres cosas: el
tráfico de Google Imágenes, las señales temáticas que da un `alt` bien escrito,
y —lo más importante para vender— la prueba de que detrás hay operaciones
reales y no un catálogo de servicios genérico.

El código ya está listo. Cada ranura es un campo opcional: **mientras el campo
no exista, la página no renderiza nada y nada se rompe.** Poner una imagen es
crear el archivo y añadir seis líneas al contenido.

---

## Cómo se agrega una imagen (el procedimiento completo)

**1. Prepare el archivo.** Formato **WebP**, calidad 80. Máximo **200 KB**.
Las medidas de cada ranura están en las tablas de abajo.

```bash
# Con cwebp (brew install webp) — el redimensionado va primero
cwebp -q 80 -resize 1600 0 original.jpg -o auren-flow.webp
```

**2. Guárdelo** en la ruta exacta que indica la tabla, dentro de `public/`.
`public/images/servicios/auren-flow.webp` se sirve como
`https://aurenadv.com/images/servicios/auren-flow.webp`.

**3. Añada el campo** en el contenido. Para un servicio, dentro de su entrada en
`src/content/site.ts`, en cualquier punto del objeto:

```ts
    image: {
      src: "/images/servicios/auren-flow.webp",
      alt: "Operaria registra una orden de producción en una tableta junto a la línea de empaque",
      caption: "Automatización de un flujo de producción en planta, Manizales.",
      width: 1600,
      height: 1000,
    },
```

`width` y `height` son las medidas **reales** del archivo. No son decorativas:
sin ellas el navegador no reserva el espacio, la página salta al cargar y eso
degrada el Core Web Vital de estabilidad visual (CLS), que sí pesa en el
posicionamiento.

**4. `npm run build`.** Si la ruta está mal, la imagen no aparece; el build no
falla. Verifíquelo en `npm run dev`.

---

## Reglas de marca que aplican a las fotos

Vienen del brief y no son negociables:

- **Nada de iconografía de IA.** Cerebros, circuitos, robots, hologramas, ojos,
  bombillos, manos tocando pantallas azules flotantes. Ninguna. La marca es
  tecnológica por precisión, no por iconos.
- **Nada de stock genérico.** Una sala de juntas sonriente de banco de imágenes
  comunica exactamente lo contrario de lo que dice el sitio. Si la única opción
  es stock, es mejor dejar la ranura vacía.
- **Operación real, gente real, sitio real.** Planta, bodega, mostrador, taller,
  puesto de facturación. Preferible una foto imperfecta de una operación de
  verdad que una perfecta de otra empresa.
- **Consentimiento por escrito** de las personas identificables y autorización
  del cliente para mostrar sus instalaciones. Sin eso, la foto no se publica.
- El lima (`#C8F169`) no se estampa sobre las fotos. El acento vive en las
  reglas, los trazos y los fondos oscuros, no encima de la imagen.

## Cómo se escribe el `alt`

El `alt` describe lo que se ve, para quien no puede verlo. Que además contenga
la palabra clave es consecuencia de describir bien, no el objetivo.

- **Bien:** «Conductor firma la inspección preoperacional en el celular antes de
  salir del patio de la flota».
- **Mal:** «automatización de procesos empresariales Colombia transformación
  digital» — relleno de palabras clave; Google lo detecta y perjudica.
- **Mal:** «imagen1», «foto», o `alt` vacío en una imagen con contenido.

Entre 8 y 20 palabras. Sin «imagen de» ni «foto de»: el lector de pantalla ya
anuncia que es una imagen.

---

## Ranuras disponibles

### 1. Servicios — 8 imágenes

**Campo:** `image` en cada entrada de `services`, en `src/content/site.ts`
**Medidas:** 1600 × 1000 px (16:10) · **Ruta:** `public/images/servicios/<slug>.webp`
**Dónde sale:** bajo los párrafos de apertura de la página del servicio.

| Archivo | Qué debe mostrar | `alt` sugerido |
|---|---|---|
| `auren-insight.webp` | Consultor y personal de operación recorriendo un proceso en sitio, con libreta. No una reunión de junta. | Consultor de Auren recorre la línea de producción junto al jefe de planta durante un diagnóstico de procesos |
| `auren-blueprint.webp` | Un diagrama de proceso real sobre mesa o tablero, con anotaciones a mano. | Diagrama del proceso objetivo anotado a mano durante la sesión de diseño de la hoja de ruta |
| `auren-transform.webp` | Equipo del cliente usando la solución nueva en su puesto de trabajo. | Equipo administrativo usa la nueva herramienta de gestión en su puesto durante la capacitación |
| `auren-data.webp` | Pantalla de tablero de gerencia real (con datos borrosos o de demo), no un gráfico de stock. | Tablero de indicadores de producción y costo por lote proyectado en el comité de gerencia |
| `auren-flow.webp` | El momento del traspaso que se eliminó: alguien firmando o aprobando en el móvil. | Supervisor aprueba una solicitud desde el celular en la bodega, sin pasar por correo |
| `auren-vision.webp` | Cámara instalada apuntando a una línea, o pantalla con la detección sobrepuesta. | Cámara de inspección instalada sobre la línea de empaque para verificación automática de etiquetado |
| `auren-studio.webp` | Pantalla de la herramienta a medida en uso, o dos personas revisando la interfaz. | Pantalla de la herramienta de programación de rutas desarrollada a la medida para la operación |
| `auren-care.webp` | Revisión trimestral: pantalla de monitoreo o reunión de seguimiento con cifras. | Revisión trimestral de indicadores de las automatizaciones en operación con el equipo del cliente |

> Si solo puede conseguir tres, priorice **Insight**, **Flow** y **Vision**: son
> los servicios con más volumen de búsqueda y los que más se benefician de
> mostrar una operación real.

### 2. Artículos — 3 imágenes

**Campo:** `image` en cada entrada de `posts`, en `src/content/recursos.ts`
**Medidas:** 1600 × 900 px (16:9) · **Ruta:** `public/images/recursos/<slug>.webp`
**Dónde sale:** al inicio del cuerpo del artículo. Lleva `priority`, así que
cárguela liviana: es la imagen más grande de la vista inicial.

| Archivo | Qué debe mostrar | `alt` sugerido |
|---|---|---|
| `senales-de-que-su-empresa-necesita-automatizacion.webp` | El síntoma: escritorio con dos pantallas y una planilla en papel al lado. | Puesto de trabajo con datos copiándose a mano entre un sistema y una hoja de cálculo |
| `que-es-la-transformacion-digital-para-pymes.webp` | Una pyme real de la región: taller, planta pequeña, bodega. | Operación de una empresa mediana del Eje Cafetero durante la jornada de producción |
| `software-a-la-medida-o-saas.webp` | Comparación visual honesta: dos pantallas, o un tablero con la decisión. | Comparación de alternativas de software durante la sesión de diseño de la solución |

Un diagrama vectorial propio funciona igual de bien que una foto en estos tres,
y es más fácil de conseguir. Si lo hace, expórtelo a WebP con fondo marfil
(`#F2F1EA`) y sin degradados.

### 3. Los socios — 1 imagen (la más importante)

**Campo:** `about.photo` en `src/content/site.ts`
**Medidas:** 1600 × 1200 px (4:3) · **Ruta:** `public/images/nosotros/socios.webp`
**Dónde sale:** en `/nosotros`, bajo el relato del origen.

```ts
  photo: {
    src: "/images/nosotros/socios.webp",
    alt: "Los dos socios fundadores de Auren Advisory en su oficina de Manizales",
    caption: "Manizales, 2026.",
    width: 1600,
    height: 1200,
  },
```

Retrato de los dos socios, luz natural, en un lugar reconocible de Manizales o
en la oficina. Sin traje de estudio y sin fondo blanco de banco de imágenes: la
propuesta de la firma es que entran a la operación, y la foto debería
parecerse a eso.

Es la imagen que más rinde de toda la lista. Una consultora fundada en 2026 no
tiene trayectoria que mostrar; lo que puede mostrar es quién responde.

---

## Lo que **no** hay que hacer

- **No hay que crear la imagen para compartir en redes.** Se genera sola en
  `src/app/opengraph-image.tsx` con la marca y el eslogan, para todas las
  páginas. Ya funciona.
- **No hay que tocar el favicon.** `src/app/icon.svg` está resuelto.
- **No hay que comprimir a mano para varios tamaños.** `next/image` genera las
  variantes y sirve la que corresponda a cada pantalla; por eso el archivo se
  sube en el tamaño grande y una sola vez.

## Verificación después de subirlas

```bash
npm run build && npm start          # y revisar la página en el navegador
ls -lh public/images/**/*.webp      # ninguna debería pasar de 200 KB
```

Y una revisión manual que ninguna herramienta hace: leer los `alt` en voz alta
con los ojos cerrados. Si no se entiende qué hay en la foto, el `alt` está mal
escrito, por muchas palabras clave que tenga.
