import { SuccessContainer } from './styles'
import delivery from '../../assets/motoboy.svg'
import { OrderInfo } from './components/OrderInfo'

export function Success() {
  return (
    <SuccessContainer className="container">
      <section id="success">
        <div className="success__message">
          <h2>Yay! Confirmed order</h2>
          <p>
            Now all you have to do is wait for the coffee to come to you soon
          </p>

          <OrderInfo />
        </div>

        <img className="success__image" src={delivery} alt="" />
      </section>
    </SuccessContainer>
  )
}
