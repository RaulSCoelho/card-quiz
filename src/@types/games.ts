import { z } from 'zod'

export const updateGameSchema = z
  .object({
    id: z.string().nonempty('"id" é um campo obrigatório'),
    name: z.string().nonempty('Por favor, insira o nome do jogo.'),
    logo: z
      .string({ required_error: 'Por favor, selecione a logo do jogo.' })
      .nonempty('Por favor, selecione a logo do jogo.'),
    description: z.string().optional(),
    cards: z
      .array(
        z.object({
          id: z.string().nonempty('"id" é um campo obrigatório').optional(),
          gameId: z.string().nonempty('"gameId" é um campo obrigatório').optional(),
          question: z.string().nonempty('Por favor, insira uma pergunta.'),
          answer: z.string().nonempty('Por favor, insira uma resposta.'),
          points: z.number().int().optional(),
          createdAt: z.union([z.date(), z.string()]).optional()
        })
      )
      .min(1, 'Adicione pelo menos uma carta')
      .default([]),
    cardsToDelete: z
      .array(
        z.object({
          id: z.string().nonempty('"id" é um campo obrigatório')
        })
      )
      .optional(),
    createdAt: z.union([z.date(), z.string()])
  })
  .partial()

export const createGameSchema = z.object({
  name: z.string().nonempty('Por favor, insira o nome do jogo.'),
  logo: z
    .string({ required_error: 'Por favor, selecione a logo do jogo.' })
    .nonempty('Por favor, selecione a logo do jogo.'),
  description: z.string().optional(),
  cards: z
    .array(
      z.object({
        question: z.string().nonempty('Por favor, insira uma pergunta.'),
        answer: z.string().nonempty('Por favor, insira uma resposta.')
      })
    )
    .min(1, 'Adicione pelo menos uma carta')
    .default([])
})

export type UpdateGame = z.infer<typeof updateGameSchema>
export type CreateGame = z.infer<typeof createGameSchema>
