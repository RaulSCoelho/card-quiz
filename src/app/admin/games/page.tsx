import { gamesApi } from '@/server/prisma/games'

import { Games } from '.'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Jogos'
}

export default async function Page() {
  const { games } = await gamesApi.get()

  return (
    <div>
      <h1 className="mb-4 text-center font-sans text-4xl font-bold">Jogos</h1>
      <Games games={games || []} />
    </div>
  )
}
