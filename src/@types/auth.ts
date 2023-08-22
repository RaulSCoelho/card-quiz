import { boundedString } from '@/utils/zod'
import { z } from 'zod'

export const signUpSchema = z
  .object({
    username: boundedString({ field: 'Nome de Usuário', min: 6 }).nonempty('Por favor, insira um nome de usuário.'),
    name: z.string().optional(),
    email: z.string().email().optional(),
    roles: z.array(z.enum(['ADMIN', 'USER'])).optional(),
    password: boundedString({ field: 'Senha', min: 6, max: 30 }).nonempty('Por favor, insira uma senha.'),
    confirmPassword: z.string().nonempty('Por favor, confirme sua senha.')
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword']
  })

export const signInSchema = z.object({
  login: boundedString({ field: 'Nome de Usuário ou endereço de email', min: 6 }).nonempty(
    'Por favor, insira um nome de usuário ou endereço de email.'
  ),
  password: boundedString({ field: 'Senha', min: 6, max: 30 }).nonempty('Por favor, insira uma senha.')
})

export type SignUpRequest = z.infer<typeof signUpSchema>
export type SignInRequest = z.infer<typeof signInSchema>
