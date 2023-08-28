import { useState } from 'react'

import { Logo } from '@/components/Images/Logo'
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
    <div>
      <div
        onClick={() => setEditGameModalOpen(true)}
        className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md bg-slate-300 px-4 py-3 shadow-lg dark:bg-blue-950"
      >
        <Logo className="mb-4 h-auto max-h-[50%] w-auto max-w-full" />
        <p className="text-lg font-bold">{game.name}</p>
        <p>{game.description}</p>
        <p>{format(new Date(game.createdAt), 'dd/MM/yyyy HH:mm')}</p>
      </div>
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
