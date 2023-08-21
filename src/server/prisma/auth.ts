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
      const { username, email, password } = payload
      const existingUser = await this.prisma.findFirst({ where: { OR: [{ username }, { email }] } })
      if (existingUser) {
        throw new Error('User with this username or email already exists!')
      }

      const hashedPassword = await hashWord(password)
      payload.password = hashedPassword

      const user = await this.prisma.create({ data: payload })

      return { user }
    } catch (error: any) {
      if (error?.code === 'P2002') {
        return { error: new Error('User with this username already exists!') }
      }
      return { error }
    }
  }

  async login({ login, password }: { login: string; password: string }) {
    try {
      const user = await this.prisma.findFirst({ where: { OR: [{ username: login }, { email: login }] } })

      if (!user) {
        throw new Error('Invalid username or password')
      }

      const validPass = await isHashValid(password, user.password)
      if (!validPass) {
        throw new Error('Invalid username or password')
      }

      const accessToken = await generateToken({ user })

      return { user, accessToken }
    } catch (error: any) {
      return { error }
    }
  }
}

export const authApi = new AuthApi()
