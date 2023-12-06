import { styled } from '../../styles'

export const TextInputContainer = styled('div', {
  display: 'flex',
  alignItems: 'baseline',
  padding: '$3 $4',
  boxSizing: 'border-box',
  background: '$gray900',
  border: '2px solid $gray900',
  borderRadius: '$sm',

  '&:has(input:focus)': {
    borderColor: '$ignite300',
  },

  '&:has(input:disabled)': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

export const Prefix = styled('span', {
  fontFamily: '$default',
  fontSize: '$sm',
  fontWeight: '$regular',
  color: '$gray400',
})

export const Input = styled('input', {
  width: '100%',
  fontFamily: '$default',
  fontSize: '$sm',
  fontWeight: '$regular',
  color: '$white',
  background: 'none',
  border: 'none',

  '&:focus': {
    outline: 'none',
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    color: '$gray400',
  },
})
