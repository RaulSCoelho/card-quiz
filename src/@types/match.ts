import { z } from 'zod'

export const createMatchSchema = z.object({
  gameId: z.string().nonempty('Relacione esta partida à um jogo'),
  players: z
    .array(
      z.object({
        username: z.string().nonempty('Por favor, insira o nome do jogador')
      })
    )
    .min(1, 'Adicione pelo menos um jogador')
    .default([])
})

export type CreateMatch = z.infer<typeof createMatchSchema>
