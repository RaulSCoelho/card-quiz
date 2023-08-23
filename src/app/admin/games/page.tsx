import { gamesApi } from '@/server/prisma/games'

import { Games } from '.'

export const metadata = {
  title: 'Games'
}

export default async function Page() {
  const { games } = await gamesApi.get()
  return <Games games={games || []} />
}
