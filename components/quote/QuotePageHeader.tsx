"use client"

import { useLang } from "@/components/LanguageProvider"

export function QuotePageHeader() {
  const { t } = useLang()
  const p = t.quotePage
  return (
    <div className="text-center mb-12">
      <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">{p.tag}</span>
      <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-2">{p.title}</h1>
      <p className="text-stone-500 mt-3 max-w-lg mx-auto">{p.subtitle}</p>
    </div>
  )
}
