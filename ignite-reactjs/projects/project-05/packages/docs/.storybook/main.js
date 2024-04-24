import { dirname, join } from "path";
module.exports = {
  "stories": [
    "../src/pages/**/*.mdx",
    "../src/pages/**/*.stories.ts",
    "../src/stories/**/*.stories.tsx"
  ],

  "addons": [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-mdx-gfm"),
    "@chromatic-com/storybook"
  ],

  "framework": {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {}
  },

  viteFinal: (config, { configType }) => {
    if(configType === 'PRODUCTION') {
      config.base = '/Project-05_Ignite-ReactJS/'
    }

    return config
  },

  docs: {
    autodocs: true
  }
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}