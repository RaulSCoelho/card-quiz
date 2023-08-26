import { Logo } from '@/components/Images/Logo'

export default function Home() {
  return (
    <div className="flex select-none flex-col items-center justify-center px-2">
      <Logo className="mb-4" />
      <h1 className="w-full text-center font-serif text-3xl font-semibold">Jogos</h1>
    </div>
  )
}
