import type { NextConfig } from "next";

/**
 * Sin `redirects()` a propósito.
 *
 * La redirección entre www y el dominio desnudo la resuelve Vercel en el
 * borde, y ponerla también aquí ya causó un bucle: Vercel mandaba el ápice a
 * www y esta regla mandaba www al ápice (ERR_TOO_MANY_REDIRECTS).
 *
 * Si alguna vez el sitio deja de servirse en Vercel, la regla va aquí — pero
 * primero hay que confirmar hacia dónde redirige el hosting. La dirección
 * correcta es la del dominio desnudo, que es la que usan `site.domain`, la
 * canónica de cada página y el sitemap. Ver SEO.md.
 */
const nextConfig: NextConfig = {
  // Rutas que dejaron de existir en V2.3. Internas: no tienen que ver con la
  // redirección www, que sigue siendo de Vercel.
  async redirects() {
    return [
      { source: "/enfoque", destination: "/nosotros", permanent: true },
      { source: "/servicios", destination: "/soluciones", permanent: true },
    ];
  },
};

export default nextConfig;
