import { createGlossarySchema } from '@/@types/glossary'
import { errors } from '@/lib/errors'
import { glossaryApi } from '@/server/prisma/glossary'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const { glossaries, error } = await glossaryApi.get()

  if (error) return NextResponse.json(error.message, { status: 400 })
  return NextResponse.json(glossaries)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const newGlossary = createGlossarySchema.parse(body)
  const { glossary, error } = await glossaryApi.post(newGlossary)

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return NextResponse.json(errors[error.code][error.meta?.target as any], { status: 400 })
  }

  if (error) return NextResponse.json(error.message, { status: 400 })
  return NextResponse.json(glossary)
}
