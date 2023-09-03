import { tv } from 'tailwind-variants'

export const component = tv({
  variants: {
    rounded: {
      sm: 'rounded',
      md: 'rounded-lg',
      lg: 'rounded-2xl'
    },
    color: {
      primary: 'bg-primary-light dark:bg-primary-dark',
      secondary: 'bg-secondary-light dark:bg-secondary-dark',
      info: 'bg-info-light dark:bg-info-dark',
      success: 'bg-success-light dark:bg-success-dark',
      warning: 'bg-warning-light dark:bg-warning-dark',
      error: 'bg-error-light dark:bg-error-dark'
    }
  }
})
