type ProjectType = "RESIDENTIAL" | "COMMERCIAL" | "INDUSTRIAL" | "RENOVATION" | "INFRASTRUCTURE"

interface CalculatorInput {
  projectType: ProjectType
  area?: number | string
  budget?: number | string
}

interface EstimatedRange {
  min: number
  max: number
}

// Precio base por m² según tipo de proyecto (CLP)
const BASE_PRICE_PER_SQM: Record<ProjectType, { min: number; max: number }> = {
  RESIDENTIAL:    { min: 600_000,   max: 1_200_000 },
  COMMERCIAL:     { min: 800_000,   max: 1_600_000 },
  INDUSTRIAL:     { min: 500_000,   max: 900_000   },
  RENOVATION:     { min: 300_000,   max: 700_000   },
  INFRASTRUCTURE: { min: 1_000_000, max: 2_500_000 },
}

// Mínimo por proyecto aunque el área sea pequeña o no se informe
const MIN_PROJECT_VALUE: Record<ProjectType, number> = {
  RESIDENTIAL:    15_000_000,
  COMMERCIAL:     25_000_000,
  INDUSTRIAL:     40_000_000,
  RENOVATION:     5_000_000,
  INFRASTRUCTURE: 80_000_000,
}

export function calculateEstimate(input: CalculatorInput): EstimatedRange {
  const { projectType } = input
  const area = input.area ? Number(input.area) : undefined
  const clientBudget = input.budget ? Number(input.budget) : undefined

  const rates = BASE_PRICE_PER_SQM[projectType]
  const minFloor = MIN_PROJECT_VALUE[projectType]

  let min: number
  let max: number

  if (area && area > 0) {
    min = area * rates.min
    max = area * rates.max
  } else {
    // Sin área: usamos mínimos del tipo de proyecto
    min = minFloor
    max = minFloor * 2
  }

  // Aplicar piso mínimo
  min = Math.max(min, minFloor)
  max = Math.max(max, minFloor * 1.5)

  // Si el cliente tiene un presupuesto referencial muy por debajo, informarlo igual
  // pero no alterar el cálculo técnico — el admin decide cómo manejarlo
  if (clientBudget && clientBudget < min * 0.7) {
    // El presupuesto es inferior al 70% del mínimo estimado — se registra pero no afecta el rango
  }

  return {
    min: Math.round(min / 100_000) * 100_000,   // redondear a $100k
    max: Math.round(max / 100_000) * 100_000,
  }
}
