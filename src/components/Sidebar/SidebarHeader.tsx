import { MdClose } from 'react-icons/md'

import Link from 'next/link'
import { tv } from 'tailwind-variants'

import { IconButton } from '../Buttons/IconButton'
import { Cards } from '../Images/Cards'
import { Text } from '../Text'

interface SidebarHeaderProps {
  onClose(): void
  title?: string
  logo?: string
  reverse?: boolean
}

const header = tv({
  base: 'flex items-center justify-between gap-4 p-4',
  variants: {
    reverse: {
      true: 'flex-row-reverse',
      false: ''
    }
  }
})

export function SidebarHeader({ onClose, title, logo, reverse = false }: SidebarHeaderProps) {
  return (
    <div className={header({ reverse })}>
      <Link href="/" className="flex items-center gap-3">
        {logo && <Cards className="h-9 w-9" colorClassName="fill-indigo-700 dark:fill-violet-800" />}
        <Text className="font-serif text-2xl font-normal" variant="gradient">
          {title}
        </Text>
      </Link>
      <div className="h-full">
        <IconButton icon={MdClose} onClick={onClose} />
      </div>
    </div>
  )
}
