@AGENTS.md

# Ergotherapie Frontend

Web para una consulta de terapia ocupacional (inspirada en ergotherapie-kids.de), consumiendo el backend de `ergotherapie-backend` (Spring Boot, repo separado).

## Stack
- Next.js 16.3.4 (App Router, Turbopack) — **versión con cambios respecto a lo habitual**: `middleware.ts` se llama ahora `proxy.ts`, el cacheo de `fetch` no es automático (usar la directiva `use cache` cuando aplique). Antes de usar una API de Next.js dudosa, comprobar en `node_modules/next/dist/docs/` (según indica `AGENTS.md`).
- React 19.2.8 + TypeScript
- Tailwind CSS
- framer-motion (animaciones/scroll-reveal), lucide-react (iconos), react-parallax-tilt (tilt 3D en tarjetas), react-fast-marquee (cinta animada)
- ESLint (config plana `eslint.config.mjs`)

## Backend
- API REST en `ergotherapie-backend` (Spring Boot, JWT). En dev corre en `http://localhost:8080` (`API_URL` en `.env.local`).
- Documentación de todos los endpoints: `docs/API.md` en el repo del backend.

## Autenticación (decidida e implementada)
- El JWT que emite el backend se guarda en una **cookie httpOnly** llamada `session` (nunca en localStorage ni accesible desde JS del cliente — verificado que `document.cookie` no la expone).
- `src/lib/session.ts`: `setSessionCookie`/`clearSessionCookie`/`getSessionToken`/`getSession` (esta última decodifica el payload del JWT ya emitido por el backend para leer `nombre`/`email`/`rol` sin llamada extra — no revalida la firma, la autorización real de datos la sigue haciendo el backend en cada petición).
- Dos formas de login, ambas via Route Handlers que llaman al backend y setean la cookie:
  - `POST /api/auth/login` (Route Handler) → backend `POST /api/auth/login` (email+contraseña)
  - `POST /api/auth/google` (Route Handler) → backend `POST /api/auth/google` (Google Identity Services)
  - `POST /api/auth/logout` (Route Handler) limpia la cookie.
- `src/proxy.ts` (matcher `/admin/:path*`) redirige a `/login?next=...` si no hay cookie `session`. Además, `src/app/admin/layout.tsx` vuelve a comprobar la sesión server-side (defensa en profundidad, siguiendo la recomendación oficial de no confiar solo en el proxy).
- Login con Google: usa el widget oficial de Google Identity Services (`GoogleSignInButton.tsx`, script `accounts.google.com/gsi/client`), pensado **solo para el equipo** (terapeutas/admin) como alternativa al email+contraseña — no auto-registra usuarios, el backend rechaza cualquier email que no esté ya en `usuarios`.
  - **Pendiente de credenciales reales**: falta crear un proyecto OAuth en [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → "Crear credenciales" → "ID de cliente de OAuth" → tipo "Aplicación web" → añadir `http://localhost:3000` (y el dominio real en producción) a "Orígenes de JavaScript autorizados". El Client ID resultante va en `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (frontend) **y también** en `GOOGLE_CLIENT_ID` (backend, mismo valor). Mientras no se configure, el botón muestra un aviso y no se rompe nada.

## Estructura actual
- Parte pública: Inicio (hecha) · Servicios, Sobre mí, Contacto, Cursos (pendientes) — consumen endpoints públicos (`GET /api/servicios`, `POST /api/contacto`).
- `/login`: login del equipo (Google + email/contraseña).
- `/admin` (protegido): shell con cabecera (nombre/rol + cerrar sesión) y accesos a Pacientes/Citas/Servicios/Contacto — **de momento son tarjetas "Próximamente"**, las páginas reales de gestión están pendientes de construir.

## Convenciones de código
- Componentes y código en inglés (convención React/TS habitual); textos de UI en español (o alemán donde aplique, el negocio es multilingüe).
- Server Components por defecto; `"use client"` solo cuando se necesite interactividad/estado.
- Sin comentarios explicando qué hace el código; solo para decisiones no obvias.

## Notas
- Este archivo se irá actualizando a medida que el proyecto avance.
