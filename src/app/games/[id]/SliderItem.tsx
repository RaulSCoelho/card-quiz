import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { IconButton } from '@/components/Buttons/IconButton'
import { Card } from '@/components/Card'
import { GameWithCards } from '@/server/prisma/games'

interface SliderItemProps {
  card: GameWithCards['cards'][number]
}

export function SliderItem({ card }: SliderItemProps) {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <Card className="flex h-full flex-col justify-around p-5">
      <p className="mb-4 text-center text-7xl">🤔</p>
      <p className="mb-2 text-center font-serif font-semibold">{card.question}</p>
      <p className="mb-1 overflow-auto break-all text-center font-serif font-semibold scrollbar-thin scrollbar-track-white/75 scrollbar-thumb-[#8888884b] dark:scrollbar-track-zinc-700">
        Resposta:
        <br />
        {showAnswer ? card.answer : '...'}
      </p>
      <div className="flex justify-center">
        <IconButton icon={showAnswer ? FaEye : FaEyeSlash} onClick={() => setShowAnswer(prev => !prev)} />
      </div>
    </Card>
  )
}
