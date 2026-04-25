# CLAUDE.md — Blueprint Constructora
# Reglas vivas. Se editan sin piedad después de cada corrección.
# Sistema que vive: cada sesión lo deja más inteligente.
#
# 🔥 LEMA: "Simple no es descuidado. Sobre-ingeniería es también un error.
#           Construimos en orden, una fase a la vez."

---

## ⚡ Contexto Rápido
- **Producto**: Plataforma web para empresa constructora — cotizaciones + portafolio + admin panel
- **Stack**: Next.js (App Router) + Tailwind CSS + Shadcn/UI + Prisma + PostgreSQL + Railway
- **Memoria completa**: `memory/` en este repo
- **Plan estratégico activo**: 8 fases — ver `memory/active_sprint.md`

---

## 🛣️ La Carretera — Antes de Arrancar

```
1. Leer memory/MEMORY.md        ← identidad + reglas + estado actual
2. Leer memory/corrections.md   ← errores anteriores de este proyecto
3. Leer memory/active_sprint.md ← en qué fase estamos ahora
```

---

## 🔴 Zona No-Retorno (nunca, sin excepción)

```
✗ Editar prisma/schema.prisma sin actualizar memory/database_schema.md
✗ Avanzar de fase sin confirmar que la anterior funciona
✗ Español en código, SQL, nombres de variables o columnas
✗ DATABASE_URL hardcodeada en código (solo en .env / Railway env vars)
✗ Lógica de negocio mezclada en API Routes (va en lib/)
✗ Saltarse el Integrity Validator en el POST /api/quotes
✗ Push a main sin build local limpio
```

---

## ⚙️ Los 6 Principios de Ejecución

**1. Plan primero** — Seguir el orden de las 8 fases sin excepción.
Si algo se rompe durante una fase → STOP → documentar en corrections.md → re-planear.

**2. Una fase = un bloque completo** — No mezclar código de la Fase 3 con la Fase 5.
Cada fase debe quedar funcional antes de avanzar.

**3. Autocorrección** — Corrección del usuario → corrections.md + este archivo, inmediatamente.
Leer corrections.md al inicio de cada sesión.

**4. Verificación** — done = demostrado, no "parece que funciona".
Para APIs: responde correctamente. Para UI: se ve y funciona en browser.

**5. Elegancia** — Solución más simple que sobrevive producción.
No abstraer lo que no se necesita todavía.

**6. Fix completo** — Error = raíz + fix + verificar. Nunca reportar y seguir.

---

## ✅ Done Significa Demostrado

| Tarea | Done cuando... |
|---|---|
| Schema Prisma | migration aplicada + prisma studio sin errores ✓ |
| API Route | responde con status correcto + datos válidos ✓ |
| Componente UI | se renderiza + validaciones funcionan en browser ✓ |
| Landing Page | todas las secciones visibles + responsive ✓ |
| Admin Panel | lista cotizaciones + cambio de estado funciona ✓ |
| Deploy Railway | build limpio + DATABASE_URL conectada + /api/quotes 200 ✓ |
| Memory update | archivo + MEMORY.md checkpoint + timestamp ✓ |

---

## 📋 Fin de Sesión — No Olvides el Gas

```
□ Corrección del usuario  → corrections.md + este archivo
□ Estado del sistema cambió → MEMORY.md Checkpoint
□ Fase completada         → active_sprint.md actualizado
□ Logro nuevo             → MEMORY.md Logros Recientes
□ Deuda detectada         → roadmap.md
□ Bug nuevo               → corrections.md
```

---

## 📌 Reglas de Comportamiento
*(se agregan aquí después de cada corrección — nunca se borran, solo se refuerzan)*

- **R001** [2026-04-25] — Leer `memory/database_schema.md` antes de escribir cualquier SQL o query Prisma. Nunca asumir nombres de columnas.
- **R002** [2026-04-25] — El Zod schema en `lib/validators.ts` es la fuente de verdad para validación. Si cambia el schema Prisma, el Zod schema se actualiza en la misma operación.
- **R003** [2026-04-25] — Todo componente de UI que haga fetch a una API espera los estados: loading, success, error. Sin excepción.

---

## 🗃️ Archivos Críticos de Referencia

| Qué necesito saber | Dónde está |
|---|---|
| Estado del sistema | `memory/MEMORY.md` |
| Schema de DB | `memory/database_schema.md` |
| Roadmap y backlog | `memory/roadmap.md` |
| Sprint actual | `memory/active_sprint.md` |
| Correcciones | `memory/corrections.md` |
| Deploy Railway | `memory/railway_deploy_playbook.md` |

---

_Última actualización: 2026-04-25 | Versión: 1.0 — Setup inicial_
_Este archivo vive en el repo — se commitea con cada cambio de regla_
