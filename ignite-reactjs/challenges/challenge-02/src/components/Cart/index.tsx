import { NavLink } from 'react-router-dom'
import { CartContainer, ItemsCounter } from './styles'
import { ShoppingCart } from 'phosphor-react'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

export function Cart() {
  const { cart } = useContext(CartContext)

  return (
    <CartContainer>
      <NavLink to="/cart">
        <ShoppingCart size={22} weight="fill" />
        {cart.length > 0 ? <ItemsCounter>{cart.length}</ItemsCounter> : null}
      </NavLink>
    </CartContainer>
  )
}
