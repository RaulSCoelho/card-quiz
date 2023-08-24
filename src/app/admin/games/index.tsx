'use client'

import { useState } from 'react'
import { LuPlus } from 'react-icons/lu'

import { Button } from '@/components/Buttons'
import { GameWithCards } from '@/server/prisma/games'

import { Game } from './Game'
import { NewGameModal } from './NewGameModal'

interface GamesProps {
  games: GameWithCards[]
}

export function Games({ games: initialGames }: GamesProps) {
  const [games, setGames] = useState<GameWithCards[]>(initialGames)
  const [newGameModalOpen, setNewGameModalOpen] = useState(false)

  function onCreateGame(game: GameWithCards) {
    setGames([...games, game])
    closeGameModal()
  }

  async function onRemoveGame(game: GameWithCards) {
    const newGames = games.filter(g => g.id !== game.id)
    setGames(newGames)
  }

  function closeGameModal() {
    setNewGameModalOpen(false)
  }

  return (
    <div>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {games.map(game => (
          <Game game={game} onRemoveGame={onRemoveGame} key={game.id} />
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
