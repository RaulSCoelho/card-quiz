'use client'

import { GameWithCards } from '@/server/prisma/games'

import { Slider } from './Slider'
import { SliderItem } from './SliderItem'

interface CardsSliderProps {
  cards?: GameWithCards['cards']
}

function shuffleCards(cards: GameWithCards['cards'] = []) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

export function CardsSlider({ cards }: CardsSliderProps) {
  const randomCards = shuffleCards(cards)

  return (
    <Slider className="h-4/5 w-5/6 sm:aspect-[2.5/3.5] sm:h-fit sm:w-96">
      {randomCards.map(card => (
        <Slider.Item className="rounded-lg" key={card.id}>
          <SliderItem card={card} />
        </Slider.Item>
      ))}
    </Slider>
  )
}
