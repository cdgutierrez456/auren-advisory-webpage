import type { Metadata } from "next";
import { Logo, Mark } from "@/components/logo";
import { Section, SectionHead } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Sistema de identidad",
  description:
    "Manual vivo de la marca Auren Advisory: símbolo El Vértice, versiones, paleta y tipografía.",
};

const palette = [
  { name: "Auren Deep", hex: "#12343B", role: "Base institucional" },
  { name: "Auren Lime", hex: "#C8F169", role: "Acento — máx. 10%" },
  { name: "Auren Black", hex: "#111414", role: "Fondo y texto" },
  { name: "Auren Ivory", hex: "#F2F1EA", role: "Espacio y respiro" },
];

/** Exploraciones del símbolo documentadas en el proceso de diseño. */
const explorations = [
  {
    name: "El Foco",
    note: "Apertura y punto de atención dentro de la A. Excelente favicon.",
    svg: (
      <>
        <polygon points="50,8 92,92 71,92 50,42 29,92 8,92" fill="#12343B" />
        <circle cx="50" cy="76" r="7" fill="#C8F169" />
      </>
    ),
  },
  {
    name: "La Escalera",
    note: "Tres tramos que ascienden: ver, entender, transformar.",
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
    note: "Travesaño lima como línea de decisión. Más literal, muy estable.",
    svg: (
      <>
        <polygon points="43,8 59,8 33,92 13,92" fill="#12343B" />
        <polygon points="52.5,37 68.5,37 91,92 71,92" fill="#12343B" opacity="0.3" />
        <rect x="27" y="60" width="42" height="7" fill="#C8F169" />
      </>
    ),
  },
];

export default function Marca() {
  return (
    <>
      <Section tone="ivory" className="!pb-0 pt-32">
        <div className="flex flex-col gap-10 border-b border-rule pb-14">
          <span className="label text-deep/50">Sistema de identidad</span>
          <h1 className="text-display font-normal text-deep">El Vértice</h1>
          <p className="text-lede max-w-2xl text-pretty text-deep/70">
            La <strong className="font-medium">A</strong> se construye con dos trazos que no
            se tocan: el ascenso profundo y el trazo lima desplazado. El vacío entre ambos es
            el punto de vista.
          </p>
        </div>
      </Section>

      {/* 01 — LOGO PRINCIPAL */}
      <Section tone="ivory">
        <SectionHead index="01" label="Logo principal" />
        <div className="flex justify-center border border-rule bg-paper px-8 py-24 md:py-32">
          <Logo size={132} />
        </div>
        <div className="mt-8 grid gap-8 text-sm leading-relaxed text-deep/70 md:grid-cols-3">
          <p className="text-pretty">
            El desplazamiento sugiere perspectiva y movimiento —observar, luego transformar—
            sin recurrir a iconografía de IA.
          </p>
          <p className="text-pretty">
            Geometría de dos polígonos: legible a 16&nbsp;px, sólida en grabado, bordado y
            señalética.
          </p>
          <p className="text-pretty">
            Área de respeto mínima: la altura del trazo lima en los cuatro costados. El
            símbolo nunca se rota ni se inclina.
          </p>
        </div>
      </Section>

      {/* 02 — VERSIONES */}
      <Section tone="paper">
        <SectionHead index="02" label="Versiones" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Frame label="Horizontal" className="border border-rule bg-ivory">
            <Logo size={64} />
          </Frame>
          <Frame label="Vertical" className="border border-rule bg-ivory">
            <Logo size={64} orientation="vertical" />
          </Frame>
          <Frame label="Fondo oscuro" className="bg-ink text-ivory" invert>
            <Logo size={64} orientation="vertical" tone="invert" />
          </Frame>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Frame label="Símbolo" className="bg-deep text-ivory" invert>
            <Mark size={56} tone="invert" />
          </Frame>
          <Frame label="Monocromo" className="border border-rule bg-ivory text-ink">
            <Mark size={56} tone="mono" />
          </Frame>
          <Frame label="Sobre lima" className="bg-lime text-deep" invert>
            <Mark size={56} tone="lime-bg" />
          </Frame>
          <Frame label="Favicon 48/32/16" className="border border-rule bg-ivory">
            <div className="flex items-end gap-3.5">
              {[48, 32, 16].map((s) => (
                <span
                  key={s}
                  className="flex items-center justify-center bg-deep"
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
        <SectionHead index="03" label="Exploraciones del símbolo" />
        <div className="grid gap-6 md:grid-cols-3">
          {explorations.map((e) => (
            <div
              key={e.name}
              className="flex flex-col items-center gap-9 border border-rule bg-paper px-10 py-14 text-center"
            >
              <svg width="104" height="104" viewBox="0 0 100 100" fill="none" aria-hidden>
                {e.svg}
              </svg>
              <div className="flex flex-col gap-2.5">
                <span className="label text-deep">{e.name}</span>
                <p className="max-w-[15rem] text-xs leading-relaxed text-deep/55">{e.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 — PALETA Y TIPOGRAFÍA */}
      <Section tone="paper">
        <SectionHead index="04" label="Paleta y tipografía" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-9 bg-ink p-10 text-ivory md:p-12">
            <span className="label text-lime">Paleta</span>
            <ul>
              {palette.map((c) => (
                <li
                  key={c.hex}
                  className="flex items-center gap-5 border-b border-rule-invert py-4 last:border-0"
                >
                  <span
                    className="size-11 shrink-0 border border-rule-invert"
                    style={{ background: c.hex }}
                  />
                  <span className="flex-1 text-sm tracking-[0.16em]">{c.name}</span>
                  <span className="hidden text-xs text-ivory/45 sm:block">{c.role}</span>
                  <span className="font-mono text-xs text-ivory/55">{c.hex}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-pretty text-ivory/60">
              El lima ocupa como máximo el 10% de cualquier composición. Sobre marfil nunca se
              usa en texto: solo en forma, regla o trazo del símbolo.
            </p>
          </div>

          <div className="flex flex-col gap-10 border border-rule bg-ivory p-10 md:p-12">
            <span className="label text-deep/50">Tipografía</span>
            <div className="flex flex-col gap-3 border-b border-rule pb-8">
              <span className="label text-deep/40">Sans — Geist</span>
              <p className="text-5xl tracking-tight text-deep">Ver. Entender.</p>
              <p className="text-sm text-deep/60">
                Titulares, interfaz y texto corrido. Precisión, no futurismo.
              </p>
            </div>
            <div className="flex flex-col gap-3 border-b border-rule pb-8">
              <span className="label text-deep/40">Serif — Instrument Serif</span>
              <p className="font-serif text-5xl text-deep">Transformar.</p>
              <p className="text-sm text-deep/60">
                Solo frases estratégicas. Nunca en párrafos ni en interfaz.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="label text-deep/40">Etiquetas de sistema</span>
              <p className="label text-deep">Ver. Entender. Transformar.</p>
              <p className="text-sm text-deep/60">
                11&nbsp;px, tracking .34em, mayúsculas. Índices, secciones y metadatos.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 05 — TARJETA */}
      <Section tone="ivory">
        <SectionHead index="05" label="Aplicaciones" />
        <div className="flex flex-wrap gap-6 border border-rule bg-paper p-10 md:p-14">
          <div className="flex h-[172px] w-[300px] flex-col justify-between bg-deep p-6">
            <Mark size={34} tone="invert" />
            <div className="flex flex-col gap-1.5">
              <span className="wordmark text-xl text-ivory">AUREN</span>
              <span className="text-[8px] tracking-[0.44em] text-lime">ADVISORY</span>
            </div>
          </div>
          <div className="flex h-[172px] w-[300px] flex-col justify-between border border-rule bg-ivory p-6">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-ink">Nombre Apellido</span>
              <span className="label text-deep/60">Director</span>
            </div>
            <div className="flex flex-col gap-1 text-[10px] text-deep/75">
              <span>{site.emails[0]}</span>
              <span>{site.domain}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-[3px] w-5 bg-lime" />
              <span className="text-[8px] tracking-[0.3em] text-deep/70 uppercase">
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
      <span className={`label ${invert ? "opacity-55" : "text-deep/45"}`}>{label}</span>
    </div>
  );
}
