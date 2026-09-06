import { cookies } from "next/headers";

export const SESSION_COOKIE = "session";
const ONE_DAY_SECONDS = 60 * 60 * 24;

export type Rol = "ADMIN" | "TERAPEUTA" | "CLIENTE";

export type Session = {
  email: string;
  nombre: string;
  rol: Rol;
};

export const ROLES_EQUIPO: Rol[] = ["ADMIN", "TERAPEUTA"];

export async function setSessionCookie(token: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_DAY_SECONDS,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}

// Decodifica el payload del JWT ya emitido y verificado por nuestro backend.
// No vuelve a verificar la firma: solo se usa para mostrar datos del usuario en la UI.
// Toda autorización real de datos la sigue haciendo el backend en cada petición.
export async function getSession(): Promise<Session | null> {
  const token = await getSessionToken();
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = Buffer.from(payloadBase64, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadJson);

    return {
      email: payload.sub,
      nombre: payload.nombre,
      rol: payload.rol,
    };
  } catch {
    return null;
  }
}
