import { QuoteForm } from "@/components/quote/QuoteForm"
import { QuotePageHeader } from "@/components/quote/QuotePageHeader"

export const metadata = {
  title: "Get a Quote | Ventura Construcciones",
  description: "Tell us about your project and receive a personalized estimate within 24–48 hours.",
}

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto py-16 px-4">
        <QuotePageHeader />
        <QuoteForm />
      </div>
    </main>
  )
}
