import { z } from 'zod'

export const createGameSchema = z.object({
  name: z.string().nonempty('Por favor, insira o nome do jogo.'),
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

export type CreateGame = z.infer<typeof createGameSchema>
