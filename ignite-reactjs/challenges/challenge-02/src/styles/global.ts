import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 1rem;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    -webkit-font-smoothing: antialised;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(200, 200, 210);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgb(165, 165, 175);
  }

  .container {
    display: flex;
    width: 71.4rem;
    margin: 0 auto;
    padding-left: 2%;
    padding-right: 2%;
  }
`
