import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-primary-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-white/70">{siteConfig.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Navegación
          </p>
          <ul className="mt-3 space-y-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Contacto
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.contact.whatsapp} className="hover:text-white">
                {siteConfig.contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50 sm:px-6">
        © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
