import type { CSSProperties } from "react";
import type { Solution } from "@/content/site";
import { getT } from "@/lib/i18n-server";

/**
 * Sistema gráfico «Plano» — diagramas de línea propios de Auren.
 *
 * Regla: cada recurso gráfico explica algo. Nada de iconografía de IA, nada
 * decorativo. Todo es SVG puro, coloreado con `currentColor` (el contenedor
 * decide el color) y un solo acento: `var(--color-lime)` en el trazo que
 * marca la transformación.
 *
 * Los paths llevan `pathLength={1}` y `data-draw` para que `.draw` en el
 * contenedor los dibuje con CSS al cargar, sin JavaScript. Fuera de `.draw`
 * se ven completos de entrada.
 */

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Vértice en coordenadas del símbolo (logo.tsx), reescalado a un cuadro. */
function Vertice({ x, y, size }: { x: number; y: number; size: number }) {
  const s = size / 100;
  const pts = (p: string) =>
    p
      .split(" ")
      .map((pair) => {
        const [px, py] = pair.split(",").map(Number);
        return `${(x + px * s).toFixed(1)},${(y + py * s).toFixed(1)}`;
      })
      .join(" ");
  return (
    <g data-pop style={i(6)}>
      <polygon points={pts("43,8 59,8 33,92 13,92")} fill="currentColor" />
      <polygon points={pts("52.5,37 68.5,37 91,92 71,92")} fill="var(--color-lime)" />
    </g>
  );
}

/**
 * Diagrama de transformación (hero). Izquierda: la operación como es, nodos
 * y traspasos cruzados. Centro: el vértice. Derecha: el flujo rediseñado,
 * ordenado y medido. Debajo, las tres fases como cotas.
 */
export async function TransformDiagram({ className = "" }: { className?: string }) {
  const t = await getT();
  // Operación enredada: nodos en posiciones fijas (no aleatorias: el dibujo
  // debe ser idéntico en servidor y cliente).
  const chaos = [
    [36, 52],
    [112, 28],
    [78, 118],
    [150, 96],
    [54, 176],
    [132, 182],
    [184, 44],
    [196, 150],
  ];
  const chaosLinks: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 5],
    [4, 5],
    [1, 6],
    [6, 3],
    [3, 7],
    [5, 7],
    [0, 3],
    [1, 5],
  ];
  // Flujo ordenado: tres carriles, de izquierda a derecha.
  const lanes = [60, 112, 164];
  const cols = [400, 460, 520, 580];

  return (
    <svg
      viewBox="0 0 640 300"
      fill="none"
      aria-hidden="true"
      className={`draw ${className}`}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Marco de plano */}
      <rect x="8" y="8" width="226" height="212" rx="6" stroke="currentColor" opacity="0.3" />
      <rect x="376" y="8" width="256" height="212" rx="6" stroke="currentColor" opacity="0.3" />

      {/* Operación como es */}
      <g opacity="0.75">
        {chaosLinks.map(([a, b], k) => (
          <path
            key={k}
            d={`M ${chaos[a][0] + 8} ${chaos[a][1] + 8} L ${chaos[b][0] + 8} ${chaos[b][1] + 8}`}
            stroke="currentColor"
            pathLength={1}
            data-draw
            style={i(k % 5)}
          />
        ))}
        {chaos.map(([x, y], k) => (
          <circle
            key={k}
            cx={x + 8}
            cy={y + 8}
            r="5"
            fill="var(--color-surface)"
            stroke="currentColor"
            data-pop
            style={i(k % 5)}
          />
        ))}
      </g>

      {/* El vértice: por donde pasa todo */}
      <path d="M 234 114 H 268" stroke="currentColor" pathLength={1} data-draw style={i(5)} />
      <Vertice x={272} y={78} size={72} />
      <path
        d="M 344 114 H 376"
        stroke="var(--color-lime)"
        strokeWidth={2}
        pathLength={1}
        data-draw
        style={i(7)}
      />

      {/* Flujo rediseñado */}
      {lanes.map((y, row) => (
        <g key={row}>
          <path
            d={`M ${cols[0]} ${y} H ${cols[3]}`}
            stroke={row === 1 ? "var(--color-lime)" : "currentColor"}
            strokeWidth={row === 1 ? 2 : 1.25}
            pathLength={1}
            data-draw
            style={i(8 + row)}
          />
          {cols.map((x, c) => (
            <circle
              key={c}
              cx={x}
              cy={y}
              r="5"
              fill={row === 1 && c === 3 ? "var(--color-lime)" : "var(--color-surface)"}
              stroke={row === 1 ? "var(--color-lime)" : "currentColor"}
              data-pop
              style={i(9 + c)}
            />
          ))}
        </g>
      ))}
      {/* Punta de flecha en el carril medido */}
      <path
        d="M 596 104 L 608 112 L 596 120"
        stroke="var(--color-lime)"
        strokeWidth={2}
        pathLength={1}
        data-draw
        style={i(13)}
      />

      {/* Cotas: las tres fases */}
      <g fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="currentColor">
        <path d="M 12 250 V 258 H 230 V 250" stroke="currentColor" opacity="0.55" pathLength={1} data-draw style={i(10)} />
        <text x="12" y="282">{t("01 · VER", "01 · SEE")}</text>
        <text x="12" y="296" opacity="0.6">{t("LA OPERACIÓN COMO ES", "THE OPERATION AS IT IS")}</text>

        <path d="M 248 250 V 258 H 368 V 250" stroke="currentColor" opacity="0.55" pathLength={1} data-draw style={i(11)} />
        <text x="248" y="282">{t("02 · ENTENDER", "02 · UNDERSTAND")}</text>
        <text x="248" y="296" opacity="0.6">{t("CAUSAS Y COSTO", "CAUSES AND COST")}</text>

        <path d="M 386 250 V 258 H 628 V 250" stroke="currentColor" opacity="0.55" pathLength={1} data-draw style={i(12)} />
        <text x="386" y="282">{t("03 · TRANSFORMAR", "03 · TRANSFORM")}</text>
        <text x="386" y="296" opacity="0.6">{t("SOLUCIÓN OPERANDO Y MEDIDA", "SOLUTION RUNNING, MEASURED")}</text>
      </g>
    </svg>
  );
}

/**
 * Glifos de las cinco soluciones. Mismo cuadro (120×72), mismo trazo. Cada
 * uno es una idea, no un icono: una lente sobre un proceso, una cadena que
 * se acorta, líneas que convergen, un marco a la medida, una señal leída.
 */
export function SolutionGlyph({
  kind,
  className = "",
}: {
  kind: Solution["glyph"];
  className?: string;
}) {
  const common = {
    viewBox: "0 0 120 72",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  const lime = "var(--color-lime)";

  switch (kind) {
    case "lente":
      return (
        <svg {...common}>
          <path d="M 10 54 L 30 30 L 50 46 L 70 22 L 90 40 L 110 18" opacity="0.5" />
          <circle cx="58" cy="36" r="20" stroke={lime} strokeWidth={2} />
          <path d="M 72 50 L 86 64" stroke={lime} strokeWidth={2} />
          <circle cx="30" cy="30" r="3" fill="currentColor" stroke="none" />
          <circle cx="70" cy="22" r="3" fill={lime} stroke="none" />
          <circle cx="90" cy="40" r="3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "cadena":
      return (
        <svg {...common}>
          <path d="M 10 24 H 110" opacity="0.4" strokeDasharray="3 5" />
          {[18, 42, 66, 90].map((x) => (
            <circle key={x} cx={x} cy="24" r="5" opacity="0.4" />
          ))}
          <path d="M 10 50 H 76" stroke={lime} strokeWidth={2} />
          <circle cx="18" cy="50" r="5" fill="var(--color-surface-2)" />
          <circle cx="46" cy="50" r="5" fill="var(--color-surface-2)" />
          <circle cx="76" cy="50" r="5" fill={lime} stroke={lime} />
          <path d="M 84 50 H 108 M 100 42 L 108 50 L 100 58" stroke={lime} strokeWidth={2} />
        </svg>
      );
    case "convergencia":
      return (
        <svg {...common}>
          {[12, 26, 40, 54].map((y, k) => (
            <path key={y} d={`M 10 ${y} C 40 ${y}, 50 36, 72 36`} opacity={0.35 + k * 0.12} />
          ))}
          <circle cx="72" cy="36" r="6" fill="var(--color-surface-2)" stroke={lime} strokeWidth={2} />
          <path d="M 80 36 H 100" stroke={lime} strokeWidth={2} />
          <rect x="100" y="20" width="12" height="32" rx="1" stroke={lime} strokeWidth={2} />
          <path d="M 104 46 V 30 M 108 46 V 38" stroke={lime} strokeWidth={2} />
        </svg>
      );
    case "marco":
      return (
        <svg {...common}>
          <rect x="14" y="10" width="92" height="52" rx="3" opacity="0.4" strokeDasharray="4 4" />
          <rect x="26" y="20" width="56" height="34" rx="2" stroke={lime} strokeWidth={2} />
          <path d="M 26 30 H 82" stroke={lime} strokeWidth={2} />
          <path d="M 34 40 H 60 M 34 47 H 50" opacity="0.6" />
          <path d="M 90 20 V 54 M 86 20 H 94 M 86 54 H 94" opacity="0.6" />
        </svg>
      );
    case "senal":
      return (
        <svg {...common}>
          <circle cx="30" cy="36" r="16" opacity="0.5" />
          <path d="M 30 36 L 40 26" stroke={lime} strokeWidth={2} />
          <circle cx="30" cy="36" r="2" fill={lime} stroke="none" />
          <path d="M 50 36 H 64" opacity="0.5" />
          <path d="M 64 48 L 72 28 L 80 44 L 88 24 L 96 40 L 110 40" stroke={lime} strokeWidth={2} />
          <path d="M 64 56 H 110" opacity="0.35" />
        </svg>
      );
  }
}

/**
 * Antes / después de un proceso: cinco pasos con dos traspasos manuales que
 * desaparecen. Ilustra «simplificar antes de automatizar».
 */
export function BeforeAfter({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <g fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.12em" fill="currentColor" stroke="none">
        <text x="0" y="12" opacity="0.6">ANTES</text>
        <text x="0" y="82" opacity="0.6">DESPUÉS</text>
      </g>
      <path d="M 10 36 H 310" opacity="0.4" />
      {[10, 70, 130, 190, 250, 310].map((x, k) => (
        <circle key={x} cx={x} cy="36" r="5" fill="var(--color-surface-2)" opacity={k === 2 || k === 4 ? 0.45 : 1} />
      ))}
      <path d="M 124 22 L 136 50 M 136 22 L 124 50 M 244 22 L 256 50 M 256 22 L 244 50" opacity="0.55" />
      <path d="M 10 106 H 310" stroke="var(--color-lime)" strokeWidth={2} />
      {[10, 85, 160, 235].map((x) => (
        <circle key={x} cx={x} cy="106" r="5" fill="var(--color-surface-2)" stroke="var(--color-lime)" strokeWidth={2} />
      ))}
      <circle cx="310" cy="106" r="5" fill="var(--color-lime)" stroke="var(--color-lime)" />
    </svg>
  );
}
