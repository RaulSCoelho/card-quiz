import { useState } from 'react'
import { IoCheckmarkSharp, IoClose } from 'react-icons/io5'

import { useConfetti } from '@/app/(Global)/ConfettiControl'
import { Card } from '@/components/Card'
import { GameWithCards } from '@/server/prisma/games'

type Card = GameWithCards['cards'][number]

interface SliderItemProps {
  card: GameWithCards['cards'][number]
}

export function SliderItem({ card }: SliderItemProps) {
  const [emoji, setEmoji] = useState('🤔')
  const [showExplanation, setShowExplanation] = useState(false)
  const { open: confetti } = useConfetti()

  const checkAnswer = (answer: Card['answer']) => () => {
    if (answer === card.answer) {
      setEmoji('😁')
      confetti()
    } else {
      setEmoji('😭')
    }

    setShowExplanation(true)
  }

  return (
    <Card className="flex h-full flex-col justify-around p-5">
      <p className="mb-4 text-center text-7xl">{emoji}</p>
      <p className="mb-2 text-center font-serif font-semibold">{card.question}</p>
      {showExplanation && (
        <p className="mb-1 overflow-auto break-all text-center font-serif font-semibold scrollbar-thin scrollbar-track-white/75 scrollbar-thumb-[#8888884b] dark:scrollbar-track-zinc-700">
          Explicação:
          <br />
          {card.explanation}
        </p>
      )}
      <div className="flex justify-around text-white">
        <div
          className="flex aspect-square cursor-pointer justify-center rounded-lg bg-red-500 p-5 active:scale-95"
          onClick={checkAnswer('FALSE')}
        >
          <IoClose size={40} />
        </div>
        <div
          className="flex aspect-square cursor-pointer justify-center rounded-lg bg-green-500 p-5 active:scale-95"
          onClick={checkAnswer('TRUE')}
        >
          <IoCheckmarkSharp size={40} />
        </div>
      </div>
    </Card>
  )
}
