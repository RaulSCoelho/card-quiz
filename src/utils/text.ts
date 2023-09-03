type Match = {
  from: number
  to: number
  text: string
  match: boolean
}

const escapeRegex = (value: string): string => value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')

export function findMatches(source: string, target: string | string[]) {
  const targets = Array.isArray(target) ? target : [target]
  const matches: Match[] = []
  const nonMatching: Match[] = []

  // Find all matches
  for (const target of targets) {
    if (target && target !== ' ') {
      const regex = new RegExp(escapeRegex(target), 'gi')
      let match: RegExpExecArray | null
      while ((match = regex.exec(source)) !== null) {
        const from = match.index
        const to = from + match[0].length
        matches.push({ from, to, text: source.slice(from, to), match: true })
      }
    }
  }

  matches.sort((a, b) => a.from - b.from)

  // Find the matches that are not entirely in another match
  const filteredMatches = matches.filter(
    ({ from, to }, i) =>
      !matches.some(
        ({ from: otherFrom, to: otherTo }, j) =>
          isBetween(from, otherFrom, otherTo) && isBetween(to, otherFrom, otherTo) && i !== j
      )
  )

  // get only the non intersecting part of each match
  for (let i = 0; i < filteredMatches.length; i++) {
    const match = filteredMatches[i]
    const intersectings = filteredMatches.filter(
      ({ from, to, text }, index) =>
        to > match.from && from < match.to && text.length > match.text.length && index !== i
    )
    const { from: newFrom, to: newTo } = getNewFromTo(match, intersectings)

    if (newFrom && newTo) {
      match.from = newFrom
      match.to = newTo
      match.text = source.slice(newFrom, newTo)
    }
  }

  // Get the non matching parts
  filteredMatches.forEach((match, i) => {
    const nextMatch = filteredMatches[i + 1]

    if (i === 0 && match.from > 0) {
      const from = 0
      const to = match.from
      nonMatching.push({ from, to, text: source.slice(from, to), match: false })
    }

    if (nextMatch || (!nextMatch && match.to < source.length)) {
      const from = match.to
      const to = nextMatch ? nextMatch.from : source.length
      nonMatching.push({ from, to, text: source.slice(from, to), match: false })
    }
  })

  // Merge the parts
  return filteredMatches.concat(nonMatching).sort((a, b) => a.from - b.from)
}

function getNewFromTo(match: Match, matches: Match[]) {
  if (matches.length === 0) return {}

  let maxFrom = matches[0].from
  let minTo = matches[0].to

  for (const { from, to } of matches) {
    if (from > maxFrom) {
      maxFrom = from
    }

    if (to < minTo) {
      minTo = to
    }
  }

  if (matches.length >= 2) {
    return { from: minTo, to: maxFrom }
  } else {
    const { from: otherFrom, to: otherTo } = matches[0]
    const rightPieceIn = match.to < otherTo

    return { from: rightPieceIn ? match.from : otherTo, to: rightPieceIn ? otherFrom : match.to }
  }
}

function isBetween(value: number, n1: number, n2: number, inclusive: boolean = true) {
  if (inclusive) return value >= n1 && value <= n2
  return value > n1 && value < n2
}
