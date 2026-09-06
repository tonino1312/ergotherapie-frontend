import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession, ROLES_EQUIPO } from "@/lib/session";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { siteConfig } from "@/lib/site-config";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!ROLES_EQUIPO.includes(session.rol)) {
    redirect("/cuenta");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-primary/5">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold text-primary-dark">
            <Image src="/logo.png" alt="" width={28} height={28} className="h-7 w-7 rounded-full" />
            {siteConfig.name} · Panel
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{session.nombre}</p>
              <p className="text-xs text-foreground/50">{session.rol}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}
