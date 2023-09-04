'use client'

import { useGlossary } from '@/hooks/useGlossary'

import { Highlight } from './Highlight'

interface GlossaryTextProps {
  children: string
}

const Wrapper = ({ children }: { children: string }) => {
  const { openTerm } = useGlossary()
  return (
    <span
      className="cursor-pointer font-bold italic tracking-wider underline decoration-dotted"
      onClick={() => openTerm(children)}
    >
      {children}
    </span>
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
