'use client'

import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { IconButton } from '@/components/Buttons/IconButton'
import { Card } from '@/components/Card'
import { GameWithCards } from '@/server/prisma/games'
import Swiper from 'swiper'

import { Slider } from './Slider'

interface CardsSliderProps {
  cards?: GameWithCards['cards']
}

export function CardsSlider({ cards }: CardsSliderProps) {
  const [showAnswer, setShowAnswer] = useState(false)
  const visibleCards = cards || []

  function handleSlideChange(swiper: Swiper) {
    console.log(swiper.realIndex)
  }

  return (
    <Slider className="aspect-[2.5/3.5] w-3/5 sm:w-96" onSlideChange={handleSlideChange}>
      {visibleCards.map(({ id, question, answer }) => (
        <Slider.Item className="rounded-lg" key={id}>
          <Card className="flex h-full flex-col justify-around p-5">
            <p className="mb-4 text-center text-7xl">🤔</p>
            <p className="mb-2 text-center font-serif font-semibold">{question}</p>
            <p className="mb-1 overflow-auto break-all text-center font-serif font-semibold scrollbar-thin scrollbar-track-white/75 scrollbar-thumb-[#8888884b] dark:scrollbar-track-zinc-700">
              Resposta:
              <br />
              {showAnswer ? answer : '...'}
            </p>
            <div className="flex justify-center">
              <IconButton icon={showAnswer ? FaEye : FaEyeSlash} onClick={() => setShowAnswer(prev => !prev)} />
            </div>
          </Card>
        </Slider.Item>
      ))}
    </Slider>
  )
}
