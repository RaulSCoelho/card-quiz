'use client'

import { ReactNode, useEffect } from 'react'

import { UpdateGlossary } from '@/@types/glossary'
import { GlossaryWithTerms } from '@/server/prisma/glossary'
import { api } from '@/services/axios'
import { create } from 'zustand'

interface GlossaryState {
  loading: boolean
  error?: string
  glossary?: GlossaryWithTerms
  fetchGlossary(): void
  updateGlossary(glossary: UpdateGlossary): void
}

export const useGlossary = create<GlossaryState>(() => ({
  loading: false,
  fetchGlossary,
  updateGlossary
}))

export async function fetchGlossary() {
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

export async function updateGlossary(glossary: UpdateGlossary) {
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

export function GlossaryInit({ children }: { children: ReactNode }) {
  useEffect(() => {
    fetchGlossary()
  }, [])

  return <>{children}</>
}
