import * as Tooltip from '@radix-ui/react-tooltip'
import { styled } from '../../styles'

export const TooltipContent = styled(Tooltip.Content, {
  display: 'inline-block',
  maxWidth: 320,
  marginBottom: '$3',
  padding: '$3 $4',
  position: 'relative',
  textAlign: 'center',
  wordBreak: 'break-word',
  fontFamily: '$default',
  fontSize: '$sm',
  color: '$gray100',
  background: '$gray900',
  borderRadius: '$sm',
  filter: 'drop-shadow(4px 16px 24px rgba(0, 0, 0, 0.25))',

  '&::after': {
    display: 'inline-block',
    width: '$4',
    height: '$2',
    position: 'absolute',
    left: '50%',
    bottom: '-$2',
    transform: 'translateX(-50%)',
    content: '',
    background: 'inherit',
    clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
  },
})
