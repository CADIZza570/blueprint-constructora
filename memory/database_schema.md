# Database Schema — Blueprint Constructora

_Última actualización: 2026-04-25 | Estado: Schema definido, migración pendiente_

> **REGLA**: Leer este archivo antes de escribir cualquier query Prisma o SQL.
> Si añades/cambias una columna → actualiza este archivo en la misma operación.

---

## Enums

### ProjectType
```
RESIDENTIAL | COMMERCIAL | INDUSTRIAL | RENOVATION | INFRASTRUCTURE
```

### QuoteStatus
```
PENDING | REVIEWED | SENT | ACCEPTED | REJECTED
```

---

## Tabla: clients

| Columna | Tipo | Notas |
|---------|------|-------|
| id | String (cuid) | PK |
| name | String | requerido |
| email | String | unique |
| phone | String? | opcional |
| company | String? | opcional |
| createdAt | DateTime | auto |
| updatedAt | DateTime | auto |

---

## Tabla: projects (portafolio)

| Columna | Tipo | Notas |
|---------|------|-------|
| id | String (cuid) | PK |
| title | String | requerido |
| description | String? | opcional |
| category | ProjectType | enum |
| imageUrl | String? | URL de imagen |
| completedAt | DateTime? | fecha de entrega |
| featured | Boolean | default false |
| createdAt | DateTime | auto |

---

## Tabla: quotes

| Columna | Tipo | Notas |
|---------|------|-------|
| id | String (cuid) | PK |
| clientId | String | FK → clients.id |
| projectType | ProjectType | enum |
| area | Float? | en m² |
| location | String | requerido |
| description | String | mín 20 chars |
| budget | Float? | referencial del cliente |
| startDate | DateTime? | estimada |
| estimatedMin | Float? | calculado por sistema |
| estimatedMax | Float? | calculado por sistema |
| status | QuoteStatus | default PENDING |
| adminNotes | String? | notas internas |
| createdAt | DateTime | auto |
| updatedAt | DateTime | auto |

---

## Migraciones Aplicadas

| # | Nombre | Fecha | Estado |
|---|--------|-------|--------|
| 001 | init | 2026-04-25 | ✅ Aplicada |
