import { CreateGame } from '@/@types/games'
import { Prisma } from '@prisma/client'

import { prisma } from '.'

export type GameWithCards = Prisma.GameGetPayload<{ include: { cards: true } }>

class GamesApi {
  prisma: Prisma.GameDelegate

  constructor() {
    this.prisma = prisma.game
  }

  async get() {
    try {
      const games = await this.prisma.findMany({ include: { cards: true } })
      return { games }
    } catch (error: any) {
      return { error }
    }
  }

  async getById({ id }: { id: string }) {
    try {
      const game = await this.prisma.findUnique({ where: { id } })
      return { game }
    } catch (error: any) {
      return { error }
    }
  }

  async post({ cards, ...newGame }: CreateGame) {
    try {
      const game = await this.prisma.create({
        data: { ...newGame, cards: { createMany: { data: cards } } },
        include: { cards: true }
      })
      return { game }
    } catch (error: any) {
      return { error }
    }
  }

  async delete({ id }: { id: string }) {
    try {
      await this.prisma.delete({ where: { id } })
      return {}
    } catch (error: any) {
      return { error }
    }
  }
}

export const gamesApi = new GamesApi()
