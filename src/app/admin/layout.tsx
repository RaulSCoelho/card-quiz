import { ReactNode } from 'react'

import { Authorize } from '@/components/Authorize'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Authorize admin redirect="/">
      {children}
    </Authorize>
  )
}
