import { Logo } from '@/components/Images/Logo'

export default function Home() {
  return (
    <div className="h-full lg:border-x lg:border-slate-400 dark:lg:border-slate-600">
      <div className="flex select-none justify-center">
        <Logo bgClassName="dark:fill-primary-dark" />
      </div>
    </div>
  )
}
