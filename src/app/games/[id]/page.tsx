import { gamesApi } from '@/server/prisma/games'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Game'
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { game } = await gamesApi.getById({ id })

  return <div className="flex justify-center">{game?.id}</div>
}
