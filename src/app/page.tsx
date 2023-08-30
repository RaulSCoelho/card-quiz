import { gamesApi } from '@/server/prisma/games'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { games } = await gamesApi.get()

  return (
    <div className="flex select-none flex-col items-center justify-center px-2">
      <h1 className="mb-4 w-full text-center font-mono text-4xl font-semibold">Jogar</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {games?.map(game => (
          <Link
            href={`/games/${game.id}`}
            className="max-w-xs cursor-pointer rounded-lg bg-gradient-to-br from-indigo-700 to-sky-400 px-8 py-5 text-white shadow-lg shadow-black/30 transition duration-300 ease-in-out hover:scale-105 active:scale-100  dark:from-violet-800 dark:from-15% dark:to-rose-400"
            key={game.id}
          >
            <p className="mb-2 text-center text-7xl">{String.fromCodePoint(parseInt(game.logo, 16))}</p>
            <p className="mb-2 text-center font-serif text-2xl font-semibold">{game.name}</p>
            <p className="line-clamp-6 break-all text-center text-lg">{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
