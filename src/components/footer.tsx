import Link from "next/link";
import { Logo } from "@/components/logo";
import { nav, services, site } from "@/content/site";

const secondary = [
  { label: "Sistema de identidad", href: "/marca" },
  { label: "Contacto", href: "/#contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-rule-invert bg-ink text-ivory">
      <div className="shell grid gap-16 py-20 md:grid-cols-[1.4fr_1fr_1.2fr] md:py-28">
        <div className="flex flex-col gap-8">
          <Logo size={40} tone="invert" />
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-invert">
            {site.description}
          </p>
          <p className="text-sm text-muted-invert">Manizales, Colombia</p>
        </div>

        <nav className="flex flex-col gap-5">
          <span className="label text-lime">Navegación</span>
          {[...nav, ...secondary].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-invert transition-colors hover:text-ivory"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-5">
          <span className="label text-lime">Servicios</span>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="text-sm text-muted-invert transition-colors hover:text-ivory"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-rule-invert">
        <div className="shell flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
          <span className="label text-ivory/40">
            © {new Date().getFullYear()} {site.name}
          </span>
          <div className="flex items-center gap-4">
            <span className="h-0.5 w-6 bg-lime" />
            <span className="label text-ivory/55">{site.tagline}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-invert transition-colors hover:text-ivory"
            >
              {site.whatsappDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-muted-invert transition-colors hover:text-ivory"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
