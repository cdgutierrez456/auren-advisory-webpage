/**
 * Sistema visual abstracto de Auren — derivado de la geometría de El Vértice.
 *
 * Nada de fotos ni iconografía de IA: la textura de la marca son ecos del propio
 * símbolo. Todo es SVG puro, decorativo (`aria-hidden`) y se colorea con
 * `currentColor`, así el color lo decide la clase de texto del contenedor.
 */

/** Chevrons anidados que comparten vértice: un eco topográfico del símbolo. */
export function ContourField({
  className = "",
  count = 16,
}: {
  className?: string;
  count?: number;
}) {
  const apex = { x: 50, y: 18 };
  const baseL = { x: 12, y: 80 };
  const baseR = { x: 88, y: 80 };

  const lines = Array.from({ length: count }, (_, i) => {
    const s = 0.26 + (i / (count - 1)) * 1.4;
    const lx = apex.x + (baseL.x - apex.x) * s;
    const ly = apex.y + (baseL.y - apex.y) * s;
    const rx = apex.x + (baseR.x - apex.x) * s;
    const ry = apex.y + (baseR.y - apex.y) * s;
    const opacity = 0.55 * (1 - i / count) + 0.05;
    return {
      d: `M ${lx.toFixed(2)} ${ly.toFixed(2)} L ${apex.x} ${apex.y} L ${rx.toFixed(2)} ${ry.toFixed(2)}`,
      opacity: Number(opacity.toFixed(3)),
    };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      {lines.map((l, i) => (
        <path
          key={i}
          d={l.d}
          stroke="currentColor"
          strokeWidth={0.35}
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={l.opacity}
        />
      ))}
    </svg>
  );
}

/** Trama de hairlines con la inclinación del trazo ascendente del símbolo. */
export function HairlineField({
  className = "",
  gap = 6,
}: {
  className?: string;
  gap?: number;
}) {
  const lean = 13; // caída horizontal del trazo (43→33 sobre la altura)
  const xs: number[] = [];
  for (let x = -30; x <= 140; x += gap) xs.push(x);

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      {xs.map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={-8}
          x2={x - lean}
          y2={108}
          stroke="currentColor"
          strokeWidth={0.22}
          opacity={0.5}
        />
      ))}
    </svg>
  );
}

/** Ondas de luz: senoidales apiladas, en el espíritu de las 'light waves'. */
export function WaveField({
  className = "",
  lines = 8,
}: {
  className?: string;
  lines?: number;
}) {
  const paths = Array.from({ length: lines }, (_, i) => {
    const baseY = 8 + (i / (lines - 1)) * 84;
    const amp = 2.5 + i * 0.7;
    const phase = i * 0.6;
    let d = `M 0 ${(baseY + Math.sin(phase) * amp).toFixed(2)}`;
    for (let x = 4; x <= 100; x += 4) {
      const y = baseY + Math.sin((x / 100) * Math.PI * 3 + phase) * amp;
      d += ` L ${x} ${y.toFixed(2)}`;
    }
    return { d, opacity: Number((0.5 * (1 - i / lines) + 0.06).toFixed(3)) };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          stroke="currentColor"
          strokeWidth={0.3}
          strokeLinecap="round"
          opacity={p.opacity}
        />
      ))}
    </svg>
  );
}

/** Luz ambiental: dos blobs que respiran a distinto ritmo tras el contenido. */
export function Ambient({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="glow breathe absolute -top-1/4 left-[8%] h-96 w-96 bg-lime"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="glow breathe absolute -bottom-1/4 right-[6%] h-[30rem] w-[30rem] bg-deep"
        style={{ animationDelay: "-9s", opacity: 0.42 }}
      />
    </div>
  );
}
