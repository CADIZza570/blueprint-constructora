import Link from "next/link"
import { LayoutDashboard, FileText, Home } from "lucide-react"

export const metadata = { title: "Admin — Ventura Construcciones" }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-stone-900 flex flex-col shrink-0">
        <div className="px-5 py-6 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-amber-500 rounded-md flex items-center justify-center">
              <span className="text-white font-black text-xs">V</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm">Ventura</div>
              <div className="text-stone-500 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <SideLink href="/admin" icon={LayoutDashboard} label="Dashboard" />
          <SideLink href="/admin" icon={FileText} label="Cotizaciones" />
        </nav>
        <div className="px-3 py-4 border-t border-stone-800">
          <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-stone-300 text-xs transition-colors px-2 py-1.5">
            <Home className="w-3.5 h-3.5" />
            Ver sitio web
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

function SideLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors text-sm">
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  )
}
