import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CartContextProvider } from './contexts/CartContext'
import { ClientInfoContextProvider } from './contexts/ClientInfoContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/defaultTheme'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <CartContextProvider>
          <ClientInfoContextProvider>
            <Router />
            <GlobalStyle />
          </ClientInfoContextProvider>
        </CartContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
