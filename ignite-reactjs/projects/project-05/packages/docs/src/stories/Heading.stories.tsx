import type { StoryObj, Meta } from '@storybook/react'
import { Heading, HeadingProps } from '@macci-ignite-ui/react'

export default {
  title: 'Typography/Heading',
  component: Heading,

  args: {
    size: 'md',
    children: 'Lorem ipsum',
  },

  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', '2xl', '4xl', '5xl', '6xl'],
      control: {
        type: 'inline-radio',
      },
    },
  },
} as Meta<HeadingProps>

export const Primary: StoryObj<HeadingProps> = {}

export const CustomTag: StoryObj<HeadingProps> = {
  args: {
    children: 'H1 Heading',
    as: 'h1',
  },
}
