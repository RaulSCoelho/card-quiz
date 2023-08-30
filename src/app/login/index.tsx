'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { SignInRequest, signInSchema } from '@/@types/auth'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Buttons'
import { Input } from '@/components/Input'
import { useUser } from '@/hooks/useUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInRequest>({ resolver: zodResolver(signInSchema) })
  const [error, setError] = useState<string>('')
  const { login, loading } = useUser()
  const query = useSearchParams()

  async function onSubmit({ login: logIn, password }: SignInRequest) {
    const { error } = await login({ login: logIn, password })

    if (error) {
      setError(error || 'Nome de usuário ou senha incorretos')
    } else {
      window.location.href = query?.get('callbackUrl') || '/'
    }
  }

  useEffect(() => {
    setError(Object.keys(errors).length > 0 ? Object.values(errors)[0].message || '' : '')
  }, [errors])

  return (
    <div className="flex items-center justify-center pt-12">
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-center text-3xl font-extrabold">Entrar na sua conta</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Alert message={error} onClose={() => setError('')} className="shadow-md" type="error" />
          <div className="-space-y-px rounded-md shadow-sm">
            <Input
              className="rounded-b-none rounded-t-md border border-gray-300"
              placeholder="Nome de usuário ou endereço de email"
              autoComplete="username"
              {...register('login')}
            />
            <Input
              type="password"
              className="rounded-b-md rounded-t-none border border-gray-300"
              placeholder="Senha"
              autoComplete="current-password"
              {...register('password')}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" className="w-full rounded-md" loading={loading}>
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
