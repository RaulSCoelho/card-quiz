import { authApi } from '@/server/prisma/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { user, error } = await authApi.register({ payload: body })

  if (error) return NextResponse.json(error.message, { status: 400 })
  return NextResponse.json(user)
}
