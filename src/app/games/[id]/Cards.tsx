'use client'

import { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { IoCheckmarkSharp, IoClose } from 'react-icons/io5'

import { Card } from '@/components/Card'
import { GlossaryHighlight } from '@/components/GlossaryText'
import { MatchCard, useMatch } from '@/hooks/useMatch'

export function Cards() {
  const [index, setIndex] = useState(0)
  const { answer, cards } = useMatch()
  const card = cards[index]
  const emoji = card.answered ? (card.answeredCorrectly ? '😁' : '😭') : '🤔'

  const checkAnswer = (userAnswer: MatchCard['answer']) => () => {
    answer(card, userAnswer)
  }

  function next() {
    if (cards) {
      setIndex(prev => (prev === cards.length - 1 ? 0 : prev + 1))
    }
  }

  function previous() {
    if (cards) {
      setIndex(prev => (prev === 0 ? cards.length - 1 : prev - 1))
    }
  }

  return (
    <>
      <Card className="h-4/5 w-5/6 select-none sm:aspect-[2.5/3.5] sm:h-fit sm:w-96">
        <div className="flex h-full flex-col justify-around p-5">
          <p className="mb-4 text-center text-7xl">{emoji}</p>
          <p className="mb-2 text-center font-serif font-semibold">
            <GlossaryHighlight>{card.question}</GlossaryHighlight>
          </p>
          {card.answered && card.explanation && (
            <div className="mb-1 overflow-auto break-all text-center font-serif font-semibold scrollbar-thin scrollbar-track-white/75 scrollbar-thumb-[#8888884b] dark:scrollbar-track-zinc-700">
              Explicação:
              <br />
              <GlossaryHighlight>{card.explanation}</GlossaryHighlight>
            </div>
          )}
          {!card.answered && (
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
          )}
        </div>
      </Card>
      <div className="flex cursor-pointer divide-x divide-sky-500 rounded-lg border border-sky-500">
        <div className="px-8 py-3" onClick={previous}>
          <FaArrowLeft />
        </div>
        <div className="px-8 py-3" onClick={next}>
          <FaArrowRight />
        </div>
      </div>
    </>
  )
}
