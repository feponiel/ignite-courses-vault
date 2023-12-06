import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialised;
    color: ${(props) => props.theme['base-text']};
    background: ${(props) => props.theme['base-background']};
  }

  body, input, button, textarea {
    font: 400 1rem 'Nunito', sans-serif;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.blue};
  }

  .container {
    width: calc(54rem + 2%);
    padding: 0 2%;
    margin: 0 auto;
  }
`
