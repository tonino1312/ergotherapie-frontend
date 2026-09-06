@AGENTS.md

# Ergotherapie Frontend

Web para una consulta de terapia ocupacional (inspirada en ergotherapie-kids.de), consumiendo el backend de `ergotherapie-backend` (Spring Boot, repo separado).

## Stack
- Next.js 16.3.4 (App Router, Turbopack) — **versión con cambios respecto a lo habitual**: `middleware.ts` se llama ahora `proxy.ts`, el cacheo de `fetch` no es automático (usar la directiva `use cache` cuando aplique). Antes de usar una API de Next.js dudosa, comprobar en `node_modules/next/dist/docs/` (según indica `AGENTS.md`).
- React 19.2.8 + TypeScript
- Tailwind CSS
- ESLint (config plana `eslint.config.mjs`)

## Backend
- API REST en `ergotherapie-backend` (Spring Boot, JWT). En dev corre en `http://localhost:8080`.
- Documentación de todos los endpoints: `docs/API.md` en el repo del backend.
- Auth: JWT vía `POST /api/auth/login`. Pendiente de decidir estrategia de almacenamiento del token en el frontend (cookie httpOnly vía route handler vs. cliente) — **decidir antes de implementar el login**.

## Estructura prevista
- Parte pública: Inicio, Servicios, Sobre mí, Contacto, (Cursos) — consume endpoints públicos (`GET /api/servicios`, `POST /api/contacto`).
- Panel `/admin` (protegido): login, gestión de Pacientes, Citas, Servicios, mensajes de Contacto — requiere JWT.

## Convenciones de código
- Componentes y código en inglés (convención React/TS habitual); textos de UI en español (o alemán donde aplique, el negocio es multilingüe).
- Server Components por defecto; `"use client"` solo cuando se necesite interactividad/estado.
- Sin comentarios explicando qué hace el código; solo para decisiones no obvias.

## Notas
- Este archivo se irá actualizando a medida que el proyecto avance.
