# Railway Deploy Playbook — Blueprint Constructora

_Última actualización: 2026-04-25 — Fase 8 completada_

---

## Archivos de configuración creados

| Archivo | Propósito |
|---------|-----------|
| `railway.toml` | Build y start commands para Railway |
| `next.config.ts` | `output: "standalone"` para deploy optimizado |
| `package.json` | `build` incluye `prisma migrate deploy` |

---

## Variables de Entorno Requeridas en Railway

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL Internal URL (Railway dashboard → PostgreSQL → Connect → Internal URL) |

> Usar la **Internal URL** en producción (más rápida dentro de Railway).
> La **External URL** es solo para desarrollo local.

---

## Build y Start (ya configurados en railway.toml + package.json)

```
Build:  prisma migrate deploy && next build
Start:  next start
```

> `migrate deploy` aplica migraciones pendientes en producción sin preguntas interactivas.
> `postinstall` en package.json genera el Prisma Client automáticamente en cada deploy.

---

## Checklist de Deploy

```
□ DATABASE_URL (Internal URL) configurada en Railway env vars del servicio web
□ prisma/migrations/ commiteado en el repo
□ Build local limpio: npm run build (sin errores)
□ Push a main → Railway detecta y deploya automáticamente
□ Verificar healthcheck en / (Railway espera 200)
□ Verificar /api/quotes con POST de prueba post-deploy
```

---

## Pasos para conectar y deployar en Railway

1. Railway dashboard → New Project → Add Service → Database → PostgreSQL
2. Add Service → GitHub Repo → seleccionar este repo
3. En el servicio web → Variables → agregar `DATABASE_URL` (Internal URL del PostgreSQL)
4. Railway detecta `railway.toml` y usa la config automáticamente
5. Cada `git push` a `main` dispara un nuevo deploy

---

## Troubleshooting común

| Error | Causa | Fix |
|-------|-------|-----|
| `P1001: Can't reach database` | DATABASE_URL incorrecta o usa External en prod | Usar Internal URL |
| `P3009: migrate found failed migration` | Migración rota en prod | `prisma migrate resolve` manual |
| Build falla en `next build` | Faltan env vars en tiempo de build | Revisar variables en Railway |
