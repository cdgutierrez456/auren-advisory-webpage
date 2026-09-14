import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion";
import { Nav } from "@/components/nav";
import { ToTop } from "@/components/to-top";
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
  // La itálica es la firma tipográfica de <Em>: sin este eje el navegador la
  // sintetiza inclinando la romana y se nota.
  style: ["normal", "italic"],
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
      // El script de abajo escribe `data-theme` antes de que React hidrate, así
      // que este nodo SIEMPRE difiere del HTML del servidor. Es el precio de no
      // tener fogonazo, y se suprime solo aquí: React ignora la diferencia en
      // este elemento, no en sus hijos.
      suppressHydrationWarning
    >
      <body>
        {/* Tema elegido antes de pintar: sin esto, quien guardó el tema claro
            vería un fogonazo oscuro en cada carga. Es la única razón por la que
            hay un script en línea en todo el sitio. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('tema');if(t)document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        {/* La firma y el sitio, declarados una vez. El resto de páginas los
            referencian por @id desde `lib/schema`. */}
        <JsonLd data={organization()} />
        <JsonLd data={website()} />
        <a
          href="#contenido"
          className="label sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-100 focus:bg-surface-3 focus:px-5 focus:py-3 focus:text-fg"
        >
          Saltar al contenido
        </a>
        {/* Sin JavaScript, Motion deja el contenido en su estado inicial —
            invisible. Esto lo devuelve a la vista: la animación es un lujo, el
            texto no. */}
        <noscript>
          {/* eslint-disable-next-line react/no-danger */}
          <style
            dangerouslySetInnerHTML={{
              __html: "[style*='opacity:0']{opacity:1!important;transform:none!important;filter:none!important}",
            }}
          />
        </noscript>
        <MotionProvider>
          <Nav />
          <main id="contenido">{children}</main>
          <Footer />
          <ToTop />
        </MotionProvider>
      </body>
    </html>
  );
}
