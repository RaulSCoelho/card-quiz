'use client'

import { MdMenu } from 'react-icons/md'

import { IconButton } from '@/components/Buttons/IconButton'
import { ThemeSwitcher } from '@/components/Switchers/ThemeSwitcher'
import Link from 'next/link'

import { useMainSidebar } from './(Global)/MainSidebar'

export function Header() {
  const { open: openSidebar } = useMainSidebar()

  return (
    <div className="sticky inset-x-0 top-0 z-10 flex h-14 select-none items-center justify-between border-b border-primary-light/50 bg-white/90 px-4 text-primary-light backdrop-blur dark:border-primary-dark/50 dark:bg-[#0F172A]/75">
      <div className="flex h-full items-center gap-4">
        <IconButton
          icon={MdMenu}
          size={24}
          onClick={openSidebar}
          className="rounded bg-primary-light text-light dark:bg-primary-dark dark:text-slate-400"
        />
        <Link href="/" className="text-lg font-semibold">
          Card Quiz
        </Link>
      </div>
      <ThemeSwitcher />
    </div>
  )
}
