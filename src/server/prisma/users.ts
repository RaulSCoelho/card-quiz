import { prisma } from '.'

class UsersApi {
  async get() {
    try {
      const users = await prisma.user.findMany()
      return { users }
    } catch (error: any) {
      return { error }
    }
  }

  async getById({ id }: { id: string }) {
    try {
      const user = await prisma.user.findUnique({ where: { id } })
      return { user }
    } catch (error: any) {
      return { error }
    }
  }

  async delete({ id }: { id: string }) {
    try {
      await prisma.user.delete({ where: { id } })
      return {}
    } catch (error: any) {
      return { error }
    }
  }
}

export const usersApi = new UsersApi()
