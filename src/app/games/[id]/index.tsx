'use client'

import { useEffect } from 'react'

import { Button } from '@/components/Buttons'
import { Skeleton } from '@/components/Skeleton'
import { useMatch } from '@/hooks/useMatch'
import { GameWithCards } from '@/server/prisma/games'

import { CardsSlider } from './CardsSlider'

interface GameProps {
  game?: GameWithCards
}

function shuffleCards(cards: GameWithCards['cards'] = []) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

export function Game({ game }: GameProps) {
  const { started, cards, setCards, start } = useMatch()

  useEffect(() => {
    if (!started) {
      shuffleCards(game?.cards || [])
      start()
    }
  }, [started, setCards, game?.cards, start])

  function reset() {
    setCards(shuffleCards(game?.cards || []))
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-8 overflow-hidden">
      {started ? (
        <CardsSlider cards={cards} />
      ) : (
        <div className="h-4/5 w-5/6 sm:aspect-[2.5/3.5] sm:h-fit sm:w-96">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      )}
      <Button onClick={reset}>Resetar Jogo</Button>
    </div>
  )
}
