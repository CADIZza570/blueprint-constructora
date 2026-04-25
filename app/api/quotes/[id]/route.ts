import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const patchSchema = z.object({
  status: z.enum(["PENDING", "REVIEWED", "SENT", "ACCEPTED", "REJECTED"]).optional(),
  adminNotes: z.string().max(2000).optional(),
})

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const quote = await prisma.quote.findUnique({
    where: { id },
    include: { client: true },
  })
  if (!quote) return NextResponse.json({ message: "Cotización no encontrada" }, { status: 404 })
  return NextResponse.json(quote)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const data = patchSchema.parse(body)

    const quote = await prisma.quote.update({
      where: { id },
      data,
      include: { client: true },
    })
    return NextResponse.json(quote)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Datos inválidos", errors: err.issues }, { status: 400 })
    }
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}
