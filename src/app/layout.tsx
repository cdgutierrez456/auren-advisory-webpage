import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { site } from "@/content/site";
import "./globals.css";

// Grotesk contemporánea (referencia: Söhne / Neue Haas). Serif solo editorial.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        {/*
          DIRECCIÓN DE DISEÑO — Auren Advisory (home)
          THESIS: una firma que "ve antes de vender". Rechaza la plantilla editorial-IA
            (fondo marfil + eyebrow con numerito + serif display) por composición de
            consultora real: el titular manda, el color se compromete a escala de región.
          OWN-WORLD: Auren Deep (#12343B) dominante, marfil como respiro, lima (#C8F169)
            como acento ≤10% solo sobre oscuro; grotesk Geist para todo, Instrument Serif
            solo en la frase-manifiesto; símbolo El Vértice como recurso gráfico.
          STORY: el visitante entiende qué es Auren y el orden Ver·Entender·Transformar,
            ve los 8 servicios agrupados por fase con claridad, y agenda un diagnóstico.
          FIRST VIEWPORT: posicionamiento en una línea + "Ver. Entender. Transformar." a
            gran escala, CTA visible arriba a la derecha, franja de contexto al pie.
          FINISH: mundo de marca heredado (decisión del cliente); sin torneo de dirección.
        */}
        <a
          href="#contenido"
          className="label sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-100 focus:bg-deep focus:px-5 focus:py-3 focus:text-ivory"
        >
          Saltar al contenido
        </a>
        <Nav />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
