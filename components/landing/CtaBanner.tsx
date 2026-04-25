"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { useLang } from "@/components/LanguageProvider"
import { ArrowRight } from "lucide-react"

export function CtaBanner() {
  const { t } = useLang()

  return (
    <section className="py-24 bg-stone-950">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
          {t.cta.title}
        </h2>
        <p className="text-stone-400 text-lg mb-10 max-w-xl mx-auto">{t.cta.subtitle}</p>
        <Link href="/cotizar" className={buttonVariants({ size: "lg", className: "bg-amber-500 hover:bg-amber-400 text-white rounded-full px-10 text-base font-semibold gap-2 shadow-lg shadow-amber-500/30" })}>
          {t.cta.button} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
