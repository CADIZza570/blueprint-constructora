import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { StatusUpdater } from "@/components/admin/StatusUpdater"
import { ArrowLeft, User, MapPin, FileText, DollarSign, Calendar } from "lucide-react"

export const dynamic = "force-dynamic"

const PROJECT_LABELS: Record<string, string> = {
  RESIDENTIAL: "Residential", COMMERCIAL: "Commercial",
  INDUSTRIAL: "Industrial", RENOVATION: "Renovation", INFRASTRUCTURE: "Infrastructure",
}

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const quote = await prisma.quote.findUnique({ where: { id }, include: { client: true } })
  if (!quote) notFound()

  return (
    <div className="p-8 max-w-5xl">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-800 text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">{quote.client.name}</h1>
          <p className="text-stone-500 text-sm mt-1">{PROJECT_LABELS[quote.projectType]} · {quote.location}</p>
        </div>
        <StatusBadge status={quote.status as never} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">

          <Card title="Client Info" icon={User}>
            <Row label="Name"    value={quote.client.name} />
            <Row label="Email"   value={quote.client.email} />
            {quote.client.phone   && <Row label="Phone"   value={quote.client.phone} />}
            {quote.client.company && <Row label="Company" value={quote.client.company} />}
          </Card>

          <Card title="Project Details" icon={FileText}>
            <Row label="Type"     value={PROJECT_LABELS[quote.projectType]} />
            <Row label="Location" value={quote.location} />
            {quote.area && <Row label="Area" value={`${quote.area} sqft`} />}
            {quote.startDate && (
              <Row label="Est. Start" value={new Date(quote.startDate).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })} />
            )}
            <div className="pt-2">
              <p className="text-xs text-stone-500 mb-1">Description</p>
              <p className="text-stone-700 text-sm leading-relaxed bg-stone-50 rounded-lg p-3">{quote.description}</p>
            </div>
          </Card>

          <Card title="System Estimate" icon={DollarSign}>
            {quote.estimatedMin ? (
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-stone-500 mb-1">Minimum</p>
                  <p className="text-xl font-bold text-stone-900">${quote.estimatedMin.toLocaleString("en-US")} USD</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-1">Maximum</p>
                  <p className="text-xl font-bold text-stone-900">${quote.estimatedMax!.toLocaleString("en-US")} USD</p>
                </div>
              </div>
            ) : <p className="text-stone-400 text-sm">No estimate calculated yet</p>}
            {quote.budget && (
              <p className="text-xs text-stone-400 mt-2">Client reference budget: ${Number(quote.budget).toLocaleString("en-US")} USD</p>
            )}
          </Card>
        </div>

        <div className="space-y-5">
          <Card title="Actions" icon={Calendar}>
            <StatusUpdater quoteId={quote.id} current={quote.status} notes={quote.adminNotes} />
          </Card>

          <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 text-xs text-stone-500 space-y-1">
            <p>ID: <span className="font-mono">{quote.id}</span></p>
            <p>Received: {new Date(quote.createdAt).toLocaleString("en-US")}</p>
            <p>Updated: {new Date(quote.updatedAt).toLocaleString("en-US")}</p>
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
