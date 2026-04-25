"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { quoteSchema, type QuoteFormData } from "@/lib/validators"
import { useLang } from "@/components/LanguageProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CheckCircle2, Loader2, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react"

const STEP_FIELDS: (keyof QuoteFormData)[][] = [
  ["name", "email", "phone", "company"],
  ["projectType", "area", "location", "description", "budget", "startDate"],
]

export function QuoteForm() {
  const { t } = useLang()
  const q = t.quote

  const router = useRouter()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema) as unknown as Resolver<QuoteFormData>,
    mode: "onBlur",
  })

  const projectType = watch("projectType")

  async function nextStep() {
    const valid = await trigger(STEP_FIELDS[step])
    if (valid) setStep((s) => s + 1)
  }

  async function onSubmit(data: QuoteFormData) {
    setServerError(null)
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.message ?? q.errorFallback)
      setSubmitted(true)
      setTimeout(() => router.push("/"), 2500)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : q.errorFallback)
    }
  }

  if (submitted) return <SuccessState title={q.success.title} body={q.success.body} />

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Stepper */}
      <div className="flex items-center mb-10">
        {q.steps.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                i < step  ? "bg-amber-500 text-white shadow-md shadow-amber-200" :
                i === step ? "bg-stone-900 text-white shadow-md" :
                             "bg-stone-100 text-stone-400"
              )}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={cn(
                "text-xs font-medium hidden sm:block transition-colors",
                i === step ? "text-stone-800" : "text-stone-400"
              )}>{label}</span>
            </div>
            {i < q.steps.length - 1 && (
              <div className={cn(
                "flex-1 h-0.5 mx-3 transition-all duration-500",
                i < step ? "bg-amber-500" : "bg-stone-200"
              )} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">

          {/* Step 1 */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-stone-800">{q.step1.title}</h2>
                <p className="text-stone-500 text-sm mt-1">{q.step1.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={q.step1.name} error={errors.name?.message}>
                  <Input {...register("name")} placeholder={q.step1.namePlaceholder} />
                </Field>
                <Field label={q.step1.email} error={errors.email?.message}>
                  <Input {...register("email")} type="email" placeholder={q.step1.emailPlaceholder} />
                </Field>
                <Field label={q.step1.phone} error={errors.phone?.message}>
                  <Input {...register("phone")} placeholder={q.step1.phonePlaceholder} />
                </Field>
                <Field label={q.step1.company} error={errors.company?.message}>
                  <Input {...register("company")} placeholder={q.step1.companyPlaceholder} />
                </Field>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-stone-800">{q.step2.title}</h2>
                <p className="text-stone-500 text-sm mt-1">{q.step2.subtitle}</p>
              </div>
              <Field label={q.step2.projectType} error={errors.projectType?.message}>
                <Select onValueChange={(v) => setValue("projectType", v as QuoteFormData["projectType"], { shouldValidate: true })}>
                  <SelectTrigger>
                    <SelectValue placeholder={q.step2.selectPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {q.projectTypes.map((pt) => (
                      <SelectItem key={pt.value} value={pt.value}>{pt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label={["COMMERCIAL", "INDUSTRIAL"].includes(projectType) ? q.step2.areaRequired : q.step2.area}
                  error={errors.area?.message}
                >
                  <Input {...register("area")} type="number" placeholder={q.step2.areaPlaceholder} />
                </Field>
                <Field label={q.step2.location} error={errors.location?.message}>
                  <Input {...register("location")} placeholder={q.step2.locationPlaceholder} />
                </Field>
              </div>
              <Field label={q.step2.description} error={errors.description?.message}>
                <Textarea
                  {...register("description")}
                  rows={4}
                  placeholder={q.step2.descPlaceholder}
                  className="resize-none"
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={q.step2.budget} error={errors.budget?.message}>
                  <Input {...register("budget")} type="number" placeholder={q.step2.budgetPlaceholder} />
                </Field>
                <Field label={q.step2.startDate} error={errors.startDate?.message}>
                  <Input {...register("startDate")} type="date" />
                </Field>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-stone-800">{q.step3.title}</h2>
                <p className="text-stone-500 text-sm mt-1">{q.step3.subtitle}</p>
              </div>
              <div className="bg-stone-50 rounded-xl p-5 space-y-3 border border-stone-100">
                <SummaryRow label={q.step3.name}     value={watch("name")} />
                <SummaryRow label={q.step3.email}    value={watch("email")} />
                <SummaryRow label={q.step3.project}  value={q.projectTypes.find(pt => pt.value === watch("projectType"))?.label} />
                <SummaryRow label={q.step3.location} value={watch("location")} />
                {watch("area") && <SummaryRow label={q.step3.area} value={`${watch("area")} ${q.step3.areaUnit}`} />}
              </div>
              {serverError && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {serverError}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-5">
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={() => setStep(s => s - 1)} className="gap-1">
              <ChevronLeft className="w-4 h-4" /> {q.back}
            </Button>
          ) : <div />}

          {step < 2 ? (
            <Button type="button" onClick={nextStep} className="bg-amber-500 hover:bg-amber-600 text-white gap-1">
              {q.next} <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="bg-stone-900 hover:bg-stone-800 text-white min-w-[160px]">
              {isSubmitting
                ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {q.submitting}</>
                : q.submit}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-stone-700 text-sm font-medium">{label}</Label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value?: string | number }) {
  if (!value) return null
  return (
    <div className="flex justify-between text-sm">
      <span className="text-stone-500">{label}</span>
      <span className="text-stone-800 font-medium text-right max-w-[60%]">{value}</span>
    </div>
  )
}

function SuccessState({ title, body }: { title: string; body: string }) {
  return (
    <div className="text-center py-20 space-y-4">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8 text-amber-500" />
      </div>
      <h2 className="text-2xl font-semibold text-stone-800">{title}</h2>
      <p className="text-stone-500 max-w-sm mx-auto text-sm leading-relaxed">{body}</p>
    </div>
  )
}
