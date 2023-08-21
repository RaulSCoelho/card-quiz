import { usersApi } from '@/server/prisma/users'
import { NextResponse } from 'next/server'

export async function GET() {
  const { users, error } = await usersApi.get()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(users)
}
