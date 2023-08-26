import { useState } from 'react'

import { Logo } from '@/components/Images/Logo'
import { useSnackbar } from '@/hooks/useSnackbar'
import { GameWithCards } from '@/server/prisma/games'
import { format } from 'date-fns'

import { EditGameModal } from './EditGameModal'

interface GameProps {
  game: GameWithCards
  onRemoveGame?(game: GameWithCards): void
}

export function Game({ game: initialGame, onRemoveGame }: GameProps) {
  const { open: openSnackBar } = useSnackbar()
  const [editGameModalOpen, setEditGameModalOpen] = useState(false)
  const [game, setGame] = useState(initialGame)

  function onSaveGame(editedGame: GameWithCards) {
    setGame(editedGame)
    openSnackBar({
      message: 'Jogo salvo com sucesso',
      type: 'success',
      position: 'mid-top'
    })
  }

  return (
    <div className="cursor-pointer rounded-md bg-primary-light p-2 shadow" onClick={() => setEditGameModalOpen(true)}>
      <div className="flex aspect-square flex-col items-center justify-center rounded-md bg-white px-4 py-3">
        <Logo className="mb-4 h-auto max-h-[50%] w-auto max-w-full" />
        <p className="text-lg font-bold">{game.name}</p>
        <p>{game.description}</p>
        <p>{format(new Date(game.createdAt), 'dd/MM/yyyy HH:mm')}</p>
      </div>
      <EditGameModal
        game={game}
        open={editGameModalOpen}
        onClose={() => setEditGameModalOpen(false)}
        onSave={onSaveGame}
        onRemove={onRemoveGame}
      />
    </div>
  )
}
