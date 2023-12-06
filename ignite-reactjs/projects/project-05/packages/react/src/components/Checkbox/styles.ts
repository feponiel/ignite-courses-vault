import { styled, keyframes } from '../../styles'
import * as Checkbox from '@radix-ui/react-checkbox'

export const CheckboxContainer = styled(Checkbox.Root, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '$6',
  height: '$6',
  boxSizing: 'border-box',
  lineHeight: 0,
  overflow: 'hidden',
  background: '$gray900',
  border: '2px solid $gray900',
  borderRadius: '$xs',
  cursor: 'pointer',

  '&[data-state="checked"]': {
    background: '$ignite300',
  },

  '&:focus': {
    border: '2px solid $ignite300',
  },
})

const slideIn = keyframes({
  from: {
    transform: 'translateY(-100%)',
  },

  to: {
    transform: 'translateY(0)',
  },
})

const slideOut = keyframes({
  from: {
    transform: 'translateY(0)',
  },

  to: {
    transform: 'translateY(-100%)',
  },
})

export const CheckboxIndicator = styled(Checkbox.Indicator, {
  width: '$4',
  height: '$4',
  color: '$white',

  '&[data-state="checked"]': {
    animation: `${slideIn} 200ms ease-out`,
  },

  '&[data-state="unchecked"]': {
    animation: `${slideOut} 200ms ease-out`,
  },
})
