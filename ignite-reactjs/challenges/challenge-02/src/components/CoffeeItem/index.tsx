import { Trash } from 'phosphor-react'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { QuantityCounter } from '../QuantityCounter'
import { CoffeeItemContainer } from './styles'

interface CoffeeItemProps {
  name: string
  image: string
  price: number
}

export function CoffeeItem({ name, image, price }: CoffeeItemProps) {
  const { cart, removeItem } = useContext(CartContext)

  const coffee = cart[cart.findIndex((coffee) => coffee.name === name)]

  const totalOfCoffee = (price * coffee.amount).toFixed(2)

  const removeCoffee = () => {
    coffee.amount = 0
    removeItem(name)
  }

  return (
    <CoffeeItemContainer>
      <img src={image} alt="" />

      <div className="details">
        <p>{name}</p>

        <div className="actions">
          <QuantityCounter ofCoffee={name} />

          <button onClick={removeCoffee}>
            <Trash size={16} />
            Remove
          </button>
        </div>
      </div>

      <strong className="price">
        $ {String(totalOfCoffee).replace('.', ',')}
      </strong>
    </CoffeeItemContainer>
  )
}
