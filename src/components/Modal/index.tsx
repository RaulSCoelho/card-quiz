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
}

const modal = tv({
  slots: {
    header: 'flex justify-between gap-4 pl-6 text-xl',
    form: 'flex grow flex-col justify-center'
  },
  variants: {
    title: {
      true: { header: 'p-4' },
      false: { header: 'p-2' }
    }
  }
})

const divContent = ({ children, ...props }: ComponentProps<'div'>) => <div {...props}>{children}</div>
const formContent = React.forwardRef<HTMLFormElement, ComponentProps<'form'>>(function formContent(
  { children, className, ...props },
  ref
) {
  const { form } = modal()

  return (
    <form ref={ref} className={form({ className })} {...props}>
      {children}
    </form>
  )
})

export function Modal({ children, title, onClose, onSubmit, ...props }: ModalProps) {
  const { header } = modal({ title: !!title })
  const Content = onSubmit ? formContent : divContent

  return (
    <ModalBase onClose={onClose} {...props}>
      <Content onSubmit={onSubmit}>
        <div className={header()}>
          <div className="grow">{title}</div>
          <div>
            <IconButton icon={IoClose} onClick={onClose} size={24} className="bg-transparent p-0 shadow-none" />
          </div>
        </div>
        {children}
      </Content>
    </ModalBase>
  )
}

Modal.Content = ModalContent
Modal.Actions = ModalActions
