'use client'

import { ComponentProps } from 'react'

import { useGlossary } from '@/hooks/useGlossary'

import { Highlight } from './Highlight'
import { Text } from './Text'

interface GlossaryTextProps extends ComponentProps<typeof Text> {
  children: string
}

export function GlossaryText({ children, ...props }: GlossaryTextProps) {
  const { glossary } = useGlossary()
  const search = glossary?.terms.map(term => term.term)

  return (
    <Text {...props}>
      <Highlight search={search || []} wrapper={Wrapper}>
        {children}
      </Highlight>
    </Text>
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
