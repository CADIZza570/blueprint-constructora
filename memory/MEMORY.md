# MEMORY — Blueprint Constructora

> Sistema de documentación vivo. Cada sesión lo deja más inteligente.
> Last updated: 2026-04-25 | Version: 1.0 — Setup inicial

---

## Project Identity

- **Producto**: Plataforma web para empresa constructora
- **Stack**: Next.js 16 (App Router) + Tailwind CSS + Shadcn/UI + Prisma + PostgreSQL + Railway
- **Directorio**: `/Users/constanzaaraya/example001/blueprint/`
- **Cliente**: Ventura Construcciones — remodelaciones de casas en Columbus, Ohio
- **Paleta**: ámbar (#f59e0b) + stone (gris cálido) + blanco
- **Idioma del sitio**: Español

---

## Quick Reference — Archivos de Memoria

- [active_sprint.md](active_sprint.md) — fase actual + tareas pendientes
- [database_schema.md](database_schema.md) — schema Prisma real + columnas verificadas
- [roadmap.md](roadmap.md) — 8 fases + estado de cada una
- [corrections.md](corrections.md) — errores anteriores y correcciones aplicadas
- [railway_deploy_playbook.md](railway_deploy_playbook.md) — guía de deploy paso a paso

---

## System Checkpoint

- **Status**: ✅ PRODUCCIÓN — Todas las fases completadas
- **Fase actual**: Completado — desplegado en Railway
- **Última acción**: Deploy exitoso en Railway (2026-04-25)
- **Próxima acción**: Mejoras iterativas / features nuevas

---

## Logros Recientes

| Fecha | Logro |
|-------|-------|
| 2026-04-25 | Fase 1 completada: Next.js 16 + Prisma + Shadcn/UI + estructura de proyecto |
| 2026-04-25 | Sistema memory/ inicializado (CLAUDE.md + 5 archivos de soporte) |
| 2026-04-25 | Fases 2-7 completadas: DB + API + QuoteForm + Landing + Admin Panel |
| 2026-04-25 | Fase 8 completada: Deploy exitoso en Railway — plataforma en produccion |

---

## Arquitectura del Sistema

```
Blueprint (Next.js App Router)
    ├── /                          ← Landing page (Hero + Services + Portfolio)
    ├── /cotizar                   ← Formulario de cotización (multi-step)
    ├── /admin                     ← Panel de administración (cotizaciones)
    └── /api/quotes                ← POST (crear) | GET (listar) | PATCH (actualizar estado)

Base de Datos (PostgreSQL en Railway)
    ├── clients                    ← datos del cliente que solicita cotización
    ├── projects                   ← portafolio de proyectos completados
    └── quotes                     ← cotizaciones recibidas + estado + estimados
```
