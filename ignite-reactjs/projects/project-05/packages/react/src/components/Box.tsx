import { ComponentProps, ElementType } from 'react'
import { styled } from '../styles'

export const Box = styled('div', {
  padding: '$4',
  boxSizing: 'border-box',
  backgroundColor: '$gray800',
  border: '1px solid $gray600',
  borderRadius: '$md',
})

export interface BoxProps extends ComponentProps<typeof Box> {
  as?: ElementType
}

Box.displayName = 'Box'
