'use client'

import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { SignUpRequest, signUpSchema } from '@/@types/auth'
import { Button } from '@/components/Buttons'
import { Snackbar } from '@/components/Feedback/Snackbar'
import { Input } from '@/components/Input'
import { Checkbox } from '@/components/Input/Checkbox'
import { Modal } from '@/components/Modal'
import { useAxios } from '@/hooks/useAxios'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'

interface NewUserModalProps {
  open: boolean
  onClose(): void
  onCreate?(user: User): void
}

export function NewUserModal({ open, onClose, onCreate }: NewUserModalProps) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpRequest>({ resolver: zodResolver(signUpSchema) })
  const [error, setError] = useState('')
  const isAdmin = (watch('roles') || []).includes('ADMIN')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit({ confirmPassword, ...newUser }: SignUpRequest) {
    const { data: user, error } = await useAxios.post<User>('api/register', newUser)
    if (error) {
      setError(error)
    } else if (user) {
      onCreate?.(user)
    }
  }

  function toggleAdmin(e: ChangeEvent<HTMLInputElement>) {
    setValue('roles', e.target.checked ? ['ADMIN'] : undefined)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Content className="min-w-[min(442px,calc(100vw-64px))]">
        <Snackbar open={!!error} message={error} type="error" position="mid-top" onClose={() => setError('')} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mb-4 text-center text-3xl font-extrabold">Criar um usuário</h2>
          <div className="mb-4 space-y-2">
            <Input label="username" error={errors.username?.message} {...register('username')} />
            <Input label="Nome completo" error={errors.name?.message} {...register('name')} />
            <Input
              label="email"
              error={errors.email?.message}
              {...register('email', { setValueAs: value => value || undefined })}
            />
            <Input type="password" label="senha" error={errors.password?.message} {...register('password')} />
            <Input
              type="password"
              label="confirme sua senha"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <Checkbox label="admin" value="ADMIN" checked={isAdmin} onChange={toggleAdmin} />
          </div>
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Criar
          </Button>
        </form>
      </Modal.Content>
    </Modal>
  )
}
