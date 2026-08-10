"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Arrow } from "@/components/ui";
import { nav, site } from "@/content/site";

/**
 * Navegación glass sobre la base oscura. Cliente solo por el estado activo; el
 * menú móvil sigue siendo un <details> nativo, sin estado de React.
 */
export function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-deep-900/70 backdrop-blur-xl">
      <div className="shell flex h-20 items-center justify-between gap-8">
        <Link href="/" aria-label={site.name} className="shrink-0">
          <Logo size={34} tone="invert" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`label relative transition-colors hover:text-ivory ${
                isActive(item.href) ? "text-ivory" : "text-ivory/55"
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
            className="label inline-flex items-center gap-2.5 rounded-pill bg-lime px-6 py-3 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_-6px_var(--color-lime)]"
          >
            Contacto <Arrow />
          </Link>
        </nav>

        <details className="group relative md:hidden">
          <summary className="label cursor-pointer list-none text-ivory [&::-webkit-details-marker]:hidden">
            Menú
          </summary>
          <div className="glass absolute right-0 top-full mt-5 flex w-56 flex-col gap-1 rounded-card p-3 shadow-2xl shadow-black/40">
            {[...nav, { label: "Contacto", href: "/#contacto" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`label rounded-lg px-4 py-3.5 transition-colors hover:bg-white/5 hover:text-ivory ${
                  isActive(item.href) ? "bg-white/5 text-ivory" : "text-ivory/70"
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
