import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'

import { getElementHeight } from '@/utils/element'
import { tv } from 'tailwind-variants'

interface CollapseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: ReactNode
  open: boolean
  onChange?(open: boolean): void
  wrapperClassName?: string
}

const collapse = tv({
  base: 'overflow-hidden transition-[height] duration-300 ease-in-out'
})

let timeout: any

export function Collapse({ children, open, onChange, wrapperClassName, className, ...rest }: CollapseProps) {
  const [height, setHeight] = useState<number | undefined>(0)
  const childrenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timeout) clearTimeout(timeout)

    if (open) {
      setHeight(getElementHeight(childrenRef.current))
      timeout = setTimeout(() => setHeight(undefined), 300)
    } else {
      setHeight(prev => (prev === 0 ? 0 : getElementHeight(childrenRef.current)))
      timeout = setTimeout(() => setHeight(0), 10)
    }

    onChange?.(open)
  }, [open, onChange])

  return (
    <div className={collapse({ className: wrapperClassName })} style={{ height }} {...rest}>
      <div ref={childrenRef} className={className}>
        {children}
      </div>
    </div>
  )
}
