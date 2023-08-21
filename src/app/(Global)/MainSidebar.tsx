'use client'

import { IoHomeOutline } from 'react-icons/io5'

import { Sidebar } from '@/components/Sidebar'
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

export function MainSidebar() {
  const { isOpen, close } = useMainSidebar()

  return (
    <Sidebar open={isOpen} onClose={close} title="Card Quiz" logo="/logo.png">
      <Sidebar.Body>
        <Sidebar.Route title="Home" path="/" icon={IoHomeOutline} exact />
      </Sidebar.Body>
    </Sidebar>
  )
}
