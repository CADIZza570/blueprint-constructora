"use client"

import { useLang } from "@/components/LanguageProvider"
import { CheckCircle2 } from "lucide-react"

export function About() {
  const { t, lang } = useLang()

  return (
    <section id="nosotros" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: visual */}
          <div className="relative">
            <div className="rounded-3xl bg-stone-950 h-80 lg:h-full min-h-[400px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/30 via-transparent to-transparent" />
              <div className="relative text-center px-8">
                <div className="text-7xl font-black text-white/10 leading-none select-none">VC</div>
                <div className="text-amber-400 font-bold text-xl mt-2">Ventura Construcciones</div>
                <div className="text-stone-500 text-sm mt-1">Est. Columbus, Ohio</div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-amber-500 text-white rounded-2xl px-6 py-4 shadow-xl shadow-amber-500/30">
              <div className="text-3xl font-black">8+</div>
              <div className="text-amber-100 text-xs font-medium">
                {lang === "es" ? "Años de experiencia" : "Years of experience"}
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">{t.about.tag}</span>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900 mt-3 mb-6 leading-tight">
              {t.about.title}
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-8">{t.about.body}</p>
            <ul className="space-y-3">
              {t.about.values.map(v => (
                <li key={v} className="flex items-center gap-3 text-stone-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
