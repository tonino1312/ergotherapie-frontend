"use client";

import Script from "next/script";
import { useCallback, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

export function GoogleSignInButton({
  endpoint = "/api/auth/google",
  defaultRedirect = "/admin",
}: {
  endpoint?: string;
  defaultRedirect?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCredential = useCallback(
    async (response: { credential: string }) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: response.credential }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          setError(data?.message ?? "No se pudo iniciar sesión con Google.");
          setLoading(false);
          return;
        }

        router.push(searchParams.get("next") ?? defaultRedirect);
        router.refresh();
      } catch {
        setError("No se pudo conectar con el servidor.");
        setLoading(false);
      }
    },
    [router, searchParams, endpoint, defaultRedirect]
  );

  const handleScriptLoad = useCallback(() => {
    if (!window.google || !buttonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredential,
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      width: 320,
      text: "continue_with",
    });
  }, [handleCredential]);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="rounded-full border border-dashed border-black/15 px-6 py-3 text-center text-sm text-foreground/50">
        Login con Google no configurado (falta NEXT_PUBLIC_GOOGLE_CLIENT_ID)
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={handleScriptLoad}
      />
      <div ref={buttonRef} className={loading ? "pointer-events-none opacity-50" : ""} />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
