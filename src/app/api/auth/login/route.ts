import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/session";

const API_URL = process.env.API_URL ?? "http://localhost:8080";

export async function POST(request: Request) {
  const body = await request.json();

  const backendRes = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  await setSessionCookie(data.token);

  return NextResponse.json({ nombre: data.nombre, email: data.email, rol: data.rol });
}
