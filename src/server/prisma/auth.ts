import { Prisma } from '@prisma/client'

import { prisma } from '.'
import { hashWord, isHashValid } from '../../lib/hash'
import { generateToken } from '../../lib/jwt'

class AuthApi {
  prisma: Prisma.UserDelegate

  constructor() {
    this.prisma = prisma.user
  }

  async register({ payload }: { payload: Prisma.UserCreateInput }) {
    try {
      const { email, password } = payload
      const existingUser = await this.prisma.findFirst({ where: { email } })
      if (existingUser) {
        throw new Error('Usuário com este email já existe!')
      }

      const hashedPassword = await hashWord(password)
      payload.password = hashedPassword

      const user = await this.prisma.create({ data: payload })

      return { user }
    } catch (error: any) {
      if (error?.code === 'P2002') {
        return { error: new Error('Usuário com este nome de usuário já existe!') }
      }
      return { error }
    }
  }

  async login({ login, password }: { login: string; password: string }) {
    try {
      const user = await this.prisma.findFirst({ where: { OR: [{ username: login }, { email: login }] } })

      if (!user) {
        throw new Error('Nome de usuário ou senha inválidos')
      }

      const validPass = await isHashValid(password, user.password)
      if (!validPass) {
        throw new Error('Nome de usuário ou senha inválidos')
      }

      const accessToken = await generateToken({ user })

      return { user, accessToken }
    } catch (error: any) {
      return { error }
    }
  }
}

export const authApi = new AuthApi()
