import { cn } from "@/lib/utils"

const STATUS_CONFIG = {
  PENDING:  { label: "Pendiente",  classes: "bg-amber-100 text-amber-700 border-amber-200" },
  REVIEWED: { label: "Revisada",   classes: "bg-blue-100 text-blue-700 border-blue-200" },
  SENT:     { label: "Enviada",    classes: "bg-purple-100 text-purple-700 border-purple-200" },
  ACCEPTED: { label: "Aceptada",   classes: "bg-green-100 text-green-700 border-green-200" },
  REJECTED: { label: "Rechazada",  classes: "bg-red-100 text-red-700 border-red-200" },
} as const

type Status = keyof typeof STATUS_CONFIG

export function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDING
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", cfg.classes)}>
      {cfg.label}
    </span>
  )
}
