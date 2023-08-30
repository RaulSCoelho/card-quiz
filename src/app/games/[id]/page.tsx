import { gamesApi } from '@/server/prisma/games'

import { CardsSlider } from '.'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Game'
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { game } = await gamesApi.getById({ id })

  return (
    <div className="flex justify-center overflow-hidden">
      <CardsSlider cards={game?.cards} />
    </div>
  )
}
