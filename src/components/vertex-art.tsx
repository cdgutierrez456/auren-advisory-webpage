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
