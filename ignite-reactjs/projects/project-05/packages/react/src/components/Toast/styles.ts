import { keyframes, styled } from '../../styles'
import * as Toast from '@radix-ui/react-toast'

const VIEWPORT_PADDING = 25

const hide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: 'translateX(0)' },
})

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
})

export const ToastViewport = styled(Toast.Viewport, {
  position: 'fixed',
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: 390,
  maxWidth: '100vw',
  margin: 0,
  listStyle: 'none',
  zIndex: 2147483647,
  outline: 'none',
})

export const ToastRoot = styled(Toast.Root, {
  display: 'grid',
  gridTemplateAreas: '"title close" "description close"',
  gridTemplateColumns: 'auto max-content',
  width: 360,
  padding: '$3 $5',
  boxSizing: 'border-box',
  background: '$gray800',
  border: '1px solid $gray600',
  borderRadius: '$sm',

  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${hide} 100ms ease-in`,
    },
    '&[data-swipe="move"]': {
      transform: 'translateX(var(--radix-toast-swipe-move-x))',
    },
    '&[data-swipe="cancel"]': {
      transform: 'translateX(0)',
      transition: 'transform 200ms ease-out',
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out`,
    },
  },
})

export const ToastTitle = styled(Toast.Title, {
  gridArea: 'title',
  lineHeight: '$base',
  color: '$gray100',
})

export const ToastDescription = styled(Toast.Description, {
  gridArea: 'description',
  marginTop: '$1',
  lineHeight: '$base',
  color: '$gray200',
})

export const ToastClose = styled(Toast.Close, {
  gridArea: 'close',
  width: '$5',
  height: '$5',
  color: '$gray200',
  cursor: 'pointer',

  '&:hover': {
    color: '$gray100',
  },
})
