import { Card } from '@/components/Card'
import { gamesApi } from '@/server/prisma/games'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Jogos'
}

export default async function Page() {
  const { games } = await gamesApi.get()

  return (
    <div className="flex select-none flex-wrap justify-center gap-5">
      {games?.map(game => (
        <Link href={`/games/${game.id}`} className="max-w-xs cursor-pointer rounded-lg" key={game.id}>
          <Card className="px-8 py-5 hover:scale-105 active:scale-[1.025]">
            <p className="mb-2 text-center text-7xl">{String.fromCodePoint(parseInt(game.logo, 16))}</p>
            <p className="mb-2 text-center font-serif text-2xl font-semibold">{game.name}</p>
            <p className="line-clamp-6 break-all text-center text-lg">{game.description}</p>
          </Card>
        </Link>
      ))}
    </div>
  )
}
