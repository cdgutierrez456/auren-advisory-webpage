import type { ReactNode } from "react";

/**
 * Láminas: ilustraciones de línea sobre fondo Auren Deep para las tarjetas
 * que no tienen fotografía. Mismo trazo que los diagramas (1,5 px, marfil),
 * lima solo en el elemento que cambia. Cada lámina es una escena reconocible
 * —una planta, un patio de camiones, una ventanilla— dibujada con geometría
 * simple, sin iconografía de IA.
 *
 * Son `aria-hidden`: el nombre de la tarjeta ya dice qué es.
 */

export type LaminaKind =
  | "lente"
  | "cadena"
  | "convergencia"
  | "marco"
  | "senal"
  | "manufactura"
  | "transporte"
  | "servicios"
  | "publico";

const INK = "#F2F1EA";
const LIME = "#C8F169";

function Frame({ id, children }: { id: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="h-full w-full"
      fill="none"
      stroke={INK}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#12343B" />
          <stop offset="1" stopColor="#071518" />
        </linearGradient>
        <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 H 0 V 40" stroke={INK} strokeOpacity="0.07" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} stroke="none" />
      <rect width="400" height="300" fill={`url(#${id}-grid)`} stroke="none" />
      {children}
    </svg>
  );
}

export function Lamina({ kind }: { kind: LaminaKind }) {
  switch (kind) {
    case "lente":
      return (
        <Frame id="lente">
          <g strokeOpacity="0.45">
            <path d="M40 220 L110 120 L180 190 L250 90 L320 160 L380 70" />
            <path d="M60 90 L140 200 L230 120 L300 230" />
          </g>
          {[
            [110, 120],
            [180, 190],
            [250, 90],
            [320, 160],
            [140, 200],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#12343B" />
          ))}
          <circle cx="215" cy="150" r="78" stroke={LIME} strokeWidth="2.5" />
          <path d="M270 205 L330 265" stroke={LIME} strokeWidth="3" />
          <circle cx="250" cy="90" r="6" fill={LIME} stroke="none" />
          <path d="M215 72 V 86 M215 214 V 228 M137 150 H 151 M279 150 H 293" stroke={LIME} strokeOpacity="0.8" />
        </Frame>
      );
    case "cadena":
      return (
        <Frame id="cadena">
          <path d="M30 110 H 370" strokeOpacity="0.35" strokeDasharray="4 8" />
          {[60, 130, 200, 270, 340].map((x) => (
            <g key={x} strokeOpacity="0.45">
              <rect x={x - 18} y="86" width="36" height="48" rx="3" />
              <path d={`M${x - 9} 100 H ${x + 9} M${x - 9} 110 H ${x + 9} M${x - 9} 120 H ${x + 2}`} />
            </g>
          ))}
          <path d="M120 80 L140 140 M140 80 L120 140 M260 80 L280 140 M280 80 L260 140" strokeOpacity="0.6" />
          <path d="M30 210 H 300" stroke={LIME} strokeWidth="2.5" />
          {[60, 150, 240].map((x) => (
            <g key={x} stroke={LIME} strokeWidth="2">
              <rect x={x - 18} y="186" width="36" height="48" rx="3" fill="#12343B" />
              <path d={`M${x - 9} 200 H ${x + 9} M${x - 9} 210 H ${x + 9} M${x - 9} 220 H ${x + 2}`} />
            </g>
          ))}
          <circle cx="330" cy="210" r="16" fill={LIME} stroke="none" />
          <path d="M322 210 L328 216 L339 204" stroke="#12343B" strokeWidth="2.5" />
        </Frame>
      );
    case "convergencia":
      return (
        <Frame id="convergencia">
          {[60, 110, 160, 210].map((y, k) => (
            <g key={y} strokeOpacity={0.4 + k * 0.1}>
              <rect x="30" y={y - 14} width="60" height="28" rx="3" />
              <path d={`M90 ${y} C 150 ${y}, 170 150, 220 150`} />
            </g>
          ))}
          <circle cx="220" cy="150" r="9" fill="#12343B" stroke={LIME} strokeWidth="2.5" />
          <path d="M229 150 H 262" stroke={LIME} strokeWidth="2.5" />
          <path d="M270 230 H 370" strokeOpacity="0.5" />
          {[
            [280, 70],
            [305, 110],
            [330, 50],
            [355, 90],
          ].map(([x, h], k) => (
            <rect
              key={x}
              x={x}
              y={230 - h}
              width="16"
              height={h}
              rx="2"
              fill={k === 2 ? LIME : "none"}
              stroke={k === 2 ? LIME : INK}
              strokeWidth={k === 2 ? 2 : 1.5}
            />
          ))}
        </Frame>
      );
    case "marco":
      return (
        <Frame id="marco">
          <g strokeOpacity="0.35" strokeDasharray="5 6">
            <rect x="40" y="50" width="300" height="200" rx="6" />
          </g>
          <g strokeOpacity="0.5">
            <rect x="70" y="80" width="200" height="140" rx="4" />
            <path d="M70 100 H 270" />
            <circle cx="82" cy="90" r="2.5" fill={INK} stroke="none" />
            <circle cx="92" cy="90" r="2.5" fill={INK} stroke="none" />
          </g>
          <rect x="130" y="120" width="220" height="150" rx="4" fill="#12343B" stroke={LIME} strokeWidth="2.5" />
          <path d="M130 140 H 350" stroke={LIME} strokeWidth="2" />
          <g strokeOpacity="0.7">
            <path d="M150 165 H 260 M150 185 H 300 M150 205 H 230" />
            <rect x="150" y="225" width="70" height="24" rx="12" fill={LIME} stroke="none" />
          </g>
          <path d="M365 120 V 270 M359 120 H 371 M359 270 H 371" strokeOpacity="0.6" />
        </Frame>
      );
    case "senal":
      return (
        <Frame id="senal">
          <circle cx="130" cy="160" r="70" strokeOpacity="0.6" />
          <path
            d="M80 200 A 70 70 0 1 1 180 200"
            strokeOpacity="0.4"
            strokeDasharray="2 10"
          />
          <path d="M130 160 L172 118" stroke={LIME} strokeWidth="3" />
          <circle cx="130" cy="160" r="5" fill={LIME} stroke="none" />
          <g strokeOpacity="0.7">
            <rect x="250" y="60" width="60" height="36" rx="5" />
            <path d="M310 70 L335 60 V 96 L310 86" />
            <path d="M280 96 V 130" />
          </g>
          <path d="M240 118 L205 150" strokeOpacity="0.35" strokeDasharray="3 6" />
          <path d="M230 230 L255 230 L270 200 L285 250 L300 215 L315 230 L370 230" stroke={LIME} strokeWidth="2.5" />
          <path d="M230 260 H 370" strokeOpacity="0.35" />
        </Frame>
      );
    case "manufactura":
      return (
        <Frame id="manufactura">
          <path d="M30 120 L80 80 L80 120 L130 80 L130 120 L180 80 L180 120 L230 80 L230 120 L280 80 L280 120 L330 80 L330 120 L370 120" strokeOpacity="0.5" />
          <path d="M30 120 V 250 M370 120 V 250" strokeOpacity="0.5" />
          <path d="M40 215 H 360" />
          <path d="M40 225 H 360" strokeOpacity="0.4" />
          {[70, 110, 150, 190, 230, 270].map((x) => (
            <circle key={x} cx={x} cy="220" r="6" strokeOpacity="0.5" />
          ))}
          {[70, 140, 210].map((x) => (
            <rect key={x} x={x} y="178" width="40" height="34" rx="2" strokeOpacity="0.8" />
          ))}
          <rect x="280" y="178" width="40" height="34" rx="2" stroke={LIME} strokeWidth="2.5" />
          <g strokeOpacity="0.8">
            <rect x="285" y="120" width="34" height="22" rx="3" />
            <path d="M302 142 V 160" />
          </g>
          <path d="M290 160 L300 178 M314 160 L304 178" stroke={LIME} strokeOpacity="0.8" strokeDasharray="2 4" />
        </Frame>
      );
    case "transporte":
      return (
        <Frame id="transporte">
          <path d="M20 150 L90 100 L150 130 L220 80 L300 125 L380 90" strokeOpacity="0.3" />
          <path d="M20 230 H 380" strokeOpacity="0.6" />
          <path d="M20 245 H 380" strokeOpacity="0.25" strokeDasharray="14 12" />
          {[
            [60, 0.5],
            [170, 0.5],
          ].map(([x, o]) => (
            <g key={x} strokeOpacity={o}>
              <rect x={x} y="170" width="70" height="46" rx="3" />
              <path d={`M${Number(x) + 70} 184 H ${Number(x) + 92} L ${Number(x) + 100} 200 V 216 H ${Number(x) + 70}`} />
              <circle cx={Number(x) + 18} cy="220" r="9" fill="#12343B" />
              <circle cx={Number(x) + 82} cy="220" r="9" fill="#12343B" />
            </g>
          ))}
          <g stroke={LIME} strokeWidth="2.5">
            <rect x="280" y="170" width="70" height="46" rx="3" fill="#12343B" />
            <path d="M350 184 H 372 L 380 200 V 216 H 350" />
            <circle cx="298" cy="220" r="9" fill="#12343B" />
            <circle cx="362" cy="220" r="9" fill="#12343B" />
          </g>
          <path d="M305 150 L315 160 L335 140" stroke={LIME} strokeWidth="2.5" />
        </Frame>
      );
    case "servicios":
      return (
        <Frame id="servicios">
          <path d="M40 190 H 240 V 250 H 40 Z" strokeOpacity="0.6" />
          <path d="M40 190 L60 170 H 260 L240 190" strokeOpacity="0.6" />
          <g strokeOpacity="0.5">
            <rect x="270" y="60" width="100" height="90" rx="4" />
            <path d="M270 82 H 370" />
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <circle key={`${r}${c}`} cx={284 + c * 24} cy={98 + r * 20} r="2.5" fill={INK} stroke="none" />
              )),
            )}
          </g>
          <circle cx="332" cy="118" r="7" fill={LIME} stroke="none" />
          <g strokeOpacity="0.7">
            <circle cx="110" cy="100" r="28" />
            <path d="M110 100 V 82 M110 100 L124 108" stroke={LIME} strokeWidth="2.5" />
          </g>
          <path d="M60 210 H 120 M60 224 H 100" stroke={LIME} strokeOpacity="0.8" />
          <path d="M160 140 L200 140" strokeOpacity="0.3" />
        </Frame>
      );
    case "publico":
      return (
        <Frame id="publico">
          <path d="M40 110 L140 60 L240 110 Z" strokeOpacity="0.6" />
          <path d="M50 110 H 230 M50 250 H 230" strokeOpacity="0.6" />
          {[70, 110, 150, 190].map((x) => (
            <path key={x} d={`M${x} 120 V 240`} strokeOpacity="0.5" />
          ))}
          <g strokeOpacity="0.6">
            {[150, 175, 200, 225].map((y, k) => (
              <rect key={y} x={270 + (k % 2) * 6} y={y} width="90" height="20" rx="2" />
            ))}
          </g>
          <rect x="270" y="125" width="90" height="20" rx="2" stroke={LIME} strokeWidth="2.5" fill="#12343B" />
          <path d="M285 135 H 320" stroke={LIME} strokeWidth="2" />
          <circle cx="345" cy="135" r="4" fill={LIME} stroke="none" />
          <path d="M280 90 H 350" strokeOpacity="0.4" strokeDasharray="3 6" />
        </Frame>
      );
  }
}
