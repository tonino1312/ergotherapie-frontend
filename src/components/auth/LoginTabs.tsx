"use client";

import { Suspense, useState } from "react";
import { Users, User } from "lucide-react";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { AdminLoginForm } from "@/components/auth/AdminLoginForm";
import { ClienteAuthForm } from "@/components/auth/ClienteAuthForm";

type Tab = "equipo" | "visitante";

export function LoginTabs() {
  const [tab, setTab] = useState<Tab>("equipo");

  return (
    <div>
      <div className="mb-6 flex rounded-full bg-black/5 p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("equipo")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 transition-colors ${
            tab === "equipo" ? "bg-white text-primary-dark shadow-sm" : "text-foreground/60"
          }`}
        >
          <Users size={15} />
          Equipo
        </button>
        <button
          type="button"
          onClick={() => setTab("visitante")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 transition-colors ${
            tab === "visitante" ? "bg-white text-primary-dark shadow-sm" : "text-foreground/60"
          }`}
        >
          <User size={15} />
          Visitante
        </button>
      </div>

      <Suspense fallback={null}>
        {tab === "equipo" ? (
          <div className="flex flex-col items-center gap-6">
            <GoogleSignInButton />

            <div className="flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-black/10" />
              <span className="text-xs text-foreground/40">o</span>
              <div className="h-px flex-1 bg-black/10" />
            </div>

            <AdminLoginForm />
          </div>
        ) : (
          <div className="flex justify-center">
            <ClienteAuthForm />
          </div>
        )}
      </Suspense>
    </div>
  );
}
