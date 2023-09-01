import { z } from 'zod'

export const createGlossarySchema = z.object({
  terms: z
    .array(
      z.object({
        term: z.string().nonempty('Por favor, insira o termo'),
        definition: z.string().nonempty('Por favor, insira a definição')
      })
    )
    .min(1, 'Adicione pelo menos um termo')
    .default([])
})

export const updateGlossarySchema = z.object({
  id: z.string().nonempty('"id" é um campo obrigatório'),
  terms: z
    .array(
      z.object({
        id: z.string().nonempty('"id" é um campo obrigatório').optional(),
        term: z.string().nonempty('Por favor, insira o termo'),
        definition: z.string().nonempty('Por favor, insira a definição')
      })
    )
    .min(1, 'Adicione pelo menos um termo')
    .default([]),
  termsToDelete: z
    .array(
      z.object({
        id: z.string().nonempty('"id" é um campo obrigatório')
      })
    )
    .optional()
})

export type CreateGlossary = z.infer<typeof createGlossarySchema>
export type UpdateGlossary = z.infer<typeof updateGlossarySchema>
