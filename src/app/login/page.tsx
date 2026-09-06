import Link from "next/link";
import { Suspense } from "react";
import { Sparkles, User } from "lucide-react";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { AdminLoginForm } from "@/components/auth/AdminLoginForm";
import { ClienteAuthForm } from "@/components/auth/ClienteAuthForm";
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

      <div className="relative flex w-full max-w-md flex-col gap-6">
        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl shadow-primary/5 sm:p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary-dark">
              <Sparkles size={14} className="text-accent" />
              Acceso al equipo
            </span>
            <h1 className="mt-2 text-2xl font-bold text-primary-dark">Inicia sesión</h1>
            <p className="text-sm text-foreground/70">
              Accede para gestionar pacientes, citas y servicios.
            </p>
          </div>

          <Suspense fallback={null}>
            <div className="mt-8 flex flex-col items-center gap-6">
              <GoogleSignInButton />

              <div className="flex w-full items-center gap-3">
                <div className="h-px flex-1 bg-black/10" />
                <span className="text-xs text-foreground/40">o</span>
                <div className="h-px flex-1 bg-black/10" />
              </div>

              <AdminLoginForm />
            </div>
          </Suspense>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl shadow-primary/5 sm:p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
              <User size={14} />
              ¿Eres nuevo por aquí?
            </span>
            <h2 className="mt-2 text-xl font-bold text-primary-dark">Tu cuenta</h2>
            <p className="text-sm text-foreground/70">
              Crea una cuenta o inicia sesión como visitante.
            </p>
          </div>

          <Suspense fallback={null}>
            <div className="mt-6 flex justify-center">
              <ClienteAuthForm />
            </div>
          </Suspense>
        </div>

        <p className="text-center text-sm text-foreground/60">
          <Link href="/" className="font-medium text-primary hover:underline">
            ← Volver a la web
          </Link>
        </p>
      </div>
    </div>
  );
}
