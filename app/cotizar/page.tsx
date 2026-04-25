import { QuoteForm } from "@/components/quote/QuoteForm"

export const metadata = {
  title: "Solicitar Cotización | Blueprint Constructora",
  description: "Cuéntanos tu proyecto y recibe una cotización personalizada en 24–48 horas.",
}

export default function CotizarPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">Cotización</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
            Hablemos de tu proyecto
          </h1>
          <p className="text-stone-500 mt-3 max-w-lg mx-auto">
            Completa el formulario y te enviamos un presupuesto estimado sin compromiso.
          </p>
        </div>
        <QuoteForm />
      </div>
    </main>
  )
}
