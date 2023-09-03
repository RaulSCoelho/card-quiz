'use client'

import { GameWithCards } from '@/server/prisma/games'

import { Slider } from './Slider'
import { SliderItem } from './SliderItem'

interface CardsSliderProps {
  cards?: GameWithCards['cards']
}

export function CardsSlider({ cards }: CardsSliderProps) {
  return (
    <Slider className="h-4/5 w-5/6 sm:aspect-[2.5/3.5] sm:h-fit sm:w-96">
      {cards?.map(card => (
        <Slider.Item className="rounded-lg" key={card.id}>
          <SliderItem card={card} />
        </Slider.Item>
      ))}
    </Slider>
  )
}
