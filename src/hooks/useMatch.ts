'use client'

import { Match } from '@/@types/match'
import { GameWithCards } from '@/server/prisma/games'
import { v4 as uuid } from 'uuid'
import { create } from 'zustand'

export type MatchCard = GameWithCards['cards'][number] & {
  answered?: boolean
  answeredCorrectly?: boolean
}

interface MatchState extends Match {
  cards: MatchCard[]
  started: boolean
  playersTurn?: string
  setCards(cards: MatchCard[]): void
  answer(card: MatchCard, answer: MatchCard['answer']): void
  start(): void
}

const localStorageKey = 'match'
function getStoredState() {
  const storedState = localStorage.getItem(localStorageKey)
  if (storedState) {
    const storedStateObj = JSON.parse(storedState)
    if (storedStateObj.playersTurn === '4cd100bc-a98c-467d-8915-8690838e1353') return storedStateObj
  }
  return {}
}

const initialState = {
  id: uuid(),
  players: [
    {
      id: '4cd100bc-a98c-467d-8915-8690838e1353',
      username: 'player1',
      score: 0
    }
  ],
  cards: [],
  started: false,
  playersTurn: '4cd100bc-a98c-467d-8915-8690838e1353'
}

export const useMatch = create<MatchState>(set => ({
  ...initialState,
  // If there's a saved state in localStorage, use it; otherwise, use the initial state
  ...getStoredState(),
  setCards: (cards: MatchCard[]) => set(() => ({ cards })),
  answer: (card: MatchCard, answer: MatchCard['answer']) =>
    set(match => {
      const playerIndex = match.players.findIndex(p => p.id === match.playersTurn)
      const cardIndex = match.cards.findIndex(c => c.id === card.id)

      if (match.cards[cardIndex].answered) {
        return {}
      }

      match.cards[cardIndex].answered = true
      match.cards[cardIndex].answeredCorrectly = card.answer === answer

      if (card.answer === answer) {
        match.players[playerIndex].score++
      }

      localStorage.setItem(localStorageKey, JSON.stringify({ ...match }))
      return { ...match }
    }),
  start: () =>
    set(match => {
      if (match.players.length > 0) {
        const updatedMatch = { ...match, playersTurn: match.players[0].id, started: true }
        localStorage.setItem(localStorageKey, JSON.stringify(updatedMatch))
        return updatedMatch
      }
      return { ...match, started: false, error: 'Adicione um jogador para poder iniciar' }
    })
}))
