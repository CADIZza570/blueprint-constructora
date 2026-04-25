"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const STATUSES = [
  { value: "PENDING",  label: "Pending" },
  { value: "REVIEWED", label: "Reviewed" },
  { value: "SENT",     label: "Sent" },
  { value: "ACCEPTED", label: "Accepted" },
  { value: "REJECTED", label: "Rejected" },
]

export function StatusUpdater({ quoteId, current, notes }: { quoteId: string; current: string; notes: string | null }) {
  const router = useRouter()
  const [status, setStatus] = useState(current)
  const [adminNotes, setAdminNotes] = useState(notes ?? "")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function save() {
    setSaving(true)
    setSaved(false)
    await fetch(`/api/quotes/${quoteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNotes }),
    })
    setSaving(false)
    setSaved(true)
    router.refresh()
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          {STATUSES.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Internal Notes</label>
        <textarea
          value={adminNotes}
          onChange={e => setAdminNotes(e.target.value)}
          rows={4}
          placeholder="Notes visible only to the team..."
          className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-lg py-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : saved ? "✓ Saved" : "Save changes"}
      </button>
    </div>
  )
}
