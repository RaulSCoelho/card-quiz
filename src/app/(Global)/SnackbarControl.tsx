'use client'

import { Snackbar, SnackbarProps } from '@/components/Feedback/Snackbar'
import { useSnackbar } from '@/hooks/useSnackbar'

export function SnackbarControl() {
  const { isOpen, message, type, position, duration, close } = useSnackbar()

  return (
    <>
      {['left-bottom', 'left-top', 'mid-bottom', 'mid-top', 'right-bottom', 'right-top'].map(p => (
        <Snackbar
          key={p}
          open={isOpen && position === p}
          message={message}
          type={type}
          onClose={close}
          position={p as SnackbarProps['position']}
          duration={duration}
        />
      ))}
    </>
  )
}
