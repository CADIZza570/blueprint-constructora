# Active Sprint — Blueprint Constructora

_Última actualización: 2026-04-25 — Cierre de sesión_

---

## Estado: MVP COMPLETO EN PRODUCCIÓN ✅

Todas las 8 fases completadas y deployadas en Railway.
URL: https://blueprint-constructora-production.up.railway.app

---

## Lo que se hizo hoy (2026-04-25)

### Producción
- Deploy en Railway con RAILPACK (auto-detect) + migraciones en startCommand
- DATABASE_URL (Internal URL) configurada como variable en Railway
- Dominio Railway asignado: `blueprint-constructora-production.up.railway.app`

### i18n + UX
- QuoteForm conectado a useLang() — todos los textos responden al toggle EN/ES
- LanguageProvider persiste idioma en localStorage (sobrevive refresh y navegación)
- QuotePageHeader client component para header bilingüe en /cotizar
- Redirect a home tras enviar cotización (2.5s)

### Validaciones
- Phone: regex US estricto `+1 (614) xxx-xxxx` — números cortos rechazados
- Mensajes de error en inglés (regla restockiq Pillar 1)

### Código en inglés
- Todo el admin en inglés: labels, headers, status badges, botones
- Moneda USD en todo el sitio (antes CLP)
- Área en sqft (Columbus, Ohio)
- Locale `en-US` en admin
- Función `CotizarPage` → `QuotePage`

### Notificaciones automáticas
- Resend configurado: email al owner (gonzalo.d@proton.me) + email al cliente
- Google Sheets: fila automática en pestaña "Cotizaciones" por cada cotización
- Service account: blueprint-sheets@shopify-alerts-api.iam.gserviceaccount.com
- Variables en Railway: RESEND_API_KEY, NOTIFY_EMAIL, GOOGLE_SERVICE_ACCOUNT_JSON

---

## Pendiente para próxima sesión

### 🔴 Urgente
- [ ] Verificar dominio en Resend → para que emails lleguen a clientes (cualquier email)
- [ ] Proteger /admin con auth (ahora es público)

### 🟡 Post-MVP — próximas features
- [ ] Fotos en cotización (Cloudinary)
- [ ] Fecha de visita en terreno + Google Calendar
- [ ] PDF de cotización automático
- [ ] Email al cliente cuando admin actualiza estado

---

## Plan Estratégico — 8 Fases

| # | Fase | Estado |
|---|------|--------|
| 1 | Inicializar proyecto Next.js + dependencias | ✅ 2026-04-25 |
| 2 | Prisma + Schema DB + conexión PostgreSQL | ✅ 2026-04-25 |
| 3 | lib/: Prisma singleton + Zod validators + quote-calculator | ✅ 2026-04-25 |
| 4 | API Route POST /api/quotes con Integrity Validator | ✅ 2026-04-25 |
| 5 | Componente QuoteForm multi-step | ✅ 2026-04-25 |
| 6 | Landing Page: Hero + Services + Portfolio | ✅ 2026-04-25 |
| 7 | Panel de Administración | ✅ 2026-04-25 |
| 8 | Configurar Railway para despliegue | ✅ 2026-04-25 |
