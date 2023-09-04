import { ComponentType } from 'react'

import { findMatches, removeAccents } from '@/utils/text'

type Wrapper = ComponentType<{ children: string }>

type Search =
  | {
      text: string
      wrapper?: Wrapper
    }
  | string

interface HighlightProps {
  children: string
  search: Search[]
  wrapper?: Wrapper
}

export function Highlight({ children, search, wrapper }: HighlightProps) {
  const searchStrings = search.map(s => (typeof s === 'string' ? s : s.text))
  const matches = findMatches(children, searchStrings)

  if (!matches || matches.length === 0) {
    return children
  }

  return (
    <>
      {matches.map(({ from, to, match }, i) => {
        const text = children.substring(from, to)
        const textSearch = search.find(
          s =>
            removeAccents(typeof s === 'string' ? s : s.text).toLocaleLowerCase() ===
            removeAccents(text).toLocaleLowerCase()
        )
        let CustomWrapper = wrapper
        if (typeof textSearch === 'object') {
          CustomWrapper = textSearch.wrapper
        }

        return match ? (
          <HighlightWrapper wrapper={CustomWrapper} key={i}>
            {text}
          </HighlightWrapper>
        ) : (
          text
        )
      })}
    </>
  )
}

interface HighlightWrapperProps {
  children: string
  wrapper?: Wrapper
}

function HighlightWrapper({ children, wrapper: TextWrapper }: HighlightWrapperProps) {
  return TextWrapper ? <TextWrapper>{children}</TextWrapper> : <span className="text-red-500">{children}</span>
}
