import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
import { PresentationItem, PresentationItemsContainer } from './styles'

export function PresentationItems() {
  return (
    <PresentationItemsContainer>
      <PresentationItem>
        <div className="icon">
          <ShoppingCart size={16} weight="fill" />
        </div>

        <span className="text">Simple and secure purchase</span>
      </PresentationItem>

      <PresentationItem>
        <div className="icon">
          <Package size={16} weight="fill" />
        </div>

        <span className="text">Packaging keeps the coffee intact</span>
      </PresentationItem>

      <PresentationItem>
        <div className="icon">
          <Timer size={16} weight="fill" />
        </div>

        <span className="text">Fast and tracked delivery</span>
      </PresentationItem>

      <PresentationItem>
        <div className="icon">
          <Coffee size={16} weight="fill" />
        </div>

        <span className="text">Coffee arrives fresh to you</span>
      </PresentationItem>
    </PresentationItemsContainer>
  )
}
