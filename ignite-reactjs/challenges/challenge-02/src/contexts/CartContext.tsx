import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { CartReducer } from '../reducers/CartReducer/reducer'
import {
  addNewItemAction,
  removeItemAction,
} from '../reducers/CartReducer/actions'
import { Coffee, CoffeeContext } from './CoffeeContext'

interface CartContextData {
  coffeeList: Coffee[]
  cart: Coffee[]
  addItem: (name: string) => void
  removeItem: (name: string) => void
}

export const CartContext = createContext({} as CartContextData)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const { coffeeList } = useContext(CoffeeContext)

  const [cart, dispatch] = useReducer(CartReducer, [], () => {
    const storedCoffeeList = localStorage.getItem(
      '@ignite_coffee-delivery:cart-1.0.0',
    )

    if (storedCoffeeList) {
      return JSON.parse(storedCoffeeList)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem(
      '@ignite_coffee-delivery:cart-1.0.0',
      JSON.stringify(cart),
    )
  }, [cart])

  const addItem = (name: string) => {
    dispatch(addNewItemAction(name))
  }

  const removeItem = (name: string) => dispatch(removeItemAction(name))

  return (
    <CartContext.Provider
      value={{
        coffeeList,
        cart,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
