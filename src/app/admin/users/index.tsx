'use client'

import { useState } from 'react'

import { User } from '@prisma/client'

import { UsersList } from './UsersList'
import { UsersTable } from './UsersTable'

interface UsersProps {
  users: User[]
}

export function Users({ users: initialUsers }: UsersProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)

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
