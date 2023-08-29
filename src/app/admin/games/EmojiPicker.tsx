import { useEffect, useState } from 'react'

import data from '@emoji-mart/data'
import i18n from '@emoji-mart/data/i18n/pt.json'
import MartEmojiPicker from '@emoji-mart/react'

interface Emoji {
  unified: string
}

interface EmojiPickerProps {
  emoji?: string
  onSelect(emoji: Emoji): void
  error?: string
}

export function EmojiPicker({ emoji: controlledEmoji, onSelect, error }: EmojiPickerProps) {
  const [emoji, setEmoji] = useState<string>(controlledEmoji || '')
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

  useEffect(() => {
    if (controlledEmoji) setEmoji(controlledEmoji)
  }, [controlledEmoji])

  function onSelectEmoji(emoji: Emoji) {
    setEmoji(emoji.unified)
    onSelect(emoji)
    setEmojiPickerOpen(false)
  }

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="flex aspect-square w-fit cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-indigo-700 to-sky-400 p-2 text-7xl text-white dark:from-violet-800 dark:from-15% dark:to-rose-400"
        onClick={() => setEmojiPickerOpen(true)}
      >
        {emoji ? String.fromCodePoint(parseInt(emoji, 16)) : '❔'}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {emojiPickerOpen && (
        <div className="absolute top-full z-10 mt-2 shadow-2xl shadow-black/50">
          <MartEmojiPicker
            i18n={i18n}
            data={data}
            locale="pt"
            onEmojiSelect={onSelectEmoji}
            onClickOutside={() => setEmojiPickerOpen(false)}
          />
        </div>
      )}
    </div>
  )
}
