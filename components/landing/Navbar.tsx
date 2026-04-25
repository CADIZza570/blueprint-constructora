"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { useLang } from "@/components/LanguageProvider"

export function Navbar() {
  const { t, lang, toggle } = useLang()

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">V</span>
          </div>
          <span className="font-bold text-stone-900 text-lg tracking-tight">Ventura</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-stone-600 font-medium">
          <Link href="#servicios" className="hover:text-stone-900 transition-colors">{t.nav.services}</Link>
          <Link href="#proyectos" className="hover:text-stone-900 transition-colors">{t.nav.projects}</Link>
          <Link href="#nosotros"  className="hover:text-stone-900 transition-colors">{t.nav.about}</Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors border border-stone-200 rounded-full px-3 py-1.5 hover:border-stone-400"
          >
            <span className={lang === "es" ? "text-stone-900" : "text-stone-400"}>ES</span>
            <span className="text-stone-300">|</span>
            <span className={lang === "en" ? "text-stone-900" : "text-stone-400"}>EN</span>
          </button>

          <Link href="/cotizar" className={buttonVariants({ className: "bg-amber-500 hover:bg-amber-600 text-white rounded-full px-5 h-9 text-sm" })}>
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  )
}
