'use client'

import { useEffect } from 'react'

import { Button } from '@/components/Buttons'
import { Skeleton } from '@/components/Skeleton'
import { useMatch } from '@/hooks/useMatch'
import { GameWithCards } from '@/server/prisma/games'
import { shuffle } from '@/utils/array'

import { Cards } from './Cards'

interface GameProps {
  game?: GameWithCards
}

export function Game({ game }: GameProps) {
  const { started, cards, setCards, start } = useMatch()

  useEffect(() => {
    if (game) {
      if (!started || cards.length !== game.cards.length) {
        setCards(shuffle(game.cards || []))
        start()
      }
    }
  }, [cards.length, game, setCards, start, started])

  function reset() {
    const match = useMatch.getState()
    setCards(shuffle(game?.cards || []))
    useMatch.setState({ players: [{ ...match.players[0], score: 0 }] })
    localStorage.setItem('match', JSON.stringify({ ...match }))
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-8 overflow-hidden">
      {started ? (
        <Cards />
      ) : (
        <div className="h-4/5 w-5/6 sm:aspect-[2.5/3.5] sm:h-fit sm:w-96">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      )}
      <Button onClick={reset}>Reiniciar Jogo</Button>
    </div>
  )
}
