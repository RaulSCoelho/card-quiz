'use client'

import React, { ComponentProps } from 'react'
import { IoClose } from 'react-icons/io5'

import { tv } from 'tailwind-variants'

import { IconButton } from '../Buttons/IconButton'
import { ModalActions } from './ModalActions'
import { ModalBase, ModalBaseProps } from './ModalBase'
import { ModalContent } from './ModalContent'

interface ModalProps extends ModalBaseProps {
  title?: string
  onSubmit?(): void
  noCloseButton?: boolean
}

const modal = tv({
  slots: {
    header: 'flex justify-between gap-4 pl-6 text-xl',
    content: 'flex grow flex-col justify-center overflow-auto'
  },
  variants: {
    title: {
      true: { header: 'p-4' },
      false: { header: 'p-2' }
    },
    noCloseButton: {
      true: { content: 'pt-5' }
    }
  }
})

const divContent = ({ children, ...props }: ComponentProps<'div'>) => <div {...props}>{children}</div>
const formContent = React.forwardRef<HTMLFormElement, ComponentProps<'form'>>(function formContent(
  { children, ...props },
  ref
) {
  return (
    <form ref={ref} {...props}>
      {children}
    </form>
  )
})

export function Modal({ children, title, onClose, onSubmit, noCloseButton = false, ...props }: ModalProps) {
  const { header, content } = modal({ title: !!title, noCloseButton })
  const Content = onSubmit ? formContent : divContent

  return (
    <ModalBase onClose={onClose} {...props}>
      <Content onSubmit={onSubmit} className={content()}>
        {!noCloseButton && (
          <div className={header()}>
            <div className="grow">{title}</div>
            <div>
              <IconButton icon={IoClose} onClick={onClose} size={24} className="bg-transparent p-0 shadow-none" />
            </div>
          </div>
        )}
        {children}
      </Content>
    </ModalBase>
  )
}

Modal.Content = ModalContent
Modal.Actions = ModalActions
