import { ComponentProps } from 'react'

import { tv } from 'tailwind-variants'

interface TextProps extends ComponentProps<'p'> {
  variant?: 'gradient'
}

const text = tv({
  base: '',
  variants: {
    variant: {
      gradient:
        'bg-gradient-to-r from-primary-light to-sky-400 bg-clip-text text-transparent dark:from-primary-dark dark:to-rose-400'
    }
  }
})

export function Text({ children, variant, className, ...props }: TextProps) {
  return (
    <p className={text({ variant, className })} {...props}>
      {children}
    </p>
  )
}
