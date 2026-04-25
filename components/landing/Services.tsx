"use client"

import { useLang } from "@/components/LanguageProvider"
import { Hammer, Bath, Home, PlusSquare, Layers, Trees } from "lucide-react"

const ICONS = [Hammer, Bath, Home, PlusSquare, Layers, Trees]

export function Services() {
  const { t } = useLang()

  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">{t.services.tag}</span>
          <h2 className="text-4xl md:text-5xl font-black text-stone-900 mt-3 mb-4">{t.services.title}</h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">{t.services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((service, i) => {
            const Icon = ICONS[i]
            return (
              <div
                key={service.title}
                className="group p-7 rounded-2xl border border-stone-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 bg-amber-100 group-hover:bg-amber-500 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-2">{service.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
