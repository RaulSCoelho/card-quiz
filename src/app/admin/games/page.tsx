import { gamesApi } from '@/server/prisma/games'

import { Games } from '.'

export const metadata = {
  title: 'Games'
}

export default async function Page() {
  const { games } = await gamesApi.get()

  return (
    <div className="px-4">
      <h1 className="mb-4 text-center font-sans text-4xl font-bold">Jogos</h1>
      <Games games={games || []} />
    </div>
  )
}
