import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Logo, Mark, Wordmark } from "@/components/logo";
import { SolutionGlyph, TransformDiagram } from "@/components/diagrams";
import { Button, Cota, Section, SectionHead } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import type { T } from "@/lib/i18n";

// Manual interno: fuera del menú, del pie, del sitemap y del buscador. Se
// llega por URL. V2.3.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    ...(await pageMetadata(
      t("Sistema de identidad", "Identity system"),
      t(
        "Manual vivo de la marca Auren Advisory: símbolo El Vértice, versiones, paleta, tipografía y el sistema gráfico «Plano».",
        "The living brand manual of Auren Advisory: the El Vértice symbol, versions, palette, typography and the “Plano” graphic system.",
      ),
      "/marca",
    )),
    robots: { index: false, follow: false },
  };
}

const palette = (t: T) => [
  { name: "Auren Ivory", hex: "#F2F1EA", role: t("Superficie de lectura", "Reading surface") },
  { name: "Auren Deep", hex: "#12343B", role: t("Superficie de declaración", "Statement surface") },
  { name: "Auren Black", hex: "#111414", role: t("Texto y tinta", "Text and ink") },
  {
    name: "Auren Lime",
    hex: "#C8F169",
    role: t("Acento — máx. 10%, nunca texto sobre marfil", "Accent — max. 10%, never text on ivory"),
  },
];

/** Exploraciones del símbolo documentadas en el proceso de diseño. */
const explorations = (t: T) => [
  {
    name: "El Foco",
    note: t(
      "Apertura y punto de atención dentro de la A. Excelente favicon.",
      "An opening and a point of focus inside the A. An excellent favicon.",
    ),
    svg: (
      <>
        <polygon points="50,8 92,92 71,92 50,42 29,92 8,92" fill="#12343B" />
        <circle cx="50" cy="76" r="7" fill="#C8F169" />
      </>
    ),
  },
  {
    name: "La Escalera",
    note: t(
      "Tres tramos que ascienden: ver, entender, transformar.",
      "Three rising steps: see, understand, transform.",
    ),
    svg: (
      <>
        <polygon points="43,8 59,8 33,92 13,92" fill="#12343B" />
        <polygon points="52.5,37 68.5,37 74.6,52 57.6,52" fill="#C8F169" />
        <polygon points="59.2,57 76.7,57 82.8,72 64.3,72" fill="#12343B" opacity="0.6" />
        <polygon points="66,77 84.9,77 91,92 71,92" fill="#12343B" />
      </>
    ),
  },
  {
    name: "El Eje",
    note: t(
      "Travesaño lima como línea de decisión. Más literal, muy estable.",
      "A lime crossbar as the line of decision. More literal, very stable.",
    ),
    svg: (
      <>
        <polygon points="43,8 59,8 33,92 13,92" fill="#12343B" />
        <polygon points="52.5,37 68.5,37 91,92 71,92" fill="#12343B" opacity="0.3" />
        <rect x="27" y="60" width="42" height="7" fill="#C8F169" />
      </>
    ),
  },
];

export default async function Marca() {
  const [{ site }, t] = await Promise.all([getContent(), getT()]);
  return (
    <>
      <Section tone="ivory" className="!pb-0 pt-32">
        <div className="flex flex-col gap-10 border-b border-line pb-14">
          <span className="label text-fg/55">{t("Sistema de identidad", "Identity system")}</span>
          <h1 className="text-display font-normal text-fg">El Vértice</h1>
          <p className="text-lede max-w-2xl text-pretty text-fg/75">
            {t(
              <>
                La <strong className="font-medium">A</strong> se construye con dos trazos que no
                se tocan: el ascenso profundo y el trazo lima desplazado. El vacío entre ambos es
                el punto de vista.
              </>,
              <>
                The <strong className="font-medium">A</strong> is built from two strokes that
                never touch: the deep ascent and the offset lime stroke. The gap between them is
                the point of view.
              </>,
            )}
          </p>
        </div>
      </Section>

      {/* 01 — LOGO PRINCIPAL */}
      <Section tone="ivory">
        <SectionHead index="01" label={t("Logo principal", "Primary logo")} />
        <div className="card flex justify-center rounded-card px-8 py-24 md:py-32">
          <Logo size={132} tone="tema" />
        </div>
        <div className="mt-8 grid gap-8 text-sm leading-relaxed text-fg/75 md:grid-cols-3">
          <p className="text-pretty">
            {t(
              "El desplazamiento sugiere perspectiva y movimiento —observar, luego transformar— sin recurrir a iconografía de IA.",
              "The offset suggests perspective and movement —observe, then transform— without resorting to AI iconography.",
            )}
          </p>
          <p className="text-pretty">
            {t(
              "Geometría de dos polígonos: legible a 16\u00a0px, sólida en grabado, bordado y señalética.",
              "Two-polygon geometry: legible at 16\u00a0px, solid in engraving, embroidery and signage.",
            )}
          </p>
          <p className="text-pretty">
            {t(
              "Área de respeto mínima: la altura del trazo lima en los cuatro costados. El símbolo nunca se rota ni se inclina.",
              "Minimum clear space: the height of the lime stroke on all four sides. The symbol is never rotated or slanted.",
            )}
          </p>
        </div>
      </Section>

      {/* 02 — VERSIONES */}
      <Section tone="paper">
        <SectionHead index="02" label={t("Versiones", "Versions")} />
        <div className="grid gap-6 lg:grid-cols-3">
          <Frame label={t("Horizontal — sobre marfil", "Horizontal — on ivory")} className="rounded-card bg-ivory text-ink" invert>
            <Logo size={64} />
          </Frame>
          <Frame label={t("Vertical — sobre marfil", "Vertical — on ivory")} className="rounded-card bg-ivory text-ink" invert>
            <Logo size={64} orientation="vertical" />
          </Frame>
          <Frame label={t("Fondo oscuro", "Dark background")} className="rounded-card bg-ink text-ivory" invert>
            <Logo size={64} orientation="vertical" tone="invert" />
          </Frame>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Frame label={t("Símbolo", "Symbol")} className="rounded-card bg-deep text-ivory" invert>
            <Mark size={56} tone="invert" />
          </Frame>
          <Frame label={t("Monocromo", "Monochrome")} className="rounded-card bg-ivory text-ink" invert>
            <Mark size={56} tone="mono" />
          </Frame>
          <Frame label={t("Sobre lima", "On lime")} className="rounded-card bg-lime text-ink" invert>
            <Mark size={56} tone="lime-bg" />
          </Frame>
          <Frame label="Favicon 48/32/16" className="card rounded-card">
            <div className="flex items-end gap-3.5">
              {[48, 32, 16].map((s) => (
                <span
                  key={s}
                  className="flex items-center justify-center rounded-[0.35rem] bg-deep"
                  style={{ width: s, height: s }}
                >
                  <Mark size={s * 0.62} tone="invert" />
                </span>
              ))}
            </div>
          </Frame>
        </div>
      </Section>

      {/* 03 — EXPLORACIONES */}
      <Section tone="ivory">
        <SectionHead index="03" label={t("Exploraciones del símbolo", "Symbol explorations")} />
        <div className="grid gap-6 md:grid-cols-3">
          {explorations(t).map((e) => (
            <div
              key={e.name}
              className="card flex flex-col items-center gap-9 rounded-card px-10 py-12 text-center"
            >
              <span className="flex items-center justify-center rounded-lg bg-ivory p-6">
                <svg width="104" height="104" viewBox="0 0 100 100" fill="none" aria-hidden>
                  {e.svg}
                </svg>
              </span>
              <div className="flex flex-col gap-2.5">
                <span className="label text-fg">{e.name}</span>
                <p className="max-w-[15rem] text-xs leading-relaxed text-fg/55">{e.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 — PALETA Y TIPOGRAFÍA */}
      <Section tone="paper">
        <SectionHead index="04" label={t("Paleta y tipografía", "Palette and typography")} />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card flex flex-col gap-9 rounded-card p-10 text-fg md:p-12">
            <span className="label text-accent">{t("Paleta", "Palette")}</span>
            <ul>
              {palette(t).map((c) => (
                <li
                  key={c.hex}
                  className="flex items-center gap-5 border-b border-line py-4 last:border-0"
                >
                  <span
                    className="size-11 shrink-0 rounded-lg border border-line"
                    style={{ background: c.hex }}
                  />
                  <span className="flex-1 text-sm tracking-[0.16em]">{c.name}</span>
                  <span className="hidden text-xs text-fg/40 sm:block">{c.role}</span>
                  <span className="font-mono text-xs text-fg/55">{c.hex}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-pretty text-fg/55">
              {t(
                "El marfil es la superficie de lectura y Auren Deep la de declaración: hero, método y cierre. El lima ocupa como máximo el 10% de cualquier composición y sobre marfil nunca se usa en texto: solo en forma, regla, trazo del símbolo o el nodo final de un diagrama.",
                "Ivory is the reading surface and Auren Deep the statement surface: hero, method and closing. Lime takes up at most 10% of any composition and on ivory it is never used for text: only for shape, rule, the symbol's stroke or a diagram's final node.",
              )}
            </p>
          </div>

          <div className="card flex flex-col gap-10 rounded-card p-10 md:p-12">
            <span className="label text-fg/55">{t("Tipografía", "Typography")}</span>
            <div className="flex flex-col gap-3 border-b border-line pb-8">
              <span className="label text-fg/40">Sans — Geist</span>
              <p className="text-5xl tracking-tight text-fg">{t("Ver. Entender.", "See. Understand.")}</p>
              <p className="text-sm text-fg/55">
                {t(
                  "Titulares, interfaz y texto corrido. Precisión, no futurismo.",
                  "Headlines, interface and body text. Precision, not futurism.",
                )}
              </p>
            </div>
            <div className="flex flex-col gap-3 border-b border-line pb-8">
              <span className="label text-fg/40">Serif — Instrument Serif</span>
              <p className="font-serif text-5xl text-fg">{t("Transformar.", "Transform.")}</p>
              <p className="text-sm text-fg/55">
                {t(
                  "Solo frases estratégicas. Nunca en párrafos ni en interfaz.",
                  "Strategic phrases only. Never in paragraphs or interface.",
                )}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="label text-fg/40">{t("Cotas — Geist Mono", "Dimension labels — Geist Mono")}</span>
              <p>
                <Cota className="text-fg">{t("01 — Ver · Entender · Transformar", "01 — See · Understand · Transform")}</Cota>
              </p>
              <p className="text-sm text-fg/55">
                {t(
                  "11\u00a0px mono con tick, como en un plano acotado. Índices de capítulo, metadatos y números de paso. Es la voz técnica del sistema.",
                  "11\u00a0px mono with a tick, as on a dimensioned drawing. Chapter indexes, metadata and step numbers. It's the system's technical voice.",
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 05 — SISTEMA «PLANO» */}
      <Section tone="paper">
        <SectionHead
          index="05"
          label={t("Sistema «Plano»", "The “Plano” system")}
          aside={t("Cada recurso gráfico explica algo", "Every graphic explains something")}
        >
          <h2 className="text-headline text-balance font-normal text-fg">
            {t(
              "Ver. Entender. Transformar. como un plano de obra.",
              "See. Understand. Transform. as a construction drawing.",
            )}
          </h2>
          <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-fg/65">
            {t(
              "La operación se lee como un ingeniero lee un plano: entera, con sus causas y con la solución medida. De ahí salen los recursos del sitio: diagramas de línea, cotas en mono, tarjetas planas con filo de 1 px y una sola superficie de declaración.",
              "The operation is read the way an engineer reads a drawing: whole, with its causes and with the solution measured. That's where the site's resources come from: line diagrams, mono dimension labels, flat cards with a 1 px edge and a single statement surface.",
            )}
          </p>
        </SectionHead>

        <div className="inverse rounded-card p-8 md:p-12">
          <Cota className="text-accent">{t("Diagrama de transformación", "Transformation diagram")}</Cota>
          <TransformDiagram className="mt-8 w-full max-w-3xl text-fg/85" />
          <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-fg/65">
            {t(
              "La operación como es, el vértice y el flujo rediseñado. Trazo de 1,25 px en marfil; el lima marca únicamente el carril que se mide. Se dibuja solo al cargar, sin JavaScript.",
              "The operation as it is, the vertex and the redesigned flow. A 1.25 px ivory stroke; lime marks only the lane being measured. It draws itself on load, without JavaScript.",
            )}
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="card flex flex-col gap-8 rounded-card p-8 md:p-10">
            <Cota className="text-fg/55">{t("Glifos de solución", "Solution glyphs")}</Cota>
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {(["lente", "cadena", "convergencia", "marco", "senal"] as const).map((g) => (
                <li key={g} className="flex flex-col items-start gap-3">
                  <SolutionGlyph kind={g} className="w-full text-fg/85" />
                  <span className="cota text-fg/45">{g}</span>
                </li>
              ))}
            </ul>
            <p className="text-pretty text-sm leading-relaxed text-fg/55">
              {t(
                "Una idea por solución, no un icono: una lente sobre un proceso, una cadena que se acorta, líneas que convergen, un marco a la medida, una señal leída. Nada de cerebros, circuitos ni robots.",
                "One idea per solution, not an icon: a lens over a process, a chain that gets shorter, converging lines, a made-to-measure frame, a signal being read. No brains, circuits or robots.",
              )}
            </p>
          </div>

          <div className="card flex flex-col gap-8 rounded-card p-8 md:p-10">
            <Cota className="text-fg/55">{t("Superficies y botones", "Surfaces and buttons")}</Cota>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="card flex flex-col gap-2 rounded-card p-5">
                <Cota className="text-fg/45">card</Cota>
                <p className="text-sm text-fg/75">
                  {t("Plana, filo de 1 px, radio 1 rem. La única tarjeta.", "Flat, 1 px edge, 1 rem radius. The only card.")}
                </p>
              </div>
              <div className="inverse flex flex-col gap-2 rounded-card p-5">
                <Cota className="text-accent">inverse</Cota>
                <p className="text-sm text-fg/75">
                  {t("Auren Deep en los dos temas. Hero, método y cierre.", "Auren Deep in both themes. Hero, method and closing.")}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contacto" variant="solid">
                Solid
              </Button>
              <Button href="/contacto" variant="outline">
                Outline
              </Button>
              <span className="inverse rounded-card p-3">
                <Button href="/contacto" variant="lime">
                  Lime
                </Button>
              </span>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-fg/55">
              <em className="not-italic text-fg/75">solid</em>{" "}
              {t("invierte la superficie;", "inverts the surface;")}{" "}
              <em className="not-italic text-fg/75">lime</em>{" "}
              {t("va una vez por pantalla y sobre Deep;", "goes once per screen, on Deep;")}{" "}
              <em className="not-italic text-fg/75">outline</em>{" "}
              {t("es la acción secundaria.", "is the secondary action.")}
            </p>
          </div>
        </div>
      </Section>

      {/* 06 — TARJETA */}
      <Section tone="ivory">
        <SectionHead index="06" label={t("Aplicaciones", "Applications")} />
        {/* Las dos caras de la tarjeta de visita.

            Son un ESPECIMEN IMPRESO A ESCALA, no interfaz: 300px representan
            los 85mm reales de una tarjeta. Por eso su tipografía no sale de la
            escala del sitio —a 16px no cabría ni el eslogan— sino de la escala
            de la pieza, declarada UNA vez en `--tarjeta` y derivada en `em`.
            Es la misma excepción que la paleta literal de esta página. */}
        <div className="card flex flex-wrap gap-6 rounded-card p-10 md:p-14">
          <div
            className="flex h-[172px] w-full max-w-[300px] flex-col justify-between rounded-lg bg-deep p-6 text-[length:var(--tarjeta)]"
            style={{ "--tarjeta": "10px" } as React.CSSProperties}
          >
            <Mark size={34} tone="invert" />
            {/* Derivado de `logo.tsx`: el manual no puede enseñar un lockup
                con proporciones distintas a las que el código aplica. */}
            <Wordmark size={40} tone="invert" />
          </div>
          <div
            className="flex h-[172px] w-full max-w-[300px] flex-col justify-between rounded-lg bg-ivory p-6 text-[length:var(--tarjeta)] text-ink"
            style={{ "--tarjeta": "10px" } as React.CSSProperties}
          >
            <div className="flex flex-col gap-1">
              <span className="text-[1.4em] font-semibold text-ink">
                {t("Nombre Apellido", "First Last")}
              </span>
              <span className="text-[0.8em] tracking-[0.34em] text-ink/55 uppercase">Director</span>
            </div>
            <div className="flex flex-col gap-1 text-ink/75">
              <span>{site.emails[0]}</span>
              <span>{site.domain}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-[3px] w-5 bg-lime" />
              <span className="text-[0.8em] tracking-[0.3em] text-ink/75 uppercase">
                {site.tagline}
              </span>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Frame({
  label,
  className = "",
  invert = false,
  children,
}: {
  label: string;
  className?: string;
  invert?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex min-h-[15rem] flex-col items-center justify-between gap-10 p-10 ${className}`}
    >
      <div className="flex flex-1 items-center">{children}</div>
      <span className={`label ${invert ? "opacity-55" : "text-fg/40"}`}>{label}</span>
    </div>
  );
}
