import { ActionTypes } from './actions'
import { api } from '../../lib/api'

export interface Coffee {
  name: string
  description: string
  image: string
  tags: string[]
  price: number
  amount: number
}

export const coffeeList: Coffee[] = await api
  .get('coffeeList')
  .then((response) => response.data)

export function CartReducer(state: Coffee[], action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_ITEM:
      if (state.some((coffee) => coffee.name === action.payload.name)) {
        const newCoffeeList: Coffee[] = state.map((coffee) => {
          if (coffee.name === action.payload.name && coffee.amount < 50) {
            coffee.amount += 1
          }

          return coffee
        })

        return newCoffeeList
      } else {
        return [
          ...state,
          coffeeList[
            coffeeList.findIndex(
              (coffee) => coffee.name === action.payload.name,
            )
          ],
        ]
      }
    case ActionTypes.REMOVE_ITEM:
      if (state.some((coffee) => coffee.name === action.payload.name)) {
        if (
          state[
            state.findIndex((coffee) => coffee.name === action.payload.name)
          ].amount > 1
        ) {
          const newCoffeeList: Coffee[] = state.map((coffee) => {
            if (coffee.name === action.payload.name) {
              coffee.amount -= 1
            }

            return coffee
          })

          return newCoffeeList
        } else {
          const newCoffeeList = state.filter(
            (coffee) => coffee.name !== action.payload.name,
          )

          return newCoffeeList
        }
      }
      break
    default:
      return state
  }
}
