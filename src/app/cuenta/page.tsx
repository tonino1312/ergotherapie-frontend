import { redirect } from "next/navigation";
import { Sparkles } from "lucide-react";
import { getSession } from "@/lib/session";
import { LogoutButton } from "@/components/auth/LogoutButton";

export const metadata = {
  title: "Tu cuenta",
};

export default async function CuentaPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary-dark">
        <Sparkles size={14} className="text-accent" />
        Tu cuenta
      </span>
      <h1 className="mt-4 text-2xl font-bold text-primary-dark">
        Hola, {session.nombre}
      </h1>
      <p className="mt-2 max-w-md text-foreground/70">
        Tu cuenta se ha creado correctamente. Todavía no hay nada que gestionar aquí,
        pero pronto podrás ver y reservar tus citas desde esta página.
      </p>
      <div className="mt-8">
        <LogoutButton />
      </div>
    </div>
  );
}
