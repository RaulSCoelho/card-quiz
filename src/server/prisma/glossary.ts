import { CreateGlossary, UpdateGlossary } from '@/@types/glossary'
import { Prisma } from '@prisma/client'

import { prisma } from '.'

export type GlossaryWithTerms = Prisma.GlossaryGetPayload<{ include: { terms: true } }>

class GlossaryApi {
  async get() {
    try {
      const glossaries = await prisma.glossary.findMany({ include: { terms: true } })
      return { glossaries }
    } catch (error: any) {
      return { error }
    }
  }

  async getById({ id }: { id: string }) {
    try {
      const glossary = await prisma.glossary.findUnique({ where: { id }, include: { terms: true } })
      return { glossary }
    } catch (error: any) {
      return { error }
    }
  }

  async post({ terms }: CreateGlossary) {
    try {
      const newGlossary = await prisma.glossary.create({ data: { terms: { create: terms } } })
      return { glossary: newGlossary }
    } catch (error: any) {
      return { error }
    }
  }

  async put({ id, terms, termsToDelete }: UpdateGlossary) {
    const termCreate = terms.filter(t => !t.id)
    const termUpdate = terms.filter(t => t.id)
    try {
      const glossary = await prisma.glossary.update({
        where: { id },
        data: {
          terms: {
            update: termUpdate.map(({ id, ...term }) => ({ data: term, where: { id } })),
            createMany: termCreate.length > 0 ? { data: termCreate } : undefined,
            delete: termsToDelete
          }
        },
        include: { terms: true }
      })
      return { glossary }
    } catch (error: any) {
      return { error }
    }
  }

  async delete({ id }: { id: string }) {
    try {
      await prisma.glossary.delete({ where: { id } })
      return {}
    } catch (error: any) {
      return { error }
    }
  }
}

export const glossaryApi = new GlossaryApi()
