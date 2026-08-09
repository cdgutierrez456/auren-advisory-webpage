"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Arrow } from "@/components/ui";
import { nav, site } from "@/content/site";

/**
 * Navegación. Cliente solo por el estado activo; el menú móvil sigue siendo un
 * <details> nativo, sin estado de React.
 */
export function Nav() {
  const pathname = usePathname();
  // Los enlaces a anclas de la home solo se marcan estando en la home.
  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-ivory/85 backdrop-blur-md">
      <div className="shell flex h-20 items-center justify-between gap-8">
        <Link href="/" aria-label={site.name} className="shrink-0">
          <Logo size={34} />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`label relative transition-colors hover:text-deep ${
                isActive(item.href) ? "text-deep" : "text-deep/60"
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
            className="label inline-flex items-center gap-2.5 bg-deep px-6 py-3.5 text-ivory transition-colors hover:bg-deep-700"
          >
            Contacto <Arrow />
          </Link>
        </nav>

        <details className="group relative md:hidden">
          <summary className="label cursor-pointer list-none text-deep [&::-webkit-details-marker]:hidden">
            Menú
          </summary>
          <div className="absolute right-0 top-full mt-5 flex w-56 flex-col gap-1 border border-rule bg-paper p-3 shadow-xl shadow-ink/5">
            {[...nav, { label: "Contacto", href: "/#contacto" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`label px-4 py-3.5 transition-colors hover:bg-ivory hover:text-deep ${
                  isActive(item.href) ? "bg-ivory text-deep" : "text-deep/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
