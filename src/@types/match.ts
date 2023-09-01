import { v4 as uuid } from 'uuid'
import { z } from 'zod'

export const matchSchema = z.object({
  id: z.string().nonempty('"id" é um campo obrigatório'),
  players: z
    .array(
      z.object({
        id: z.string().default(uuid()),
        username: z.string().nonempty('Por favor, insira o nome do jogador'),
        score: z.number().int().default(0)
      })
    )
    .min(1, 'Adicione pelo menos um jogador')
    .default([])
})

export type Match = z.infer<typeof matchSchema>
