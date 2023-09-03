import { updateGlossarySchema } from '@/@types/glossary'
import { glossaryApi } from '@/server/prisma/glossary'
import { NextRequest, NextResponse } from 'next/server'

import { privateRoutesMiddleware } from '../../middleware'

interface Params {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params: { id } }: Params) {
  const { glossary, error } = await glossaryApi.getById({ id })

  if (error) return NextResponse.json(error.message, { status: 400 })
  return NextResponse.json(glossary)
}

export async function PUT(req: NextRequest, { params: { id } }: Params) {
  const body = await req.json()
  const editedGlossary = updateGlossarySchema.parse(body)
  const { glossary, error } = await glossaryApi.put({ ...editedGlossary, id })

  if (error) return NextResponse.json(error.message, { status: 400 })
  return NextResponse.json(glossary)
}

export async function DELETE(req: NextRequest, { params: { id } }: Params) {
  const { error: invalidToken } = await privateRoutesMiddleware(req)
  if (invalidToken) return NextResponse.json(invalidToken.message, { status: 400 })

  const { error } = await glossaryApi.delete({ id })

  if (error) return NextResponse.json(error.message, { status: 400 })
  return NextResponse.json({ success: 'glossary deleted successfully' })
}
