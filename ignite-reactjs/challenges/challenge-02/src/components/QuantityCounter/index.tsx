import { QuantityCounterContainer } from './styles'
import { Minus, Plus } from 'phosphor-react'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

interface QuantityCounterProps {
  ofCoffee: string
}

export function QuantityCounter({ ofCoffee }: QuantityCounterProps) {
  const { addItem, cart, removeItem } = useContext(CartContext)

  const decreaseAmount = () => {
    removeItem(ofCoffee)
  }

  const increaseAmount = () => {
    addItem(ofCoffee)
  }

  const itemAmount = cart[cart.findIndex((coffee) => coffee.name === ofCoffee)]
    ? cart[cart.findIndex((coffee) => coffee.name === ofCoffee)].amount
    : 0

  return (
    <QuantityCounterContainer>
      <button onClick={decreaseAmount}>
        <Minus size={14} />
      </button>

      <span>{itemAmount}</span>

      <button onClick={increaseAmount}>
        <Plus size={14} />
      </button>
    </QuantityCounterContainer>
  )
}
