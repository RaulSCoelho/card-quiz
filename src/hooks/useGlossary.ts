import { GlossaryWithTerms } from '@/server/prisma/glossary'
import { api } from '@/services/axios'
import { create } from 'zustand'

interface GlossaryState {
  loading: boolean
  error?: string
  glossary?: GlossaryWithTerms
  fetchGlossary(): void
}

export const useGlossary = create<GlossaryState>(() => ({
  loading: false,
  fetchGlossary
}))

export async function fetchGlossary() {
  useGlossary.setState({ loading: true })
  try {
    const { data: glossary } = await api.get<GlossaryWithTerms>('api/glossary')
    useGlossary.setState({ glossary })
  } catch (err: any) {
    const error = err.message || err.response?.data || 'Something went wrong'
    useGlossary.setState({ error })
  } finally {
    useGlossary.setState({ loading: false })
  }
}
