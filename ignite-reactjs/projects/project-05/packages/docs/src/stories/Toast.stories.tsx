import type { Meta, StoryObj } from '@storybook/react'
import { Box, Button, Toast, ToastProps } from '@macci-ignite-ui/react'
import { useState } from 'react'

const DemoToast = (props: ToastProps) => {
  const [isOpen, setIsOpen] = useState(false)

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
      <Button
        variant="secondary"
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Click to open
      </Button>
      <Toast open={isOpen} onOpenChange={setIsOpen} {...props} />
    </Box>
  )
}

export default {
  title: 'Form/Toast',
  component: DemoToast,
  args: {},
} as Meta<ToastProps>

export const Primary: StoryObj<ToastProps> = {
  args: {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
}
