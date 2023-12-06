import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from 'phosphor-react'
import {
  AddressFormContainer,
  CartContainer,
  OrderContainer,
  PaymentMethodFormContainer,
} from './styles'
import { CoffeeItem } from '../../components/CoffeeItem'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClientInfoContext } from '../../contexts/ClientInfoContext'

export function Cart() {
  const { cart, removeItem } = useContext(CartContext)

  const OrderFormValidationSchema = zod.object({
    cep: zod.number().min(8).max(8),
    street: zod.string(),
    number: zod.number(),
    complement: zod.string(),
    district: zod.string(),
    city: zod.string(),
    uf: zod.string().min(2).max(2),
    'payment-method': zod.string(),
  })

  type OrderFormData = zod.infer<typeof OrderFormValidationSchema>

  const OrderForm = useForm<OrderFormData>({
    resolver: zodResolver(OrderFormValidationSchema),
  })

  const { register, watch, getValues } = OrderForm

  const requiredFields = watch([
    'cep',
    'street',
    'number',
    'district',
    'city',
    'uf',
    'payment-method',
  ])
  const isSubmitDisabled =
    requiredFields.some((field) => !field) || cart.length === 0

  const cartItemsWithUrAmounts = cart.map((coffee) => {
    return coffee.amount * coffee.price
  })

  const totalItems = cartItemsWithUrAmounts.reduce(
    (prev, curr) => prev + curr,
    0,
  )

  const delivery = !requiredFields.some((field) => !field) ? 3.5 : 0

  const totalValue = totalItems + delivery

  const { setClientInfo } = useContext(ClientInfoContext)

  const completeOrder = () => {
    setClientInfo({
      street: getValues('street'),
      number: getValues('number'),
      district: getValues('district'),
      city: getValues('city'),
      uf: getValues('uf'),
      payment: getValues('payment-method'),
    })

    cart.forEach((coffee) => {
      coffee.amount = 0
      removeItem(coffee.name)
    })
  }

  return (
    <CartContainer className="container">
      <section id="complete-order">
        <h2>Complete your order</h2>

        <AddressFormContainer>
          <header>
            <MapPinLine size={22} />

            <div>
              <h3>Delivery Address</h3>
              <p>Enter the address where you want to receive your order</p>
            </div>
          </header>

          <form>
            <input
              type="number"
              placeholder="CEP"
              required
              {...register('cep')}
            />
            <input
              type="text"
              placeholder="Street"
              required
              {...register('street')}
            />
            <input
              type="number"
              placeholder="Number"
              required
              {...register('number')}
            />
            <div>
              <input
                id="complement"
                type="text"
                placeholder="Complement"
                {...register('complement')}
              />
              <label htmlFor="complement">Optional</label>
            </div>
            <input
              type="text"
              placeholder="District"
              required
              {...register('district')}
            />
            <input
              type="text"
              placeholder="City"
              required
              {...register('city')}
            />
            <input
              type="text"
              minLength={2}
              maxLength={2}
              placeholder="UF"
              required
              {...register('uf')}
            />
          </form>
        </AddressFormContainer>

        <PaymentMethodFormContainer>
          <header>
            <CurrencyDollar size={22} />

            <div>
              <h3>Payment</h3>
              <p>Payment is made on delivery. Choose the way you want to pay</p>
            </div>
          </header>

          <form>
            <input
              id="payment-method__credit"
              type="radio"
              value="Credit Card"
              {...register('payment-method')}
            />
            <label htmlFor="payment-method__credit">
              <CreditCard size={16} />
              <span>Credit Card</span>
            </label>
            <input
              id="payment-method__debit"
              type="radio"
              value="Debit Card"
              {...register('payment-method')}
            />
            <label htmlFor="payment-method__debit">
              <Bank size={16} />
              <span>Debit Card</span>
            </label>
            <input
              id="payment-method__money"
              type="radio"
              value="Money"
              {...register('payment-method')}
            />
            <label htmlFor="payment-method__money">
              <Money size={16} />
              <span>Money</span>
            </label>
          </form>
        </PaymentMethodFormContainer>
      </section>

      <section id="your-cart">
        <h2>Selected Coffees</h2>

        <OrderContainer>
          <ul>
            {cart.length > 0 ? (
              cart.map((coffee) => {
                return (
                  <li key={coffee.name}>
                    <CoffeeItem
                      name={coffee.name}
                      image={coffee.image}
                      price={coffee.price}
                    />
                  </li>
                )
              })
            ) : (
              <p>No items in your cart :P</p>
            )}
          </ul>

          <table>
            <tbody>
              <tr>
                <td>Total items</td>
                <td>$ {String(totalItems.toFixed(2)).replace('.', ',')}</td>
              </tr>

              <tr>
                <td>Delivery</td>
                <td>$ {String(delivery.toFixed(2)).replace('.', ',')}</td>
              </tr>

              <tr>
                <td>Total</td>
                <td>$ {String(totalValue.toFixed(2)).replace('.', ',')}</td>
              </tr>
            </tbody>
          </table>

          {isSubmitDisabled ? (
            <button type="button">Confirm order</button>
          ) : (
            <NavLink to="/success" onClick={completeOrder}>
              Confirm order
            </NavLink>
          )}
        </OrderContainer>
      </section>
    </CartContainer>
  )
}
