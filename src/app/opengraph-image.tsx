import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/**
 * Imagen de compartido, una para todo el sitio.
 *
 * ponytail: hex sueltos porque `next/og` renderiza fuera del pipeline de
 * Tailwind y no ve los tokens de `@theme`. Los valores salen de logo.tsx.
 * Si cada servicio necesita su propia imagen, este archivo se copia a
 * `servicios/[slug]/opengraph-image.tsx` y lee el servicio del slug.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12343B",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <svg width="88" height="88" viewBox="0 0 100 100">
          <polygon points="46,20 58,20 38,80 23,80" fill="#F2F1EA" />
          <polygon points="53.4,42 65.4,42 82,80 67,80" fill="#C8F169" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 6, width: 96, background: "#C8F169" }} />
          <div
            style={{
              marginTop: 36,
              fontSize: 76,
              color: "#F2F1EA",
              letterSpacing: "-0.02em",
            }}
          >
            {site.tagline}
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "rgba(242,241,234,0.7)" }}>
            {`${site.name} · Transformación empresarial`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
