import { ReactNode, useEffect, useRef, useState } from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { handleClickOutside } from '@/utils/element'
import { tv } from 'tailwind-variants'

export interface ModalBaseProps {
  children: ReactNode
  open: boolean
  onClose(): void
  size?: 'sm' | 'md' | 'lg' | 'fixed-sm' | 'fixed-md' | 'fixed-lg'
  fullScreen?: boolean
}

const modal = tv({
  slots: {
    wrapper:
      'fixed inset-0 z-20 flex items-center justify-center bg-black/50 transition-[opacity] duration-[225ms] ease-in-out',
    content: 'flex flex-col bg-light text-dark dark:bg-dark dark:text-light'
  },
  variants: {
    opacity: {
      0: { wrapper: 'opacity-0' },
      1: { wrapper: 'opacity-100' }
    },
    size: {
      sm: { content: 'max-w-[min(600px,calc(100%-64px))]' },
      md: { content: 'max-w-[min(1000px,calc(100%-64px))]' },
      lg: { content: 'max-w-[calc(100%-64px)]' },
      'fixed-sm': { content: 'w-[600px] max-w-[calc(100%-64px)]' },
      'fixed-md': { content: 'w-[1000px] max-w-[calc(100%-64px)]' },
      'fixed-lg': { content: 'w-[calc(100%-64px)]' }
    },
    fullScreen: {
      true: { content: 'h-full w-full max-w-none' },
      false: { content: 'max-h-[calc(100%-64px)] rounded' }
    }
  }
})

export function ModalBase({ children, open, onClose, size = 'sm', fullScreen = true }: ModalBaseProps) {
  const [visible, setVisible] = useState(false)
  const [opacity, setOpacity] = useState<0 | 1>(0)
  const { matches: isSmallScreen } = useMediaQuery({ size: 'sm' })
  const modalContentRef = useRef<HTMLDivElement>(null)
  const { wrapper, content } = modal({ size, opacity, fullScreen: fullScreen && isSmallScreen })

  useEffect(() => {
    if (open) setVisible(true)
    setOpacity(open ? 1 : 0)
  }, [open])

  function handleTransitionEnd() {
    if (!open) setVisible(false)
  }

  if (!visible) return null
  return (
    <div
      data-test="modal"
      className={wrapper()}
      onTransitionEnd={handleTransitionEnd}
      onClick={handleClickOutside(modalContentRef, onClose)}
    >
      <div ref={modalContentRef} className={content()}>
        {children}
      </div>
    </div>
  )
}
