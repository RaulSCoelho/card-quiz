'use client'

import { GoPeople } from 'react-icons/go'
import { IoGameControllerOutline, IoHomeOutline } from 'react-icons/io5'
import { MdLogin, MdOutlineAdminPanelSettings as AdminIcon } from 'react-icons/md'

import { Button } from '@/components/Buttons'
import { Sidebar } from '@/components/Sidebar'
import { useUser } from '@/hooks/useUser'
import { usePathname, useRouter } from 'next/navigation'
import { create } from 'zustand'

interface SidebarState {
  isOpen: boolean
  open(): void
  close(): void
}

export const useMainSidebar = create<SidebarState>(set => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false }))
}))

const adminPaths = [
  { title: 'Users', path: '/users', icon: GoPeople },
  { title: 'Games', path: '/games', icon: IoGameControllerOutline }
]

export function MainSidebar() {
  const { isOpen, close } = useMainSidebar()
  const { isAuthenticated, isAdmin, logout } = useUser()
  const { push } = useRouter()
  const pathname = usePathname()

  function login() {
    push(`/login?${new URLSearchParams({ callbackUrl: pathname || '/' })}`)
  }

  return (
    <Sidebar open={isOpen} onClose={close} title="Cards Quiz" logo="/logo.png">
      <Sidebar.Body>
        <Sidebar.Route title="Home" path="/" icon={IoHomeOutline} exact />
        {isAdmin && <Sidebar.Accordion title="Admin" path="/admin" icon={AdminIcon} paths={adminPaths} />}
      </Sidebar.Body>
      <Sidebar.Footer className="p-2">
        <Button
          className="flex w-full items-center justify-center gap-2 text-lg font-medium shadow-none"
          onClick={isAuthenticated ? logout : login}
        >
          {isAuthenticated ? 'Sair' : 'Entrar'}
          <MdLogin size={24} />
        </Button>
      </Sidebar.Footer>
    </Sidebar>
  )
}
