import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialised;
    color: ${(props) => props.theme['gray-100']};
    background: ${(props) => props.theme['gray-800']};
  }

  body, input, textarea, button {
    font: 400 1rem 'Roboto', sans-serif;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
  }
`
