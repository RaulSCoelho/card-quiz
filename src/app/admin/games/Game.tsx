import { useState } from 'react'

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
      <div
        onClick={() => setEditGameModalOpen(true)}
        className="aspect-square cursor-pointer rounded-lg bg-gradient-to-br from-indigo-700 to-sky-400 p-5 text-white shadow-lg shadow-black/30 transition duration-300 ease-in-out hover:scale-105 active:scale-100  dark:from-violet-800 dark:from-15% dark:to-rose-400"
      >
        <p className="mb-2 text-center text-9xl">{String.fromCodePoint(parseInt(game.logo, 16))}</p>
        <p className="mb-2 text-center font-serif text-2xl font-semibold">{game.name}</p>
        <p className="mb-2 line-clamp-6 break-all text-center text-lg">{game.description}</p>
        <p className="text-center">{format(new Date(game.createdAt), 'dd/MM/yyyy HH:mm')}</p>
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
