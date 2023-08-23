'use client'

import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { LuPlus } from 'react-icons/lu'

import { Button } from '@/components/Buttons'
import { useAxios } from '@/hooks/useAxios'
import { useConfirmationModal } from '@/hooks/useConfirmationModal'
import { useLoading } from '@/hooks/useLoading'
import { GameWithCards } from '@/server/prisma/games'
import { format } from 'date-fns'

import { NewGameModal } from './NewGameModal'

interface GamesProps {
  games: GameWithCards[]
}

export function Games({ games: initialGames }: GamesProps) {
  const { open: openConfirmationModal } = useConfirmationModal()
  const { setLoading } = useLoading()
  const [games, setGames] = useState<GameWithCards[]>(initialGames)
  const [newGameModalOpen, setNewGameModalOpen] = useState(false)

  function onCreateGame(game: GameWithCards) {
    setGames([...games, game])
    closeGameModal()
  }

  async function onRemoveGame(game: GameWithCards) {
    openConfirmationModal({
      title: 'Remover Jogo',
      question: `Tem certeza que deseja remover o jogo ${game.name}?`,
      onConfirm: async () => {
        setLoading(true)
        const { ok } = await useAxios.delete(`/api/games/${game.id}`)
        if (ok) {
          const newGames = games.filter(g => g.id !== game.id)
          setGames(newGames)
        }
        setLoading(false)
      }
    })
  }

  function closeGameModal() {
    setNewGameModalOpen(false)
  }

  return (
    <div className="px-4">
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {games.map(game => (
          <div className="rounded bg-primary-light/10 px-4 py-3 shadow" key={game.id}>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">{game.name}</p>
              <div>
                <BiTrash
                  size={20}
                  className="cursor-pointer hover:text-red-500 dark:hover:text-red-600"
                  onClick={() => onRemoveGame(game)}
                />
              </div>
            </div>
            <p>{game.description}</p>
            <p>{format(new Date(game.createdAt), 'dd/MM/yyyy HH:mm')}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button className="flex gap-2 pl-2" onClick={() => setNewGameModalOpen(true)}>
          <LuPlus size={24} />
          Novo
        </Button>
        <NewGameModal open={newGameModalOpen} onClose={closeGameModal} onCreate={onCreateGame} />
      </div>
    </div>
  )
}
