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
- Cuatro formas de login, todas via Route Handlers que llaman al backend y setean la misma cookie `session`:
  - `POST /api/auth/login` → backend `POST /api/auth/login` (staff, email+contraseña)
  - `POST /api/auth/google` → backend `POST /api/auth/google` (staff, Google Identity Services; NO auto-registra)
  - `POST /api/clientes/login` / `POST /api/clientes/registro` → backend equivalente (cuentas públicas de visitante, rol `CLIENTE`)
  - `POST /api/clientes/google` → backend `POST /api/clientes/google` (visitante con Google; a diferencia del de staff, SÍ auto-crea la cuenta la primera vez)
  - `POST /api/auth/logout` limpia la cookie (sirve para cualquier tipo de cuenta).
- `GoogleSignInButton` es genérico: acepta `endpoint` y `defaultRedirect` como props para reutilizarse tanto en la pestaña Equipo (`/api/auth/google` → `/admin`) como en Paciente (`/api/clientes/google` → `/cuenta`).
- `src/lib/session.ts` exporta `Rol = "ADMIN" | "TERAPEUTA" | "CLIENTE"` y `ROLES_EQUIPO = ["ADMIN", "TERAPEUTA"]` — usarlo para distinguir staff de cuentas públicas en vez de comparar strings sueltos.
- **Ojo con el naming**: en la UI la pestaña se llama "Paciente" (más claro para el usuario final), pero por dentro sigue siendo el rol `CLIENTE`/entidad `Cliente` — **a propósito no se ha renombrado**, porque el backend ya tiene un concepto distinto llamado `Paciente` (paciente clínico asignado a un terapeuta, usado en Citas). Mezclarlos causaría confusión seria. Si en el futuro se quiere vincular una cuenta `Cliente` a un `Paciente` real, eso es una relación entre dos entidades separadas, no una fusión.
- `src/proxy.ts` (matcher `/admin/:path*` y `/cuenta/:path*`) redirige a `/login?next=...` si no hay cookie `session`. Además:
  - `src/app/admin/layout.tsx` vuelve a comprobar la sesión server-side **y el rol** (si no está en `ROLES_EQUIPO`, redirige a `/cuenta`) — defensa en profundidad, un `CLIENTE` no puede entrar aunque tenga sesión válida (verificado en navegador).
  - `src/app/cuenta/page.tsx` es el equivalente para cuentas `CLIENTE` — de momento solo un saludo, sin funcionalidad (ver dominio Clientes en el backend).
- Login con Google: usa el widget oficial de Google Identity Services (`GoogleSignInButton.tsx`, script `accounts.google.com/gsi/client`), disponible **tanto para equipo como para visitante** (ver arriba) — la diferencia de auto-registro la decide el backend según el endpoint, el frontend solo cambia `endpoint`/`defaultRedirect`.
  - **Pendiente de credenciales reales**: falta crear un proyecto OAuth en [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → "Crear credenciales" → "ID de cliente de OAuth" → tipo "Aplicación web" → añadir `http://localhost:3000` (y el dominio real en producción) a "Orígenes de JavaScript autorizados". El Client ID resultante va en `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (frontend) **y también** en `GOOGLE_CLIENT_ID` (backend, mismo valor). Mientras no se configure, el botón muestra un aviso y no se rompe nada.

## Estructura actual
- Parte pública: Inicio (hecha) · Servicios, Sobre mí, Contacto, Cursos (pendientes) — consumen endpoints públicos (`GET /api/servicios`, `POST /api/contacto`).
- `/login`: una sola tarjeta compacta (`LoginTabs.tsx`) con pestañas **Equipo**/**Paciente**. Ambas muestran Google + un formulario propio, **directo, sin toggles ni links que ocultan el formulario** (`AdminLoginForm` / `ClienteAuthForm`, esta última con sus propias sub-pestañas Iniciar sesión/Crear cuenta). Todo en un único cuadro para no alargar la pantalla — decisiones explícitas del usuario tras ver versiones anteriores.
- `/admin` (protegido, solo `ADMIN`/`TERAPEUTA`): shell con cabecera (nombre/rol + cerrar sesión) y accesos a Pacientes/Citas/Servicios/Contacto — **de momento son tarjetas "Próximamente"**, las páginas reales de gestión están pendientes de construir.
- `/cuenta` (protegido, cualquier sesión válida): placeholder para cuentas `CLIENTE` — sin funcionalidad todavía, base para futuras features públicas.

## Convenciones de código
- Componentes y código en inglés (convención React/TS habitual); textos de UI en español (o alemán donde aplique, el negocio es multilingüe).
- Server Components por defecto; `"use client"` solo cuando se necesite interactividad/estado.
- Sin comentarios explicando qué hace el código; solo para decisiones no obvias.

## Notas
- Este archivo se irá actualizando a medida que el proyecto avance.
