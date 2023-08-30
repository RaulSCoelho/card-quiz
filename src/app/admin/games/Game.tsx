import { useState } from 'react'

import { Card } from '@/components/Card'
import { GameWithCards } from '@/server/prisma/games'
import { format } from 'date-fns'

import { EditGameModal } from './EditGameModal'

interface GameProps {
  game: GameWithCards
  onRemoveGame?(game: GameWithCards): void
}

export function Game({ game: initialGame, onRemoveGame }: GameProps) {
  const [editGameModalOpen, setEditGameModalOpen] = useState(false)
  const [game, setGame] = useState(initialGame)

  return (
    <div className="flex justify-center">
      <Card
        onClick={() => setEditGameModalOpen(true)}
        className="aspect-square cursor-pointer p-5 hover:scale-105 active:scale-[1.025]"
      >
        <p className="mb-2 text-center text-9xl">{String.fromCodePoint(parseInt(game.logo, 16))}</p>
        <p className="mb-2 text-center font-serif text-2xl font-semibold">{game.name}</p>
        <p className="mb-2 line-clamp-6 break-all text-center text-lg">{game.description}</p>
        <p className="text-center">{format(new Date(game.createdAt), 'dd/MM/yyyy HH:mm')}</p>
      </Card>
      <EditGameModal
        game={game}
        open={editGameModalOpen}
        onClose={() => setEditGameModalOpen(false)}
        onSave={setGame}
        onRemove={onRemoveGame}
      />
    </div>
  )
}
