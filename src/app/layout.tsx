import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { site } from "@/content/site";
import { JsonLd, organization, website } from "@/lib/schema";
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
    default: `${site.name} — Transformación empresarial y automatización`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — Transformación empresarial en Colombia`,
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
        {/* La firma y el sitio, declarados una vez. El resto de páginas los
            referencian por @id desde `lib/schema`. */}
        <JsonLd data={organization()} />
        <JsonLd data={website()} />
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
