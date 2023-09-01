'use client'

import { StartGameModal } from '@/components/Game/StartGameModal'
import { useMatch } from '@/hooks/useMatch'
import { GameWithCards } from '@/server/prisma/games'

import { CardsSlider } from './CardsSlider'

interface GameProps {
  game?: GameWithCards
}

export function Game({ game }: GameProps) {
  const { started } = useMatch()

  return (
    <div className="flex h-full w-full justify-center overflow-hidden">
      {started ? <CardsSlider cards={game?.cards} /> : <StartGameModal open={!started} onClose={() => {}} />}
    </div>
  )
}
