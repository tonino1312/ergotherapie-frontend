"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

type Modo = "login" | "registro";

export function ClienteAuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modo, setModo] = useState<Modo>("login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function iniciarSesion() {
    const res = await fetch("/api/clientes/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.message ?? "No se pudo iniciar sesión.");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (modo === "registro") {
        const res = await fetch("/api/clientes/registro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email, password }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          setError(data?.message ?? "No se pudo crear la cuenta.");
          setLoading(false);
          return;
        }
      }

      await iniciarSesion();
      router.push(searchParams.get("next") ?? "/cuenta");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo conectar con el servidor.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-5 flex rounded-full bg-black/5 p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setModo("login")}
          className={`flex-1 rounded-full py-2 transition-colors ${
            modo === "login" ? "bg-white text-primary-dark shadow-sm" : "text-foreground/60"
          }`}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          onClick={() => setModo("registro")}
          className={`flex-1 rounded-full py-2 transition-colors ${
            modo === "registro" ? "bg-white text-primary-dark shadow-sm" : "text-foreground/60"
          }`}
        >
          Crear cuenta
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {modo === "registro" && (
          <div>
            <label htmlFor="cliente-nombre" className="mb-1 block text-sm font-medium text-foreground/80">
              Nombre
            </label>
            <input
              id="cliente-nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
              placeholder="Tu nombre"
            />
          </div>
        )}

        <div>
          <label htmlFor="cliente-email" className="mb-1 block text-sm font-medium text-foreground/80">
            Email
          </label>
          <input
            id="cliente-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            placeholder="tucorreo@example.com"
          />
        </div>

        <div>
          <label htmlFor="cliente-password" className="mb-1 block text-sm font-medium text-foreground/80">
            Contraseña
          </label>
          <input
            id="cliente-password"
            type="password"
            required
            minLength={modo === "registro" ? 8 : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {modo === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}
