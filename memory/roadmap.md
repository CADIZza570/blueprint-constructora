# Roadmap — Blueprint Constructora

_Última actualización: 2026-04-25_

---

## MVP — 8 Fases (COMPLETADO ✅)

| # | Fase | Estado | Fecha |
|---|------|--------|-------|
| 1 | Next.js + dependencias + estructura | ✅ | 2026-04-25 |
| 2 | Prisma + Schema DB + PostgreSQL | ✅ | 2026-04-25 |
| 3 | lib/: singleton + validators + calculator | ✅ | 2026-04-25 |
| 4 | API Route POST /api/quotes | ✅ | 2026-04-25 |
| 5 | QuoteForm multi-step | ✅ | 2026-04-25 |
| 6 | Landing Page | ✅ | 2026-04-25 |
| 7 | Admin Panel | ✅ | 2026-04-25 |
| 8 | Deploy Railway | ✅ | 2026-04-25 |

---

## Post-MVP — Backlog Priorizado

### 🔴 Alta prioridad

| Feature | Descripción | Complejidad |
|---------|-------------|-------------|
| **Admin auth** | Proteger `/admin` con password o token — ahora es público | Baja |
| **Dominio verificado en Resend** | Para poder enviar emails a cualquier dirección (no solo gonzalo.d@proton.me) | Baja |
| **Fotos en cotización** | Cliente sube fotos del espacio a remodelar (Cloudinary/S3 + campo en DB) | Media |
| **Fecha de visita en terreno** | Cliente elige fecha/hora para visita presencial — continuar cotización en persona | Media |

### 🟡 Media prioridad

| Feature | Descripción | Complejidad |
|---------|-------------|-------------|
| **PDF de cotización** | Generar PDF automático con los detalles del estimado (react-pdf) | Media |
| **Email cuando admin actualiza estado** | Notificar al cliente cuando su cotización pasa a REVIEWED o ACCEPTED | Baja |
| **Dashboard con métricas** | Cotizaciones por mes, tasa de conversión, proyectos más solicitados | Media |
| **SEO dinámico** | Metadata por proyecto en portafolio, sitemap.xml, robots.txt | Baja |

### 🟢 Baja prioridad / Ideas futuras

| Feature | Descripción | Complejidad |
|---------|-------------|-------------|
| **Galería dinámica** | Subir fotos reales de proyectos completados al portafolio desde admin | Media |
| **Chat/WhatsApp widget** | Botón flotante de contacto directo | Baja |
| **Calculadora pública** | Estimador de precios embebido en la landing sin requerir formulario completo | Alta |
| **Multi-idioma admin** | Admin panel bilingüe EN/ES | Baja |
| **Testimonios** | Sección de reseñas de clientes en la landing | Baja |

---

## Detalle: Fotos en Cotización

El cliente podría adjuntar fotos del espacio antes de la visita. Flujo:
1. Agregar Step 3 al QuoteForm: "Fotos del espacio (opcional)"
2. Upload a Cloudinary (free tier: 25GB) o S3
3. Guardar URLs en nueva columna `photoUrls String[]` en tabla `quotes`
4. Mostrar fotos en el detalle de admin `/admin/quotes/[id]`

**Requiere:** cuenta Cloudinary + `CLOUDINARY_URL` en Railway

---

## Detalle: Fecha de Visita en Terreno

El cliente elige un horario preferido para que el equipo visite y tome medidas. Flujo:
1. Al final del QuoteForm (Step 3 o nuevo Step 4): selector de fecha + franja horaria
2. Guardar en nueva columna `preferredVisitDate DateTime?` en tabla `quotes`
3. Email al owner con la fecha de visita solicitada
4. Admin puede confirmar o proponer otra fecha → email de confirmación al cliente
5. Agregar a Google Calendar automáticamente (Google Calendar API, mismo service account)

**Requiere:** nueva migración Prisma + campo en form + lógica de email
