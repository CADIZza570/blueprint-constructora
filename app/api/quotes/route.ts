import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { quoteSchema } from "@/lib/validators"
import { calculateEstimate } from "@/lib/quote-calculator"
import { ZodError } from "zod"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = quoteSchema.parse(body)

    const estimate = calculateEstimate({
      projectType: data.projectType,
      area: data.area,
      budget: data.budget,
    })

    const quote = await prisma.$transaction(async (tx) => {
      const client = await tx.client.upsert({
        where: { email: data.email },
        update: {
          name: data.name,
          phone: data.phone || null,
          company: data.company || null,
        },
        create: {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
        },
      })

      return tx.quote.create({
        data: {
          clientId: client.id,
          projectType: data.projectType,
          area: data.area ? Number(data.area) : null,
          location: data.location,
          description: data.description,
          budget: data.budget ? Number(data.budget) : null,
          startDate: data.startDate ? new Date(data.startDate) : null,
          estimatedMin: estimate.min,
          estimatedMax: estimate.max,
        },
        include: { client: true },
      })
    })

    return NextResponse.json({ success: true, quoteId: quote.id }, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { success: false, message: "Datos inválidos", errors: err.issues },
        { status: 400 }
      )
    }
    console.error("[POST /api/quotes]", err)
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"))
    const limit = 20

    const quotes = await prisma.quote.findMany({
      where: status ? { status: status as never } : undefined,
      include: { client: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.quote.count({
      where: status ? { status: status as never } : undefined,
    })

    return NextResponse.json({ quotes, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    console.error("[GET /api/quotes]", err)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}
