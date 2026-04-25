"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { useLang } from "@/components/LanguageProvider"
import { ArrowRight, Star } from "lucide-react"

export function Hero() {
  const { t, lang } = useLang()

  return (
    <section className="relative min-h-screen flex items-center bg-stone-950 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-stone-800/50 via-transparent to-transparent" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-6xl mx-auto px-6 py-32 md:py-0">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">{t.hero.tag}</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6">
            {t.hero.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-amber-400">{t.hero.title.split(" ").slice(-1)}</span>
          </h1>

          <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            {t.hero.subtitle}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/cotizar" className={buttonVariants({ size: "lg", className: "bg-amber-500 hover:bg-amber-400 text-white rounded-full px-8 h-12 text-base font-semibold gap-2 shadow-lg shadow-amber-500/25" })}>
              {t.hero.cta} <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2 text-stone-400 text-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>{t.hero.trust}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg">
          {[
            { n: "100+", label: lang === "es" ? "Proyectos" : "Projects" },
            { n: "8+",   label: lang === "es" ? "Años de experiencia" : "Years experience" },
            { n: "98%",  label: lang === "es" ? "Clientes satisfechos" : "Happy clients" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-black text-white">{s.n}</div>
              <div className="text-stone-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
