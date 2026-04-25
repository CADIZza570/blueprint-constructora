import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { FileText, TrendingUp, Clock, CheckCircle } from "lucide-react"

const PROJECT_LABELS: Record<string, string> = {
  RESIDENTIAL: "Residencial", COMMERCIAL: "Comercial",
  INDUSTRIAL: "Industrial", RENOVATION: "Remodelación", INFRASTRUCTURE: "Infraestructura",
}

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const [quotes, total, pending, accepted] = await Promise.all([
    prisma.quote.findMany({ include: { client: true }, orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.quote.count(),
    prisma.quote.count({ where: { status: "PENDING" } }),
    prisma.quote.count({ where: { status: "ACCEPTED" } }),
  ])

  const totalEstimated = quotes.reduce((sum, q) => sum + (q.estimatedMin ?? 0), 0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 text-sm mt-1">Cotizaciones recibidas de Ventura Construcciones</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FileText}    label="Total"       value={total}   color="stone" />
        <StatCard icon={Clock}       label="Pendientes"  value={pending} color="amber" />
        <StatCard icon={CheckCircle} label="Aceptadas"   value={accepted} color="green" />
        <StatCard icon={TrendingUp}  label="Estimado mín (CLP)"
          value={`$${(totalEstimated / 1_000_000).toFixed(0)}M`} color="blue" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100">
          <h2 className="font-semibold text-stone-800">Todas las cotizaciones</h2>
        </div>

        {quotes.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>Aún no hay cotizaciones</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-3 font-semibold">Cliente</th>
                  <th className="text-left px-6 py-3 font-semibold">Proyecto</th>
                  <th className="text-left px-6 py-3 font-semibold">Ubicación</th>
                  <th className="text-left px-6 py-3 font-semibold">Estimado</th>
                  <th className="text-left px-6 py-3 font-semibold">Estado</th>
                  <th className="text-left px-6 py-3 font-semibold">Fecha</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {quotes.map(q => (
                  <tr key={q.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-900">{q.client.name}</div>
                      <div className="text-stone-400 text-xs">{q.client.email}</div>
                    </td>
                    <td className="px-6 py-4 text-stone-600">{PROJECT_LABELS[q.projectType]}</td>
                    <td className="px-6 py-4 text-stone-600">{q.location}</td>
                    <td className="px-6 py-4">
                      {q.estimatedMin ? (
                        <span className="font-medium text-stone-800">
                          ${(q.estimatedMin / 1_000_000).toFixed(0)}M – ${(q.estimatedMax! / 1_000_000).toFixed(0)}M
                        </span>
                      ) : <span className="text-stone-400">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={q.status as never} />
                    </td>
                    <td className="px-6 py-4 text-stone-400 text-xs">
                      {new Date(q.createdAt).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/quotes/${q.id}`} className="text-amber-600 hover:text-amber-700 font-medium text-xs">
                        Ver →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType; label: string; value: string | number
  color: "stone" | "amber" | "green" | "blue"
}) {
  const colors = {
    stone: "bg-stone-100 text-stone-600",
    amber: "bg-amber-100 text-amber-600",
    green: "bg-green-100 text-green-600",
    blue:  "bg-blue-100 text-blue-600",
  }
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${colors[color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-2xl font-bold text-stone-900">{value}</div>
      <div className="text-stone-500 text-xs mt-1">{label}</div>
    </div>
  )
}
