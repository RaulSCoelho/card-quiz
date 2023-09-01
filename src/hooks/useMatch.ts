'use client'

import { Match } from '@/@types/match'
import { v4 as uuid } from 'uuid'
import { create } from 'zustand'

interface MatchState extends Match {
  error?: string
  addPlayer(player: string): void
  removePlayer(player: string): void
  clearError(): void
  start(): void
  end(): void
  started: boolean
}

export const useMatch = create<MatchState>(set => ({
  id: uuid(),
  players: [],
  started: false,
  addPlayer: (player: string) =>
    set(({ players }) => {
      if (!player) {
        return { error: 'Por favor escolha um nome' }
      }
      if (player.length > 17) {
        return { error: 'Por favor escolha um nome com até 16 letras' }
      }
      if (players.some(p => p.username === player)) {
        return { error: 'Jogador com esse nome já foi cadastrado, por favor escolha outro nome' }
      }

      return { players: [...players, { id: uuid(), username: player, score: 0 }], error: undefined }
    }),
  removePlayer: (player: string) => set(({ players }) => ({ players: players.filter(p => p.username !== player) })),
  clearError: () => set(() => ({ error: undefined })),
  start: () =>
    set(({ players }) => {
      if (players.length > 0) return { started: true }
      return { started: false, error: 'Adicione um jogador para poder iniciar' }
    }),
  end: () => set(() => ({ players: [], started: false }))
}))
