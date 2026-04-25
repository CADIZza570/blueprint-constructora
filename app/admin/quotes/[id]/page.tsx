import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { StatusUpdater } from "@/components/admin/StatusUpdater"
import { ArrowLeft, User, MapPin, FileText, DollarSign, Calendar } from "lucide-react"

export const dynamic = "force-dynamic"

const PROJECT_LABELS: Record<string, string> = {
  RESIDENTIAL: "Residencial", COMMERCIAL: "Comercial",
  INDUSTRIAL: "Industrial", RENOVATION: "Remodelación", INFRASTRUCTURE: "Infraestructura",
}

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const quote = await prisma.quote.findUnique({ where: { id }, include: { client: true } })
  if (!quote) notFound()

  return (
    <div className="p-8 max-w-5xl">
      {/* Back */}
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-800 text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver al dashboard
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">{quote.client.name}</h1>
          <p className="text-stone-500 text-sm mt-1">{PROJECT_LABELS[quote.projectType]} · {quote.location}</p>
        </div>
        <StatusBadge status={quote.status as never} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: info */}
        <div className="lg:col-span-2 space-y-5">

          {/* Cliente */}
          <Card title="Datos del cliente" icon={User}>
            <Row label="Nombre"   value={quote.client.name} />
            <Row label="Email"    value={quote.client.email} />
            {quote.client.phone   && <Row label="Teléfono" value={quote.client.phone} />}
            {quote.client.company && <Row label="Empresa"  value={quote.client.company} />}
          </Card>

          {/* Proyecto */}
          <Card title="Detalles del proyecto" icon={FileText}>
            <Row label="Tipo"      value={PROJECT_LABELS[quote.projectType]} />
            <Row label="Ubicación" value={quote.location} />
            {quote.area && <Row label="Superficie" value={`${quote.area} m²`} />}
            {quote.startDate && (
              <Row label="Inicio estimado" value={new Date(quote.startDate).toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" })} />
            )}
            <div className="pt-2">
              <p className="text-xs text-stone-500 mb-1">Descripción</p>
              <p className="text-stone-700 text-sm leading-relaxed bg-stone-50 rounded-lg p-3">{quote.description}</p>
            </div>
          </Card>

          {/* Estimado */}
          <Card title="Estimado del sistema" icon={DollarSign}>
            {quote.estimatedMin ? (
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-stone-500 mb-1">Mínimo</p>
                  <p className="text-xl font-bold text-stone-900">${quote.estimatedMin.toLocaleString("es-CL")} CLP</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-1">Máximo</p>
                  <p className="text-xl font-bold text-stone-900">${quote.estimatedMax!.toLocaleString("es-CL")} CLP</p>
                </div>
              </div>
            ) : <p className="text-stone-400 text-sm">Sin estimado calculado</p>}
            {quote.budget && (
              <p className="text-xs text-stone-400 mt-2">Presupuesto referencial del cliente: ${Number(quote.budget).toLocaleString("es-CL")} CLP</p>
            )}
          </Card>
        </div>

        {/* Right: actions */}
        <div className="space-y-5">
          <Card title="Acciones" icon={Calendar}>
            <StatusUpdater quoteId={quote.id} current={quote.status} notes={quote.adminNotes} />
          </Card>

          <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 text-xs text-stone-500 space-y-1">
            <p>ID: <span className="font-mono">{quote.id}</span></p>
            <p>Recibida: {new Date(quote.createdAt).toLocaleString("es-CL")}</p>
            <p>Actualizada: {new Date(quote.updatedAt).toLocaleString("es-CL")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-stone-100 bg-stone-50">
        <Icon className="w-4 h-4 text-stone-400" />
        <h3 className="font-semibold text-stone-700 text-sm">{title}</h3>
      </div>
      <div className="p-5 space-y-3">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start text-sm">
      <span className="text-stone-500 shrink-0 mr-4">{label}</span>
      <span className="text-stone-800 font-medium text-right">{value}</span>
    </div>
  )
}
