"use client"

import Link from "next/link"
import { useLang } from "@/components/LanguageProvider"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

const GRADIENTS = [
  "from-amber-400 to-orange-500",
  "from-stone-600 to-stone-800",
  "from-amber-600 to-yellow-700",
  "from-stone-400 to-stone-600",
  "from-orange-400 to-amber-600",
  "from-stone-700 to-stone-900",
]

export function Portfolio() {
  const { t } = useLang()

  return (
    <section id="proyectos" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">{t.portfolio.tag}</span>
          <h2 className="text-4xl md:text-5xl font-black text-stone-900 mt-3 mb-4">{t.portfolio.title}</h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">{t.portfolio.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.portfolio.items.map((project, i) => (
            <div key={project.title} className="group rounded-2xl overflow-hidden bg-white border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {/* Image placeholder with gradient */}
              <div className={`h-48 bg-gradient-to-br ${GRADIENTS[i]} relative`}>
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {project.type}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-stone-900 text-sm leading-tight">{project.title}</h3>
                <p className="text-stone-400 text-xs mt-1">{project.area}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/cotizar" className={buttonVariants({ variant: "outline", className: "rounded-full px-8 border-stone-300 hover:border-amber-400 hover:text-amber-600 gap-2" })}>
            {t.cta.button} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
