import { ComponentProps } from 'react'
import { styled } from '../styles'

export const TextArea = styled('textarea', {
  minHeight: 80,
  padding: '$3 $4',
  boxSizing: 'border-box',
  fontFamily: '$default',
  fontSize: '$sm',
  fontWeight: '$regular',
  color: '$white',
  background: '$gray900',
  resize: 'vertical',
  border: '2px solid $gray900',
  borderRadius: '$sm',

  '&:focus': {
    borderColor: '$ignite300',
    outline: 'none',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    color: '$gray400',
  },
})

export interface TextAreaProps extends ComponentProps<typeof TextArea> {}

TextArea.displayName = 'TextArea'
