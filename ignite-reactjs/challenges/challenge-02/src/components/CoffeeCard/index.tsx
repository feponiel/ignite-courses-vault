import { CoffeeCardContainer } from './styles'
import { QuantityCounter } from '../QuantityCounter'
import { NavLink } from 'react-router-dom'
import { ShoppingCartSimple } from 'phosphor-react'

export interface CoffeeCardProps {
  name: string
  description: string
  image: string
  tags: string[]
  price: number
}

export function CoffeeCard({
  name,
  description,
  image,
  tags,
  price,
}: CoffeeCardProps) {
  return (
    <CoffeeCardContainer>
      <header>
        <img src={image} alt="" />

        <ul>
          {tags.map((tag) => {
            return <li>{tag}</li>
          })}
        </ul>
      </header>

      <div className="card-text">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>

      <footer>
        <span className="price">
          $ <strong>{String(price.toFixed(2)).replace('.', ',')}</strong>
        </span>

        <div className="cart-actions">
          <QuantityCounter ofCoffee={name} />

          <NavLink to="/cart">
            <ShoppingCartSimple size={22} weight="fill" />
          </NavLink>
        </div>
      </footer>
    </CoffeeCardContainer>
  )
}
