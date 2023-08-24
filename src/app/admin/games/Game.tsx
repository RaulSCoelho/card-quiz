import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'

import { useAxios } from '@/hooks/useAxios'
import { useConfirmationModal } from '@/hooks/useConfirmationModal'
import { useLoading } from '@/hooks/useLoading'
import { useSnackbar } from '@/hooks/useSnackbar'
import { GameWithCards } from '@/server/prisma/games'
import { format } from 'date-fns'

import { EditGameModal } from './EditGameModal'

interface GameProps {
  game: GameWithCards
  onRemoveGame?(game: GameWithCards): void
}

export function Game({ game: initialGame, onRemoveGame }: GameProps) {
  const { open: openConfirmationModal } = useConfirmationModal()
  const { setLoading } = useLoading()
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

  async function handleRemoveGame() {
    openConfirmationModal({
      title: 'Remover Jogo',
      question: `Tem certeza que deseja remover o jogo ${game.name}?`,
      onConfirm: async () => {
        setLoading(true)
        const { ok } = await useAxios.delete(`/api/games/${game.id}`)
        ok && onRemoveGame?.(game)
        setLoading(false)
      }
    })
  }

  return (
    <div>
      <div
        className="cursor-pointer rounded bg-primary-light/10 px-4 py-3 shadow"
        onClick={() => setEditGameModalOpen(true)}
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">{game.name}</p>
          <div>
            <BiTrash
              size={20}
              className="cursor-pointer hover:text-red-500 dark:hover:text-red-600"
              onClick={handleRemoveGame}
            />
          </div>
        </div>
        <p>{game.description}</p>
        <p>{format(new Date(game.createdAt), 'dd/MM/yyyy HH:mm')}</p>
      </div>
      <EditGameModal
        game={game}
        open={editGameModalOpen}
        onClose={() => setEditGameModalOpen(false)}
        onSave={onSaveGame}
      />
    </div>
  )
}
