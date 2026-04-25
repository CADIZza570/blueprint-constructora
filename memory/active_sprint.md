# Active Sprint — Blueprint Constructora

_Última actualización: 2026-04-25_

---

## Fase Actual: FASE 8 COMPLETADA — Configurar Railway para despliegue

### Qué se hizo
- `railway.toml` creado con buildCommand y startCommand
- `next.config.ts` → `output: "standalone"` para deploy optimizado
- `package.json` build script → `prisma migrate deploy && next build`
- `.env.example` actualizado con instrucciones de Internal vs External URL
- `memory/railway_deploy_playbook.md` actualizado con checklist y troubleshooting

### Pendiente (acción del usuario en Railway dashboard)
- [ ] Crear servicio Web en Railway apuntando al repo GitHub
- [ ] Agregar `DATABASE_URL` (Internal URL) en env vars del servicio web
- [ ] Hacer push a main y verificar que el build pasa
- [ ] Verificar `/api/quotes` con POST de prueba post-deploy

---

## Plan Estratégico Completo — 8 Fases

| # | Fase | Estado |
|---|------|--------|
| 1 | Inicializar proyecto Next.js + dependencias | ✅ Completado 2026-04-25 |
| 2 | Prisma + Schema DB + conexión PostgreSQL | ✅ Completado 2026-04-25 |
| 3 | lib/: Prisma singleton + Zod validators + quote-calculator | ✅ Completado 2026-04-25 |
| 4 | API Route POST /api/quotes con Integrity Validator | ✅ Completado 2026-04-25 |
| 5 | Componente QuoteForm multi-step | ✅ Completado 2026-04-25 |
| 6 | Landing Page: Hero + Services + Portfolio | ✅ Completado 2026-04-25 |
| 7 | Panel de Administración | ✅ Completado 2026-04-25 |
| 8 | Configurar Railway para despliegue | ✅ Completado 2026-04-25 |
