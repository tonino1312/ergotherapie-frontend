@AGENTS.md

# Ergotherapie Frontend

Web para una consulta de terapia ocupacional (inspirada en ergotherapie-kids.de), consumiendo el backend de `ergotherapie-backend` (Spring Boot, repo separado).

## Stack
- Next.js 16.3.4 (App Router, Turbopack) — **versión con cambios respecto a lo habitual**: `middleware.ts` se llama ahora `proxy.ts`, el cacheo de `fetch` no es automático (usar la directiva `use cache` cuando aplique). Antes de usar una API de Next.js dudosa, comprobar en `node_modules/next/dist/docs/` (según indica `AGENTS.md`).
- React 19.2.8 + TypeScript
- Tailwind CSS
- framer-motion (animaciones/scroll-reveal), lucide-react (iconos), react-parallax-tilt (tilt 3D en tarjetas), react-fast-marquee (cinta animada), embla-carousel-react + embla-carousel-autoplay (carrusel de inicio)
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

## Marca / logo
- `public/logo.png`: el icono real de la marca (mancha acuarela), usado junto al texto "ErgoTerapia" en `Header.tsx`, `Footer.tsx`, `admin/layout.tsx` y la insignia de `/login` — y como favicon/app icon (`metadata.icons` en `layout.tsx`).
- **Existe también una versión del logo con texto en alemán** ("ERGOTHERAPIE — Kinder, Jugendliche und Familien", en `fotos-pendientes/Rosa-Colorido-...jpg` del backend, fuera de este repo) que **NO se usa**: el usuario confirmó explícitamente que el nombre real del negocio es "ErgoTerapia" (`siteConfig.name`) y que solo el símbolo gráfico es la marca — la versión con el texto en alemán se descartó a propósito para no generar una identidad de marca inconsistente. Si esto cambia en el futuro, revisar también `siteConfig.description`/`tagline` (actualmente en español, enfoque general, no específico para niños).

## Header
- Partido en dos: `Header.tsx` (Server Component async, llama a `getServicios()` server-side) → `HeaderClient.tsx` (Client Component con toda la interactividad: menú móvil, desplegable de Servicios). Necesario porque el desplegable necesita listar los servicios reales pero el resto del header necesita estado de cliente (hover/click) — así se evita exponer el backend al navegador (nada de `NEXT_PUBLIC_API_URL` ni CORS: el fetch ocurre en el servidor de Next.js).
- Nav **centrado** de verdad (no solo visualmente): `absolute left-1/2 -translate-x-1/2` dentro de un contenedor `relative`, independiente del ancho del logo o del botón "Acceso equipo" a cada lado.
- Desplegable de "Servicios" (hover en desktop): lista los servicios reales (`nombre`, idioma, duración) con un enlace "Ver todos los servicios" al final — **apunta a `/servicios`, que todavía no existe** (pendiente, da 404 hasta que se construya esa página).
- Si se cambia el `width`/`height` de `next/image` en el logo, añadir también las clases Tailwind `h-X w-X` a juego — el preflight de Tailwind fuerza `height: auto` en `<img>`, y sin la clase explícita Next avisa en consola de que el aspect ratio puede romperse.

## Estructura actual
- `SiteBackground.tsx` en el layout raíz: fondo "aurora" fijo (`position: fixed`, detrás de todo) con varias manchas de color difuminadas + patrón de puntos sutil, visible en todo el scroll (no solo en el hero) — decisión explícita para que la web deje de sentirse plana/blanca. Las secciones de cada página deciden si lo dejan pasar (sin `bg-*` propio) o lo tapan con una banda sólida (`bg-white`, `bg-primary-dark`) para contraste/legibilidad — alternar ambas da ritmo visual. El `Hero.tsx` ya no lleva su propio `bg-primary/5` plano (redundante con el aurora global), solo conserva sus blobs animados y el spotlight que sigue al cursor como capa extra local.
- Parte pública: Inicio, Sobre mí y Contacto (hechas) · Servicios, Cursos (pendientes) — consumen endpoints públicos (`GET /api/servicios`, `POST /api/contacto`).
- `/contacto`: no es un formulario genérico de "nombre/email/mensaje" — recoge datos reales del caso (nombre y edad del paciente, motivo de consulta, tratamiento previo) porque el negocio es clínico y el equipo necesita esa información antes de la primera cita (backend ampliado en `V9__add_datos_paciente_contacto.sql`, ver `docs/API.md` del backend). El campo `asunto` que exige el backend se genera automáticamente en el cliente (`ContactoForm.tsx`) a partir del nombre del paciente — el visitante nunca lo rellena, sería redundante. `src/app/api/contacto/route.ts` sigue el mismo patrón de proxy que el resto (`API_URL` nunca se expone al navegador), pero sin cookie de sesión porque el endpoint es público y no autentica a nadie.
- `/sobre-mi`: foto real (`public/elena-anton.jpg`) + nombre + rol + bio corta, y sección "Formación y titulaciones" con 3 tarjetas (datos reales dados por el usuario: Grado UCM, Postgrado ISEP, formación APETO) — no inventar ni ampliar titulaciones sin que el usuario las dé explícitamente.
- Inicio incluye `MomentsCarousel.tsx` ("¿En qué podemos ayudarte?"): carrusel con Embla (loop + autoplay, para en hover). Acepta una prop `fotos?: Imagen[]` — si el backend devuelve fotos reales de la categoría `CARRUSEL_INICIO` (`getImagenes` en `src/lib/api.ts`), las muestra a pantalla completa con leyenda (`textoAlternativo`); si no hay ninguna todavía, usa automáticamente las diapositivas ilustrativas (gradiente + icono) como respaldo — no hace falta tocar código cuando lleguen fotos reales, basta con subirlas por `POST /api/imagenes` (backend). `getImagenes` construye la URL completa (`API_URL` + ruta relativa que devuelve el backend) porque las imágenes las sirve el backend, no Next.js.
- `/login`: una sola tarjeta compacta (`LoginTabs.tsx`) con pestañas **Equipo**/**Paciente**. Ambas muestran Google + un formulario propio, **directo, sin toggles ni links que ocultan el formulario** (`AdminLoginForm` / `ClienteAuthForm`, esta última con sus propias sub-pestañas Iniciar sesión/Crear cuenta). Todo en un único cuadro para no alargar la pantalla — decisiones explícitas del usuario tras ver versiones anteriores.
- `/admin` (protegido, solo `ADMIN`/`TERAPEUTA`): shell con cabecera (nombre/rol + cerrar sesión) y accesos a Pacientes/Citas/Servicios/Contacto — **de momento son tarjetas "Próximamente"**, las páginas reales de gestión están pendientes de construir.
- `/cuenta` (protegido, cualquier sesión válida): placeholder para cuentas `CLIENTE` — sin funcionalidad todavía, base para futuras features públicas.

## Convenciones de código
- Componentes y código en inglés (convención React/TS habitual); textos de UI en español (o alemán donde aplique, el negocio es multilingüe).
- Server Components por defecto; `"use client"` solo cuando se necesite interactividad/estado.
- Sin comentarios explicando qué hace el código; solo para decisiones no obvias.

## Notas
- Este archivo se irá actualizando a medida que el proyecto avance.
