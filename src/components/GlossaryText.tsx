'use client'

import { useGlossary } from '@/hooks/useGlossary'

import { Highlight } from './Highlight'

interface GlossaryTextProps {
  children: string
}

export function GlossaryText({ children }: GlossaryTextProps) {
  const { glossary } = useGlossary()
  const search = glossary?.terms.map(term => term.term)

  return <Highlight search={search || []}>{children}</Highlight>
}
