import type { NextConfig } from "next";
import { site } from "./src/content/site";

const nextConfig: NextConfig = {
  /**
   * El sitio responde en www y sin www, pero la canónica y el sitemap apuntan
   * al dominio desnudo. Sin este 301 el buscador trata las dos versiones como
   * sitios distintos y reparte la autoridad entre ambos.
   *
   * ponytail: esto solo corre si el sitio se sirve con Node o en Vercel. Con
   * `output: "export"` o detrás de un CDN estático hay que replicar la regla
   * en el hosting — ver SEO.md.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${site.domain}` }],
        destination: `https://${site.domain}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
