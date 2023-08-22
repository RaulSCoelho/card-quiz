import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { LuPlus } from 'react-icons/lu'

import { Button } from '@/components/Buttons'
import { useAxios } from '@/hooks/useAxios'
import { useConfirmationModal } from '@/hooks/useConfirmationModal'
import { useLoading } from '@/hooks/useLoading'
import { User } from '@prisma/client'
import { format } from 'date-fns'

import { NewUserModal } from './NewUserModal'

interface UsersListProps {
  users: User[]
  onCreateUser?(user: User): void
  onRemoveUser?(user: User): void
}

export function UsersList({ users, onCreateUser, onRemoveUser }: UsersListProps) {
  const { open: openConfirmationModal } = useConfirmationModal()
  const { setLoading } = useLoading()
  const [newUserModalOpen, setNewUserModalOpen] = useState(false)

  async function deleteUser(user: User) {
    openConfirmationModal({
      title: 'Remover Usuário',
      question: `Tem certeza que deseja remover ${user.username}?`,
      onConfirm: async () => {
        setLoading(true)
        const { ok } = await useAxios.delete(`/api/users/${user.id}`)
        if (ok) {
          onRemoveUser?.(user)
        }
        setLoading(false)
      }
    })
  }

  function onCreate(user: User) {
    onCreateUser?.(user)
    setNewUserModalOpen(false)
  }

  return (
    <div>
      {users.map(user => (
        <div className="flex items-center gap-4 rounded-lg border border-gray-400/50 p-2 sm:p-4" key={user.id}>
          <div className="flex grow flex-col">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">
                <b>Username:</b> {user.username}
              </p>
              <div>
                <BiTrash
                  size={20}
                  className="cursor-pointer hover:text-red-500 dark:hover:text-red-600"
                  onClick={() => deleteUser(user)}
                />
              </div>
            </div>
            <p className="text-lg font-medium">
              <b>Nome:</b> {user.name}
            </p>
            <p className="text-lg font-medium">
              <b>Criado em:</b> {format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm')}
            </p>
          </div>
        </div>
      ))}
      <div className="mt-2 flex justify-end">
        <Button className="flex gap-2 pl-2" onClick={() => setNewUserModalOpen(true)}>
          <LuPlus size={24} />
          Novo
        </Button>
        <NewUserModal open={newUserModalOpen} onClose={() => setNewUserModalOpen(false)} onCreate={onCreate} />
      </div>
    </div>
  )
}
