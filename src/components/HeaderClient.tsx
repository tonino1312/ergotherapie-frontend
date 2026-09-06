"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogIn, Sparkles } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import type { Servicio } from "@/lib/api";

const IDIOMA_LABEL: Record<Servicio["idioma"], string> = {
  ALEMAN: "Alemán",
  ESPANOL: "Español",
  INGLES: "Inglés",
};

export function HeaderClient({ servicios }: { servicios: Servicio[] }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full ring-2 ring-white shadow-md"
            priority
          />
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-primary-dark">Ergo</span>
            <span className="text-accent">Terapia</span>
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 sm:flex">
          {siteConfig.nav.map((item) =>
            item.label === "Servicios" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </Link>

                {servicesOpen && (
                  <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2">
                    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-xl shadow-primary/10">
                      {servicios.length === 0 ? (
                        <p className="px-4 py-4 text-sm text-foreground/60">
                          Próximamente publicaremos aquí nuestros servicios.
                        </p>
                      ) : (
                        <ul className="divide-y divide-black/5">
                          {servicios.map((servicio) => (
                            <li key={servicio.id}>
                              <Link
                                href="/servicios"
                                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-primary/5"
                              >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                  <Sparkles size={14} />
                                </span>
                                <span className="min-w-0">
                                  <span className="block truncate text-sm font-medium text-foreground">
                                    {servicio.nombre}
                                  </span>
                                  <span className="block text-xs text-foreground/50">
                                    {IDIOMA_LABEL[servicio.idioma]} · {servicio.duracionMinutos} min
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link
                        href="/servicios"
                        className="block bg-primary/5 px-4 py-3 text-center text-sm font-semibold text-primary-dark hover:bg-primary/10"
                      >
                        Ver todos los servicios →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <Link
          href="/login"
          className="hidden items-center gap-1.5 rounded-full border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary-dark transition-colors hover:bg-primary/5 sm:inline-flex"
        >
          <LogIn size={15} />
          Acceso equipo
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-foreground sm:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/5 px-4 py-3 sm:hidden">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center gap-1.5 rounded-md border border-primary/20 px-3 py-2 text-sm font-medium text-primary-dark hover:bg-primary/5"
          >
            <LogIn size={15} />
            Acceso equipo
          </Link>
        </nav>
      )}
    </header>
  );
}
