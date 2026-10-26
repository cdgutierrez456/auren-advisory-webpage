"use client";

import { useEffect, useRef } from "react";
import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { LangSwitch } from "@/components/lang-switch";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Arrow } from "@/components/arrow";
import { unlocalize } from "@/lib/i18n";
import { useLang } from "@/lib/use-lang";

/**
 * Navegación glass. Cliente por el estado activo y por cerrar el menú al
 * navegar; el menú móvil sigue siendo un <details> nativo, sin estado de React.
 */
export function Nav({
  nav,
  name,
}: {
  /** Llega del layout ya en el idioma de la página: así el contenido no entra al bundle cliente. */
  nav: readonly { label: string; href: string }[];
  name: string;
}) {
  const pathname = unlocalize(usePathname());
  const lang = useLang();
  const contacto = lang === "en" ? "Contact" : "Contacto";
  const menu = useRef<HTMLDetailsElement>(null);

  // Navegar dentro del cliente no recarga la página, así que el <details>
  // se quedaría abierto sobre el contenido nuevo. Se cierra al cambiar de ruta.
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);
  // Los enlaces a anclas de la home solo se marcan estando en la home.
  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/70 backdrop-blur-xl">
      <div className="shell flex h-20 items-center justify-between gap-8">
        <Link href="/" aria-label={name} className="shrink-0">
          <Logo size={34} tone="tema" />
        </Link>

        {/* Desde xl y no desde md: seis enlaces, contacto, idioma y tema no
            caben en una fila más angosta — ni en español, que tiene las
            etiquetas más largas. Debajo, el menú compacto. */}
        <nav className="hidden items-center gap-6 xl:flex 2xl:gap-10">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`label relative transition-colors hover:text-fg ${
                isActive(item.href) ? "text-fg" : "text-fg/55"
              }`}
            >
              {item.label}
              {isActive(item.href) ? (
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-0.5 w-full bg-lime"
                />
              ) : null}
            </Link>
          ))}
          <Link
            href="/#contacto"
            className="label group inline-flex items-center gap-2.5 rounded-pill bg-lime px-6 py-3 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_-6px_var(--color-lime)] active:translate-y-0 active:scale-[0.97]"
          >
            {contacto}
            <Arrow className="transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <div className="flex items-center gap-3">
            <LangSwitch />
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-3 xl:hidden">
          {/* En el teléfono no cabe junto al logo y el menú: va dentro del panel. */}
          <div className="hidden sm:block">
            <LangSwitch />
          </div>
          <ThemeToggle />
          <details ref={menu} className="group relative">
            <summary className="label flex h-10 cursor-pointer list-none items-center rounded-pill border border-line px-5 text-fg transition-colors hover:border-lime [&::-webkit-details-marker]:hidden">
              {lang === "en" ? "Menu" : "Menú"}
            </summary>
            <div className="panel shadow-float absolute right-0 top-full mt-4 flex w-60 flex-col gap-1 rounded-card p-3">
              {[...nav, { label: contacto, href: "/#contacto" }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`label flex min-h-12 items-center rounded-lg px-4 transition-colors hover:bg-fg/5 hover:text-fg active:bg-fg/10 ${
                    isActive(item.href) ? "bg-fg/5 text-fg" : "text-fg/75"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-line px-1 pt-3 sm:hidden">
                <LangSwitch />
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
