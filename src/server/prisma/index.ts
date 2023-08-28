import { PrismaClient } from '@prisma/client'

let client: PrismaClient

if (process.env.NODE_ENV === 'production') {
  client = new PrismaClient()
  console.log('production')
} else {
  if (!(global as any).prisma) {
    ;(global as any).prisma = new PrismaClient()
    console.log('aqui stoy not production gerando novo client')
  }

  client = (global as any).prisma
  console.log('aqui stoy not production')
}

export const prisma = client
