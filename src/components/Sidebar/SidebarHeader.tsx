import { MdClose } from 'react-icons/md'

import Link from 'next/link'
import { tv } from 'tailwind-variants'

import { IconButton } from '../Buttons/IconButton'
import { Cards } from '../Images/Cards'

interface SidebarHeaderProps {
  onClose(): void
  title?: string
  logo?: string
  reverse?: boolean
}

const header = tv({
  base: 'flex items-center justify-between gap-4 border-b border-slate-400 p-4 dark:border-slate-600',
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
        {logo && <Cards className="h-9 w-9" />}
        <span className="font-serif text-2xl font-normal text-black dark:text-white">{title}</span>
      </Link>
      <div className="h-full">
        <IconButton icon={MdClose} onClick={onClose} />
      </div>
    </div>
  )
}
