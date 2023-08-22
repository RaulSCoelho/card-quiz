import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { LuPlus } from 'react-icons/lu'

import { Button } from '@/components/Buttons'
import { useAxios } from '@/hooks/useAxios'
import { useConfirmationModal } from '@/hooks/useConfirmationModal'
import { useLoading } from '@/hooks/useLoading'
import { useUser } from '@/hooks/useUser'
import { User } from '@prisma/client'
import { format } from 'date-fns'

import { NewUserModal } from './NewUserModal'

interface UsersTableProps {
  users: User[]
  onCreateUser?(user: User): void
  onRemoveUser?(user: User): void
}

export function UsersTable({ users, onCreateUser, onRemoveUser }: UsersTableProps) {
  const { user: loggedUser } = useUser()
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
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-400 dark:border-slate-600">
          <th className="p-2 text-start">Username</th>
          <th className="p-2 text-start">Nome</th>
          <th className="p-2 text-start" colSpan={2}>
            Criado em
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-400 dark:divide-slate-600">
        {users.map(user => (
          <tr key={user.id}>
            <td className="p-2">
              <p>{user.username}</p>
            </td>
            <td className="p-2">
              <p>{user.name}</p>
            </td>
            <td className="p-2">
              <p>{format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm')}</p>
            </td>
            <td className="p-2 pl-4">
              {user.id !== loggedUser?.id && (
                <div>
                  <BiTrash
                    size={20}
                    className="cursor-pointer hover:text-red-500 dark:hover:text-red-600"
                    onClick={() => deleteUser(user)}
                  />
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4} className="pt-2">
            <div className="flex justify-end">
              <Button className="flex gap-2 pl-2" onClick={() => setNewUserModalOpen(true)}>
                <LuPlus size={24} />
                Novo
              </Button>
              <NewUserModal open={newUserModalOpen} onClose={() => setNewUserModalOpen(false)} onCreate={onCreate} />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
