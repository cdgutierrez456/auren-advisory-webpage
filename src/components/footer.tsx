import Link from "next/link";
import { Logo } from "@/components/logo";
import { capabilities, nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-rule-invert bg-ink text-ivory">
      <div className="shell grid gap-16 py-20 md:grid-cols-[1.4fr_1fr_1fr] md:py-28">
        <div className="flex flex-col gap-8">
          <Logo size={40} tone="invert" />
          <p className="max-w-xs text-sm leading-relaxed text-muted-invert text-pretty">
            {site.description}
          </p>
        </div>

        <nav className="flex flex-col gap-5">
          <span className="label text-lime">Navegación</span>
          {nav.map((item) => (
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
          <span className="label text-lime">Capacidades</span>
          <ul className="flex flex-col gap-2.5 text-sm text-muted-invert">
            {capabilities.map((c) => (
              <li key={c.id}>{c.title}</li>
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
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-muted-invert transition-colors hover:text-ivory"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
