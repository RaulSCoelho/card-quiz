'use client'

import { useEffect, useState } from 'react'

import { useAxios } from '@/hooks/useAxios'
import { User } from '@prisma/client'

import { UsersList } from './UsersList'
import { UsersTable } from './UsersTable'

export function Users() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    useAxios.get<User[]>('/api/users').then(({ data }) => setUsers(data || []))
  }, [])

  function onCreateUser(user: User) {
    setUsers([...users, user])
  }

  function onRemoveUser(user: User) {
    const newUsers = users.filter(u => u.id !== user.id)
    setUsers(newUsers)
  }

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden w-full sm:block">
        <UsersTable users={users} onCreateUser={onCreateUser} onRemoveUser={onRemoveUser} />
      </div>
      {/* MOBILE */}
      <div className="block w-full sm:hidden">
        <UsersList users={users} onCreateUser={onCreateUser} onRemoveUser={onRemoveUser} />
      </div>
    </>
  )
}
