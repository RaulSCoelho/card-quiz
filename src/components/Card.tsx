import { ComponentProps } from 'react'

import { tv } from 'tailwind-variants'

const card = tv({
  base: 'rounded-lg bg-gradient-to-br from-indigo-700 to-sky-400 text-white shadow-lg shadow-black/30 transition duration-300 ease-in-out dark:from-violet-800 dark:from-15% dark:to-rose-400'
})

export function Card({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={card({ className })} {...props}>
      {children}
    </div>
  )
}
