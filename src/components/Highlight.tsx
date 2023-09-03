import { ComponentType } from 'react'

import { findMatches } from '@/utils/text'

interface HighlightProps extends WrapperProps {
  search: string[]
}

export function Highlight({ children, search, wrapper }: HighlightProps) {
  const matches = findMatches(children, search)

  if (!matches || matches.length === 0) {
    return children
  }

  return (
    <>
      {matches.map(({ from, to, match }, i) =>
        match ? (
          <Wrapper wrapper={wrapper} key={i}>
            {children.substring(from, to)}
          </Wrapper>
        ) : (
          children.substring(from, to)
        )
      )}
    </>
  )
}

interface WrapperProps {
  children: string
  wrapper?: ComponentType<{ children: string }>
}

function Wrapper({ children, wrapper: TextWrapper }: WrapperProps) {
  return TextWrapper ? <TextWrapper>{children}</TextWrapper> : <span className="text-red-500">{children}</span>
}
