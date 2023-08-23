import { ComponentProps } from 'react'

export function InputLabel({ children, ...props }: ComponentProps<'label'>) {
  return (
    <label className="mb-2 block text-xs font-bold uppercase tracking-wide" {...props}>
      {children}
    </label>
  )
}
