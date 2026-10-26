import { NextResponse, type NextRequest } from "next/server";

/**
 * El español no lleva prefijo: `/servicios` se sirve desde `/es/servicios`.
 * Es una reescritura, no una redirección — la URL que ve la persona (y la
 * canónica) no cambia. El inglés llega ya con `/en` y pasa de largo.
 *
 * ponytail: no se detecta el idioma del navegador. Redirigir por
 * Accept-Language le escondería el español al buscador; el selector ES/EN
 * de la barra basta.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (/^\/(es|en)(\/|$)/.test(pathname)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Fuera: internos de Next y cualquier archivo (robots.txt, sitemap.xml,
  // icon.svg, lo de /public).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
