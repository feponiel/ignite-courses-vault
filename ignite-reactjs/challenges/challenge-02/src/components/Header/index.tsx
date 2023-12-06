import { Actions, HeaderContainer } from './styles'
import logo from '../../assets/logo.svg'
import { Locate } from '../Locate'
import { Cart } from '../Cart'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer className="container">
      <NavLink to="/">
        <img
          src={logo}
          alt="Ignite Coffee Delivery Logo. A rocket in a coffee cup"
        />
      </NavLink>

      <Actions>
        <Locate />
        <Cart />
      </Actions>
    </HeaderContainer>
  )
}
