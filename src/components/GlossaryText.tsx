'use client'

import { useState } from 'react'
import { IoClose } from 'react-icons/io5'

import { useGlossary } from '@/hooks/useGlossary'

import { IconButton } from './Buttons/IconButton'
import { Highlight } from './Highlight'
import { ModalBase } from './Modal/ModalBase'

interface GlossaryTextProps {
  children: string
}

const Wrapper = ({ children }: { children: string }) => {
  const { glossary } = useGlossary()
  const [open, setOpen] = useState(false)
  const definition = glossary?.terms.find(t => t.term.toLowerCase() === children.toLowerCase())?.definition

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <>
      <span className="group relative cursor-pointer font-bold underline decoration-dotted" onClick={handleOpen}>
        {children}
      </span>
      <ModalBase open={open} className="font-serif text-lg" onClose={handleClose} fullScreen={false}>
        <div className="flex p-2 text-xl">
          <div className="grow text-center font-bold">{children}</div>
          <div>
            <IconButton icon={IoClose} onClick={handleClose} size={24} className="bg-transparent p-0 shadow-none" />
          </div>
        </div>
        <div className="overflow-auto p-5 pt-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#6b6b6b4b]">
          <p className="hyphens-auto break-words">{definition}</p>
        </div>
      </ModalBase>
    </>
  )
}

export function GlossaryText({ children }: GlossaryTextProps) {
  const { glossary } = useGlossary()
  const search = glossary?.terms.map(term => term.term)

  return (
    <Highlight search={search || []} wrapper={Wrapper}>
      {children}
    </Highlight>
  )
}
