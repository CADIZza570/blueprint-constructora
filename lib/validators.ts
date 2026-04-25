import { z } from "zod"

export const quoteSchema = z.object({
  name:        z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email:       z.string().email("Email inválido"),
  phone:       z.string().regex(/^\+?[\d\s\-() ]{7,15}$/, "Teléfono inválido").optional().or(z.literal("")),
  company:     z.string().optional(),

  projectType: z.enum(
    ["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "RENOVATION", "INFRASTRUCTURE"],
    { error: "Selecciona un tipo de proyecto" }
  ),
  area:        z.coerce.number().positive("El área debe ser mayor a 0").max(100000).optional().or(z.literal("")),
  location:    z.string().min(3, "Ingresa la ubicación del proyecto"),
  description: z.string().min(20, "Describe el proyecto con al menos 20 caracteres").max(1000),
  budget:      z.coerce.number().positive().optional().or(z.literal("")),
  startDate:   z.string().optional(),
}).refine(
  (data) => {
    if (["COMMERCIAL", "INDUSTRIAL"].includes(data.projectType) && !data.area) return false
    return true
  },
  { message: "Proyectos comerciales e industriales requieren especificar el área", path: ["area"] }
)

export type QuoteFormData = z.infer<typeof quoteSchema>
