import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LoginTabs } from "@/components/auth/LoginTabs";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Iniciar sesión — ${siteConfig.name}`,
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-primary/5 px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-light/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl shadow-primary/5 sm:p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary-dark">
              <Sparkles size={14} className="text-accent" />
              {siteConfig.name}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-primary-dark">Inicia sesión</h1>
            <p className="text-sm text-foreground/70">
              Accede como equipo o como visitante.
            </p>
          </div>

          <div className="mt-8">
            <LoginTabs />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-foreground/60">
          <Link href="/" className="font-medium text-primary hover:underline">
            ← Volver a la web
          </Link>
        </p>
      </div>
    </div>
  );
}
