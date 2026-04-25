# MEMORY — Blueprint Constructora

> Sistema de documentación vivo. Cada sesión lo deja más inteligente.
> Last updated: 2026-04-25 | Version: 2.0 — Producción completa + post-MVP activo

---

## Project Identity

- **Producto**: Plataforma web para empresa constructora
- **Stack**: Next.js 16 (App Router) + Tailwind CSS + Shadcn/UI + Prisma + PostgreSQL + Railway + Resend + Google Sheets
- **Directorio**: `/Users/constanzaaraya/example001/blueprint/`
- **Repo**: https://github.com/CADIZza570/blueprint-constructora
- **URL Producción**: https://blueprint-constructora-production.up.railway.app
- **Cliente**: Ventura Construcciones — remodelaciones de casas en Columbus, Ohio
- **Paleta**: ámbar (#f59e0b) + stone (gris cálido) + blanco
- **Idioma del sitio**: Bilingüe EN/ES con toggle (persiste en localStorage)

---

## Quick Reference — Archivos de Memoria

- [active_sprint.md](active_sprint.md) — fase actual + tareas pendientes
- [database_schema.md](database_schema.md) — schema Prisma real + columnas verificadas
- [roadmap.md](roadmap.md) — MVP completo + backlog priorizado
- [corrections.md](corrections.md) — errores anteriores y correcciones aplicadas
- [railway_deploy_playbook.md](railway_deploy_playbook.md) — guía de deploy paso a paso

---

## System Checkpoint

- **Status**: ✅ PRODUCCIÓN LIVE — MVP completo + notificaciones activas
- **URL**: https://blueprint-constructora-production.up.railway.app
- **Último deploy**: 2026-04-25 — Google Sheets + emails + i18n completo
- **Próxima acción**: Features post-MVP (ver roadmap.md)

---

## Logros Recientes

| Fecha | Logro |
|-------|-------|
| 2026-04-25 | Fases 1-8 completadas — plataforma en producción en Railway |
| 2026-04-25 | i18n completo EN/ES — QuoteForm, Landing, Admin, header /cotizar |
| 2026-04-25 | Persistencia de idioma en localStorage |
| 2026-04-25 | Validación US phone (+1 614 xxx xxxx) en QuoteForm |
| 2026-04-25 | Moneda USD + área en sqft en todo el sitio |
| 2026-04-25 | Emails automáticos con Resend — owner (gonzalo.d@proton.me) + cliente |
| 2026-04-25 | Google Sheets — fila automática en "Cotizaciones" por cada nueva cotización |
| 2026-04-25 | Redirect a home tras enviar cotización (2.5s delay) |
| 2026-04-25 | Todo el código en inglés — variables, funciones, admin UI, locales |

---

## Variables de Entorno en Railway

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL Internal URL (postgres.railway.internal) |
| `RESEND_API_KEY` | API key de Resend para emails |
| `NOTIFY_EMAIL` | gonzalo.d@proton.me (cuenta Resend del owner) |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Credenciales JSON del service account de Google |

---

## Reglas Críticas (no repetir errores)

- **Código en inglés**: variables, funciones, admin UI, locales → siempre inglés (Pillar 1 de restockiq)
- **DATABASE_URL en Railway**: usar Internal URL (`postgres.railway.internal`), nunca External en producción
- **prisma migrate deploy**: va en `startCommand`, no en build — el DNS interno no está disponible en build time
- **output: standalone** en Next.js es incompatible con `next start` — no usar
- **Resend sin dominio verificado**: solo puede enviar al email de la cuenta Resend (gonzalo.d@proton.me)
- **Google Sheets**: nombres de pestaña con espacios requieren comillas simples en el range

---

## Arquitectura del Sistema

```
Blueprint (Next.js App Router)
    ├── /                          ← Landing page (Hero + Services + Portfolio)
    ├── /cotizar                   ← Formulario de cotización (multi-step, bilingüe)
    ├── /admin                     ← Panel de administración (cotizaciones)
    └── /api/quotes                ← POST (crear + email + sheets) | GET | PATCH

Notificaciones automáticas (por cada cotización)
    ├── Email owner  → gonzalo.d@proton.me (Resend)
    ├── Email cliente → dirección del formulario (Resend)
    └── Google Sheets → pestaña "Cotizaciones" (googleapis)

Base de Datos (PostgreSQL en Railway)
    ├── clients   ← datos del cliente
    ├── projects  ← portafolio
    └── quotes    ← cotizaciones + estado + estimados
```
