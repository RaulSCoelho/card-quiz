import { SelectHTMLAttributes, forwardRef } from 'react'

import { tv } from 'tailwind-variants'

import { InputLabel } from './InputLabel'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  wrapperClassName?: string
}

const select = tv({
  base: 'w-full cursor-pointer rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none dark:bg-white'
})

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { children, label, error, wrapperClassName, className, ...rest },
  ref
) {
  return (
    <div className={wrapperClassName}>
      {label && <InputLabel htmlFor={rest.name}>{label}</InputLabel>}
      <select ref={ref} className={select({ className })} {...rest}>
        {children}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
})
