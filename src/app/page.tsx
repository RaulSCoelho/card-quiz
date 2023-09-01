import { PlayButton } from '@/components/Game/PlayButton'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="flex select-none flex-col items-center justify-center px-2">
      <PlayButton />
    </div>
  )
}
