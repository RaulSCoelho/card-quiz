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

const localStorageKey = 'match'
const savedState = localStorage.getItem(localStorageKey)

const initialState = {
  id: uuid(),
  players: [],
  started: false
}

export const useMatch = create<MatchState>(set => ({
  ...initialState,
  // If there's a saved state in localStorage, use it; otherwise, use the initial state
  ...(savedState ? JSON.parse(savedState) : {}),
  addPlayer: (player: string) =>
    set(match => {
      if (!player) {
        return { error: 'Por favor escolha um nome' }
      }
      if (player.length > 17) {
        return { error: 'Por favor escolha um nome com até 16 letras' }
      }
      if (match.players.some(p => p.username === player)) {
        return { error: 'Jogador com esse nome já foi cadastrado, por favor escolha outro nome' }
      }

      const updatedPlayers = [...match.players, { id: uuid(), username: player, score: 0 }]
      localStorage.setItem(localStorageKey, JSON.stringify({ ...match, players: updatedPlayers }))

      return { players: updatedPlayers, error: undefined }
    }),
  removePlayer: (player: string) =>
    set(match => {
      const updatedPlayers = match.players.filter(p => p.username !== player)
      localStorage.setItem(localStorageKey, JSON.stringify({ ...match, players: updatedPlayers }))
      return { players: updatedPlayers }
    }),
  clearError: () => set(() => ({ error: undefined })),
  start: () =>
    set(match => {
      if (match.players.length > 0) {
        const updatedMatch = { ...match, started: true }
        localStorage.setItem(localStorageKey, JSON.stringify(updatedMatch))
        return updatedMatch
      }
      return { ...match, started: false, error: 'Adicione um jogador para poder iniciar' }
    }),
  end: () =>
    set(() => {
      localStorage.removeItem(localStorageKey)
      return { ...initialState }
    })
}))
