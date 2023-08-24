import { updateGameSchema } from '@/@types/games'
import { gamesApi } from '@/server/prisma/games'
import { NextRequest, NextResponse } from 'next/server'

import { privateRoutesMiddleware } from '../../middleware'

interface Params {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params: { id } }: Params) {
  const { game, error } = await gamesApi.getById({ id })

  if (error) return NextResponse.json(error.message, { status: 400 })
  return NextResponse.json(game)
}

export async function PUT(req: NextRequest, { params: { id } }: Params) {
  const body = await req.json()
  const editedGame = updateGameSchema.parse(body)
  const { game, error } = await gamesApi.put({ ...editedGame, id })

  if (error) return NextResponse.json(error.message, { status: 400 })
  return NextResponse.json(game)
}

export async function DELETE(req: NextRequest, { params: { id } }: Params) {
  const { error: invalidToken } = await privateRoutesMiddleware(req)
  if (invalidToken) return NextResponse.json(invalidToken.message, { status: 400 })

  const { error } = await gamesApi.delete({ id })

  if (error) return NextResponse.json(error.message, { status: 400 })
  return NextResponse.json({ success: 'Game deleted successfully' })
}
