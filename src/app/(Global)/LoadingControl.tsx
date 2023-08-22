'use client'

import { useLoading } from '@/hooks/useLoading'

import Loading from '../loading'

export function LoadingControl() {
  const { loading } = useLoading()
  return <>{loading && <Loading />}</>
}
