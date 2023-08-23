import { createGameSchema } from '@/@types/games'
import { gamesApi } from '@/server/prisma/games'
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

  if (error) return NextResponse.json(error.message, { status: 400 })
  return NextResponse.json(game)
}
