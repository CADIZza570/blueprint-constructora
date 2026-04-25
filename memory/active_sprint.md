# Active Sprint — Blueprint Constructora

_Última actualización: 2026-04-25_

---

## Fase Actual: FASE 2 — Prisma + Schema DB + Conexión PostgreSQL

### Objetivo
Tener el schema de base de datos definido, migración inicial aplicada y conexión a PostgreSQL lista.

### Tareas
- [ ] Escribir `prisma/schema.prisma` definitivo (Client + Project + Quote + enums)
- [ ] Configurar `DATABASE_URL` en `.env` (local para desarrollo)
- [ ] Ejecutar `prisma migrate dev --name init`
- [ ] Verificar con `prisma studio` que las tablas existen
- [ ] Actualizar `memory/database_schema.md` con el schema real

### Done cuando...
- `prisma migrate dev` corre sin errores
- `prisma studio` muestra las 3 tablas
- `memory/database_schema.md` está al día

---

## Plan Estratégico Completo — 8 Fases

| # | Fase | Estado |
|---|------|--------|
| 1 | Inicializar proyecto Next.js + dependencias | ✅ Completado 2026-04-25 |
| 2 | Prisma + Schema DB + conexión PostgreSQL | 🔄 En progreso |
| 3 | lib/: Prisma singleton + Zod validators + quote-calculator | ⏳ Pendiente |
| 4 | API Route POST /api/quotes con Integrity Validator | ⏳ Pendiente |
| 5 | Componente QuoteForm multi-step | ⏳ Pendiente |
| 6 | Landing Page: Hero + Services + Portfolio | ⏳ Pendiente |
| 7 | Panel de Administración | ⏳ Pendiente |
| 8 | Configurar Railway para despliegue | ⏳ Pendiente |
