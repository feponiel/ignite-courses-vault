import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CartContextProvider } from './contexts/CartContext'
import { ClientInfoContextProvider } from './contexts/ClientInfoContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/defaultTheme'
import { CoffeeContextProvider } from './contexts/CoffeeContext'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <CoffeeContextProvider>
          <CartContextProvider>
            <ClientInfoContextProvider>
              <Router />
              <GlobalStyle />
            </ClientInfoContextProvider>
          </CartContextProvider>
        </CoffeeContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
