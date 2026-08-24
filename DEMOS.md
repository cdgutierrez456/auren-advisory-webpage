# Catálogo de demos y MVPs

Piezas demostrables para captura de clientes. Cada una se conecta con un
servicio de `src/content/site.ts` — el demo no es un producto aparte, es la
prueba de que el servicio existe.

**Grupo objetivo:** empresas de transporte, entidades públicas (alcaldías,
hospitales, ESE, servicios públicos) y empresas que necesitan agilizar procesos.

---

## Decisión de arquitectura

**No son ocho proyectos: es un shell y ocho rutas.** Mismo Next.js, mismo
design system del sitio, datos sembrados en un JSON, cero backend en la versión
demo.

Toda la visión artificial corre **en el navegador** (webcam + MediaPipe /
tesseract / ONNX-web): sin GPU, sin infraestructura, sin costo por demo, y
funciona en el portátil frente al cliente aunque el WiFi del hospital esté
caído.

---

## Los 3 que se construyen primero

| # | Demo | Segmento | Servicio Auren | Demo vendible | Piloto real |
|---|---|---|---|---|---|
| 1 | Preoperacional digital + vencimientos de flota | Transporte | Auren Flow | 3–4 días | 3–4 sem |
| 2 | PQRSD con control de términos de ley | Alcaldías **y** hospitales | Auren Flow / Studio | 4–5 días | 4–6 sem |
| 3 | Visión en navegador: placas + medidor análogo | Transporte / planta / hospital | Auren Vision | 4–6 días | 4–8 sem |

### 1. Preoperacional digital

Hoy se hace en papel y se archiva en una carpeta que nadie lee. Es exigencia
del PESV / SG-SST: no hay que convencer de la necesidad, solo del cómo.

Móvil, foto, firma, y si falla un ítem crítico el vehículo no sale. Encima va
el tablero de vencimientos (SOAT, tecnomecánica, licencias): dos días más y es
el gancho que cierra la reunión, porque el gerente ve de una vez cuántos
vehículos tiene ilegales rodando.

### 2. PQRSD con semáforo de términos

Un solo build que se vende a alcaldía, hospital, ESE y empresa de servicios
públicos. Todos tienen la misma obligación y el mismo miedo: que se venza el
término.

El demo no es "un formulario": es el **semáforo de días restantes** y quién
responde. Ese tablero rojo/amarillo vende solo.

### 3. Visión en navegador

El "wow" que abre la puerta donde el software puro aburre. Dos modos en la
misma app:

- Lee la placa del carro que entra al patio → tiempos de permanencia sin
  portero anotando.
- Lee un manómetro o un display de 7 segmentos apuntándole con el celular.

El segundo modo es el cruce mecánica ↔ software y aplica igual en planta, en el
tanque de oxígeno del hospital y en la báscula del transportador.

### Bonus de 1 día — Calculadora de costo de la fricción

Va en el sitio actual (`/diagnostico`). El prospecto mete # de personas,
horas/semana en la tarea y salario promedio → sale el costo anual y el mensaje
de WhatsApp ya armado con el número.

Demo de Auren Insight y lead magnet en la misma pieza, reusando `src/lib/lead.ts`
tal cual.

---

## Catálogo completo

Categorías: **A = construir ya** · **B = segunda ola** ·
**C = solo si el cliente paga el piloto**

### Transporte y logística

| Demo | Cat | Servicio | Demo | Piloto | Nota |
|---|---|---|---|---|---|
| Preoperacional digital | **A** | Flow | 3–4 d | 3–4 sem | Requisito legal, hoy en papel |
| Vencimientos SOAT / tecnomecánica / licencias | **A** | Flow | 1–2 d | 1–2 sem | Trivial y el dolor es sanción directa |
| Control de combustible (tanqueo vs km, anomalías) | **A** | Data | 2–3 d | 2–4 sem | Solo tablas. ROI obvio, detecta sifonaje |
| Torre de control de flota (mapa + estado + ETA) | B | Data | 3–5 d | 4–8 sem | Demo con replay simulado; piloto necesita GPS real |
| Lectura de placas en patio (ALPR) | **A** | Vision | 3–4 d | 3–6 sem | Corre en navegador |
| Fatiga / somnolencia del conductor | B | Vision | 3–4 d | 6–10 sem | Demo impresionante; piloto pide hardware en cabina |
| Mantenimiento preventivo por km/horas | B | Flow | 2–3 d | 3–5 sem | |
| Indicadores PESV | B | Data | 3–4 d | 4–6 sem | Se monta encima del preoperacional |
| Verificación de carga completa por foto | C | Vision | 4–5 d | 6–10 sem | Conteo de bultos / estibas |
| Optimización de rutas | C | Studio | — | 8+ sem | Trampa: se ve fácil y no lo es |

### Gobierno (alcaldías, ESE, servicios públicos)

| Demo | Cat | Servicio | Demo | Piloto | Nota |
|---|---|---|---|---|---|
| PQRSD con semáforo de términos | **A** | Flow | 4–5 d | 4–6 sem | Vende a 3 segmentos con un build |
| Reporte ciudadano georreferenciado (huecos, alumbrado) | **A** | Studio | 3–4 d | 3–5 sem | Foto + mapa + estado. Muy visual en reunión |
| Tablero de contratación desde datos abiertos | **A** | Data | 2–3 d | 2–4 sem | **Datos reales sin pedirle nada al cliente** |
| Turnero + aviso por WhatsApp | B | Flow | 2–3 d | 2–4 sem | Reusa el patrón `wa.me` que ya existe |
| Inventario y mantenimiento de alumbrado / parque automotor | B | Flow | 2–3 d | 3–5 sem | |
| Aforo vehicular / peatonal por cámara | B | Vision | 3–4 d | 4–8 sem | Insumo para semaforización y estudios de tránsito |
| Seguimiento del plan de desarrollo | C | Data | 3–4 d | 4–6 sem | Se vende bien, se implementa lento (dato disperso) |

> **El tablero de contratación con datos abiertos es el más subestimado de la
> tabla.** Se construye con información pública: se llega a la reunión
> mostrando el municipio del cliente ya cargado, sin firmar acuerdo de
> confidencialidad ni esperar que alguien mande un Excel. Verificar el dataset
> y su frecuencia de actualización antes de prometer nada.

### Salud (hospitales, ESE, IPS)

| Demo | Cat | Servicio | Demo | Piloto | Nota |
|---|---|---|---|---|---|
| Recordatorio de citas y no-show | **A** | Flow | 2–3 d | 2–4 sem | ROI calculable en la misma reunión |
| Mantenimiento de equipos biomédicos / calibraciones | **A** | Flow | 2–3 d | 3–5 sem | Normativo, hoy en Excel. Cruce biomédico ↔ software |
| Inventario de insumos + vencimientos | **A** | Flow | 2–3 d | 3–5 sem | |
| Validación previa de facturación / RIPS antes de radicar | B | Data | 4–5 d | 6–10 sem | El dolor de las glosas es enorme; la norma cambia, verificar la vigente |
| Ocupación de camas / flujo de pacientes | B | Data | 3–4 d | 4–8 sem | |
| Lectura de manómetro de tanque de oxígeno | **A** | Vision | 2–3 d | 3–5 sem | Comparte motor con el medidor análogo |
| Aforo de sala de espera | B | Vision | 2–3 d | 3–5 sem | Solo conteo agregado, sin identificar a nadie |
| OCR de historia clínica escaneada | C | Vision / Data | 4–6 d | 8+ sem | Dato sensible. Demo **solo** con datos sintéticos |

### Transversal (cualquier empresa)

| Demo | Cat | Servicio | Demo | Piloto | Nota |
|---|---|---|---|---|---|
| Calculadora de costo de la fricción | **A** | Insight | 1 d | — | Va en el sitio actual |
| Extractor de facturas / remesas → Excel | **A** | Data | 3–4 d | 3–6 sem | El clásico que siempre cierra |
| Aprobaciones con trazabilidad y excepciones | **A** | Flow | 3–4 d | 3–5 sem | El demo genérico de Flow |
| Tablero de "una sola versión de la verdad" | B | Data | 3–4 d | 4–8 sem | |
| Asistente interno sobre manuales y procedimientos | B | Studio | 4–5 d | 4–8 sem | Fácil de demostrar, caro de sostener |
| Portal de radicación de facturas de proveedores | B | Studio | 3–4 d | 4–6 sem | |

### Visión artificial y cruce con mecánica

Cinco de estos comparten el mismo motor. Se construye el shell de cámara una
vez y cada modo nuevo son 1–2 días.

| Demo | Cat | Demo | Piloto | Hardware |
|---|---|---|---|---|
| Medidor análogo (manómetro, contador) | **A** | 2–3 d | 3–5 sem | Ninguno |
| Display de 7 segmentos (báscula, equipo viejo) | **A** | 1–2 d | 2–4 sem | Ninguno |
| Placas (ALPR) | **A** | 3–4 d | 3–6 sem | Cámara existente |
| Conteo de piezas / bultos por foto | B | 2–3 d | 4–6 sem | Ninguno |
| Detección de EPP (casco, chaleco) | B | 3–4 d | 4–8 sem | Cámara existente |
| Aforo vehicular / peatonal | B | 3–4 d | 4–8 sem | Cámara existente |
| Nivel en tanque por cámara | B | 2–3 d | 4–6 sem | Ninguno |
| Fatiga del conductor | B | 3–4 d | 6–10 sem | Cámara en cabina |
| Inspección de defectos superficiales | C | 5–7 d | 8–14 sem | Iluminación controlada |
| Termografía / vibración predictiva | C | — | 10+ sem | Cámara térmica o sensores |

> **El de medidores análogos es el mejor negocio oculto de toda la lista.** Hay
> instrumentación de 30 años en cada planta, cada hospital y cada acueducto
> municipal que hoy alguien anota en una planilla tres veces al día. Retrofit
> por cámara: sin cambiar el equipo, sin parar la producción, sin comprar un
> PLC. Es exactamente el argumento de Auren Vision en `site.ts` — no hace falta
> reemplazar cámaras, hace falta procesar bien lo que ya graban.

---

## Lo que no se construye

- **Optimización de rutas** — se ve fácil, es un problema difícil de verdad, y
  el demo bonito no sobrevive al primer dato real. Si sale en una reunión, se
  vende como Blueprint.
- **CRM propio** — el mercado ya lo resuelve. Se vende el proceso, no la
  herramienta.
- **Termografía y vibración** — el hardware cuesta más que lo que factura el
  primer piloto.
- **Reconocimiento facial de personas**, en cualquier segmento.
  Comercialmente pesado, legalmente peor, y contradice el "no dejamos cajas
  negras". Aforo y conteo agregado sí; identificar individuos no.

---

## Advertencias que valen plata

1. **Todos los demos con datos sintéticos.** Especialmente salud: la Ley 1581
   (dato sensible) hace que un demo con datos reales de pacientes sea un
   problema propio, no del cliente.
2. **Verificar la norma antes de imprimirla en material comercial.** Los
   términos de PQRSD, el PESV y la validación de RIPS son argumentos de venta
   fortísimos, pero las resoluciones se mueven. Un dato normativo desactualizado
   en la primera reunión cuesta la credibilidad completa.
3. **Demo ≠ piloto.** Las columnas están separadas a propósito: el demo son
   datos sembrados y cero persistencia; el piloto es multiusuario, auth,
   respaldo y soporte. Cuando el cliente diga "me gusta, arranquemos", ahí entra
   Blueprint — y esa es la venta real.

---

## Plan de 3 semanas

| Semana | Entrega |
|---|---|
| 1 | Shell + preoperacional + vencimientos + calculadora de fricción |
| 2 | PQRSD con semáforo de términos |
| 3 | Shell de cámara: placas + medidor análogo |

Al final: cuatro demos, cobertura de los tres segmentos objetivo, y cada
servicio de `site.ts` con algo real detrás.
