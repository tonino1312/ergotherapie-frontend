"use client";

import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary-dark">
          <Image src="/logo.png" alt="" width={32} height={32} className="rounded-full" priority />
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          <nav className="flex gap-8">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary-dark transition-colors hover:bg-primary/5"
          >
            <LogIn size={15} />
            Acceso equipo
          </Link>
        </div>

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
