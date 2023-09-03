'use client'

import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'

import { UpdateGlossary } from '@/@types/glossary'
import { IconButton } from '@/components/Buttons/IconButton'
import { ModalBase } from '@/components/Modal/ModalBase'
import { GlossaryWithTerms } from '@/server/prisma/glossary'
import { api } from '@/services/axios'
import { create } from 'zustand'

interface GlossaryState {
  loading: boolean
  error?: string
  glossary?: GlossaryWithTerms
  term?: string
  openTerm(term: string): void
  fetchGlossary(): void
  updateGlossary(glossary: UpdateGlossary): void
}

export const useGlossary = create<GlossaryState>(set => ({
  loading: false,
  openTerm: (term: string) => set(() => ({ term })),
  fetchGlossary,
  updateGlossary
}))

async function fetchGlossary() {
  useGlossary.setState({ loading: true })
  try {
    const { data: glossary } = await api.get<GlossaryWithTerms[]>('api/glossary')
    useGlossary.setState({ glossary: Array.isArray(glossary) ? glossary[0] : undefined })
  } catch (err: any) {
    const error = err.message || err.response?.data || 'Something went wrong'
    useGlossary.setState({ error })
  } finally {
    useGlossary.setState({ loading: false })
  }
}

async function updateGlossary(glossary: UpdateGlossary) {
  useGlossary.setState({ loading: true })
  try {
    const { data: updatedGlossary } = await api.put<GlossaryWithTerms>(`api/glossary/${glossary.id}`, glossary)
    useGlossary.setState({ glossary: updatedGlossary })
  } catch (err: any) {
    const error = err.message || err.response?.data || 'Something went wrong'
    useGlossary.setState({ error })
  } finally {
    useGlossary.setState({ loading: false })
  }
}

export function GlossaryInit() {
  const { glossary, term } = useGlossary()
  const [open, setOpen] = useState(false)
  const definition = glossary?.terms.find(t => t.term.toLowerCase() === term?.toLowerCase())?.definition

  useEffect(() => {
    fetchGlossary()
  }, [])

  useEffect(() => {
    setOpen(!!term)
  }, [term])

  function handleClose() {
    useGlossary.setState({ term: undefined })
  }

  return (
    <ModalBase open={open} className="font-serif text-lg" onClose={handleClose} fullScreen={false}>
      <div className="flex p-2 text-xl">
        <div className="grow text-center font-bold">{term}</div>
        <div>
          <IconButton icon={IoClose} onClick={handleClose} size={24} className="bg-transparent p-0 shadow-none" />
        </div>
      </div>
      <div className="overflow-auto p-5 pt-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#6b6b6b4b]">
        <p className="hyphens-auto break-words">{definition}</p>
      </div>
    </ModalBase>
  )
}
