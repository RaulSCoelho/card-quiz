'use client'

import { useGlossary } from '@/hooks/useGlossary'

import { Highlight } from './Highlight'

interface GlossaryTextProps {
  children: string
}

export function GlossaryHighlight({ children }: GlossaryTextProps) {
  const { glossary } = useGlossary()
  const search = glossary?.terms.map(term => term.term) || []
  const namesSearch = [
    { text: 'W. bancrofti', wrapper: NamesWrapper },
    { text: 'Culex quinquefasciatus', wrapper: NamesWrapper }
  ]

  return (
    <Highlight search={[...search, ...namesSearch]} wrapper={Wrapper}>
      {children}
    </Highlight>
  )
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

const NamesWrapper = ({ children }: { children: string }) => (
  <span className="font-bold italic tracking-wider">{children}</span>
)
