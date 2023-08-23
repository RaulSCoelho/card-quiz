import { BiTrash } from 'react-icons/bi'

import { useAxios } from '@/hooks/useAxios'
import { useConfirmationModal } from '@/hooks/useConfirmationModal'
import { useLoading } from '@/hooks/useLoading'
import { GameWithCards } from '@/server/prisma/games'
import { format } from 'date-fns'

interface GameProps {
  game: GameWithCards
  onRemoveGame?(game: GameWithCards): void
}

export function Game({ game, onRemoveGame }: GameProps) {
  const { open: openConfirmationModal } = useConfirmationModal()
  const { setLoading } = useLoading()

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
    <div className="rounded bg-primary-light/10 px-4 py-3 shadow">
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
  )
}
