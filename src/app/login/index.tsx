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
      setError(error || 'Wrong username or password')
    } else {
      window.location.href = query?.get('callbackUrl') || '/'
    }
  }

  useEffect(() => {
    setError(Object.keys(errors).length > 0 ? Object.values(errors)[0].message || '' : '')
  }, [errors])

  return (
    <div className="flex items-center justify-center pt-12">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-center text-3xl font-extrabold">Log in to your account</h2>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Alert message={error} onClose={() => setError('')} className="mx-1 mb-3 shadow-md" type="error" />
          <div className="-space-y-px rounded-md shadow-sm">
            <Input
              className="rounded-b-none rounded-t-md border border-gray-300"
              placeholder="Username or email address"
              autoComplete="username"
              {...register('login')}
            />
            <Input
              type="password"
              className="rounded-b-md rounded-t-none border border-gray-300"
              placeholder="Password"
              autoComplete="current-password"
              {...register('password')}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" className="w-full rounded-md" loading={loading}>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
