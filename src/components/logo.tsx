/**
 * El Vértice — símbolo de Auren Advisory.
 *
 * Dos trazos que no se tocan: el ascenso profundo y el trazo lima desplazado.
 * El vacío entre ambos es el punto de vista.
 *
 * Fuente única de verdad de la geometría. Cualquier aplicación del símbolo
 * (favicon, OG image, membretes) debe derivarse de estas coordenadas.
 */

const STROKE_ASCENT = "43,8 59,8 33,92 13,92";
const STROKE_SHIFT = "52.5,37 68.5,37 91,92 71,92";

type Tone = "deep" | "invert" | "mono" | "lime-bg";

const TONES: Record<Tone, { ascent: string; shift: string; shiftOpacity?: number }> = {
  deep: { ascent: "#12343B", shift: "#C8F169" },
  invert: { ascent: "#F2F1EA", shift: "#C8F169" },
  mono: { ascent: "currentColor", shift: "currentColor" },
  "lime-bg": { ascent: "#12343B", shift: "#12343B", shiftOpacity: 0.42 },
};

export function Mark({
  size = 40,
  tone = "deep",
  className,
}: {
  size?: number;
  tone?: Tone;
  className?: string;
}) {
  const { ascent, shift, shiftOpacity } = TONES[tone];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <polygon points={STROKE_ASCENT} fill={ascent} />
      <polygon points={STROKE_SHIFT} fill={shift} opacity={shiftOpacity} />
    </svg>
  );
}

/**
 * Lockup completo. `orientation` cubre las versiones horizontal y vertical del
 * manual; el símbolo suelto se usa con <Mark /> directamente.
 */
export function Logo({
  size = 44,
  tone = "deep",
  orientation = "horizontal",
  className = "",
}: {
  size?: number;
  tone?: Tone;
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  const inverted = tone === "invert";
  const vertical = orientation === "vertical";

  return (
    <span
      className={`inline-flex ${
        vertical ? "flex-col items-center gap-5 text-center" : "flex-row items-center gap-4"
      } ${className}`}
    >
      <Mark size={size} tone={tone} />
      <span className={`flex flex-col ${vertical ? "items-center gap-1.5" : "gap-1"}`}>
        <span
          className="wordmark leading-none"
          style={{ fontSize: size * 0.5, color: inverted ? "#F2F1EA" : undefined }}
        >
          AUREN
        </span>
        <span
          className="leading-none"
          style={{
            fontSize: Math.max(8, size * 0.17),
            letterSpacing: "0.46em",
            marginRight: "-0.46em",
            color: inverted ? "#C8F169" : "color-mix(in srgb, #12343B 62%, transparent)",
          }}
        >
          ADVISORY
        </span>
      </span>
      <span className="sr-only">Auren Advisory</span>
    </span>
  );
}
