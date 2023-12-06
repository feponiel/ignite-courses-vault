import type { Meta, StoryObj } from '@storybook/react'
import {
  Box,
  Button,
  Text,
  Tooltip,
  TooltipProps,
} from '@macci-ignite-ui/react'

export default {
  title: 'Form/Tooltip',
  component: Tooltip,
  args: {},
  decorators: [
    (Story) => {
      return (
        <Box
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '$20 0',
            background: '$gray500',
          }}
        >
          {Story()}
        </Box>
      )
    },
  ],
} as Meta<TooltipProps>

export const Primary: StoryObj<TooltipProps> = {
  args: {
    children: <Button variant="secondary">Hover</Button>,
    content: <Text>Something interesting...</Text>,
  },
}
