'use client'

import 'swiper/css'
import 'swiper/css/effect-cards'

import { EffectCards } from 'swiper/modules'
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'

export function Slider({ children, ...props }: SwiperProps) {
  return (
    <Swiper effect="cards" grabCursor={true} modules={[EffectCards]} {...props}>
      {children}
    </Swiper>
  )
}

Slider.Item = SwiperSlide
