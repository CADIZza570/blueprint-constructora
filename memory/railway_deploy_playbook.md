# Railway Deploy Playbook — Blueprint Constructora

_Última actualización: 2026-04-25_

---

## Variables de Entorno Requeridas en Railway

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (Railway provee automáticamente si usas su DB) |
| `NEXTAUTH_SECRET` | Solo si se implementa auth — string random 32 chars |

---

## Build Command en Railway

```
npx prisma migrate deploy && next build
```

> `migrate deploy` aplica migraciones pendientes en producción sin preguntas.
> Es diferente a `migrate dev` (que es solo para local).

## Start Command

```
next start
```

## Post-Install Hook (ya en package.json)

```json
"postinstall": "prisma generate"
```

Railway ejecuta `npm install` en cada deploy → `postinstall` genera el Prisma Client automáticamente.

---

## Checklist de Deploy

```
□ DATABASE_URL configurada en Railway env vars
□ prisma/migrations/ commiteado en el repo
□ package.json tiene "postinstall": "prisma generate"
□ Build command: npx prisma migrate deploy && next build
□ Build local limpio antes de push: npm run build
□ Verificar /api/quotes con POST de prueba post-deploy
```

---

## Pasos para Conectar DB en Railway

1. En Railway → New Project → Add Service → Database → PostgreSQL
2. Copiar `DATABASE_URL` desde la tab "Connect"
3. Pegarla en Railway env vars del servicio Next.js
4. También en `.env` local para desarrollo
