import { IconType } from 'react-icons/lib'

import { tv } from 'tailwind-variants'

import { Badge, BadgeProps } from '../Badge'
import { ButtonBase, ButtonBaseProps } from './ButtonBase'

export interface IconButtonProps extends Omit<ButtonBaseProps, 'children'> {
  icon: IconType
  size?: number
  color?: string
  badge?: Omit<BadgeProps, 'children' | 'size'>
}

const iconButton = tv({
  base: 'relative flex aspect-square items-center justify-center rounded-[50%] bg-gray-500/10 p-1.5'
})

export function IconButton({
  icon: Icon,
  size,
  color,
  className,
  badge,
  rippleColor = '#818cf8',
  ...rest
}: IconButtonProps) {
  return (
    <ButtonBase className={iconButton({ className })} rippleColor={rippleColor} {...rest}>
      <Badge size="xs" {...badge}>
        <Icon size={size || 20} color={color || 'inherit'} />
      </Badge>
    </ButtonBase>
  )
}
