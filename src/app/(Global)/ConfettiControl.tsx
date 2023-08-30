'use client'

import { Confetti } from '@/components/Confetti'
import { create } from 'zustand'

interface ConfettiProps {
  id: number
}

interface ConfettiState {
  confettis: ConfettiProps[]
  open(): void
  close(id: number): void
}

export const useConfetti = create<ConfettiState>(set => ({
  confettis: [],
  open: () =>
    set(({ confettis }) => {
      confettis.push({ id: confettis.length })
      return { confettis }
    }),
  close: (id: number) =>
    set(({ confettis }) => {
      confettis = confettis.filter(c => c.id !== id)
      return { confettis }
    })
}))

export function ConfettiControl() {
  const { confettis, close } = useConfetti()

  return (
    <>
      {confettis.map(c => (
        <Confetti onConfettiComplete={() => close(c.id)} key={c.id} />
      ))}
    </>
  )
}
