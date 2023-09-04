import { ComponentType } from 'react'

import { findMatches, removeAccents } from '@/utils/text'

interface HighlightProps {
  children: string
  search: {
    text: string
    wrapper?: ComponentType<{ children: string }>
  }[]
}

export function Highlight({ children, search }: HighlightProps) {
  const searchStrings = search.map(s => s.text)
  const matches = findMatches(children, searchStrings)

  if (!matches || matches.length === 0) {
    return children
  }

  return (
    <>
      {matches.map(({ from, to, match }, i) => {
        const text = children.substring(from, to)
        const textSearch = search.find(
          s => removeAccents(s.text).toLocaleLowerCase() === removeAccents(text).toLocaleLowerCase()
        )
        const CustomWrapper = textSearch?.wrapper

        return match ? (
          <Wrapper wrapper={CustomWrapper} key={i}>
            {text}
          </Wrapper>
        ) : (
          text
        )
      })}
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
