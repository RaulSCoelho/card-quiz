import { SnackbarProps } from '@/components/Feedback/Snackbar'
import { create } from 'zustand'

interface OpenSnackbarProps {
  message: string
  type: SnackbarProps['type']
  position?: SnackbarProps['position']
  duration?: number
}

interface SnackbarState extends OpenSnackbarProps {
  isOpen: boolean
  open(props: OpenSnackbarProps): void
  close(): void
}

const defaultValues: OpenSnackbarProps = { message: '', type: 'success', position: undefined, duration: undefined }

export const useSnackbar = create<SnackbarState>(set => ({
  ...defaultValues,
  isOpen: false,
  open: (props: OpenSnackbarProps) => set(() => open(props)),
  close: () => set(() => ({ ...defaultValues, isOpen: false }))
}))

function open({ message, type, position, duration }: OpenSnackbarProps) {
  return { isOpen: true, message, type, position, duration }
}
