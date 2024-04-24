import type { StoryObj, Meta } from "@storybook/react";
import { Text, TextProps } from "@feponiel-ignite-ui/react";

export default {
  title: "Typography/Text",
  component: Text,

  args: {
    size: "md",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sint repudiandae dolore culpa nulla voluptas asperiores, tempora, explicabo quae ipsam fugiat incidunt nobis? Officia sapiente exercitationem reprehenderit saepe magni id maxime?",
  },

  argTypes: {
    size: {
      options: [
        "xxs",
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
        "8xl",
        "9xl",
      ],
      control: {
        type: "inline-radio",
      },
    },
  },
} as Meta<TextProps>;

export const Primary: StoryObj<TextProps> = {};

export const CustomTag: StoryObj<TextProps> = {
  args: {
    children: "Strong text",
    as: "strong",
  },
};
