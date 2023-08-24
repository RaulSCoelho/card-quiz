import { CreateGame, UpdateGame } from '@/@types/games'
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

  async put({ id, cards = [], cardsToDelete, ...editedGame }: UpdateGame) {
    try {
      const cardsCreate = cards.filter(c => !c.id)
      const cardsUpdate = cards.filter(c => c.id)
      const game = await this.prisma.update({
        where: { id },
        data: {
          ...editedGame,
          cards: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            update: cardsUpdate.map(({ id, gameId, ...card }) => ({ data: card, where: { id } })),
            createMany: cardsCreate.length > 0 ? { data: cardsCreate } : undefined,
            delete: cardsToDelete
          }
        },
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
