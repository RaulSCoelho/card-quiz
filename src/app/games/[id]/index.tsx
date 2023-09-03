'use client'

import { Button } from '@/components/Buttons'
import { StartGameModal } from '@/components/Game/StartGameModal'
import { useMatch } from '@/hooks/useMatch'
import { GameWithCards } from '@/server/prisma/games'

import { CardsSlider } from './CardsSlider'

interface GameProps {
  game?: GameWithCards
}

export function Game({ game }: GameProps) {
  const { started, players, playersTurn, cards, end } = useMatch()
  const playersTurnName = players.find(p => p.id === playersTurn)?.username
  const finished = cards.length > 0 && cards.every(c => c.answered)
  const sortedPlayers = players.sort((a, b) => b.score - a.score)

  return (
    <>
      {finished ? (
        <div className="space-y-4">
          <h1 className="text-center text-3xl font-bold">Placar</h1>
          <ul>
            {sortedPlayers.map(player => (
              <li key={player.id}>
                <b>{player.username}</b> : {player.score}
              </li>
            ))}
          </ul>
          <Button onClick={end}>Começar nova partida</Button>
        </div>
      ) : started ? (
        <div className="flex h-full w-full flex-col justify-around overflow-hidden">
          <p className="text-center text-3xl font-bold">Vez de {playersTurnName}</p>
          <CardsSlider cards={cards} />
        </div>
      ) : (
        <StartGameModal game={game} open={!started} onClose={() => {}} />
      )}
    </>
  )
}
