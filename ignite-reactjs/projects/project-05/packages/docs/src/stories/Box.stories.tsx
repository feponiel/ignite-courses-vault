import type { StoryObj, Meta } from "@storybook/react";
import { Box, BoxProps, Text } from "@feponiel-ignite-ui/react";

export default {
  title: "Surfaces/Box",
  component: Box,

  args: {
    children: <Text>Testing the box element</Text>,
  },

  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
  },
} as Meta<BoxProps>;

export const Primary: StoryObj<BoxProps> = {};
