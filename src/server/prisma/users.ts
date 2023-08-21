import { Prisma } from '@prisma/client'

import { prisma } from '.'

class UsersApi {
  prisma: Prisma.UserDelegate

  constructor() {
    this.prisma = prisma.user
  }

  async get() {
    try {
      const users = await this.prisma.findMany()
      return { users }
    } catch (error: any) {
      return { error }
    }
  }

  async getById({ id }: { id: string }) {
    try {
      const user = await this.prisma.findUnique({ where: { id } })
      return { user }
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

export const usersApi = new UsersApi()
