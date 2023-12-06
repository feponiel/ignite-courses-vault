import { HomeContainer, ProductsContainer } from './styles'
import coffee from '../../assets/coffee image.svg'
import { PresentationItems } from './components/PresentationItems'
import { CoffeeCard } from '../../components/CoffeeCard'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

export function Home() {
  const { coffeeList } = useContext(CartContext)

  return (
    <HomeContainer className="container">
      <section id="intro">
        <div className="intro__presentation">
          <h1>Find the perfect coffee for any time of day</h1>
          <p>
            With Coffee Delivery you get your coffee wherever you are, anytime
          </p>

          <PresentationItems />
        </div>
        <img className="intro__image" src={coffee} alt="Cup of coffee" />
      </section>

      <section id="products">
        <h2>Our cafes</h2>

        <ProductsContainer>
          {coffeeList.map((coffee) => {
            return (
              <CoffeeCard
                name={coffee.name}
                description={coffee.description}
                image={coffee.image}
                tags={coffee.tags}
                price={coffee.price}
                key={coffee.name}
              />
            )
          })}
        </ProductsContainer>
      </section>
    </HomeContainer>
  )
}
