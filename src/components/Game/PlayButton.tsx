'use client'

import { useState } from 'react'

import { Button } from '../Buttons'
import { StartGameModal } from './StartGameModal'

export function PlayButton() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Play</Button>
      <StartGameModal open={modalOpen} onClose={() => setModalOpen(false)} onStart={() => console.log('iniciou')} />
    </>
  )
}
