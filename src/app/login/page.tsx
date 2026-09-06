import Link from "next/link";
import Image from "next/image";
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
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 py-1.5 pl-1.5 pr-4 text-xs font-semibold text-primary-dark">
              <Image src="/logo.png" alt="" width={20} height={20} className="rounded-full" />
              {siteConfig.name}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-primary-dark">Inicia sesión</h1>
            <p className="text-sm text-foreground/70">
              Accede como equipo o como paciente.
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
