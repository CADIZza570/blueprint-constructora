import { z } from "zod"

const US_PHONE = /^\+1[\s.\-]?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$/

export const quoteSchema = z.object({
  name:        z.string().min(2, "Name must be at least 2 characters"),
  email:       z.string().email("Invalid email address"),
  phone:       z.string()
    .regex(US_PHONE, "Enter a valid US number: +1 614 223 9039")
    .optional()
    .or(z.literal("")),
  company:     z.string().optional(),

  projectType: z.enum(
    ["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "RENOVATION", "INFRASTRUCTURE"],
    { error: "Select a project type" }
  ),
  area: z.preprocess(
    (v) => (v === "" || v == null ? undefined : Number(v)),
    z.number().positive("Area must be greater than 0").max(100000).optional()
  ),
  location:    z.string().min(3, "Enter the project location"),
  description: z.string().min(20, "Describe the project in at least 20 characters").max(1000),
  budget: z.preprocess(
    (v) => (v === "" || v == null ? undefined : Number(v)),
    z.number().positive().optional()
  ),
  startDate:   z.string().optional(),
}).refine(
  (data) => {
    if (["COMMERCIAL", "INDUSTRIAL"].includes(data.projectType) && !data.area) return false
    return true
  },
  { message: "Commercial and industrial projects require an area", path: ["area"] }
)

export type QuoteFormData = z.infer<typeof quoteSchema>
