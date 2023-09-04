import { gamesApi } from '@/server/prisma/games'
import { redirect } from 'next/navigation'

import Loading from '../loading'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const { games } = await gamesApi.get()

  if (games && games.length > 0) {
    return redirect(`/games/${games[0].id}`)
  }

  return <Loading />
}
