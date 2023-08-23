import { Logo } from '@/components/Images/Logo'

export default function Home() {
  return (
    <div className="flex select-none flex-col items-center justify-center px-2">
      <Logo />
      <h1 className="w-full text-start font-serif text-3xl font-semibold">Quizzes</h1>
    </div>
  )
}
