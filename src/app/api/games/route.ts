import { createGameSchema } from '@/@types/games'
import { errors } from '@/lib/errors'
import { gamesApi } from '@/server/prisma/games'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const { games, error } = await gamesApi.get()

  if (error) return NextResponse.json(error.message, { status: 400 })
  return NextResponse.json(games)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const newGame = createGameSchema.parse(body)
  const { game, error } = await gamesApi.post(newGame)

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return NextResponse.json(errors[error.code][error.meta?.target as any], { status: 400 })
  }

  if (error) return NextResponse.json(error.message, { status: 400 })
  return NextResponse.json(game)
}
