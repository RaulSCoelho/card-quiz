'use client'

import { Match } from '@/@types/match'
import { GameWithCards } from '@/server/prisma/games'
import { v4 as uuid } from 'uuid'
import { create } from 'zustand'

export type MatchCard = GameWithCards['cards'][number] & {
  answered?: boolean
}

interface MatchState extends Match {
  cards: MatchCard[]
  started: boolean
  playersTurn?: string
  setCards(cards: MatchCard[]): void
  addPlayer(player: string): void
  removePlayer(player: string): void
  answer(card: MatchCard, answer: MatchCard['answer']): void
  start(): void
  end(): void
  clearError(): void
  error?: string
}

const localStorageKey = 'match'
const savedState = localStorage.getItem(localStorageKey)

const initialState = {
  id: uuid(),
  players: [],
  cards: [],
  started: false,
  playersTurn: undefined,
  error: undefined
}

export const useMatch = create<MatchState>(set => ({
  ...initialState,
  // If there's a saved state in localStorage, use it; otherwise, use the initial state
  ...(savedState ? JSON.parse(savedState) : {}),
  setCards: (cards: MatchCard[]) => set(() => ({ cards })),
  answer: (card: MatchCard, answer: MatchCard['answer']) =>
    set(match => {
      const playerIndex = match.players.findIndex(p => p.id === match.playersTurn)
      const cardIndex = match.cards.findIndex(c => c.id === card.id)

      if (match.cards[cardIndex].answered) {
        return {}
      }

      match.cards[cardIndex].answered = true

      if (card.answer === answer) {
        match.players[playerIndex].score++
      } else {
        const newPlayerIndex = playerIndex === match.players.length - 1 ? 0 : playerIndex + 1
        match.playersTurn = match.players[newPlayerIndex].id
      }

      localStorage.setItem(localStorageKey, JSON.stringify({ ...match }))
      return { ...match }
    }),
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
        const updatedMatch = { ...match, playersTurn: match.players[0].id, started: true }
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
