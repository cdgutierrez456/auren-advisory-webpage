import Link from "next/link";
import { Logo } from "@/components/logo";
import { nav, services, site, solutions } from "@/content/site";

const herramientas = [
  { label: "Radiografía Auren", href: "/radiografia" },
  { label: "Demos", href: "/demos" },
  { label: "Sistema de identidad", href: "/marca" },
  { label: "Contacto", href: "/contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-line-strong bg-surface text-fg">
      <div className="shell grid gap-14 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:py-24">
        <div className="flex flex-col gap-7">
          <Logo size={40} tone="tema" />
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-fg/65">
            Firma de transformación empresarial mediante tecnología. Estrategia, procesos,
            automatización, datos e inteligencia aplicada.
          </p>
          <div className="flex flex-col gap-2 text-sm text-fg/65">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit transition-colors hover:text-fg"
            >
              {site.whatsappDisplay}
            </a>
            {site.emails.map((email) => (
              <a key={email} href={`mailto:${email}`} className="w-fit transition-colors hover:text-fg">
                {email}
              </a>
            ))}
            <span>
              {site.city}, {site.region} · Colombia
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-4">
          <span className="cota text-fg/55">Soluciones</span>
          {solutions.map((s) => (
            <Link
              key={s.slug}
              href={`/soluciones#${s.slug}`}
              className="text-sm text-fg/70 transition-colors hover:text-fg"
            >
              {s.short}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-4">
          <span className="cota text-fg/55">Servicios</span>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/servicios/${s.slug}`}
              className="text-sm text-fg/70 transition-colors hover:text-fg"
            >
              {s.name}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-4">
          <span className="cota text-fg/55">La firma</span>
          {[...nav, ...herramientas].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-fg/70 transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-4 py-7 md:flex-row md:items-center md:justify-between">
          <span className="cota text-fg/45">
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="cota text-fg/60">
            <span aria-hidden className="h-0.5 w-5 bg-lime" />
            {site.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}
